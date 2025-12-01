<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const csrFlowSnippet = `
<!-- CSR (Client-Side Rendering) - традиционный подход -->

<!-- 1. Сервер отдает минимальный HTML -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <div id="root"></div>
  <!-- Контент пустой! -->
  <script src="bundle.js"><\/script>
</body>
</html>

<!-- 2. Браузер загружает JS бандл (~500KB+) -->
<!-- 3. React/Vue монтирует приложение -->
<!-- 4. Делает запросы к API -->
<!-- 5. ТОЛЬКО ПОТОМ пользователь видит контент -->

// React CSR пример
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
const [data, setData] = React.useState(null)

React.useEffect(() => {
// API запрос ПОСЛЕ загрузки JS
fetch('/api/products')
.then(res => res.json())
.then(setData)
}, [])

if (!data) return <div>Loading...</div>

return (
<div>
<h1>Products</h1>
{data.map(product => (
<ProductCard key={product.id} {...product} />
))}
</div>
)
}

ReactDOM.render(<App />, document.getElementById('root'))
`

const ssrFlowSnippet = `
<!-- SSR (Server-Side Rendering) - современный подход -->

<!-- 1. Сервер рендерит готовый HTML с данными -->
<!DOCTYPE html>
<html>
<head>
  <title>Products - My App</title>
  <meta name="description" content="Browse our products">
</head>
<body>
<div id="root">
  <!-- Контент УЖЕ здесь! -->
  <div>
    <h1>Products</h1>
    <div class="product-card">
      <h2>Product 1</h2>
      <p>$99.99</p>
    </div>
    <div class="product-card">
      <h2>Product 2</h2>
      <p>$149.99</p>
    </div>
  </div>
</div>
<script src="bundle.js"><\/script>
<script>
  // Данные для гидратации
  window.__INITIAL_DATA__ = {
    products: [
      {id: 1, name: "Product 1", price: 99.99},
      {id: 2, name: "Product 2", price: 149.99}
    ]
  }
<\/script>
</body>
</html>

<!-- 2. Браузер показывает контент МГНОВЕННО -->
<!-- 3. JS загружается в фоне -->
<!-- 4. Hydration - "оживление" статического HTML -->
`

const nextjsExampleSnippet = `
// Next.js - SSR пример (App Router)
// app/products/page.tsx

import { ProductCard } from '@/components/ProductCard'

// Функция выполняется на СЕРВЕРЕ
async function getProducts() {
const res = await fetch('https://api.example.com/products', {
// ISR - Incremental Static Regeneration
next: { revalidate: 60 } // Кэш на 60 секунд
})

if (!res.ok) throw new Error('Failed to fetch')
return res.json()
}

// Server Component - рендерится только на сервере
export default async function ProductsPage() {
// await работает напрямую, без useEffect!
const products = await getProducts()

return (
<div>
<h1>Products</h1>
{products.map(product => (
<ProductCard key={product.id} {...product} />
))}
</div>
)
}

// Генерация метаданных на сервере
export async function generateMetadata() {
return {
title: 'Products - My Store',
description: 'Browse our amazing products',
openGraph: {
images: ['/og-image.jpg']
}
}
}
`

const nuxtExampleSnippet = `
<!-- Nuxt.js - SSR пример -->
<!-- pages/products/index.vue -->

<script setup lang="ts">
// Композабл для SSR данных
const { data: products, pending, error } = await useFetch('/api/products', {
  // Выполняется на сервере
  server: true,
  // Данные передаются клиенту
  lazy: false
})

// SEO метаданные
useHead({
  title: 'Products - My Store',
  meta: [
    { name: 'description', content: 'Browse our products' }
  ]
})

// Server-side логика
const route = useRoute()
const category = route.query.category as string

// Фильтрация на сервере
const filteredProducts = computed(() => {
  if (!category || !products.value) return products.value
  return products.value.filter(p => p.category === category)
})
<\/script>

<template>
  <div>
    <h1>Products</h1>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>
  </div>
</template>
`

