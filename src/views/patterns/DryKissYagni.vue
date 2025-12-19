<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const dryBadSnippet = `
// ❌ НАРУШЕНИЕ DRY - повторяющийся код
function calculateUserDiscount(user) {
  if (user.membershipYears > 5) {
    return user.totalPurchases * 0.2;
  }
  return user.totalPurchases * 0.1;
}

function calculateProductDiscount(product, user) {
  if (user.membershipYears > 5) {
    return product.price * 0.2;
  }
  return product.price * 0.1;
}

function calculateCartDiscount(cart, user) {
  if (user.membershipYears > 5) {
    return cart.total * 0.2;
  }
  return cart.total * 0.1;
}

// Проблема: логика скидки повторяется 3 раза!
`

const dryGoodSnippet = `
// ✅ СЛЕДОВАНИЕ DRY - единый источник истины
function getDiscountRate(user) {
  return user.membershipYears > 5 ? 0.2 : 0.1;
}

function calculateDiscount(amount, user) {
  return amount * getDiscountRate(user);
}

// Использование
const userDiscount = calculateDiscount(user.totalPurchases, user);
const productDiscount = calculateDiscount(product.price, user);
const cartDiscount = calculateDiscount(cart.total, user);

// Теперь логика скидки в одном месте!
`

const kissBadSnippet = `
// ❌ НАРУШЕНИЕ KISS - излишняя сложность
class UserValidator {
  constructor() {
    this.validationStrategies = new Map();
    this.validationChain = [];
    this.errorHandlers = [];
  }

  registerStrategy(name, strategy) {
    this.validationStrategies.set(name, strategy);
    return this;
  }

  addToChain(strategyName) {
    this.validationChain.push(strategyName);
    return this;
  }

  validate(user) {
    const context = { user, errors: [] };

    for (const strategyName of this.validationChain) {
      const strategy = this.validationStrategies.get(strategyName);

      try {
        const result = strategy.execute(context);

        if (!result.valid) {
          context.errors.push(...result.errors);

          for (const handler of this.errorHandlers) {
            handler.handle(context);
          }
        }
      } catch (error) {
        // Error handling...
      }
    }

    return context.errors.length === 0;
  }
}

// Использование требует глубокого понимания паттернов
const validator = new UserValidator()
  .registerStrategy('email', new EmailValidationStrategy())
  .registerStrategy('age', new AgeValidationStrategy())
  .addToChain('email')
  .addToChain('age');
`

const kissGoodSnippet = `
// ✅ СЛЕДОВАНИЕ KISS - простое и понятное решение
function validateUser(user) {
  const errors = [];

  // Проверка email
  if (!user.email || !user.email.includes('@')) {
    errors.push('Invalid email');
  }

  // Проверка возраста
  if (!user.age || user.age < 18) {
    errors.push('User must be 18 or older');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Использование простое и понятное
const result = validateUser(user);
if (!result.valid) {
  console.log('Validation errors:', result.errors);
}
`

const yagniBadSnippet = `
// ❌ НАРУШЕНИЕ YAGNI - преждевременная оптимизация
class UserService {
  constructor() {
    // Кэширование для будущего масштабирования
    this.cache = new Map();
    this.cacheExpiry = new Map();

    // Пул соединений (пока не нужен)
    this.connectionPool = [];

    // Очередь задач (может пригодится)
    this.taskQueue = [];

    // Метрики производительности
    this.metrics = {
      requests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      avgResponseTime: 0
    };
  }

  async getUser(id) {
    this.metrics.requests++;
    const startTime = Date.now();

    // Проверка кэша
    if (this.cache.has(id)) {
      const expiry = this.cacheExpiry.get(id);
      if (expiry > Date.now()) {
        this.metrics.cacheHits++;
        return this.cache.get(id);
      }
    }

    this.metrics.cacheMisses++;

    // Реальный запрос
    const user = await fetch(\`/api/users/\${id}\`).then(r => r.json());

    // Сохранение в кэш
    this.cache.set(id, user);
    this.cacheExpiry.set(id, Date.now() + 60000);

    // Обновление метрик
    const responseTime = Date.now() - startTime;
    this.metrics.avgResponseTime =
      (this.metrics.avgResponseTime + responseTime) / 2;

    return user;
  }

  // Множество неиспользуемых методов
  async bulkGetUsers(ids) { /* ... */ }
  async getUserWithCache(id, ttl) { /* ... */ }
  async prefetchUsers(ids) { /* ... */ }
  clearCache() { /* ... */ }
  getMetrics() { /* ... */ }
}

// Проблема: 90% кода не используется!
`

