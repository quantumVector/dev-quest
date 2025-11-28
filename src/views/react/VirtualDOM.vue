<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const realDomSnippet = `
// Проблема: манипуляции с реальным DOM медленные

// ❌ Плохой подход - множественные обновления DOM
function updateList(items) {
  const list = document.getElementById('list');

  // Каждая операция вызывает reflow/repaint
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.style.color = item.active ? 'green' : 'gray';
    list.appendChild(li); // Reflow!
  });
}

// Почему это медленно:
// 1. Каждый appendChild вызывает reflow
// 2. Браузер пересчитывает layout для каждого элемента
// 3. Перерисовка (repaint) происходит многократно
// 4. Нет оптимизации - все операции синхронные

// Стоимость операций с DOM:
const div = document.createElement('div');        // ~0.1ms
document.body.appendChild(div);                   // ~1-5ms (reflow!)
div.style.color = 'red';                          // ~0.5ms (repaint!)
div.innerHTML = '<span>Text</span>';              // ~2ms (парсинг + reflow)

// При 1000 элементов:
// 1000 * (создание + append + стили) = 1000 * 6ms = 6 секунд!
`

const virtualDomConceptSnippet = `
// Концепция Virtual DOM

// Virtual DOM - это легковесное JavaScript представление реального DOM
const virtualDOM = {
  type: 'div',
  props: {
    className: 'container',
    id: 'main'
  },
  children: [
    {
      type: 'h1',
      props: { className: 'title' },
      children: ['Hello World']
    },
    {
      type: 'ul',
      props: { className: 'list' },
      children: [
        {
          type: 'li',
          props: { key: '1' },
          children: ['Item 1']
        },
        {
          type: 'li',
          props: { key: '2' },
          children: ['Item 2']
        }
      ]
    }
  ]
};

// Это просто JavaScript объект - создается мгновенно!
// Никаких reflow/repaint - работа только с памятью

// Преимущества:
// 1. Быстрое создание (обычный JS объект)
// 2. Быстрое сравнение (diff двух объектов)
// 3. Батчинг обновлений (одно обновление DOM)
// 4. Кроссплатформенность (не только браузер)
`

const reactCreateElementSnippet = `
// Как React создает Virtual DOM

// JSX код:
function App() {
  return (
    <div className="app">
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
    </div>
  );
}

// Компилируется в React.createElement():
function App() {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement('h1', null, 'Counter: ', count),
    React.createElement('button', { onClick: increment }, '+')
  );
}

// React.createElement создает Virtual DOM объект:
{
  type: 'div',
  key: null,
  ref: null,
  props: {
    className: 'app',
    children: [
      {
        type: 'h1',
        props: {
          children: ['Counter: ', 5]
        }
      },
      {
        type: 'button',
        props: {
          onClick: [Function: increment],
          children: ['+']
        }
      }
    ]
  },
  $$typeof: Symbol(react.element) // Защита от XSS
}

// Это дерево создается в памяти за микросекунды
// Стоимость: ~0.001ms против ~6ms для реального DOM
`

const diffingAlgorithmSnippet = `
// Алгоритм Diffing - сердце Virtual DOM

// Шаг 1: React сохраняет текущее Virtual DOM дерево
const oldVDOM = {
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: ['Counter: 0'] } },
      { type: 'p', props: { children: ['Status: active'] } },
      { type: 'button', props: { children: ['+'] } }
    ]
  }
};

// Шаг 2: Состояние изменилось (count = 1)
// React создает новое Virtual DOM дерево
const newVDOM = {
  type: 'div',
  props: {
    children: [
      { type: 'h1', props: { children: ['Counter: 1'] } }, // ← Изменилось!
      { type: 'p', props: { children: ['Status: active'] } },
      { type: 'button', props: { children: ['+'] } }
    ]
  }
};

// Шаг 3: Diffing - сравнение деревьев
function diff(oldVDOM, newVDOM) {
  const patches = [];

  // Правило 1: Разные типы элементов - полная замена
  if (oldVDOM.type !== newVDOM.type) {
    patches.push({ type: 'REPLACE', node: newVDOM });
    return patches;
  }

  // Правило 2: Одинаковый тип - проверка props и children
  if (oldVDOM.type === newVDOM.type) {
    // Сравниваем props
    const propPatches = diffProps(oldVDOM.props, newVDOM.props);
    if (propPatches.length) {
      patches.push({ type: 'UPDATE_PROPS', patches: propPatches });
    }

    // Рекурсивно сравниваем детей
    const childPatches = diffChildren(
      oldVDOM.props.children,
      newVDOM.props.children
    );
    patches.push(...childPatches);
  }

  return patches;
}

// Результат Diffing:
const patches = [
  {
    type: 'UPDATE_TEXT',
    path: ['div', 'h1', 'text'],
    oldValue: 'Counter: 0',
    newValue: 'Counter: 1'
  }
  // Только одно изменение! p и button не трогаем
];

// Шаг 4: Применяем патчи к реальному DOM (Reconciliation)
function applyPatches(patches) {
  patches.forEach(patch => {
    const domNode = findDOMNode(patch.path);
    domNode.textContent = patch.newValue; // Одно обновление!
  });
}

// ✅ Итог: вместо пересоздания всего UI,
// обновили только текст в h1 - одна операция DOM
`

