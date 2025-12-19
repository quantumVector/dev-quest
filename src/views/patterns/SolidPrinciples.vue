<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'

const srpBadSnippet = `
// ❌ ПЛОХО - Компонент делает слишком много
const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Логика загрузки данных
  const fetchUser = async (id) => {
    setLoading(true)
    const response = await fetch(\`/api/users/\${id}\`)
    const data = await response.json()
    setUser(data)
    setLoading(false)
  }

  // Логика валидации
  const validateEmail = (email) => {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
  }

  // Логика форматирования
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU')
  }

  // Логика сохранения
  const saveUser = async (userData) => {
    if (!validateEmail(userData.email)) {
      alert('Неверный email')
      return
    }
    await fetch(\`/api/users/\${user.id}\`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
  }

  // И еще рендеринг...
  return (
    <div>
      {loading ? <Spinner /> : (
        <form onSubmit={(e) => {
          e.preventDefault()
          saveUser(/* ... */)
        }}>
          {/* Форма */}
        </form>
      )}
    </div>
  )
}
`

const srpGoodSnippet = `
// ✅ ПРАВИЛЬНО - Разделение ответственности

// 1. Хук для работы с API
const useUserApi = () => {
  const fetchUser = async (id: string) => {
    const response = await fetch(\`/api/users/\${id}\`)
    return response.json()
  }

  const updateUser = async (id: string, data: UserData) => {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  return { fetchUser, updateUser }
}

// 2. Утилиты валидации
const validators = {
  email: (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email),
  phone: (phone: string) => /^\\+?[0-9]{10,15}$/.test(phone)
}

// 3. Утилиты форматирования
const formatters = {
  date: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
  currency: (amount: number) => \`\${amount.toFixed(2)} ₽\`
}

// 4. Хук состояния пользователя
const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const api = useUserApi()

  const loadUser = async () => {
    setLoading(true)
    try {
      const data = await api.fetchUser(userId)
      setUser(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, error, loadUser, updateUser: api.updateUser }
}

// 5. Компонент только для рендеринга
const UserProfile = ({ userId }: { userId: string }) => {
  const { user, loading, error } = useUser(userId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!user) return null

  return <UserForm user={user} />
}
`

const ocpBadSnippet = `
// ❌ ПЛОХО - Закрыто для расширения
const Button = ({ type, onClick, children }) => {
  if (type === 'primary') {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (type === 'secondary') {
    return (
      <button
        className="bg-gray-500 text-white px-4 py-2"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  if (type === 'danger') {
    return (
      <button
        className="bg-red-500 text-white px-4 py-2"
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  // Чтобы добавить новый тип, нужно изменять компонент
  return <button onClick={onClick}>{children}</button>
}
`

const ocpGoodSnippet = `
// ✅ ПРАВИЛЬНО - Открыто для расширения, закрыто для модификации

// Базовый компонент
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white'
}

const buttonSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const Button = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  className = ''
}: ButtonProps) => {
  const variantClass = buttonVariants[variant]
  const sizeClass = buttonSizes[size]

  return (
    <button
      className={\`\${variantClass} \${sizeClass} rounded transition-colors \${className}\`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Расширение через композицию - не нужно менять исходный код
const IconButton = ({ icon, ...props }: ButtonProps & { icon: React.ReactNode }) => (
  <Button {...props}>
    <span className="flex items-center gap-2">
      {icon}
      {props.children}
    </span>
  </Button>
)

const LoadingButton = ({ loading, ...props }: ButtonProps & { loading: boolean }) => (
  <Button {...props} disabled={loading}>
    {loading ? <Spinner /> : props.children}
  </Button>
)
`