const yagniGoodSnippet = `
// ✅ СЛЕДОВАНИЕ YAGNI - минимально необходимая функциональность
class UserService {
  async getUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
}

// Просто и достаточно для текущих потребностей
// Добавим кэширование, когда это действительно понадобится
`

const combinedExampleSnippet = `
// 🎯 КОМБИНАЦИЯ ВСЕХ ТРЕХ ПРИНЦИПОВ

// ❌ ПЛОХО: нарушаем все принципы
function processUserOrder(user, order) {
  // Нарушение DRY - повторяем проверку возраста
  if (user.age < 18) {
    throw new Error('User must be 18 or older');
  }

  // Нарушение KISS - излишняя сложность
  const discountCalculator = new DiscountCalculatorFactory()
    .createCalculator('standard')
    .withStrategy(new MembershipDiscountStrategy())
    .withFallback(new DefaultDiscountStrategy());

  // Нарушение YAGNI - функциональность "на будущее"
  const auditLogger = new AuditLogger();
  auditLogger.logOrderCreation(order);
  auditLogger.logUserActivity(user);
  auditLogger.generateReport();

  return order;
}

// ✅ ХОРОШО: следуем всем принципам
function processOrder(user, order) {
  // DRY: используем общую функцию валидации
  validateAge(user, 18);

  // KISS: простое вычисление скидки
  order.discount = calculateDiscount(order.total, user);

  // YAGNI: только необходимая функциональность
  order.finalPrice = order.total - order.discount;

  return order;
}

// Вспомогательные функции (DRY)
function validateAge(user, minAge) {
  if (user.age < minAge) {
    throw new Error(\`User must be \${minAge} or older\`);
  }
}

function calculateDiscount(amount, user) {
  const rate = user.isPremium ? 0.2 : 0.1;
  return amount * rate;
}
`

const practicalExampleSnippet = `
// 📦 РЕАЛЬНЫЙ ПРИМЕР: React компонент

// ❌ ПЛОХО
const UserDashboard = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Нарушение DRY - дублирование fetch логики
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser)
      .catch(console.error);
  }, [userId]);

  useEffect(() => {
    fetch(\`/api/users/\${userId}/orders\`)
      .then(r => r.json())
      .then(setOrders)
      .catch(console.error);
  }, [userId]);

  // Нарушение YAGNI - неиспользуемая функциональность
  useEffect(() => {
    fetch(\`/api/users/\${userId}/recommendations\`)
      .then(r => r.json())
      .then(setRecommendations)
      .catch(console.error);
  }, [userId]);

  // Нарушение KISS - излишняя сложность рендеринга
  return (
    <div>
      {user && (
        <UserProfileCard
          user={user}
          theme="light"
          variant="elevated"
          showBadges={true}
          showSocialLinks={false}
          enableAnimations={true}
        />
      )}
      {/* ... сложная структура ... */}
    </div>
  );
};

// ✅ ХОРОШО
const UserDashboard = ({ userId }) => {
  // DRY: единый хук для загрузки данных
  const { data: user, loading } = useFetch(\`/api/users/\${userId}\`);
  const { data: orders } = useFetch(\`/api/users/\${userId}/orders\`);

  // YAGNI: загружаем только необходимые данные
  // (recommendations убрали - они не используются)

  if (loading) return <Loader />;

  // KISS: простой и понятный рендеринг
  return (
    <div>
      <UserProfile user={user} />
      <OrdersList orders={orders} />
    </div>
  );
};

// Переиспользуемый хук (DRY)
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
`

