<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-tsx.js'

const snippetQueryClient = `
// lib/make-query-client.ts
import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  })
}
`

const snippetApi = `
// lib/api.ts
export type User = {
  id: number
  name: string
}

export type Post = {
  id: number
  userId: number
  title: string
}

export const queryKeys = {
  users: ['users'] as const,
  posts: ['posts'] as const,
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}
`

const snippetProvider = `
// app/providers.tsx
'use client'

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { makeQueryClient } from '@/lib/make-query-client'

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }

  return browserQueryClient
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
`

const snippetPage = `
// app/dashboard/page.tsx
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { makeQueryClient } from '@/lib/make-query-client'
import { getPosts, getUsers, queryKeys } from '@/lib/api'
import { DashboardClient } from './dashboard-client'

export default async function DashboardPage() {
  const queryClient = makeQueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.users,
      queryFn: getUsers,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.posts,
      queryFn: getPosts,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  )
}
`

const snippetClient = `
// app/dashboard/dashboard-client.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { getPosts, getUsers, queryKeys } from '@/lib/api'

export function DashboardClient() {
  const usersQuery = useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
  })

  const postsQuery = useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
  })

  if (usersQuery.isError || postsQuery.isError) {
    return <p>Не удалось загрузить данные</p>
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Users: {usersQuery.data?.length ?? 0}</p>
      <p>Posts: {postsQuery.data?.length ?? 0}</p>
    </section>
  )
}
`

const snippets = {
  queryClient: ref(''),
  api: ref(''),
  provider: ref(''),
  page: ref(''),
  client: ref(''),
}

