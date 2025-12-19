<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const observerSnippet = `
// OBSERVER PATTERN - Подписка на изменения

// Publisher (Subject)
class EventEmitter {
  constructor() {
    this.events = {}
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)

    // Возвращаем функцию отписки
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data))
    }
  }
}

// React: Custom Hook с Observer
function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const themeEmitter = new EventEmitter()

    const unsubscribe = themeEmitter.subscribe('theme-change', (newTheme) => {
      setTheme(newTheme)
    })

    return () => unsubscribe()
  }, [])

  return theme
}

// Vue: Composable с Observer
export function useNotifications() {
  const notifications = ref([])
  const emitter = new EventEmitter()

  const addNotification = (message) => {
    const notification = { id: Date.now(), message }
    notifications.value.push(notification)
    emitter.emit('notification-added', notification)
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
    emitter.emit('notification-removed', id)
  }

  return { notifications, addNotification, removeNotification, emitter }
}
`

const strategySnippet = `
// STRATEGY PATTERN - Взаимозаменяемые алгоритмы

// Стратегии сортировки
const sortStrategies = {
  byName: (items) => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  byPrice: (items) => [...items].sort((a, b) => a.price - b.price),
  byRating: (items) => [...items].sort((a, b) => b.rating - a.rating),
  byDate: (items) => [...items].sort((a, b) => new Date(b.date) - new Date(a.date))
}

// React: Компонент с выбором стратегии
function ProductList({ products }) {
  const [sortBy, setSortBy] = useState('byName')

  const sortedProducts = useMemo(() => {
    const strategy = sortStrategies[sortBy]
    return strategy ? strategy(products) : products
  }, [products, sortBy])

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="byName">По названию</option>
        <option value="byPrice">По цене</option>
        <option value="byRating">По рейтингу</option>
        <option value="byDate">По дате</option>
      </select>

      {sortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

// Стратегии валидации форм
const validationStrategies = {
  email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
  phone: (value) => /^\\+?[1-9]\\d{1,14}$/.test(value),
  password: (value) => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value),
  required: (value) => value !== null && value !== undefined && value !== ''
}

// Vue: Composable для валидации
export function useValidation(rules) {
  const errors = ref({})

  const validate = (field, value) => {
    const fieldRules = rules[field]
    if (!fieldRules) return true

    for (const rule of fieldRules) {
      const strategy = validationStrategies[rule]
      if (strategy && !strategy(value)) {
        errors.value[field] = \`Invalid \${rule}\`
        return false
      }
    }

    delete errors.value[field]
    return true
  }

  return { errors, validate }
}
`

const commandSnippet = `
// COMMAND PATTERN - Инкапсуляция действий

// Command interface
class Command {
  execute() {}
  undo() {}
}

// Конкретные команды
class AddItemCommand extends Command {
  constructor(store, item) {
    super()
    this.store = store
    this.item = item
  }

  execute() {
    this.store.items.push(this.item)
    this.store.emit('item-added', this.item)
  }

  undo() {
    const index = this.store.items.indexOf(this.item)
    if (index > -1) {
      this.store.items.splice(index, 1)
      this.store.emit('item-removed', this.item)
    }
  }
}

class RemoveItemCommand extends Command {
  constructor(store, itemId) {
    super()
    this.store = store
    this.itemId = itemId
    this.removedItem = null
    this.removedIndex = -1
  }

  execute() {
    this.removedIndex = this.store.items.findIndex(item => item.id === this.itemId)
    if (this.removedIndex > -1) {
      this.removedItem = this.store.items[this.removedIndex]
      this.store.items.splice(this.removedIndex, 1)
      this.store.emit('item-removed', this.removedItem)
    }
  }

  undo() {
    if (this.removedItem && this.removedIndex > -1) {
      this.store.items.splice(this.removedIndex, 0, this.removedItem)
      this.store.emit('item-added', this.removedItem)
    }
  }
}

// Command Manager (Invoker)
class CommandManager {
  constructor() {
    this.history = []
    this.currentIndex = -1
  }

  execute(command) {
    // Удаляем команды после текущей позиции (при новом действии после undo)
    this.history = this.history.slice(0, this.currentIndex + 1)

    command.execute()
    this.history.push(command)
    this.currentIndex++
  }

  undo() {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex]
      command.undo()
      this.currentIndex--
    }
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++
      const command = this.history[this.currentIndex]
      command.execute()
    }
  }

  canUndo() {
    return this.currentIndex >= 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }
}

// React: Undo/Redo с Command Pattern
function useUndoRedo(initialState) {
  const [state, setState] = useState(initialState)
  const commandManager = useRef(new CommandManager())

  const execute = (command) => {
    commandManager.current.execute(command)
    setState({...state}) // Force re-render
  }

  const undo = () => {
    commandManager.current.undo()
    setState({...state})
  }

  const redo = () => {
    commandManager.current.redo()
    setState({...state})
  }

  return {
    state,
    execute,
    undo,
    redo,
    canUndo: commandManager.current.canUndo(),
    canRedo: commandManager.current.canRedo()
  }
}
`