const reconciliationSnippet = `
// Reconciliation - применение изменений к реальному DOM

// Пример: список задач
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Начальное состояние:
const todos1 = [
  { id: 1, text: 'Купить молоко' },
  { id: 2, text: 'Выгулять собаку' },
  { id: 3, text: 'Написать код' }
];

// Virtual DOM 1:
{
  type: 'ul',
  children: [
    { type: 'li', key: 1, children: ['Купить молоко'] },
    { type: 'li', key: 2, children: ['Выгулять собаку'] },
    { type: 'li', key: 3, children: ['Написать код'] }
  ]
}

// После удаления средней задачи:
const todos2 = [
  { id: 1, text: 'Купить молоко' },
  { id: 3, text: 'Написать код' }
];

// Virtual DOM 2:
{
  type: 'ul',
  children: [
    { type: 'li', key: 1, children: ['Купить молоко'] },
    { type: 'li', key: 3, children: ['Написать код'] }
  ]
}

// React сравнивает по key:
// ✅ key: 1 - не изменился, пропускаем
// ❌ key: 2 - отсутствует в новом дереве, удаляем
// ✅ key: 3 - не изменился, пропускаем

// Reconciliation:
// 1. Находим DOM элемент с key="2"
// 2. Вызываем node.remove() - ОДНА операция
// 3. Остальные элементы не трогаем

// ❌ Без key (по индексу):
// - React думает, что изменились элементы [1] и [2]
// - Перерисовывает оба элемента
// - Теряется состояние, фокус, анимации

// Важность key для производительности:
// С key: 1 DOM операция (remove)
// Без key: 2 DOM операции (update, update)
`

const fiberArchitectureSnippet = `
// React Fiber - современная архитектура Virtual DOM

// Проблема старого Virtual DOM:
// - Синхронный рендеринг
// - Блокирует главный поток
// - UI "замораживается" при больших обновлениях

// React Fiber решает это через:
// 1. Incremental Rendering - рендеринг по частям
// 2. Ability to Pause/Resume - приоритеты задач
// 3. Time Slicing - разбиение на временные слоты

// Fiber Node - единица работы
const fiberNode = {
  // Информация о компоненте
  type: 'div',              // Тип элемента
  key: null,                // Key для списков
  props: { /* ... */ },     // Props компонента

  // Связи в дереве
  return: parentFiber,      // Родитель
  child: firstChildFiber,   // Первый ребенок
  sibling: nextSiblingFiber, // Следующий сиbling

  // Состояние
  memoizedState: { /* ... */ }, // Текущее состояние
  memoizedProps: { /* ... */ }, // Текущие props

  // Информация об обновлении
  alternate: oldFiber,      // Предыдущая версия fiber
  effectTag: 'UPDATE',      // Тип изменения (PLACEMENT, UPDATE, DELETION)

  // Приоритет
  lanes: 0b0001,            // Битовая маска приоритета

  // Эффекты
  updateQueue: [],          // Очередь обновлений
  effects: []               // Побочные эффекты
};

// Процесс рендеринга с Fiber:

// Фаза 1: Render/Reconciliation (прерываемая)
function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    // Обрабатываем один fiber node
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);

    // Проверяем, осталось ли время
    shouldYield = deadline.timeRemaining() < 1;
  }

  // Если есть еще работа, запланируем продолжение
  if (nextUnitOfWork) {
    requestIdleCallback(workLoop);
  } else {
    // Все fiber обработаны, переходим к commit
    commitRoot();
  }
}

requestIdleCallback(workLoop);

// Фаза 2: Commit (синхронная, быстрая)
function commitRoot() {
  // Применяем все изменения к реальному DOM
  // Эта фаза неприрывна и быстра
  commitAllHostEffects(finishedWork);
  commitAllLifeCycles(finishedWork);
}

// Приоритеты задач в Fiber:
const priorities = {
  ImmediatePriority: 1,    // Клик, ввод текста
  UserBlockingPriority: 2, // Hover, скролл
  NormalPriority: 3,       // Сетевые запросы
  LowPriority: 4,          // Аналитика
  IdlePriority: 5          // Фоновые задачи
};

// Concurrent Mode:
// - Высокоприоритетные задачи прерывают низкоприоритетные
// - UI остается отзывчивым
// - Плавные анимации даже при больших обновлениях
`

