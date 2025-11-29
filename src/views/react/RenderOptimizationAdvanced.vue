<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const problemSnippet = `
// ❌ ПРОБЛЕМА - Избыточные рендеры

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Counter count={count} />
      <ExpensiveList /> {/* Ре-рендерится при каждом изменении text! */}
    </div>
  )
}

function ExpensiveList() {
  console.log('ExpensiveList rendered')

  // Тяжелые вычисления при каждом рендере
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    value: Math.random()
  }))

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  )
}
`

const memoBasicsSnippet = `
// ✅ React.memo - мемоизация компонента

import { memo } from 'react'

// Без memo - ре-рендер при каждом рендере родителя
function UserCard({ user }) {
  console.log('UserCard rendered')
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

// С memo - ре-рендер только если изменился user
const UserCardMemo = memo(function UserCard({ user }) {
  console.log('UserCardMemo rendered')
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
})

// Использование
function App() {
  const [count, setCount] = useState(0)
  const user = { name: 'John', email: 'john@example.com' }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserCard user={user} />         {/* Ре-рендер при каждом клике */}
      <UserCardMemo user={user} />     {/* Все равно ре-рендер! user - новый объект */}
    </div>
  )
}
`

const memoCustomCompareSnippet = `
// React.memo с кастомной функцией сравнения

const UserCard = memo(
  function UserCard({ user, onEdit }) {
    console.log('UserCard rendered')
    return (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={onEdit}>Edit</button>
      </div>
    )
  },
  // Кастомная функция сравнения (prevProps, nextProps)
  (prevProps, nextProps) => {
    // Возвращаем true, если пропсы РАВНЫ (не надо ре-рендерить)
    // Возвращаем false, если пропсы РАЗЛИЧНЫ (нужен ре-рендер)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email
      // Игнорируем onEdit - функция всегда новая, но это нормально
    )
  }
)

// Глубокое сравнение (ОСТОРОЖНО - может быть медленным!)
const DeepCompareCard = memo(
  UserCard,
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
  }
)
`

const useMemoBasicsSnippet = `
// useMemo - мемоизация вычислений

import { useMemo, useState } from 'react'

function ProductList({ products, filter }) {
  // ❌ БЕЗ useMemo - фильтрация при каждом рендере
  const filteredProducts = products.filter(p =>
    p.category === filter
  )

  // ✅ С useMemo - пересчет только при изменении зависимостей
  const filteredProductsMemo = useMemo(() => {
    console.log('Filtering products...')
    return products.filter(p => p.category === filter)
  }, [products, filter])

  return (
    <ul>
      {filteredProductsMemo.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}

// Сложные вычисления
function Chart({ data }) {
  const chartConfig = useMemo(() => {
    console.log('Computing chart config...')

    // Тяжелые вычисления
    const processed = data.map(item => ({
      x: item.timestamp,
      y: item.value * 2,
      color: item.value > 100 ? 'red' : 'green'
    }))

    return {
      data: processed,
      options: {
        scales: { /* ... */ },
        plugins: { /* ... */ }
      }
    }
  }, [data]) // Пересчет только при изменении data

  return <ChartComponent config={chartConfig} />
}
`

const useCallbackBasicsSnippet = `
// useCallback - мемоизация функций

import { useCallback, useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  // ❌ БЕЗ useCallback - новая функция при каждом рендере
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // ✅ С useCallback - та же функция, если зависимости не изменились
  const handleDeleteMemo = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }, [todos]) // Новая функция только при изменении todos

  // Лучше - используем функциональное обновление
  const handleDeleteBetter = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }, []) // Пустой массив - функция никогда не меняется!

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDeleteBetter}
        />
      ))}
    </div>
  )
}

// TodoItem с memo
const TodoItem = memo(function TodoItem({ todo, onDelete }) {
  console.log('TodoItem rendered:', todo.id)

  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
})
`

const useMemoVsUseCallbackSnippet = `
// useMemo vs useCallback - в чем разница?

function Example() {
  const [count, setCount] = useState(0)

  // useMemo - мемоизирует РЕЗУЛЬТАТ вычислений
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...')
    return count * 2
  }, [count])
  // expensiveValue = число (результат)

  // useCallback - мемоизирует САМУ ФУНКЦИЮ
  const handleClick = useCallback(() => {
    console.log('Button clicked')
    setCount(c => c + 1)
  }, [])
  // handleClick = функция

  // Эквивалентная запись:
  // useCallback(fn, deps) === useMemo(() => fn, deps)

  const handleClickEquivalent = useMemo(() => {
    return () => {
      console.log('Button clicked')
      setCount(c => c + 1)
    }
  }, [])

  return (
    <div>
      <p>Value: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
`

