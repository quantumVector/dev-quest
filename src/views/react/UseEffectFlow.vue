<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const lifecycleClassSnippet = `
// Классовый компонент с методами жизненного цикла
class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  // 1. componentDidMount - после монтирования
  componentDidMount() {
    console.log('Component mounted')
    this.fetchUser(this.props.userId)
  }

  // 2. componentDidUpdate - после обновления
  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated')
    // Проверяем изменился ли userId
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId)
    }
  }

  // 3. componentWillUnmount - перед размонтированием
  componentWillUnmount() {
    console.log('Component will unmount')
    // Отменяем запросы, таймеры, подписки
    this.cancelRequests()
  }

  fetchUser(userId) {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
  }

  cancelRequests() {
    // Логика отмены
  }

  render() {
    return <div>{this.state.user?.name}</div>
  }
}
`

const useEffectBasicSnippet = `
// Функциональный компонент с useEffect
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  // useEffect объединяет три метода жизненного цикла
  useEffect(() => {
    console.log('Effect running')

    // componentDidMount + componentDidUpdate
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(user => setUser(user))

    // componentWillUnmount (cleanup)
    return () => {
      console.log('Cleanup running')
      // Отменяем запросы, таймеры, подписки
    }
  }, [userId]) // Зависимости - когда перезапускать эффект

  return <div>{user?.name}</div>
}
`

const effectFlowSnippet = `
// Полный Flow выполнения useEffect
function Component({ prop }) {
  const [state, setState] = useState(0)

  useEffect(() => {
    console.log('1. Effect body executing')

    // Подписка, таймер, запрос и т.д.
    const timer = setInterval(() => {
      console.log('Timer tick')
    }, 1000)

    // Cleanup function
    return () => {
      console.log('2. Cleanup executing')
      clearInterval(timer)
    }
  }, [prop, state]) // Dependencies

  return <div onClick={() => setState(s => s + 1)}>Click me</div>
}

/*
ПОРЯДОК ВЫПОЛНЕНИЯ:

1. Первый рендер (монтирование):
   - Render
   - DOM update
   - Browser paint
   - Effect body executing ✅

2. Обновление (prop или state изменились):
   - Render
   - DOM update
   - Browser paint
   - Cleanup executing ✅ (от предыдущего эффекта!)
   - Effect body executing ✅ (новый эффект)

3. Размонтирование:
   - Cleanup executing ✅ (финальная очистка)
*/
`

const cleanupTimingSnippet = `
// Детальное понимание момента вызова cleanup

function DetailedFlow({ id }) {
  console.log('RENDER started')

  useEffect(() => {
    console.log('EFFECT: setup for id =', id)

    return () => {
      console.log('CLEANUP: cleaning up id =', id)
    }
  }, [id])

  console.log('RENDER ended')

  return <div>ID: {id}</div>
}

/*
СЦЕНАРИЙ 1: Монтирование (id = 1)
----------------------------------
RENDER started
RENDER ended
[DOM обновился, браузер отрисовал]
EFFECT: setup for id = 1

СЦЕНАРИЙ 2: Обновление (id меняется с 1 на 2)
----------------------------------------------
RENDER started
RENDER ended
[DOM обновился, браузер отрисовал]
CLEANUP: cleaning up id = 1  ← старый cleanup!
EFFECT: setup for id = 2      ← новый setup!

СЦЕНАРИЙ 3: Размонтирование
----------------------------
[Компонент удаляется]
CLEANUP: cleaning up id = 2  ← финальный cleanup

КРИТИЧЕСКИ ВАЖНО:
- Cleanup вызывается ПОСЛЕ отрисовки DOM
- Cleanup получает значения из ПРЕДЫДУЩЕГО рендера (замыкание!)
- Cleanup вызывается ПЕРЕД новым эффектом
*/
`

const dependenciesSnippet = `
// Массив зависимостей контролирует когда эффект перезапускается

// 1. БЕЗ ЗАВИСИМОСТЕЙ - эффект на каждый рендер
useEffect(() => {
  console.log('Runs on every render')
  // ⚠️ Обычно это ошибка!
})

// 2. ПУСТОЙ МАССИВ - эффект только при монтировании
useEffect(() => {
  console.log('Runs once on mount')
  return () => console.log('Cleanup on unmount')
}, []) // ✅ Эквивалент componentDidMount + componentWillUnmount

// 3. С ЗАВИСИМОСТЯМИ - эффект когда зависимости меняются
useEffect(() => {
  console.log('Runs when userId or filter changes')
  fetchData(userId, filter)
}, [userId, filter]) // ✅ Перезапуск при изменении userId или filter

// 4. НЕСКОЛЬКО ЭФФЕКТОВ - разделяем логику
useEffect(() => {
  // Эффект для userId
  fetchUser(userId)
}, [userId])

useEffect(() => {
  // Отдельный эффект для подписки
  const subscription = subscribeToNotifications()
  return () => subscription.unsubscribe()
}, []) // Независимая логика

// ПРАВИЛО: Все используемые значения должны быть в зависимостях!
`