const mediatorSnippet = `
// MEDIATOR PATTERN - Централизованное взаимодействие

// Mediator для формы
class FormMediator {
  constructor() {
    this.fields = {}
    this.validators = {}
    this.dependencies = {}
  }

  register(fieldName, validator, dependencies = []) {
    this.fields[fieldName] = ''
    this.validators[fieldName] = validator
    this.dependencies[fieldName] = dependencies
  }

  setValue(fieldName, value) {
    this.fields[fieldName] = value

    // Уведомляем зависимые поля
    Object.keys(this.dependencies).forEach(field => {
      if (this.dependencies[field].includes(fieldName)) {
        this.validate(field)
      }
    })

    return this.validate(fieldName)
  }

  validate(fieldName) {
    const value = this.fields[fieldName]
    const validator = this.validators[fieldName]

    if (validator) {
      return validator(value, this.fields)
    }
    return true
  }

  validateAll() {
    return Object.keys(this.fields).every(field => this.validate(field))
  }

  reset() {
    Object.keys(this.fields).forEach(field => {
      this.fields[field] = ''
    })
  }
}

// React: Использование Mediator в форме
function RegistrationForm() {
  const mediator = useRef(new FormMediator())
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Регистрация полей с зависимостями
    mediator.current.register('email', (value) => {
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)
    })

    mediator.current.register('password', (value) => {
      return value.length >= 8
    })

    mediator.current.register('confirmPassword', (value, allFields) => {
      return value === allFields.password
    }, ['password']) // зависит от password
  }, [])

  const handleChange = (field, value) => {
    const isValid = mediator.current.setValue(field, value)
    setErrors(prev => ({ ...prev, [field]: !isValid }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mediator.current.validateAll()) {
      // Submit form
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={(e) => handleChange('email', e.target.value)}
      />
      {errors.email && <span>Invalid email</span>}

      <input
        type="password"
        onChange={(e) => handleChange('password', e.target.value)}
      />
      {errors.password && <span>Password too short</span>}

      <input
        type="password"
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
      />
      {errors.confirmPassword && <span>Passwords don't match</span>}

      <button type="submit">Register</button>
    </form>
  )
}
`

