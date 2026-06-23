<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-tsx.js'

const snippetStoreProvider = `
import { atom, createStore, Provider, useAtom } from 'jotai'

const countAtom = atom(0)

const firstStore = createStore()
const secondStore = createStore()

firstStore.set(countAtom, 10)
secondStore.set(countAtom, 100)

function Counter() {
  const [count, setCount] = useAtom(countAtom)

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  )
}

export function Page() {
  return (
    <>
      <Provider store={firstStore}>
        <Counter />
      </Provider>

      <Provider store={secondStore}>
        <Counter />
      </Provider>
    </>
  )
}
`

const snippetOutsideReact = `
import { atom, createStore } from 'jotai'

const countAtom = atom(0)
const store = createStore()

store.set(countAtom, 5)

const count = store.get(countAtom)

const unsubscribe = store.sub(countAtom, () => {
  console.log('Count changed:', store.get(countAtom))
})

unsubscribe()
`

const snippetWritable = `
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set, incrementBy: number) => {
    set(countAtom, get(countAtom) + incrementBy)
  }
)

function Counter() {
  const [count, increment] = useAtom(incrementAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => increment(1)}>+1</button>
      <button onClick={() => increment(5)}>+5</button>
    </div>
  )
}
`

const snippetAsync = `
import { atom, useAtomValue, useSetAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { api } from '@/shared/api'

const refreshVersionAtom = atom(0)

const todosAtom = atom(async (get) => {
  get(refreshVersionAtom)
  return api.getTodos()
})

const loadableTodosAtom = loadable(todosAtom)

const refreshTodosAtom = atom(null, (get, set) => {
  set(refreshVersionAtom, get(refreshVersionAtom) + 1)
})

function Todos() {
  const todosState = useAtomValue(loadableTodosAtom)
  const refresh = useSetAtom(refreshTodosAtom)

  if (todosState.state === 'loading') {
    return <p>Loading...</p>
  }

  if (todosState.state === 'hasError') {
    return <button onClick={refresh}>Retry</button>
  }

  return (
    <>
      <button onClick={refresh}>Refresh</button>
      <ul>
        {todosState.data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}
`

const snippetQuery = `
import { atomWithQuery } from 'jotai-tanstack-query'
import { useAtom } from 'jotai'
import { api } from '@/shared/api'

const todosAtom = atomWithQuery(() => ({
  queryKey: ['todos'],
  queryFn: api.getTodos,
}))

function Todos() {
  const [{ data, isPending, isError }] = useAtom(todosAtom)

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Failed to load todos</p>

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
`

const snippetSSR = `
import { atom, useAtomValue } from 'jotai'
import { useHydrateAtoms } from 'jotai/react/utils'
import type { GetServerSidePropsContext } from 'next'

type User = {
  name: string
}

const userAtom = atom<User | null>(null)
const themeAtom = atom<'light' | 'dark'>('light')

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUserFromRequest(context.req)
  const theme = context.req.cookies.theme === 'dark' ? 'dark' : 'light'

  return {
    props: {
      initialData: { user, theme },
    },
  }
}

function HydratePageAtoms({
  initialData,
  children,
}: {
  initialData: { user: User; theme: 'light' | 'dark' }
  children: React.ReactNode
}) {
  useHydrateAtoms([
    [userAtom, initialData.user],
    [themeAtom, initialData.theme],
  ])

  return children
}

function Profile() {
  const user = useAtomValue(userAtom)
  const theme = useAtomValue(themeAtom)

  return <p data-theme={theme}>Hello, {user?.name}</p>
}
`

const snippetUI = `
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

const selectedUserIdAtom = atom<string | null>(null)
const isUserModalOpenAtom = atom((get) => get(selectedUserIdAtom) !== null)

const closeUserModalAtom = atom(null, (get, set) => {
  set(selectedUserIdAtom, null)
})

function UserRow({ id, name }: { id: string; name: string }) {
  const setSelectedUserId = useSetAtom(selectedUserIdAtom)

  return <button onClick={() => setSelectedUserId(id)}>{name}</button>
}

function UserModal() {
  const isOpen = useAtomValue(isUserModalOpenAtom)
  const [selectedUserId] = useAtom(selectedUserIdAtom)
  const close = useSetAtom(closeUserModalAtom)

  if (!isOpen) return null

  return (
    <dialog open>
      <p>User id: {selectedUserId}</p>
      <button onClick={close}>Close</button>
    </dialog>
  )
}
`

