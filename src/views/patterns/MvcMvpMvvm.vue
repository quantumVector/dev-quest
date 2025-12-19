<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const mvcSnippet = `
// MVC - Model-View-Controller
// Модель: бизнес-логика и данные
class UserModel {
  constructor() {
    this.users = []
  }

  async fetchUsers() {
    const response = await fetch('/api/users')
    this.users = await response.json()
    return this.users
  }

  addUser(user) {
    this.users.push(user)
    // Сохранение на сервере
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
  }

  getUsers() {
    return this.users
  }
}

// Представление: отображение данных
class UserView {
  constructor() {
    this.container = document.getElementById('user-list')
  }

  render(users) {
    this.container.innerHTML = \`
      <ul>
        \${users.map(user => \`
          <li>
            <span>\${user.name}</span>
            <button data-id="\${user.id}" class="delete">Delete</button>
          </li>
        \`).join('')}
      </ul>
      <form id="add-user-form">
        <input type="text" name="name" placeholder="Name" required>
        <button type="submit">Add User</button>
      </form>
    \`
  }

  bindAddUser(handler) {
    const form = document.getElementById('add-user-form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      handler({ name: formData.get('name'), id: Date.now() })
      e.target.reset()
    })
  }

  bindDeleteUser(handler) {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        handler(e.target.dataset.id)
      }
    })
  }
}

// Контроллер: посредник между Model и View
class UserController {
  constructor(model, view) {
    this.model = model
    this.view = view

    // View сообщает Controller о действиях пользователя
    this.view.bindAddUser(this.handleAddUser.bind(this))
    this.view.bindDeleteUser(this.handleDeleteUser.bind(this))

    // Инициализация
    this.loadUsers()
  }

  async loadUsers() {
    const users = await this.model.fetchUsers()
    this.view.render(users)
  }

  handleAddUser(user) {
    this.model.addUser(user)
    this.view.render(this.model.getUsers())
  }

  handleDeleteUser(id) {
    // Логика удаления
    this.view.render(this.model.getUsers())
  }
}

// Инициализация MVC
const app = new UserController(new UserModel(), new UserView())
`

const mvpSnippet = `
// MVP - Model-View-Presenter
// Модель: только данные, без бизнес-логики отображения
class TaskModel {
  constructor() {
    this.tasks = []
  }

  getTasks() {
    return [...this.tasks]
  }

  addTask(task) {
    this.tasks.push({ ...task, id: Date.now(), completed: false })
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id)
    if (task) task.completed = !task.completed
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id)
  }
}

// View: пассивное представление (интерфейс)
// View не содержит логики, только методы для обновления UI
class TaskView {
  constructor() {
    this.app = document.getElementById('app')
  }

  // View предоставляет методы для Presenter
  displayTasks(tasks) {
    this.app.innerHTML = \`
      <div class="task-list">
        \${tasks.map(task => \`
          <div class="task \${task.completed ? 'completed' : ''}">
            <input
              type="checkbox"
              data-id="\${task.id}"
              \${task.completed ? 'checked' : ''}
            >
            <span>\${task.title}</span>
            <button data-id="\${task.id}" class="delete">×</button>
          </div>
        \`).join('')}
      </div>
      <form id="task-form">
        <input type="text" name="title" placeholder="New task" required>
        <button type="submit">Add</button>
      </form>
    \`
  }

  // Геттеры для элементов (Presenter запрашивает значения)
  getTaskInput() {
    return document.querySelector('#task-form input[name="title"]').value
  }

  clearTaskInput() {
    document.querySelector('#task-form input[name="title"]').value = ''
  }

  // View уведомляет Presenter о событиях через колбэки
  bindAddTask(handler) {
    document.getElementById('task-form').addEventListener('submit', (e) => {
      e.preventDefault()
      handler()
    })
  }

  bindToggleTask(handler) {
    this.app.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        handler(parseInt(e.target.dataset.id))
      }
    })
  }

  bindDeleteTask(handler) {
    this.app.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        handler(parseInt(e.target.dataset.id))
      }
    })
  }
}

// Presenter: вся логика взаимодействия
// Presenter управляет View и обновляет Model
class TaskPresenter {
  constructor(model, view) {
    this.model = model
    this.view = view

    // Presenter подписывается на события View
    this.view.bindAddTask(this.handleAddTask.bind(this))
    this.view.bindToggleTask(this.handleToggleTask.bind(this))
    this.view.bindDeleteTask(this.handleDeleteTask.bind(this))

    // Начальная отрисовка
    this.updateView()
  }

  updateView() {
    const tasks = this.model.getTasks()
    this.view.displayTasks(tasks)
  }

  handleAddTask() {
    const title = this.view.getTaskInput()
    if (title.trim()) {
      this.model.addTask({ title })
      this.view.clearTaskInput()
      this.updateView()
    }
  }

  handleToggleTask(id) {
    this.model.toggleTask(id)
    this.updateView()
  }

  handleDeleteTask(id) {
    this.model.deleteTask(id)
    this.updateView()
  }
}

// Инициализация MVP
const taskApp = new TaskPresenter(new TaskModel(), new TaskView())
`