const lspBadSnippet = `
// ❌ ПЛОХО - Нарушение LSP
interface Bird {
  fly(): void
  eat(): void
}

class Sparrow implements Bird {
  fly() {
    console.log('Sparrow flies')
  }
  eat() {
    console.log('Sparrow eats')
  }
}

class Penguin implements Bird {
  fly() {
    throw new Error('Penguins cannot fly!') // Нарушение LSP!
  }
  eat() {
    console.log('Penguin eats')
  }
}

// Код ожидает, что все Bird могут летать
const makeBirdFly = (bird: Bird) => {
  bird.fly() // Упадет для Penguin!
}
`

const lspGoodSnippet = `
// ✅ ПРАВИЛЬНО - Правильная иерархия

// Базовый интерфейс с общими свойствами
interface Bird {
  eat(): void
  move(): void
}

// Расширение для летающих птиц
interface FlyingBird extends Bird {
  fly(): void
}

// Расширение для плавающих птиц
interface SwimmingBird extends Bird {
  swim(): void
}

class Sparrow implements FlyingBird {
  eat() {
    console.log('Sparrow eats')
  }
  move() {
    this.fly()
  }
  fly() {
    console.log('Sparrow flies')
  }
}

class Penguin implements SwimmingBird {
  eat() {
    console.log('Penguin eats')
  }
  move() {
    this.swim()
  }
  swim() {
    console.log('Penguin swims')
  }
}

// Функции работают с правильными типами
const makeFlyingBirdFly = (bird: FlyingBird) => {
  bird.fly() // Всегда работает
}

const makeSwimmingBirdSwim = (bird: SwimmingBird) => {
  bird.swim() // Всегда работает
}
`

const lspReactSnippet = `
// Пример LSP в React компонентах

// ❌ ПЛОХО - Дочерний компонент требует больше пропсов
interface BaseInputProps {
  value: string
  onChange: (value: string) => void
}

const TextInput = ({ value, onChange }: BaseInputProps) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
)

// Нарушение LSP - требует дополнительный проп!
const EmailInput = ({ value, onChange, validator }: BaseInputProps & { validator: (v: string) => boolean }) => {
  // Не может заменить TextInput без изменения кода
  return (
    <input
      type="email"
      value={value}
      onChange={(e) => {
        if (validator(e.target.value)) {
          onChange(e.target.value)
        }
      }}
    />
  )
}

// ✅ ПРАВИЛЬНО - Одинаковый интерфейс
const TextInput = ({ value, onChange }: BaseInputProps) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
)

const EmailInput = ({ value, onChange }: BaseInputProps) => {
  const emailValidator = (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)

  return (
    <input
      type="email"
      value={value}
      onChange={(e) => {
        // Валидация внутри, интерфейс не меняется
        if (emailValidator(e.target.value)) {
          onChange(e.target.value)
        }
      }}
    />
  )
}

// Теперь можно заменять без проблем
const Form = () => {
  const [email, setEmail] = useState('')

  // Оба компонента взаимозаменяемы
  return (
    <>
      <TextInput value={email} onChange={setEmail} />
      {/* Или */}
      <EmailInput value={email} onChange={setEmail} />
    </>
  )
}
`

const ispBadSnippet = `
// ❌ ПЛОХО - "Толстый" интерфейс
interface DataService {
  // CRUD операции
  create(data: any): Promise<void>
  read(id: string): Promise<any>
  update(id: string, data: any): Promise<void>
  delete(id: string): Promise<void>

  // Экспорт/импорт
  exportToCSV(): Promise<string>
  exportToJSON(): Promise<string>
  importFromCSV(data: string): Promise<void>
  importFromJSON(data: string): Promise<void>

  // Кэширование
  clearCache(): void
  getCacheStats(): CacheStats

  // Валидация
  validate(data: any): boolean
  sanitize(data: any): any
}

// Компонент, которому нужна только валидация,
// вынужден зависеть от всего интерфейса
class FormValidator implements DataService {
  // Приходится реализовывать ВСЕ методы!
  create() { throw new Error('Not needed') }
  read() { throw new Error('Not needed') }
  update() { throw new Error('Not needed') }
  delete() { throw new Error('Not needed') }
  exportToCSV() { throw new Error('Not needed') }
  exportToJSON() { throw new Error('Not needed') }
  importFromCSV() { throw new Error('Not needed') }
  importFromJSON() { throw new Error('Not needed') }
  clearCache() { throw new Error('Not needed') }
  getCacheStats() { throw new Error('Not needed') }

  // Нужны только эти два!
  validate(data: any) { return true }
  sanitize(data: any) { return data }
}
`

