<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-yaml.js'

const pyramidDistributionSnippet = `
// Идеальное распределение тестов по пирамиде

/*
┌─────────────────┐
│   E2E Tests     │  10% - Критические пользовательские сценарии
│   (UI Tests)    │       Медленные, хрупкие, дорогие
├─────────────────┤
│  Integration    │  30% - Взаимодействие между модулями
│     Tests       │       Средняя скорость, средняя стоимость
├─────────────────┤
│   Unit Tests    │  60% - Отдельные функции/методы
│                 │       Быстрые, дешевые, стабильные
└─────────────────┘
*/

// Пример структуры тестов в проекте
project/
├── __tests__/
│   ├── unit/              (60% тестов - ~600 тестов)
│   │   ├── utils/
│   │   ├── services/
│   │   └── components/
│   ├── integration/       (30% тестов - ~300 тестов)
│   │   ├── api/
│   │   ├── database/
│   │   └── workflows/
│   └── e2e/              (10% тестов - ~100 тестов)
│       ├── login.spec.js
│       ├── checkout.spec.js
│       └── critical-flows.spec.js
`

const unitTestExampleSnippet = `
// Unit тесты - основание пирамиды (60%)

// Преимущества:
// ✅ Выполняются за миллисекунды
// ✅ Изолированы и предсказуемы
// ✅ Легко писать и поддерживать
// ✅ Точно указывают на проблему

// Пример 1: Тестирование чистой функции
function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input')
  }
  return price * (1 - discountPercent / 100)
}

describe('calculateDiscount', () => {
  test('applies 10% discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90)
  })

  test('applies 50% discount correctly', () => {
    expect(calculateDiscount(200, 50)).toBe(100)
  })

  test('throws error for negative price', () => {
    expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input')
  })

  test('throws error for discount over 100%', () => {
    expect(() => calculateDiscount(100, 150)).toThrow('Invalid input')
  })

  test('handles zero discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100)
  })
})

// Пример 2: Тестирование класса
class ShoppingCart {
  constructor() {
    this.items = []
  }

  addItem(item) {
    this.items.push(item)
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  clear() {
    this.items = []
  }
}

describe('ShoppingCart', () => {
  let cart

  beforeEach(() => {
    cart = new ShoppingCart()
  })

  test('starts empty', () => {
    expect(cart.items).toHaveLength(0)
    expect(cart.getTotal()).toBe(0)
  })

  test('adds items correctly', () => {
    cart.addItem({ price: 100, quantity: 2 })
    expect(cart.items).toHaveLength(1)
  })

  test('calculates total correctly', () => {
    cart.addItem({ price: 100, quantity: 2 })
    cart.addItem({ price: 50, quantity: 3 })
    expect(cart.getTotal()).toBe(350)
  })

  test('clears cart', () => {
    cart.addItem({ price: 100, quantity: 1 })
    cart.clear()
    expect(cart.items).toHaveLength(0)
  })
})

// Время выполнения: ~50ms для всех тестов
`

const integrationTestExampleSnippet = `
// Integration тесты - середина пирамиды (30%)

// Преимущества:
// ✅ Проверяют реальное взаимодействие
// ✅ Находят проблемы интеграции
// ✅ Баланс между скоростью и уверенностью
// ⚠️ Медленнее unit тестов
// ⚠️ Требуют настройки окружения

// Пример 1: API интеграция
class UserService {
  constructor(apiClient, cache) {
    this.apiClient = apiClient
    this.cache = cache
  }

  async getUser(id) {
    // Проверяем кэш
    const cached = await this.cache.get(\`user:\${id}\`)
    if (cached) return JSON.parse(cached)

    // Запрос к API
    const user = await this.apiClient.get(\`/users/\${id}\`)

    // Сохраняем в кэш
    await this.cache.set(\`user:\${id}\`, JSON.stringify(user), 3600)

    return user
  }
}

describe('UserService Integration', () => {
  let service
  let mockApiClient
  let mockCache

  beforeEach(() => {
    mockApiClient = {
      get: jest.fn()
    }
    mockCache = {
      get: jest.fn(),
      set: jest.fn()
    }
    service = new UserService(mockApiClient, mockCache)
  })

  test('fetches user from API and caches it', async () => {
    const mockUser = { id: 1, name: 'John' }

    mockCache.get.mockResolvedValue(null) // Нет в кэше
    mockApiClient.get.mockResolvedValue(mockUser)

    const user = await service.getUser(1)

    // Проверяем взаимодействие
    expect(mockCache.get).toHaveBeenCalledWith('user:1')
    expect(mockApiClient.get).toHaveBeenCalledWith('/users/1')
    expect(mockCache.set).toHaveBeenCalledWith(
      'user:1',
      JSON.stringify(mockUser),
      3600
    )
    expect(user).toEqual(mockUser)
  })

  test('returns cached user without API call', async () => {
    const cachedUser = JSON.stringify({ id: 1, name: 'John' })

    mockCache.get.mockResolvedValue(cachedUser)

    const user = await service.getUser(1)

    // API не должен вызываться
    expect(mockApiClient.get).not.toHaveBeenCalled()
    expect(user).toEqual(JSON.parse(cachedUser))
  })
})

// Пример 2: Database интеграция
describe('User Repository Integration', () => {
  let db
  let repository

  beforeAll(async () => {
    // Настройка тестовой БД
    db = await setupTestDatabase()
    repository = new UserRepository(db)
  })

  afterAll(async () => {
    await db.close()
  })

  beforeEach(async () => {
    await db.query('TRUNCATE TABLE users')
  })

  test('creates user in database', async () => {
    const userData = { name: 'John', email: 'john@example.com' }

    const user = await repository.create(userData)

    expect(user.id).toBeDefined()
    expect(user.name).toBe('John')

    // Проверяем, что действительно в БД
    const found = await db.query('SELECT * FROM users WHERE id = ?', [user.id])
    expect(found[0].name).toBe('John')
  })

  test('finds user by email', async () => {
    await repository.create({ name: 'John', email: 'john@example.com' })

    const user = await repository.findByEmail('john@example.com')

    expect(user).toBeDefined()
    expect(user.name).toBe('John')
  })
})

// Время выполнения: ~500ms для всех тестов
`