const mvvmSnippet = `
// MVVM - Model-View-ViewModel
// Используем Proxy для реактивности (упрощенный Vue/React подход)

// Модель: данные и бизнес-логика
class ProductModel {
  constructor() {
    this.products = []
    this.filters = {
      search: '',
      category: 'all',
      minPrice: 0
    }
  }

  async fetchProducts() {
    const response = await fetch('/api/products')
    this.products = await response.json()
  }

  addProduct(product) {
    this.products.push({ ...product, id: Date.now() })
  }

  updateFilters(filters) {
    this.filters = { ...this.filters, ...filters }
  }

  getFilteredProducts() {
    return this.products.filter(p => {
      const matchesSearch = p.name.toLowerCase()
        .includes(this.filters.search.toLowerCase())
      const matchesCategory = this.filters.category === 'all' ||
        p.category === this.filters.category
      const matchesPrice = p.price >= this.filters.minPrice

      return matchesSearch && matchesCategory && matchesPrice
    })
  }
}

// ViewModel: связывает Model и View через реактивность
class ProductViewModel {
  constructor(model) {
    this.model = model
    this.state = this.createReactiveState({
      products: [],
      filteredProducts: [],
      filters: { search: '', category: 'all', minPrice: 0 },
      isLoading: false
    })

    this.init()
  }

  // Создание реактивного состояния через Proxy
  createReactiveState(initialState) {
    return new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value
        // Автоматическое обновление View при изменении состояния
        this.notifyView()
        return true
      }
    })
  }

  async init() {
    this.state.isLoading = true
    await this.model.fetchProducts()
    this.state.products = this.model.products
    this.state.filteredProducts = this.model.getFilteredProducts()
    this.state.isLoading = false
  }

  // Команды для View (двусторонняя привязка)
  updateSearch(value) {
    this.state.filters.search = value
    this.model.updateFilters({ search: value })
    this.state.filteredProducts = this.model.getFilteredProducts()
  }

  updateCategory(value) {
    this.state.filters.category = value
    this.model.updateFilters({ category: value })
    this.state.filteredProducts = this.model.getFilteredProducts()
  }

  updateMinPrice(value) {
    this.state.filters.minPrice = parseFloat(value)
    this.model.updateFilters({ minPrice: parseFloat(value) })
    this.state.filteredProducts = this.model.getFilteredProducts()
  }

  addProduct(product) {
    this.model.addProduct(product)
    this.state.products = this.model.products
    this.state.filteredProducts = this.model.getFilteredProducts()
  }

  // Подписка View на изменения
  subscribe(callback) {
    this.viewCallback = callback
  }

  notifyView() {
    if (this.viewCallback) {
      this.viewCallback(this.state)
    }
  }
}

// View: декларативное представление с биндингами
class ProductView {
  constructor(viewModel) {
    this.viewModel = viewModel
    this.container = document.getElementById('product-app')

    // View подписывается на изменения ViewModel
    this.viewModel.subscribe(this.render.bind(this))

    // Инициализация event listeners
    this.bindEvents()
  }

  render(state) {
    this.container.innerHTML = \`
      <div class="product-manager">
        <!-- Filters с двусторонней привязкой -->
        <div class="filters">
          <input
            type="text"
            id="search"
            placeholder="Search products"
            value="\${state.filters.search}"
          >
          <select id="category">
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
          </select>
          <input
            type="number"
            id="minPrice"
            placeholder="Min price"
            value="\${state.filters.minPrice}"
          >
        </div>

        <!-- Product list -->
        <div class="products">
          \${state.isLoading ? '<p>Loading...</p>' : ''}
          \${state.filteredProducts.map(p => \`
            <div class="product-card">
              <h3>\${p.name}</h3>
              <p>Category: \${p.category}</p>
              <p class="price">$\${p.price}</p>
            </div>
          \`).join('')}
        </div>

        <!-- Add product form -->
        <form id="add-product-form">
          <input type="text" name="name" placeholder="Product name" required>
          <input type="number" name="price" placeholder="Price" required>
          <select name="category">
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
          </select>
          <button type="submit">Add Product</button>
        </form>
      </div>
    \`
  }

  bindEvents() {
    // Двусторонняя привязка данных
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'search') {
        this.viewModel.updateSearch(e.target.value)
      }
      if (e.target.id === 'minPrice') {
        this.viewModel.updateMinPrice(e.target.value)
      }
    })

    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'category') {
        this.viewModel.updateCategory(e.target.value)
      }
    })

    this.container.addEventListener('submit', (e) => {
      if (e.target.id === 'add-product-form') {
        e.preventDefault()
        const formData = new FormData(e.target)
        this.viewModel.addProduct({
          name: formData.get('name'),
          price: parseFloat(formData.get('price')),
          category: formData.get('category')
        })
        e.target.reset()
      }
    })
  }
}

// Инициализация MVVM
const productModel = new ProductModel()
const productViewModel = new ProductViewModel(productModel)
const productView = new ProductView(productViewModel)
`

