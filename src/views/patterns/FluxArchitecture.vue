<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const problemSnippet = `
// ❌ ПРОБЛЕМА - Двунаправленный поток данных (MVC)

// Model
class UserModel {
  constructor() {
    this.name = ''
    this.email = ''
  }

  setName(name) {
    this.name = name
    // Уведомляем View
    this.notifyViews()
  }
}

// View
class UserView {
  constructor(model) {
    this.model = model
  }

  render() {
    // View читает из Model
    console.log(this.model.name)
  }

  handleInput(value) {
    // View обновляет Model
    this.model.setName(value)
  }
}

// Controller
class UserController {
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  updateUser(name) {
    // Controller обновляет Model
    this.model.setName(name)
  }
}

// Проблемы:
// 1. View может напрямую менять Model
// 2. Model уведомляет View (двунаправленная связь)
// 3. Сложно отследить, откуда пришло изменение
// 4. Каскадные обновления приводят к непредсказуемости
// 5. Множественные источники правды (data flow)
`

const fluxBasicsSnippet = `
// ✅ FLUX - Однонаправленный поток данных

// 1. Action - описывает ЧТО произошло
const UserActions = {
  updateName(name) {
    return {
      type: 'USER_UPDATE_NAME',
      payload: { name }
    }
  },

  updateEmail(email) {
    return {
      type: 'USER_UPDATE_EMAIL',
      payload: { email }
    }
  },

  loadUser(userId) {
    return {
      type: 'USER_LOAD',
      payload: { userId }
    }
  }
}

// 2. Dispatcher - центральный хаб для всех действий
class Dispatcher {
  constructor() {
    this.callbacks = []
  }

  register(callback) {
    this.callbacks.push(callback)
    return this.callbacks.length - 1 // token для отписки
  }

  dispatch(action) {
    console.log('Dispatching:', action.type)
    // Все Store получают ВСЕ действия
    this.callbacks.forEach(callback => callback(action))
  }
}

// 3. Store - хранит состояние и бизнес-логику
class UserStore {
  constructor(dispatcher) {
    this.state = {
      name: '',
      email: '',
      loading: false
    }

    this.listeners = []

    // Регистрируемся в Dispatcher
    dispatcher.register(this.handleAction.bind(this))
  }

  handleAction(action) {
    switch (action.type) {
      case 'USER_UPDATE_NAME':
        this.state.name = action.payload.name
        this.emitChange()
        break

      case 'USER_UPDATE_EMAIL':
        this.state.email = action.payload.email
        this.emitChange()
        break

      case 'USER_LOAD':
        this.state.loading = true
        this.emitChange()
        // Имитация загрузки
        setTimeout(() => {
          this.state.loading = false
          this.state.name = 'John Doe'
          this.emitChange()
        }, 1000)
        break
    }
  }

  getState() {
    // Store - единственный источник правды
    return this.state
  }

  addListener(callback) {
    this.listeners.push(callback)
  }

  emitChange() {
    // Уведомляем View об изменениях
    this.listeners.forEach(listener => listener())
  }
}

// 4. View - отображает данные и создает действия
class UserView {
  constructor(store, dispatcher) {
    this.store = store
    this.dispatcher = dispatcher

    // Подписываемся на изменения Store
    this.store.addListener(this.render.bind(this))
  }

  render() {
    const state = this.store.getState()
    console.log('Rendering:', state)
    // Обновляем UI
  }

  handleNameInput(name) {
    // View создает Action и отправляет через Dispatcher
    const action = UserActions.updateName(name)
    this.dispatcher.dispatch(action)
  }
}
`

