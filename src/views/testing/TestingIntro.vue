<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'

const unitTestSnippet = `
// Unit тестирование - тестирование отдельных функций/методов

// Функция для тестирования
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Unit тест
describe('calculateTotal', () => {
  test('correctly calculates total for multiple items', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 }
    ]

    expect(calculateTotal(items)).toBe(350)
  })

  test('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })

  test('handles single item', () => {
    const items = [{ price: 100, quantity: 1 }]
    expect(calculateTotal(items)).toBe(100)
  })
})
`

const integrationTestSnippet = `
// Integration тестирование - проверка взаимодействия компонентов

// API сервис
class UserService {
  async getUser(id) {
    const response = await fetch(\`/api/users/\${id}\`)
    return response.json()
  }

  async updateUser(id, data) {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.json()
  }
}

// Integration тест
describe('UserService', () => {
  let service

  beforeEach(() => {
    service = new UserService()
    // Настройка mock API
    global.fetch = jest.fn()
  })

  test('getUser retrieves and returns user data', async () => {
    const mockUser = { id: 1, name: 'John' }

    global.fetch.mockResolvedValueOnce({
      json: async () => mockUser
    })

    const user = await service.getUser(1)

    expect(fetch).toHaveBeenCalledWith('/api/users/1')
    expect(user).toEqual(mockUser)
  })

  test('updateUser sends data and returns updated user', async () => {
    const userData = { name: 'Jane' }
    const updatedUser = { id: 1, name: 'Jane' }

    global.fetch.mockResolvedValueOnce({
      json: async () => updatedUser
    })

    const result = await service.updateUser(1, userData)

    expect(fetch).toHaveBeenCalledWith('/api/users/1', {
      method: 'PUT',
      body: JSON.stringify(userData)
    })
    expect(result).toEqual(updatedUser)
  })
})
`

const e2eTestSnippet = `
// E2E тестирование - тестирование всего пользовательского сценария

// Playwright E2E тест
import { test, expect } from '@playwright/test'

test.describe('User Login Flow', () => {
  test('user can login successfully', async ({ page }) => {
    // 1. Переход на страницу логина
    await page.goto('https://example.com/login')

    // 2. Заполнение формы
    await page.fill('input[name="email"]', 'user@example.com')
    await page.fill('input[name="password"]', 'password123')

    // 3. Клик по кнопке входа
    await page.click('button[type="submit"]')

    // 4. Ожидание редиректа
    await page.waitForURL('https://example.com/dashboard')

    // 5. Проверка успешного входа
    await expect(page.locator('h1')).toContainText('Dashboard')
    await expect(page.locator('.user-name')).toContainText('user@example.com')
  })

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('https://example.com/login')

    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')

    // Проверка сообщения об ошибке
    await expect(page.locator('.error-message')).toBeVisible()
    await expect(page.locator('.error-message')).toContainText('Invalid credentials')
  })
})
`

const reactComponentTestSnippet = `
// Component тестирование (React Testing Library)

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter initialCount={0} />)

    const countElement = screen.getByText(/count: 0/i)
    expect(countElement).toBeInTheDocument()
  })

  test('increments count when button clicked', async () => {
    render(<Counter initialCount={0} />)

    const incrementButton = screen.getByRole('button', { name: /increment/i })

    await userEvent.click(incrementButton)

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
  })

  test('decrements count when button clicked', async () => {
    render(<Counter initialCount={5} />)

    const decrementButton = screen.getByRole('button', { name: /decrement/i })

    await userEvent.click(decrementButton)

    expect(screen.getByText(/count: 4/i)).toBeInTheDocument()
  })

  test('does not go below zero', async () => {
    render(<Counter initialCount={0} />)

    const decrementButton = screen.getByRole('button', { name: /decrement/i })

    await userEvent.click(decrementButton)

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument()
  })
})
`