const reactMvvmSnippet = `
// MVVM в современных фреймворках (React пример)
import { useState, useEffect } from 'react'

// Model
class UserDataModel {
  async fetchUsers() {
    const response = await fetch('/api/users')
    return response.json()
  }

  async saveUser(user) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    return response.json()
  }
}

// ViewModel (Custom Hook в React)
function useUserViewModel(model) {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Вычисляемые значения (computed)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Команды
  const loadUsers = async () => {
    setIsLoading(true)
    const data = await model.fetchUsers()
    setUsers(data)
    setIsLoading(false)
  }

  const addUser = async (user) => {
    const newUser = await model.saveUser(user)
    setUsers([...users, newUser])
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return {
    users: filteredUsers,
    searchTerm,
    isLoading,
    setSearchTerm,
    addUser
  }
}

// View (React Component)
function UserListView() {
  const model = new UserDataModel()
  const viewModel = useUserViewModel(model)

  return (
    <div>
      {/* Двусторонняя привязка через value + onChange */}
      <input
        type="text"
        value={viewModel.searchTerm}
        onChange={(e) => viewModel.setSearchTerm(e.target.value)}
        placeholder="Search users"
      />

      {viewModel.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {viewModel.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => viewModel.addUser({ name: 'New User' })}>
        Add User
      </button>
    </div>
  )
}
`

const comparisonSnippet = `
// Сравнение подходов на одном примере - счетчик

// =====================================
// MVC - Controller управляет потоком
// =====================================
class CounterModelMVC {
  constructor() { this.count = 0 }
  increment() { this.count++ }
  getCount() { return this.count }
}

class CounterViewMVC {
  render(count) {
    document.getElementById('count').textContent = count
  }
  bindIncrement(handler) {
    document.getElementById('btn').onclick = handler
  }
}

class CounterControllerMVC {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.bindIncrement(() => this.handleIncrement())
    this.updateView()
  }
  handleIncrement() {
    this.model.increment()
    this.updateView()
  }
  updateView() {
    this.view.render(this.model.getCount())
  }
}

// =====================================
// MVP - Presenter управляет всем
// =====================================
class CounterModelMVP {
  constructor() { this.count = 0 }
  increment() { this.count++ }
  getCount() { return this.count }
}

class CounterViewMVP {
  displayCount(count) {
    document.getElementById('count').textContent = count
  }
  bindIncrement(handler) {
    document.getElementById('btn').onclick = handler
  }
}

class CounterPresenterMVP {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.view.bindIncrement(() => this.handleIncrement())
    this.updateView()
  }
  handleIncrement() {
    this.model.increment()
    this.updateView()
  }
  updateView() {
    // Presenter явно вызывает методы View
    this.view.displayCount(this.model.getCount())
  }
}

// =====================================
// MVVM - ViewModel с реактивностью
// =====================================
class CounterModelMVVM {
  constructor() { this.count = 0 }
  increment() { this.count++ }
}

class CounterViewModelMVVM {
  constructor(model) {
    this.model = model
    this.state = new Proxy(
      { count: 0 },
      {
        set: (target, prop, value) => {
          target[prop] = value
          this.notifyView()
          return true
        }
      }
    )
  }

  increment() {
    this.model.increment()
    this.state.count = this.model.count
  }

  subscribe(callback) {
    this.viewCallback = callback
  }

  notifyView() {
    if (this.viewCallback) this.viewCallback(this.state)
  }
}

class CounterViewMVVM {
  constructor(viewModel) {
    this.viewModel = viewModel
    // View подписывается на изменения
    this.viewModel.subscribe((state) => this.render(state))
    this.bindEvents()
  }

  render(state) {
    document.getElementById('count').textContent = state.count
  }

  bindEvents() {
    document.getElementById('btn').onclick = () => {
      this.viewModel.increment()
    }
  }
}
`

