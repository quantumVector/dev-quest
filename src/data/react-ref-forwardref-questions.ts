import type { Question } from '@/types/question.ts'

export const reactRefForwardRefQuestions: Question[] = [
  // Тема 1: Основы useRef
  {
    id: 1,
    question: "Что такое useRef в React?",
    options: [
      "Hook для создания состояния компонента",
      "Hook для создания изменяемой ссылки, которая сохраняется между рендерами",
      "Hook для создания побочных эффектов",
      "Hook для мемоизации значений"
    ],
    correctAnswer: 1,
    explanation: "useRef возвращает изменяемый ref-объект, свойство .current которого инициализируется переданным аргументом. Возвращённый объект будет сохраняться в течение всего времени жизни компонента.",
    topic: "Основы useRef"
  },
  {
    id: 2,
    question: "Какой основной сценарий использования useRef в React, кроме доступа к DOM-элементам?",
    options: [
      "Управление состоянием формы",
      "Хранение изменяемого значения, которое не вызывает ре-рендер при изменении",
      "Создание побочных эффектов",
      "Оптимизация производительности вычислений"
    ],
    correctAnswer: 1,
    explanation: "useRef можно использовать для хранения любого изменяемого значения (например, таймеры, предыдущие значения props/state, счётчики), которое должно сохраняться между рендерами, но не должно вызывать ре-рендер при изменении.",
    topic: "Основы useRef"
  },
  {
    id: 3,
    question: "Что произойдёт при изменении значения ref.current?",
    options: [
      "Компонент перерендерится автоматически",
      "Компонент НЕ перерендерится",
      "Произойдёт ошибка",
      "Значение будет сброшено при следующем рендере"
    ],
    correctAnswer: 1,
    explanation: "Изменение ref.current не вызывает ре-рендер компонента. Это ключевое отличие от useState — ref используется для хранения изменяемых данных, которые не должны триггерить обновление UI.",
    topic: "Основы useRef"
  },
  {
    id: 4,
    question: "Какое начальное значение будет у ref при таком объявлении: const ref = useRef()?",
    options: [
      "null",
      "undefined",
      "{}",
      "Ошибка компиляции"
    ],
    correctAnswer: 1,
    explanation: "Если useRef вызывается без аргумента, начальное значение ref.current будет undefined. Обычно рекомендуется явно передавать null для DOM-рефов: useRef(null).",
    topic: "Основы useRef"
  },
  {
    id: 5,
    question: "Можно ли использовать useRef для хранения предыдущего значения props или state?",
    options: [
      "Нет, useRef только для DOM-элементов",
      "Да, это распространённый паттерн",
      "Да, но только для props",
      "Нет, для этого нужен useState"
    ],
    correctAnswer: 1,
    explanation: "Распространённый паттерн — использовать useRef с useEffect для сохранения предыдущего значения: useEffect(() => { prevValueRef.current = value; }). Это не вызывает лишних рендеров.",
    topic: "Основы useRef"
  },
  {
    id: 6,
    question: "В чём разница между useRef и createRef?",
    options: [
      "Никакой разницы нет",
      "useRef для функциональных компонентов, createRef для классовых",
      "createRef создаёт новый ref при каждом рендере, useRef сохраняет один и тот же",
      "useRef работает только с DOM, createRef с любыми значениями"
    ],
    correctAnswer: 2,
    explanation: "createRef создаёт новый ref-объект при каждом вызове (использовался в классовых компонентах). useRef возвращает один и тот же ref-объект на протяжении всей жизни компонента.",
    topic: "Основы useRef"
  },

  // Тема 2: Работа с DOM через useRef
  {
    id: 7,
    question: "Как правильно получить DOM-элемент с помощью useRef?",
    options: [
      "const ref = useRef(); <div ref={ref} />; ref.value",
      "const ref = useRef(null); <div ref={ref} />; ref.current",
      "const ref = useRef(); <div ref={ref.current} />",
      "const ref = createRef(); <div ref={ref} />"
    ],
    correctAnswer: 1,
    explanation: "Правильный паттерн: создать ref с useRef(null), передать его в атрибут ref элемента, затем обращаться к DOM через ref.current.",
    topic: "DOM через useRef"
  },
  {
    id: 8,
    question: "Когда ref.current будет содержать DOM-элемент после монтирования компонента?",
    options: [
      "Сразу после объявления useRef",
      "После завершения рендера, но до useEffect",
      "После выполнения useLayoutEffect и перед useEffect",
      "Только после useEffect"
    ],
    correctAnswer: 2,
    explanation: "React устанавливает ref.current после того, как компонент отрендерился в DOM, но до вызова useEffect. useLayoutEffect уже имеет доступ к актуальному DOM, а useEffect вызывается позже.",
    topic: "DOM через useRef"
  },
  {
    id: 9,
    question: "Почему не рекомендуется читать или писать ref.current во время рендера?",
    options: [
      "Это вызовет ошибку",
      "ref.current ещё не инициализирован",
      "Это делает поведение компонента непредсказуемым и нарушает принципы React",
      "ref.current доступен только в useEffect"
    ],
    correctAnswer: 2,
    explanation: "Чтение/запись ref.current во время рендера нарушает принцип чистоты функции рендера. Ref должен использоваться в обработчиках событий или эффектах, где побочные эффекты допустимы.",
    topic: "DOM через useRef"
  },
  {
    id: 10,
    question: "Можно ли передать ref на кастомный функциональный компонент без дополнительной настройки?",
    options: [
      "Да, React автоматически пробросит ref",
      "Нет, нужно использовать forwardRef",
      "Да, но только если компонент возвращает один элемент",
      "Нет, ref работает только с DOM-элементами"
    ],
    correctAnswer: 1,
    explanation: "Без forwardRef нельзя передать ref на функциональный компонент. React выдаст предупреждение. Для проброса ref в функциональные компоненты необходимо использовать React.forwardRef.",
    topic: "DOM через useRef"
  },
  {
    id: 11,
    question: "Что произойдёт, если попытаться изменить DOM напрямую через ref во время рендера?",
    options: [
      "Изменения применятся корректно",
      "React выдаст ошибку",
      "Это может привести к непредсказуемому поведению и конфликтам с React",
      "Изменения будут отменены React"
    ],
    correctAnswer: 2,
    explanation: "Манипуляции с DOM через ref во время рендера могут конфликтовать с обновлениями React и приводить к непредсказуемым результатам. DOM-операции через ref должны выполняться в эффектах или обработчиках событий.",
    topic: "DOM через useRef"
  },
  {
    id: 12,
    question: "Как правильно сфокусировать input при монтировании компонента?",
    options: [
      "inputRef.current.focus() прямо в теле компонента",
      "useEffect(() => { inputRef.current?.focus(); }, [])",
      "useLayoutEffect(() => { inputRef.current.focus(); })",
      "Оба варианта 2 и 3 корректны"
    ],
    correctAnswer: 3,
    explanation: "Оба варианта работают, но useLayoutEffect предпочтительнее для DOM-операций, которые влияют на layout, так как он выполняется синхронно после обновления DOM, до отрисовки браузером.",
    topic: "DOM через useRef"
  },

  // Тема 3: forwardRef
  {
    id: 13,
    question: "Для чего используется React.forwardRef?",
    options: [
      "Для передачи props дочерним компонентам",
      "Для передачи ref через компонент к его дочернему DOM-элементу или компоненту",
      "Для создания ref внутри компонента",
      "Для форвардинга событий"
    ],
    correctAnswer: 1,
    explanation: "forwardRef позволяет функциональному компоненту принимать ref и передавать его дальше, к дочернему элементу или компоненту. Это необходимо, так как ref не является обычным prop.",
    topic: "forwardRef"
  },
  {
    id: 14,
    question: "Какая сигнатура у компонента, обёрнутого в forwardRef?",
    options: [
      "function Component(props)",
      "function Component(props, ref)",
      "function Component(ref, props)",
      "function Component({ props, ref })"
    ],
    correctAnswer: 1,
    explanation: "forwardRef принимает функцию с двумя параметрами: (props, ref). Второй параметр — это ref, переданный родительским компонентом.",
    topic: "forwardRef"
  },
  {
    id: 15,
    question: "Что выведет console.log в этом коде?\n\nconst Input = forwardRef((props, ref) => {\n  console.log(typeof ref);\n  return <input ref={ref} />;\n});\n\n// Использование:\n<Input ref={inputRef} />",
    options: [
      "'undefined'",
      "'object'",
      "'function'",
      "'string'"
    ],
    correctAnswer: 1,
    explanation: "ref — это объект с полем current (тот же объект, что создаёт useRef). typeof вернёт 'object'.",
    topic: "forwardRef"
  },
  {
    id: 16,
    question: "Можно ли использовать forwardRef вместе с другими HOC (Higher-Order Components)?",
    options: [
      "Нет, forwardRef должен быть единственным HOC",
      "Да, но forwardRef должен быть самым внешним",
      "Да, порядок не важен",
      "Да, но нужна специальная настройка"
    ],
    correctAnswer: 1,
    explanation: "При комбинировании HOC, forwardRef обычно должен быть самым внешним обёрткой, чтобы корректно передавать ref: export default forwardRef(memo(Component)).",
    topic: "forwardRef"
  },
  {
    id: 17,
    question: "Какие преимущества предоставляет использование forwardRef для работы с компонентами и рефами?",
    options: [
      "Позволяет компонентам-обёрткам быть прозрачными для ref",
      "Автоматически мемоизирует компонент",
      "Улучшает производительность рендеринга",
      "Позволяет использовать ref без useRef"
    ],
    correctAnswer: 0,
    explanation: "forwardRef делает компоненты-обёртки прозрачными для ref — родительский компонент может получить прямой доступ к внутреннему DOM-элементу, как будто обёртки нет.",
    topic: "forwardRef"
  },
  {
    id: 18,
    question: "Можно ли в forwardRef компоненте создать собственный ref и объединить его с проброшенным?",
    options: [
      "Нет, можно использовать только проброшенный ref",
      "Да, через useImperativeHandle",
      "Да, просто создав ещё один useRef",
      "Нет, это вызовет конфликт"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle позволяет кастомизировать значение ref, который видит родитель. Можно создать собственный ref внутри компонента и комбинировать его с проброшенным.",
    topic: "forwardRef"
  },

  // Тема 4: useImperativeHandle
  {
    id: 19,
    question: "Для чего используется useImperativeHandle?",
    options: [
      "Для создания ref внутри компонента",
      "Для кастомизации значения ref, которое передаётся родительскому компоненту",
      "Для императивных вызовов методов компонента",
      "Для оптимизации производительности ref"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle позволяет кастомизировать instance value, который будет доступен родительскому компоненту через ref. Это даёт контроль над тем, какие методы/свойства экспортировать.",
    topic: "useImperativeHandle"
  },
  {
    id: 20,
    question: "Какая правильная сигнатура useImperativeHandle?",
    options: [
      "useImperativeHandle(ref, createHandle)",
      "useImperativeHandle(ref, createHandle, deps)",
      "useImperativeHandle(createHandle, ref, deps)",
      "useImperativeHandle(ref, deps, createHandle)"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle(ref, createHandle, deps) — первый аргумент это ref, второй — функция создания handle, третий — опциональный массив зависимостей.",
    topic: "useImperativeHandle"
  },
  {
    id: 21,
    question: "Что вернёт useImperativeHandle в качестве ref.current для родителя?\n\nuseImperativeHandle(ref, () => ({\n  focus: () => inputRef.current.focus(),\n  clear: () => inputRef.current.value = ''\n}));",
    options: [
      "DOM-элемент input",
      "Объект с методами focus и clear",
      "undefined",
      "Функцию"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle устанавливает ref.current как объект, возвращённый из createHandle функции — в данном случае объект с двумя методами.",
    topic: "useImperativeHandle"
  },
  {
    id: 22,
    question: "Когда следует использовать useImperativeHandle вместо прямого проброса ref?",
    options: [
      "Всегда, это лучшая практика",
      "Когда нужно ограничить или кастомизировать API компонента",
      "Только в классовых компонентах",
      "Никогда, это устаревший API"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle полезен, когда вы хотите скрыть детали реализации и предоставить родителю только определённый набор методов, а не полный доступ к DOM-элементу.",
    topic: "useImperativeHandle"
  },
  {
    id: 23,
    question: "Нужно ли использовать forwardRef вместе с useImperativeHandle?",
    options: [
      "Нет, useImperativeHandle работает без forwardRef",
      "Да, useImperativeHandle требует forwardRef для получения ref",
      "Только в строгом режиме",
      "Зависит от версии React"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle должен использоваться внутри компонента, обёрнутого в forwardRef, чтобы получить ref, переданный родителем.",
    topic: "useImperativeHandle"
  },
  {
    id: 24,
    question: "Что произойдёт, если не указать массив зависимостей в useImperativeHandle?",
    options: [
      "Handle будет пересоздаваться при каждом рендере",
      "Handle создастся только один раз",
      "Произойдёт ошибка",
      "Handle не будет создан"
    ],
    correctAnswer: 0,
    explanation: "Без массива зависимостей useImperativeHandle будет пересоздавать handle при каждом рендере. Обычно рекомендуется передавать пустой массив [] или массив зависимостей.",
    topic: "useImperativeHandle"
  },

  // Тема 5: Паттерны использования ref
  {
    id: 25,
    question: "Что такое 'callback ref' в React?",
    options: [
      "Ref, который вызывает callback при изменении",
      "Функция вместо объекта ref, которая вызывается с DOM-элементом",
      "Ref для обработчиков событий",
      "Устаревший способ создания ref"
    ],
    correctAnswer: 1,
    explanation: "Callback ref — это функция, передаваемая в атрибут ref: <div ref={node => { /* node это DOM-элемент */ }} />. React вызывает её с DOM-элементом при монтировании и с null при размонтировании.",
    topic: "Паттерны использования"
  },
  {
    id: 26,
    question: "Когда callback ref вызывается с null?",
    options: [
      "При монтировании компонента",
      "При размонтировании компонента",
      "При каждом рендере",
      "Никогда"
    ],
    correctAnswer: 1,
    explanation: "React вызывает callback ref с DOM-элементом при монтировании (или обновлении ref) и с null при размонтировании, позволяя выполнить очистку.",
    topic: "Паттерны использования"
  },
  {
    id: 27,
    question: "Как правильно хранить массив refs для списка элементов?",
    options: [
      "const refs = [useRef(), useRef(), useRef()]",
      "const refs = useRef([]) и хранить элементы в refs.current",
      "Создать отдельный useState для refs",
      "Использовать Map в useRef"
    ],
    correctAnswer: 1,
    explanation: "Правильный паттерн: const refs = useRef([]) или useRef(new Map()), затем в callback ref сохранять элементы: ref={el => refs.current[index] = el} или refs.current.set(id, el).",
    topic: "Паттерны использования"
  },
  {
    id: 28,
    question: "Можно ли использовать ref для хранения интервала (setInterval)?",
    options: [
      "Нет, ref только для DOM",
      "Да, это распространённый паттерн для хранения ID таймера",
      "Да, но только с useImperativeHandle",
      "Нет, для этого нужен useState"
    ],
    correctAnswer: 1,
    explanation: "Хранение ID таймера в ref — распространённый паттерн: const intervalRef = useRef(). Это позволяет очистить интервал позже, не вызывая ре-рендер при его сохранении.",
    topic: "Паттерны использования"
  },
  {
    id: 29,
    question: "Как правильно очистить ref при размонтировании компонента?",
    options: [
      "ref.current = null в return useEffect",
      "Не нужно очищать, React сделает это автоматически",
      "Использовать useLayoutEffect",
      "delete ref.current"
    ],
    correctAnswer: 1,
    explanation: "React автоматически очищает ref при размонтировании компонента. Ручная очистка обычно не требуется, но можно очистить в cleanup функции useEffect, если нужно выполнить дополнительную логику.",
    topic: "Паттерны использования"
  },
  {
    id: 30,
    question: "Что такое 'управляемый реф' (controlled ref) и 'неконтролируемый реф' (uncontrolled ref)?",
    options: [
      "Управляемый хранится в state, неконтролируемый в ref",
      "Управляемый создаётся через useState, неконтролируемый через useRef",
      "Термины относятся к формам: управляемый компонент контролирует значение через state, неконтролируемый через ref",
      "Управляемый требует forwardRef, неконтролируемый нет"
    ],
    correctAnswer: 2,
    explanation: "Управляемый компонент (controlled) — значение контролируется через state и onChange. Неконтролируемый (uncontrolled) — значение хранится в DOM, доступ через ref. Это концепция для форм.",
    topic: "Паттерны использования"
  },

  // Тема 6: Продвинутые сценарии
  {
    id: 31,
    question: "Можно ли передать ref на компонент, обёрнутый в React.memo?",
    options: [
      "Нет, memo блокирует ref",
      "Да, но нужно использовать forwardRef",
      "Да, автоматически",
      "Только если указать специальную опцию"
    ],
    correctAnswer: 1,
    explanation: "React.memo не пробрасывает ref автоматически. Нужно обернуть компонент в forwardRef: const MemoComponent = memo(forwardRef((props, ref) => ...)).",
    topic: "Продвинутые сценарии"
  },
  {
    id: 32,
    question: "Как правильно типизировать ref в TypeScript для input элемента?",
    options: [
      "const ref = useRef<HTMLInputElement>()",
      "const ref = useRef<HTMLInputElement>(null)",
      "const ref = useRef<Element>(null)",
      "const ref: Ref<HTMLInputElement> = useRef()"
    ],
    correctAnswer: 1,
    explanation: "Правильная типизация: useRef<HTMLInputElement>(null). Начальное значение null указывает, что ref пока не связан с элементом, а дженерик определяет тип элемента.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 33,
    question: "Что произойдёт при попытке изменить props через ref?",
    options: [
      "Props изменятся корректно",
      "React выдаст ошибку",
      "Изменения не повлияют на компонент, props неизменяемы",
      "Компонент перерендерится"
    ],
    correctAnswer: 2,
    explanation: "Props в React неизменяемы (immutable). Даже если получить ссылку на props через ref и попытаться их изменить, это не повлияет на компонент. Это анти-паттерн.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 34,
    question: "Можно ли использовать один и тот же ref для нескольких элементов?",
    options: [
      "Да, ref может хранить массив элементов",
      "Нет, один ref — один элемент",
      "Да, но только последний элемент будет сохранён",
      "Да, через специальный API multiRef"
    ],
    correctAnswer: 2,
    explanation: "Если передать один ref нескольким элементам, в ref.current сохранится только последний элемент. Для нескольких элементов используйте массив refs или Map.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 35,
    question: "Как правильно работать с ref в условном рендеринге?",
    options: [
      "Создавать ref динамически при каждом рендере",
      "Всегда создавать ref, даже если элемент не рендерится",
      "Проверять ref.current на null перед использованием",
      "Использовать callback ref для условного рендеринга"
    ],
    correctAnswer: 2,
    explanation: "При условном рендеринге элемент может отсутствовать, поэтому ref.current будет null. Всегда проверяйте ref.current перед использованием: if (ref.current) { ... } или используйте опциональную цепочку ref.current?.",
    topic: "Продвинутые сценарии"
  },
  {
    id: 36,
    question: "Что произойдёт, если вызвать setState внутри callback ref?",
    options: [
      "Ошибка — нельзя вызывать setState в ref",
      "Компонент перерендерится немедленно",
      "Вызовет дополнительный рендер, что может повлиять на производительность",
      "Ничего, setState игнорируется в callback ref"
    ],
    correctAnswer: 2,
    explanation: "setState в callback ref вызовет дополнительный рендер. Это может быть необходимо (например, для измерения размеров элемента), но следует использовать осторожно для избежания проблем с производительностью.",
    topic: "Продвинутые сценарии"
  },

  // Тема 7: Лучшие практики и антипаттерны
  {
    id: 37,
    question: "Почему не рекомендуется хранить props или state в ref?",
    options: [
      "Это вызовет ошибку",
      "Ref не обновляется при изменении props/state",
      "Это нарушает однонаправленный поток данных и делает компонент сложнее для понимания",
      "Ref медленнее, чем state"
    ],
    correctAnswer: 2,
    explanation: "Хранение props/state в ref обычно антипаттерн — это дублирование данных и нарушение однонаправленного потока. Исключение — сохранение предыдущего значения для сравнения.",
    topic: "Лучшие практики"
  },
  {
    id: 38,
    question: "Когда следует использовать ref вместо state?",
    options: [
      "Всегда, ref быстрее",
      "Когда значение не должно влиять на рендеринг (таймеры, DOM-элементы, подписки)",
      "Только для DOM-элементов",
      "Никогда, state всегда предпочтительнее"
    ],
    correctAnswer: 1,
    explanation: "Используйте ref для изменяемых значений, которые не влияют на UI (ID таймеров, подписки, предыдущие значения, DOM-ссылки). Используйте state для данных, изменение которых должно вызывать ре-рендер.",
    topic: "Лучшие практики"
  },
  {
    id: 39,
    question: "Почему не стоит часто использовать useImperativeHandle?",
    options: [
      "Это устаревший API",
      "Это нарушает декларативный подход React и делает код императивным",
      "Это медленно работает",
      "Это вызывает утечки памяти"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle делает компонент императивным, что идёт вразрез с декларативной природой React. Используйте его только когда действительно нужен императивный API (библиотеки, сложные UI компоненты).",
    topic: "Лучшие практики"
  },
  {
    id: 40,
    question: "Какой паттерн предпочтительнее для доступа к методам дочернего компонента?",
    options: [
      "Всегда использовать ref и useImperativeHandle",
      "Поднять состояние вверх и управлять через props (декларативно)",
      "Использовать глобальное состояние",
      "Использовать Context API"
    ],
    correctAnswer: 1,
    explanation: "Предпочтительнее декларативный подход — управление состоянием через props. Используйте ref и useImperativeHandle только когда декларативный подход неудобен (фокус, прокрутка, анимации, интеграция с неReact библиотеками).",
    topic: "Лучшие практики"
  }
]