const cleanupExamplesSnippet = `
// Практические примеры cleanup

// 1. Отмена fetch запроса
useEffect(() => {
  const controller = new AbortController()

  fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') {
        console.error(err)
      }
    })

  return () => {
    controller.abort() // Отменяем запрос при изменении userId
  }
}, [userId])

// 2. Очистка таймера
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Delayed action')
  }, 1000)

  return () => {
    clearTimeout(timer) // Очищаем таймер
  }
}, [dependency])

// 3. Очистка интервала
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1)
  }, 1000)

  return () => {
    clearInterval(interval)
  }
}, []) // Запускается один раз

// 4. Отписка от событий
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])

// 5. WebSocket подключение
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080')

  ws.onmessage = (event) => {
    setMessages(prev => [...prev, event.data])
  }

  return () => {
    ws.close() // Закрываем соединение
  }
}, [])

// 6. Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      setIsVisible(entry.isIntersecting)
    })
  })

  if (elementRef.current) {
    observer.observe(elementRef.current)
  }

  return () => {
    observer.disconnect() // Отключаем наблюдатель
  }
}, [])
`

const closureTrapSnippet = `
// Проблема замыкания в cleanup

function Counter() {
  const [count, setCount] = useState(0)

  // ❌ ПРОБЛЕМА: cleanup видит старое значение count
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Count:', count) // Всегда будет 0!
      setCount(count + 1) // Перезаписывает, а не инкрементирует
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, []) // Пустые зависимости - count "заморожен"

  // ✅ РЕШЕНИЕ 1: Функциональное обновление
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1) // Получаем актуальное значение
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ✅ РЕШЕНИЕ 2: Добавить в зависимости
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Count:', count) // Актуальное значение
    }, 1000)

    return () => clearInterval(interval)
  }, [count]) // Перезапускается при каждом изменении

  // ✅ РЕШЕНИЕ 3: useRef для актуального значения
  const countRef = useRef(count)

  useEffect(() => {
    countRef.current = count
  })

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Count:', countRef.current) // Всегда актуальное
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div>{count}</div>
}
`

const vsLifecycleSnippet = `
// Ключевые различия useEffect vs методы жизненного цикла

/*
МЕТОДЫ ЖИЗНЕННОГО ЦИКЛА (Классы)
=================================

ОСОБЕННОСТИ:
- Императивный подход
- Разделение по фазам (mount, update, unmount)
- Одна логика размазана по трем методам
- Синхронное выполнение (блокирует)
- Сложнее переиспользовать
*/

class OldWay extends React.Component {
  componentDidMount() {
    this.subscribe()     // Подписка
    this.fetchData()     // Загрузка данных
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.unsubscribe() // Нужно помнить очистить
      this.subscribe()   // И подписаться заново
      this.fetchData()   // И загрузить данные
    }
  }

  componentWillUnmount() {
    this.unsubscribe()   // Очистка
  }

  // Логика подписки дублируется в трех местах!
}

/*
useEffect (Хуки)
================

ОСОБЕННОСТИ:
- Декларативный подход
- Группировка по логике (не по фазам)
- Одна логика в одном месте
- Асинхронное выполнение (не блокирует отрисовку)
- Легко переиспользовать (кастомные хуки)
*/

function NewWay({ id }) {
  useEffect(() => {
    const sub = subscribe()
    fetchData(id)

    return () => sub.unsubscribe()
    // Вся логика в одном месте!
  }, [id]) // Автоматическая очистка и повтор при изменении
}

/*
TIMING РАЗЛИЧИЯ:
================

componentDidMount/Update:
- Выполняются СИНХРОННО после рендера
- БЛОКИРУЮТ отрисовку браузера
- Пользователь видит задержку

useEffect:
- Выполняется АСИНХРОННО после отрисовки
- НЕ блокирует браузер
- Пользователь видит UI быстрее

useLayoutEffect:
- Выполняется СИНХРОННО (как componentDidMount)
- Блокирует отрисовку
- Для критичных DOM измерений
*/
`