onMounted(() => {
  const lang = Prism.languages.tsx
  snippets.queryClient.value = Prism.highlight(snippetQueryClient, lang, 'tsx')
  snippets.api.value = Prism.highlight(snippetApi, lang, 'tsx')
  snippets.provider.value = Prism.highlight(snippetProvider, lang, 'tsx')
  snippets.page.value = Prism.highlight(snippetPage, lang, 'tsx')
  snippets.client.value = Prism.highlight(snippetClient, lang, 'tsx')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-4">
              SSR-гидратация TanStack Query в Next.js App Router
            </h1>

            <p class="mb-4">
              В Next.js App Router серверные компоненты умеют получить данные до отправки страницы в
              браузер. TanStack Query добавляет к этому свой клиентский кэш: сервер заранее наполняет
              его данными, сериализует состояние, а клиентские компоненты читают тот же результат через
              обычный <code>useQuery</code>. Поэтому пользователь видит готовый HTML, а приложение после
              гидратации не начинает всё с пустого loading-состояния.
            </p>

            <v-card class="pa-4 mb-8" color="blue-grey-lighten-5">
              <p class="mb-0">
                Главный поток данных:
                <b>server prefetch</b> → <b>dehydrate</b> → <b>HTML/React payload</b> →
                <b>hydrate</b> → <b>useQuery читает кэш</b>.
              </p>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Зачем отдельный QueryClient на сервере</h2>
            <p class="mb-3">
              <code>QueryClient</code> хранит кэш запросов. На сервере это особенно важно: один HTTP
              запрос пользователя не должен видеть данные другого HTTP запроса. Поэтому в серверной
              странице создают новый <code>QueryClient</code> прямо внутри функции страницы. Он живёт
              только во время рендера конкретного запроса.
            </p>
            <p class="mb-6">
              Если сделать глобальный серверный <code>QueryClient</code>, можно получить утечки данных,
              странные совпадения кэша между пользователями и трудноотлавливаемые баги с авторизацией.
              В браузере ситуация другая: там кэш должен жить между навигациями одного пользователя,
              поэтому клиентский экземпляр переиспользуют.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Фабрика QueryClient</h2>
            <p class="mb-3">
              Обычно настройки выносят в фабрику. Так серверный и клиентский клиенты получают одинаковые
              дефолты: например, <code>staleTime</code> и отключение <code>refetchOnWindowFocus</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.queryClient.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Query keys, типы и fetch-функции</h2>
            <p class="mb-3">
              <code>queryKey</code> — это адрес записи в кэше. Серверный <code>prefetchQuery</code> и
              клиентский <code>useQuery</code> должны использовать один и тот же ключ. Если на сервере
              был <code>['users']</code>, а на клиенте случайно <code>['user']</code> или
              <code>['users', page]</code>, TanStack Query увидит другой запрос и выполнит fetch заново.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.api.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Клиентский QueryClientProvider</h2>
            <p class="mb-3">
              <code>QueryClientProvider</code> нужен всем клиентским компонентам, которые вызывают
              <code>useQuery</code>. Он кладёт клиентский <code>QueryClient</code> в React context.
              Без него хук не знает, где находится кэш, подписки, настройки retry, staleTime и методы
              инвалидирования.
            </p>
            <p class="mb-3">
              В App Router провайдер делают client component, потому что React context для TanStack Query
              используется на клиенте. Важно не создавать новый браузерный <code>QueryClient</code> на
              каждый рендер провайдера: иначе кэш будет сбрасываться.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.provider.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Server prefetch и dehydrate</h2>
            <p class="mb-3">
              Серверная страница создаёт <code>QueryClient</code> и вызывает
              <code>prefetchQuery</code>. Это почти то же самое, что <code>fetchQuery</code>, но без
              возвращения данных в компонент: результат складывается в кэш клиента.
            </p>
            <p class="mb-3">
              После этого вызывается <code>dehydrate(queryClient)</code>. Он берёт содержимое кэша и
              превращает его в сериализуемое состояние, которое можно передать через React payload в
              браузер. Это не HTML-строка с данными, а снимок query-кэша: ключи, данные, timestamps,
              статус успешных запросов.
            </p>
            <p class="mb-3">
              <code>HydrationBoundary</code> получает этот снимок и делает его доступным клиентской части
              дерева. Когда React гидратирует клиентский компонент, TanStack Query восстанавливает записи
              в браузерном <code>QueryClient</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.page.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Почему useQuery сразу получает данные</h2>
            <p class="mb-3">
              Клиентский компонент ничего особенного не делает. Он вызывает <code>useQuery</code> с тем
              же <code>queryKey</code> и <code>queryFn</code>. TanStack Query сначала смотрит в кэш.
              Если запись уже была гидратирована, хук синхронно отдаёт <code>data</code> и статус
              <code>success</code>. Поэтому компонент часто не показывает <code>isLoading</code> вообще.
            </p>
            <p class="mb-3">
              <code>queryFn</code> всё равно нужен. Он будет использован для фонового refetch, ручного
              <code>refetch</code>, инвалидирования или следующего запроса, когда данные устареют.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.client.value"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Роль staleTime</h2>
            <p class="mb-3">
              По умолчанию данные в TanStack Query быстро считаются устаревшими. После гидратации это
              может привести к мгновенному повторному запросу в браузере: HTML уже пришёл с данными, но
              клиент сразу решает, что их нужно перепроверить.
            </p>
            <p class="mb-6">
              <code>staleTime</code> задаёт окно свежести. Например, <code>60_000</code> означает:
              в течение минуты после серверного prefetch клиент считает данные свежими и не делает
              автоматический refetch при монтировании. Это не вечный кэш, а защита от лишнего запроса
              сразу после SSR.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Отличие от client-side fetching</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Что видит пользователь</th>
                <th class="text-left font-weight-bold">Где первый запрос</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Client-side fetching</td>
                <td class="pt-2 pb-2">Сначала shell/loading, потом данные</td>
                <td class="pt-2 pb-2">В браузере после загрузки JS</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">SSR + hydration</td>
                <td class="pt-2 pb-2">HTML уже содержит состояние с данными</td>
                <td class="pt-2 pb-2">На сервере во время рендера страницы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">SSR без dehydrate</td>
                <td class="pt-2 pb-2">Сервер может отрендерить данные, но клиентский кэш пуст</td>
                <td class="pt-2 pb-2">Сервер и затем повторно клиент</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Как это связано с Next.js cache</h2>
            <p class="mb-3">
              TanStack Query кэширует данные для React-компонентов и управляет их свежестью на клиенте.
              Next.js <code>fetch</code>, <code>revalidate</code> и route cache управляют серверным
              кешированием и повторной генерацией. Это разные уровни.
            </p>
            <p class="mb-6">
              Если fetch в серверной странице использует <code>next: { revalidate: 60 }</code>, Next.js
              может переиспользовать ответ на сервере. Но после передачи в браузер TanStack Query всё
              равно смотрит на свой <code>staleTime</code>. Хорошая настройка согласует оба слоя:
              сервер не делает лишнюю работу, а клиент не refetch-ит немедленно после гидратации.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки новичков</h2>
            <v-list class="mb-8">
              <v-list-item>
                <v-list-item-title>Один глобальный QueryClient на сервере</v-list-item-title>
                <v-list-item-subtitle>Риск утечки кэша между запросами и пользователями.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Разные queryKey на сервере и клиенте</v-list-item-title>
                <v-list-item-subtitle>Гидратация не совпадает, useQuery делает новый запрос.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Нет HydrationBoundary</v-list-item-title>
                <v-list-item-subtitle>Серверный prefetch был, но снимок кэша не попал в клиентское дерево.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Нет QueryClientProvider</v-list-item-title>
                <v-list-item-subtitle>Клиентские хуки TanStack Query не получают доступ к кэшу.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>staleTime равен 0 без понимания последствий</v-list-item-title>
                <v-list-item-subtitle>После SSR может появиться мгновенный фоновый refetch.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Нестабильные ключи с объектами</v-list-item-title>
                <v-list-item-subtitle>Ключ должен стабильно описывать параметры запроса.</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Ожидание, что dehydrate передаст ошибки как обычные данные</v-list-item-title>
                <v-list-item-subtitle>По умолчанию дегидратируются успешные запросы; ошибки нужно обрабатывать отдельно.</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-card class="pa-6 mb-6" color="blue-grey-lighten-5">
              <h2 class="text-h6 font-weight-bold mb-3">Итог</h2>
              <p class="mb-0">
                SSR-гидратация TanStack Query — это не магия, а перенос серверного query-кэша в браузер.
                Сервер создаёт изолированный <code>QueryClient</code>, наполняет его через
                <code>prefetchQuery</code>, сериализует через <code>dehydrate</code>, а
                <code>HydrationBoundary</code> восстанавливает эти записи для клиентских
                <code>useQuery</code>. Если ключи совпадают и <code>staleTime</code> настроен разумно,
                клиент сразу читает готовые данные и не делает лишний первый запрос.
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
