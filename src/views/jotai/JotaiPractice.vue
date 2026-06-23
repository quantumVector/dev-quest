<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-tsx.js'

const snippetCounter = `
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}
`

const snippetDerived = `
import { atom } from 'jotai'

const priceAtom = atom(100)
const quantityAtom = atom(2)

const totalAtom = atom((get) => {
  return get(priceAtom) * get(quantityAtom)
})
`

const snippetCart = `
import { atom } from 'jotai'

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
}

const cartAtom = atom<CartItem[]>([])

const totalPriceAtom = atom((get) =>
  get(cartAtom).reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
)

const totalCountAtom = atom((get) =>
  get(cartAtom).reduce((sum, item) => sum + item.quantity, 0)
)
`

const snippetWritable = `
const addToCartAtom = atom(
  null,
  (get, set, product: { id: string; title: string; price: number }) => {
    const cart = get(cartAtom)
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      set(
        cartAtom,
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
      return
    }

    set(cartAtom, [...cart, { ...product, quantity: 1 }])
  }
)
`

const snippetStorage = `
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'

const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light')

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme}
    </button>
  )
}
`

const snippetAsync = `
import { Suspense } from 'react'
import { atom, useAtom } from 'jotai'

const userIdAtom = atom(1)

const userAtom = atom(async (get) => {
  const userId = get(userIdAtom)
  const response = await fetch(\`/api/users/\${userId}\`)

  if (!response.ok) {
    throw new Error('Failed to load user')
  }

  return response.json()
})

function UserProfile() {
  const [user] = useAtom(userAtom)

  return <div>{user.name}</div>
}

export function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserProfile />
    </Suspense>
  )
}
`

const snippetShop = `
import { Suspense } from 'react'
import {
  atom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type Product = {
  id: string
  title: string
  price: number
}

type CartItem = Product & {
  quantity: number
}

const searchAtom = atom('')
const cartAtom = atom<CartItem[]>([])
const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light')

const productsAtom = atom(async () => {
  const response = await fetch('/api/products')

  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json() as Promise<Product[]>
})

const filteredProductsAtom = atom(async (get) => {
  const products = await get(productsAtom)
  const search = get(searchAtom).toLowerCase()

  return products.filter((product) =>
    product.title.toLowerCase().includes(search)
  )
})

const totalPriceAtom = atom((get) =>
  get(cartAtom).reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const totalCountAtom = atom((get) =>
  get(cartAtom).reduce((sum, item) => sum + item.quantity, 0)
)

const addToCartAtom = atom(null, (get, set, product: Product) => {
  const cart = get(cartAtom)
  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    set(
      cartAtom,
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
    return
  }

  set(cartAtom, [...cart, { ...product, quantity: 1 }])
})

function SearchBox() {
  const [search, setSearch] = useAtom(searchAtom)

  return (
    <input
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search products"
    />
  )
}

function ProductList() {
  const products = useAtomValue(filteredProductsAtom)
  const addToCart = useSetAtom(addToCartAtom)

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.title} — {product.price}
          <button onClick={() => addToCart(product)}>Add</button>
        </li>
      ))}
    </ul>
  )
}

function CartSummary() {
  const totalCount = useAtomValue(totalCountAtom)
  const totalPrice = useAtomValue(totalPriceAtom)

  return (
    <p>
      Cart: {totalCount} items, total: {totalPrice}
    </p>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  )
}

export function MiniShop() {
  return (
    <>
      <ThemeToggle />
      <SearchBox />
      <CartSummary />

      <Suspense fallback={<p>Loading products...</p>}>
        <ProductList />
      </Suspense>
    </>
  )
}
`

const snippets = {
  counter: ref(''),
  derived: ref(''),
  cart: ref(''),
  writable: ref(''),
  storage: ref(''),
  async: ref(''),
  shop: ref(''),
}