const snippetUtils = `
import { atom } from 'jotai'
import {
  atomFamily,
  atomWithReset,
  atomWithStorage,
  RESET,
  useResetAtom,
} from 'jotai/utils'

const themeAtom = atomWithStorage<'light' | 'dark'>('theme-key', 'light')

const dollarsAtom = atomWithReset(0)

const centsAtom = atom(
  (get) => get(dollarsAtom) * 100,
  (get, set, newValue: number | typeof RESET) => {
    set(dollarsAtom, newValue === RESET ? newValue : newValue / 100)
  }
)

const todoDraftAtomFamily = atomFamily((todoId: string) =>
  atom({
    id: todoId,
    title: '',
    isDirty: false,
  })
)

function ResetCentsButton() {
  const resetCents = useResetAtom(centsAtom)

  return <button onClick={resetCents}>Reset cents</button>
}
`

const snippetTesting = `
import { atom, createStore } from 'jotai'

const countAtom = atom(0)

const incrementAtom = atom(null, (get, set, by: number) => {
  set(countAtom, get(countAtom) + by)
})

test('increments count', () => {
  const store = createStore()

  store.set(incrementAtom, 5)

  expect(store.get(countAtom)).toBe(5)
})
`

const snippets = {
  storeProvider: ref(''),
  outsideReact: ref(''),
  writable: ref(''),
  async: ref(''),
  query: ref(''),
  ssr: ref(''),
  ui: ref(''),
  utils: ref(''),
  testing: ref(''),
}