const ispGoodSnippet = `
// ✅ ПРАВИЛЬНО - Разделенные интерфейсы

// Базовые CRUD операции
interface CrudOperations<T> {
  create(data: T): Promise<void>
  read(id: string): Promise<T>
  update(id: string, data: T): Promise<void>
  delete(id: string): Promise<void>
}

// Экспорт данных
interface DataExporter {
  exportToCSV(): Promise<string>
  exportToJSON(): Promise<string>
}

// Импорт данных
interface DataImporter {
  importFromCSV(data: string): Promise<void>
  importFromJSON(data: string): Promise<void>
}

// Кэширование
interface Cacheable {
  clearCache(): void
  getCacheStats(): CacheStats
}

// Валидация
interface Validator<T> {
  validate(data: T): boolean
  sanitize(data: T): T
}

// Теперь каждый класс реализует только нужные интерфейсы
class UserService implements CrudOperations<User>, Cacheable {
  async create(data: User) { /* ... */ }
  async read(id: string) { /* ... */ }
  async update(id: string, data: User) { /* ... */ }
  async delete(id: string) { /* ... */ }
  clearCache() { /* ... */ }
  getCacheStats() { /* ... */ }
}

class UserValidator implements Validator<User> {
  validate(data: User) {
    return !!data.email && !!data.name
  }
  sanitize(data: User) {
    return {
      ...data,
      email: data.email.toLowerCase().trim()
    }
  }
}

class ReportExporter implements DataExporter {
  async exportToCSV() { /* ... */ }
  async exportToJSON() { /* ... */ }
}
`

const ispReactSnippet = `
// ISP в React компонентах

// ❌ ПЛОХО - Компонент требует слишком много пропсов
interface UserCardProps {
  user: User
  onEdit: () => void
  onDelete: () => void
  onShare: () => void
  onExport: () => void
  onPrint: () => void
  showAvatar: boolean
  showBio: boolean
  showStats: boolean
  showActions: boolean
  theme: 'light' | 'dark'
}

// ✅ ПРАВИЛЬНО - Разделенные интерфейсы
interface UserDisplayProps {
  user: User
  showAvatar?: boolean
  showBio?: boolean
}

interface UserActionsProps {
  onEdit?: () => void
  onDelete?: () => void
}

interface UserExportProps {
  onShare?: () => void
  onExport?: () => void
  onPrint?: () => void
}

// Композиция через компоненты
const UserCard = ({ user }: { user: User }) => (
  <div>
    <UserDisplay user={user} showAvatar showBio />
  </div>
)

const EditableUserCard = ({
  user,
  onEdit,
  onDelete
}: { user: User } & UserActionsProps) => (
  <div>
    <UserDisplay user={user} showAvatar showBio />
    <UserActions onEdit={onEdit} onDelete={onDelete} />
  </div>
)

const FullUserCard = ({
  user,
  ...actions
}: { user: User } & UserActionsProps & UserExportProps) => (
  <div>
    <UserDisplay user={user} showAvatar showBio />
    <UserActions onEdit={actions.onEdit} onDelete={actions.onDelete} />
    <UserExport
      onShare={actions.onShare}
      onExport={actions.onExport}
      onPrint={actions.onPrint}
    />
  </div>
)
`