const stateSnippet = `
// STATE PATTERN - Изменение поведения в зависимости от состояния

// Состояния для аудио плеера
class PlayerState {
  play(player) {}
  pause(player) {}
  stop(player) {}
}

class PlayingState extends PlayerState {
  play(player) {
    console.log('Already playing')
  }

  pause(player) {
    player.audio.pause()
    player.setState(player.pausedState)
  }

  stop(player) {
    player.audio.pause()
    player.audio.currentTime = 0
    player.setState(player.stoppedState)
  }
}

class PausedState extends PlayerState {
  play(player) {
    player.audio.play()
    player.setState(player.playingState)
  }

  pause(player) {
    console.log('Already paused')
  }

  stop(player) {
    player.audio.currentTime = 0
    player.setState(player.stoppedState)
  }
}

class StoppedState extends PlayerState {
  play(player) {
    player.audio.play()
    player.setState(player.playingState)
  }

  pause(player) {
    console.log('Cannot pause when stopped')
  }

  stop(player) {
    console.log('Already stopped')
  }
}

// Audio Player с State Pattern
class AudioPlayer {
  constructor(audioElement) {
    this.audio = audioElement
    this.playingState = new PlayingState()
    this.pausedState = new PausedState()
    this.stoppedState = new StoppedState()
    this.currentState = this.stoppedState
  }

  setState(state) {
    this.currentState = state
  }

  play() {
    this.currentState.play(this)
  }

  pause() {
    this.currentState.pause(this)
  }

  stop() {
    this.currentState.stop(this)
  }
}

// React: Custom Hook с State Pattern
function useAudioPlayer(src) {
  const audioRef = useRef(new Audio(src))
  const [player] = useState(() => new AudioPlayer(audioRef.current))
  const [state, setState] = useState('stopped')

  useEffect(() => {
    const originalSetState = player.setState.bind(player)
    player.setState = (newState) => {
      originalSetState(newState)
      if (newState === player.playingState) setState('playing')
      else if (newState === player.pausedState) setState('paused')
      else setState('stopped')
    }
  }, [player])

  return {
    play: () => player.play(),
    pause: () => player.pause(),
    stop: () => player.stop(),
    state
  }
}
`

const chainOfResponsibilitySnippet = `
// CHAIN OF RESPONSIBILITY - Цепочка обработчиков

// Базовый обработчик
class Handler {
  constructor() {
    this.nextHandler = null
  }

  setNext(handler) {
    this.nextHandler = handler
    return handler
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }
    return null
  }
}

// Обработчики для middleware
class AuthHandler extends Handler {
  handle(request) {
    if (!request.user) {
      return { error: 'Unauthorized', status: 401 }
    }
    console.log('Auth passed')
    return super.handle(request)
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.data || !request.data.title) {
      return { error: 'Invalid data', status: 400 }
    }
    console.log('Validation passed')
    return super.handle(request)
  }
}

class LoggingHandler extends Handler {
  handle(request) {
    console.log('Request:', request)
    return super.handle(request)
  }
}

class RateLimitHandler extends Handler {
  constructor() {
    super()
    this.requests = new Map()
  }

  handle(request) {
    const userId = request.user?.id
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []

    // Проверяем количество запросов за последнюю минуту
    const recentRequests = userRequests.filter(time => now - time < 60000)

    if (recentRequests.length >= 10) {
      return { error: 'Rate limit exceeded', status: 429 }
    }

    recentRequests.push(now)
    this.requests.set(userId, recentRequests)

    console.log('Rate limit passed')
    return super.handle(request)
  }
}

// API Client с Chain of Responsibility
class APIClient {
  constructor() {
    this.chain = this.buildChain()
  }

  buildChain() {
    const auth = new AuthHandler()
    const rateLimit = new RateLimitHandler()
    const validation = new ValidationHandler()
    const logging = new LoggingHandler()

    // Строим цепочку
    auth.setNext(rateLimit).setNext(validation).setNext(logging)

    return auth
  }

  async request(request) {
    // Проходим через цепочку обработчиков
    const error = this.chain.handle(request)

    if (error) {
      throw error
    }

    // Если все проверки прошли, делаем запрос
    return fetch(request.url, {
      method: request.method,
      body: JSON.stringify(request.data),
      headers: {
        'Authorization': \`Bearer \${request.user.token}\`,
        'Content-Type': 'application/json'
      }
    })
  }
}

// React: Hook для API с middleware chain
function useAPIWithMiddleware() {
  const client = useRef(new APIClient())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const makeRequest = async (request) => {
    setLoading(true)
    setError(null)

    try {
      const response = await client.current.request(request)
      return await response.json()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { makeRequest, loading, error }
}
`