onMounted(() => {
  const lang = Prism.languages.tsx
  snippets.storeProvider.value = Prism.highlight(snippetStoreProvider, lang, 'tsx')
  snippets.outsideReact.value = Prism.highlight(snippetOutsideReact, lang, 'tsx')
  snippets.writable.value = Prism.highlight(snippetWritable, lang, 'tsx')
  snippets.async.value = Prism.highlight(snippetAsync, lang, 'tsx')
  snippets.query.value = Prism.highlight(snippetQuery, lang, 'tsx')
  snippets.ssr.value = Prism.highlight(snippetSSR, lang, 'tsx')
  snippets.ui.value = Prism.highlight(snippetUI, lang, 'tsx')
  snippets.utils.value = Prism.highlight(snippetUtils, lang, 'tsx')
  snippets.testing.value = Prism.highlight(snippetTesting, lang, 'tsx')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-4">
              Jotai: книга рецептов для реального приложения
            </h1>

            <p class="mb-4">
              В предыдущей статье Jotai был разобран через базовую идею: приложение как граф маленьких
              атомов. Теперь посмотрим на практические рецепты: изоляция состояния через
              <code>Provider</code>, управление store вне React, async-атомы, интеграция с TanStack
              Query, SSR-гидрация, UI-сценарии и утилиты из <code>jotai/utils</code>.
            </p>

            <v-card class="pa-4 mb-8" color="blue-grey-lighten-5">
              <p class="mb-0">
                Если переносить опыт Effector, не ищите прямую замену каждому
                <code>createEvent</code>, <code>sample</code> и <code>fork</code>. В Jotai чаще
                проектируют atom как минимальную единицу данных или операции, а связи выражают через
                <code>get</code>, <code>set</code> и отдельный store.
              </p>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">1. Provider и createStore: изолированные экземпляры модели</h2>
            <p class="mb-3">
              По умолчанию Jotai использует общий store из ближайшего React-дерева. Но можно создать
              store вручную через <code>createStore</code> и передать его в <code>Provider</code>.
              Это полезно для виджетов, микрофронтендов, тестов, storybook-историй и случаев, когда на
              одной странице нужно несколько независимых экземпляров одной модели.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.storeProvider.value"></code></pre>
            <p class="mb-4">
              Важно не перепутать: два <code>Provider</code> с одним и тем же объектом store разделяют
              состояние. Два разных store дают два независимых состояния для тех же atom configs.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">2. Store вне React</h2>
            <p class="mb-3">
              Store можно читать и менять вне компонентов. Это похоже на инфраструктурный слой:
              bootstrap приложения, адаптер внешнего события, тест или bridge к legacy-коду. API простой:
              <code>store.get(atom)</code>, <code>store.set(atom, value)</code> и
              <code>store.sub(atom, callback)</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.outsideReact.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Writable atom вместо event + reducer</h2>
            <p class="mb-3">
              В Effector состояние часто обновляют через событие и <code>sample</code>. В Jotai похожий
              сценарий обычно выражается writable atom: read-функция возвращает значение, write-функция
              получает аргумент команды и обновляет базовый atom.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.writable.value"></code></pre>
            <p class="mb-8">
              Такой atom удобно читать как команду с текущим состоянием. Компонент вызывает
              <code>increment(5)</code>, а знание о том, где лежит <code>countAtom</code>, остаётся в
              модели.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">4. Async atoms: Suspense, loadable и refresh</h2>
            <p class="mb-3">
              Async atom может вернуть Promise. Если читать его напрямую, React Suspense возьмёт на себя
              pending-состояние, а ошибка уйдёт в Error Boundary. Но иногда нужен более явный UI:
              loading/error/data в одном компоненте. Для этого есть <code>loadable</code>.
            </p>
            <p class="mb-3">
              Ещё один частый рецепт — refresh-atom. Async atom кешируется до смены зависимостей, поэтому
              можно завести версию и читать её внутри async atom. Изменили версию — запрос выполняется
              заново.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.async.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Интеграция с TanStack Query</h2>
            <p class="mb-3">
              Jotai умеет async atoms, но это не делает его полной заменой TanStack Query. Если нужны
              query keys, staleTime, retry, invalidation, cache hydration и background refetch, лучше
              использовать TanStack Query. А если хочется читать query как atom, есть расширение
              <code>jotai-tanstack-query</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.query.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. SSR и useHydrateAtoms</h2>
            <p class="mb-3">
              Для SSR в Jotai обычно не сериализуют весь store. На сервере получают JSON-данные, а на
              клиенте точечно гидрируют нужные atoms через <code>useHydrateAtoms</code>. Это хорошо
              сочетается с идеей атомов: каждая страница сама решает, какие atom values ей нужны на
              старте.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.ssr.value"></code></pre>
            <p class="mb-8">
              На практике важно не класть в initial data функции, классы, Date без нормализации и другие
              несериализуемые значения. Сервер должен вернуть простые данные, а клиент — разложить их по
              atoms.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">7. UI-состояние: модалки, выбранные элементы и derived flags</h2>
            <p class="mb-3">
              Jotai особенно хорошо подходит для UI-состояния. Например, открытие модалки можно вывести
              из выбранного id: если <code>selectedUserIdAtom</code> не равен <code>null</code>, модалка
              открыта. Закрытие — отдельный writable atom, который сбрасывает id.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.ui.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Утилиты: persist, reset и atom families</h2>
            <p class="mb-3">
              В <code>jotai/utils</code> есть готовые атомные кирпичики. <code>atomWithStorage</code>
              сохраняет значение в browser storage, <code>atomWithReset</code> добавляет сброс к
              начальному значению, <code>RESET</code> можно прокидывать через writable derived atom, а
              <code>atomFamily</code> создаёт atom по параметру.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.utils.value"></code></pre>
            <p class="mb-8">
              Для debounce в базовых утилитах нет одного универсального atom, потому что debounce всегда
              зависит от сценария: нужно ли хранить текущее значение, debounced значение, состояние
              таймера и возможность очистки. Поэтому его обычно оформляют отдельным рецептом вокруг
              нескольких atoms.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">9. Тестирование атомов</h2>
            <p class="mb-3">
              Атомы удобно тестировать без React-компонентов. Создаём изолированный store, вызываем
              <code>store.set</code> для writable atom и проверяем базовые или derived values через
              <code>store.get</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.testing.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Шпаргалка: Effector → Jotai</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Effector</th>
                <th class="text-left font-weight-bold">Jotai</th>
                <th class="text-left font-weight-bold">Комментарий</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>createStore</code></td>
                <td class="pt-2 pb-2"><code>atom(initialValue)</code></td>
                <td class="pt-2 pb-2">Базовая единица состояния</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>store.map</code></td>
                <td class="pt-2 pb-2"><code>atom((get) =&gt; ...)</code></td>
                <td class="pt-2 pb-2">Derived state через чтение зависимостей</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>createEvent + sample</code></td>
                <td class="pt-2 pb-2"><code>atom(null, write)</code></td>
                <td class="pt-2 pb-2">Операция записи рядом с atom-моделью</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>fork</code></td>
                <td class="pt-2 pb-2"><code>createStore + Provider</code></td>
                <td class="pt-2 pb-2">Изоляция экземпляра состояния</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>serialize(scope)</code></td>
                <td class="pt-2 pb-2"><code>useHydrateAtoms</code></td>
                <td class="pt-2 pb-2">Точечная гидрация нужных atoms</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>patronum/reset</code></td>
                <td class="pt-2 pb-2"><code>atomWithReset</code></td>
                <td class="pt-2 pb-2">Сброс к начальному значению</td>
              </tr>
              </tbody>
            </v-table>

            <v-card class="pa-6 mb-6" color="blue-grey-lighten-5">
              <h2 class="text-h6 font-weight-bold mb-3">Итог</h2>
              <p class="mb-0">
                Практический Jotai — это не только <code>atom(0)</code> и <code>useAtom</code>.
                В реальном приложении важны изолированные stores, writable atoms как операции,
                async atoms с управляемым состоянием, SSR-гидрация через <code>useHydrateAtoms</code>,
                интеграция с TanStack Query и утилиты для persist/reset/family-сценариев. Чем меньше
                atom отвечает за чужую работу, тем проще поддерживать весь граф состояния.
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
