<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const useActionStateSnippet = `
// React 19: useActionState - управление состоянием форм
import { useActionState } from 'react'

function UpdateNameForm() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get('name')

      // Валидация
      if (!name || name.length < 3) {
        return 'Имя должно быть не менее 3 символов'
      }

      // Асинхронная отправка
      const response = await fetch('/api/update-name', {
        method: 'POST',
        body: JSON.stringify({ name })
      })

      if (!response.ok) {
        return 'Ошибка сервера'
      }

      return null // Успех
    },
    null // Начальное состояние ошибки
  )

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Сохранение...' : 'Сохранить'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

// До React 19 требовалось:
function OldWay() {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      const formData = new FormData(e.target)
      const name = formData.get('name')
      // ... остальная логика
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
`

const useOptimisticSnippet = `
// React 19: useOptimistic - оптимистичные обновления UI
import { useOptimistic } from 'react'

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  )

  async function createTodo(formData) {
    const title = formData.get('title')
    const tempId = Math.random()

    // Оптимистичное обновление - мгновенно
    addOptimisticTodo({ id: tempId, title, completed: false })

    // Реальный запрос
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ title })
      })
      const realTodo = await response.json()
      // React автоматически заменит оптимистичное обновление реальными данными
    } catch (error) {
      // При ошибке оптимистичное обновление откатится
      console.error('Failed to create todo')
    }
  }

  return (
    <div>
      <form action={createTodo}>
        <input name="title" />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.title}
            {todo.pending && ' (сохранение...)'}
          </li>
        ))}
      </ul>
    </div>
  )
}
`

const useHookSnippet = `
// React 19: use() - универсальный хук для промисов и контекста
import { use, Suspense } from 'react'

// 1. Использование с промисами
function UserProfile({ userPromise }) {
  // use() может читать промисы напрямую!
  const user = use(userPromise)

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

function App() {
  const userPromise = fetch('/api/user').then(r => r.json())

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  )
}

// 2. Условное использование (!) - нарушает правила хуков, но работает с use()
function ConditionalData({ shouldFetch }) {
  let data = null

  // use() можно вызывать условно!
  if (shouldFetch) {
    const dataPromise = fetch('/api/data').then(r => r.json())
    data = use(dataPromise)
  }

  return <div>{data ? data.value : 'Нет данных'}</div>
}

// 3. Использование с контекстом
const ThemeContext = React.createContext('light')

function ThemedButton() {
  // use() работает и с контекстом
  const theme = use(ThemeContext)

  return <button className={theme}>Кнопка</button>
}
`

const actionsSnippet = `
// React 19: Actions - автоматическое управление состоянием отправки
import { useState, useTransition } from 'react'

function SearchForm() {
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  // Action - функция, которая автоматически управляет pending состоянием
  async function searchAction(formData) {
    const query = formData.get('query')

    // React автоматически устанавливает isPending
    const response = await fetch(\`/api/search?q=\${query}\`)
    const data = await response.json()

    startTransition(() => {
      setResults(data)
    })
  }

  return (
    <>
      <form action={searchAction}>
        <input name="query" />
        <button type="submit">Искать</button>
      </form>

      {isPending && <div>Поиск...</div>}

      <ul>
        {results.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  )
}

// Пример с useActionState для более сложной логики
function CommentForm({ postId }) {
  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const comment = formData.get('comment')

      if (!comment.trim()) {
        return { error: 'Комментарий не может быть пустым' }
      }

      try {
        await fetch(\`/api/posts/\${postId}/comments\`, {
          method: 'POST',
          body: JSON.stringify({ comment })
        })

        return { success: true, error: null }
      } catch (error) {
        return { error: 'Не удалось отправить комментарий' }
      }
    },
    { error: null, success: false }
  )

  return (
    <form action={submitAction}>
      <textarea name="comment" />
      <button disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">Комментарий добавлен!</p>}
    </form>
  )
}
`

