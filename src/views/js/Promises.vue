<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const callbackHellSnippet = `
// Callback Hell - пример до промисов
function getUserData(userId, callback) {
  setTimeout(() => {
    console.log('Получили пользователя')
    callback(null, { id: userId, name: 'John' })
  }, 1000)
}

function getUserPosts(userId, callback) {
  setTimeout(() => {
    console.log('Получили посты')
    callback(null, [{ id: 1, title: 'Post 1' }])
  }, 1000)
}

function getPostComments(postId, callback) {
  setTimeout(() => {
    console.log('Получили комментарии')
    callback(null, [{ id: 1, text: 'Comment 1' }])
  }, 1000)
}

// Вложенные колбэки - "Callback Hell"
getUserData(1, (error, user) => {
  if (error) {
    console.error('Ошибка получения пользователя:', error)
    return
  }

  getUserPosts(user.id, (error, posts) => {
    if (error) {
      console.error('Ошибка получения постов:', error)
      return
    }

    getPostComments(posts[0].id, (error, comments) => {
      if (error) {
        console.error('Ошибка получения комментариев:', error)
        return
      }

      // Наконец-то можем использовать данные
      console.log('Пользователь:', user)
      console.log('Посты:', posts)
      console.log('Комментарии:', comments)
    })
  })
})
`

const eventsSnippet = `
// Подход через события (Event-driven)
const EventEmitter = require('events')

class DataService extends EventEmitter {
  getUserData(userId) {
    setTimeout(() => {
      this.emit('user-loaded', { id: userId, name: 'John' })
    }, 1000)
  }

  getUserPosts(userId) {
    setTimeout(() => {
      this.emit('posts-loaded', [{ id: 1, title: 'Post 1' }])
    }, 1000)
  }
}

const service = new DataService()

// Подписка на события
service.on('user-loaded', (user) => {
  console.log('Пользователь загружен:', user)
  service.getUserPosts(user.id)
})

service.on('posts-loaded', (posts) => {
  console.log('Посты загружены:', posts)
})

// Запуск
service.getUserData(1)
`

const promiseBasicsSnippet = `
// Создание промиса
const myPromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5

  setTimeout(() => {
    if (success) {
      resolve('Операция успешна!')
    } else {
      reject(new Error('Произошла ошибка'))
    }
  }, 1000)
})

// Использование промиса
myPromise
  .then(result => {
    console.log('Успех:', result)
  })
  .catch(error => {
    console.error('Ошибка:', error.message)
  })
  .finally(() => {
    console.log('Операция завершена')
  })

// Промис всегда находится в одном из трех состояний:
console.log('Начальное состояние:', myPromise) // Promise { <pending> }
`

const promiseStatesSnippet = `
// Демонстрация состояний промисов

// 1. PENDING (ожидание) - начальное состояние
const pendingPromise = new Promise((resolve, reject) => {
  // Промис создан, но еще не разрешен или отклонен
  console.log('Состояние: pending')
})
console.log(pendingPromise) // Promise { <pending> }

// 2. FULFILLED (выполнен успешно)
const fulfilledPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Данные получены!')
  }, 1000)
})

fulfilledPromise.then(result => {
  console.log('Результат:', result)
  console.log(fulfilledPromise) // Promise { 'Данные получены!' }
})

// 3. REJECTED (отклонен)
const rejectedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Что-то пошло не так'))
  }, 1000)
})

rejectedPromise.catch(error => {
  console.error('Ошибка:', error.message)
  console.log(rejectedPromise) // Promise { <rejected> Error: Что-то пошло не так }
})

// Создание уже разрешенных промисов
const immediateResolve = Promise.resolve('Мгновенный успех')
const immediateReject = Promise.reject(new Error('Мгновенная ошибка'))

console.log(immediateResolve) // Promise { 'Мгновенный успех' }
console.log(immediateReject)  // Promise { <rejected> Error: Мгновенная ошибка }
`

