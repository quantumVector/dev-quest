<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const renderCausesSnippet = `
// Основные причины ререндера в React

// 1. Изменение состояния (setState)
function Counter() {
  const [count, setCount] = useState(0)

  // Каждый вызов setCount вызывает ререндер
  return <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>
}

// 2. Изменение пропсов
function Child({ name, age }) {
  console.log('Child rendered')
  return <div>{name}, {age}</div>
}

function Parent() {
  const [user, setUser] = useState({ name: 'John', age: 30 })

  // При изменении user компонент Child перерендерится
  return <Child name={user.name} age={user.age} />
}

// 3. Ререндер родителя
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Child ререндерится при каждом клике, хотя пропсы не меняются! */}
      <Child />
    </div>
  )
}

// 4. Context изменения
const ThemeContext = React.createContext()

function Button() {
  const theme = useContext(ThemeContext)
  // Ререндер при изменении любого значения в контексте
  return <button className={theme}>Click</button>
}
`

const unnecessaryRendersSnippet = `
// Примеры ЛИШНИХ ререндеров

// Проблема 1: Новый объект на каждый рендер
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ ПЛОХО - создается новый объект при каждом рендере!
  const user = { name: 'John', age: 30 }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Child видит "новый" объект и ререндерится */}
      <Child user={user} />
    </div>
  )
}

// Проблема 2: Новая функция на каждый рендер
function Parent() {
  const [count, setCount] = useState(0)

  // ❌ ПЛОХО - новая функция при каждом рендере!
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Child получает "новую" функцию и ререндерится */}
      <Child onClick={handleClick} />
    </div>
  )
}

// Проблема 3: Inline объекты и массивы в JSX
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* ❌ Новый объект style при каждом рендере */}
      <Child style={{ color: 'red' }} />
      {/* ❌ Новый массив items при каждом рендере */}
      <List items={[1, 2, 3]} />
    </div>
  )
}

// Проблема 4: Context Provider с inline value
function App() {
  const [user, setUser] = useState({ name: 'John' })

  return (
    // ❌ Новый объект value при каждом рендере App
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  )
}
`

const detectionToolsSnippet = `
// Инструменты для обнаружения лишних рендеров

// 1. React DevTools Profiler
// Запустить профилирование:
// 1. Открыть React DevTools
// 2. Перейти во вкладку "Profiler"
// 3. Нажать "Start profiling"
// 4. Выполнить действия в приложении
// 5. Нажать "Stop profiling"
// 6. Анализировать Flamegraph и Ranked chart

// 2. why-did-you-render библиотека
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOnDifferentValues: true,
  })
}

// Отметить компонент для отслеживания
function MyComponent() {
  // ...
}
MyComponent.whyDidYouRender = true

// 3. Кастомный хук useWhyDidYouUpdate
function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef()

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changedProps = {}

      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: previousProps.current[key],
            to: props[key]
          }
        }
      })

      if (Object.keys(changedProps).length > 0) {
        console.log('[why-did-you-update]', name, changedProps)
      }
    }

    previousProps.current = props
  })
}

// Использование
function Child({ name, age, onClick }) {
  useWhyDidYouUpdate('Child', { name, age, onClick })
  return <div>{name}, {age}</div>
}

// 4. console.log в компонентах
function Child({ name }) {
  console.log('Child rendered with:', name)
  console.trace('Child render stack')
  return <div>{name}</div>
}
`