const e2eTestExampleSnippet = `
// E2E тесты - вершина пирамиды (10%)

// Преимущества:
// ✅ Максимальная уверенность
// ✅ Тестируют как реальный пользователь
// ✅ Проверяют всю систему целиком
// ⚠️ Медленные (секунды/минуты)
// ⚠️ Хрупкие (flaky)
// ⚠️ Дорогие в поддержке

// Только для КРИТИЧЕСКИХ сценариев!

// Playwright E2E тест
import { test, expect } from '@playwright/test'

test.describe('Critical User Flows', () => {
  // Тест 1: Полный путь покупки
  test('complete purchase flow', async ({ page }) => {
    // 1. Логин
    await page.goto('/login')
    await page.fill('[name="email"]', 'user@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')

    // 2. Поиск товара
    await page.fill('[placeholder="Search products"]', 'laptop')
    await page.press('[placeholder="Search products"]', 'Enter')
    await page.waitForSelector('.product-card')

    // 3. Добавление в корзину
    await page.click('.product-card:first-child .add-to-cart')
    await expect(page.locator('.cart-badge')).toContainText('1')

    // 4. Переход к оформлению
    await page.click('.cart-icon')
    await page.click('text=Proceed to Checkout')

    // 5. Заполнение адреса доставки
    await page.fill('[name="address"]', '123 Main St')
    await page.fill('[name="city"]', 'New York')
    await page.fill('[name="zipCode"]', '10001')

    // 6. Выбор способа оплаты
    await page.click('text=Credit Card')
    await page.fill('[name="cardNumber"]', '4242424242424242')
    await page.fill('[name="expiry"]', '12/25')
    await page.fill('[name="cvv"]', '123')

    // 7. Подтверждение заказа
    await page.click('button:has-text("Place Order")')

    // 8. Проверка успешного заказа
    await page.waitForURL(/\/order\\/[0-9]+/)
    await expect(page.locator('h1')).toContainText('Order Confirmed')
    await expect(page.locator('.order-status')).toContainText('Processing')
  })

  // Тест 2: Регистрация нового пользователя
  test('user registration flow', async ({ page }) => {
    await page.goto('/register')

    await page.fill('[name="name"]', 'New User')
    await page.fill('[name="email"]', \`test\${Date.now()}@example.com\`)
    await page.fill('[name="password"]', 'SecurePass123!')
    await page.fill('[name="confirmPassword"]', 'SecurePass123!')

    await page.click('button[type="submit"]')

    // Проверка welcome экрана
    await page.waitForURL('/welcome')
    await expect(page.locator('h1')).toContainText('Welcome, New User')
  })

  // Тест 3: Восстановление пароля
  test('password reset flow', async ({ page }) => {
    await page.goto('/login')
    await page.click('text=Forgot password?')

    await page.fill('[name="email"]', 'user@example.com')
    await page.click('button:has-text("Send Reset Link")')

    await expect(page.locator('.success-message')).toContainText(
      'Reset link sent to your email'
    )
  })
})

// Время выполнения: ~3-5 минут для всех E2E тестов
// Запускаются только перед деплоем в production!
`