const performanceComparisonSnippet = `
// Сравнение производительности: Real DOM vs Virtual DOM

// Задача: обновить список из 1000 элементов

// ❌ Прямая работа с DOM:
function updateWithRealDOM(items) {
  const start = performance.now();
  const list = document.getElementById('list');

  // Полная очистка
  list.innerHTML = ''; // Reflow!

  // Добавление элементов
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = item.active ? 'active' : 'inactive';
    li.textContent = item.text;
    list.appendChild(li); // 1000 reflows!
  });

  const end = performance.now();
  console.log('Real DOM:', end - start, 'ms');
  // Результат: ~150-300ms
}

// ✅ React с Virtual DOM:
function TodoList({ items }) {
  return (
    <ul id="list">
      {items.map(item => (
        <li
          key={item.id}
          className={item.active ? 'active' : 'inactive'}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}

// React производит:
// 1. Создание Virtual DOM: ~5-10ms
// 2. Diffing со старым деревом: ~10-20ms
// 3. Батчинг и применение изменений: ~20-50ms
// Итого: ~35-80ms

// ✅ Оптимизация с React:
function OptimizedTodoList({ items }) {
  // Мемоизация списка
  const memoizedList = useMemo(() => (
    items.map(item => (
      <TodoItem key={item.id} item={item} />
    ))
  ), [items]);

  return <ul id="list">{memoizedList}</ul>;
}

// Мемоизированный компонент элемента
const TodoItem = memo(({ item }) => (
  <li className={item.active ? 'active' : 'inactive'}>
    {item.text}
  </li>
));

// С оптимизацией:
// - Если items не изменились: ~0ms (skip render)
// - Если изменился 1 элемент: ~5-15ms (partial update)
// - Если изменились все: ~35-80ms (full update)

// Бенчмарк (обновление 1 элемента из 1000):
// Real DOM (императивный): ~150ms
// Vanilla JS (оптимизированный): ~5ms
// React Virtual DOM: ~10ms
// React + memoization: ~5ms

// Вывод: Virtual DOM не всегда быстрее чистого JS,
// но обеспечивает хороший баланс между производительностью
// и удобством разработки (декларативность)
`

const batchingSnippet = `
// Батчинг обновлений - ключевая оптимизация Virtual DOM

// Проблема: множественные setState

// ❌ Без батчинга (наивный подход):
function handleClick() {
  setCount(count + 1);     // Render 1
  setName('John');         // Render 2
  setActive(true);         // Render 3
  // Итого: 3 рендера, 3 обновления DOM
}

// ✅ React автоматически батчит в event handlers:
function handleClick() {
  setCount(count + 1);     // Запланировано
  setName('John');         // Запланировано
  setActive(true);         // Запланировано
  // React: "Соберу все изменения и сделаю 1 рендер"
  // Итого: 1 рендер, 1 обновление DOM
}

// Как это работает:

// 1. React создает очередь обновлений
const updateQueue = [];

function setState(newState) {
  updateQueue.push(newState);

  // Планируем flush в конце event loop
  if (!isFlushScheduled) {
    isFlushScheduled = true;
    queueMicrotask(flushUpdates);
  }
}

// 2. В конце текущей задачи React применяет все обновления
function flushUpdates() {
  const oldState = currentState;
  const newState = updateQueue.reduce(
    (state, update) => ({ ...state, ...update }),
    oldState
  );

  // Один рендер со всеми изменениями
  render(newState);

  updateQueue = [];
  isFlushScheduled = false;
}

// React 18: Automatic Batching везде!

// ✅ В асинхронном коде тоже батчинг:
async function fetchData() {
  const data = await fetch('/api/data');

  setLoading(false);    // Запланировано
  setData(data);        // Запланировано
  setError(null);       // Запланировано
  // React 18: автоматический батчинг! 1 рендер

  // React 17: 3 рендера (нужен был unstable_batchedUpdates)
}

// ✅ В setTimeout тоже батчинг:
function delayedUpdate() {
  setTimeout(() => {
    setCount(1);        // Запланировано
    setName('Test');    // Запланировано
    // React 18: 1 рендер
    // React 17: 2 рендера
  }, 1000);
}

// Отключение батчинга (редко нужно):
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(count + 1);
  });
  // Форсированный синхронный рендер

  flushSync(() => {
    setName('John');
  });
  // Еще один форсированный рендер
}

// Преимущества батчинга:
// 1. Меньше рендеров (производительность)
// 2. Согласованное состояние (нет промежуточных состояний)
// 3. Меньше обновлений DOM (быстрее)
// 4. Предсказуемое поведение
`