const memoizationSnippet = `
// Оптимизация с помощью мемоизации

// 1. React.memo - предотвращает ререндер при неизменных пропсах
const Child = React.memo(function Child({ name, age }) {
  console.log('Child rendered')
  return <div>{name}, {age}</div>
})

function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* Child НЕ ререндерится, т.к. пропсы не изменились */}
      <Child name="John" age={30} />
    </div>
  )
}

// 2. React.memo с кастомным сравнением
const ExpensiveChild = React.memo(
  function ExpensiveChild({ user, settings }) {
    console.log('ExpensiveChild rendered')
    return <div>{user.name}</div>
  },
  (prevProps, nextProps) => {
    // Возвращаем true, если НЕ нужен ререндер
    // Сравниваем только важные поля
    return prevProps.user.id === nextProps.user.id &&
           prevProps.settings.theme === nextProps.settings.theme
  }
)

// 3. useMemo для вычислений
function ExpensiveCalculation({ items }) {
  // ✅ Вычисление происходит только при изменении items
  const total = useMemo(() => {
    console.log('Calculating total...')
    return items.reduce((sum, item) => sum + item.price, 0)
  }, [items])

  return <div>Total: {total}</div>
}

// 4. useCallback для функций
function Parent() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])

  // ❌ ПЛОХО - новая функция при каждом рендере
  const handleClick = () => {
    console.log('clicked')
  }

  // ✅ ХОРОШО - функция создается один раз
  const handleClickMemo = useCallback(() => {
    console.log('clicked')
  }, []) // Пустой массив зависимостей

  // ✅ С зависимостями
  const addItem = useCallback((item) => {
    setItems(prev => [...prev, item])
  }, []) // setItems стабилен

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClickMemo} />
    </div>
  )
}

const Child = React.memo(function Child({ onClick }) {
  console.log('Child rendered')
  return <button onClick={onClick}>Click me</button>
})
`

const contextOptimizationSnippet = `
// Оптимизация Context API

// ❌ ПЛОХО - все потребители ререндерятся при любом изменении
function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 })
  const [theme, setTheme] = useState('light')

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </AppContext.Provider>
  )
}

// ✅ ХОРОШО - разделение на несколько контекстов
const UserContext = React.createContext()
const ThemeContext = React.createContext()

function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 })
  const [theme, setTheme] = useState('light')

  // Мемоизация значений контекста
  const userValue = useMemo(() => ({ user, setUser }), [user])
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <Header />
        <Main />
        <Footer />
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

// Компоненты используют только нужный контекст
function Header() {
  const { theme } = useContext(ThemeContext)
  // НЕ ререндерится при изменении user
  return <header className={theme}>Header</header>
}

// ✅ ЛУЧШЕ - селекторы для контекста
function createContextWithSelector() {
  const Context = React.createContext()

  function Provider({ value, children }) {
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  function useContextSelector(selector) {
    const value = useContext(Context)
    return useMemo(() => selector(value), [value, selector])
  }

  return { Provider, useContextSelector }
}

// Использование
const { Provider, useContextSelector } = createContextWithSelector()

function UserName() {
  // Ререндер только при изменении name
  const name = useContextSelector(state => state.user.name)
  return <div>{name}</div>
}

function UserAge() {
  // Ререндер только при изменении age
  const age = useContextSelector(state => state.user.age)
  return <div>{age}</div>
}
`

const compositionPatternsSnippet = `
// Паттерны композиции для избежания ререндеров

// 1. Children prop (composition)
// ❌ ПЛОХО
function Wrapper() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* ExpensiveComponent ререндерится при каждом клике */}
      <ExpensiveComponent />
    </div>
  )
}

// ✅ ХОРОШО - children передаются извне
function Wrapper({ children }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* children НЕ ререндерятся */}
      {children}
    </div>
  )
}

function App() {
  return (
    <Wrapper>
      <ExpensiveComponent />
    </Wrapper>
  )
}

// 2. Компонент как проп
function Layout({ header, sidebar, content }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      {header}
      <div className={collapsed ? 'collapsed' : ''}>
        {sidebar}
      </div>
      {content}
    </div>
  )
}

// Использование
<Layout
  header={<Header />}
  sidebar={<Sidebar />}
  content={<Content />}
/>

// 3. Разделение состояния и UI
// ❌ ПЛОХО - все в одном компоненте
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  return (
    <div>
      <input
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />
      <ExpensivePreview data={formData} />
    </div>
  )
}

// ✅ ХОРОШО - разделение на подкомпоненты
function FormField({ value, onChange, ...props }) {
  return <input value={value} onChange={onChange} {...props} />
}

function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const formData = useMemo(() => ({ name, email, message }), [name, email, message])

  return (
    <div>
      {/* Каждое поле независимо */}
      <FormField value={name} onChange={e => setName(e.target.value)} />
      <FormField value={email} onChange={e => setEmail(e.target.value)} />
      <FormField value={message} onChange={e => setMessage(e.target.value)} />
      <ExpensivePreview data={formData} />
    </div>
  )
}
`