const antiPatternsSnippet = `
// ❌ АНТИПАТТЕРНЫ пирамиды тестирования

// Антипаттерн 1: ПЕРЕВЕРНУТАЯ ПИРАМИДА (Ice Cream Cone)
/*
┌─────────────────┐
│                 │
│   E2E Tests     │  60% - Слишком много E2E!
│   (UI Tests)    │       Медленно, хрупко, дорого
├─────────────────┤
│  Integration    │  30% - Средний уровень
│     Tests       │
├─────────────────┤
│   Unit Tests    │  10% - Мало unit тестов!
└─────────────────┘
*/

// Проблемы:
// ❌ Тесты выполняются часами
// ❌ Flaky тесты постоянно падают
// ❌ Невозможно понять причину падения
// ❌ Сложно поддерживать
// ❌ Тормозит разработку

// Антипаттерн 2: ТОЛЬКО E2E ТЕСТЫ
describe('Bad Practice - Only E2E', () => {
  // ❌ Тестируем простую функцию через UI
  test('validate email through UI', async () => {
    await page.goto('/register')
    await page.fill('[name="email"]', 'invalid-email')
    await page.click('button[type="submit"]')
    await expect(page.locator('.error')).toContainText('Invalid email')
  })

  // ✅ ПРАВИЛЬНО: Unit тест
  test('validate email function', () => {
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('valid@example.com')).toBe(true)
  })
})

// Антипаттерн 3: ИГНОРИРОВАНИЕ UNIT ТЕСТОВ
class PaymentService {
  calculateTax(amount, taxRate) {
    // Сложная бизнес-логика
    if (amount < 0) return 0
    if (taxRate < 0 || taxRate > 1) return 0
    return amount * taxRate
  }
}

// ❌ Тестируем через E2E
test('tax calculation in checkout', async ({ page }) => {
  // 50 строк кода для достижения экрана оплаты...
  await expect(page.locator('.tax')).toContainText('$10.00')
})

// ✅ ПРАВИЛЬНО: Unit тест
describe('PaymentService', () => {
  test('calculates tax correctly', () => {
    const service = new PaymentService()
    expect(service.calculateTax(100, 0.1)).toBe(10)
    expect(service.calculateTax(-100, 0.1)).toBe(0)
    expect(service.calculateTax(100, -0.1)).toBe(0)
  })
})

// Антипаттерн 4: ТЕСТИРОВАНИЕ ЧЕРЕЗ UI ВМЕСТО API
// ❌ ПЛОХО
test('create user through UI', async ({ page }) => {
  await page.goto('/admin/users')
  await page.click('button:has-text("Add User")')
  await page.fill('[name="name"]', 'John')
  await page.fill('[name="email"]', 'john@example.com')
  await page.click('button:has-text("Save")')
  // Медленно, хрупко
})

// ✅ ПРАВИЛЬНО
test('create user via API', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: 'John', email: 'john@example.com' }
  })
  expect(response.status()).toBe(201)
  // Быстро, стабильно
})
`

const cicdIntegrationSnippet = `
# CI/CD интеграция с пирамидой тестирования

# GitHub Actions пример
name: Testing Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # ШАГ 1: Unit тесты (быстрые, запускаются всегда)
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run test:unit
        # Время: ~1-2 минуты
        # Покрытие: 60% всех тестов

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # ШАГ 2: Integration тесты (средняя скорость)
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests  # Запускаются после unit
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test_db
        # Время: ~3-5 минут
        # Покрытие: 30% всех тестов

  # ШАГ 3: E2E тесты (медленные, только на важных ветках)
  e2e-tests:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests]
    if: github.ref == 'refs/heads/main' || github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Start application
        run: npm run start:test &

      - name: Wait for application
        run: npx wait-on http://localhost:3000

      - name: Run E2E tests
        run: npm run test:e2e
        # Время: ~5-10 минут
        # Покрытие: 10% всех тестов
        # ТОЛЬКО критические сценарии!

      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  # ШАГ 4: Деплой (только если все тесты прошли)
  deploy:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests, e2e-tests]
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
        # Деплой только после ВСЕХ тестов
`