const tddExampleSnippet = `
// TDD (Test-Driven Development) подход

// Шаг 1: Пишем тест (RED)
describe('StringUtils', () => {
  test('capitalize first letter of string', () => {
    expect(StringUtils.capitalize('hello')).toBe('Hello')
  })
})

// Тест падает - функция не существует

// Шаг 2: Пишем минимальный код (GREEN)
class StringUtils {
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

// Тест проходит

// Шаг 3: Рефакторинг (REFACTOR)
class StringUtils {
  static capitalize(str) {
    if (!str || typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
}

// Добавляем больше тестов
describe('StringUtils', () => {
  test('capitalize first letter of string', () => {
    expect(StringUtils.capitalize('hello')).toBe('Hello')
  })

  test('handles empty string', () => {
    expect(StringUtils.capitalize('')).toBe('')
  })

  test('handles non-string input', () => {
    expect(StringUtils.capitalize(null)).toBe('')
    expect(StringUtils.capitalize(undefined)).toBe('')
  })

  test('lowercases rest of the string', () => {
    expect(StringUtils.capitalize('hELLO')).toBe('Hello')
  })
})
`

const mockingExampleSnippet = `
// Mocking - подмена зависимостей в тестах

// Класс для тестирования
class OrderService {
  constructor(paymentGateway, emailService) {
    this.paymentGateway = paymentGateway
    this.emailService = emailService
  }

  async processOrder(order) {
    // Обработка платежа
    const payment = await this.paymentGateway.charge(order.total)

    if (!payment.success) {
      throw new Error('Payment failed')
    }

    // Отправка email
    await this.emailService.sendConfirmation(order.email, order.id)

    return { orderId: order.id, status: 'completed' }
  }
}

// Тесты с моками
describe('OrderService', () => {
  let orderService
  let mockPaymentGateway
  let mockEmailService

  beforeEach(() => {
    // Создаем моки
    mockPaymentGateway = {
      charge: jest.fn()
    }

    mockEmailService = {
      sendConfirmation: jest.fn()
    }

    orderService = new OrderService(mockPaymentGateway, mockEmailService)
  })

  test('processes order successfully', async () => {
    const order = { id: 1, total: 100, email: 'user@example.com' }

    // Настраиваем поведение моков
    mockPaymentGateway.charge.mockResolvedValue({ success: true })
    mockEmailService.sendConfirmation.mockResolvedValue()

    const result = await orderService.processOrder(order)

    // Проверяем результат
    expect(result).toEqual({ orderId: 1, status: 'completed' })

    // Проверяем вызовы моков
    expect(mockPaymentGateway.charge).toHaveBeenCalledWith(100)
    expect(mockEmailService.sendConfirmation).toHaveBeenCalledWith(
      'user@example.com',
      1
    )
  })

  test('throws error when payment fails', async () => {
    const order = { id: 1, total: 100, email: 'user@example.com' }

    mockPaymentGateway.charge.mockResolvedValue({ success: false })

    await expect(orderService.processOrder(order)).rejects.toThrow('Payment failed')

    // Email не должен отправиться
    expect(mockEmailService.sendConfirmation).not.toHaveBeenCalled()
  })
})
`

const coverageExampleSnippet = `
// Пример конфигурации для покрытия кода (jest.config.js)

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/index.{js,ts}',
    '!src/setupTests.{js,ts}'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'html', 'lcov']
}

// Пример функции с полным покрытием
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

describe('divide', () => {
  test('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5)
  })

  test('throws error on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero')
  })

  test('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5)
  })

  test('handles decimal results', () => {
    expect(divide(10, 3)).toBeCloseTo(3.33, 2)
  })
})

// Покрытие: 100% строк, 100% веток, 100% функций
`

const highlightedUnitTest = ref('')
const highlightedIntegrationTest = ref('')
const highlightedE2ETest = ref('')
const highlightedComponentTest = ref('')
const highlightedTDDExample = ref('')
const highlightedMockingExample = ref('')
const highlightedCoverageExample = ref('')