const complexExampleSnippet = `
// Комплексный пример всех оптимизаций

import { useState, useMemo, useCallback, memo } from 'react'

// 1. Мемоизированный компонент с тяжелыми вычислениями
const ExpensiveChart = memo(function ExpensiveChart({ data, config }) {
  // Тяжелая обработка данных
  const processedData = useMemo(() => {
    console.log('Processing chart data...')
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }))
  }, [data])

  // Опции графика
  const chartOptions = useMemo(() => ({
    responsive: true,
    scales: config.scales,
    plugins: config.plugins
  }), [config.scales, config.plugins])

  return <Chart data={processedData} options={chartOptions} />
})

// 2. Родительский компонент
function Dashboard() {
  const [filter, setFilter] = useState('all')
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Фильтрация данных
  const filteredData = useMemo(() => {
    console.log('Filtering data...')
    return data.filter(item => {
      const matchesFilter = filter === 'all' || item.category === filter
      const matchesSearch = item.name.includes(searchTerm)
      return matchesFilter && matchesSearch
    })
  }, [data, filter, searchTerm])

  // Конфигурация графика (стабильная ссылка)
  const chartConfig = useMemo(() => ({
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: true } }
  }), []) // Пустой массив - конфиг статичен

  // Обработчики с useCallback
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const handleRefresh = useCallback(() => {
    setData(fetchData())
  }, [])

  return (
    <div className="dashboard">
      <Filters
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
      />

      <ExpensiveChart
        data={filteredData}
        config={chartConfig}
      />

      <RefreshButton onClick={handleRefresh} />
    </div>
  )
}

// 3. Мемоизированные дочерние компоненты
const Filters = memo(function Filters({ filter, onFilterChange }) {
  console.log('Filters rendered')
  return (
    <div className="filters">
      {['all', 'active', 'completed'].map(f => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={filter === f ? 'active' : ''}
        >
          {f}
        </button>
      ))}
    </div>
  )
})

const SearchBar = memo(function SearchBar({ value, onChange }) {
  console.log('SearchBar rendered')
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  )
})

const RefreshButton = memo(function RefreshButton({ onClick }) {
  console.log('RefreshButton rendered')
  return <button onClick={onClick}>Refresh</button>
})
`

const commonMistakesSnippet = `
// Частые ошибки при оптимизации

// ❌ ОШИБКА 1: Новый объект в пропсах
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <Child
      user={{ name: 'John' }}  // Новый объект каждый раз!
      style={{ color: 'red' }}  // Новый объект каждый раз!
    />
  )
}

// ✅ ПРАВИЛЬНО: Стабильные ссылки
function ParentFixed() {
  const [count, setCount] = useState(0)

  const user = useMemo(() => ({ name: 'John' }), [])
  const style = useMemo(() => ({ color: 'red' }), [])

  return <Child user={user} style={style} />
}

// ❌ ОШИБКА 2: Новая функция в пропсах
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <Child
      onClick={() => console.log('clicked')}  // Новая функция!
    />
  )
}

// ✅ ПРАВИЛЬНО: useCallback
function ParentFixed() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  return <Child onClick={handleClick} />
}

// ❌ ОШИБКА 3: Забыли зависимости
function Component({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0)
  }, []) // Пустой массив - total никогда не обновится!

  // ✅ ПРАВИЛЬНО:
  const totalFixed = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0)
  }, [items])
}

// ❌ ОШИБКА 4: Преждевременная оптимизация
function SimpleComponent({ name }) {
  // Не нужно! Простое вычисление
  const uppercaseName = useMemo(() => name.toUpperCase(), [name])

  // Лучше просто:
  const uppercaseNameSimple = name.toUpperCase()
}

// ❌ ОШИБКА 5: memo без стабильных пропсов
const Child = memo(function Child({ user, onClick }) {
  return <div onClick={onClick}>{user.name}</div>
})

function Parent() {
  return (
    <Child
      user={{ name: 'John' }}         // Новый объект!
      onClick={() => alert('hi')}     // Новая функция!
    />
  )
  // memo бесполезен - пропсы всегда разные!
}
`