const refCallbackSnippet = `
// React 19: ref как cleanup функция
import { useRef, useEffect } from 'react'

// До React 19: useEffect для очистки
function OldVideoPlayer({ src }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play()

    return () => {
      video.pause()
    }
  }, [src])

  return <video ref={videoRef} src={src} />
}

// React 19: ref callback с cleanup
function NewVideoPlayer({ src }) {
  return (
    <video
      ref={(node) => {
        if (node) {
          node.play()

          // Возвращаем cleanup функцию!
          return () => {
            node.pause()
          }
        }
      }}
      src={src}
    />
  )
}

// Практический пример: IntersectionObserver
function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <img
      ref={(node) => {
        if (!node) return

        const observer = new IntersectionObserver(([entry]) => {
          setIsVisible(entry.isIntersecting)
        })

        observer.observe(node)

        // Cleanup вызовется автоматически при размонтировании
        return () => observer.disconnect()
      }}
      src={isVisible ? src : 'placeholder.jpg'}
      alt={alt}
    />
  )
}
`

const documentMetadataSnippet = `
// React 19: Встроенная поддержка метаданных документа
function BlogPost({ post }) {
  return (
    <article>
      {/* Метаданные теперь можно добавлять прямо в компоненте! */}
      <title>{post.title} - My Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:image" content={post.coverImage} />
      <link rel="canonical" href={\`https://myblog.com/posts/\${post.slug}\`} />

      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

// До React 19 требовались библиотеки типа react-helmet:
import { Helmet } from 'react-helmet'

function OldBlogPost({ post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}

// Приоритизация загрузки ресурсов
function ProductPage({ product }) {
  return (
    <div>
      {/* Критичные стили загружаются с высоким приоритетом */}
      <link
        rel="stylesheet"
        href="/critical.css"
        precedence="high"
      />

      {/* Некритичные стили - низкий приоритет */}
      <link
        rel="stylesheet"
        href="/animations.css"
        precedence="low"
      />

      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
    </div>
  )
}
`

const asyncScriptsSnippet = `
// React 19: Улучшенная поддержка скриптов
function AnalyticsWrapper({ children }) {
  return (
    <>
      {/* Асинхронная загрузка внешних скриптов */}
      <script async src="https://analytics.example.com/script.js" />

      {/* Встроенные скрипты */}
      <script>
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        \`}
      <\/script>

{children}
</>
)
}

// Скрипты дедуплицируются автоматически
function App() {
return (
<div>
{/* Этот скрипт загрузится только один раз, даже если используется дважды */}
<ComponentA />
<ComponentB />
</div>
)
}

function ComponentA() {
return (
<div>
<script src="https://example.com/library.js" />
<h1>Component A</h1>
</div>
)
}

function ComponentB() {
return (
<div>
{/* Тот же скрипт - не загрузится повторно */}
<script src="https://example.com/library.js" />
<h1>Component B</h1>
</div>
)
}
`

const stylesheetSupportSnippet = `
// React 19: Встроенная поддержка стилей с приоритетами
function Page() {
return (
<div>
{/* Критичные стили для первого рендера */}
<link
  rel="stylesheet"
  href="/critical.css"
  precedence="high"
// React дожидается загрузки перед рендером
/>

{/* Стили для интерактивности - средний приоритет */}
<link
  rel="stylesheet"
  href="/interactive.css"
  precedence="medium"
/>

{/* Декоративные стили - низкий приоритет */}
<link
  rel="stylesheet"
  href="/decorative.css"
  precedence="low"
/>

<h1>Контент страницы</h1>
</div>
)
}

// Условная загрузка стилей
function ThemedComponent({ theme }) {
return (
<div>
{theme === 'dark' && (
<link rel="stylesheet" href="/dark-theme.css" precedence="high" />
)}
{theme === 'light' && (
<link rel="stylesheet" href="/light-theme.css" precedence="high" />
)}

<div className="themed-content">
  Контент с темой
</div>
</div>
)
}
`