const dataFlowSnippet = `
// Однонаправленный поток данных в Flux

/*
┌──────────────────────────────────────────────────┐
│                                                  │
│  Action → Dispatcher → Store → View → Action    │
│     ↑                              │             │
│     └──────────────────────────────┘             │
│                                                  │
└──────────────────────────────────────────────────┘

Детализация:

1. View создает Action
   ↓
2. Action отправляется в Dispatcher
   ↓
3. Dispatcher рассылает Action всем Store
   ↓
4. Store обрабатывает Action и обновляет состояние
   ↓
5. Store уведомляет View об изменениях
   ↓
6. View запрашивает новое состояние из Store
   ↓
7. View перерисовывается с новыми данными
*/

// Пошаговый пример потока данных

// Шаг 1: Пользователь вводит имя в input
const handleInput = (event) => {
  const name = event.target.value

  // Шаг 2: View создает Action
  const action = {
    type: 'USER_UPDATE_NAME',
    payload: { name }
  }

  // Шаг 3: Action отправляется в Dispatcher
  dispatcher.dispatch(action)
}

// Шаг 4: Dispatcher рассылает всем Store
dispatcher.register((action) => {
  if (action.type === 'USER_UPDATE_NAME') {
    // Шаг 5: Store обновляет состояние
    userStore.state.name = action.payload.name

    // Шаг 6: Store уведомляет подписчиков
    userStore.emitChange()
  }
})

// Шаг 7: View получает уведомление и обновляется
userStore.addListener(() => {
  const newState = userStore.getState()
  renderView(newState)
})
`

const actionCreatorsSnippet = `
// Action Creators - функции для создания действий

// Синхронные действия
const TodoActions = {
  addTodo(text) {
    return {
      type: 'TODO_ADD',
      payload: {
        id: Date.now(),
        text,
        completed: false
      }
    }
  },

  toggleTodo(id) {
    return {
      type: 'TODO_TOGGLE',
      payload: { id }
    }
  },

  deleteTodo(id) {
    return {
      type: 'TODO_DELETE',
      payload: { id }
    }
  }
}

// Асинхронные действия через thunk-подобный паттерн
const AsyncActions = {
  // Action Creator возвращает функцию
  loadTodos() {
    return (dispatch) => {
      // Отправляем действие начала загрузки
      dispatch({
        type: 'TODOS_LOAD_START'
      })

      // Асинхронная операция
      fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
          // Отправляем действие успешной загрузки
          dispatch({
            type: 'TODOS_LOAD_SUCCESS',
            payload: { todos }
          })
        })
        .catch(error => {
          // Отправляем действие ошибки
          dispatch({
            type: 'TODOS_LOAD_ERROR',
            payload: { error: error.message }
          })
        })
    }
  },

  saveTodo(todo) {
    return (dispatch) => {
      dispatch({ type: 'TODO_SAVE_START', payload: { id: todo.id } })

      fetch(\`/api/todos/\${todo.id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      })
        .then(response => response.json())
        .then(savedTodo => {
          dispatch({
            type: 'TODO_SAVE_SUCCESS',
            payload: { todo: savedTodo }
          })
        })
        .catch(error => {
          dispatch({
            type: 'TODO_SAVE_ERROR',
            payload: { id: todo.id, error: error.message }
          })
        })
    }
  }
}
`