const dipBadSnippet = `
// ❌ ПЛОХО - Прямая зависимость от конкретной реализации
class UserService {
  // Жесткая зависимость от конкретного класса
  private api = new FetchAPI()
  private cache = new LocalStorageCache()
  private logger = new ConsoleLogger()

  async getUser(id: string) {
    this.logger.log(\`Fetching user \${id}\`)

    const cached = this.cache.get(\`user_\${id}\`)
    if (cached) return cached

    const user = await this.api.get(\`/users/\${id}\`)
    this.cache.set(\`user_\${id}\`, user)

    return user
  }
}

// Проблемы:
// 1. Нельзя заменить FetchAPI на AxiosAPI без изменения кода
// 2. Нельзя использовать RedisCache вместо LocalStorageCache
// 3. Сложно тестировать - нельзя замокать зависимости
// 4. Нарушена инверсия зависимостей
`

const dipGoodSnippet = `
// ✅ ПРАВИЛЬНО - Зависимость от абстракций

// Абстракции (интерфейсы)
interface HttpClient {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data: any): Promise<T>
}

interface Cache {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  clear(): void
}

interface Logger {
  log(message: string): void
  error(message: string): void
}

// Конкретные реализации
class FetchAPI implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    return response.json()
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

class LocalStorageCache implements Cache {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  clear(): void {
    localStorage.clear()
  }
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(\`[LOG] \${message}\`)
  }

  error(message: string) {
    console.error(\`[ERROR] \${message}\`)
  }
}

// Сервис зависит от абстракций через DI
class UserService {
  constructor(
    private http: HttpClient,
    private cache: Cache,
    private logger: Logger
  ) {}

  async getUser(id: string) {
    this.logger.log(\`Fetching user \${id}\`)

    const cached = this.cache.get<User>(\`user_\${id}\`)
    if (cached) return cached

    const user = await this.http.get<User>(\`/users/\${id}\`)
    this.cache.set(\`user_\${id}\`, user)

    return user
  }
}

// Использование с разными реализациями
const prodService = new UserService(
  new FetchAPI(),
  new LocalStorageCache(),
  new ConsoleLogger()
)

// Легко тестировать с моками
const testService = new UserService(
  mockHttpClient,
  mockCache,
  mockLogger
)
`

const dipReactSnippet = `
// DIP в React через Context и кастомные хуки

// Абстракция
interface StorageService {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
}

// Реализации
class LocalStorageService implements StorageService {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}

class MemoryStorageService implements StorageService {
  private storage = new Map<string, any>()

  get<T>(key: string): T | null {
    return this.storage.get(key) ?? null
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, value)
  }

  remove(key: string): void {
    this.storage.delete(key)
  }
}

// DI через Context
const StorageContext = createContext<StorageService | null>(null)

export const StorageProvider = ({
  storage,
  children
}: {
  storage: StorageService
  children: React.ReactNode
}) => (
  <StorageContext.Provider value={storage}>
    {children}
  </StorageContext.Provider>
)

// Хук для использования хранилища
export const useStorage = () => {
  const storage = useContext(StorageContext)
  if (!storage) {
    throw new Error('useStorage must be used within StorageProvider')
  }
  return storage
}

// Использование
const App = () => (
  <StorageProvider storage={new LocalStorageService()}>
    <UserSettings />
  </StorageProvider>
)

// Компонент зависит от абстракции, а не конкретной реализации
const UserSettings = () => {
  const storage = useStorage()
  const [theme, setTheme] = useState(() => storage.get('theme') ?? 'light')

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    storage.set('theme', newTheme)
  }

  return <ThemeSelector value={theme} onChange={handleThemeChange} />
}
`

const solidSummarySnippet = `
// Полный пример применения SOLID на фронтенде

// 1. SRP - Разделение ответственности
// Каждый модуль делает одну вещь

// API слой
class UserAPI {
  async getUser(id: string): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`)
    return response.json()
  }
}

// Валидация
class UserValidator {
  validate(user: Partial<User>): ValidationResult {
    const errors: string[] = []
    if (!user.email) errors.push('Email required')
    if (!user.name) errors.push('Name required')
    return { valid: errors.length === 0, errors }
  }
}