const preloadSnippet = `
// React 19: Preloading ресурсов
import { preload, preinit } from 'react-dom'

function App() {
// Preload - загружает ресурс, но не выполняет
preload('/fonts/main.woff2', { as: 'font', type: 'font/woff2' })

// Preinit - загружает И выполняет (для скриптов/стилей)
preinit('/critical.css', { as: 'style' })
preinit('/analytics.js', { as: 'script' })

return <div>Content</div>
}

// Условная предзагрузка при hover
function ProductCard({ product }) {
const handleMouseEnter = () => {
// Предзагружаем данные при наведении
preload(\`/api/products/\${product.id}\`, { as: 'fetch' })
}

return (
<div onMouseEnter={handleMouseEnter}>
<h3>{product.name}</h3>
<Link to={\`/products/\${product.id}\`}>Подробнее</Link>
</div>
)
}

// Предзагрузка маршрутов
function Navigation() {
return (
<nav>
<Link
  to="/dashboard"
  onMouseEnter={() => {
// Предзагружаем компонент маршрута
preload('/dashboard-bundle.js', { as: 'script' })
// И его данные
preload('/api/dashboard', { as: 'fetch' })
}}
>
Dashboard
</Link>
</nav>
)
}
`

const serverComponentsSnippet = `
// React 19: Server Components (стабильные)
// app/ProductList.server.js

import { db } from './database'

// Server Component - выполняется ТОЛЬКО на сервере
export default async function ProductList() {
// Прямой доступ к базе данных
const products = await db.query('SELECT * FROM products')

// Чтение файловой системы
const config = await fs.readFile('./config.json', 'utf-8')

return (
<div>
<h1>Продукты</h1>
{products.map(product => (
<ProductCard key={product.id} product={product} />
))}
</div>
)
}

// Client Component - для интерактивности
'use client'

function ProductCard({ product }) {
const [liked, setLiked] = useState(false)

return (
<div>
<h3>{product.name}</h3>
<p>{product.price}</p>
<button onClick={() => setLiked(!liked)}>
{liked ? '❤️' : '🤍'}
</button>
</div>
)
}

// Композиция Server и Client компонентов
export default async function Page() {
return (
<>
{/* Server Component - данные на сервере */}
<ProductList />

{/* Client Component - интерактивность */}
<ShoppingCart />
</>
)
}
`

const serverActionsSnippet = `
// React 19: Server Actions
'use server'

// Серверная функция - выполняется на сервере
export async function createTodo(formData) {
const title = formData.get('title')

// Валидация на сервере
if (!title || title.length < 3) {
return { error: 'Заголовок слишком короткий' }
}

// Прямая работа с базой данных
await db.todos.create({
title,
completed: false,
userId: auth.getCurrentUser().id
})

revalidatePath('/todos') // Обновить кэш

return { success: true }
}

// Client Component использует Server Action
'use client'

function TodoForm() {
const [state, formAction] = useActionState(createTodo, null)

return (
<form action={formAction}>
<input name="title" required />
<button type="submit">Добавить</button>
{state?.error && <p className="error">{state.error}</p>}
</form>
)
}

// Прогрессивное улучшение - работает БЕЗ JavaScript!
export default function TodoPage() {
return (
<div>
<h1>Todo List</h1>
<TodoForm />
</div>
)
}
`

const migrationGuideSnippet = `
// Миграция с React 18 на React 19

// 1. Обновление зависимостей
// package.json
{
"dependencies": {
"react": "^19.0.0",
"react-dom": "^19.0.0"
}
}

// 2. Удаление устаревших API
// ❌ Удалить:
import { render } from 'react-dom'
render(<App />, document.getElementById('root'))

// ✅ Использовать:
import { createRoot } from 'react-dom/client'
const root = createRoot(document.getElementById('root'))
root.render(<App />)

// 3. Замена react-helmet
// ❌ Старый способ:
import { Helmet } from 'react-helmet'

function Page() {
return (
<>
<Helmet>
<title>My Page</title>
</Helmet>
<div>Content</div>
</>
)
}

// ✅ Новый способ:
function Page() {
return (
<>
<title>My Page</title>
<div>Content</div>
</>
)
}

// 4. Упрощение форм
// ❌ Старый способ:
function Form() {
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const handleSubmit = async (e) => {
e.preventDefault()
setLoading(true)
try {
// submit logic
} catch (err) {
setError(err)
} finally {
setLoading(false)
}
}

return <form onSubmit={handleSubmit}>...</form>
}

// ✅ Новый способ:
function Form() {
const [error, submitAction, isPending] = useActionState(
async (_, formData) => {
// submit logic
},
null
)

return <form action={submitAction}>...</form>
}
`

