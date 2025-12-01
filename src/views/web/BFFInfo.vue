<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-typescript.js'

const traditionalApproachSnippet = `
// ❌ Традиционный подход - фронтенд напрямую к микросервисам

// Клиентское приложение делает множество запросов
async function loadUserDashboard(userId) {
  try {
    // Запрос 1: Профиль пользователя
    const userResponse = await fetch(\`https://api.users.com/users/\${userId}\`)
    const user = await userResponse.json()

    // Запрос 2: Посты пользователя
    const postsResponse = await fetch(\`https://api.posts.com/posts?userId=\${userId}\`)
    const posts = await postsResponse.json()

    // Запрос 3: Друзья пользователя
    const friendsResponse = await fetch(\`https://api.social.com/friends/\${userId}\`)
    const friends = await friendsResponse.json()

    // Запрос 4: Уведомления
    const notificationsResponse = await fetch(\`https://api.notifications.com/notifications/\${userId}\`)
    const notifications = await notificationsResponse.json()

    // Запрос 5: Статистика
    const statsResponse = await fetch(\`https://api.analytics.com/stats/\${userId}\`)
    const stats = await statsResponse.json()

    return { user, posts, friends, notifications, stats }
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
}

// Проблемы:
// 1. Множество запросов = медленная загрузка
// 2. Сложная логика на клиенте
// 3. Проблемы с CORS
// 4. Избыточные данные (over-fetching)
// 5. Недостаток данных (under-fetching)
// 6. Трудности с версионированием API
`

const bffApproachSnippet = `
// ✅ BFF подход - один запрос к специализированному бэкенду

// Клиентское приложение делает один запрос
async function loadUserDashboard(userId) {
  try {
    // Один запрос к BFF
    const response = await fetch(\`https://bff.myapp.com/api/dashboard/\${userId}\`)
    const dashboard = await response.json()

    // BFF вернул все необходимые данные в оптимальном формате
    return dashboard
    // {
    //   user: { id, name, avatar },
    //   posts: [...],
    //   friends: [...],
    //   notifications: { count, recent: [...] },
    //   stats: { ... }
    // }
  } catch (error) {
    console.error('Error loading dashboard:', error)
  }
}

// Преимущества:
// 1. Один запрос вместо пяти
// 2. Оптимизированный формат данных
// 3. Нет проблем с CORS
// 4. Точно нужные данные (нет over/under-fetching)
// 5. Версионирование на стороне BFF
// 6. Простая клиентская логика
`

const bffServerSnippet = `
// BFF сервер (Node.js + Express)
import express from 'express'
import axios from 'axios'

const app = express()

// Агрегация данных для дашборда
app.get('/api/dashboard/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    // BFF делает параллельные запросы к микросервисам
    const [user, posts, friends, notifications, stats] = await Promise.all([
      // Запрос к сервису пользователей
      axios.get(\`http://users-service/users/\${userId}\`),

      // Запрос к сервису постов
      axios.get(\`http://posts-service/posts?userId=\${userId}&limit=10\`),

      // Запрос к социальному сервису
      axios.get(\`http://social-service/friends/\${userId}?limit=5\`),

      // Запрос к сервису уведомлений
      axios.get(\`http://notifications-service/notifications/\${userId}?unread=true\`),

      // Запрос к сервису аналитики
      axios.get(\`http://analytics-service/stats/\${userId}\`)
    ])

    // Трансформация и агрегация данных
    const dashboard = {
      user: {
        id: user.data.id,
        name: user.data.name,
        avatar: user.data.avatar,
        email: user.data.email
      },
      posts: posts.data.items.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.content.substring(0, 100),
        createdAt: post.createdAt
      })),
      friends: friends.data.items.map(friend => ({
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        online: friend.status === 'online'
      })),
      notifications: {
        count: notifications.data.total,
        recent: notifications.data.items.slice(0, 3)
      },
      stats: {
        postsCount: stats.data.postsCount,
        followersCount: stats.data.followersCount,
        likesReceived: stats.data.likesReceived
      }
    }

    res.json(dashboard)
  } catch (error) {
    console.error('Error aggregating dashboard data:', error)
    res.status(500).json({ error: 'Failed to load dashboard' })
  }
})

app.listen(3000, () => {
  console.log('BFF server running on port 3000')
})
`