const stateManagementSnippet = `
// Оптимизация управления состоянием

// 1. Колокация состояния (State Colocation)
// ❌ ПЛОХО - состояние слишком высоко
function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({})

  return (
    <div>
      <Header />
      <Main />
      {/* Все ререндерится при изменении modalOpen */}
      <Modal open={modalOpen} data={formData} />
      <Footer />
    </div>
  )
}

// ✅ ХОРОШО - состояние рядом с использованием
function ModalSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({})

  return <Modal open={modalOpen} data={formData} />
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <ModalSection />
      <Footer />
    </div>
  )
}

// 2. Ленивая инициализация состояния
// ❌ ПЛОХО - функция выполняется при каждом рендере
function Component() {
  const [data, setData] = useState(expensiveCalculation())
  // ...
}

// ✅ ХОРОШО - функция выполняется только один раз
function Component() {
  const [data, setData] = useState(() => expensiveCalculation())
  // ...
}

// 3. Функциональные обновления
// ❌ ПЛОХО - зависимость от текущего значения
function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(count + 1) // зависит от count
  }, [count]) // нужно обновлять при изменении count

  return <button onClick={increment}>Count: {count}</button>
}

// ✅ ХОРОШО - функциональное обновление
function Counter() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(prev => prev + 1) // не зависит от count
  }, []) // стабильная функция!

  return <button onClick={increment}>Count: {count}</button>
}

// 4. useReducer для сложного состояния
function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // Стабильная функция dispatch
  const handleNameChange = useCallback((e) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value })
  }, [])

  return (
    <div>
      <input value={state.name} onChange={handleNameChange} />
    </div>
  )
}
`

const virtualListsSnippet = `
// Виртуализация для больших списков

// Без виртуализации - все элементы рендерятся
function BadList({ items }) {
  return (
    <div>
      {/* Если items = 10000, все 10000 DOM элементов создаются! */}
      {items.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  )
}

// ✅ С react-window
import { FixedSizeList } from 'react-window'

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}

// ✅ С react-virtualized
import { List } from 'react-virtualized'

function VirtualizedList({ items }) {
  const rowRenderer = ({ key, index, style }) => (
    <div key={key} style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )

  return (
    <List
      width={800}
      height={600}
      rowCount={items.length}
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  )
}

// Динамическая высота элементов
import { VariableSizeList } from 'react-window'

function DynamicList({ items }) {
  const getItemSize = (index) => {
    // Вычисляем высоту на основе данных
    return items[index].isExpanded ? 200 : 50
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  )

  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  )
}
`

const highlightedRenderCauses = ref('')
const highlightedUnnecessaryRenders = ref('')
const highlightedDetectionTools = ref('')
const highlightedMemoization = ref('')
const highlightedContextOptimization = ref('')
const highlightedCompositionPatterns = ref('')
const highlightedStateManagement = ref('')
const highlightedVirtualLists = ref('')