const keysImportanceSnippet = `
// Важность key в React для эффективного reconciliation

// ❌ Плохо: нет key или key = index
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.text}</li>
        // ⚠️ Используя index как key, React не понимает,
        // что элементы переместились
      ))}
    </ul>
  );
}

// Сценарий: удаление первого элемента
// Было: ['A', 'B', 'C']
// Стало: ['B', 'C']

// React видит (с key=index):
// index 0: 'A' → 'B' (UPDATE text)
// index 1: 'B' → 'C' (UPDATE text)
// index 2: 'C' → удален (REMOVE node)
// Итого: 2 обновления текста + 1 удаление = 3 операции

// ✅ Хорошо: стабильный уникальный key
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
        // ✅ Уникальный и стабильный key
      ))}
    </ul>
  );
}

// React видит (с key=id):
// key='A': найден, не изменился (SKIP)
// key='B': найден, переместился на позицию 0 (MOVE)
// key='C': найден, переместился на позицию 1 (MOVE)
// Итого: 0 обновлений текста + 2 перемещения (cheap!)

// Проблемы без правильных key:

// 1. Потеря состояния компонента
function ItemWithState({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {item.title}
      </button>
      {expanded && <div>{item.details}</div>}
    </div>
  );
}

// Без key: при пересортировке состояние "прыгает" на другие элементы
// С key: состояние привязано к конкретному элементу

// 2. Проблемы с анимациями
function AnimatedItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {item.text}
    </motion.div>
  );
}

// Без key: анимация не работает корректно при пересортировке
// С key: анимации применяются к правильным элементам

// 3. Проблемы с controlled inputs
function EditableItem({ item, onChange }) {
  return (
    <input
      value={item.value}
      onChange={e => onChange(item.id, e.target.value)}
    />
  );
}

// Без key: фокус теряется, курсор прыгает
// С key: инпут работает правильно

// Правила для key:
const rules = {
  ✅ DO: {
    // Уникальный ID из данных
    key: item.id,

    // Комбинация полей для уникальности
    key: \`\${item.category}-\${item.id}\`,

    // Стабильный ID, не меняющийся между рендерами
    key: item.uuid
  },

  ❌ DONT: {
    // НЕ используйте индекс как key
    key: index, // ❌

    // НЕ используйте Math.random()
    key: Math.random(), // ❌ Меняется каждый рендер!

    // НЕ используйте Date.now()
    key: Date.now(), // ❌ Меняется каждый рендер!

    // НЕ используйте нестабильные значения
    key: item.text // ❌ Может измениться
  }
};

// Генерация ID, если данные без ID:
import { nanoid } from 'nanoid';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: nanoid(), // ✅ Генерируем стабильный уникальный ID
        text
      }
    ]);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
`