const promiseChainingSnippet = `
// Цепочки промисов - решение проблемы Callback Hell
function getUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Получили пользователя')
      resolve({ id: userId, name: 'John' })
    }, 1000)
  })
}

function getUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Получили посты')
      resolve([{ id: 1, title: 'Post 1' }])
    }, 1000)
  })
}

function getPostComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Получили комментарии')
      resolve([{ id: 1, text: 'Comment 1' }])
    }, 1000)
  })
}

// Линейная цепочка без вложенности
getUserData(1)
  .then(user => {
    console.log('Пользователь:', user)
    return getUserPosts(user.id)
  })
  .then(posts => {
    console.log('Посты:', posts)
    return getPostComments(posts[0].id)
  })
  .then(comments => {
    console.log('Комментарии:', comments)
  })
  .catch(error => {
    console.error('Ошибка в цепочке:', error)
  })
`

const promiseMethodsSnippet = `
// Статические методы Promise

// Promise.all - ждет выполнения всех промисов
const promise1 = Promise.resolve(1)
const promise2 = Promise.resolve(2)
const promise3 = Promise.resolve(3)

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log('Все промисы выполнены:', results) // [1, 2, 3]
  })
  .catch(error => {
    console.error('Один из промисов отклонен:', error)
  })

// Promise.race - возвращает первый выполненный промис
const fastPromise = new Promise(resolve => setTimeout(() => resolve('быстрый'), 100))
const slowPromise = new Promise(resolve => setTimeout(() => resolve('медленный'), 1000))

Promise.race([fastPromise, slowPromise])
  .then(result => {
    console.log('Первый выполненный:', result) // "быстрый"
  })

// Promise.allSettled - ждет завершения всех (ES2020)
const mixedPromises = [
  Promise.resolve('успех'),
  Promise.reject('ошибка'),
  Promise.resolve('еще успех')
]

Promise.allSettled(mixedPromises)
  .then(results => {
    console.log('Все завершены:', results)
    // [
    //   { status: 'fulfilled', value: 'успех' },
    //   { status: 'rejected', reason: 'ошибка' },
    //   { status: 'fulfilled', value: 'еще успех' }
    // ]
  })

// Promise.any - первый успешный (ES2021)
Promise.any([
  Promise.reject('ошибка 1'),
  Promise.resolve('успех'),
  Promise.reject('ошибка 2')
])
  .then(result => {
    console.log('Первый успешный:', result) // "успех"
  })
`

const asyncAwaitSnippet = `
// Эволюция: async/await (ES2017)
// Делает асинхронный код похожим на синхронный

async function fetchUserData(userId) {
  try {
    console.log('Начинаем загрузку...')

    const user = await getUserData(userId)
    console.log('Пользователь:', user)

    const posts = await getUserPosts(user.id)
    console.log('Посты:', posts)

    const comments = await getPostComments(posts[0].id)
    console.log('Комментарии:', comments)

    return { user, posts, comments }
  } catch (error) {
    console.error('Ошибка:', error)
    throw error
  } finally {
    console.log('Загрузка завершена')
  }
}

// Использование
fetchUserData(1)
  .then(data => {
    console.log('Все данные:', data)
  })
  .catch(error => {
    console.error('Не удалось загрузить данные:', error)
  })

// async/await с циклами
async function processUsers(userIds) {
  const results = []

  // Последовательная обработка
  for (const userId of userIds) {
    const user = await getUserData(userId)
    results.push(user)
  }

  // Параллельная обработка
  const users = await Promise.all(
    userIds.map(id => getUserData(id))
  )

  return users
}
`

const realWorldExampleSnippet = `
// Реальный пример: API запросы

// До промисов (XMLHttpRequest + callbacks)
function fetchDataOldWay(url, callback) {
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText)
          callback(null, data)
        } catch (error) {
          callback(error, null)
        }
      } else {
        callback(new Error('HTTP Error: ' + xhr.status), null)
      }
    }
  }

  xhr.onerror = function() {
    callback(new Error('Network Error'), null)
  }

  xhr.open('GET', url, true)
  xhr.send()
}

// Использование старого подхода
fetchDataOldWay('/api/users', (error, users) => {
  if (error) {
    console.error('Ошибка:', error)
    return
  }

  fetchDataOldWay('/api/posts', (error, posts) => {
    if (error) {
      console.error('Ошибка:', error)
      return
    }

    // И так далее... Callback Hell
    console.log('Данные получены:', users, posts)
  })
})

// С промисами (fetch API)
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP Error: ' + response.status)
      }
      return response.json()
    })
}

// Использование с промисами
Promise.all([
  fetchData('/api/users'),
  fetchData('/api/posts')
])
  .then(([users, posts]) => {
    console.log('Данные получены:', users, posts)
  })
  .catch(error => {
    console.error('Ошибка:', error)
  })

// С async/await
async function loadData() {
  try {
    const [users, posts] = await Promise.all([
      fetchData('/api/users'),
      fetchData('/api/posts')
    ])

    console.log('Данные получены:', users, posts)
    return { users, posts }
  } catch (error) {
    console.error('Ошибка:', error)
    throw error
  }
}
`