const hydrationSnippet = `
// Hydration - процесс "оживления" статического HTML

// 1. Сервер рендерит HTML со всеми данными
const htmlString = ReactDOMServer.renderToString(
<App data={serverData} />
)

// 2. HTML отправляется браузеру с данными
const html = \`
<!DOCTYPE html>
<html>
<body>
<div id="root">\${htmlString}</div>
<script>
  window.__INITIAL_DATA__ = \${JSON.stringify(serverData)}
<\/script>
<script src="bundle.js"><\/script>
</body>
</html>
\`

// 3. Клиент "гидрирует" существующий HTML
ReactDOM.hydrateRoot(
document.getElementById('root'),
<App data={window.__INITIAL_DATA__} />
)

// Что происходит при гидратации:
// ✅ React/Vue прикрепляет обработчики событий
// ✅ Восстанавливает состояние компонентов
// ✅ Делает статический HTML интерактивным
// ⚠️ НЕ перерендеривает DOM (если совпадает)

// Проблема: Hydration Mismatch
function BadComponent() {
// ❌ ПЛОХО: время на сервере ≠ время на клиенте
return <div>{new Date().toISOString()}</div>

// ✅ ХОРОШО: одинаковые данные
return <div>{props.timestamp}</div>
}
`

const seoComparisonSnippet = `
<!-- SEO: CSR vs SSR -->

<!-- ❌ CSR - поисковик видит пустую страницу -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
<div id="root"></div>
<!-- Googlebot ждет JS, но не всегда выполняет -->
<script src="bundle.js"><\/script>
</body>
</html>

<!-- ✅ SSR - поисковик видит полный контент -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <title>Купить iPhone 15 Pro - лучшая цена в России</title>
  <meta name="description" content="iPhone 15 Pro от 89 990₽. Официальная гарантия Apple. Быстрая доставка по Москве и России.">
  <meta property="og:title" content="iPhone 15 Pro - My Store">
  <meta property="og:image" content="https://example.com/iphone-15-pro.jpg">
  <link rel="canonical" href="https://example.com/products/iphone-15-pro">

  <!-- Структурированные данные для Google -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "iPhone 15 Pro",
      "price": "89990",
      "priceCurrency": "RUB",
      "availability": "https://schema.org/InStock",
      "image": "https://example.com/iphone-15-pro.jpg"
    }
  <\/script>
</head>
<body>
<div id="root">
  <article>
    <h1>iPhone 15 Pro</h1>
    <img src="/iphone-15-pro.jpg" alt="iPhone 15 Pro фото">
    <p>Революционный чип A17 Pro. Титановый корпус...</p>
    <div class="price">89 990 ₽</div>
    <button>Купить</button>
  </article>
</div>
</body>
</html>

<!-- Googlebot индексирует контент СРАЗУ -->
`

const performanceSnippet = `
// Метрики производительности: CSR vs SSR

// CSR (Client-Side Rendering)
// ════════════════════════════════════════════════
// TTFB (Time to First Byte): ~200ms    ✅ Быстро
// FCP (First Contentful Paint): ~3s    ❌ Медленно
// LCP (Largest Contentful Paint): ~4s  ❌ Медленно
// TTI (Time to Interactive): ~4.5s     ❌ Медленно
//
// Причины:
// 1. Загрузка большого JS бандла (500KB+)
// 2. Парсинг и выполнение JS
// 3. API запросы после загрузки JS
// 4. Рендеринг после получения данных

// SSR (Server-Side Rendering)
// ════════════════════════════════════════════════
// TTFB: ~500ms                          ⚠️ Медленнее
// FCP: ~800ms                           ✅ Быстро!
// LCP: ~1.2s                            ✅ Быстро!
// TTI: ~3s                              ✅ Средне
//
// Преимущества:
// 1. Контент виден СРАЗУ
// 2. JS загружается параллельно
// 3. Данные уже в HTML
// 4. Лучший UX на медленных соединениях

// Измерение производительности
import { measureWebVitals } from 'web-vitals'

measureWebVitals({
onFCP: (metric) => {
console.log('First Contentful Paint:', metric.value)
// CSR: ~3000ms
// SSR: ~800ms
},
onLCP: (metric) => {
console.log('Largest Contentful Paint:', metric.value)
// CSR: ~4000ms
// SSR: ~1200ms
}
})
`