const balanceExampleSnippet = `
// ⚖️ БАЛАНС ПРИНЦИПОВ - когда они конфликтуют

// Ситуация 1: DRY vs KISS
// Иногда небольшое дублирование проще, чем абстракция

// Плохая абстракция (сложная для понимания)
function processData(data, config) {
  return config.steps.reduce((result, step) => {
    return step.transform(result, step.params);
  }, data);
}

// Простое дублирование (понятнее)
function processUserData(data) {
  return data.map(item => ({ ...item, type: 'user' }));
}

function processOrderData(data) {
  return data.map(item => ({ ...item, type: 'order' }));
}

// Ситуация 2: YAGNI vs DRY
// Не создавайте абстракции "на будущее"

// ❌ Преждевременная абстракция
function createEntity(type, data) {
  // Поддерживаем 10 типов, используем только 2
  const factories = {
    user: UserFactory,
    order: OrderFactory,
    product: ProductFactory,
    // ... еще 7 неиспользуемых типов
  };
  return factories[type].create(data);
}

// ✅ Добавляем по мере необходимости
function createUser(data) {
  return new User(data);
}

function createOrder(data) {
  return new Order(data);
}
// Добавим createProduct, когда понадобится

// Ситуация 3: KISS vs масштабируемость
// Начните с простого, усложняйте при необходимости

// Простое решение для старта
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// Усложняем только когда действительно нужно
class ConfigManager {
  constructor() {
    this.configs = new Map();
    this.env = process.env.NODE_ENV;
  }

  get(key) {
    return this.configs.get(\`\${this.env}.\${key}\`);
  }
}
`

const highlightedDryBad = ref('')
const highlightedDryGood = ref('')
const highlightedKissBad = ref('')
const highlightedKissGood = ref('')
const highlightedYagniBad = ref('')
const highlightedYagniGood = ref('')
const highlightedCombined = ref('')
const highlightedPractical = ref('')
const highlightedBalance = ref('')