onMounted(() => {
  highlightedRenderCauses.value = Prism.highlight(renderCausesSnippet, Prism.languages.jsx, 'jsx')
  highlightedUnnecessaryRenders.value = Prism.highlight(unnecessaryRendersSnippet, Prism.languages.jsx, 'jsx')
  highlightedDetectionTools.value = Prism.highlight(detectionToolsSnippet, Prism.languages.jsx, 'jsx')
  highlightedMemoization.value = Prism.highlight(memoizationSnippet, Prism.languages.jsx, 'jsx')
  highlightedContextOptimization.value = Prism.highlight(contextOptimizationSnippet, Prism.languages.jsx, 'jsx')
  highlightedCompositionPatterns.value = Prism.highlight(compositionPatternsSnippet, Prism.languages.jsx, 'jsx')
  highlightedStateManagement.value = Prism.highlight(stateManagementSnippet, Prism.languages.jsx, 'jsx')
  highlightedVirtualLists.value = Prism.highlight(virtualListsSnippet, Prism.languages.jsx, 'jsx')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Отслеживание лишних рендеров в React
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Лишние ререндеры</b> — одна из главных причин проблем с производительностью в React приложениях.
              Понимание причин ререндера, умение их обнаруживать и оптимизировать — критически важные навыки
              для React-разработчика.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные причины ререндера</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-sync</v-icon>
                    <h3 class="text-h6 font-weight-bold">Всегда вызывают ререндер</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>setState</strong> — изменение локального состояния</li>
                    <li><strong>Новые props</strong> — изменение пропсов компонента</li>
                    <li><strong>Ререндер родителя</strong> — родитель перерендерился</li>
                    <li><strong>Context изменение</strong> — изменился используемый контекст</li>
                    <li><strong>forceUpdate()</strong> — принудительный ререндер (редко)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">НЕ вызывают ререндер</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>ref изменения</strong> — useRef не триггерит рендер</li>
                    <li><strong>Одинаковое значение</strong> — setState(prevValue)</li>
                    <li><strong>Мутация объекта</strong> — obj.field = value (без setState)</li>
                    <li><strong>Мемоизированный компонент</strong> — React.memo с теми же props</li>
                    <li><strong>Изменение вне компонента</strong> — глобальные переменные</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRenderCauses"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые причины ЛИШНИХ ререндеров</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Лишний ререндер — это когда компонент рендерится, но визуальный результат не изменился.
              Это трата ресурсов на вычисления и проверки DOM.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUnnecessaryRenders"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для обнаружения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDetectionTools"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Методы оптимизации: Мемоизация</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">React.memo</h3>
                  <p class="text-body-2">Мемоизация компонента — пропускает ререндер если props не изменились</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-function-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">useCallback</h3>
                  <p class="text-body-2">Мемоизация функций — возвращает ту же функцию при тех же зависимостях</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-calculator</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">useMemo</h3>
                  <p class="text-body-2">Мемоизация вычислений — кэширует результат при тех же зависимостях</p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMemoization"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация Context API</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedContextOptimization"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Паттерны композиции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCompositionPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация управления состоянием</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStateManagement"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Виртуализация для больших списков</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVirtualLists"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов оптимизации</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
                <th class="text-left font-weight-bold">Overhead</th>
                <th class="text-left font-weight-bold">Эффект</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>React.memo</b></td>
                <td>Компонент с частыми ререндерами родителя</td>
                <td class="text-warning">Сравнение props</td>
                <td class="text-success">Высокий</td>
              </tr>
              <tr>
                <td><b>useCallback</b></td>
                <td>Функции в props мемоизированных компонентов</td>
                <td class="text-success">Минимальный</td>
                <td class="text-info">Средний</td>
              </tr>
              <tr>
                <td><b>useMemo</b></td>
                <td>Дорогие вычисления, объекты/массивы в props</td>
                <td class="text-warning">Кэширование</td>
                <td class="text-success">Высокий</td>
              </tr>
              <tr>
                <td><b>Children prop</b></td>
                <td>Статичный контент в динамическом родителе</td>
                <td class="text-success">Нет</td>
                <td class="text-success">Очень высокий</td>
              </tr>
              <tr>
                <td><b>State colocation</b></td>
                <td>Локальное состояние</td>
                <td class="text-success">Нет</td>
                <td class="text-success">Высокий</td>
              </tr>
              <tr>
                <td><b>Виртуализация</b></td>
                <td>Списки > 100 элементов</td>
                <td class="text-warning">Библиотека</td>
                <td class="text-success">Критичный</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие есть основные причины ререндера в React?</p>
                <p class="font-weight-regular ma-0">
                  Три главные: (1) изменение собственного состояния через setState, (2) изменение пропсов,
                  (3) ререндер родительского компонента. Также: изменение контекста и forceUpdate().
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему дочерний компонент ререндерится при ререндере родителя?</p>
                <p class="font-weight-regular ma-0">
                  По умолчанию React ререндерит все дочерние компоненты при ререндере родителя, даже если props
                  не изменились. Это поведение можно изменить с помощью React.memo.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между useMemo и useCallback?</p>
                <p class="font-weight-regular ma-0">
                  useMemo кэширует результат вычисления (значение), useCallback кэширует саму функцию.
                  useCallback(fn, deps) === useMemo(() => fn, deps). Используйте useCallback для функций
                  в props, useMemo для дорогих вычислений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ стоит использовать React.memo?</p>
                <p class="font-weight-regular ma-0">
                  Когда компонент всегда рендерится с новыми props, когда сравнение props дороже рендера,
                  когда компонент очень простой (дешевый в рендере), когда props — сложные объекты без стабильных ссылок.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обнаружить лишние ререндеры?</p>
                <p class="font-weight-regular ma-0">
                  React DevTools Profiler (Flamegraph), библиотека why-did-you-render, кастомный хук
                  useWhyDidYouUpdate, console.log в компонентах. Профайлер показывает время рендера
                  и причины обновлений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое State Colocation и зачем оно нужно?</p>
                <p class="font-weight-regular ma-0">
                  Размещение состояния как можно ближе к месту использования. Это уменьшает область
                  ререндеров — только компонент и его потомки обновляются, а не все дерево.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать Context API?</p>
                <p class="font-weight-regular ma-0">
                  Разделять контексты по назначению, мемоизировать value контекста, использовать
                  селекторы для подписки только на нужные части состояния, рассмотреть альтернативы
                  (Zustand, Jotai) для глобального состояния.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое виртуализация списков и когда она нужна?</p>
                <p class="font-weight-regular ma-0">
                  Рендер только видимых элементов большого списка. Нужна для списков > 100 элементов.
                  Библиотеки: react-window, react-virtualized. Критична для производительности
                  при тысячах элементов.
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
                    <li>Профилировать перед оптимизацией</li>
                    <li>Колокация состояния</li>
                    <li>Children prop для статики</li>
                    <li>Мемоизация только где нужно</li>
                    <li>Разделение контекстов</li>
                    <li>Виртуализация больших списков</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Преждевременная оптимизация</li>
                    <li>Inline объекты/функции в JSX</li>
                    <li>Глобальное состояние для локальных данных</li>
                    <li>Мемоизация всего подряд</li>
                    <li>Игнорирование DevTools</li>
                    <li>Context для часто меняющихся данных</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Измеряйте реальное влияние</li>
                    <li>Оптимизируйте узкие места</li>
                    <li>Используйте React.StrictMode</li>
                    <li>Включайте Concurrent Mode</li>
                    <li>Изучайте Profiler регулярно</li>
                    <li>Документируйте оптимизации</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Чек-лист оптимизации производительности</h2>
            <v-card class="mb-8 pa-6">
              <v-card-text>
                <h3 class="text-h6 font-weight-bold mb-3">Базовые проверки:</h3>
                <ul class="mb-4">
                  <li>✅ Используется React DevTools Profiler для анализа</li>
                  <li>✅ Состояние размещено близко к месту использования</li>
                  <li>✅ Нет inline объектов/функций в props мемоизированных компонентов</li>
                  <li>✅ Context разделен по назначению и мемоизирован</li>
                  <li>✅ Большие списки виртуализированы</li>
                </ul>

                <h3 class="text-h6 font-weight-bold mb-3">Продвинутые:</h3>
                <ul>
                  <li>✅ React.memo используется для дорогих компонентов</li>
                  <li>✅ useCallback для функций в props мемоизированных компонентов</li>
                  <li>✅ useMemo для дорогих вычислений</li>
                  <li>✅ Children prop для статичного контента</li>
                  <li>✅ Code splitting и lazy loading реализованы</li>
                </ul>
              </v-card-text>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Основные причины ререндера:</b> изменение состояния (setState), изменение пропсов,
              ререндер родителя, изменение контекста. <b>Ключ к оптимизации:</b> обнаружение лишних
              ререндеров через профилирование, применение правильных методов оптимизации (мемоизация,
              композиция, виртуализация), и самое важное — <b>измерение реального эффекта</b> перед
              и после оптимизации.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/render-and-commit"
                target="_blank"
                class="mr-2">
                React Docs: Render
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/memo"
                target="_blank">
                React.memo Docs
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