const limitationsSnippet = `
// Ограничения и мифы о Virtual DOM

// Миф 1: "Virtual DOM всегда быстрее реального DOM"
// Реальность: Нет! Хорошо оптимизированный императивный код быстрее

// Пример: простое обновление одного элемента

// ⚡ Самый быстрый - прямая работа с DOM:
function directUpdate() {
  const element = document.getElementById('counter');
  element.textContent = newValue; // ~0.5ms
}

// 🐢 Медленнее - через Virtual DOM:
function virtualDOMUpdate() {
  // 1. Создание Virtual DOM: ~0.5ms
  // 2. Diffing: ~1ms
  // 3. Reconciliation: ~0.5ms
  // Итого: ~2ms
  setState(newValue);
}

// Вывод: Virtual DOM медленнее в простых случаях,
// НО быстрее разработка и поддержка кода

// Миф 2: "Virtual DOM решает все проблемы производительности"
// Реальность: Плохой код с Virtual DOM всё равно медленный

// ❌ Плохо: создание новых объектов в рендере
function BadList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <ExpensiveComponent
          key={item.id}
          // Новый объект при каждом рендере!
          style={{ color: 'red' }}
          // Новая функция при каждом рендере!
          onClick={() => handleClick(item.id)}
        />
      ))}
    </ul>
  );
  // React думает, что props изменились
  // Перерисовывает ВСЕ ExpensiveComponent
}

// ✅ Хорошо: стабильные ссылки
function GoodList({ items }) {
  const style = useMemo(() => ({ color: 'red' }), []);

  const handleClick = useCallback((id) => {
    // обработка
  }, []);

  return (
    <ul>
      {items.map(item => (
        <ExpensiveComponent
          key={item.id}
          style={style}              // Одна и та же ссылка
          onClick={() => handleClick(item.id)} // Стабильная функция
        />
      ))}
    </ul>
  );
}

// Миф 3: "Нужно мемоизировать всё"
// Реальность: Преждевременная оптимизация - корень зла

// ❌ Overengineering:
const Component = memo(() => {
  const value1 = useMemo(() => 1 + 1, []); // Бессмысленно!
  const value2 = useMemo(() => 'hello', []); // Бессмысленно!

  const fn = useCallback(() => {
    console.log('click');
  }, []); // Возможно, бессмысленно

  return <div>{value1}</div>;
});

// ✅ Оптимизируйте только узкие места:
// 1. Измерьте производительность (React DevTools Profiler)
// 2. Найдите медленные компоненты
// 3. Оптимизируйте только их

// Ограничения Virtual DOM:

// 1. Начальный рендер медленнее
// - Нужно создать Virtual DOM дерево
// - Затем создать реальный DOM
// - Императивный код быстрее на старте

// 2. Overhead в памяти
const memoryUsage = {
  'Только реальный DOM': '1x',
  'React (Virtual DOM + Real DOM)': '2x',
  'React + большое состояние': '2.5x+'
};

// 3. Не подходит для некоторых задач
const notIdeal = [
  'Сложные canvas анимации',
  'WebGL/Three.js',
  'Высокочастотные обновления (>60fps)',
  'Прямая работа с медиа (audio/video)',
  'Низкоуровневые оптимизации'
];

// 4. Проблемы с большими списками
// Даже с Virtual DOM 10,000+ элементов медленно

// ❌ Плохо: рендер 10000 элементов
function HugeList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
  // Diffing 10000 элементов = медленно
}

// ✅ Решение: виртуализация списков
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].text}</div>
      )}
    </FixedSizeList>
  );
  // Рендерит только видимые элементы (~20)
  // Остальные 9980 пропускаются
}

// Когда НЕ использовать React/Virtual DOM:
const alternatives = {
  'Простые статические сайты': 'Vanilla JS, Alpine.js',
  'Максимальная производительность': 'Svelte (без Virtual DOM)',
  'Минимальный размер бандла': 'Preact, Petite-Vue',
  'Сложные canvas игры': 'PixiJS, Phaser',
  '3D графика': 'Three.js напрямую'
};
`

const alternativesSnippet = `
// Альтернативы Virtual DOM

// 1. Svelte - без Virtual DOM (компиляция в императивный код)

// Svelte компонент:
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
<\/script>

<button on:click={increment}>
Count: {count}
</button>

// Компилируется в:
function create_fragment(ctx) {
let button;
let t0;
let t1;

return {
c() {
button = element("button");
t0 = text("Count: ");
t1 = text(ctx[0]); // count
},
m(target, anchor) {
insert(target, button, anchor);
append(button, t0);
append(button, t1);
},
p(ctx, [dirty]) {
// Точное обновление только измененного текста
if (dirty & 1) set_data(t1, ctx[0]);
// Никакого Virtual DOM diffing!
}
};
}

// Преимущества Svelte:
// ✅ Меньше кода в runtime
// ✅ Меньше размер бандла
// ✅ Быстрее (нет overhead Virtual DOM)
// ❌ Больше кода на выходе при большом приложении
// ❌ Меньшая экосистема

// 2. SolidJS - реактивность без Virtual DOM

function Counter() {
const [count, setCount] = createSignal(0);

return (
<button onClick={() => setCount(count() + 1)}>
Count: {count()}
</button>
);
}

// SolidJS создает реальный DOM один раз
// При изменении count() обновляется только текстовый узел
// Никакого повторного рендеринга компонента!

// Преимущества SolidJS:
// ✅ Очень быстрый (fastest in benchmarks)
// ✅ Синтаксис похож на React (легко учить)
// ✅ Fine-grained реактивность
// ❌ Меньшая экосистема

// 3. Vue 3 - гибридный подход

const app = createApp({
setup() {
const count = ref(0);

return { count };
},
template: \`
<button @click="count++">
Count: {{ count }}
</button>
\`
});

// Vue использует:
// - Virtual DOM для компонентов
// - Реактивность для точечных обновлений
// - Compiler hints для оптимизации

// 4. Vanilla JS с реактивностью

class Observable {
constructor(value) {
this.value = value;
this.subscribers = [];
}

subscribe(callback) {
this.subscribers.push(callback);
}

set(newValue) {
this.value = newValue;
this.subscribers.forEach(callback => callback(newValue));
}
}

// Использование:
const count = new Observable(0);
const element = document.getElementById('count');

count.subscribe(value => {
element.textContent = value; // Точечное обновление
});

count.set(1); // Автоматически обновит DOM

// Когда использовать альтернативы:

const useCase = {
'React/Virtual DOM': [
'Большие команды',
'Сложные приложения',
'Богатая экосистема',
'Стабильность'
],
'Svelte': [
'Маленькие команды',
'Критичен размер бандла',
'Простые приложения',
'Максимальная производительность'
],
'SolidJS': [
'Нужна максимальная скорость',
'React-like синтаксис',
'Сложная реактивная логика'
],
'Vanilla JS': [
'Очень простые интерфейсы',
'Минимальные зависимости',
'Встраивание в существующий проект'
]
};
`