const multipleStoresSnippet = `
// Множественные Store с зависимостями

class TodoStore {
  constructor(dispatcher) {
    this.state = {
      todos: [],
      loading: false
    }

    this.dispatchToken = dispatcher.register(
      this.handleAction.bind(this)
    )
  }

  handleAction(action) {
    switch (action.type) {
      case 'TODO_ADD':
        this.state.todos.push(action.payload)
        this.emitChange()
        break

      case 'TODO_TOGGLE':
        const todo = this.state.todos.find(t => t.id === action.payload.id)
        if (todo) {
          todo.completed = !todo.completed
          this.emitChange()
        }
        break
    }
  }

  getTodos() {
    return this.state.todos
  }

  getCompletedCount() {
    return this.state.todos.filter(t => t.completed).length
  }
}

class StatisticsStore {
  constructor(dispatcher, todoStore) {
    this.todoStore = todoStore
    this.state = {
      total: 0,
      completed: 0,
      percentage: 0
    }

    this.dispatchToken = dispatcher.register(
      this.handleAction.bind(this)
    )
  }

  handleAction(action) {
    switch (action.type) {
      case 'TODO_ADD':
      case 'TODO_TOGGLE':
      case 'TODO_DELETE':
        // Ждем, пока TodoStore обработает действие
        dispatcher.waitFor([this.todoStore.dispatchToken])

        // Теперь можем получить актуальные данные
        const todos = this.todoStore.getTodos()
        this.state.total = todos.length
        this.state.completed = this.todoStore.getCompletedCount()
        this.state.percentage = this.state.total > 0
          ? (this.state.completed / this.state.total) * 100
          : 0

        this.emitChange()
        break
    }
  }

  getStatistics() {
    return this.state
  }
}

// Использование waitFor для зависимостей между Store
dispatcher.register((action) => {
  // TodoStore обрабатывает первым
  if (action.type === 'TODO_ADD') {
    todoStore.handleAction(action)
  }
})

dispatcher.register((action) => {
  // StatisticsStore ждет TodoStore
  if (action.type === 'TODO_ADD') {
    dispatcher.waitFor([todoStore.dispatchToken])
    statisticsStore.handleAction(action)
  }
})
`

const reactIntegrationSnippet = `
// Интеграция Flux с React

import React, { Component } from 'react'

// Container Component - подключается к Store
class TodoContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: todoStore.getTodos(),
      statistics: statisticsStore.getStatistics()
    }

    // Привязываем методы
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // Подписываемся на изменения Store
    todoStore.addListener(this.onChange)
    statisticsStore.addListener(this.onChange)
  }

  componentWillUnmount() {
    // Отписываемся при размонтировании
    todoStore.removeListener(this.onChange)
    statisticsStore.removeListener(this.onChange)
  }

  onChange() {
    // Обновляем состояние компонента при изменении Store
    this.setState({
      todos: todoStore.getTodos(),
      statistics: statisticsStore.getStatistics()
    })
  }

  handleAddTodo = (text) => {
    // Создаем и отправляем действие
    const action = TodoActions.addTodo(text)
    dispatcher.dispatch(action)
  }

  handleToggleTodo = (id) => {
    const action = TodoActions.toggleTodo(id)
    dispatcher.dispatch(action)
  }

  render() {
    return (
      <div>
        <TodoList
          todos={this.state.todos}
          onToggle={this.handleToggleTodo}
        />
        <TodoForm onAdd={this.handleAddTodo} />
        <Statistics stats={this.state.statistics} />
      </div>
    )
  }
}

// Presentational Component - чистый UI
const TodoList = ({ todos, onToggle }) => (
  <ul>
    {todos.map(todo => (
      <li
        key={todo.id}
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}
      >
        {todo.text}
      </li>
    ))}
  </ul>
)

const TodoForm = ({ onAdd }) => {
  const [text, setText] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
  )
}

const Statistics = ({ stats }) => (
  <div>
    <p>Total: {stats.total}</p>
    <p>Completed: {stats.completed}</p>
    <p>Progress: {stats.percentage.toFixed(0)}%</p>
  </div>
)
`

const modernAlternativesSnippet = `
// Современные альтернативы Flux

// 1. Redux - упрощенный Flux
import { createStore } from 'redux'

// Reducer вместо Store
const todoReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case 'TODO_ADD':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'TODO_TOGGLE':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

const store = createStore(todoReducer)

// 2. MobX - реактивное состояние
import { makeObservable, observable, action } from 'mobx'

class TodoStore {
  todos = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action
    })
  }

  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }
}

// 3. Zustand - минималистичный state manager
import create from 'zustand'

const useTodoStore = create((set) => ({
  todos: [],

  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: Date.now(),
      text,
      completed: false
    }]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  }))
}))

// 4. Jotai - атомарное состояние
import { atom, useAtom } from 'jotai'

const todosAtom = atom([])

const addTodoAtom = atom(
  null,
  (get, set, text) => {
    const todos = get(todosAtom)
    set(todosAtom, [...todos, {
      id: Date.now(),
      text,
      completed: false
    }])
  }
)

// 5. React Context + useReducer (встроенное)
const TodoContext = React.createContext()

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = React.useReducer(todoReducer, {
    todos: []
  })

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}
`