const cachingStrategySnippet = `
// Стратегии кэширования для SSR

// 1. STATIC GENERATION (SSG) - генерация в build time
// Next.js
export async function generateStaticParams() {
const products = await getProducts()

// Генерируем страницы для каждого продукта
return products.map(product => ({
slug: product.slug
}))
}

// 2. INCREMENTAL STATIC REGENERATION (ISR)
// Next.js
export const revalidate = 60 // Регенерация каждые 60 секунд

async function getProduct(slug: string) {
const res = await fetch(\`https://api.example.com/products/\${slug}\`, {
next: { revalidate: 60 }
})
return res.json()
}

// 3. ON-DEMAND REVALIDATION
// Next.js API Route
export async function POST(request: Request) {
const { slug } = await request.json()

// Инвалидируем кэш для конкретной страницы
await revalidatePath(\`/products/\${slug}\`)

return Response.json({ revalidated: true })
}

// 4. EDGE CACHING с CDN
// Vercel / Cloudflare
export const config = {
runtime: 'edge' // Выполняется на edge серверах близко к пользователю
}

// 5. REDIS CACHING на сервере
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

async function getCachedProduct(id: string) {
// Проверяем кэш
const cached = await redis.get(\`product:\${id}\`)
if (cached) return JSON.parse(cached)

// Запрос к БД
const product = await db.product.findUnique({ where: { id } })

// Сохраняем в кэш на 10 минут
await redis.setex(\`product:\${id}\`, 600, JSON.stringify(product))

return product
}
`

const challengesSnippet = `
// Проблемы и решения при использовании SSR

// ═══════════════════════════════════════════════════════════
// ПРОБЛЕМА 1: Browser APIs недоступны на сервере
// ═══════════════════════════════════════════════════════════

// ❌ ПЛОХО
function BadComponent() {
// window, document, localStorage не существуют на сервере!
const width = window.innerWidth
const stored = localStorage.getItem('user')

return <div>Width: {width}</div>
}

// ✅ ХОРОШО
function GoodComponent() {
const [width, setWidth] = useState(0)

useEffect(() => {
// Выполняется ТОЛЬКО на клиенте
setWidth(window.innerWidth)

const handleResize = () => setWidth(window.innerWidth)
window.addEventListener('resize', handleResize)
return () => window.removeEventListener('resize', handleResize)
}, [])

return <div>Width: {width || 'Loading...'}</div>
}

// ═══════════════════════════════════════════════════════════
// ПРОБЛЕМА 2: Hydration Mismatch
// ═══════════════════════════════════════════════════════════

// ❌ ПЛОХО - разные данные на сервере и клиенте
function BadTimestamp() {
return <div>{new Date().toISOString()}</div>
}

// ✅ ХОРОШО - синхронизированные данные
function GoodTimestamp({ timestamp }) {
return <div>{timestamp}</div>
}

// Или используйте suppressHydrationWarning
function ClientOnlyTimestamp() {
return (
<div suppressHydrationWarning>
{typeof window !== 'undefined' && new Date().toISOString()}
</div>
)
}

// ═══════════════════════════════════════════════════════════
// ПРОБЛЕМА 3: Медленный TTFB из-за API запросов
// ═══════════════════════════════════════════════════════════

// ❌ ПЛОХО - последовательные запросы
async function SlowPage() {
const user = await fetchUser()        // 500ms
const posts = await fetchPosts()      // 700ms
const comments = await fetchComments() // 400ms
// Итого: 1600ms TTFB
}

// ✅ ХОРОШО - параллельные запросы
async function FastPage() {
const [user, posts, comments] = await Promise.all([
fetchUser(),
fetchPosts(),
fetchComments()
])
// Итого: 700ms TTFB (максимальный из запросов)
}

// ═══════════════════════════════════════════════════════════
// ПРОБЛЕМА 4: Стейт менеджмент (Redux, Zustand)
// ═══════════════════════════════════════════════════════════

// Необходимо синхронизировать store между сервером и клиентом

// Next.js + Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

export function makeStore(preloadedState) {
return configureStore({
reducer: rootReducer,
preloadedState // Данные с сервера
})
}

// Server Component
async function ServerPage() {
const data = await fetchData()

// Создаем store с данными
const store = makeStore({ user: data })

return (
<Provider store={store}>
<ClientPage />
</Provider>
)
}

// ═══════════════════════════════════════════════════════════
// ПРОБЛЕМА 5: Memory Leaks на сервере
// ═══════════════════════════════════════════════════════════

// ❌ ПЛОХО - таймеры не очищаются
function LeakyComponent() {
useEffect(() => {
const interval = setInterval(() => {
console.log('tick')
}, 1000)
// Забыли cleanup!
}, [])
}

// ✅ ХОРОШО - cleanup функция
function SafeComponent() {
useEffect(() => {
const interval = setInterval(() => {
console.log('tick')
}, 1000)

return () => clearInterval(interval)
}, [])
}
`