onMounted(() => {
  highlightedDryBad.value = Prism.highlight(dryBadSnippet, Prism.languages.javascript, 'javascript')
  highlightedDryGood.value = Prism.highlight(dryGoodSnippet, Prism.languages.javascript, 'javascript')
  highlightedKissBad.value = Prism.highlight(kissBadSnippet, Prism.languages.javascript, 'javascript')
  highlightedKissGood.value = Prism.highlight(kissGoodSnippet, Prism.languages.javascript, 'javascript')
  highlightedYagniBad.value = Prism.highlight(yagniBadSnippet, Prism.languages.javascript, 'javascript')
  highlightedYagniGood.value = Prism.highlight(yagniGoodSnippet, Prism.languages.javascript, 'javascript')
  highlightedCombined.value = Prism.highlight(combinedExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedBalance.value = Prism.highlight(balanceExampleSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              DRY / KISS / YAGNI: Фундаментальные принципы чистого кода
            </h1>

            <p class="font-weight-regular mb-6">
              <b>DRY, KISS и YAGNI</b> — три ключевых принципа программирования, которые помогают писать
              поддерживаемый, понятный и эффективный код. Понимание этих принципов и умение их применять —
              важный навык для любого разработчика.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Расшифровка принципов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-content-copy</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">DRY</h3>
                  <p class="text-h6 mb-2">Don't Repeat Yourself</p>
                  <p class="text-body-2">Не повторяйся</p>
                  <v-divider class="my-3"></v-divider>
                  <p class="text-body-2">
                    Каждая часть знания должна иметь единственное, недвусмысленное,
                    авторитетное представление в системе
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-heart</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">KISS</h3>
                  <p class="text-h6 mb-2">Keep It Simple, Stupid</p>
                  <p class="text-body-2">Делай проще</p>
                  <v-divider class="my-3"></v-divider>
                  <p class="text-body-2">
                    Простые решения работают лучше сложных.
                    Не усложняй без необходимости
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-clock-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">YAGNI</h3>
                  <p class="text-h6 mb-2">You Aren't Gonna Need It</p>
                  <p class="text-body-2">Тебе это не понадобится</p>
                  <v-divider class="my-3"></v-divider>
                  <p class="text-body-2">
                    Не добавляй функциональность, пока она действительно не понадобится
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. DRY (Don't Repeat Yourself)</h2>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение DRY</h3>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> Дублирование кода приводит к проблемам с поддержкой —
              изменение логики требует правок в нескольких местах
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedDryBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Следование DRY</h3>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> Единый источник истины — логика в одном месте,
              легко изменить и протестировать
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDryGood"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. KISS (Keep It Simple, Stupid)</h2>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение KISS</h3>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> Излишняя сложность затрудняет понимание, отладку и поддержку кода
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedKissBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Следование KISS</h3>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> Простое решение легко понять, поддерживать и отлаживать
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedKissGood"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. YAGNI (You Aren't Gonna Need It)</h2>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Нарушение YAGNI</h3>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> Преждевременная оптимизация и избыточная функциональность
              усложняют код и замедляют разработку
            </v-alert>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedYagniBad"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Следование YAGNI</h3>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> Минимально необходимая функциональность —
              добавляй только то, что нужно сейчас
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedYagniGood"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинация принципов</h2>
            <p class="font-weight-regular mb-4">
              DRY, KISS и YAGNI работают вместе, создавая синергию для написания чистого кода:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCombined"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример: React компонент</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Взаимосвязь принципов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Принцип</th>
                <th class="text-left font-weight-bold">Основная идея</th>
                <th class="text-left font-weight-bold">Как дополняет другие</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>DRY</b></td>
                <td class="pt-2 pb-2">Избегать дублирования</td>
                <td class="pt-2 pb-2">KISS: абстракция должна быть простой<br>YAGNI: не создавай абстракции заранее</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>KISS</b></td>
                <td class="pt-2 pb-2">Простота решений</td>
                <td class="pt-2 pb-2">DRY: простота через переиспользование<br>YAGNI: простота через минимализм</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>YAGNI</b></td>
                <td class="pt-2 pb-2">Только необходимое</td>
                <td class="pt-2 pb-2">DRY: абстракции по мере необходимости<br>KISS: меньше кода = проще код</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Баланс принципов</h2>
            <p class="font-weight-regular mb-4">
              Иногда принципы могут конфликтовать. Важно найти правильный баланс:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBalance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда применять каждый принцип</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-primary">DRY применяй когда:</h3>
                  <ul class="pl-4">
                    <li>Одинаковая логика в 2+ местах</li>
                    <li>Изменения требуют правок везде</li>
                    <li>Абстракция будет понятной</li>
                    <li>Код действительно повторяется</li>
                  </ul>
                  <h4 class="text-subtitle-1 font-weight-bold mt-3 mb-2">НЕ применяй когда:</h4>
                  <ul class="pl-4">
                    <li>Код похож, но логика разная</li>
                    <li>Абстракция сложнее дублирования</li>
                    <li>Это преждевременная оптимизация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">KISS применяй всегда:</h3>
                  <ul class="pl-4">
                    <li>При написании нового кода</li>
                    <li>При рефакторинге</li>
                    <li>При code review</li>
                    <li>Выбирая между решениями</li>
                  </ul>
                  <h4 class="text-subtitle-1 font-weight-bold mt-3 mb-2">Исключения:</h4>
                  <ul class="pl-4">
                    <li>Сложность — часть требований</li>
                    <li>Производительность критична</li>
                    <li>Нужна гибкость архитектуры</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">YAGNI применяй когда:</h3>
                  <ul class="pl-4">
                    <li>Добавляешь новую функцию</li>
                    <li>Планируешь архитектуру</li>
                    <li>"А что если нам понадобится..."</li>
                    <li>Строишь MVP</li>
                  </ul>
                  <h4 class="text-subtitle-1 font-weight-bold mt-3 mb-2">НЕ применяй когда:</h4>
                  <ul class="pl-4">
                    <li>Функция в текущих требованиях</li>
                    <li>Базовая расширяемость нужна</li>
                    <li>Рефакторинг дороже доработки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как DRY, KISS и YAGNI связаны между собой?</p>
                <p class="font-weight-regular ma-0">
                  Они дополняют друг друга: <b>DRY</b> убирает дублирование, <b>KISS</b>
                  следит за простотой решения, <b>YAGNI</b> предотвращает избыточность.
                  Вместе они создают код, который легко понять, изменить и поддерживать.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Может ли следование DRY нарушить KISS?</p>
                <p class="font-weight-regular ma-0">
                  Да. Чрезмерная абстракция ради устранения небольшого дублирования может усложнить код.
                  Иногда два простых метода лучше одного универсального, но сложного.
                  Правило: если абстракция сложнее дублирования — оставь дублирование.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда можно нарушить YAGNI?</p>
                <p class="font-weight-regular ma-0">
                  Когда функциональность уже в требованиях, когда базовая расширяемость критична
                  (например, plugin system), или когда будущий рефакторинг обойдется намного дороже.
                  Но "может пригодиться" — не причина.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как определить, что код следует принципам?</p>
                <p class="font-weight-regular ma-0">
                  <b>DRY:</b> изменение логики требует правки только в одном месте.
                  <b>KISS:</b> новый разработчик понимает код за 5 минут.
                  <b>YAGNI:</b> каждая строка кода используется в продакшене.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Приведи пример конфликта принципов</p>
                <p class="font-weight-regular ma-0">
                  Создание универсального компонента Button с 20 пропсами (DRY) vs создание
                  нескольких простых компонентов PrimaryButton, SecondaryButton (KISS).
                  Решение зависит от контекста: для UI-kit лучше универсальный,
                  для конкретного приложения — специализированные.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что важнее в спорной ситуации?</p>
                <p class="font-weight-regular ma-0">
                  <b>KISS</b> обычно важнее остальных. Простой код легче рефакторить в DRY
                  и легче расширять при нарушении YAGNI. Сложный код проблематичен всегда.
                  Правило: в сомнениях выбирай простоту.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Чеклист применения принципов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Хорошие признаки</h3>
                  <ul class="text-white pl-4">
                    <li>Код легко читается</li>
                    <li>Изменения локализованы</li>
                    <li>Нет мертвого кода</li>
                    <li>Минимум абстракций</li>
                    <li>Понятные имена</li>
                    <li>Каждая функция используется</li>
                    <li>Новички понимают код</li>
                    <li>Легко тестировать</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ Плохие признаки</h3>
                  <ul class="text-white pl-4">
                    <li>Copy-paste в нескольких местах</li>
                    <li>Сложные абстракции</li>
                    <li>Неиспользуемый код</li>
                    <li>"На будущее" функции</li>
                    <li>Глубокая вложенность</li>
                    <li>Непонятные имена</li>
                    <li>Долгие объяснения логики</li>
                    <li>Сложные тесты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>DRY, KISS и YAGNI</b> — это не жесткие правила, а ориентиры для принятия решений.
              <b>DRY</b> помогает избежать дублирования, <b>KISS</b> сохраняет простоту,
              <b>YAGNI</b> предотвращает избыточность. Их комбинация создает код, который легко
              понять, изменить и поддерживать. Ключ к мастерству — понимание, когда и как
              применять каждый принцип, находя баланс между ними в зависимости от контекста.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://www.artima.com/articles/orthogonality-and-the-dry-principle"
                target="_blank"
                class="mr-2">
                DRY Principle
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://en.wikipedia.org/wiki/KISS_principle"
                target="_blank">
                KISS & YAGNI
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