const highlightedCallbackHell = ref('')
const highlightedEvents = ref('')
const highlightedPromiseBasics = ref('')
const highlightedPromiseStates = ref('')
const highlightedPromiseChaining = ref('')
const highlightedPromiseMethods = ref('')
const highlightedAsyncAwait = ref('')
const highlightedRealWorldExample = ref('')

onMounted(() => {
  highlightedCallbackHell.value = Prism.highlight(
    callbackHellSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedEvents.value = Prism.highlight(eventsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPromiseBasics.value = Prism.highlight(
    promiseBasicsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedPromiseStates.value = Prism.highlight(
    promiseStatesSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedPromiseChaining.value = Prism.highlight(
    promiseChainingSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedPromiseMethods.value = Prism.highlight(
    promiseMethodsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedAsyncAwait.value = Prism.highlight(
    asyncAwaitSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedRealWorldExample.value = Prism.highlight(
    realWorldExampleSnippet,
    Prism.languages.javascript,
    'javascript',
  )
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              JavaScript Promises: До промисов и состояния
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Промисы</b> появились в ES6 (2015) для решения проблем с асинхронным кодом. До их
              введения использовались <b>колбэки (callbacks)</b> и <b>события (events)</b>. Промисы
              имеют <b>три состояния</b>: pending, fulfilled и rejected.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Как работали до промисов?</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="red-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="red" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Проблемы колбэков</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Callback Hell</strong> — глубокая вложенность</li>
                    <li><strong>Сложность чтения</strong> кода</li>
                    <li><strong>Дублирование</strong> обработки ошибок</li>
                    <li><strong>Отсутствие композиции</strong></li>
                    <li><strong>Сложность отладки</strong></li>
                    <li><strong>Inversion of Control</strong></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="green-lighten-5">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="green" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества промисов</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Линейные цепочки</strong> .then()</li>
                    <li><strong>Единая обработка</strong> ошибок</li>
                    <li><strong>Композиция</strong> через методы</li>
                    <li><strong>Читаемый код</strong></li>
                    <li><strong>Контроль выполнения</strong></li>
                    <li><strong>Стандартизация</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">1. Callback Hell - пирамида doom</h3>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedCallbackHell"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. Event-driven подход</h3>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedEvents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основы промисов</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPromiseBasics"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Три состояния промисов</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Промис может находиться только в одном из трех состояний, и
              состояние может измениться только один раз (immutable).
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="orange-lighten-5">
                  <v-icon size="large" color="orange" class="mb-2">mdi-clock-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">PENDING</h3>
                  <p class="text-body-2">Начальное состояние</p>
                  <ul class="text-left pl-4">
                    <li>Промис создан</li>
                    <li>Операция выполняется</li>
                    <li>Результат неизвестен</li>
                    <li>Может перейти в fulfilled или rejected</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="green-lighten-5">
                  <v-icon size="large" color="green" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">FULFILLED</h3>
                  <p class="text-body-2">Успешно выполнен</p>
                  <ul class="text-left pl-4">
                    <li>resolve() был вызван</li>
                    <li>Операция завершена успешно</li>
                    <li>Есть результат (value)</li>
                    <li>Состояние неизменно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center" color="red-lighten-5">
                  <v-icon size="large" color="red" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">REJECTED</h3>
                  <p class="text-body-2">Отклонен</p>
                  <ul class="text-left pl-4">
                    <li>reject() был вызван</li>
                    <li>Произошла ошибка</li>
                    <li>Есть причина (reason)</li>
                    <li>Состояние неизменно</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPromiseStates"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Цепочки промисов (Promise Chaining)</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPromiseChaining"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Статические методы Promise</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPromiseMethods"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов Promise</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Метод</th>
                  <th class="text-left font-weight-bold">Поведение</th>
                  <th class="text-left font-weight-bold">Результат</th>
                  <th class="text-left font-weight-bold">Когда использовать</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pt-2 pb-2"><code>Promise.all</code></td>
                  <td class="pt-2 pb-2">Ждет все, отклоняется при первой ошибке</td>
                  <td class="pt-2 pb-2">Массив результатов</td>
                  <td class="pt-2 pb-2">Все операции критичны</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><code>Promise.race</code></td>
                  <td class="pt-2 pb-2">Возвращает первый завершенный</td>
                  <td class="pt-2 pb-2">Результат первого</td>
                  <td class="pt-2 pb-2">Таймауты, race conditions</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><code>Promise.allSettled</code></td>
                  <td class="pt-2 pb-2">Ждет все, не отклоняется</td>
                  <td class="pt-2 pb-2">Массив со статусами</td>
                  <td class="pt-2 pb-2">Нужны все результаты</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><code>Promise.any</code></td>
                  <td class="pt-2 pb-2">Первый успешный</td>
                  <td class="pt-2 pb-2">Результат первого успешного</td>
                  <td class="pt-2 pb-2">Fallback стратегии</td>
                </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Эволюция: async/await</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedAsyncAwait"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реальный пример: API запросы</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedRealWorldExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Временная шкала развития</h2>

            <v-row class="mb-8">
              <v-col cols="12">
                <v-timeline direction="vertical" side="end" class="custom-timeline">
                  <v-timeline-item
                    dot-color="grey"
                    size="small"
                    style="margin-bottom: -16px !important"
                  >
                    <template v-slot:opposite>
                      <span class="text-caption">1995-2010</span>
                    </template>
                    <div>
                      <h3 class="text-h6 font-weight-bold">Эра колбэков</h3>
                      <p class="text-body-2">
                        XMLHttpRequest, setTimeout, addEventListener - все на колбэках
                      </p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="grey"
                    size="small"
                    style="margin-bottom: -16px !important"
                  >
                    <template v-slot:opposite>
                      <span class="text-caption">2012</span>
                    </template>
                    <div>
                      <h3 class="text-h6 font-weight-bold">Появление библиотек</h3>
                      <p class="text-body-2">
                        jQuery Deferred, Q, Bluebird - первые попытки решить проблему
                      </p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="grey"
                    size="small"
                    style="margin-bottom: -16px !important"
                  >
                    <template v-slot:opposite>
                      <span class="text-caption">2015</span>
                    </template>
                    <div>
                      <h3 class="text-h6 font-weight-bold">ES6 Promises</h3>
                      <p class="text-body-2">Нативная поддержка промисов в JavaScript</p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="grey"
                    size="small"
                    style="margin-bottom: -16px !important"
                  >
                    <template v-slot:opposite>
                      <span class="text-caption">2017</span>
                    </template>
                    <div>
                      <h3 class="text-h6 font-weight-bold">ES2017 async/await</h3>
                      <p class="text-body-2">Синтаксический сахар для промисов</p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="grey"
                    size="small"
                    style="margin-bottom: -16px !important"
                  >
                    <template v-slot:opposite>
                      <span class="text-caption">2020-2021</span>
                    </template>
                    <div>
                      <h3 class="text-h6 font-weight-bold">Новые методы</h3>
                      <p class="text-body-2">Promise.allSettled (ES2020), Promise.any (ES2021)</p>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы решают промисы?</p>
                <p class="font-weight-regular ma-0">
                  <b>Callback Hell</b> (пирамида doom), сложность обработки ошибок, отсутствие
                  композиции, проблема Inversion of Control - когда мы передаем контроль выполнения
                  внешней функции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Назовите три состояния промиса</p>
                <p class="font-weight-regular ma-0">
                  <b>Pending</b> (ожидание) - начальное состояние, <b>Fulfilled</b> (выполнен) -
                  успешное завершение, <b>Rejected</b> (отклонен) - завершение с ошибкой. Состояние
                  может измениться только один раз.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между .then() и .catch()?</p>
                <p class="font-weight-regular ma-0">
                  <code>.then()</code> обрабатывает успешное выполнение (fulfilled),
                  <code>.catch()</code> - ошибки (rejected). .catch() - это сокращение для
                  .then(undefined, errorHandler). .then() может принимать два аргумента.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что возвращает .then()?</p>
                <p class="font-weight-regular ma-0">
                  .then() всегда возвращает новый промис. Если колбэк возвращает значение - промис
                  resolved с этим значением. Если возвращает промис - возвращается этот промис. Это
                  позволяет строить цепочки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Разница между Promise.all и Promise.allSettled?</p>
                <p class="font-weight-regular ma-0">
                  <code>Promise.all</code> отклоняется при первой ошибке и возвращает массив
                  результатов. <code>Promise.allSettled</code> ждет все промисы и возвращает массив
                  объектов с полями status ('fulfilled'/'rejected') и value/reason.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое microtask queue?</p>
                <p class="font-weight-regular ma-0">
                  Промисы выполняются в microtask queue, которая имеет более высокий приоритет чем
                  обычная task queue (setTimeout, setInterval). Микрозадачи выполняются после
                  текущего кода, но до макрозадач.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли отменить промис?</p>
                <p class="font-weight-regular ma-0">
                  Нет, нативные промисы нельзя отменить. Но можно использовать AbortController для
                  отмены операций (fetch) или создавать cancelable promises через библиотеки или
                  собственную реализацию с флагами отмены.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Паттерны и антипаттерны</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">✅ Хорошие практики</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Всегда обрабатывать ошибки (.catch)</li>
                    <li>Возвращать промисы из .then()</li>
                    <li>Использовать Promise.all для параллельности</li>
                    <li>async/await для читаемости</li>
                    <li>Избегать вложенных .then()</li>
                    <li>Использовать finally для очистки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">❌ Антипаттерны</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Promise constructor antipattern</li>
                    <li>Забывать return в .then()</li>
                    <li>Смешивать промисы и колбэки</li>
                    <li>Неправильная обработка ошибок</li>
                    <li>Создание ненужных промисов</li>
                    <li>try/catch без await</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и память</h2>
            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-speedometer</v-icon>
              <strong>Оптимизация:</strong> Промисы создают замыкания и могут вызывать утечки памяти
              при неправильном использовании. Избегайте создания промисов в циклах без
              необходимости.
            </v-alert>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-memory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Память</h3>
                  <ul class="text-left pl-4">
                    <li>Промисы держат ссылки</li>
                    <li>Замыкания в .then()</li>
                    <li>Утечки через цепочки</li>
                    <li>Очистка в .finally()</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="text-left pl-4">
                    <li>Микрозадачи быстрее</li>
                    <li>Параллельность с .all()</li>
                    <li>Избегать await в циклах</li>
                    <li>Переиспользование промисов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-bug</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Отладка</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте .catch() везде</li>
                    <li>Логирование в .then()</li>
                    <li>Именованные функции</li>
                    <li>DevTools Promise tab</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итоги и выводы</h2>
            <p class="font-weight-regular mb-4">
              <b>Промисы</b> кардинально изменили подход к асинхронному программированию в
              JavaScript:
            </p>

            <ul class="mb-6">
              <li class="mb-2">Решили проблему <b>Callback Hell</b> через линейные цепочки</li>
              <li class="mb-2">Унифицировали обработку ошибок через <code>.catch()</code></li>
              <li class="mb-2">
                Предоставили мощные методы композиции: <code>Promise.all</code>,
                <code>Promise.race</code>
              </li>
              <li class="mb-2">Стали основой для <code>async/await</code> синтаксиса</li>
              <li class="mb-2">Позволили создавать переиспользуемый асинхронный код</li>
              <li class="mb-2">Улучшили читаемость и поддерживаемость кода</li>
            </ul>

            <p class="font-weight-regular mb-6">
              Понимание эволюции от колбэков к промисам помогает лучше понимать современные
              асинхронные паттерны и делает вас более эффективным JavaScript разработчиком.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
                target="_blank"
                class="mr-2"
              >
                MDN Promise Reference
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://javascript.info/async"
                target="_blank"
              >
                JavaScript.info Async
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