const templateMethodSnippet = `
// TEMPLATE METHOD - Шаблон алгоритма

// Абстрактный класс с шаблонным методом
class DataFetcher {
  // Шаблонный метод - определяет алгоритм
  async fetchData(url) {
    this.beforeFetch()

    try {
      const data = await this.fetch(url)
      const processed = this.processData(data)
      this.afterFetch(processed)
      return processed
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  // Хуки, которые можно переопределить
  beforeFetch() {}
  afterFetch(data) {}
  handleError(error) {
    console.error('Fetch error:', error)
  }

  // Абстрактные методы (должны быть реализованы)
  async fetch(url) {
    throw new Error('fetch() must be implemented')
  }

  processData(data) {
    throw new Error('processData() must be implemented')
  }
}

// Конкретные реализации
class UserDataFetcher extends DataFetcher {
  beforeFetch() {
    console.log('Fetching users...')
  }

  async fetch(url) {
    const response = await fetch(url)
    return response.json()
  }

  processData(data) {
    // Добавляем полное имя
    return data.map(user => ({
      ...user,
      fullName: \`\${user.firstName} \${user.lastName}\`
    }))
  }

  afterFetch(data) {
    console.log(\`Fetched \${data.length} users\`)
  }
}

class ProductDataFetcher extends DataFetcher {
  beforeFetch() {
    console.log('Fetching products...')
  }

  async fetch(url) {
    const response = await fetch(url)
    return response.json()
  }

  processData(data) {
    // Фильтруем только доступные продукты
    return data.filter(product => product.inStock)
  }

  afterFetch(data) {
    console.log(\`Fetched \${data.length} products in stock\`)
  }

  handleError(error) {
    console.error('Product fetch failed:', error)
    // Отправляем уведомление в Sentry
  }
}

// React: Hook с Template Method
function useDataFetcher(FetcherClass) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetcher = useMemo(() => new FetcherClass(), [FetcherClass])

  const fetchData = async (url) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetcher.fetchData(url)
      setData(result)
      return result
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fetchData }
}

// Использование
function UsersList() {
  const { data: users, loading, fetchData } = useDataFetcher(UserDataFetcher)

  useEffect(() => {
    fetchData('/api/users')
  }, [])

  if (loading) return <Spinner />
  return <div>{users?.map(user => <div key={user.id}>{user.fullName}</div>)}</div>
}
`

const iteratorSnippet = `
// ITERATOR PATTERN - Обход коллекции

// Кастомная итерируемая структура данных
class TreeNode {
  constructor(value) {
    this.value = value
    this.children = []
  }

  addChild(node) {
    this.children.push(node)
  }

  // Depth-First Iterator
  *[Symbol.iterator]() {
    yield this.value

    for (const child of this.children) {
      yield* child // Делегируем итерацию детям
    }
  }

  // Breadth-First Iterator
  *breadthFirst() {
    const queue = [this]

    while (queue.length > 0) {
      const node = queue.shift()
      yield node.value
      queue.push(...node.children)
    }
  }
}

// Использование кастомного итератора
const root = new TreeNode('root')
const child1 = new TreeNode('child1')
const child2 = new TreeNode('child2')
const grandchild1 = new TreeNode('grandchild1')

root.addChild(child1)
root.addChild(child2)
child1.addChild(grandchild1)

// Depth-First (по умолчанию)
for (const value of root) {
  console.log(value) // root, child1, grandchild1, child2
}

// Breadth-First
for (const value of root.breadthFirst()) {
  console.log(value) // root, child1, child2, grandchild1
}

// React: Компонент для рендера дерева с итератором
function TreeView({ root }) {
  const renderNode = (node, level = 0) => (
    <div key={node.value} style={{ marginLeft: level * 20 }}>
      {node.value}
      {node.children.map(child => renderNode(child, level + 1))}
    </div>
  )

  return <div>{renderNode(root)}</div>
}

// Async Iterator для пагинации
class PaginatedAPI {
  constructor(baseUrl, pageSize = 10) {
    this.baseUrl = baseUrl
    this.pageSize = pageSize
  }

  async *[Symbol.asyncIterator]() {
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await fetch(
        \`\${this.baseUrl}?page=\${page}&size=\${this.pageSize}\`
      )
      const data = await response.json()

      for (const item of data.items) {
        yield item
      }

      hasMore = data.hasMore
      page++
    }
  }
}

// React: Загрузка данных с async iterator
function InfiniteList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    setLoading(true)
    const api = new PaginatedAPI('/api/items')

    let count = 0
    for await (const item of api) {
      setItems(prev => [...prev, item])
      count++
      if (count >= 10) break // Загружаем по 10 за раз
    }

    setLoading(false)
  }

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={loadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  )
}
`