const highlightedRealDom = ref('')
const highlightedVirtualDomConcept = ref('')
const highlightedReactCreateElement = ref('')
const highlightedDiffingAlgorithm = ref('')
const highlightedReconciliation = ref('')
const highlightedFiberArchitecture = ref('')
const highlightedPerformanceComparison = ref('')
const highlightedBatching = ref('')
const highlightedKeysImportance = ref('')
const highlightedLimitations = ref('')
const highlightedAlternatives = ref('')

onMounted(() => {
highlightedRealDom.value = Prism.highlight(
realDomSnippet,
Prism.languages.javascript,
'javascript'
)
highlightedVirtualDomConcept.value = Prism.highlight(
virtualDomConceptSnippet,
Prism.languages.javascript,
'javascript'
)
highlightedReactCreateElement.value = Prism.highlight(
reactCreateElementSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedDiffingAlgorithm.value = Prism.highlight(
diffingAlgorithmSnippet,
Prism.languages.javascript,
'javascript'
)
highlightedReconciliation.value = Prism.highlight(
reconciliationSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedFiberArchitecture.value = Prism.highlight(
fiberArchitectureSnippet,
Prism.languages.javascript,
'javascript'
)
highlightedPerformanceComparison.value = Prism.highlight(
performanceComparisonSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedBatching.value = Prism.highlight(
batchingSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedKeysImportance.value = Prism.highlight(
keysImportanceSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedLimitations.value = Prism.highlight(
limitationsSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedAlternatives.value = Prism.highlight(
alternativesSnippet,
Prism.languages.jsx,
'jsx'
)
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Virtual DOM: Как React оптимизирует производительность
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Virtual DOM (виртуальный DOM)</b> — это программная концепция, где идеальное,
              "виртуальное" представление пользовательского интерфейса хранится в памяти и
              синхронизируется с реальным DOM через процесс reconciliation. Это ключевая технология,
              позволяющая React эффективно обновлять UI без прямых манипуляций с DOM.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема: медленный реальный DOM</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Основная проблема:</strong> Прямые манипуляции с DOM медленны из-за
              reflow (пересчет layout) и repaint (перерисовка) операций. Каждое изменение
              может вызывать каскад дорогих операций.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealDom"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое Virtual DOM?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-code-json</v-icon>
                    <h3 class="text-h6 font-weight-bold">Концепция</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>JavaScript объект</strong> — легковесное представление</li>
                    <li><strong>Дерево компонентов</strong> — иерархическая структура</li>
                    <li><strong>В памяти</strong> — никаких DOM операций</li>
                    <li><strong>Быстрое создание</strong> — обычные объекты JS</li>
                    <li><strong>Быстрое сравнение</strong> — алгоритм diff</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-speedometer</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Батчинг обновлений</strong> — одна операция вместо многих</li>
                    <li><strong>Минимальные изменения</strong> — только что изменилось</li>
                    <li><strong>Декларативность</strong> — описываем "что", не "как"</li>
                    <li><strong>Кроссплатформенность</strong> — не только браузер</li>
                    <li><strong>Предсказуемость</strong> — упрощает отладку</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVirtualDomConcept"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как React создает Virtual DOM</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactCreateElement"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Процесс работы Virtual DOM в React</h2>
            <v-stepper alt-labels class="mb-8">
              <v-stepper-header>
                <v-stepper-item value="1" color="primary">
                  Render
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item value="2" color="info">
                  Diffing
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item value="3" color="success">
                  Reconciliation
                </v-stepper-item>
                <v-divider></v-divider>
                <v-stepper-item value="4" color="warning">
                  Commit
                </v-stepper-item>
              </v-stepper-header>
            </v-stepper>

            <v-row class="mb-6">
              <v-col cols="12" md="6" lg="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-react</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">1. Render</h3>
                  <p class="text-body-2">
                    React вызывает функцию компонента и создает новое Virtual DOM дерево
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-compare</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">2. Diffing</h3>
                  <p class="text-body-2">
                    Сравнение нового Virtual DOM со старым деревом, поиск различий
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-all</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">3. Reconciliation</h3>
                  <p class="text-body-2">
                    Вычисление минимального набора операций для обновления реального DOM
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" lg="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">4. Commit</h3>
                  <p class="text-body-2">
                    Применение изменений к реальному DOM одним батчем
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Алгоритм Diffing — сердце Virtual DOM</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDiffingAlgorithm"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правила Diffing алгоритма</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Правило</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Разные типы элементов</b></td>
                <td>Полная замена поддерева</td>
                <td>&lt;div&gt; → &lt;span&gt; = полная пересборка</td>
              </tr>
              <tr>
                <td><b>Одинаковый тип</b></td>
                <td>Обновление только props</td>
                <td>&lt;div className="old"&gt; → className="new"</td>
              </tr>
              <tr>
                <td><b>Сравнение children</b></td>
                <td>Рекурсивное сравнение детей</td>
                <td>Проход по массиву children</td>
              </tr>
              <tr>
                <td><b>Key для списков</b></td>
                <td>Оптимизация через идентификаторы</td>
                <td>key={item.id} вместо key={index}</td>
              </tr>
              <tr>
                <td><b>Компоненты одного типа</b></td>
                <td>Обновление instance, новые props</td>
                <td>&lt;Component x={1}/&gt; → &lt;Component x={2}/&gt;</td>
              </tr>
              <tr>
                <td><b>Разные компоненты</b></td>
                <td>Размонтирование и монтирование</td>
                <td>&lt;ComponentA/&gt; → &lt;ComponentB/&gt;</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Reconciliation — применение изменений</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReconciliation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">React Fiber — современная архитектура</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>React Fiber (React 16+):</strong> Это переработанный алгоритм reconciliation,
              который позволяет разбивать рендеринг на части, приостанавливать работу и возобновлять её,
              приоритизировать задачи. Fiber делает React более отзывчивым.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFiberArchitecture"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые особенности Fiber</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-timer-pause</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Прерываемый рендеринг</h3>
                  <p class="text-body-2">
                    Работа может быть приостановлена и возобновлена позже, освобождая главный поток
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-sort</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Приоритеты задач</h3>
                  <p class="text-body-2">
                    Высокоприоритетные обновления (клики) прерывают низкоприоритетные (аналитика)
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-clock-fast</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Time Slicing</h3>
                  <p class="text-body-2">
                    Разбиение работы на временные слоты (~5ms), чтобы браузер оставался отзывчивым
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformanceComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Батчинг обновлений — ключевая оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBatching"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Важность key для производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedKeysImportance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизации React для Virtual DOM</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Оптимизация</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>React.memo()</code></td>
                <td>Мемоизация компонента, skip рендера при неизменных props</td>
                <td>Дорогие компоненты с редко меняющимися props</td>
              </tr>
              <tr>
                <td><code>useMemo()</code></td>
                <td>Мемоизация результата вычисления</td>
                <td>Дорогие вычисления с зависимостями</td>
              </tr>
              <tr>
                <td><code>useCallback()</code></td>
                <td>Мемоизация функции</td>
                <td>Функции в deps других хуков или props</td>
              </tr>
              <tr>
                <td><code>key</code> prop</td>
                <td>Помогает React идентифицировать элементы</td>
                <td>Списки динамических элементов</td>
              </tr>
              <tr>
                <td><code>React.lazy()</code></td>
                <td>Ленивая загрузка компонентов</td>
                <td>Большие компоненты, используемые редко</td>
              </tr>
              <tr>
                <td>Virtualization</td>
                <td>Рендер только видимых элементов списка</td>
                <td>Большие списки (1000+ элементов)</td>
              </tr>
              <tr>
                <td>Code Splitting</td>
                <td>Разделение бандла на части</td>
                <td>Маршруты, модальные окна</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Ограничения и мифы о Virtual DOM</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLimitations"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Альтернативные подходы к Virtual DOM</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAlternatives"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Virtual DOM и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Virtual DOM — это легковесное представление реального DOM в памяти JavaScript.
                  Он нужен для оптимизации: React создает новое Virtual DOM дерево при изменении
                  состояния, сравнивает его со старым (diffing), вычисляет минимальные изменения
                  и применяет их к реальному DOM одним батчем. Это быстрее множественных прямых
                  манипуляций с DOM.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает алгоритм diffing в React?</p>
                <p class="font-weight-regular ma-0">
                  React сравнивает два Virtual DOM дерева уровень за уровнем. Основные правила:
                  1) Элементы разных типов заменяются полностью, 2) Элементы одного типа обновляют
                  только props, 3) Дети сравниваются рекурсивно, 4) Key помогает идентифицировать
                  элементы в списках. Алгоритм имеет сложность O(n) вместо O(n³) у общих алгоритмов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое reconciliation в React?</p>
                <p class="font-weight-regular ma-0">
                  Reconciliation — это процесс синхронизации Virtual DOM с реальным DOM. После
                  diffing React знает, что изменилось, и reconciliation применяет эти изменения:
                  создает, обновляет или удаляет DOM узлы. В React 16+ используется Fiber архитектура,
                  которая делает reconciliation прерываемым и приоритизируемым.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Всегда ли Virtual DOM быстрее прямой работы с DOM?</p>
                <p class="font-weight-regular ma-0">
                  Нет! Хорошо оптимизированный императивный код с точечными обновлениями DOM может
                  быть быстрее. Virtual DOM — это компромисс между производительностью и удобством
                  разработки. Он обеспечивает хорошую производительность в большинстве случаев
                  при декларативном подходе к UI.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое React Fiber и чем он отличается от старого reconciler?</p>
                <p class="font-weight-regular ma-0">
                  Fiber — это полная переработка reconciliation алгоритма (React 16+). Ключевые
                  отличия: 1) Прерываемый рендеринг (можно приостановить и возобновить), 2) Приоритеты
                  задач (срочные обновления прерывают несрочные), 3) Time slicing (работа разбита на слоты),
                  4) Улучшенная обработка ошибок, 5) Поддержка Concurrent Mode и Suspense.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужен key в списках и почему нельзя использовать index?</p>
                <p class="font-weight-regular ma-0">
                  Key помогает React идентифицировать, какие элементы изменились, добавились или удалились.
                  Index как key плох при динамических списках: при удалении/перестановке элементов index
                  меняется, React думает, что изменились другие элементы, теряется состояние и фокус.
                  Используйте стабильный уникальный ID из данных.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое батчинг обновлений в React?</p>
                <p class="font-weight-regular ma-0">
                  Батчинг — это группировка нескольких setState вызовов в один рендер. React автоматически
                  батчит обновления в event handlers. В React 18 батчинг работает везде: в async функциях,
                  setTimeout, промисах. Это уменьшает количество рендеров и обновлений DOM, улучшая
                  производительность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда стоит использовать React.memo(), useMemo() и useCallback()?</p>
                <p class="font-weight-regular ma-0">
                  <b>React.memo()</b> — для дорогих компонентов с редко меняющимися props.
                  <b>useMemo()</b> — для дорогих вычислений, зависящих от конкретных переменных.
                  <b>useCallback()</b> — для функций, передаваемых в deps или props мемоизированных
                  компонентов. Не оптимизируйте преждевременно — используйте React DevTools Profiler
                  для поиска узких мест.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики работы с Virtual DOM</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать key для динамических списков</li>
                    <li>Мемоизировать дорогие компоненты (React.memo)</li>
                    <li>Избегать создания новых объектов в render</li>
                    <li>Использовать Production build</li>
                    <li>Профилировать с React DevTools</li>
                    <li>Виртуализировать большие списки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Index как key в динамических списках</li>
                    <li>Мутации state напрямую</li>
                    <li>Преждевременной оптимизации (memo везде)</li>
                    <li>Inline функций в JSX без необходимости</li>
                    <li>Глубокой вложенности компонентов</li>
                    <li>Больших компонентов без разделения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите React DevTools Profiler</li>
                    <li>Понимайте когда происходит рендер</li>
                    <li>Используйте Code Splitting</li>
                    <li>Lazy загружайте тяжелые компоненты</li>
                    <li>Следите за размером бандла</li>
                    <li>Читайте официальную документацию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Virtual DOM</b> — это ключевая технология React, обеспечивающая баланс между
              производительностью и удобством разработки. Через процессы <b>render → diffing →
              reconciliation → commit</b> React минимизирует дорогие операции с реальным DOM.
              <b>React Fiber</b> делает этот процесс прерываемым и приоритизируемым, обеспечивая
              отзывчивость UI. Понимание Virtual DOM критично для оптимизации React приложений
              и успешного прохождения собеседований на позицию React разработчика.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/preserving-and-resetting-state"
                target="_blank"
                class="mr-2">
                React: Reconciliation
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/acdlite/react-fiber-architecture"
                target="_blank">
                Fiber Architecture
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