const executionOrderSnippet = `
// Порядок выполнения нескольких эффектов

function MultipleEffects({ prop }) {
  const [state1, setState1] = useState(0)
  const [state2, setState2] = useState(0)

  console.log('1. RENDER')

  useEffect(() => {
    console.log('2. Effect A - setup')
    return () => console.log('3. Effect A - cleanup')
  }, [prop])

  useEffect(() => {
    console.log('4. Effect B - setup')
    return () => console.log('5. Effect B - cleanup')
  }, [state1])

  useEffect(() => {
    console.log('6. Effect C - setup')
    return () => console.log('7. Effect C - cleanup')
  }, [state2])

  return <div>Content</div>
}

/*
ПЕРВЫЙ РЕНДЕР (монтирование):
1. RENDER
[DOM обновился, браузер отрисовал]
2. Effect A - setup
4. Effect B - setup
6. Effect C - setup

ОБНОВЛЕНИЕ (prop изменился, state1 изменился):
1. RENDER
[DOM обновился, браузер отрисовал]
3. Effect A - cleanup  ← cleanup от предыдущего
5. Effect B - cleanup  ← cleanup от предыдущего
2. Effect A - setup    ← новый setup
4. Effect B - setup    ← новый setup
(Effect C не перезапускается - state2 не изменился)

РАЗМОНТИРОВАНИЕ:
3. Effect A - cleanup
5. Effect B - cleanup
7. Effect C - cleanup

ВАЖНО:
- Эффекты выполняются в порядке объявления
- Cleanup выполняются в том же порядке
- Cleanup ВСЕГДА перед новым setup
*/
`

const commonMistakesSnippet = `
// Частые ошибки при работе с useEffect

// ❌ ОШИБКА 1: Забыли cleanup
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick')
  }, 1000)
  // Нет return - интервал продолжает работать после размонтирования!
}, [])

// ✅ ПРАВИЛЬНО
useEffect(() => {
  const interval = setInterval(() => {
    console.log('Tick')
  }, 1000)
  return () => clearInterval(interval)
}, [])

// ❌ ОШИБКА 2: Неправильные зависимости
useEffect(() => {
  fetchUser(userId) // Используется userId
}, []) // Но нет в зависимостях! ESLint предупредит

// ✅ ПРАВИЛЬНО
useEffect(() => {
  fetchUser(userId)
}, [userId])

// ❌ ОШИБКА 3: Объект в зависимостях
useEffect(() => {
  console.log(user)
}, [user]) // Объект всегда новая ссылка - бесконечный цикл!

// ✅ ПРАВИЛЬНО: Деструктуризация
useEffect(() => {
  console.log(user.id, user.name)
}, [user.id, user.name])

// ❌ ОШИБКА 4: Асинхронная функция напрямую
useEffect(async () => {  // ❌ async нельзя!
  const data = await fetchData()
  setData(data)
}, [])

// ✅ ПРАВИЛЬНО: Async функция внутри
useEffect(() => {
  async function loadData() {
    const data = await fetchData()
    setData(data)
  }
  loadData()
}, [])

// ИЛИ с IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData()
    setData(data)
  })()
}, [])

// ❌ ОШИБКА 5: Условный эффект
if (condition) {
  useEffect(() => {  // ❌ Хуки нельзя вызывать условно!
    // ...
  }, [])
}

// ✅ ПРАВИЛЬНО: Условие внутри эффекта
useEffect(() => {
  if (condition) {
    // ...
  }
}, [condition])

// ❌ ОШИБКА 6: Изменение state в рендере
function BadComponent() {
  const [count, setCount] = useState(0)

  setCount(count + 1) // ❌ Бесконечный цикл!

  return <div>{count}</div>
}

// ✅ ПРАВИЛЬНО: В эффекте или обработчике
function GoodComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(count + 1) // ✅ В эффекте
  }, [])

  return <div onClick={() => setCount(c => c + 1)}>{count}</div>
}
`

const highlightedLifecycleClass = ref('')
const highlightedUseEffectBasic = ref('')
const highlightedEffectFlow = ref('')
const highlightedCleanupTiming = ref('')
const highlightedDependencies = ref('')
const highlightedCleanupExamples = ref('')
const highlightedClosureTrap = ref('')
const highlightedVsLifecycle = ref('')
const highlightedExecutionOrder = ref('')
const highlightedCommonMistakes = ref('')