const mementoSnippet = `
// MEMENTO PATTERN - Сохранение и восстановление состояния

// Memento - снимок состояния
class EditorMemento {
  constructor(content, cursorPosition, selection) {
    this.content = content
    this.cursorPosition = cursorPosition
    this.selection = selection
    this.timestamp = Date.now()
  }
}

// Originator - объект, состояние которого сохраняется
class TextEditor {
  constructor() {
    this.content = ''
    this.cursorPosition = 0
    this.selection = null
  }

  type(text) {
    const before = this.content.substring(0, this.cursorPosition)
    const after = this.content.substring(this.cursorPosition)
    this.content = before + text + after
    this.cursorPosition += text.length
  }

  delete(count) {
    const before = this.content.substring(0, this.cursorPosition)
    const after = this.content.substring(this.cursorPosition + count)
    this.content = before + after
  }

  moveCursor(position) {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length))
  }

  select(start, end) {
    this.selection = { start, end }
  }

  // Создание снимка
  createMemento() {
    return new EditorMemento(
      this.content,
      this.cursorPosition,
      this.selection ? { ...this.selection } : null
    )
  }

  // Восстановление из снимка
  restore(memento) {
    this.content = memento.content
    this.cursorPosition = memento.cursorPosition
    this.selection = memento.selection ? { ...memento.selection } : null
  }
}

// Caretaker - управляет снимками
class EditorHistory {
  constructor(editor, maxSize = 50) {
    this.editor = editor
    this.history = []
    this.currentIndex = -1
    this.maxSize = maxSize
  }

  save() {
    // Удаляем историю после текущей позиции
    this.history = this.history.slice(0, this.currentIndex + 1)

    // Добавляем новый снимок
    const memento = this.editor.createMemento()
    this.history.push(memento)

    // Ограничиваем размер истории
    if (this.history.length > this.maxSize) {
      this.history.shift()
    } else {
      this.currentIndex++
    }
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      const memento = this.history[this.currentIndex]
      this.editor.restore(memento)
      return true
    }
    return false
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++
      const memento = this.history[this.currentIndex]
      this.editor.restore(memento)
      return true
    }
    return false
  }

  canUndo() {
    return this.currentIndex > 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }

  clear() {
    this.history = []
    this.currentIndex = -1
  }
}

// React: Редактор с Undo/Redo через Memento
function useTextEditor() {
  const editorRef = useRef(new TextEditor())
  const historyRef = useRef(new EditorHistory(editorRef.current))
  const [content, setContent] = useState('')
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const updateState = () => {
    setContent(editorRef.current.content)
    setCanUndo(historyRef.current.canUndo())
    setCanRedo(historyRef.current.canRedo())
  }

  const type = (text) => {
    editorRef.current.type(text)
    historyRef.current.save()
    updateState()
  }

  const deleteText = (count) => {
    editorRef.current.delete(count)
    historyRef.current.save()
    updateState()
  }

  const undo = () => {
    if (historyRef.current.undo()) {
      updateState()
    }
  }

  const redo = () => {
    if (historyRef.current.redo()) {
      updateState()
    }
  }

  // Сохраняем начальное состояние
  useEffect(() => {
    historyRef.current.save()
    updateState()
  }, [])

  return {
    content,
    type,
    deleteText,
    undo,
    redo,
    canUndo,
    canRedo
  }
}

// Использование
function TextEditorComponent() {
  const { content, type, undo, redo, canUndo, canRedo } = useTextEditor()

  return (
    <div>
      <div>
        <button onClick={undo} disabled={!canUndo}>Undo</button>
        <button onClick={redo} disabled={!canRedo}>Redo</button>
      </div>
      <textarea
        value={content}
        onChange={(e) => type(e.target.value.slice(content.length))}
      />
    </div>
  )
}
`