const streamingSnippet = `
// React 18+ Streaming SSR - прогрессивная гидратация

// Традиционный SSR: ждем ВСЕ данные перед отправкой HTML
async function traditionalSSR(req, res) {
const slowData = await fetchSlowData() // Ждем 5 секунд!
const html = renderToString(<App data={slowData} />)
res.send(html) // Отправляем только после 5 секунд
}

// ✅ Streaming SSR: отправляем HTML частями
import { renderToPipeableStream } from 'react-dom/server'

function streamingSSR(req, res) {
const { pipe } = renderToPipeableStream(
<App />,
{
// Отправляем shell сразу
onShellReady() {
res.setHeader('Content-Type', 'text/html')
pipe(res)
}
}
)
}

// Компонент с Suspense для отложенной загрузки
import { Suspense } from 'react'

function App() {
return (
<div>
<h1>My App</h1>

{/* Эта часть отправляется сразу */}
<Navigation />

{/* Эта часть стримится позже */}
<Suspense fallback={<Skeleton />}>
<SlowComponent />
</Suspense>

{/* И эта тоже */}
<Suspense fallback={<Skeleton />}>
<AnotherSlowComponent />
</Suspense>
</div>
)
}

// SlowComponent рендерится асинхронно
async function SlowComponent() {
const data = await fetchSlowData() // 5 секунд
return <div>{data}</div>
}

// Результат:
// 1. Браузер получает HTML с Navigation и Skeleton'ами СРАЗУ
// 2. Пользователь видит контент моментально
// 3. SlowComponent стримится по мере готовности
// 4. React автоматически заменяет Skeleton на готовый компонент
`

const highlightedCsrFlow = ref('')
const highlightedSsrFlow = ref('')
const highlightedNextjsExample = ref('')
const highlightedNuxtExample = ref('')
const highlightedHydration = ref('')
const highlightedSeoComparison = ref('')
const highlightedPerformance = ref('')
const highlightedCachingStrategy = ref('')
const highlightedChallenges = ref('')
const highlightedStreaming = ref('')