const performanceToolsSnippet = `
// Инструменты для профилирования

import { Profiler } from 'react'

function App() {
  const onRenderCallback = (
    id,           // "id" профилируемого компонента
    phase,        // "mount" или "update"
    actualDuration, // время рендера
    baseDuration,   // без мемоизации
    startTime,
    commitTime,
    interactions
  ) => {
    console.log(\`\${id}'s \${phase} phase:\`)
    console.log(\`Actual duration: \${actualDuration}ms\`)
    console.log(\`Base duration: \${baseDuration}ms\`)
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  )
}

// React DevTools Profiler
// 1. Открыть DevTools → Profiler
// 2. Нажать Record
// 3. Взаимодействовать с приложением
// 4. Stop
// 5. Анализировать Flame Chart

// Why Did You Render (библиотека)
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true
  })
}

// Добавить к компонентам для отслеживания
Component.whyDidYouRender = true
`

const virtualListSnippet = `
// Виртуализация списков для больших данных

import { FixedSizeList } from 'react-window'

// ❌ БЕЗ виртуализации - рендер всех 10000 элементов
function HugeList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} style={{ height: 50 }}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}

// ✅ С виртуализацией - рендер только видимых
function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  )

  return (
    <FixedSizeList
      height={600}      // Высота контейнера
      itemCount={items.length}
      itemSize={50}     // Высота каждого элемента
      width="100%"
    >
      {Row}
    </FixedSizeList>
  )
}

// Для переменной высоты элементов
import { VariableSizeList } from 'react-window'

function VariableList({ items }) {
  const getItemSize = (index) => {
    return items[index].height || 50
  }

  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
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

const codeSpllittingSnippet = `
// Code Splitting и Lazy Loading

import { lazy, Suspense } from 'react'

// ❌ Обычный импорт - весь код загружается сразу
import HeavyComponent from './HeavyComponent'
import AnotherHeavy from './AnotherHeavy'

// ✅ Lazy импорт - загрузка по требованию
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const AnotherHeavy = lazy(() => import('./AnotherHeavy'))