onMounted(() => {
  const lang = Prism.languages.tsx
  snippets.counter.value = Prism.highlight(snippetCounter, lang, 'tsx')
  snippets.derived.value = Prism.highlight(snippetDerived, lang, 'tsx')
  snippets.cart.value = Prism.highlight(snippetCart, lang, 'tsx')
  snippets.writable.value = Prism.highlight(snippetWritable, lang, 'tsx')
  snippets.storage.value = Prism.highlight(snippetStorage, lang, 'tsx')
  snippets.async.value = Prism.highlight(snippetAsync, lang, 'tsx')
  snippets.shop.value = Prism.highlight(snippetShop, lang, 'tsx')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-4">
              Jotai на практике: атомы, derived state и async-состояние без Redux-шаблонов
            </h1>

            <p class="mb-4">
              Jotai часто воспринимают как "ещё один глобальный стор", но это не самая точная модель.
              В Redux обычно думают о едином store, actions, reducers и централизованном потоке
              изменений. В Jotai базовая единица — <b>atom</b>: маленький независимый кусочек состояния
              или вычисления. Приложение получается не одним большим объектом, а графом атомов.
            </p>

            <v-card class="pa-4 mb-8" color="blue-grey-lighten-5">
              <p class="mb-0">
                Главная мысль: Jotai не про "положить всё в глобальный стор", а про маленькие
                независимые атомы, из которых собирается состояние приложения.
              </p>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Зачем нужен Jotai</h2>
            <p class="mb-3">
              <code>useState</code> прекрасен для локального состояния: открыт ли dropdown, что введено
              в input, какой tab выбран внутри компонента. Проблема начинается, когда это состояние нужно
              нескольким удалённым компонентам. Его приходится поднимать выше, прокидывать props или
              создавать Context.
            </p>
            <p class="mb-3">
              Context решает проблему доступа, но часто приводит к разрастанию провайдеров и лишним
              перерендерам, если в один context сложили много разных значений. Redux Toolkit даёт строгую
              архитектуру, devtools и предсказуемость, но для небольшого и среднего UI-состояния иногда
              ощущается тяжеловесно.
            </p>
            <p class="mb-6">
              Jotai хорош там, где состояние хочется разбить на независимые кусочки и собирать из них
              производные значения: фильтры, корзина, тема, модалки, настройки, selected ids, локальные
              draft-данные. Компонент подписывается только на те атомы, которые читает, поэтому обновления
              получаются точечными.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Первый atom: глобальный useState</h2>
            <p class="mb-3">
              Самый простой atom похож на <code>useState</code>, вынесенный из компонента. Важно:
              <code>atom(0)</code> описывает единицу состояния, а значение хранится в Jotai store во
              время работы приложения.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.counter.value"></code></pre>
            <p class="mb-8">
              <code>useAtom(countAtom)</code> возвращает пару <code>[value, setter]</code>. Тот же atom
              можно использовать в разных компонентах, и они будут видеть одно и то же состояние внутри
              одного store. Это удобно, но если остановиться только на таком использовании, Jotai и правда
              будет казаться просто "глобальным useState". Самое интересное начинается с derived atoms.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Derived atoms: состояние из состояния</h2>
            <p class="mb-3">
              Derived atom не обязан хранить своё значение отдельно. Он может вычисляться из других
              атомов через функцию <code>get</code>. Если зависимость меняется, производный atom
              пересчитывается, а подписанные компоненты получают новое значение.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.derived.value"></code></pre>
            <p class="mb-3">
              В этом примере <code>totalAtom</code> не хранит отдельное число, которое нужно вручную
              синхронизировать. Он читает <code>priceAtom</code> и <code>quantityAtom</code>. Это снижает
              риск рассинхронизации: нет отдельного reducer case "обновить total".
            </p>
            <p class="mb-3">
              Практичный пример — корзина. Список товаров хранится в одном atom, а итоговая сумма и
              количество считаются из него.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.cart.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Writable derived atom: бизнес-операции внутри atom</h2>
            <p class="mb-3">
              Atom может быть не только read-only. У него может быть write-функция:
              <code>atom(read, write)</code>. Это удобно для бизнес-операций: компонент не обязан знать,
              как именно обновлять корзину, искать существующий товар и увеличивать quantity.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.writable.value"></code></pre>
            <p class="mb-8">
              Такой atom не хранит UI сам по себе. Он описывает действие над графом состояния. Компонент
              вызывает setter, передаёт product, а детали обновления остаются рядом с атомами корзины.
              Это похоже на маленький command API без actions/reducers/dispatch-шаблона.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Persisted state через atomWithStorage</h2>
            <p class="mb-3">
              Для пользовательских настроек часто нужно пережить перезагрузку страницы: тема, язык,
              плотность таблицы, скрытые подсказки. Для этого в <code>jotai/utils</code> есть
              <code>atomWithStorage</code>.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.storage.value"></code></pre>
            <p class="mb-8">
              Важная осторожность с SSR: <code>localStorage</code> существует только в браузере. На
              сервере его нет, поэтому initial render может использовать дефолтное значение, а клиент
              после маунта прочитает сохранённое. Для тем и визуальных настроек нужно заранее подумать,
              как избежать мигания интерфейса или mismatch.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Async atoms: загрузка данных</h2>
            <p class="mb-3">
              Atom может вернуть promise. Тогда Jotai умеет работать с async-состоянием через React
              Suspense. Это удобно для небольших запросов, завязанных на UI-состояние: например, выбранный
              userId определяет, какого пользователя загрузить.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.async.value"></code></pre>
            <p class="mb-8">
              Если <code>userIdAtom</code> изменится, <code>userAtom</code> снова выполнит async-read.
              Ошибки из async atom должны обрабатываться Error Boundary. Для полноценного серверного
              состояния с кешированием, retry, invalidation, pagination и background refetch чаще лучше
              использовать TanStack Query, а Jotai оставить для UI-состояния и композиции.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Сквозной пример: мини-магазин</h2>
            <p class="mb-3">
              В одном небольшом примере видно почти всё: <code>cartAtom</code> хранит корзину,
              <code>totalPriceAtom</code> и <code>totalCountAtom</code> считаются из неё,
              <code>addToCartAtom</code> инкапсулирует операцию добавления, <code>themeAtom</code>
              сохраняется в storage, <code>productsAtom</code> загружает товары, а
              <code>filteredProductsAtom</code> соединяет async-данные и поиск.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.shop.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда Jotai подходит, а когда нет</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Хорошо подходит</th>
                <th class="text-left font-weight-bold">Не всегда лучший выбор</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Shared UI state: фильтры, тема, модалки, корзина</td>
                <td class="pt-2 pb-2">Строгая event-driven архитектура с audit log всех действий</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Derived state, который хочется считать из маленьких частей</td>
                <td class="pt-2 pb-2">Команда уже эффективно работает на Redux Toolkit</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Небольшие и средние приложения без лишнего boilerplate</td>
                <td class="pt-2 pb-2">Сложное серверное состояние, где лучше TanStack Query</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Точечные подписки компонентов на независимые атомы</td>
                <td class="pt-2 pb-2">Требование держать все изменения в одном централизованном reducer</td>
              </tr>
              </tbody>
            </v-table>

            <v-card class="pa-6 mb-6" color="blue-grey-lighten-5">
              <h2 class="text-h6 font-weight-bold mb-3">Итог</h2>
              <p class="mb-0">
                Jotai стоит понимать как граф атомов. Одни атомы хранят значения, другие вычисляются из
                них, третьи описывают операции записи, четвёртые читают async-данные. В результате
                состояние приложения можно собирать из маленьких независимых частей и обновлять именно
                тот участок UI, который зависит от изменившегося atom.
              </p>
            </v-card>
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
:deep(.token.comment) { color: #6272a4; }
:deep(.token.string) { color: #f1fa8c; }
:deep(.token.keyword) { color: #ff79c6; }
:deep(.token.function) { color: #50fa7b; }
:deep(.token.number) { color: #bd93f9; }
:deep(.token.operator) { color: #ff79c6; }
:deep(.token.punctuation) { color: #f8f8f2; }
:deep(.token.property) { color: #66d9ef; }
:deep(.token.tag) { color: #ff79c6; }
:deep(.token.attr-name) { color: #50fa7b; }
:deep(.token.attr-value) { color: #f1fa8c; }
</style>