onMounted(() => {
  highlightedUnitTest.value = Prism.highlight(unitTestSnippet, Prism.languages.javascript, 'javascript')
  highlightedIntegrationTest.value = Prism.highlight(integrationTestSnippet, Prism.languages.javascript, 'javascript')
  highlightedE2ETest.value = Prism.highlight(e2eTestSnippet, Prism.languages.javascript, 'javascript')
  highlightedComponentTest.value = Prism.highlight(reactComponentTestSnippet, Prism.languages.javascript, 'javascript')
  highlightedTDDExample.value = Prism.highlight(tddExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedMockingExample.value = Prism.highlight(mockingExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedCoverageExample.value = Prism.highlight(coverageExampleSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Тестирование: что это и зачем нужно?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Тестирование</b> — это процесс проверки программного обеспечения на соответствие требованиям,
              обнаружения ошибок и подтверждения качества кода. Автоматизированное тестирование позволяет
              быстро проверять работоспособность приложения после изменений и предотвращать регрессии.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Зачем нужно тестирование?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Качество кода</h3>
                  <ul class="text-left pl-4">
                    <li>Раннее обнаружение багов</li>
                    <li>Предотвращение регрессий</li>
                    <li>Уверенность при рефакторинге</li>
                    <li>Документация поведения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-clock-fast</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Скорость разработки</h3>
                  <ul class="text-left pl-4">
                    <li>Быстрая обратная связь</li>
                    <li>Автоматизация проверок</li>
                    <li>Снижение времени отладки</li>
                    <li>Упрощение интеграции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-account-group</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Командная работа</h3>
                  <ul class="text-left pl-4">
                    <li>Безопасность изменений</li>
                    <li>Понятная документация</li>
                    <li>Стандартизация подходов</li>
                    <li>Упрощение code review</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Виды тестирования</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. Unit Testing (Модульное тестирование)</h3>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-cube-outline</v-icon>
              <strong>Цель:</strong> Тестирование отдельных функций, методов и компонентов в изоляции
            </v-alert>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedUnitTest"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">✅ Преимущества</h4>
                  <ul class="pl-4">
                    <li>Быстрое выполнение</li>
                    <li>Простая отладка</li>
                    <li>Высокая изоляция</li>
                    <li>Легко писать и поддерживать</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">📋 Когда использовать</h4>
                  <ul class="pl-4">
                    <li>Тестирование бизнес-логики</li>
                    <li>Утилитарные функции</li>
                    <li>Валидаторы и парсеры</li>
                    <li>Математические расчеты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">2. Integration Testing (Интеграционное тестирование)</h3>
            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-connection</v-icon>
              <strong>Цель:</strong> Проверка взаимодействия между несколькими модулями/компонентами
            </v-alert>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedIntegrationTest"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">✅ Преимущества</h4>
                  <ul class="pl-4">
                    <li>Проверка реальных взаимодействий</li>
                    <li>Обнаружение проблем интеграции</li>
                    <li>Тестирование API контрактов</li>
                    <li>Проверка data flow</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">📋 Когда использовать</h4>
                  <ul class="pl-4">
                    <li>API endpoints</li>
                    <li>Сервисы с зависимостями</li>
                    <li>Database queries</li>
                    <li>Внешние интеграции</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">3. E2E Testing (End-to-End тестирование)</h3>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-monitor-dashboard</v-icon>
              <strong>Цель:</strong> Тестирование полных пользовательских сценариев от начала до конца
            </v-alert>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedE2ETest"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">✅ Преимущества</h4>
                  <ul class="pl-4">
                    <li>Тестирование как пользователь</li>
                    <li>Проверка всей системы</li>
                    <li>Высокая уверенность</li>
                    <li>Интеграция всех слоев</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="text-h6 font-weight-bold mb-2">⚠️ Недостатки</h4>
                  <ul class="pl-4">
                    <li>Медленное выполнение</li>
                    <li>Сложность настройки</li>
                    <li>Flaky тесты</li>
                    <li>Дорогое поддержание</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">4. Component Testing (Тестирование компонентов)</h3>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-view-module</v-icon>
              <strong>Цель:</strong> Тестирование UI компонентов с их поведением и взаимодействиями
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComponentTest"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Пирамида тестирования</h2>
            <v-card class="pa-6 mb-8">
              <div class="text-center mb-4">
                <v-icon size="100" color="primary">mdi-triangle-outline</v-icon>
              </div>
              <v-table density="comfortable">
                <thead>
                <tr>
                  <th class="text-left font-weight-bold">Уровень</th>
                  <th class="text-left font-weight-bold">Количество</th>
                  <th class="text-left font-weight-bold">Скорость</th>
                  <th class="text-left font-weight-bold">Стоимость</th>
                  <th class="text-left font-weight-bold">Уверенность</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><b>E2E Tests</b></td>
                  <td class="text-warning">Мало (10%)</td>
                  <td class="text-error">Медленные</td>
                  <td class="text-error">Дорогие</td>
                  <td class="text-success">Высокая</td>
                </tr>
                <tr>
                  <td><b>Integration Tests</b></td>
                  <td class="text-info">Средне (30%)</td>
                  <td class="text-warning">Средние</td>
                  <td class="text-warning">Средние</td>
                  <td class="text-info">Средняя</td>
                </tr>
                <tr>
                  <td><b>Unit Tests</b></td>
                  <td class="text-success">Много (60%)</td>
                  <td class="text-success">Быстрые</td>
                  <td class="text-success">Дешевые</td>
                  <td class="text-warning">Базовая</td>
                </tr>
                </tbody>
              </v-table>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">TDD (Test-Driven Development)</h2>
            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-numeric-1-circle</v-icon>
              <strong>RED</strong> → Пишем падающий тест
              <v-icon class="ml-4 mr-2">mdi-numeric-2-circle</v-icon>
              <strong>GREEN</strong> → Пишем минимальный код
              <v-icon class="ml-4 mr-2">mdi-numeric-3-circle</v-icon>
              <strong>REFACTOR</strong> → Улучшаем код
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTDDExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Mocking — подмена зависимостей</h2>
            <p class="font-weight-regular mb-4">
              <b>Моки, стабы и шпионы</b> позволяют изолировать тестируемый код от внешних зависимостей
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMockingExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Code Coverage (Покрытие кода)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCoverageExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение фреймворков тестирования</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Фреймворк</th>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Особенности</th>
                <th class="text-left font-weight-bold">Популярность</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Jest</b></td>
                <td>Unit/Integration</td>
                <td>Zero config, snapshots, coverage</td>
                <td class="text-success">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td><b>Vitest</b></td>
                <td>Unit/Integration</td>
                <td>Vite native, fast, Jest compatible</td>
                <td class="text-info">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td><b>Playwright</b></td>
                <td>E2E</td>
                <td>Multi-browser, auto-wait, трассировка</td>
                <td class="text-success">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td><b>Cypress</b></td>
                <td>E2E</td>
                <td>Developer experience, time travel</td>
                <td class="text-success">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td><b>Testing Library</b></td>
                <td>Component</td>
                <td>User-centric, accessibility</td>
                <td class="text-success">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td><b>Mocha</b></td>
                <td>Unit/Integration</td>
                <td>Гибкость, большая экосистема</td>
                <td class="text-warning">⭐⭐⭐</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Unit и Integration тестами?</p>
                <p class="font-weight-regular ma-0">
                  Unit тесты проверяют отдельные функции/методы в полной изоляции с моками всех зависимостей.
                  Integration тесты проверяют взаимодействие нескольких модулей с реальными или частично
                  подмененными зависимостями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое TDD и какие у него преимущества?</p>
                <p class="font-weight-regular ma-0">
                  TDD (Test-Driven Development) — методология, где тест пишется до кода. Цикл: RED (падающий тест) →
                  GREEN (минимальный код) → REFACTOR (улучшение). Преимущества: лучшая архитектура, полное покрытие,
                  уверенность в рефакторинге, тесты как документация.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужны моки (mocks)?</p>
                <p class="font-weight-regular ma-0">
                  Моки позволяют изолировать тестируемый код от внешних зависимостей (API, база данных, сторонние
                  сервисы). Это делает тесты быстрыми, предсказуемыми и независимыми от внешних факторов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое покрытие кода (code coverage) и какой процент достаточен?</p>
                <p class="font-weight-regular ma-0">
                  Coverage показывает процент кода, выполненного при тестах. Метрики: lines, branches, functions,
                  statements. 80%+ считается хорошим показателем, но важнее качество тестов, чем процент покрытия.
                  100% покрытие не гарантирует отсутствие багов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать E2E тесты?</p>
                <p class="font-weight-regular ma-0">
                  E2E тесты используются для критических пользовательских сценариев (логин, оформление заказа,
                  оплата). Они медленные и дорогие в поддержке, поэтому их должно быть мало — только для самых
                  важных флоу приложения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое flaky тесты и как с ними бороться?</p>
                <p class="font-weight-regular ma-0">
                  Flaky тесты — нестабильные тесты, которые иногда падают без изменений в коде. Причины:
                  асинхронность, таймауты, зависимость от внешних сервисов. Решение: правильные ожидания,
                  изоляция тестов, моки внешних зависимостей, retry механизмы.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики тестирования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Следовать пирамиде тестирования</li>
                    <li>Писать независимые тесты</li>
                    <li>Тестировать поведение, не реализацию</li>
                    <li>Использовать описательные имена</li>
                    <li>Следовать AAA паттерну (Arrange-Act-Assert)</li>
                    <li>Мокать внешние зависимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Тестов зависимых друг от друга</li>
                    <li>Тестирования приватных методов</li>
                    <li>Слишком сложных тестов</li>
                    <li>Игнорирования падающих тестов</li>
                    <li>Погони за 100% coverage</li>
                    <li>Тестов без assert</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Запускайте тесты локально перед push</li>
                    <li>Интегрируйте в CI/CD</li>
                    <li>Используйте watch mode при разработке</li>
                    <li>Следите за временем выполнения</li>
                    <li>Регулярно обновляйте тесты</li>
                    <li>Документируйте сложные кейсы</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Тестирование</b> — критически важная часть современной разработки, обеспечивающая качество,
              надежность и поддерживаемость кода. Правильная комбинация unit, integration и e2e тестов создает
              надежную систему проверок. TDD помогает писать лучший код, а автоматизация тестирования ускоряет
              разработку и снижает количество багов в production.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://martinfowler.com/testing/"
                target="_blank"
                class="mr-2">
                Martin Fowler: Testing
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://jestjs.io/"
                target="_blank">
                Jest Documentation
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}

.custom-code code {
  background: none !important;
  color: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
}

:deep(.token.comment) {
  color: #6272a4;
}

:deep(.token.string) {
  color: #f1fa8c;
}

:deep(.token.keyword) {
  color: #ff79c6;
}

:deep(.token.function) {
  color: #50fa7b;
}

:deep(.token.number) {
  color: #bd93f9;
}

:deep(.token.operator) {
  color: #ff79c6;
}

:deep(.token.punctuation) {
  color: #f8f8f2;
}

:deep(.token.property) {
  color: #66d9ef;
}

:deep(.token.tag) {
  color: #ff79c6;
}

:deep(.token.attr-name) {
  color: #50fa7b;
}

:deep(.token.attr-value) {
  color: #f1fa8c;
}

.ol-list {
  list-style-position: inside;
  padding-left: 0;
}

.ol-list li {
  margin-bottom: 1rem;
}
</style>