const cicdStrategySnippet = `
// Стратегия запуска тестов в CI/CD

/*
УРОВЕНЬ 1: Local Development (при сохранении файла)
├── Unit тесты affected файлов
├── Время: секунды
└── Watch mode с hot reload

УРОВЕНЬ 2: Pre-commit Hook
├── Unit тесты измененных файлов
├── Линтеры и форматтеры
├── Время: ~30 секунд
└── Блокирует коммит при ошибках

УРОВЕНЬ 3: Pull Request
├── Все Unit тесты (60%)
├── Все Integration тесты (30%)
├── Базовые E2E тесты (5%)
├── Время: ~10 минут
└── Обязательно для merge

УРОВЕНЬ 4: Merge to Main
├── Все тесты включая полные E2E (100%)
├── Performance тесты
├── Security сканирование
├── Время: ~20-30 минут
└── Перед деплоем в staging

УРОВЕНЬ 5: Production Deploy
├── Smoke тесты E2E
├── Критические сценарии
├── Время: ~5 минут
└── После деплоя в production
*/

// package.json scripts
{
  "scripts": {
    // Локальная разработка
    "test": "vitest",
    "test:watch": "vitest --watch",

    // CI/CD уровни
    "test:unit": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:critical": "playwright test --grep @critical",

    // Полный прогон
    "test:all": "npm run test:unit && npm run test:integration && npm run test:e2e",

    // Быстрая проверка
    "test:quick": "vitest run --changed"
  }
}

// Playwright конфигурация для разных окружений
// playwright.config.ts
export default {
  projects: [
    {
      name: 'critical',
      testMatch: /.*\.critical\.spec\.ts/,
      retries: 2,  // Критические тесты retry
      timeout: 60000
    },
    {
      name: 'smoke',
      testMatch: /.*\.smoke\.spec\.ts/,
      retries: 0,
      timeout: 30000
    },
    {
      name: 'full',
      testMatch: /.*\.spec\.ts/,
      retries: 1,
      timeout: 120000
    }
  ],

  // Параллелизация в CI
  workers: process.env.CI ? 4 : undefined,

  // Репорты
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ]
}
`

const optimizationTipsSnippet = `
// Оптимизация скорости выполнения тестов

// 1. Параллелизация Unit тестов
// vitest.config.ts
export default {
  test: {
    threads: true,  // Параллельное выполнение
    maxThreads: 8,
    minThreads: 4,
    isolate: true,  // Изоляция между тестами

    // Группировка медленных тестов
    sequence: {
      shuffle: false,
      concurrent: true
    }
  }
}

// 2. Кэширование в Integration тестах
describe('Database Integration', () => {
  let dbConnection

  // Переиспользуем подключение
  beforeAll(async () => {
    dbConnection = await createConnection()
  })

  afterAll(async () => {
    await dbConnection.close()
  })

  // Каждый тест очищает данные, но не пересоздает соединение
  beforeEach(async () => {
    await dbConnection.query('TRUNCATE TABLE users')
  })
})

// 3. Умное использование моков
// ❌ МЕДЛЕННО: Реальные HTTP запросы
test('fetch user data', async () => {
  const data = await fetch('https://api.example.com/users/1')
  expect(data).toBeDefined()
})

// ✅ БЫСТРО: Mock fetch
test('fetch user data', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, name: 'John' })
    })
  )

  const data = await fetchUser(1)
  expect(data).toEqual({ id: 1, name: 'John' })
})

// 4. Оптимизация E2E тестов
// ❌ МЕДЛЕННО: Каждый тест с нуля
test('test 1', async ({ page }) => {
  await page.goto('/login')
  await login(page)
  await page.goto('/dashboard')
  // ... тест
})

test('test 2', async ({ page }) => {
  await page.goto('/login')
  await login(page)  // Дубликат!
  await page.goto('/settings')
  // ... тест
})

// ✅ БЫСТРО: Переиспользование состояния
test.describe('Authenticated tests', () => {
  test.use({ storageState: 'auth.json' })  // Переиспользуем сессию

  test('test 1', async ({ page }) => {
    await page.goto('/dashboard')  // Уже залогинен
    // ... тест
  })

  test('test 2', async ({ page }) => {
    await page.goto('/settings')  // Уже залогинен
    // ... тест
  })
})

// 5. Таймауты и ожидания
// ❌ МЕДЛЕННО: Фиксированные задержки
await page.waitForTimeout(5000)  // Всегда ждем 5 секунд

// ✅ БЫСТРО: Умные ожидания
await page.waitForSelector('.loaded')  // Ждем только нужное время
await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })

// 6. Стратегия тестирования
// Пример: Feature с 20 сценариями

/*
Unit тесты (12 тестов):
├── Валидация форм (5 тестов)
├── Бизнес-логика расчетов (4 теста)
└── Форматирование данных (3 теста)
Время: ~100ms

Integration тесты (6 тестов):
├── API endpoints (3 теста)
├── Database операции (2 теста)
└── Кэш взаимодействие (1 тест)
Время: ~2 секунды

E2E тесты (2 теста):
├── Happy path сценарий (1 тест)
└── Error handling сценарий (1 тест)
Время: ~30 секунд

ИТОГО: 20 тестов за ~33 секунды
Вместо 20 E2E тестов за ~20 минут!
*/
`

const highlightedPyramidDistribution = ref('')
const highlightedUnitTest = ref('')
const highlightedIntegrationTest = ref('')
const highlightedE2ETest = ref('')
const highlightedAntiPatterns = ref('')
const highlightedCICDIntegration = ref('')
const highlightedCICDStrategy = ref('')
const highlightedOptimizationTips = ref('')