const overFetchingSnippet = `
// Проблема Over-Fetching (избыточные данные)

// ❌ Без BFF - получаем много лишних данных
const response = await fetch('https://api.users.com/users/123')
const user = await response.json()
// Ответ содержит 50+ полей:
// {
//   id, firstName, lastName, email, phone, address,
//   birthDate, gender, country, city, zipCode,
//   preferences, settings, metadata, createdAt,
//   updatedAt, lastLogin, loginCount, ...и еще 30 полей
// }

// Но нам нужны только 3 поля для отображения в UI!
const displayData = {
  name: \`\${user.firstName} \${user.lastName}\`,
  avatar: user.avatar,
  email: user.email
}

// Проблемы:
// - Тратим трафик на ненужные данные
// - Медленнее обработка больших JSON
// - Потенциальные проблемы с приватностью

// ✅ С BFF - получаем только нужные данные
const response = await fetch('https://bff.myapp.com/api/user/123/profile')
const profile = await response.json()
// {
//   name: "John Doe",
//   avatar: "https://...",
//   email: "john@example.com"
// }

// BFF endpoint на сервере
app.get('/api/user/:id/profile', async (req, res) => {
  const user = await fetchUser(req.params.id)

  // Отдаем только необходимые поля
  res.json({
    name: \`\${user.firstName} \${user.lastName}\`,
    avatar: user.avatar,
    email: user.email
  })
})
`

const underFetchingSnippet = `
// Проблема Under-Fetching (недостаток данных)

// ❌ Без BFF - нужно делать несколько запросов
async function loadPostWithComments(postId) {
  // Запрос 1: Получаем пост
  const postResponse = await fetch(\`/api/posts/\${postId}\`)
  const post = await postResponse.json()

  // Запрос 2: Получаем автора поста
  const authorResponse = await fetch(\`/api/users/\${post.authorId}\`)
  const author = await authorResponse.json()

  // Запрос 3: Получаем комментарии
  const commentsResponse = await fetch(\`/api/posts/\${postId}/comments\`)
  const comments = await commentsResponse.json()

  // Запрос 4-N: Получаем авторов каждого комментария
  const commentAuthors = await Promise.all(
    comments.map(comment =>
      fetch(\`/api/users/\${comment.authorId}\`).then(r => r.json())
    )
  )

  // N+1 проблема!
  return { post, author, comments, commentAuthors }
}

// ✅ С BFF - один запрос с полными данными
async function loadPostWithComments(postId) {
  const response = await fetch(\`https://bff.myapp.com/api/posts/\${postId}/full\`)
  return await response.json()
  // {
  //   post: { id, title, content, createdAt },
  //   author: { id, name, avatar },
  //   comments: [
  //     {
  //       id, text, createdAt,
  //       author: { id, name, avatar } // Вложенные данные!
  //     }
  //   ]
  // }
}

// BFF endpoint решает N+1 проблему
app.get('/api/posts/:id/full', async (req, res) => {
  const { id } = req.params

  // BFF делает оптимизированные запросы
  const [post, comments] = await Promise.all([
    fetchPost(id),
    fetchPostComments(id)
  ])

  const author = await fetchUser(post.authorId)

  // Получаем всех авторов комментариев одним запросом
  const authorIds = [...new Set(comments.map(c => c.authorId))]
  const authors = await fetchUsersBatch(authorIds)

  const authorsMap = new Map(authors.map(a => [a.id, a]))

  res.json({
    post,
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar
    },
    comments: comments.map(comment => ({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      author: {
        id: authorsMap.get(comment.authorId).id,
        name: authorsMap.get(comment.authorId).name,
        avatar: authorsMap.get(comment.authorId).avatar
      }
    }))
  })
})
`