const highlightedProblem = ref('')
const highlightedFluxBasics = ref('')
const highlightedDataFlow = ref('')
const highlightedActionCreators = ref('')
const highlightedMultipleStores = ref('')
const highlightedReactIntegration = ref('')
const highlightedModernAlternatives = ref('')

onMounted(() => {
  highlightedProblem.value = Prism.highlight(problemSnippet, Prism.languages.javascript, 'javascript')
  highlightedFluxBasics.value = Prism.highlight(fluxBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedDataFlow.value = Prism.highlight(dataFlowSnippet, Prism.languages.javascript, 'javascript')
  highlightedActionCreators.value = Prism.highlight(actionCreatorsSnippet, Prism.languages.javascript, 'javascript')
  highlightedMultipleStores.value = Prism.highlight(multipleStoresSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactIntegration.value = Prism.highlight(reactIntegrationSnippet, Prism.languages.javascript, 'javascript')
  highlightedModernAlternatives.value = Prism.highlight(modernAlternativesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Flux: архитектура однонаправленного потока данных
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Flux</b> — это архитектурный паттерн, разработанный Facebook для построения клиентских веб-приложений.
              Главная идея: <b>однонаправленный поток данных</b> (unidirectional data flow), который делает приложение
              более предсказуемым и легким в отладке.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Какую проблему решает Flux?</h2>

            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> В традиционном MVC двунаправленный поток данных приводит к каскадным обновлениям
              и непредсказуемому поведению при росте приложения.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-alert-octagon</v-icon>
                    <h3 class="text-h6 font-weight-bold">Проблемы MVC</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Двунаправленный поток</strong> — Model ↔ View</li>
                    <li><strong>Множественные источники правды</strong></li>
                    <li><strong>Каскадные обновления</strong> — трудно отследить</li>
                    <li><strong>Сложная отладка</strong> — откуда пришло изменение?</li>
                    <li><strong>Непредсказуемость</strong> при масштабировании</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Решение Flux</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Однонаправленный поток</strong> — Action → Store → View</li>
                    <li><strong>Единственный источник правды</strong> — Store</li>
                    <li><strong>Предсказуемые обновления</strong></li>
                    <li><strong>Простая отладка</strong> — четкая цепочка событий</li>
                    <li><strong>Масштабируемость</strong> — добавление функций проще</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedProblem"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные компоненты Flux</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-lightning-bolt</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Action</h3>
                  <p class="text-body-2">
                    Описывает ЧТО произошло. Простой объект с <code>type</code> и <code>payload</code>.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-transit-connection-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Dispatcher</h3>
                  <p class="text-body-2">
                    Центральный хаб. Рассылает все действия всем Store.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Store</h3>
                  <p class="text-body-2">
                    Хранит состояние и бизнес-логику. Единственный источник правды.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-application</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">View</h3>
                  <p class="text-body-2">
                    Отображает данные. Создает действия в ответ на пользовательский ввод.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFluxBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Однонаправленный поток данных</h2>

            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-arrow-right-bold</v-icon>
              <strong>Ключевая особенность:</strong> Данные движутся только в одном направлении:
              Action → Dispatcher → Store → View → Action (по кругу)
            </v-alert>

            <v-card class="mb-6 pa-6 bg-blue-grey-lighten-5">
              <h3 class="text-h6 font-weight-bold mb-4 text-center">Схема потока данных в Flux</h3>
              <div class="text-center">
                <v-icon size="80" color="primary">mdi-gesture-tap</v-icon>
                <p class="text-h6 mb-2">User Action</p>
                <v-icon size="40" color="grey">mdi-arrow-down</v-icon>
              </div>
              <div class="text-center">
                <v-icon size="80" color="info">mdi-lightning-bolt</v-icon>
                <p class="text-h6 mb-2">Action Creator</p>
                <v-icon size="40" color="grey">mdi-arrow-down</v-icon>
              </div>
              <div class="text-center">
                <v-icon size="80" color="warning">mdi-transit-connection-variant</v-icon>
                <p class="text-h6 mb-2">Dispatcher</p>
                <v-icon size="40" color="grey">mdi-arrow-down</v-icon>
              </div>
              <div class="text-center">
                <v-icon size="80" color="success">mdi-database</v-icon>
                <p class="text-h6 mb-2">Store(s)</p>
                <v-icon size="40" color="grey">mdi-arrow-down</v-icon>
              </div>
              <div class="text-center">
                <v-icon size="80" color="error">mdi-application</v-icon>
                <p class="text-h6 mb-2">View (React)</p>
                <v-icon size="40" color="grey">mdi-arrow-up-left</v-icon>
              </div>
              <p class="text-center text-caption mt-2">Цикл повторяется при новых действиях пользователя</p>
            </v-card>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDataFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Action Creators</h2>
            <p class="font-weight-regular mb-4">
              Action Creators — это функции-помощники, которые создают объекты действий. Они инкапсулируют
              создание действий и делают код более читаемым.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedActionCreators"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Множественные Store и зависимости</h2>
            <p class="font-weight-regular mb-4">
              В Flux может быть несколько Store, каждый отвечает за свою часть состояния. Метод <code>waitFor()</code>
              позволяет координировать обновления между Store.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleStores"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Интеграция с React</h2>
            <p class="font-weight-regular mb-4">
              Flux отлично работает с React. Container компоненты подключаются к Store,
              Presentational компоненты отвечают только за отображение.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactIntegration"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Flux vs MVC — ключевые отличия</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">MVC</th>
                <th class="text-left font-weight-bold">Flux</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Поток данных</b></td>
                <td class="text-error">Двунаправленный (Model ↔ View)</td>
                <td class="text-success">Однонаправленный (Action → Store → View)</td>
              </tr>
              <tr>
                <td><b>Источник правды</b></td>
                <td class="text-error">Множественные Model</td>
                <td class="text-success">Store — единственный источник</td>
              </tr>
              <tr>
                <td><b>Изменение состояния</b></td>
                <td class="text-error">Model и View могут менять друг друга</td>
                <td class="text-success">Только через Action и Store</td>
              </tr>
              <tr>
                <td><b>Предсказуемость</b></td>
                <td class="text-warning">Сложно при росте приложения</td>
                <td class="text-success">Высокая благодаря четкому потоку</td>
              </tr>
              <tr>
                <td><b>Отладка</b></td>
                <td class="text-warning">Сложно отследить источник изменения</td>
                <td class="text-success">Легко через лог действий</td>
              </tr>
              <tr>
                <td><b>Тестирование</b></td>
                <td class="text-warning">Требует моков для взаимосвязей</td>
                <td class="text-success">Store легко тестируются изолированно</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества и недостатки Flux</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-thumb-up</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Предсказуемость</strong> — четкий поток данных</li>
                    <li><strong>Отладка</strong> — легко отследить изменения</li>
                    <li><strong>Масштабируемость</strong> — легко добавлять функции</li>
                    <li><strong>Тестируемость</strong> — изолированные Store</li>
                    <li><strong>Time-travel</strong> — возможность "отмотать" состояние</li>
                    <li><strong>Единственный источник правды</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold">Недостатки</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Многословность</strong> — много кода для простых операций</li>
                    <li><strong>Boilerplate</strong> — повторяющийся код</li>
                    <li><strong>Сложность</strong> — для новичков может быть сложно</li>
                    <li><strong>Оверинжениринг</strong> — для маленьких приложений</li>
                    <li><strong>Синхронность</strong> — нужны дополнительные паттерны для async</li>
                    <li><strong>Dispatcher</strong> — дополнительный слой абстракции</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные альтернативы</h2>
            <p class="font-weight-regular mb-4">
              Flux вдохновил создание множества библиотек управления состоянием. Многие из них упрощают
              концепции Flux или добавляют новые возможности.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedModernAlternatives"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Flux и какую проблему он решает?</p>
                <p class="font-weight-regular ma-0">
                  Flux — это архитектурный паттерн с однонаправленным потоком данных, разработанный Facebook.
                  Он решает проблему непредсказуемого поведения в приложениях с двунаправленным потоком данных (MVC),
                  делая изменения состояния предсказуемыми и легко отслеживаемыми.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как осуществляется передача данных в Flux?</p>
                <p class="font-weight-regular ma-0">
                  Данные движутся по кругу: View создает Action → Action отправляется в Dispatcher →
                  Dispatcher рассылает Action всем Store → Store обновляют состояние →
                  Store уведомляют View → View перерисовывается. Это однонаправленный цикл.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Dispatcher и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Dispatcher — центральный хаб для всех действий в приложении. Он регистрирует Store,
                  рассылает все действия всем Store и управляет порядком выполнения через <code>waitFor()</code>.
                  Это обеспечивает предсказуемость и координацию между Store.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Flux и Redux?</p>
                <p class="font-weight-regular ma-0">
                  Redux упрощает Flux: один Store вместо множества, reducer'ы вместо Dispatcher,
                  иммутабельные обновления, middleware для async операций. Redux более функциональный и менее многословный.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обрабатывать асинхронные операции в Flux?</p>
                <p class="font-weight-regular ma-0">
                  В чистом Flux — через Action Creators, которые отправляют несколько действий (START, SUCCESS, ERROR).
                  Можно использовать Promise-based или thunk-подобные паттерны. Также существуют middleware решения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ стоит использовать Flux?</p>
                <p class="font-weight-regular ma-0">
                  Для маленьких приложений с простым состоянием, прототипов, статических сайтов,
                  простых форм. Flux добавляет сложность, которая оправдана только в средних и больших приложениях
                  со сложным состоянием и множественными источниками обновлений.
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
                    <li>Держать Store неизменяемыми</li>
                    <li>Использовать Action Constants</li>
                    <li>Создавать Action Creators для каждого действия</li>
                    <li>Разделять Container и Presentational компоненты</li>
                    <li>Логировать все действия для отладки</li>
                    <li>Тестировать Store изолированно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Мутации состояния напрямую в Store</li>
                    <li>Обращение к Store напрямую из View</li>
                    <li>Логику в Action Creators</li>
                    <li>Множество мелких действий (группировать)</li>
                    <li>Циклических зависимостей между Store</li>
                    <li>Игнорирование waitFor() при зависимостях</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте Redux DevTools для отладки</li>
                    <li>Рассмотрите Redux вместо чистого Flux</li>
                    <li>Применяйте TypeScript для типизации действий</li>
                    <li>Документируйте структуру Store</li>
                    <li>Начинайте с простого, усложняйте по необходимости</li>
                    <li>Изучайте современные альтернативы (Zustand, Jotai)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Flux</b> — это архитектурный паттерн с <b>однонаправленным потоком данных</b>, который решает проблему
              непредсказуемости в приложениях с двунаправленным потоком (MVC). Основные компоненты:
              <b>Action</b> (что произошло), <b>Dispatcher</b> (центральный хаб), <b>Store</b> (состояние и логика),
              <b>View</b> (отображение). Поток данных: Action → Dispatcher → Store → View → Action.
              Flux вдохновил создание Redux, MobX и других современных решений для управления состоянием.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://facebook.github.io/flux/"
                target="_blank"
                class="mr-2">
                Официальная документация Flux
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/facebook/flux"
                target="_blank">
                GitHub Flux
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