onMounted(() => {
  highlightedPyramidDistribution.value = Prism.highlight(pyramidDistributionSnippet, Prism.languages.javascript, 'javascript')
  highlightedUnitTest.value = Prism.highlight(unitTestExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedIntegrationTest.value = Prism.highlight(integrationTestExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedE2ETest.value = Prism.highlight(e2eTestExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedAntiPatterns.value = Prism.highlight(antiPatternsSnippet, Prism.languages.javascript, 'javascript')
  highlightedCICDIntegration.value = Prism.highlight(cicdIntegrationSnippet, Prism.languages.yaml, 'yaml')
  highlightedCICDStrategy.value = Prism.highlight(cicdStrategySnippet, Prism.languages.javascript, 'javascript')
  highlightedOptimizationTips.value = Prism.highlight(optimizationTipsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Пирамида тестирования: концепция и применение
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Пирамида тестирования</b> — это концепция распределения автоматизированных тестов по уровням,
              где основание составляют быстрые и дешевые unit-тесты, середина — integration-тесты средней сложности,
              а вершина — медленные и дорогие E2E-тесты. Цель: максимальное покрытие при минимальных затратах времени.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое пирамида тестирования?</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-success">
                  <v-icon size="60" color="white" class="mb-2">mdi-triangle</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Концепция</h3>
                  <p class="text-white text-body-2">
                    Метафора распределения тестов: много быстрых тестов в основании,
                    мало медленных на вершине
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-primary">
                  <v-icon size="60" color="white" class="mb-2">mdi-target</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Цель</h3>
                  <p class="text-white text-body-2">
                    Оптимальный баланс между скоростью выполнения тестов,
                    стоимостью поддержки и уверенностью в качестве
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center bg-info">
                  <v-icon size="60" color="white" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold text-white mb-2">Результат</h3>
                  <p class="text-white text-body-2">
                    Быстрая обратная связь разработчикам,
                    высокое покрытие кода, стабильные тесты в CI/CD
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Визуализация пирамиды</h2>
            <v-card class="pa-6 mb-8">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="pyramid-container">
                    <div class="pyramid-level pyramid-e2e">
                      <div class="pyramid-label">E2E Tests</div>
                      <div class="pyramid-stats">10%</div>
                    </div>
                    <div class="pyramid-level pyramid-integration">
                      <div class="pyramid-label">Integration Tests</div>
                      <div class="pyramid-stats">30%</div>
                    </div>
                    <div class="pyramid-level pyramid-unit">
                      <div class="pyramid-label">Unit Tests</div>
                      <div class="pyramid-stats">60%</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-list density="compact">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="error">mdi-triangle</v-icon>
                      </template>
                      <v-list-item-title><b>E2E Tests (10%)</b></v-list-item-title>
                      <v-list-item-subtitle>⏱️ Медленные (минуты) • 💰 Дорогие • 🔴 Хрупкие</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="warning">mdi-triangle</v-icon>
                      </template>
                      <v-list-item-title><b>Integration Tests (30%)</b></v-list-item-title>
                      <v-list-item-subtitle>⏱️ Средние (секунды) • 💰 Умеренные • 🟡 Стабильные</v-list-item-subtitle>
                    </v-list-item>

                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="success">mdi-triangle</v-icon>
                      </template>
                      <v-list-item-title><b>Unit Tests (60%)</b></v-list-item-title>
                      <v-list-item-subtitle>⏱️ Быстрые (мс) • 💰 Дешевые • 🟢 Очень стабильные</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Идеальное распределение тестов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPyramidDistribution"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные уровни пирамиды</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. Unit Tests — основание пирамиды (60%)</h3>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-cube-outline</v-icon>
              <strong>Характеристика:</strong> Тестируют отдельные функции/методы в полной изоляции.
              Выполняются за миллисекунды, стабильны, легко поддерживаются.
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedUnitTest"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Значение</th>
                <th class="text-left font-weight-bold">Почему важно</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Скорость</b></td>
                <td class="text-success">Миллисекунды</td>
                <td>Мгновенная обратная связь</td>
              </tr>
              <tr>
                <td><b>Стабильность</b></td>
                <td class="text-success">Очень высокая</td>
                <td>Нет внешних зависимостей</td>
              </tr>
              <tr>
                <td><b>Стоимость</b></td>
                <td class="text-success">Низкая</td>
                <td>Просто писать и поддерживать</td>
              </tr>
              <tr>
                <td><b>Точность</b></td>
                <td class="text-success">Высокая</td>
                <td>Точно указывает на проблему</td>
              </tr>
              <tr>
                <td><b>Покрытие</b></td>
                <td class="text-info">60% тестов</td>
                <td>Основа всей пирамиды</td>
              </tr>
              </tbody>
            </v-table>

            <h3 class="text-h6 font-weight-bold mb-3">2. Integration Tests — середина пирамиды (30%)</h3>
            <v-alert color="primary" class="mb-4">
              <v-icon class="mr-2">mdi-connection</v-icon>
              <strong>Характеристика:</strong> Проверяют взаимодействие между модулями, API, базами данных.
              Выполняются за секунды, умеренная стоимость.
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedIntegrationTest"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Значение</th>
                <th class="text-left font-weight-bold">Почему важно</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Скорость</b></td>
                <td class="text-warning">Секунды</td>
                <td>Приемлемо для CI/CD</td>
              </tr>
              <tr>
                <td><b>Стабильность</b></td>
                <td class="text-info">Средняя</td>
                <td>Зависит от внешних сервисов</td>
              </tr>
              <tr>
                <td><b>Стоимость</b></td>
                <td class="text-warning">Средняя</td>
                <td>Требует настройки окружения</td>
              </tr>
              <tr>
                <td><b>Уверенность</b></td>
                <td class="text-info">Высокая</td>
                <td>Проверяет реальное взаимодействие</td>
              </tr>
              <tr>
                <td><b>Покрытие</b></td>
                <td class="text-info">30% тестов</td>
                <td>Критичные интеграции</td>
              </tr>
              </tbody>
            </v-table>

            <h3 class="text-h6 font-weight-bold mb-3">3. E2E Tests — вершина пирамиды (10%)</h3>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-monitor-dashboard</v-icon>
              <strong>Характеристика:</strong> Тестируют полные пользовательские сценарии через UI.
              Выполняются за минуты, дорогие, хрупкие. ТОЛЬКО критичные сценарии!
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedE2ETest"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Значение</th>
                <th class="text-left font-weight-bold">Почему важно</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Скорость</b></td>
                <td class="text-error">Минуты</td>
                <td>Тормозит CI/CD</td>
              </tr>
              <tr>
                <td><b>Стабильность</b></td>
                <td class="text-error">Низкая (flaky)</td>
                <td>Зависит от UI, сети, timing</td>
              </tr>
              <tr>
                <td><b>Стоимость</b></td>
                <td class="text-error">Высокая</td>
                <td>Сложно писать и поддерживать</td>
              </tr>
              <tr>
                <td><b>Уверенность</b></td>
                <td class="text-success">Максимальная</td>
                <td>Тестирует как пользователь</td>
              </tr>
              <tr>
                <td><b>Покрытие</b></td>
                <td class="text-warning">10% тестов</td>
                <td>Только критичные флоу</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Как распределение помогает качеству?</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-rocket-launch</v-icon>
                    <h3 class="text-h6 font-weight-bold">Скорость разработки</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Unit тесты дают мгновенную обратную связь</li>
                    <li>Разработчики могут итерироваться быстро</li>
                    <li>Меньше времени на ожидание тестов</li>
                    <li>CI/CD пайплайн выполняется за минуты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Уверенность в качестве</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Unit тесты покрывают всю логику</li>
                    <li>Integration тесты проверяют связи</li>
                    <li>E2E тесты гарантируют работу флоу</li>
                    <li>Баланс между скоростью и покрытием</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-cash-multiple</v-icon>
                    <h3 class="text-h6 font-weight-bold">Экономия ресурсов</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Меньше времени CI/CD → меньше затрат</li>
                    <li>Простые тесты легче поддерживать</li>
                    <li>Раннее обнаружение багов дешевле</li>
                    <li>Меньше flaky тестов → меньше reruns</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-chart-line</v-icon>
                    <h3 class="text-h6 font-weight-bold">Масштабируемость</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Легко добавлять новые unit тесты</li>
                    <li>Параллелизация быстрых тестов</li>
                    <li>E2E тесты не растут неконтролируемо</li>
                    <li>Пропорции сохраняются при росте</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Антипаттерны пирамиды тестирования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAntiPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимальный подход на каждом уровне</h2>

            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="d-flex align-items-center">
                    <v-icon color="success" class="mr-2">mdi-cube-outline</v-icon>
                    <b>Unit Tests — когда и как тестировать</b>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mb-2">✅ Что тестировать</h4>
                  <ul class="mb-4">
                    <li>Чистые функции без побочных эффектов</li>
                    <li>Бизнес-логику и алгоритмы</li>
                    <li>Валидаторы и парсеры</li>
                    <li>Утилиты и хелперы</li>
                    <li>Форматирование данных</li>
                    <li>Математические вычисления</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">❌ Что НЕ тестировать</h4>
                  <ul class="mb-4">
                    <li>Приватные методы (тестируйте публичный API)</li>
                    <li>Тривиальный код (геттеры/сеттеры)</li>
                    <li>Сторонние библиотеки</li>
                    <li>Автогенерированный код</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">🎯 Лучшие практики</h4>
                  <ul>
                    <li>Один тест = одна логическая проверка</li>
                    <li>Описательные имена тестов</li>
                    <li>AAA паттерн (Arrange-Act-Assert)</li>
                    <li>Мокать все внешние зависимости</li>
                    <li>Независимые тесты</li>
                    <li>Быстрое выполнение (< 10ms)</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="d-flex align-items-center">
                    <v-icon color="primary" class="mr-2">mdi-connection</v-icon>
                    <b>Integration Tests — фокус на взаимодействии</b>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mb-2">✅ Что тестировать</h4>
                  <ul class="mb-4">
                    <li>API endpoints и контракты</li>
                    <li>Взаимодействие с базой данных</li>
                    <li>Интеграцию с внешними сервисами</li>
                    <li>Кэш и очереди сообщений</li>
                    <li>Middleware и плагины</li>
                    <li>Сложные workflow между модулями</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">⚙️ Как тестировать</h4>
                  <ul class="mb-4">
                    <li>Тестовая БД (in-memory или docker)</li>
                    <li>Моки только для внешних API</li>
                    <li>Проверка контрактов и схем</li>
                    <li>Валидация data flow</li>
                    <li>Проверка транзакций и rollback</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">🎯 Лучшие практики</h4>
                  <ul>
                    <li>Изолированная тестовая среда</li>
                    <li>Cleanup после каждого теста</li>
                    <li>Переиспользование соединений</li>
                    <li>Тестовые fixtures для данных</li>
                    <li>Таймауты для async операций</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="d-flex align-items-center">
                    <v-icon color="warning" class="mr-2">mdi-monitor-dashboard</v-icon>
                    <b>E2E Tests — только критичные сценарии</b>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <h4 class="font-weight-bold mb-2">✅ Что тестировать</h4>
                  <ul class="mb-4">
                    <li><b>Happy path</b> критичных флоу (регистрация, оплата)</li>
                    <li>Основные ошибки пользователя</li>
                    <li>Критичную безопасность (авторизация)</li>
                    <li>Ключевые конверсионные воронки</li>
                    <li>Smoke тесты после деплоя</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">❌ Что НЕ тестировать</h4>
                  <ul class="mb-4">
                    <li>Все возможные комбинации (это unit тесты)</li>
                    <li>Детальную валидацию форм</li>
                    <li>Все edge cases</li>
                    <li>UI компоненты изолированно</li>
                  </ul>

                  <h4 class="font-weight-bold mb-2">🎯 Лучшие практики</h4>
                  <ul>
                    <li>Переиспользование авторизации</li>
                    <li>Page Object Model паттерн</li>
                    <li>Умные ожидания (не фиксированные таймауты)</li>
                    <li>Скриншоты/видео при падении</li>
                    <li>Retry стратегия для flaky тестов</li>
                    <li>Запуск только перед production деплоем</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Пирамида тестирования и CI/CD</h2>

            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Связь с CI/CD:</strong> Пирамида определяет стратегию запуска тестов в конвейере.
              Быстрые тесты запускаются часто, медленные — только на важных этапах.
            </v-alert>

            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedCICDIntegration"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Стратегия запуска тестов по этапам</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCICDStrategy"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация скорости выполнения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOptimizationTips"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Метрики эффективности пирамиды</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-3">✅ Здоровая пирамида</h3>
                  <v-table density="compact" theme="dark">
                    <tbody>
                    <tr>
                      <td class="text-white"><b>Распределение:</b></td>
                      <td class="text-white">60% / 30% / 10%</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Время CI:</b></td>
                      <td class="text-white">< 10 минут</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Flaky тесты:</b></td>
                      <td class="text-white">< 2%</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Скорость unit:</b></td>
                      <td class="text-white">< 5 минут</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Coverage:</b></td>
                      <td class="text-white">80%+</td>
                    </tr>
                    </tbody>
                  </v-table>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-3">❌ Проблемная пирамида</h3>
                  <v-table density="compact" theme="dark">
                    <tbody>
                    <tr>
                      <td class="text-white"><b>Распределение:</b></td>
                      <td class="text-white">20% / 30% / 50%</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Время CI:</b></td>
                      <td class="text-white">> 30 минут</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Flaky тесты:</b></td>
                      <td class="text-white">> 10%</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Скорость unit:</b></td>
                      <td class="text-white">> 15 минут</td>
                    </tr>
                    <tr>
                      <td class="text-white"><b>Coverage:</b></td>
                      <td class="text-white">< 50%</td>
                    </tr>
                    </tbody>
                  </v-table>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя делать только E2E тесты, если они дают максимальную уверенность?</p>
                <p class="font-weight-regular ma-0">
                  E2E тесты медленные (минуты вместо миллисекунд), хрупкие (падают из-за изменений UI),
                  дорогие в поддержке и сложно отлаживать. Если все тесты E2E, CI займет часы,
                  разработка замедлится, а при падении теста непонятно, где именно проблема.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что плохого в перевернутой пирамиде (Ice Cream Cone)?</p>
                <p class="font-weight-regular ma-0">
                  Когда E2E тестов больше всего — тесты выполняются часами, постоянно падают без причины (flaky),
                  невозможно быстро найти проблему, высокая стоимость поддержки. Это тормозит всю разработку
                  и снижает доверие к тестам.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как пирамида связана с CI/CD?</p>
                <p class="font-weight-regular ma-0">
                  Пирамида определяет, какие тесты когда запускать: unit тесты — при каждом коммите (секунды),
                  integration — при PR (минуты), E2E — только перед production (десятки минут).
                  Это позволяет иметь быструю обратную связь без блокировки пайплайна.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему именно 60/30/10, а не другое соотношение?</p>
                <p class="font-weight-regular ma-0">
                  Это не строгое правило, а рекомендация основанная на практике. Важен принцип: больше быстрых,
                  меньше медленных. В вашем проекте может быть 70/25/5 или 50/35/15 в зависимости от специфики.
                  Главное — избегать перевернутой пирамиды.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делать, если у нас уже есть 100 E2E тестов, которые выполняются 2 часа?</p>
                <p class="font-weight-regular ma-0">
                  Провести рефакторинг: оставить только критичные E2E сценарии (~10-15 тестов), остальные
                  покрыть unit и integration тестами. Критичные E2E запускать только перед production деплоем,
                  а для PR достаточно smoke тестов. Параллелизация также помогает ускорить выполнение.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как измерить эффективность пирамиды в проекте?</p>
                <p class="font-weight-regular ma-0">
                  Метрики: время выполнения CI/CD (должно быть < 10 минут для unit+integration), процент flaky
                  тестов (< 2%), соотношение количества тестов по уровням, coverage (80%+), время на отладку
                  падающих тестов. Если CI занимает часы или тесты постоянно падают — пирамида нездорова.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Практические рекомендации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Начинать с unit тестов</li>
                    <li>Следить за соотношением 60/30/10</li>
                    <li>Мониторить время CI/CD</li>
                    <li>Параллелизировать unit тесты</li>
                    <li>Использовать моки активно</li>
                    <li>E2E только для критичных флоу</li>
                    <li>Измерять метрики пирамиды</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Перевернутой пирамиды</li>
                    <li>Тестирования всего через UI</li>
                    <li>Игнорирования flaky тестов</li>
                    <li>E2E для каждой фичи</li>
                    <li>Медленных unit тестов</li>
                    <li>Зависимости между тестами</li>
                    <li>Блокирующих CI/CD пайплайнов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Ревью пирамиды раз в квартал</li>
                    <li>Измеряйте ROI каждого уровня</li>
                    <li>Обучайте команду принципам</li>
                    <li>Автоматизируйте проверку метрик</li>
                    <li>Проводите test debt спринты</li>
                    <li>Документируйте стратегию</li>
                    <li>Адаптируйте под свой проект</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Пирамида тестирования</b> — это фундаментальная концепция, обеспечивающая баланс между
              скоростью обратной связи, уверенностью в качестве и стоимостью поддержки. Правильное распределение
              тестов (60% unit, 30% integration, 10% E2E) позволяет получать быструю обратную связь,
              поддерживать высокое покрытие и не тормозить CI/CD пайплайн. Пирамида — это не догма,
              а практичный подход, доказавший эффективность в реальных проектах.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://martinfowler.com/articles/practical-test-pyramid.html"
                target="_blank"
                class="mr-2">
                Martin Fowler: Test Pyramid
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html"
                target="_blank">
                Google Testing Blog
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

.ol-list {
  list-style-position: inside;
  padding-left: 0;
}

.ol-list li {
  margin-bottom: 1rem;
}

.pyramid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px;
}

.pyramid-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.2s;
}

.pyramid-level:hover {
  transform: scale(1.02);
}

.pyramid-e2e {
  width: 120px;
  height: 60px;
  background: linear-gradient(135deg, #ef5350 0%, #e53935 100%);
}

.pyramid-integration {
  width: 240px;
  height: 80px;
  background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
}

.pyramid-unit {
  width: 360px;
  height: 100px;
  background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
}

.pyramid-label {
  font-size: 14px;
  margin-bottom: 4px;
}

.pyramid-stats {
  font-size: 18px;
  font-weight: 900;
}

@media (max-width: 960px) {
  .pyramid-e2e {
    width: 100px;
    height: 50px;
  }

  .pyramid-integration {
    width: 200px;
    height: 70px;
  }

  .pyramid-unit {
    width: 300px;
    height: 90px;
  }
}
</style>