const multipleBFFSnippet = `
// Несколько BFF для разных клиентов

// BFF для веб-приложения (Web BFF)
app.get('/web/api/dashboard/:userId', async (req, res) => {
  const dashboard = await aggregateDashboardData(req.params.userId)

  res.json({
    user: {
      ...dashboard.user,
      fullAddress: formatAddress(dashboard.user.address) // Для веба
    },
    posts: dashboard.posts.map(post => ({
      ...post,
      content: post.content, // Полный контент
      richMedia: post.media // Все медиа
    })),
    friends: dashboard.friends, // Полный список
    notifications: dashboard.notifications
  })
})

// BFF для мобильного приложения (Mobile BFF)
app.get('/mobile/api/dashboard/:userId', async (req, res) => {
  const dashboard = await aggregateDashboardData(req.params.userId)

  res.json({
    user: {
      ...dashboard.user,
      // Упрощенный адрес для мобильного
      city: dashboard.user.address.city
    },
    posts: dashboard.posts.map(post => ({
      ...post,
      // Сокращенный контент
      content: post.content.substring(0, 200),
      // Только превью изображения
      thumbnail: post.media[0]?.thumbnail
    })),
    // Ограниченный список друзей для экономии трафика
    friends: dashboard.friends.slice(0, 5),
    notifications: {
      // Только счетчик для мобильного
      count: dashboard.notifications.count
    }
  })
})

// BFF для умных часов (Wearable BFF)
app.get('/wearable/api/dashboard/:userId', async (req, res) => {
  const dashboard = await aggregateDashboardData(req.params.userId)

  res.json({
    // Минимальные данные для часов
    user: {
      name: dashboard.user.name.split(' ')[0] // Только имя
    },
    unreadCount: dashboard.notifications.count,
    latestPost: {
      title: dashboard.posts[0]?.title.substring(0, 50)
    }
  })
})
`

const graphqlBFFSnippet = `
// BFF с использованием GraphQL

// GraphQL схема
const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    posts: [Post!]!
    friends: [User!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    post(id: ID!): Post
    dashboard(userId: ID!): Dashboard
  }

  type Dashboard {
    user: User!
    recentPosts: [Post!]!
    onlineFriends: [User!]!
    unreadNotifications: Int!
  }
\`

// GraphQL резолверы
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await fetchUser(id)
    },

    dashboard: async (_, { userId }) => {
      // Параллельные запросы к микросервисам
      const [user, posts, friends, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserPosts(userId, { limit: 10 }),
        fetchUserFriends(userId, { online: true }),
        fetchUnreadNotifications(userId)
      ])

      return {
        user,
        recentPosts: posts,
        onlineFriends: friends,
        unreadNotifications: notifications.count
      }
    }
  },

  User: {
    posts: async (user) => {
      return await fetchUserPosts(user.id)
    },
    friends: async (user) => {
      return await fetchUserFriends(user.id)
    }
  },

  Post: {
    author: async (post) => {
      return await fetchUser(post.authorId)
    },
    comments: async (post) => {
      return await fetchPostComments(post.id)
    }
  }
}

// Клиент запрашивает только нужные поля
const DASHBOARD_QUERY = gql\`
  query GetDashboard($userId: ID!) {
    dashboard(userId: $userId) {
      user {
        name
        avatar
      }
      recentPosts {
        id
        title
      }
      onlineFriends {
        id
        name
        avatar
      }
      unreadNotifications
    }
  }
\`

// Нет over-fetching - получаем только запрошенные поля!
`

const cachingSnippet = `
// Кэширование в BFF для оптимизации

import Redis from 'ioredis'

const redis = new Redis()

// Кэширование на уровне BFF
app.get('/api/user/:id/profile', async (req, res) => {
  const { id } = req.params
  const cacheKey = \`user:profile:\${id}\`

  try {
    // Проверяем кэш
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log('Cache hit!')
      return res.json(JSON.parse(cached))
    }

    // Запрос к сервису
    const user = await fetchUser(id)

    const profile = {
      name: \`\${user.firstName} \${user.lastName}\`,
      avatar: user.avatar,
      email: user.email
    }

    // Кэшируем на 5 минут
    await redis.setex(cacheKey, 300, JSON.stringify(profile))

    res.json(profile)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Инвалидация кэша при обновлении
app.put('/api/user/:id/profile', async (req, res) => {
  const { id } = req.params

  try {
    // Обновляем данные
    await updateUser(id, req.body)

    // Инвалидируем кэш
    await redis.del(\`user:profile:\${id}\`)

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update' })
  }
})

// Batch запросы с кэшированием
app.post('/api/users/batch', async (req, res) => {
  const { userIds } = req.body

  try {
    // Проверяем кэш для каждого ID
    const cacheKeys = userIds.map(id => \`user:profile:\${id}\`)
    const cachedResults = await redis.mget(cacheKeys)

    const cached = []
    const toFetch = []

    cachedResults.forEach((result, index) => {
      if (result) {
        cached.push(JSON.parse(result))
      } else {
        toFetch.push(userIds[index])
      }
    })

    // Запрашиваем только не закэшированные
    if (toFetch.length > 0) {
      const fetched = await fetchUsersBatch(toFetch)

      // Кэшируем новые результаты
      const pipeline = redis.pipeline()
      fetched.forEach(user => {
        const profile = transformUserToProfile(user)
        pipeline.setex(
          \`user:profile:\${user.id}\`,
          300,
          JSON.stringify(profile)
        )
      })
      await pipeline.exec()

      cached.push(...fetched.map(transformUserToProfile))
    }

    res.json(cached)
  } catch (error) {
    res.status(500).json({ error: 'Batch request failed' })
  }
})
`