function App() {
  const [showHeavy, setShowHeavy] = useState(false)

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>
        Load Heavy Component
      </button>

      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  )
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// Prefetching для улучшения UX
function Navigation() {
  const prefetchDashboard = () => {
    import('./pages/Dashboard') // Предзагрузка
  }

  return (
    <nav>
      <Link
        to="/dashboard"
        onMouseEnter={prefetchDashboard}  // Загрузка при наведении
      >
        Dashboard
      </Link>
    </nav>
  )
}
`

const highlightedProblem = ref('')
const highlightedMemoBasics = ref('')
const highlightedMemoCustomCompare = ref('')
const highlightedUseMemoBasics = ref('')
const highlightedUseCallbackBasics = ref('')
const highlightedUseMemoVsUseCallback = ref('')
const highlightedComplexExample = ref('')
const highlightedCommonMistakes = ref('')
const highlightedPerformanceTools = ref('')
const highlightedVirtualList = ref('')
const highlightedCodeSplitting = ref('')

onMounted(() => {
  highlightedProblem.value = Prism.highlight(problemSnippet, Prism.languages.jsx, 'jsx')
  highlightedMemoBasics.value = Prism.highlight(memoBasicsSnippet, Prism.languages.jsx, 'jsx')
  highlightedMemoCustomCompare.value = Prism.highlight(memoCustomCompareSnippet, Prism.languages.jsx, 'jsx')
  highlightedUseMemoBasics.value = Prism.highlight(useMemoBasicsSnippet, Prism.languages.jsx, 'jsx')
  highlightedUseCallbackBasics.value = Prism.highlight(useCallbackBasicsSnippet, Prism.languages.jsx, 'jsx')
  highlightedUseMemoVsUseCallback.value = Prism.highlight(useMemoVsUseCallbackSnippet, Prism.languages.jsx, 'jsx')
  highlightedComplexExample.value = Prism.highlight(complexExampleSnippet, Prism.languages.jsx, 'jsx')
  highlightedCommonMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.jsx, 'jsx')
  highlightedPerformanceTools.value = Prism.highlight(performanceToolsSnippet, Prism.languages.jsx, 'jsx')
  highlightedVirtualList.value = Prism.highlight(virtualListSnippet, Prism.languages.jsx, 'jsx')
  highlightedCodeSplitting.value = Prism.highlight(codeSpllittingSnippet, Prism.languages.jsx, 'jsx')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Оптимизация рендеринга в React
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Оптимизация рендеринга</b> — критически важный навык в React-разработке.
              React по умолчанию ре-рендерит компоненты при изменении состояния или пропсов родителя.
              Понимание <b>React.memo</b>, <b>useMemo</b> и <b>useCallback</b> помогает избежать
              избыточных рендеров и улучшить производительность приложения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема: Избыточные рендеры</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> React ре-рендерит все дочерние компоненты при изменении
              состояния родителя, даже если их пропсы не изменились!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedProblem"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты оптимизации</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">React.memo</h3>
                  <p class="text-body-2">Мемоизирует компонент целиком. Пропускает рендер, если пропсы не изменились</p>
                  <v-chip color="primary" size="small" class="mt-2">Компоненты</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-calculator</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">useMemo</h3>
                  <p class="text-body-2">Мемоизирует результат вычислений. Пересчитывает только при изменении зависимостей</p>
                  <v-chip color="success" size="small" class="mt-2">Значения</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-function</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">useCallback</h3>
                  <p class="text-body-2">Мемоизирует функции. Возвращает ту же ссылку, если зависимости не изменились</p>
                  <v-chip color="warning" size="small" class="mt-2">Функции</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. React.memo — мемоизация компонентов</h2>
            <p class="font-weight-regular mb-4">
              <code>React.memo</code> — это HOC (Higher-Order Component), который оборачивает компонент
              и предотвращает его рендер, если пропсы не изменились (shallow comparison).
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMemoBasics"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Кастомная функция сравнения</h3>
            <p class="font-weight-regular mb-4">
              Можно передать вторым аргументом функцию для кастомного сравнения пропсов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMemoCustomCompare"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. useMemo — мемоизация вычислений</h2>
            <p class="font-weight-regular mb-4">
              <code>useMemo</code> кэширует результат дорогостоящих вычислений и пересчитывает
              только при изменении зависимостей.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseMemoBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. useCallback — мемоизация функций</h2>
            <p class="font-weight-regular mb-4">
              <code>useCallback</code> сохраняет ссылку на функцию между рендерами.
              Критически важно для передачи коллбэков в мемоизированные дочерние компоненты.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseCallbackBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useMemo vs useCallback</h2>
            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">useMemo</th>
                <th class="text-left font-weight-bold">useCallback</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Что мемоизирует</b></td>
                <td>Результат вычислений</td>
                <td>Саму функцию</td>
              </tr>
              <tr>
                <td><b>Возвращает</b></td>
                <td>Любое значение</td>
                <td>Функцию</td>
              </tr>
              <tr>
                <td><b>Использование</b></td>
                <td>Тяжелые вычисления, объекты, массивы</td>
                <td>Коллбэки для дочерних компонентов</td>
              </tr>
              <tr>
                <td><b>Эквивалентность</b></td>
                <td>-</td>
                <td>useCallback(fn, deps) === useMemo(() => fn, deps)</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseMemoVsUseCallback"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комплексный пример</h2>
            <p class="font-weight-regular mb-4">
              Реальный пример приложения с правильным использованием всех техник оптимизации:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComplexExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Частые ошибки</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Внимание:</strong> Неправильное использование мемоизации может не дать эффекта
              или даже ухудшить производительность!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommonMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать оптимизации?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">✅ Использовать</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Тяжелые вычисления в useMemo</li>
                    <li>Большие списки с memo</li>
                    <li>Коллбэки для мемоизированных компонентов</li>
                    <li>Объекты/массивы в зависимостях useEffect</li>
                    <li>Компоненты, которые рендерятся часто</li>
                    <li>Данные для графиков и визуализаций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">❌ Не использовать</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Простые вычисления (сложение, конкатенация)</li>
                    <li>Маленькие компоненты без детей</li>
                    <li>Компоненты, которые рендерятся редко</li>
                    <li>Преждевременная оптимизация</li>
                    <li>Везде "на всякий случай"</li>
                    <li>Без измерения производительности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты профилирования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformanceTools"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Виртуализация списков</h2>
            <p class="font-weight-regular mb-4">
              Для работы с большими списками (1000+ элементов) используйте виртуализацию —
              рендер только видимых элементов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVirtualList"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Code Splitting и Lazy Loading</h2>
            <p class="font-weight-regular mb-4">
              Разделение кода и отложенная загрузка компонентов уменьшают начальный bundle:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCodeSplitting"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правило оптимизации</h2>
            <v-card class="mb-8 pa-6 bg-info">
              <h3 class="text-h6 font-weight-bold mb-3">Порядок действий:</h3>
              <ol class="pl-4">
                <li class="mb-2"><strong>Измерить</strong> — используйте React DevTools Profiler</li>
                <li class="mb-2"><strong>Найти bottleneck</strong> — определите медленные компоненты</li>
                <li class="mb-2"><strong>Оптимизировать</strong> — примените memo/useMemo/useCallback</li>
                <li class="mb-2"><strong>Проверить</strong> — убедитесь, что стало быстрее</li>
                <li class="mb-2"><strong>Не переоптимизировать</strong> — помните о trade-offs</li>
              </ol>
              <v-alert color="warning" class="mt-4">
                <strong>Premature optimization is the root of all evil!</strong> — Donald Knuth
              </v-alert>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между React.memo и useMemo?</p>
                <p class="font-weight-regular ma-0">
                  <code>React.memo</code> мемоизирует весь компонент (пропускает рендер).
                  <code>useMemo</code> мемоизирует результат вычислений внутри компонента.
                  React.memo — для компонентов, useMemo — для значений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему useCallback важен для React.memo?</p>
                <p class="font-weight-regular ma-0">
                  Без useCallback функция создается заново при каждом рендере. React.memo видит
                  новую ссылку и считает, что пропс изменился → ре-рендер. useCallback сохраняет
                  ссылку → memo работает корректно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ нужно использовать memo?</p>
                <p class="font-weight-regular ma-0">
                  Для простых компонентов без детей, компонентов которые всегда получают новые пропсы,
                  листовых компонентов без логики. Memo добавляет overhead на сравнение пропсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое referential equality в контексте React?</p>
                <p class="font-weight-regular ma-0">
                  React сравнивает пропсы по ссылке (===), а не по значению. Объекты {a:1} и {a:1} —
                  разные ссылки. Поэтому нужны useMemo/useCallback для стабильных ссылок.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает shallow comparison в React.memo?</p>
                <p class="font-weight-regular ma-0">
                  React.memo сравнивает пропсы поверхностно: для примитивов по значению, для
                  объектов/массивов/функций по ссылке. Если нужно глубокое сравнение — передать
                  кастомную функцию вторым аргументом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между useMemo и простой переменной?</p>
                <p class="font-weight-regular ma-0">
                  Переменная пересчитывается при каждом рендере. useMemo — только при изменении
                  зависимостей. Для дорогих вычислений useMemo экономит время, для простых — добавляет overhead.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Чек-лист оптимизации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎯 Компоненты</h3>
                  <ul class="pl-4">
                    <li>React.memo для медленных компонентов</li>
                    <li>Проверить, что пропсы стабильны</li>
                    <li>Разделить большие компоненты</li>
                    <li>Использовать key правильно</li>
                    <li>Lazy loading для роутов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">💾 Данные</h3>
                  <ul class="pl-4">
                    <li>useMemo для тяжелых вычислений</li>
                    <li>Виртуализация больших списков</li>
                    <li>Нормализация данных в Redux</li>
                    <li>Правильные зависимости</li>
                    <li>Избегать глубокого вложения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔧 Функции</h3>
                  <ul class="pl-4">
                    <li>useCallback для коллбэков</li>
                    <li>Функциональные обновления setState</li>
                    <li>Избегать inline функций в JSX</li>
                    <li>Стабильные ссылки на объекты</li>
                    <li>Debounce/throttle для событий</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Оптимизация рендеринга в React</b> основывается на трех китах: <b>React.memo</b>
              (мемоизация компонентов), <b>useMemo</b> (мемоизация вычислений) и <b>useCallback</b>
              (мемоизация функций). Ключевые принципы: измерять перед оптимизацией, понимать
              referential equality, использовать стабильные ссылки, применять виртуализацию для
              больших списков и code splitting для уменьшения bundle size. Помните: преждевременная
              оптимизация — корень всех зол. Сначала профилируйте, затем оптимизируйте!
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/memo"
                target="_blank"
                class="mr-2">
                React.memo
              </v-btn>
              <v-btn
                color="success"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useMemo"
                target="_blank"
                class="mr-2">
                useMemo
              </v-btn>
              <v-btn
                color="warning"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useCallback"
                target="_blank">
                useCallback
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