onMounted(() => {
  highlightedLifecycleClass.value = Prism.highlight(lifecycleClassSnippet, Prism.languages.javascript, 'javascript')
  highlightedUseEffectBasic.value = Prism.highlight(useEffectBasicSnippet, Prism.languages.javascript, 'javascript')
  highlightedEffectFlow.value = Prism.highlight(effectFlowSnippet, Prism.languages.javascript, 'javascript')
  highlightedCleanupTiming.value = Prism.highlight(cleanupTimingSnippet, Prism.languages.javascript, 'javascript')
  highlightedDependencies.value = Prism.highlight(dependenciesSnippet, Prism.languages.javascript, 'javascript')
  highlightedCleanupExamples.value = Prism.highlight(cleanupExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedClosureTrap.value = Prism.highlight(closureTrapSnippet, Prism.languages.javascript, 'javascript')
  highlightedVsLifecycle.value = Prism.highlight(vsLifecycleSnippet, Prism.languages.javascript, 'javascript')
  highlightedExecutionOrder.value = Prism.highlight(executionOrderSnippet, Prism.languages.javascript, 'javascript')
  highlightedCommonMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              useEffect Flow: различия с жизненным циклом и cleanup
            </h1>

            <p class="font-weight-regular mb-6">
              <b>useEffect</b> — это хук, который объединяет три метода жизненного цикла классовых компонентов:
              componentDidMount, componentDidUpdate и componentWillUnmount. Понимание flow выполнения и момента
              вызова cleanup критически важно для правильной работы с побочными эффектами в React.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Классовые компоненты: методы жизненного цикла</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLifecycleClass"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Функциональные компоненты: useEffect</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseEffectBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Flow выполнения useEffect</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевой момент:</strong> Эффекты выполняются ПОСЛЕ отрисовки DOM в браузере, не блокируя UI.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEffectFlow"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда вызывается cleanup?</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Cleanup вызывается ПОСЛЕ отрисовки нового DOM, но ПЕРЕД выполнением нового эффекта!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCleanupTiming"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Три момента вызова cleanup</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-refresh</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">1. Перед повторным эффектом</h3>
                  <p class="text-body-2">
                    Когда зависимости изменились, cleanup вызывается ПЕРЕД запуском нового эффекта.
                    Это предотвращает утечки памяти.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">2. При размонтировании</h3>
                  <p class="text-body-2">
                    Когда компонент удаляется из DOM, cleanup вызывается для финальной очистки
                    ресурсов.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-update</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">3. В Strict Mode (дважды)</h3>
                  <p class="text-body-2">
                    В режиме разработки React вызывает setup → cleanup → setup дважды
                    для выявления проблем.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Массив зависимостей</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDependencies"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры cleanup</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCleanupExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема замыкания в cleanup</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Частая ошибка:</strong> Cleanup "видит" значения из момента создания эффекта (замыкание)!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedClosureTrap"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useEffect vs Методы жизненного цикла</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVsLifecycle"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">Методы жизненного цикла</th>
                <th class="text-left font-weight-bold">useEffect</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Подход</b></td>
                <td>Императивный (что делать)</td>
                <td>Декларативный (какой результат)</td>
              </tr>
              <tr>
                <td><b>Группировка</b></td>
                <td>По фазам (mount, update, unmount)</td>
                <td>По логике (вся логика в одном месте)</td>
              </tr>
              <tr>
                <td><b>Timing</b></td>
                <td>Синхронно (блокирует отрисовку)</td>
                <td>Асинхронно (не блокирует UI)</td>
              </tr>
              <tr>
                <td><b>Cleanup</b></td>
                <td>componentWillUnmount</td>
                <td>return функция</td>
              </tr>
              <tr>
                <td><b>Условная логика</b></td>
                <td>if внутри методов</td>
                <td>Массив зависимостей</td>
              </tr>
              <tr>
                <td><b>Переиспользование</b></td>
                <td>HOC, Render Props</td>
                <td>Кастомные хуки</td>
              </tr>
              <tr>
                <td><b>Сложность</b></td>
                <td>Высокая (логика размазана)</td>
                <td>Низкая (логика в одном месте)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Порядок выполнения нескольких эффектов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedExecutionOrder"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommonMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В какой момент вызывается cleanup функция?</p>
                <p class="font-weight-regular ma-0">
                  Cleanup вызывается в трех случаях: (1) Перед повторным запуском эффекта при изменении зависимостей,
                  (2) При размонтировании компонента, (3) Дважды в Strict Mode в разработке.
                  Критически важно: cleanup вызывается ПОСЛЕ отрисовки DOM, но ПЕРЕД новым эффектом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем useEffect отличается от componentDidMount?</p>
                <p class="font-weight-regular ma-0">
                  componentDidMount выполняется синхронно и блокирует отрисовку браузера.
                  useEffect выполняется асинхронно после отрисовки, не блокируя UI.
                  Для синхронного поведения используется useLayoutEffect.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет если не указать зависимости?</p>
                <p class="font-weight-regular ma-0">
                  Без массива зависимостей эффект будет запускаться после каждого рендера.
                  Пустой массив [] означает запуск только при монтировании.
                  С зависимостями — запуск при их изменении. ESLint предупредит о забытых зависимостях.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему нельзя использовать async функцию в useEffect напрямую?</p>
                <p class="font-weight-regular ma-0">
                  useEffect ожидает либо undefined, либо cleanup функцию. Async функция возвращает Promise,
                  что вызовет ошибку. Решение: создать async функцию внутри эффекта и вызвать её.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как избежать проблемы замыкания в cleanup?</p>
                <p class="font-weight-regular ma-0">
                  Cleanup "видит" значения из момента создания эффекта. Решения: (1) Функциональное обновление
                  setState(prev => prev + 1), (2) Добавить значение в зависимости, (3) Использовать useRef
                  для хранения актуального значения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В каком порядке выполняются несколько useEffect?</p>
                <p class="font-weight-regular ma-0">
                  Эффекты выполняются в порядке их объявления в коде. Cleanup также выполняются в том же порядке.
                  При обновлении сначала все cleanup, потом все новые setup в порядке объявления.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать useEffect vs useLayoutEffect?</p>
                <p class="font-weight-regular ma-0">
                  useEffect для большинства случаев (не блокирует UI). useLayoutEffect когда нужно измерить DOM
                  или синхронно обновить стили перед отрисовкой (редко). useLayoutEffect эквивалент
                  componentDidMount/Update по timing.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Всегда возвращать cleanup функцию</li>
                    <li>Указывать все зависимости</li>
                    <li>Разделять логику на несколько эффектов</li>
                    <li>Использовать ESLint правила</li>
                    <li>Тестировать cleanup логику</li>
                    <li>Выносить в кастомные хуки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Забывать cleanup функцию</li>
                    <li>Игнорировать предупреждения ESLint</li>
                    <li>async функции напрямую</li>
                    <li>Объекты в зависимостях</li>
                    <li>Условные вызовы хуков</li>
                    <li>Изменение state в рендере</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте AbortController для fetch</li>
                    <li>useRef для актуальных значений</li>
                    <li>Функциональное обновление setState</li>
                    <li>React DevTools для отладки</li>
                    <li>Strict Mode в разработке</li>
                    <li>Документируйте сложные эффекты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Диаграмма жизненного цикла</h2>
            <v-card class="pa-6 mb-8 bg-blue-grey-lighten-5">
              <h3 class="text-h6 font-weight-bold mb-3">Полный Flow useEffect</h3>
              <div class="mb-4">
                <div class="d-flex align-center mb-2">
                  <v-icon color="primary" class="mr-2">mdi-numeric-1-circle</v-icon>
                  <strong>Монтирование:</strong>
                </div>
                <div class="ml-8">
                  Render → Commit to DOM → Browser Paint → <span class="text-success font-weight-bold">Effect Setup</span>
                </div>
              </div>
              <div class="mb-4">
                <div class="d-flex align-center mb-2">
                  <v-icon color="warning" class="mr-2">mdi-numeric-2-circle</v-icon>
                  <strong>Обновление:</strong>
                </div>
                <div class="ml-8">
                  Render → Commit to DOM → Browser Paint → <span class="text-error font-weight-bold">Old Cleanup</span> → <span class="text-success font-weight-bold">New Setup</span>
                </div>
              </div>
              <div>
                <div class="d-flex align-center mb-2">
                  <v-icon color="error" class="mr-2">mdi-numeric-3-circle</v-icon>
                  <strong>Размонтирование:</strong>
                </div>
                <div class="ml-8">
                  <span class="text-error font-weight-bold">Final Cleanup</span>
                </div>
              </div>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>useEffect</b> объединяет три метода жизненного цикла классовых компонентов, но работает декларативно
              и асинхронно. <b>Cleanup функция</b> вызывается в трех случаях: перед повторным эффектом, при размонтировании
              и дважды в Strict Mode. Ключевое отличие от методов жизненного цикла — группировка логики по назначению,
              а не по фазам, и асинхронное выполнение, не блокирующее UI. Понимание этих концепций критически важно
              для правильной работы с побочными эффектами в React.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useEffect"
                target="_blank"
                class="mr-2">
                React Docs: useEffect
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/synchronizing-with-effects"
                target="_blank">
                Synchronizing with Effects
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