const authSnippet = `
// Аутентификация и авторизация в BFF

import jwt from 'jsonwebtoken'

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Защищенный endpoint
app.get('/api/dashboard/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params

  // Проверка доступа
  if (req.user.id !== userId && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' })
  }

  try {
    const dashboard = await aggregateDashboardData(userId)
    res.json(dashboard)
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard' })
  }
})

// BFF как OAuth2 клиент
app.get('/api/auth/login', (req, res) => {
  const authUrl = \`https://auth-service.com/oauth/authorize?\` +
    \`client_id=\${process.env.CLIENT_ID}&\` +
    \`redirect_uri=\${encodeURIComponent(process.env.REDIRECT_URI)}&\` +
    \`response_type=code&\` +
    \`scope=read write\`

  res.redirect(authUrl)
})

app.get('/api/auth/callback', async (req, res) => {
  const { code } = req.query

  try {
    // Обмениваем код на токен
    const tokenResponse = await axios.post('https://auth-service.com/oauth/token', {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    })

    const { access_token, refresh_token } = tokenResponse.data

    // Получаем данные пользователя
    const userResponse = await axios.get('https://api.service.com/user', {
      headers: { Authorization: \`Bearer \${access_token}\` }
    })

    // Создаем собственный JWT для клиента
    const jwtToken = jwt.sign(
      { id: userResponse.data.id, email: userResponse.data.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    // Сохраняем refresh token в защищенную cookie
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    res.redirect(\`/dashboard?token=\${jwtToken}\`)
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
})
`

const errorHandlingSnippet = `
// Обработка ошибок и отказоустойчивость в BFF

import CircuitBreaker from 'opossum'

// Circuit Breaker для каждого микросервиса
const userServiceBreaker = new CircuitBreaker(fetchUser, {
  timeout: 3000,          // Таймаут 3 секунды
  errorThresholdPercentage: 50,  // Открыть при 50% ошибок
  resetTimeout: 30000     // Попытка восстановления через 30 сек
})

userServiceBreaker.fallback(() => {
  // Fallback данные при отказе сервиса
  return {
    id: 'unknown',
    name: 'User',
    avatar: '/default-avatar.png'
  }
})

// Обработка ошибок с graceful degradation
app.get('/api/dashboard/:userId', async (req, res) => {
  const { userId } = req.params
  const errors = []

  try {
    // Используем Promise.allSettled вместо Promise.all
    const results = await Promise.allSettled([
      userServiceBreaker.fire(userId),
      fetchUserPosts(userId).catch(e => {
        errors.push({ service: 'posts', error: e.message })
        return [] // Возвращаем пустой массив при ошибке
      }),
      fetchUserFriends(userId).catch(e => {
        errors.push({ service: 'friends', error: e.message })
        return []
      }),
      fetchNotifications(userId).catch(e => {
        errors.push({ service: 'notifications', error: e.message })
        return { count: 0, items: [] }
      })
    ])

    const [userResult, posts, friends, notifications] = results.map(r =>
      r.status === 'fulfilled' ? r.value : r.reason
    )

    // Возвращаем частичные данные даже при ошибках
    res.json({
      user: userResult,
      posts,
      friends,
      notifications,
      // Информируем клиента о проблемах
      _metadata: {
        partial: errors.length > 0,
        errors: errors.length > 0 ? errors : undefined
      }
    })
  } catch (error) {
    console.error('Critical error:', error)
    res.status(500).json({
      error: 'Service temporarily unavailable',
      message: 'Please try again later'
    })
  }
})

// Retry логика с экспоненциальной задержкой
async function fetchWithRetry(fn, maxRetries = 3, baseDelay = 100) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries - 1) throw error

      const delay = baseDelay * Math.pow(2, attempt)
      console.log(\`Retry attempt \${attempt + 1} after \${delay}ms\`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Использование
app.get('/api/critical/:id', async (req, res) => {
  try {
    const data = await fetchWithRetry(
      () => fetchCriticalData(req.params.id),
      3,
      200
    )
    res.json(data)
  } catch (error) {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Мониторинг и логирование
app.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start

    console.log({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: \`\${duration}ms\`,
      timestamp: new Date().toISOString()
    })

    // Метрики для мониторинга
    metrics.recordRequest({
      endpoint: req.route?.path,
      method: req.method,
      status: res.statusCode,
      duration
    })
  })

  next()
})
`