const highlightedUseActionState = ref('')
const highlightedUseOptimistic = ref('')
const highlightedUse = ref('')
const highlightedActions = ref('')
const highlightedRefCallback = ref('')
const highlightedDocumentMetadata = ref('')
const highlightedAsyncScripts = ref('')
const highlightedStylesheetSupport = ref('')
const highlightedPreload = ref('')
const highlightedServerComponents = ref('')
const highlightedServerActions = ref('')
const highlightedMigrationGuide = ref('')

onMounted(() => {
highlightedUseActionState.value = Prism.highlight(useActionStateSnippet, Prism.languages.jsx, 'jsx')
highlightedUseOptimistic.value = Prism.highlight(useOptimisticSnippet, Prism.languages.jsx, 'jsx')
highlightedUse.value = Prism.highlight(useHookSnippet, Prism.languages.jsx, 'jsx')
highlightedActions.value = Prism.highlight(actionsSnippet, Prism.languages.jsx, 'jsx')
highlightedRefCallback.value = Prism.highlight(refCallbackSnippet, Prism.languages.jsx, 'jsx')
highlightedDocumentMetadata.value = Prism.highlight(documentMetadataSnippet, Prism.languages.jsx, 'jsx')
highlightedAsyncScripts.value = Prism.highlight(asyncScriptsSnippet, Prism.languages.jsx, 'jsx')
highlightedStylesheetSupport.value = Prism.highlight(stylesheetSupportSnippet, Prism.languages.jsx, 'jsx')
highlightedPreload.value = Prism.highlight(preloadSnippet, Prism.languages.jsx, 'jsx')
highlightedServerComponents.value = Prism.highlight(serverComponentsSnippet, Prism.languages.jsx, 'jsx')
highlightedServerActions.value = Prism.highlight(serverActionsSnippet, Prism.languages.jsx, 'jsx')
highlightedMigrationGuide.value = Prism.highlight(migrationGuideSnippet, Prism.languages.jsx, 'jsx')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              React 19: Новые возможности и изменения
            </h1>

            <p class="font-weight-regular mb-6">
              <b>React 19</b> — крупное обновление, которое упрощает работу с формами, асинхронными операциями,
              метаданными документа и вводит стабильную поддержку React Server Components. Основной фокус —
              на улучшении developer experience и производительности без breaking changes.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Главные нововведения</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-form-select</v-icon>
                    <h3 class="text-h6 font-weight-bold">Actions & Forms</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>useActionState</code> — управление формами</li>
                    <li><code>useOptimistic</code> — оптимистичные обновления</li>
                    <li><code>action</code> пропс для форм</li>
                    <li>Автоматический pending state</li>
                    <li>Встроенная обработка ошибок</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-hook</v-icon>
                    <h3 class="text-h6 font-weight-bold">Новые хуки</h3>
                  </div>
                  <ul class="pl-4">
                    <li><code>use()</code> — чтение промисов и контекста</li>
                    <li>Условное использование хуков</li>
                    <li>Упрощенная работа с async данными</li>
                    <li>Ref callbacks с cleanup</li>
                    <li>Улучшенная типизация</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-file-document</v-icon>
                    <h3 class="text-h6 font-weight-bold">Document Metadata</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Встроенная поддержка <code>&lt;title&gt;</code></li>
                    <li>Meta теги в компонентах</li>
                    <li>Приоритизация ресурсов</li>
                    <li>Замена react-helmet</li>
                    <li>SSR-friendly</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-server</v-icon>
                    <h3 class="text-h6 font-weight-bold">Server Components</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Стабильная поддержка RSC</li>
                    <li>Server Actions</li>
                    <li>Прямой доступ к БД</li>
                    <li>Zero-bundle размер</li>
                    <li>SEO оптимизация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. useActionState — управление формами</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Основное улучшение:</strong> Автоматическое управление состоянием формы без useState и useEffect
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseActionState"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. useOptimistic — оптимистичные обновления</h2>
            <p class="font-weight-regular mb-4">
              Мгновенное обновление UI при отправке данных, автоматический откат при ошибке:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseOptimistic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. use() — универсальный хук</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Революционно:</strong> <code>use()</code> можно вызывать условно, нарушая правила хуков!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUse"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Actions — автоматическое управление состоянием</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedActions"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Ref callbacks с cleanup функцией</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Упрощение:</strong> Теперь не нужен useEffect для cleanup при работе с DOM
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRefCallback"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Встроенная поддержка метаданных</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDocumentMetadata"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Улучшенная поддержка скриптов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAsyncScripts"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Приоритизация стилей</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStylesheetSupport"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Preloading ресурсов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPreload"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Server Components (стабильные)</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedServerComponents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">11. Server Actions</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedServerActions"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Миграция с React 18 на React 19</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMigrationGuide"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение: React 18 vs React 19</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Функция</th>
                <th class="text-left font-weight-bold">React 18</th>
                <th class="text-left font-weight-bold">React 19</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Формы</b></td>
                <td>useState + useEffect + onSubmit</td>
                <td>useActionState + action prop</td>
              </tr>
              <tr>
                <td><b>Async данные</b></td>
                <td>useEffect + fetch + loading state</td>
                <td>use(promise) + Suspense</td>
              </tr>
              <tr>
                <td><b>Оптимистичные обновления</b></td>
                <td>Ручное управление состоянием</td>
                <td>useOptimistic</td>
              </tr>
              <tr>
                <td><b>Метаданные</b></td>
                <td>react-helmet / next/head</td>
                <td>Встроенная поддержка</td>
              </tr>
              <tr>
                <td><b>Ref cleanup</b></td>
                <td>useEffect для cleanup</td>
                <td>Ref callback с return</td>
              </tr>
              <tr>
                <td><b>Server Components</b></td>
                <td>Экспериментальные</td>
                <td>Стабильные</td>
              </tr>
              <tr>
                <td><b>Условные хуки</b></td>
                <td>Запрещены</td>
                <td>use() позволяет</td>
              </tr>
              <tr>
                <td><b>Preloading</b></td>
                <td>Вручную через link rel="preload"</td>
                <td>preload() и preinit() API</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное преимущество useActionState над useState?</p>
                <p class="font-weight-regular ma-0">
                  <code>useActionState</code> автоматически управляет pending состоянием, обработкой ошибок
                  и интегрируется с формами через <code>action</code> проп. Не нужно вручную управлять
                  loading/error состояниями и вызовами preventDefault.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как use() может нарушать правила хуков?</p>
                <p class="font-weight-regular ma-0">
                  <code>use()</code> можно вызывать условно (в if, циклах), в отличие от других хуков.
                  Это возможно потому, что <code>use()</code> не хранит состояние между рендерами —
                  он просто читает промис или контекст в момент вызова.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать useOptimistic?</p>
                <p class="font-weight-regular ma-0">
                  Для мгновенного UI-отклика при операциях, которые с большой вероятностью успешны
                  (лайки, добавление в корзину, простые CRUD). React автоматически откатит
                  оптимистичное обновление при ошибке.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Заменяет ли React 19 react-helmet полностью?</p>
                <p class="font-weight-regular ma-0">
                  Да, для базовых случаев. React 19 поддерживает <code>&lt;title&gt;</code>,
                  <code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code> прямо в компонентах.
                  Но для сложной логики (например, вложенных роутов с приоритетами) могут
                  потребоваться дополнительные решения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между preload() и preinit()?</p>
                <p class="font-weight-regular ma-0">
                  <code>preload()</code> только загружает ресурс (шрифты, изображения).
                  <code>preinit()</code> загружает И выполняет/применяет (скрипты, стили).
                  Используйте <code>preinit</code> для критичных ресурсов, которые нужны сразу.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Server Actions и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Server Actions — это функции, помеченные <code>'use server'</code>, которые выполняются
                  на сервере. Позволяют напрямую работать с БД, файловой системой из компонентов,
                  обеспечивая безопасность и уменьшая bundle size клиента.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Обратно совместим ли React 19 с React 18?</p>
                <p class="font-weight-regular ma-0">
                  Почти полностью. Удалены устаревшие API (legacy context, string refs), но основной
                  код работает без изменений. Миграция в основном заключается в замене устаревших
                  паттернов на новые, более удобные.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Breaking Changes в React 19</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ Удалено</h3>
                  <ul class="text-white pl-4">
                    <li>Legacy Context API</li>
                    <li>String refs (<code>ref="myRef"</code>)</li>
                    <li>Module pattern factories</li>
                    <li>createFactory</li>
                    <li>defaultProps для function компонентов</li>
                    <li>PropTypes (перенесены в отдельный пакет)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Альтернативы</h3>
                  <ul class="text-white pl-4">
                    <li>Context API (новый)</li>
                    <li>useRef() + callback refs</li>
                    <li>Function components</li>
                    <li>JSX transform</li>
                    <li>Default параметры ES6</li>
                    <li>TypeScript / JSDoc</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики React 19</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать useActionState для форм</li>
                    <li>use() вместо useEffect для async</li>
                    <li>useOptimistic для UX</li>
                    <li>Server Components где возможно</li>
                    <li>Встроенные метаданные вместо helmet</li>
                    <li>preload() для критичных ресурсов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>String refs</li>
                    <li>Legacy Context</li>
                    <li>defaultProps в функциях</li>
                    <li>Избыточный useState для форм</li>
                    <li>useEffect для fetch без причины</li>
                    <li>react-helmet (заменен)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Постепенная миграция</li>
                    <li>Читайте changelog</li>
                    <li>Обновите TypeScript типы</li>
                    <li>Тестируйте Server Components</li>
                    <li>Изучайте новые паттерны</li>
                    <li>Следите за performance</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность в React 19</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Оптимизация</th>
                <th class="text-left font-weight-bold">Механизм</th>
                <th class="text-left font-weight-bold">Выгода</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Server Components</b></td>
                <td>Zero-bundle JS на клиенте</td>
                <td>Меньше JavaScript, быстрее загрузка</td>
              </tr>
              <tr>
                <td><b>Automatic Batching</b></td>
                <td>Группировка обновлений</td>
                <td>Меньше рендеров</td>
              </tr>
              <tr>
                <td><b>Приоритизация ресурсов</b></td>
                <td>precedence атрибут</td>
                <td>Критичные стили загружаются первыми</td>
              </tr>
              <tr>
                <td><b>Preloading</b></td>
                <td>preload() / preinit()</td>
                <td>Параллельная загрузка ресурсов</td>
              </tr>
              <tr>
                <td><b>Оптимистичные обновления</b></td>
                <td>useOptimistic</td>
                <td>Мгновенный UI отклик</td>
              </tr>
              <tr>
                <td><b>Дедупликация скриптов</b></td>
                <td>Автоматическая</td>
                <td>Нет повторных загрузок</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>React 19</b> значительно упрощает разработку благодаря новым хукам (<code>useActionState</code>,
              <code>useOptimistic</code>, <code>use</code>), встроенной поддержке метаданных, стабильным
              Server Components и улучшенной работе с формами. Миграция с React 18 обычно простая,
              основные изменения касаются удаления устаревших API. Новые возможности делают код чище,
              производительность выше, а developer experience лучше.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/blog/2024/04/25/react-19"
                target="_blank"
                class="mr-2">
                React 19 Blog
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://react.dev/blog/2024/04/25/react-19-upgrade-guide"
                target="_blank">
                Upgrade Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