onMounted(() => {
highlightedCsrFlow.value = Prism.highlight(csrFlowSnippet, Prism.languages.javascript, 'javascript')
highlightedSsrFlow.value = Prism.highlight(ssrFlowSnippet, Prism.languages.markup, 'markup')
highlightedNextjsExample.value = Prism.highlight(nextjsExampleSnippet, Prism.languages.javascript, 'javascript')
highlightedNuxtExample.value = Prism.highlight(nuxtExampleSnippet, Prism.languages.javascript, 'javascript')
highlightedHydration.value = Prism.highlight(hydrationSnippet, Prism.languages.javascript, 'javascript')
highlightedSeoComparison.value = Prism.highlight(seoComparisonSnippet, Prism.languages.markup, 'markup')
highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
highlightedCachingStrategy.value = Prism.highlight(cachingStrategySnippet, Prism.languages.javascript, 'javascript')
highlightedChallenges.value = Prism.highlight(challengesSnippet, Prism.languages.javascript, 'javascript')
highlightedStreaming.value = Prism.highlight(streamingSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Server-Side Rendering (SSR): Полное руководство
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Server-Side Rendering (SSR)</b> — это техника рендеринга веб-приложений, при которой HTML генерируется
              на сервере для каждого запроса, а не в браузере пользователя. Браузер получает готовую HTML-страницу
              с контентом, которая затем "оживляется" (hydration) JavaScript для добавления интерактивности.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основной принцип: CSR vs SSR</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-laptop</v-icon>
                    <h3 class="text-h6 font-weight-bold">CSR (Client-Side)</h3>
                  </div>
                  <ol class="pl-4">
                    <li>Сервер → пустой HTML</li>
                    <li>Браузер → загрузка JS (500KB+)</li>
                    <li>JS → рендеринг компонентов</li>
                    <li>Запрос к API</li>
                    <li>Отображение контента</li>
                  </ol>
                  <v-chip class="mt-2" color="error" size="small">FCP: ~3-4s</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-server</v-icon>
                    <h3 class="text-h6 font-weight-bold">SSR (Server-Side)</h3>
                  </div>
                  <ol class="pl-4">
                    <li>Запрос к API на сервере</li>
                    <li>Рендеринг HTML с данными</li>
                    <li>Сервер → готовый HTML</li>
                    <li>Браузер → мгновенный контент</li>
                    <li>JS → гидратация (интерактивность)</li>
                  </ol>
                  <v-chip class="mt-2" color="success" size="small">FCP: ~0.8-1.2s</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">CSR — как это работает</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedCsrFlow"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">SSR — как это работает</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSsrFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества SSR над CSR</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="text-left pl-4">
                    <li>Быстрый <b>First Contentful Paint</b></li>
                    <li>Лучший <b>LCP</b> (Core Web Vital)</li>
                    <li>Контент виден мгновенно</li>
                    <li>Меньше нагрузки на клиента</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-magnify</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">SEO</h3>
                  <ul class="text-left pl-4">
                    <li>Поисковики видят полный контент</li>
                    <li>Мета-теги генерируются динамически</li>
                    <li>Open Graph для соцсетей</li>
                    <li>Структурированные данные</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-account-heart</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">UX</h3>
                  <ul class="text-left pl-4">
                    <li>Работает на медленных сетях</li>
                    <li>Доступно на слабых устройствах</li>
                    <li>Нет белого экрана загрузки</li>
                    <li>Лучше для мобильных</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры реализации</h2>

            <h3 class="text-h6 font-weight-bold mb-3">Next.js (React) - SSR и Server Components</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedNextjsExample"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Nuxt.js (Vue) - SSR</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNuxtExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Hydration — ключевая концепция SSR</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-water</v-icon>
              <strong>Hydration (гидратация)</strong> — процесс "оживления" статического HTML, при котором JavaScript
              прикрепляет обработчики событий и делает страницу интерактивной.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHydration"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">SEO: CSR vs SSR</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSeoComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на производительность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Стратегии кэширования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCachingStrategy"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы и решения при использовании SSR</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedChallenges"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">React 18+ Streaming SSR</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-rocket-launch</v-icon>
              <strong>Современный подход:</strong> Streaming SSR позволяет отправлять HTML по частям,
              не дожидаясь всех данных. Пользователь видит контент моментально!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStreaming"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">CSR</th>
                <th class="text-left font-weight-bold">SSR</th>
                <th class="text-left font-weight-bold">SSG</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>FCP (First Contentful Paint)</b></td>
                <td class="text-error">~3-4s</td>
                <td class="text-success">~0.8-1.2s</td>
                <td class="text-success">~0.5s</td>
              </tr>
              <tr>
                <td><b>SEO</b></td>
                <td class="text-warning">Ограниченное</td>
                <td class="text-success">Отличное</td>
                <td class="text-success">Отличное</td>
              </tr>
              <tr>
                <td><b>TTFB (Time to First Byte)</b></td>
                <td class="text-success">~200ms</td>
                <td class="text-warning">~500ms</td>
                <td class="text-success">~100ms</td>
              </tr>
              <tr>
                <td><b>Нагрузка на сервер</b></td>
                <td class="text-success">Низкая</td>
                <td class="text-error">Высокая</td>
                <td class="text-success">Низкая</td>
              </tr>
              <tr>
                <td><b>Динамический контент</b></td>
                <td class="text-success">Отлично</td>
                <td class="text-success">Отлично</td>
                <td class="text-error">Ограниченно</td>
              </tr>
              <tr>
                <td><b>Кэширование</b></td>
                <td class="text-success">Простое (CDN)</td>
                <td class="text-warning">Сложное</td>
                <td class="text-success">Простое (CDN)</td>
              </tr>
              <tr>
                <td><b>Стоимость хостинга</b></td>
                <td class="text-success">Низкая</td>
                <td class="text-error">Высокая</td>
                <td class="text-success">Низкая</td>
              </tr>
              <tr>
                <td><b>Интерактивность</b></td>
                <td class="text-success">Мгновенная</td>
                <td class="text-warning">После hydration</td>
                <td class="text-warning">После hydration</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать SSR?</h2>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ SSR подходит для:</h3>
                  <ul class="pl-4">
                    <li>E-commerce сайтов (SEO критично)</li>
                    <li>Блогов и новостных порталов</li>
                    <li>Landing pages</li>
                    <li>Маркетинговых сайтов</li>
                    <li>Контента для соцсетей (Open Graph)</li>
                    <li>Приложений для медленных сетей</li>
                    <li>Когда важен First Contentful Paint</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ CSR лучше для:</h3>
                  <ul class="pl-4">
                    <li>Интранет приложений (SEO не важно)</li>
                    <li>Админ панелей</li>
                    <li>Дашбордов с real-time данными</li>
                    <li>Приложений за авторизацией</li>
                    <li>Интерактивных SaaS продуктов</li>
                    <li>Когда нужна мгновенная интерактивность</li>
                    <li>Когда сервер ресурсы ограничены</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между SSR и SSG (Static Site Generation)?</p>
                <p class="font-weight-regular ma-0">
                  <b>SSR</b> генерирует HTML для каждого запроса в runtime. <b>SSG</b> генерирует HTML
                  в build time один раз. SSG быстрее и дешевле, но подходит только для статического контента.
                  SSR позволяет работать с динамическими данными.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое hydration mismatch и как его избежать?</p>
                <p class="font-weight-regular ma-0">
                  Hydration mismatch — когда HTML на сервере отличается от HTML на клиенте. Возникает при
                  использовании <code>Date.now()</code>, <code>Math.random()</code>, <code>window</code> и т.д.
                  Решение: использовать одинаковые данные или <code>suppressHydrationWarning</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как SSR влияет на Core Web Vitals?</p>
                <p class="font-weight-regular ma-0">
                  SSR значительно улучшает <b>LCP</b> (Largest Contentful Paint) и <b>FCP</b> (First Contentful Paint),
                  так как контент виден мгновенно. Однако <b>TTI</b> (Time to Interactive) может быть хуже
                  из-за гидратации. <b>CLS</b> (Cumulative Layout Shift) нужно контролировать.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли комбинировать SSR и CSR?</p>
                <p class="font-weight-regular ma-0">
                  Да! Это называется <b>гибридный рендеринг</b>. Критичный контент рендерится на сервере (SSR),
                  а интерактивные части загружаются динамически на клиенте (CSR). Next.js и Nuxt.js это поддерживают.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает ISR (Incremental Static Regeneration)?</p>
                <p class="font-weight-regular ma-0">
                  ISR — это компромисс между SSG и SSR. Страницы генерируются статически, но периодически
                  обновляются в фоне. Первый запрос получает старую версию, затем страница регенерируется.
                  Next.js: <code>revalidate: 60</code> — обновление каждые 60 секунд.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему TTFB в SSR выше, чем в CSR?</p>
                <p class="font-weight-regular ma-0">
                  Потому что сервер должен выполнить рендеринг и API запросы перед отправкой HTML.
                  В CSR сервер отдает пустой HTML мгновенно. Решение: кэширование, параллельные запросы,
                  streaming SSR, edge rendering.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Современные фреймворки с SSR</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Фреймворк</th>
                <th class="text-left font-weight-bold">Библиотека</th>
                <th class="text-left font-weight-bold">Особенности</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Next.js</b></td>
                <td>React</td>
                <td>SSR, SSG, ISR, Server Components, Streaming</td>
              </tr>
              <tr>
                <td><b>Nuxt.js</b></td>
                <td>Vue</td>
                <td>SSR, SSG, ISR, Auto imports, File-based routing</td>
              </tr>
              <tr>
                <td><b>SvelteKit</b></td>
                <td>Svelte</td>
                <td>SSR, SSG, Адаптеры для разных платформ</td>
              </tr>
              <tr>
                <td><b>Remix</b></td>
                <td>React</td>
                <td>Nested routing, Progressive enhancement</td>
              </tr>
              <tr>
                <td><b>Astro</b></td>
                <td>Агностик</td>
                <td>Partial hydration, Islands architecture</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Кэшировать результаты SSR</li>
                    <li>Использовать ISR для контента</li>
                    <li>Оптимизировать API запросы</li>
                    <li>Применять Streaming SSR</li>
                    <li>Мониторить TTFB</li>
                    <li>Использовать CDN/Edge</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Browser APIs на сервере</li>
                    <li>Разные данные сервер/клиент</li>
                    <li>Медленные API без кэша</li>
                    <li>Последовательные запросы</li>
                    <li>Memory leaks на сервере</li>
                    <li>Сложная логика в рендере</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте гибридный подход</li>
                    <li>Профилируйте SSR производительность</li>
                    <li>Тестируйте hydration</li>
                    <li>Настройте proper error boundaries</li>
                    <li>Изучите Server Components</li>
                    <li>Документируйте SSR особенности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>SSR (Server-Side Rendering)</b> — мощная техника, которая улучшает производительность,
              SEO и пользовательский опыт за счет генерации готового HTML на сервере. Современные фреймворки
              (Next.js, Nuxt.js) делают SSR доступным и эффективным. Ключевые концепции: <b>гидратация</b>,
              <b>streaming</b>, <b>ISR</b> и правильное <b>кэширование</b>. Выбор между CSR и SSR зависит
              от требований проекта: SEO, производительность, сложность инфраструктуры.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
                target="_blank"
                class="mr-2">
                Next.js SSR Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://nuxt.com/docs/guide/concepts/rendering"
                target="_blank"
                class="mr-2">
                Nuxt.js SSR Docs
              </v-btn>
              <v-btn
                color="info"
                size="small"
                variant="elevated"
                href="https://web.dev/rendering-on-the-web/"
                target="_blank">
                Web.dev: Rendering
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