// Форматирование
class UserFormatter {
  formatFullName(user: User): string {
    return \`\${user.firstName} \${user.lastName}\`
  }
}

// 2. OCP - Расширяемость через конфигурацию
const buttonConfig = {
  variants: {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500'
  },
  sizes: {
    sm: 'px-2 py-1',
    md: 'px-4 py-2'
  }
}

// 3. LSP - Правильная иерархия
interface Clickable {
  onClick: () => void
}

const Button: React.FC<Clickable> = ({ onClick }) => (
  <button onClick={onClick}>Click</button>
)

const IconButton: React.FC<Clickable & { icon: string }> = ({ onClick, icon }) => (
  <button onClick={onClick}>
    <Icon name={icon} />
  </button>
)

// 4. ISP - Минимальные интерфейсы
interface Readable {
  read(id: string): Promise<any>
}

interface Writable {
  create(data: any): Promise<void>
  update(id: string, data: any): Promise<void>
}

// 5. DIP - Зависимость от абстракций
interface DataSource {
  fetch<T>(key: string): Promise<T>
}

class Component {
  constructor(private dataSource: DataSource) {}

  async loadData() {
    return this.dataSource.fetch('users')
  }
}
`

const highlightedSrpBad = ref('')
const highlightedSrpGood = ref('')
const highlightedOcpBad = ref('')
const highlightedOcpGood = ref('')
const highlightedLspBad = ref('')
const highlightedLspGood = ref('')
const highlightedLspReact = ref('')
const highlightedIspBad = ref('')
const highlightedIspGood = ref('')
const highlightedIspReact = ref('')
const highlightedDipBad = ref('')
const highlightedDipGood = ref('')
const highlightedDipReact = ref('')
const highlightedSolidSummary = ref('')

onMounted(() => {
  highlightedSrpBad.value = Prism.highlight(srpBadSnippet, Prism.languages.javascript, 'javascript')
  highlightedSrpGood.value = Prism.highlight(srpGoodSnippet, Prism.languages.typescript, 'typescript')
  highlightedOcpBad.value = Prism.highlight(ocpBadSnippet, Prism.languages.javascript, 'javascript')
  highlightedOcpGood.value = Prism.highlight(ocpGoodSnippet, Prism.languages.typescript, 'typescript')
  highlightedLspBad.value = Prism.highlight(lspBadSnippet, Prism.languages.typescript, 'typescript')
  highlightedLspGood.value = Prism.highlight(lspGoodSnippet, Prism.languages.typescript, 'typescript')
  highlightedLspReact.value = Prism.highlight(lspReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedIspBad.value = Prism.highlight(ispBadSnippet, Prism.languages.typescript, 'typescript')
  highlightedIspGood.value = Prism.highlight(ispGoodSnippet, Prism.languages.typescript, 'typescript')
  highlightedIspReact.value = Prism.highlight(ispReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedDipBad.value = Prism.highlight(dipBadSnippet, Prism.languages.typescript, 'typescript')
  highlightedDipGood.value = Prism.highlight(dipGoodSnippet, Prism.languages.typescript, 'typescript')
  highlightedDipReact.value = Prism.highlight(dipReactSnippet, Prism.languages.typescript, 'typescript')
  highlightedSolidSummary.value = Prism.highlight(solidSummarySnippet, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              SOLID: Принципы проектирования и их применение на фронтенде
            </h1>

            <p class="font-weight-regular mb-6">
              <b>SOLID</b> — это пять принципов объектно-ориентированного программирования и проектирования,
              сформулированных Робертом Мартином. Эти принципы помогают создавать гибкий, масштабируемый
              и поддерживаемый код. На фронтенде SOLID применяется к компонентам, хукам, сервисам и архитектуре приложения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Обзор принципов SOLID</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Принцип</th>
                <th class="text-left font-weight-bold">Название</th>
                <th class="text-left font-weight-bold">Суть</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>S</b></td>
                <td class="pt-2 pb-2">Single Responsibility</td>
                <td class="pt-2 pb-2">Одна причина для изменения</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>O</b></td>
                <td class="pt-2 pb-2">Open/Closed</td>
                <td class="pt-2 pb-2">Открыт для расширения, закрыт для модификации</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>L</b></td>
                <td class="pt-2 pb-2">Liskov Substitution</td>
                <td class="pt-2 pb-2">Подтипы заменяют базовые типы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>I</b></td>
                <td class="pt-2 pb-2">Interface Segregation</td>
                <td class="pt-2 pb-2">Клиенты не зависят от ненужных методов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>D</b></td>
                <td class="pt-2 pb-2">Dependency Inversion</td>
                <td class="pt-2 pb-2">Зависимость от абстракций, а не реализаций</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">S — Single Responsibility Principle (SRP)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Принцип единственной ответственности:</strong>
              Каждый модуль (компонент, класс, функция) должен иметь только одну причину для изменения.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение SRP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSrpBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Соблюдение SRP</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSrpGood"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">O — Open/Closed Principle (OCP)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Принцип открытости/закрытости:</strong>
              Модули должны быть открыты для расширения, но закрыты для модификации.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение OCP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedOcpBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Соблюдение OCP</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOcpGood"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">L — Liskov Substitution Principle (LSP)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Принцип подстановки Барбары Лисков:</strong>
              Объекты подклассов должны заменять объекты базового класса без нарушения работы программы.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение LSP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedLspBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Соблюдение LSP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedLspGood"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">LSP в React компонентах</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLspReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">I — Interface Segregation Principle (ISP)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Принцип разделения интерфейса:</strong>
              Клиенты не должны зависеть от методов, которые они не используют.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение ISP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedIspBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Соблюдение ISP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedIspGood"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">ISP в React компонентах</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedIspReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">D — Dependency Inversion Principle (DIP)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Принцип инверсии зависимостей:</strong>
              Модули верхнего уровня не должны зависеть от модулей нижнего уровня. Оба должны зависеть от абстракций.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение DIP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedDipBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Соблюдение DIP</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedDipGood"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">DIP в React через Dependency Injection</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDipReact"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">SOLID на фронтенде: сводная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Принцип</th>
                <th class="text-left font-weight-bold">Применение на фронтенде</th>
                <th class="text-left font-weight-bold">Инструменты</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>SRP</b></td>
                <td class="pt-2 pb-2">Разделение логики по хукам, компонентам, сервисам</td>
                <td class="pt-2 pb-2">Custom hooks, модули, утилиты</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>OCP</b></td>
                <td class="pt-2 pb-2">Расширение через пропсы, композицию, конфигурацию</td>
                <td class="pt-2 pb-2">Props, HOC, Render Props, Slots</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>LSP</b></td>
                <td class="pt-2 pb-2">Совместимые интерфейсы компонентов</td>
                <td class="pt-2 pb-2">TypeScript interfaces, Props types</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>ISP</b></td>
                <td class="pt-2 pb-2">Минимальные, целевые пропсы компонентов</td>
                <td class="pt-2 pb-2">Props segregation, композиция</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>DIP</b></td>
                <td class="pt-2 pb-2">Dependency Injection через Context, пропсы</td>
                <td class="pt-2 pb-2">Context API, Props, IoC контейнеры</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Комплексный пример SOLID</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSolidSummary"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества применения SOLID</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-scale-balance</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Поддерживаемость</h3>
                  <ul class="text-left pl-4">
                    <li>Понятная структура кода</li>
                    <li>Легкая навигация</li>
                    <li>Быстрые изменения</li>
                    <li>Меньше багов при рефакторинге</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-test-tube</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Тестируемость</h3>
                  <ul class="text-left pl-4">
                    <li>Изолированные юнит-тесты</li>
                    <li>Легкое моканье зависимостей</li>
                    <li>Высокое покрытие тестами</li>
                    <li>Стабильные интеграционные тесты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-arrow-expand-all</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Масштабируемость</h3>
                  <ul class="text-left pl-4">
                    <li>Расширение без изменений</li>
                    <li>Добавление фич безопасно</li>
                    <li>Переиспользование кода</li>
                    <li>Гибкая архитектура</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое принцип единственной ответственности?</p>
                <p class="font-weight-regular ma-0">
                  Каждый модуль должен иметь одну причину для изменения. На фронтенде это означает разделение
                  логики на отдельные хуки (useUserApi, useUserValidation), компоненты (UserDisplay, UserForm)
                  и сервисы (UserService, CacheService).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как применяется Open/Closed на фронтенде?</p>
                <p class="font-weight-regular ma-0">
                  Через конфигурацию (варианты стилей), композицию (slots, children), расширение компонентов
                  (HOC, wrapper components). Компонент должен расширяться новыми возможностями через пропсы,
                  а не изменением внутреннего кода.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что означает принцип подстановки Лисков для React?</p>
                <p class="font-weight-regular ma-0">
                  Компоненты-потомки должны быть взаимозаменяемы с родительскими без нарушения работы.
                  Например, если компонент принимает BaseInputProps, все его вариации (TextInput, EmailInput)
                  должны работать с теми же пропсами без требования дополнительных.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем разделять интерфейсы (ISP)?</p>
                <p class="font-weight-regular ma-0">
                  Чтобы компоненты не зависели от ненужных им пропсов. Вместо одного "толстого" компонента
                  с 20 пропсами лучше создать несколько специализированных с минимальным набором пропсов.
                  Это упрощает использование и тестирование.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать инверсию зависимостей в React?</p>
                <p class="font-weight-regular ma-0">
                  Через Context API (провайдеры с абстракциями), пропсы (передача зависимостей извне),
                  кастомные хуки (useStorage вместо прямого localStorage). Компонент не создает зависимости,
                  а получает их снаружи.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Всегда ли нужно следовать SOLID на 100%?</p>
                <p class="font-weight-regular ma-0">
                  Нет, SOLID — это руководство, а не догма. В простых компонентах допустимо нарушение принципов
                  для читаемости. Главное — понимать компромиссы и применять принципы там, где они дают
                  реальную пользу (сложные компоненты, переиспользуемые библиотеки).
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Практические советы по применению</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Разделять ответственность компонентов</li>
                    <li>Использовать композицию</li>
                    <li>Создавать минимальные интерфейсы</li>
                    <li>Применять Dependency Injection</li>
                    <li>Писать тесты для проверки SOLID</li>
                    <li>Рефакторить при росте сложности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>"God components" — всё в одном</li>
                    <li>Жесткие зависимости</li>
                    <li>Изменение кода вместо расширения</li>
                    <li>"Толстые" интерфейсы с лишними пропсами</li>
                    <li>Прямое создание зависимостей</li>
                    <li>Игнорирование принципов в сложных модулях</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Начинайте с SRP</li>
                    <li>Используйте TypeScript для интерфейсов</li>
                    <li>Применяйте code review на SOLID</li>
                    <li>Изучайте паттерны проектирования</li>
                    <li>Рефакторьте постепенно</li>
                    <li>Баланс между принципами и простотой</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>SOLID принципы</b> применимы на фронтенде и помогают создавать качественный код.
              <b>SRP</b> разделяет ответственность, <b>OCP</b> позволяет расширять без изменений,
              <b>LSP</b> обеспечивает совместимость, <b>ISP</b> минимизирует зависимости,
              <b>DIP</b> инвертирует зависимости через абстракции. Эти принципы делают код
              поддерживаемым, тестируемым и масштабируемым, что критично для современных фронтенд-приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://en.wikipedia.org/wiki/SOLID"
                target="_blank"
                class="mr-2">
                Wikipedia: SOLID
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://khalilstemmler.com/articles/solid-principles/solid-typescript/"
                target="_blank">
                SOLID in TypeScript
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