const highlightedMvc = ref('')
const highlightedMvp = ref('')
const highlightedMvvm = ref('')
const highlightedReactMvvm = ref('')
const highlightedComparison = ref('')

onMounted(() => {
  highlightedMvc.value = Prism.highlight(mvcSnippet, Prism.languages.javascript, 'javascript')
  highlightedMvp.value = Prism.highlight(mvpSnippet, Prism.languages.javascript, 'javascript')
  highlightedMvvm.value = Prism.highlight(mvvmSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactMvvm.value = Prism.highlight(reactMvvmSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              MVC, MVP, MVVM: архитектурные паттерны для UI
            </h1>

            <p class="font-weight-regular mb-6">
              <b>MVC, MVP и MVVM</b> — это архитектурные паттерны разделения ответственности в пользовательских интерфейсах.
              Они определяют, как организована коммуникация между данными (Model), отображением (View) и логикой (Controller/Presenter/ViewModel).
              Выбор паттерна зависит от сложности приложения, используемого фреймворка и требований к тестируемости.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные различия</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">MVC</th>
                <th class="text-left font-weight-bold">MVP</th>
                <th class="text-left font-weight-bold">MVVM</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>View знает о Model?</b></td>
                <td class="text-warning">Да, может читать</td>
                <td class="text-success">Нет, полностью изолирован</td>
                <td class="text-success">Нет, через ViewModel</td>
              </tr>
              <tr>
                <td><b>Связь View ↔ Logic</b></td>
                <td>View → Controller</td>
                <td>View ↔ Presenter (1:1)</td>
                <td>View ⟷ ViewModel (data binding)</td>
              </tr>
              <tr>
                <td><b>Логика в View</b></td>
                <td class="text-warning">Возможна</td>
                <td class="text-success">Минимальна</td>
                <td class="text-success">Отсутствует</td>
              </tr>
              <tr>
                <td><b>Тестируемость</b></td>
                <td class="text-warning">Средняя</td>
                <td class="text-success">Высокая</td>
                <td class="text-success">Высокая</td>
              </tr>
              <tr>
                <td><b>Сложность</b></td>
                <td class="text-success">Низкая</td>
                <td class="text-warning">Средняя</td>
                <td class="text-error">Высокая</td>
              </tr>
              <tr>
                <td><b>Реактивность</b></td>
                <td class="text-error">Ручная</td>
                <td class="text-error">Ручная</td>
                <td class="text-success">Автоматическая</td>
              </tr>
              <tr>
                <td><b>Типичные фреймворки</b></td>
                <td>Express, Ruby on Rails, Spring</td>
                <td>Android (legacy), WinForms</td>
                <td>Vue, React, Angular, Svelte</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">MVC — Model-View-Controller</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Model</h3>
                  <ul class="text-left pl-4">
                    <li>Бизнес-логика</li>
                    <li>Данные приложения</li>
                    <li>Правила валидации</li>
                    <li>Работа с API/DB</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-monitor</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">View</h3>
                  <ul class="text-left pl-4">
                    <li>Отображение данных</li>
                    <li>UI элементы</li>
                    <li>Может читать Model</li>
                    <li>Отправляет события Controller</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-transit-connection-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Controller</h3>
                  <ul class="text-left pl-4">
                    <li>Обработка событий</li>
                    <li>Обновление Model</li>
                    <li>Выбор View</li>
                    <li>Координация потока</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевая особенность MVC:</strong> View может напрямую читать данные из Model, а Controller координирует взаимодействие.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMvc"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">MVP — Model-View-Presenter</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Model</h3>
                  <ul class="text-left pl-4">
                    <li>Чистые данные</li>
                    <li>Без UI логики</li>
                    <li>Не знает о View</li>
                    <li>Бизнес-правила</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-monitor</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">View</h3>
                  <ul class="text-left pl-4">
                    <li>Пассивное отображение</li>
                    <li>Интерфейс для Presenter</li>
                    <li>НЕ знает о Model</li>
                    <li>Только UI</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-account-tie</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Presenter</h3>
                  <ul class="text-left pl-4">
                    <li>ВСЯ логика взаимодействия</li>
                    <li>1:1 связь с View</li>
                    <li>Управляет Model и View</li>
                    <li>Легко тестируется</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Главное преимущество MVP:</strong> Полная изоляция View от Model через Presenter. View становится максимально "тупым" — только отображение.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMvp"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">MVVM — Model-View-ViewModel</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-database</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Model</h3>
                  <ul class="text-left pl-4">
                    <li>Данные + логика</li>
                    <li>Независим от UI</li>
                    <li>Переиспользуемый</li>
                    <li>Бизнес-слой</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-monitor</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">View</h3>
                  <ul class="text-left pl-4">
                    <li>Декларативная разметка</li>
                    <li>Data binding</li>
                    <li>Без логики</li>
                    <li>Автообновление</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-sync</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">ViewModel</h3>
                  <ul class="text-left pl-4">
                    <li>Состояние для View</li>
                    <li>Команды</li>
                    <li>Computed properties</li>
                    <li>Реактивность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
              <strong>Суперсила MVVM:</strong> Двусторонняя привязка данных (data binding) — изменения в ViewModel автоматически отражаются в View и наоборот.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMvvm"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">MVVM в современных фреймворках</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactMvvm"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение на одном примере</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как выбрать паттерн для проекта?</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-primary">
                  <h3 class="text-h6 font-weight-bold text-white mb-3">Выбирайте MVC</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Server-side rendering</strong></li>
                    <li>Простые CRUD приложения</li>
                    <li>Традиционные веб-приложения</li>
                    <li>Быстрый прототип</li>
                    <li>Малая команда</li>
                    <li>Ruby on Rails, Django, Laravel</li>
                  </ul>
                  <v-divider class="my-3 bg-white"></v-divider>
                  <p class="text-white text-body-2"><strong>Когда избегать:</strong> сложный UI, много взаимодействий, нужна высокая тестируемость</p>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-3">Выбирайте MVP</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Максимальная тестируемость</strong></li>
                    <li>Сложная бизнес-логика</li>
                    <li>Desktop приложения</li>
                    <li>Android (без Jetpack)</li>
                    <li>Legacy системы</li>
                    <li>Четкое разделение ответственности</li>
                  </ul>
                  <v-divider class="my-3 bg-white"></v-divider>
                  <p class="text-white text-body-2"><strong>Когда избегать:</strong> нужна реактивность, много состояния, динамический UI</p>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 bg-warning">
                  <h3 class="text-h6 font-weight-bold text-white mb-3">Выбирайте MVVM</h3>
                  <ul class="text-white pl-4">
                    <li><strong>Реактивный UI</strong></li>
                    <li>SPA приложения</li>
                    <li>Сложное состояние</li>
                    <li>Real-time обновления</li>
                    <li>Vue, React, Angular, Svelte</li>
                    <li>Современные веб-приложения</li>
                  </ul>
                  <v-divider class="my-3 bg-white"></v-divider>
                  <p class="text-white text-body-2"><strong>Когда избегать:</strong> простые статичные страницы, SEO-критично без SSR</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Факторы выбора архитектуры</h2>

            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>1. Сложность UI и взаимодействий</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>Простой UI:</strong> MVC достаточно (статичные страницы, формы)</li>
                    <li><strong>Средняя сложность:</strong> MVP (много форм, валидация, бизнес-логика)</li>
                    <li><strong>Высокая сложность:</strong> MVVM (real-time, много состояния, сложные взаимодействия)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>2. Требования к тестируемости</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>MVC:</strong> View и Controller сложно тестировать отдельно</li>
                    <li><strong>MVP:</strong> Presenter легко тестируется без UI (mock View)</li>
                    <li><strong>MVVM:</strong> ViewModel легко тестируется без View</li>
                    <li><strong>Вывод:</strong> Если критична тестируемость → MVP или MVVM</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>3. Платформа и фреймворк</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>Web SPA:</strong> MVVM (Vue, React, Angular, Svelte)</li>
                    <li><strong>Server-side rendering:</strong> MVC (Rails, Django, Express)</li>
                    <li><strong>Android:</strong> MVP (legacy) или MVVM (Jetpack Compose)</li>
                    <li><strong>iOS:</strong> MVVM (SwiftUI) или MVP (UIKit)</li>
                    <li><strong>Desktop:</strong> MVP или MVVM (WPF, Electron)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>4. Размер команды и опыт</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>Малая команда/стартап:</strong> MVC (быстрее старт)</li>
                    <li><strong>Средняя команда:</strong> MVP или MVVM (лучше масштабируется)</li>
                    <li><strong>Большая команда:</strong> MVVM (четкое разделение, параллельная работа)</li>
                    <li><strong>Junior-разработчики:</strong> MVC (проще освоить)</li>
                    <li><strong>Senior-разработчики:</strong> MVP/MVVM (больше контроля)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>5. Производительность и оптимизация</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>MVC:</strong> Меньше overhead, прямая связь View-Model</li>
                    <li><strong>MVP:</strong> Дополнительный слой (Presenter), но изоляция</li>
                    <li><strong>MVVM:</strong> Реактивность может быть дороже, но оптимизируемо</li>
                    <li><strong>Совет:</strong> Для высоконагруженных UI оптимизируйте реактивность в MVVM</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>6. Поддержка и развитие</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ul class="pl-4">
                    <li><strong>Краткосрочный проект:</strong> MVC (быстрее разработка)</li>
                    <li><strong>Долгосрочная поддержка:</strong> MVP/MVVM (лучше структура)</li>
                    <li><strong>Частые изменения UI:</strong> MVVM (легче изменять View)</li>
                    <li><strong>Стабильный UI:</strong> MVP (надежная изоляция)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Практические рекомендации</h2>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Рекомендуемый паттерн</th>
                <th class="text-left font-weight-bold">Обоснование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Админ-панель</b></td>
                <td class="text-warning">MVVM</td>
                <td>Много форм, таблиц, фильтров — нужна реактивность</td>
              </tr>
              <tr>
                <td><b>Блог/Landing</b></td>
                <td class="text-primary">MVC</td>
                <td>Простой UI, SSR для SEO</td>
              </tr>
              <tr>
                <td><b>E-commerce</b></td>
                <td class="text-warning">MVVM</td>
                <td>Корзина, фильтры, поиск — сложное состояние</td>
              </tr>
              <tr>
                <td><b>Mobile приложение</b></td>
                <td class="text-success">MVP или MVVM</td>
                <td>Зависит от платформы (Android/iOS)</td>
              </tr>
              <tr>
                <td><b>Real-time дашборд</b></td>
                <td class="text-warning">MVVM</td>
                <td>Постоянные обновления данных</td>
              </tr>
              <tr>
                <td><b>Desktop приложение</b></td>
                <td class="text-success">MVP</td>
                <td>Сложная бизнес-логика, тестируемость</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное отличие MVC от MVP?</p>
                <p class="font-weight-regular ma-0">
                  В MVC View может напрямую читать данные из Model, а Controller координирует.
                  В MVP View полностью изолирован от Model — все взаимодействие идет через Presenter,
                  который явно управляет отображением данных в View.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем MVVM отличается от MVP?</p>
                <p class="font-weight-regular ma-0">
                  В MVP связь View-Presenter 1:1 и явная (методы вызываются напрямую).
                  В MVVM связь через data binding — View автоматически реагирует на изменения
                  ViewModel через реактивную систему, без явных вызовов методов обновления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой паттерн используют React, Vue, Angular?</p>
                <p class="font-weight-regular ma-0">
                  Все три используют MVVM: компонент (View), состояние (ViewModel), логика/API (Model).
                  React hooks = ViewModel, Vue data/computed = ViewModel, Angular component = View+ViewModel.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать каждый паттерн?</p>
                <p class="font-weight-regular ma-0">
                  <strong>MVC:</strong> сложно — Controller зависит от View. <strong>MVP:</strong> легко — mock View,
                  тестируем Presenter. <strong>MVVM:</strong> легко — тестируем ViewModel без View.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли комбинировать паттерны?</p>
                <p class="font-weight-regular ma-0">
                  Да! Например, MVC на бэкенде + MVVM на фронтенде. Или гибридный подход:
                  MVVM для UI компонентов + централизованный State Management (Redux = Model layer).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое data binding в MVVM?</p>
                <p class="font-weight-regular ma-0">
                  Автоматическая синхронизация View и ViewModel: изменение данных в ViewModel
                  автоматически обновляет View, а изменение в View (input) обновляет ViewModel.
                  Реализуется через Proxy, Observables, или виртуальный DOM.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Плюсы и минусы каждого паттерна</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">MVC</h3>
                  <div class="mb-3">
                    <p class="font-weight-bold text-success mb-1">✅ Плюсы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>Простота понимания</li>
                      <li>Быстрая разработка</li>
                      <li>Хорошо для SSR</li>
                      <li>Меньше кода</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-weight-bold text-error mb-1">❌ Минусы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>View знает о Model</li>
                      <li>Сложно тестировать</li>
                      <li>Может стать "толстым" Controller</li>
                      <li>Нет четкой изоляции</li>
                    </ul>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">MVP</h3>
                  <div class="mb-3">
                    <p class="font-weight-bold text-success mb-1">✅ Плюсы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>Полная изоляция View</li>
                      <li>Легко тестировать</li>
                      <li>Четкое разделение</li>
                      <li>Переиспользуемый Presenter</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-weight-bold text-error mb-1">❌ Минусы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>Больше кода (boilerplate)</li>
                      <li>Ручное обновление View</li>
                      <li>1:1 связь View-Presenter</li>
                      <li>Может быть избыточен</li>
                    </ul>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">MVVM</h3>
                  <div class="mb-3">
                    <p class="font-weight-bold text-success mb-1">✅ Плюсы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>Автоматическая синхронизация</li>
                      <li>Реактивность</li>
                      <li>Легко тестировать ViewModel</li>
                      <li>Декларативный View</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-weight-bold text-error mb-1">❌ Минусы:</p>
                    <ul class="pl-4 text-body-2">
                      <li>Сложность (learning curve)</li>
                      <li>Overhead реактивности</li>
                      <li>Отладка binding может быть сложной</li>
                      <li>Требует фреймворк</li>
                    </ul>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог: как принять решение?</h2>
            <v-card class="pa-6 mb-6 bg-blue-grey-lighten-5">
              <v-card-text>
                <h3 class="text-h6 font-weight-bold mb-3">Алгоритм выбора паттерна:</h3>
                <ol class="mb-4">
                  <li class="mb-2"><strong>Оцените сложность UI:</strong> простой → MVC, средний → MVP, сложный → MVVM</li>
                  <li class="mb-2"><strong>Определите платформу:</strong> Web SPA → MVVM, SSR → MVC, Desktop/Mobile → MVP/MVVM</li>
                  <li class="mb-2"><strong>Учтите тестируемость:</strong> критична → MVP/MVVM, не критична → MVC</li>
                  <li class="mb-2"><strong>Проверьте требования:</strong> реактивность нужна → MVVM, не нужна → MVC/MVP</li>
                  <li class="mb-2"><strong>Оцените команду:</strong> большая → MVVM, малая → MVC, средняя → любой</li>
                  <li class="mb-2"><strong>Посмотрите на фреймворк:</strong> React/Vue/Angular → MVVM по умолчанию</li>
                </ol>

                <v-divider class="my-4"></v-divider>

                <p class="font-weight-bold mb-2">Главное правило:</p>
                <p class="ma-0">
                  Выбирайте паттерн исходя из <strong>конкретных требований проекта</strong>, а не моды или личных предпочтений.
                  Простое приложение не нуждается в сложной архитектуре, но сложное приложение развалится без правильной структуры.
                </p>
              </v-card-text>
            </v-card>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://martinfowler.com/eaaDev/uiArchs.html"
                target="_blank"
                class="mr-2">
                Martin Fowler: GUI Architectures
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://learn.microsoft.com/en-us/dotnet/architecture/modernize-desktop/mvvm-pattern"
                target="_blank">
                Microsoft: MVVM Pattern
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