const highlightedTraditional = ref('')
const highlightedBFF = ref('')
const highlightedBFFServer = ref('')
const highlightedOverFetching = ref('')
const highlightedUnderFetching = ref('')
const highlightedMultipleBFF = ref('')
const highlightedGraphQLBFF = ref('')
const highlightedCaching = ref('')
const highlightedAuth = ref('')
const highlightedErrorHandling = ref('')

onMounted(() => {
  highlightedTraditional.value = Prism.highlight(traditionalApproachSnippet, Prism.languages.javascript, 'javascript')
  highlightedBFF.value = Prism.highlight(bffApproachSnippet, Prism.languages.javascript, 'javascript')
  highlightedBFFServer.value = Prism.highlight(bffServerSnippet, Prism.languages.javascript, 'javascript')
  highlightedOverFetching.value = Prism.highlight(overFetchingSnippet, Prism.languages.javascript, 'javascript')
  highlightedUnderFetching.value = Prism.highlight(underFetchingSnippet, Prism.languages.javascript, 'javascript')
  highlightedMultipleBFF.value = Prism.highlight(multipleBFFSnippet, Prism.languages.javascript, 'javascript')
  highlightedGraphQLBFF.value = Prism.highlight(graphqlBFFSnippet, Prism.languages.javascript, 'javascript')
  highlightedCaching.value = Prism.highlight(cachingSnippet, Prism.languages.javascript, 'javascript')
  highlightedAuth.value = Prism.highlight(authSnippet, Prism.languages.javascript, 'javascript')
  highlightedErrorHandling.value = Prism.highlight(errorHandlingSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              BFF (Backend For Frontend)
            </h1>

            <p class="font-weight-regular mb-6">
              <b>BFF (Backend For Frontend)</b> — это архитектурный паттерн, при котором создается специализированный
              backend слой для каждого типа клиентского приложения (веб, мобильное, desktop). BFF действует как
              посредник между фронтендом и микросервисами, агрегируя данные и оптимизируя API под конкретные
              потребности клиента.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Традиционный подход vs BFF</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Традиционный подход</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Множество запросов</strong> к разным микросервисам</li>
                    <li><strong>Сложная логика</strong> на клиенте</li>
                    <li><strong>Over-fetching</strong> — избыточные данные</li>
                    <li><strong>Under-fetching</strong> — недостаток данных</li>
                    <li><strong>Проблемы с CORS</strong></li>
                    <li><strong>Сложное версионирование</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">BFF подход</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Один запрос</strong> для всех данных</li>
                    <li><strong>Простая логика</strong> на клиенте</li>
                    <li><strong>Точные данные</strong> — только нужное</li>
                    <li><strong>Агрегация</strong> на сервере</li>
                    <li><strong>Нет CORS</strong> проблем</li>
                    <li><strong>Версионирование</strong> на BFF</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">❌ Проблемы традиционного подхода</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedTraditional"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">✅ Решение с BFF</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBFF"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реализация BFF сервера</h2>
            <p class="font-weight-regular mb-4">
              BFF сервер агрегирует данные из нескольких микросервисов и возвращает оптимизированный ответ:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBFFServer"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение проблемы Over-Fetching</h2>
            <p class="font-weight-regular mb-4">
              <b>Over-fetching</b> — это получение избыточных данных, которые не используются в UI.
              BFF позволяет запрашивать только необходимые поля:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOverFetching"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение проблемы Under-Fetching</h2>
            <p class="font-weight-regular mb-4">
              <b>Under-fetching</b> — это недостаток данных, требующий дополнительных запросов (N+1 проблема).
              BFF решает это через агрегацию:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUnderFetching"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества BFF</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="text-left pl-4">
                    <li>Меньше HTTP запросов</li>
                    <li>Параллельные запросы к сервисам</li>
                    <li>Кэширование на уровне BFF</li>
                    <li>Оптимизация размера данных</li>
                    <li>Сжатие и батчинг</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-layers-triple</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Архитектура</h3>
                  <ul class="text-left pl-4">
                    <li>Разделение ответственности</li>
                    <li>Специализация под клиента</li>
                    <li>Независимое развертывание</li>
                    <li>Изоляция изменений</li>
                    <li>Простая поддержка</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-shield-check</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Безопасность</h3>
                  <ul class="text-left pl-4">
                    <li>Единая точка аутентификации</li>
                    <li>Скрытие внутренних API</li>
                    <li>Контроль доступа</li>
                    <li>Нет прямого доступа к микросервисам</li>
                    <li>Валидация на сервере</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Несколько BFF для разных клиентов</h2>
            <p class="font-weight-regular mb-4">
              Каждый тип клиента может иметь свой BFF, оптимизированный под специфичные потребности:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMultipleBFF"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">BFF с GraphQL</h2>
            <p class="font-weight-regular mb-4">
              GraphQL идеально подходит для BFF, решая проблемы over-fetching и under-fetching на уровне языка запросов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGraphQLBFF"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Кэширование в BFF</h2>
            <p class="font-weight-regular mb-4">
              BFF может кэшировать агрегированные данные для ускорения ответов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCaching"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Аутентификация и авторизация</h2>
            <p class="font-weight-regular mb-4">
              BFF может быть единой точкой для аутентификации и управления токенами:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAuth"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Обработка ошибок и отказоустойчивость</h2>
            <p class="font-weight-regular mb-4">
              BFF должен gracefully обрабатывать сбои микросервисов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedErrorHandling"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы и решения при использовании BFF</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Решение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Дублирование кода</b></td>
                <td>Логика повторяется между BFF</td>
                <td>Shared библиотеки, общие утилиты</td>
              </tr>
              <tr>
                <td><b>Увеличение латентности</b></td>
                <td>Дополнительный hop</td>
                <td>Кэширование, параллельные запросы</td>
              </tr>
              <tr>
                <td><b>Сложность развертывания</b></td>
                <td>Больше сервисов для поддержки</td>
                <td>Контейнеризация, CI/CD автоматизация</td>
              </tr>
              <tr>
                <td><b>Согласованность данных</b></td>
                <td>Кэш может устаревать</td>
                <td>Event-driven инвалидация, TTL</td>
              </tr>
              <tr>
                <td><b>Ответственность BFF команды</b></td>
                <td>Нужна поддержка от фронтенда</td>
                <td>Совместное владение, единая команда</td>
              </tr>
              <tr>
                <td><b>Точка отказа</b></td>
                <td>BFF может стать bottleneck</td>
                <td>Горизонтальное масштабирование, Circuit Breaker</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Протоколы и форматы данных</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Протоколы</h3>
                  <ul class="pl-4">
                    <li><b>HTTP/HTTPS</b> — основной протокол</li>
                    <li><b>WebSocket</b> — для real-time данных</li>
                    <li><b>gRPC</b> — между BFF и микросервисами</li>
                    <li><b>Server-Sent Events</b> — для уведомлений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Форматы данных</h3>
                  <ul class="pl-4">
                    <li><b>JSON</b> — стандартный формат</li>
                    <li><b>GraphQL</b> — гибкие запросы</li>
                    <li><b>Protocol Buffers</b> — эффективная сериализация</li>
                    <li><b>MessagePack</b> — компактный бинарный формат</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Архитектурные паттерны</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-server</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Один BFF на клиент</h3>
                  <p class="text-body-2">Отдельный BFF для веб, iOS, Android</p>
                  <v-chip color="success" size="small">Оптимизация</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-server-network</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Универсальный BFF</h3>
                  <p class="text-body-2">Один BFF для всех клиентов с адаптацией</p>
                  <v-chip color="info" size="small">Простота</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-server-security</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">GraphQL Gateway</h3>
                  <p class="text-body-2">BFF как GraphQL федерация</p>
                  <v-chip color="warning" size="small">Гибкость</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое BFF и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  BFF (Backend For Frontend) — это специализированный backend слой для конкретного типа клиента.
                  Он решает проблемы over/under-fetching, агрегирует данные из микросервисов,
                  оптимизирует API под нужды клиента и упрощает логику на фронтенде.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем BFF отличается от API Gateway?</p>
                <p class="font-weight-regular ma-0">
                  API Gateway — это единая точка входа для всех клиентов, занимается маршрутизацией,
                  аутентификацией, rate limiting. BFF — специализирован под конкретный клиент,
                  агрегирует данные и трансформирует их под нужды UI. Может быть несколько BFF за одним Gateway.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как BFF решает проблему over-fetching?</p>
                <p class="font-weight-regular ma-0">
                  BFF запрашивает полные данные из микросервисов, но возвращает клиенту только необходимые поля,
                  уменьшая размер payload и экономя трафик. Клиент получает ровно те данные, которые нужны для UI.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как BFF решает проблему under-fetching?</p>
                <p class="font-weight-regular ma-0">
                  BFF агрегирует данные из нескольких микросервисов в один запрос, решая N+1 проблему.
                  Вместо множества последовательных запросов клиент делает один, а BFF параллельно
                  запрашивает все необходимые данные.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы возникают при использовании BFF?</p>
                <p class="font-weight-regular ma-0">
                  Основные проблемы: дублирование кода между BFF, увеличение латентности (дополнительный hop),
                  сложность развертывания, проблемы с согласованностью кэша, BFF может стать bottleneck.
                  Решения: shared библиотеки, кэширование, горизонтальное масштабирование.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Сколько BFF нужно создавать?</p>
                <p class="font-weight-regular ma-0">
                  Зависит от требований: можно создать один BFF на каждый тип клиента (Web, iOS, Android),
                  один универсальный BFF с адаптацией, или комбинированный подход. Важно балансировать
                  между оптимизацией и сложностью поддержки.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Кэширование агрегированных данных</li>
                    <li>Параллельные запросы к сервисам</li>
                    <li>Circuit Breaker для отказоустойчивости</li>
                    <li>Graceful degradation при ошибках</li>
                    <li>Мониторинг и логирование</li>
                    <li>Версионирование API</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Бизнес-логика в BFF</li>
                    <li>Последовательные запросы</li>
                    <li>Отсутствие обработки ошибок</li>
                    <li>Игнорирование таймаутов</li>
                    <li>Дублирование кода без shared libs</li>
                    <li>Прямой доступ к БД из BFF</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте TypeScript для типизации</li>
                    <li>Внедряйте метрики и трейсинг</li>
                    <li>Автоматизируйте тестирование</li>
                    <li>Документируйте API (OpenAPI/Swagger)</li>
                    <li>Настройте CI/CD пайплайны</li>
                    <li>Применяйте GraphQL для гибкости</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>BFF (Backend For Frontend)</b> — это архитектурный паттерн, который создает специализированный
              backend слой между клиентом и микросервисами. BFF решает проблемы over-fetching и under-fetching,
              агрегирует данные, оптимизирует API под нужды конкретного клиента и упрощает фронтенд логику.
              Несмотря на дополнительную сложность, BFF значительно улучшает производительность, архитектуру
              и developer experience в микросервисных приложениях.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://samnewman.io/patterns/architectural/bff/"
                target="_blank"
                class="mr-2">
                Sam Newman: BFF Pattern
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://philcalcado.com/2015/09/18/the_back_end_for_front_end_pattern_bff.html"
                target="_blank">
                Phil Calçado: BFF
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