const highlightedObserver = ref('')
const highlightedStrategy = ref('')
const highlightedCommand = ref('')
const highlightedMediator = ref('')
const highlightedState = ref('')
const highlightedChain = ref('')
const highlightedTemplate = ref('')
const highlightedIterator = ref('')
const highlightedMemento = ref('')

onMounted(() => {
  highlightedObserver.value = Prism.highlight(observerSnippet, Prism.languages.javascript, 'javascript')
  highlightedStrategy.value = Prism.highlight(strategySnippet, Prism.languages.javascript, 'javascript')
  highlightedCommand.value = Prism.highlight(commandSnippet, Prism.languages.javascript, 'javascript')
  highlightedMediator.value = Prism.highlight(mediatorSnippet, Prism.languages.javascript, 'javascript')
  highlightedState.value = Prism.highlight(stateSnippet, Prism.languages.javascript, 'javascript')
  highlightedChain.value = Prism.highlight(chainOfResponsibilitySnippet, Prism.languages.javascript, 'javascript')
  highlightedTemplate.value = Prism.highlight(templateMethodSnippet, Prism.languages.javascript, 'javascript')
  highlightedIterator.value = Prism.highlight(iteratorSnippet, Prism.languages.javascript, 'javascript')
  highlightedMemento.value = Prism.highlight(mementoSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Поведенческие паттерны проектирования
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Поведенческие паттерны</b> определяют взаимодействие между объектами, распределение обязанностей
              и алгоритмы. Они помогают организовать эффективную коммуникацию и управление поведением объектов.
              В фронтенде эти паттерны особенно полезны для управления состоянием, событиями и пользовательским взаимодействием.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные поведенческие паттерны</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Паттерн</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Применение во фронтенде</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Observer</b></td>
                <td>Подписка на изменения объекта</td>
                <td>React hooks, Vue reactivity, Event emitters</td>
              </tr>
              <tr>
                <td><b>Strategy</b></td>
                <td>Взаимозаменяемые алгоритмы</td>
                <td>Сортировка, валидация, форматирование</td>
              </tr>
              <tr>
                <td><b>Command</b></td>
                <td>Инкапсуляция действий</td>
                <td>Undo/Redo, макросы, отложенные операции</td>
              </tr>
              <tr>
                <td><b>Mediator</b></td>
                <td>Централизованное взаимодействие</td>
                <td>Формы, модальные окна, компоненты</td>
              </tr>
              <tr>
                <td><b>State</b></td>
                <td>Изменение поведения по состоянию</td>
                <td>UI состояния, конечные автоматы</td>
              </tr>
              <tr>
                <td><b>Chain of Responsibility</b></td>
                <td>Цепочка обработчиков</td>
                <td>Middleware, валидация, обработка событий</td>
              </tr>
              <tr>
                <td><b>Template Method</b></td>
                <td>Шаблон алгоритма с хуками</td>
                <td>Lifecycle hooks, базовые компоненты</td>
              </tr>
              <tr>
                <td><b>Iterator</b></td>
                <td>Последовательный доступ к элементам</td>
                <td>Обход коллекций, пагинация, виртуализация</td>
              </tr>
              <tr>
                <td><b>Memento</b></td>
                <td>Сохранение и восстановление состояния</td>
                <td>История изменений, Undo/Redo, снимки</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Observer — Подписка на изменения</h2>
            <p class="font-weight-regular mb-4">
              Определяет зависимость "один-ко-многим" между объектами: когда один объект изменяется,
              все зависимые объекты уведомляются автоматически. Основа реактивности в современных фреймворках.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedObserver"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Strategy — Взаимозаменяемые алгоритмы</h2>
            <p class="font-weight-regular mb-4">
              Определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми.
              Позволяет изменять алгоритмы независимо от клиентов, которые их используют.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStrategy"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Command — Инкапсуляция действий</h2>
            <p class="font-weight-regular mb-4">
              Превращает запросы в объекты, позволяя параметризовать клиентов с различными запросами,
              ставить запросы в очередь, логировать их и поддерживать отмену операций.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommand"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Mediator — Централизованное взаимодействие</h2>
            <p class="font-weight-regular mb-4">
              Определяет объект, инкапсулирующий взаимодействие множества объектов.
              Способствует слабой связанности, избавляя объекты от необходимости ссылаться друг на друга.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMediator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. State — Изменение поведения по состоянию</h2>
            <p class="font-weight-regular mb-4">
              Позволяет объекту изменять свое поведение в зависимости от внутреннего состояния.
              При этом создается впечатление, что изменился класс объекта.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedState"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Chain of Responsibility — Цепочка обработчиков</h2>
            <p class="font-weight-regular mb-4">
              Позволяет избежать привязки отправителя запроса к его получателю, давая шанс обработать
              запрос нескольким объектам. Связывает объекты-получатели в цепочку и передает запрос
              по цепочке, пока какой-то объект его не обработает.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedChain"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Template Method — Шаблон алгоритма</h2>
            <p class="font-weight-regular mb-4">
              Определяет скелет алгоритма в методе, оставляя некоторые шаги подклассам.
              Позволяет подклассам переопределять отдельные шаги алгоритма, не изменяя его структуру.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTemplate"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Iterator — Обход коллекции</h2>
            <p class="font-weight-regular mb-4">
              Предоставляет способ последовательного доступа ко всем элементам составного объекта,
              не раскрывая его внутреннего представления. Особенно полезен для кастомных структур данных.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedIterator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Memento — Сохранение состояния</h2>
            <p class="font-weight-regular mb-4">
              Фиксирует и выносит за пределы объекта его внутреннее состояние так, чтобы позднее
              можно было восстановить объект в этом состоянии, не нарушая инкапсуляции.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMemento"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение паттернов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Управление состоянием</h3>
                  <ul class="pl-4">
                    <li><b>Observer:</b> Уведомление об изменениях</li>
                    <li><b>State:</b> Изменение поведения</li>
                    <li><b>Memento:</b> Сохранение/восстановление</li>
                    <li><b>Command:</b> История операций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Организация логики</h3>
                  <ul class="pl-4">
                    <li><b>Strategy:</b> Семейство алгоритмов</li>
                    <li><b>Template Method:</b> Шаблон с хуками</li>
                    <li><b>Chain:</b> Цепочка обработчиков</li>
                    <li><b>Mediator:</b> Централизация взаимодействия</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Применение во фронтенд фреймворках</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Паттерн</th>
                <th class="text-left font-weight-bold">React</th>
                <th class="text-left font-weight-bold">Vue</th>
                <th class="text-left font-weight-bold">Angular</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Observer</b></td>
                <td>useState, useEffect, Context</td>
                <td>ref, reactive, watch</td>
                <td>RxJS Observables</td>
              </tr>
              <tr>
                <td><b>Strategy</b></td>
                <td>Props, Custom Hooks</td>
                <td>Composables, Props</td>
                <td>Services, Dependency Injection</td>
              </tr>
              <tr>
                <td><b>Command</b></td>
                <td>useReducer actions</td>
                <td>Vuex/Pinia actions</td>
                <td>NgRx actions</td>
              </tr>
              <tr>
                <td><b>Mediator</b></td>
                <td>Context, State managers</td>
                <td>Provide/Inject</td>
                <td>Services</td>
              </tr>
              <tr>
                <td><b>State</b></td>
                <td>useState, useReducer</td>
                <td>ref, reactive</td>
                <td>Component state</td>
              </tr>
              <tr>
                <td><b>Template Method</b></td>
                <td>Lifecycle hooks</td>
                <td>Lifecycle hooks</td>
                <td>Lifecycle hooks</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Observer и Pub/Sub?</p>
                <p class="font-weight-regular ma-0">
                  Observer - прямая связь между Subject и Observers (Subject знает о своих подписчиках).
                  Pub/Sub - есть посредник (Event Bus), издатель и подписчик не знают друг о друге.
                  React Context ближе к Observer, Redux - к Pub/Sub.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать Strategy вместо if/else?</p>
                <p class="font-weight-regular ma-0">
                  Когда у вас 3+ варианта поведения, они могут добавляться/изменяться независимо,
                  требуется возможность переключения в runtime, или нужна тестируемость каждого алгоритма отдельно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Command паттерн помогает с Undo/Redo?</p>
                <p class="font-weight-regular ma-0">
                  Каждое действие инкапсулируется в команду с методами execute() и undo().
                  CommandManager хранит историю выполненных команд и может откатывать/повторять их.
                  Это позволяет легко реализовать историю изменений в редакторах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужен Mediator, если есть Context API?</p>
                <p class="font-weight-regular ma-0">
                  Mediator - более специализированный паттерн для управления сложным взаимодействием
                  между компонентами (формы, валидация с зависимостями). Context API - для передачи данных.
                  Mediator часто используется внутри логики, Context - для пропсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем State паттерн отличается от state в React?</p>
                <p class="font-weight-regular ma-0">
                  State паттерн - объектно-ориентированный подход к изменению поведения через состояния.
                  React state - данные компонента. State паттерн полезен для конечных автоматов
                  (FSM), когда поведение сильно зависит от состояния (плеер, форма с этапами).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Chain of Responsibility используется в middleware?</p>
                <p class="font-weight-regular ma-0">
                  В Redux, Express, Koa каждый middleware - обработчик в цепочке. Получает запрос,
                  обрабатывает его часть (логирование, авторизация, валидация) и передает дальше
                  через next(). Может прервать цепочку или изменить данные.
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
                    <li>Observer для реактивности</li>
                    <li>Strategy для алгоритмов</li>
                    <li>Command для Undo/Redo</li>
                    <li>Mediator для сложных форм</li>
                    <li>Chain для middleware</li>
                    <li>Iterator для кастомных коллекций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Overengineering для простых задач</li>
                    <li>State паттерн вместо простого useState</li>
                    <li>Command для каждого действия</li>
                    <li>Слишком длинные цепочки</li>
                    <li>Mediator в маленьких компонентах</li>
                    <li>Множество Observer на одно событие</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Комбинируйте паттерны</li>
                    <li>Используйте встроенные механизмы фреймворков</li>
                    <li>Документируйте сложные паттерны</li>
                    <li>Тестируйте каждый паттерн отдельно</li>
                    <li>Следите за производительностью</li>
                    <li>Refactor по мере усложнения</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Поведенческие паттерны</b> критически важны для фронтенд-разработки. <b>Observer</b> лежит
              в основе реактивности React/Vue. <b>Strategy</b> помогает организовать алгоритмы (сортировка,
              валидация). <b>Command</b> необходим для Undo/Redo. <b>Mediator</b> упрощает сложные формы.
              <b>State</b> отлично подходит для конечных автоматов. <b>Chain of Responsibility</b> - основа
              middleware. Понимание этих паттернов делает код более гибким, тестируемым и масштабируемым.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://refactoring.guru/design-patterns/behavioral-patterns"
                target="_blank"
                class="mr-2">
                Refactoring Guru
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.patterns.dev/posts"
                target="_blank">
                Patterns.dev
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
