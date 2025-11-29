import type { Question } from '@/types/question.ts'

export const reactUseEffectFlowQuestions: Question[] = [
  // Тема 1: Основы useEffect
  {
    id: 1,
    question: "Что такое useEffect в React?",
    options: [
      "Хук для управления состоянием компонента",
      "Хук для выполнения побочных эффектов в функциональных компонентах",
      "Хук для создания рефов",
      "Хук для мемоизации значений"
    ],
    correctAnswer: 1,
    explanation: "useEffect — это хук, который позволяет выполнять побочные эффекты (side effects) в функциональных компонентах: запросы к API, подписки, изменение DOM, таймеры и т.д.",
    topic: "Основы useEffect"
  },
  {
    id: 2,
    question: "Какие параметры принимает useEffect?",
    options: [
      "Только callback функцию",
      "Callback функцию и массив зависимостей",
      "Массив зависимостей и cleanup функцию",
      "State и setState"
    ],
    correctAnswer: 1,
    explanation: "useEffect принимает два параметра: callback функцию (effect function) и необязательный массив зависимостей (dependency array).",
    topic: "Основы useEffect"
  },
  {
    id: 3,
    question: "Когда выполняется effect без массива зависимостей?\n\nuseEffect(() => {\n  console.log('effect')\n})",
    options: [
      "Только при монтировании",
      "После каждого рендера компонента",
      "Только при размонтировании",
      "Никогда не выполняется"
    ],
    correctAnswer: 1,
    explanation: "Effect без массива зависимостей выполняется после каждого рендера компонента (и после монтирования, и после каждого обновления).",
    topic: "Основы useEffect"
  },
  {
    id: 4,
    question: "Когда выполняется effect с пустым массивом зависимостей?\n\nuseEffect(() => {\n  console.log('effect')\n}, [])",
    options: [
      "После каждого рендера",
      "Только один раз при монтировании",
      "Только при размонтировании",
      "При изменении любого state"
    ],
    correctAnswer: 1,
    explanation: "Effect с пустым массивом зависимостей [] выполняется только один раз — после первого рендера при монтировании компонента.",
    topic: "Основы useEffect"
  },
  {
    id: 5,
    question: "Когда выполняется effect с зависимостями?\n\nuseEffect(() => {\n  console.log('effect')\n}, [count])",
    options: [
      "При монтировании и при изменении count",
      "Только при изменении count",
      "После каждого рендера",
      "Только при размонтировании"
    ],
    correctAnswer: 0,
    explanation: "Effect с зависимостями выполняется при монтировании компонента и каждый раз, когда изменяется хотя бы одна из зависимостей в массиве.",
    topic: "Основы useEffect"
  },

  // Тема 2: Порядок выполнения useEffect
  {
    id: 6,
    question: "В каком порядке выполняются операции при рендере компонента?",
    options: [
      "useEffect → render → DOM update",
      "render → useEffect → DOM update",
      "render → DOM update → useEffect",
      "DOM update → render → useEffect"
    ],
    correctAnswer: 2,
    explanation: "Порядок выполнения: 1) render (вычисление JSX), 2) React обновляет DOM, 3) браузер рисует изменения, 4) useEffect выполняется асинхронно после отрисовки.",
    topic: "Порядок выполнения"
  },
  {
    id: 7,
    question: "Что выведет этот код?\n\nfunction Component() {\n  const [count, setCount] = useState(0)\n  \n  console.log('1: render')\n  \n  useEffect(() => {\n    console.log('2: effect')\n  })\n  \n  return <div>{count}</div>\n}",
    options: [
      "1: render, 2: effect",
      "2: effect, 1: render",
      "1: render (эффект не выполнится)",
      "Выполнятся одновременно"
    ],
    correctAnswer: 0,
    explanation: "Сначала выполнится render (console.log '1: render'), затем после обновления DOM асинхронно выполнится effect (console.log '2: effect').",
    topic: "Порядок выполнения"
  },
  {
    id: 8,
    question: "В чем основное отличие useEffect от useLayoutEffect по времени выполнения?",
    options: [
      "useEffect выполняется до отрисовки, useLayoutEffect после",
      "useEffect выполняется асинхронно после отрисовки, useLayoutEffect синхронно до отрисовки",
      "Нет отличий",
      "useLayoutEffect выполняется только при монтировании"
    ],
    correctAnswer: 1,
    explanation: "useEffect выполняется асинхронно после того, как браузер отрисовал изменения. useLayoutEffect выполняется синхронно после обновления DOM, но до отрисовки браузером.",
    topic: "Порядок выполнения"
  },
  {
    id: 9,
    question: "Блокирует ли useEffect рендеринг компонента?",
    options: [
      "Да, всегда блокирует",
      "Нет, выполняется асинхронно после рендера",
      "Блокирует только при первом рендере",
      "Зависит от массива зависимостей"
    ],
    correctAnswer: 1,
    explanation: "useEffect НЕ блокирует рендеринг и отрисовку. Он выполняется асинхронно после того, как браузер отрисовал изменения, что не замедляет восприятие пользователем.",
    topic: "Порядок выполнения"
  },
  {
    id: 10,
    question: "Что произойдет, если в useEffect изменить state?\n\nuseEffect(() => {\n  setCount(count + 1)\n}, [count])",
    options: [
      "Ошибка компиляции",
      "Бесконечный цикл ре-рендеров",
      "Выполнится один раз",
      "React предотвратит изменение"
    ],
    correctAnswer: 1,
    explanation: "Это создаст бесконечный цикл: effect изменяет count → компонент ре-рендерится → count изменился → effect выполняется снова → и так далее.",
    topic: "Порядок выполнения"
  },

  // Тема 3: Cleanup функция
  {
    id: 11,
    question: "Что такое cleanup функция в useEffect?",
    options: [
      "Функция для очистки state",
      "Функция, возвращаемая из effect для очистки ресурсов",
      "Функция для удаления компонента из DOM",
      "Функция для сброса зависимостей"
    ],
    correctAnswer: 1,
    explanation: "Cleanup функция — это функция, которую можно вернуть из effect. Она используется для очистки ресурсов: отмены подписок, таймеров, отмены запросов и т.д.",
    topic: "Cleanup функция"
  },
  {
    id: 12,
    question: "Когда выполняется cleanup функция?",
    options: [
      "Только при размонтировании компонента",
      "Перед каждым выполнением effect и при размонтировании",
      "После каждого выполнения effect",
      "Только при изменении зависимостей"
    ],
    correctAnswer: 1,
    explanation: "Cleanup функция выполняется: 1) перед каждым следующим выполнением effect (для очистки предыдущего effect), 2) при размонтировании компонента.",
    topic: "Cleanup функция"
  },
  {
    id: 13,
    question: "Что выведет этот код при изменении count с 0 на 1?\n\nuseEffect(() => {\n  console.log('effect', count)\n  return () => console.log('cleanup', count)\n}, [count])",
    options: [
      "effect 0, effect 1",
      "effect 0, cleanup 0, effect 1",
      "cleanup 0, effect 1",
      "effect 1, cleanup 0"
    ],
    correctAnswer: 1,
    explanation: "При монтировании: 'effect 0'. При изменении count: сначала 'cleanup 0' (очистка предыдущего effect), затем 'effect 1' (новый effect).",
    topic: "Cleanup функция"
  },
  {
    id: 14,
    question: "Какое значение count будет в cleanup функции?\n\nconst [count, setCount] = useState(0)\n\nuseEffect(() => {\n  return () => console.log(count)\n}, [])",
    options: [
      "0 (значение при создании closure)",
      "Текущее значение count",
      "undefined",
      "Последнее значение count"
    ],
    correctAnswer: 0,
    explanation: "Cleanup функция создает замыкание на значение count в момент создания effect. С пустым массивом зависимостей effect создается один раз с count = 0, поэтому cleanup всегда видит 0.",
    topic: "Cleanup функция"
  },
  {
    id: 15,
    question: "Как правильно отменить подписку в cleanup?\n\nuseEffect(() => {\n  const subscription = subscribe()\n  // ???\n}, [])",
    options: [
      "Вернуть функцию с вызовом unsubscribe",
      "Вызвать unsubscribe напрямую",
      "Использовать try-finally",
      "Подписка отменится автоматически"
    ],
    correctAnswer: 0,
    explanation: "Правильно: return () => subscription.unsubscribe(). Cleanup функция должна вернуть функцию, которая отменит подписку. Эта функция будет вызвана при размонтировании.",
    topic: "Cleanup функция"
  },

  // Тема 4: useEffect vs методы жизненного цикла
  {
    id: 16,
    question: "Какой аналог componentDidMount в useEffect?",
    options: [
      "useEffect(() => {...})",
      "useEffect(() => {...}, [])",
      "useEffect(() => {...}, [deps])",
      "useLayoutEffect(() => {...})"
    ],
    correctAnswer: 1,
    explanation: "useEffect с пустым массивом зависимостей [] выполняется только один раз при монтировании, что эквивалентно componentDidMount.",
    topic: "useEffect vs Lifecycle"
  },
  {
    id: 17,
    question: "Какой аналог componentDidUpdate в useEffect?",
    options: [
      "useEffect(() => {...})",
      "useEffect(() => {...}, [])",
      "useEffect(() => {...}, [deps])",
      "Нет прямого аналога"
    ],
    correctAnswer: 2,
    explanation: "useEffect с массивом зависимостей [deps] выполняется при изменении зависимостей, что похоже на componentDidUpdate, но также выполняется при монтировании.",
    topic: "useEffect vs Lifecycle"
  },
  {
    id: 18,
    question: "Какой аналог componentWillUnmount в useEffect?",
    options: [
      "useEffect без return",
      "Cleanup функция с пустым массивом зависимостей",
      "useEffect(() => {...}, null)",
      "useLayoutEffect cleanup"
    ],
    correctAnswer: 1,
    explanation: "Cleanup функция в useEffect(() => { return () => {...} }, []) с пустым массивом зависимостей выполнится только при размонтировании, как componentWillUnmount.",
    topic: "useEffect vs Lifecycle"
  },
  {
    id: 19,
    question: "В чем ключевое отличие useEffect от методов жизненного цикла?",
    options: [
      "useEffect выполняется синхронно",
      "useEffect думает не фазами жизненного цикла, а синхронизацией с внешними системами",
      "useEffect работает только с функциональными компонентами",
      "useEffect не может заменить методы жизненного цикла"
    ],
    correctAnswer: 1,
    explanation: "Ключевое различие в ментальной модели: методы жизненного цикла — это фазы (mount/update/unmount), а useEffect — это синхронизация компонента с внешними системами на основе зависимостей.",
    topic: "useEffect vs Lifecycle"
  },
  {
    id: 20,
    question: "Что выведет этот код при клике на кнопку (count: 0 → 1)?\n\nfunction Component() {\n  const [count, setCount] = useState(0)\n  \n  useEffect(() => {\n    console.log('effect', count)\n    return () => console.log('cleanup', count)\n  }, [count])\n  \n  return <button onClick={() => setCount(1)}>Click</button>\n}",
    options: [
      "effect 0, effect 1, cleanup 1",
      "effect 0, cleanup 0, effect 1",
      "cleanup 0, effect 1",
      "effect 1, cleanup 0"
    ],
    correctAnswer: 1,
    explanation: "При монтировании: 'effect 0'. При клике (count меняется на 1): сначала 'cleanup 0' (очистка старого effect), затем 'effect 1' (новый effect с обновленным count).",
    topic: "useEffect vs Lifecycle"
  },

  // Тема 5: Множественные effects
  {
    id: 21,
    question: "Можно ли использовать несколько useEffect в одном компоненте?",
    options: [
      "Нет, только один useEffect на компонент",
      "Да, можно использовать сколько угодно",
      "Да, но не более трех",
      "Только если они имеют разные зависимости"
    ],
    correctAnswer: 1,
    explanation: "В одном компоненте можно использовать неограниченное количество useEffect. Это помогает разделить логику по concerns (подписки, запросы, аналитика и т.д.).",
    topic: "Множественные effects"
  },
  {
    id: 22,
    question: "В каком порядке выполняются несколько useEffect?\n\nuseEffect(() => console.log('A'))\nuseEffect(() => console.log('B'))\nuseEffect(() => console.log('C'))",
    options: [
      "В случайном порядке",
      "C, B, A",
      "A, B, C (в порядке объявления)",
      "Одновременно"
    ],
    correctAnswer: 2,
    explanation: "Множественные effects выполняются в порядке их объявления в коде компонента: сначала A, затем B, затем C.",
    topic: "Множественные effects"
  },
  {
    id: 23,
    question: "Как правильно организовать несколько effects?",
    options: [
      "Объединить всю логику в один большой effect",
      "Разделить по логическим concerns (подписки, запросы, логирование)",
      "Использовать только один effect с условиями внутри",
      "Порядок и количество не имеют значения"
    ],
    correctAnswer: 1,
    explanation: "Лучшая практика — разделять effects по логическим concerns. Каждый effect должен отвечать за одну конкретную задачу: подписку, запрос, аналитику и т.д.",
    topic: "Множественные effects"
  },
  {
    id: 24,
    question: "Что выведет этот код?\n\nfunction Component() {\n  const [a, setA] = useState(0)\n  const [b, setB] = useState(0)\n  \n  useEffect(() => console.log('A'), [a])\n  useEffect(() => console.log('B'), [b])\n  \n  // При клике: setA(1)\n}",
    options: [
      "A, B",
      "Только A",
      "B, A",
      "Ничего не выведет"
    ],
    correctAnswer: 1,
    explanation: "При изменении только 'a' выполнится только первый effect (выведет 'A'). Второй effect с зависимостью [b] не выполнится, так как 'b' не изменилось.",
    topic: "Множественные effects"
  },
  {
    id: 25,
    question: "Выполняются ли cleanup функции разных effects в порядке объявления?",
    options: [
      "Да, в прямом порядке объявления",
      "Нет, в обратном порядке объявления",
      "В случайном порядке",
      "Cleanup функции выполняются одновременно"
    ],
    correctAnswer: 1,
    explanation: "Cleanup функции выполняются в обратном порядке объявления effects. Если effects объявлены A, B, C, то cleanup выполнятся в порядке C, B, A.",
    topic: "Множественные effects"
  },

  // Тема 6: Массив зависимостей
  {
    id: 26,
    question: "Что произойдет, если забыть указать зависимость в массиве?\n\nconst [count, setCount] = useState(0)\nuseEffect(() => {\n  console.log(count)\n}, [])",
    options: [
      "Ошибка компиляции",
      "Effect всегда будет видеть устаревшее значение count",
      "Effect автоматически добавит зависимость",
      "Ничего, все будет работать корректно"
    ],
    correctAnswer: 1,
    explanation: "Effect создает замыкание при первом рендере с count = 0 и больше никогда не обновляется (пустой массив []). Он всегда будет видеть устаревшее значение count = 0.",
    topic: "Массив зависимостей"
  },
  {
    id: 27,
    question: "Как React сравнивает зависимости в массиве?",
    options: [
      "Глубокое сравнение (deep equality)",
      "Поверхностное сравнение Object.is",
      "Строгое равенство ===",
      "По ссылкам в памяти"
    ],
    correctAnswer: 1,
    explanation: "React использует Object.is для сравнения зависимостей. Это похоже на ===, но с особой обработкой NaN и +0/-0. Объекты и массивы сравниваются по ссылке.",
    topic: "Массив зависимостей"
  },
  {
    id: 28,
    question: "Что произойдет с этим effect?\n\nconst obj = { id: 1 }\nuseEffect(() => {\n  console.log(obj)\n}, [obj])",
    options: [
      "Выполнится один раз",
      "Выполнится при каждом рендере",
      "Ошибка компиляции",
      "React предупредит о проблеме"
    ],
    correctAnswer: 1,
    explanation: "На каждом рендере создается новый объект obj с новой ссылкой. React сравнивает объекты по ссылке, поэтому видит изменение и выполняет effect при каждом рендере.",
    topic: "Массив зависимостей"
  },
  {
    id: 29,
    question: "Как правильно использовать функцию в зависимостях?\n\nfunction getData() { return data }\nuseEffect(() => {\n  getData()\n}, [???])",
    options: [
      "Передать функцию: [getData]",
      "Обернуть в useCallback и передать: [getData]",
      "Не передавать функцию в зависимости",
      "Создать функцию внутри effect"
    ],
    correctAnswer: 1,
    explanation: "Функция пересоздается при каждом рендере. Лучше обернуть её в useCallback с нужными зависимостями, затем передать мемоизированную функцию в зависимости effect.",
    topic: "Массив зависимостей"
  },
  {
    id: 30,
    question: "Нужно ли добавлять setState в зависимости useEffect?",
    options: [
      "Да, всегда нужно",
      "Нет, setState стабильна между рендерами",
      "Только при использовании с другими зависимостями",
      "Зависит от версии React"
    ],
    correctAnswer: 1,
    explanation: "setState функция от useState стабильна и не меняется между рендерами. React гарантирует её стабильность, поэтому её не нужно добавлять в массив зависимостей.",
    topic: "Массив зависимостей"
  },

  // Тема 7: Асинхронность в useEffect
  {
    id: 31,
    question: "Можно ли сделать callback useEffect асинхронным?\n\nuseEffect(async () => {\n  await fetchData()\n}, [])",
    options: [
      "Да, это корректный код",
      "Нет, callback не может быть async",
      "Да, но только с await внутри",
      "Зависит от версии React"
    ],
    correctAnswer: 1,
    explanation: "Callback useEffect не может быть async, так как должен возвращать либо undefined, либо cleanup функцию. Async функция возвращает Promise. Нужно создать async функцию внутри effect.",
    topic: "Асинхронность"
  },
  {
    id: 32,
    question: "Как правильно использовать async/await в useEffect?",
    options: [
      "useEffect(async () => {...})",
      "Создать async функцию внутри effect и вызвать её",
      "Использовать .then() вместо async/await",
      "Нельзя использовать асинхронный код в useEffect"
    ],
    correctAnswer: 1,
    explanation: "Правильный способ: useEffect(() => { async function fetchData() { await ... } fetchData() }, []). Создаем async функцию внутри effect и сразу вызываем её.",
    topic: "Асинхронность"
  },
  {
    id: 33,
    question: "Какая проблема с этим кодом?\n\nuseEffect(() => {\n  async function fetchData() {\n    const data = await fetch('/api')\n    setState(data)\n  }\n  fetchData()\n}, [])",
    options: [
      "Синтаксическая ошибка",
      "Race condition: setState может вызваться после размонтирования",
      "Нельзя использовать async в useEffect",
      "Код корректен"
    ],
    correctAnswer: 1,
    explanation: "Если компонент размонтируется до завершения запроса, setState будет вызван на размонтированном компоненте. Нужна проверка с помощью флага или AbortController.",
    topic: "Асинхронность"
  },
  {
    id: 34,
    question: "Как предотвратить setState после размонтирования?\n\nuseEffect(() => {\n  async function fetchData() {\n    const data = await fetch('/api')\n    setState(data)\n  }\n  fetchData()\n}, [])",
    options: [
      "Использовать try-catch",
      "Использовать флаг isMounted в cleanup",
      "Использовать AbortController",
      "Оба варианта: флаг или AbortController корректны"
    ],
    correctAnswer: 3,
    explanation: "Правильные решения: 1) Флаг let isMounted = true и проверка before setState, 2) AbortController для отмены запроса. В cleanup: isMounted = false или controller.abort().",
    topic: "Асинхронность"
  },
  {
    id: 35,
    question: "Как правильно отменить fetch запрос в cleanup?\n\nuseEffect(() => {\n  fetch('/api').then(setState)\n  return () => ???\n}, [])",
    options: [
      "Нельзя отменить fetch",
      "Использовать AbortController",
      "Использовать clearTimeout",
      "Запрос отменится автоматически"
    ],
    correctAnswer: 1,
    explanation: "Правильно: const controller = new AbortController(); fetch('/api', { signal: controller.signal }); return () => controller.abort(). Это отменит запрос при размонтировании.",
    topic: "Асинхронность"
  },

  // Тема 8: Частые ошибки и антипаттерны
  {
    id: 36,
    question: "Что не так с этим кодом?\n\nuseEffect(() => {\n  document.title = `Count: ${count}`\n})",
    options: [
      "Нет массива зависимостей — effect выполнится при каждом рендере",
      "Синтаксическая ошибка",
      "Нельзя изменять document в effect",
      "Код полностью корректен"
    ],
    correctAnswer: 0,
    explanation: "Отсутствие массива зависимостей означает, что effect будет выполняться после каждого рендера компонента, даже если count не изменился. Нужно: useEffect(() => {...}, [count]).",
    topic: "Частые ошибки"
  },
  {
    id: 37,
    question: "Что произойдет с этим кодом?\n\nconst [count, setCount] = useState(0)\nuseEffect(() => {\n  setInterval(() => setCount(count + 1), 1000)\n}, [])",
    options: [
      "Count будет увеличиваться каждую секунду",
      "Count увеличится только до 1 и остановится",
      "Бесконечный цикл рендеров",
      "Ошибка компиляции"
    ],
    correctAnswer: 1,
    explanation: "Effect создает замыкание с count = 0 (пустой массив []). setInterval всегда видит count = 0 и устанавливает count = 1. Нужно: setCount(c => c + 1) или добавить count в зависимости.",
    topic: "Частые ошибки"
  },
  {
    id: 38,
    question: "В чем проблема этого кода?\n\nuseEffect(() => {\n  const timer = setInterval(() => {...}, 1000)\n}, [])",
    options: [
      "Синтаксическая ошибка",
      "Утечка памяти: интервал не очищается",
      "setInterval нельзя использовать в useEffect",
      "Код корректен"
    ],
    correctAnswer: 1,
    explanation: "Интервал создается при монтировании, но никогда не очищается. При размонтировании компонента интервал продолжит работать (memory leak). Нужен cleanup: return () => clearInterval(timer).",
    topic: "Частые ошибки"
  },
  {
    id: 39,
    question: "Что не так с этим паттерном?\n\nif (someCondition) {\n  useEffect(() => {...})\n}",
    options: [
      "Условный вызов хуков нарушает Rules of Hooks",
      "Синтаксическая ошибка",
      "useEffect не может быть в условном блоке",
      "Код корректен"
    ],
    correctAnswer: 0,
    explanation: "Rules of Hooks: хуки должны вызываться на верхнем уровне компонента, всегда в одинаковом порядке. Условные вызовы нарушают это правило. Условие должно быть внутри effect.",
    topic: "Частые ошибки"
  },
  {
    id: 40,
    question: "Как избежать бесконечного цикла в этом коде?\n\nconst [data, setData] = useState({})\nuseEffect(() => {\n  fetch('/api').then(res => setData(res))\n}, [data])",
    options: [
      "Убрать data из зависимостей или использовать useMemo",
      "Добавить условие внутри effect",
      "Использовать useRef вместо useState",
      "Изменить порядок хуков"
    ],
    correctAnswer: 0,
    explanation: "setData создает новый объект data → effect видит изменение → делает запрос → setData снова создает объект → бесконечный цикл. Решение: убрать data из зависимостей [] или использовать конкретные поля.",
    topic: "Частые ошибки"
  }
]
