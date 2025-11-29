<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const concurrentRenderingSnippet = `
// React 17 - синхронный рендеринг (blocking)
function LegacyApp() {
  const [count, setCount] = useState(0);

  // Все обновления блокируют UI
  const handleClick = () => {
    setCount(count + 1); // Блокирует до завершения
  };

  return <button onClick={handleClick}>{count}</button>;
}

// React 18 - конкурентный рендеринг (concurrent)
import { useTransition } from 'react';

function ModernApp() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Неотложное обновление - выполняется сразу
    setCount(count + 1);

    // Отложенное обновление - может быть прервано
    startTransition(() => {
      // Тяжёлые вычисления или обновления
      updateComplexState();
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {count} {isPending && '(обновление...)'}
    </button>
  );
}
`

const automaticBatchingSnippet = `
// React 17 - батчинг только в обработчиках событий
function React17Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount(c => c + 1); // Ре-рендер
    setFlag(f => !f);     // Ре-рендер
    // Итого: 2 ре-рендера
  };

  useEffect(() => {
    fetch('/api').then(() => {
      setCount(c => c + 1); // Ре-рендер
      setFlag(f => !f);     // Ре-рендер
      // В промисах НЕТ батчинга - 2 ре-рендера!
    });
  }, []);
}

// React 18 - автоматический батчинг везде!
function React18Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Только 1 ре-рендер - автоматический батчинг!
  };

  useEffect(() => {
    fetch('/api').then(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // Теперь тоже 1 ре-рендер - батчинг в промисах!
    });
  }, []);

  setTimeout(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // И в таймаутах батчинг работает!
  }, 1000);
}

// Отключение автоматического батчинга (редко нужно)
import { flushSync } from 'react-dom';

function WithoutBatching() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    flushSync(() => {
      setCount(c => c + 1); // Ре-рендер 1
    });

    flushSync(() => {
      setFlag(f => !f);     // Ре-рендер 2
    });
    // Принудительно 2 отдельных ре-рендера
  };
}
`

const useTransitionSnippet = `
// useTransition - для неотложных обновлений UI
import { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;

    // Отложка input - выполняется мгновенно (высокий приоритет)
    setQuery(value);

    // Обновление результатов - может быть прервано (низкий приоритет)
    startTransition(() => {
      // Фильтрация большого массива данных
      const filtered = heavyFilterOperation(allData, value);
      setResults(filtered);
    });
  };

  return (
    <div>
      {/* Input всегда реагирует мгновенно */}
      <input value={query} onChange={handleSearch} />

      {/* Индикатор загрузки для отложенного обновления */}
      {isPending && <Spinner />}

      {/* Результаты обновляются с низким приоритетом */}
      <ResultsList results={results} />
    </div>
  );
}

// Сравнение с debounce/throttle
function WithDebounce() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Проблема: input лагает, задержка искусственная
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      const filtered = heavyFilterOperation(allData, value);
      setResults(filtered);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value); // 300ms задержка всегда
  };

  // useTransition лучше - нет фиксированной задержки,
  // реагирует на загрузку системы динамически
}
`

const useDeferredValueSnippet = `
// useDeferredValue - отложенное значение для дорогих вычислений
import { useState, useDeferredValue, useMemo } from 'react';

function FilteredList({ items }) {
  const [filter, setFilter] = useState('');

  // Отложенное значение - обновляется с низким приоритетом
  const deferredFilter = useDeferredValue(filter);

  // Дорогое вычисление с отложенным значением
  const filteredItems = useMemo(() => {
    console.log('Фильтрация...'); // Вызывается реже
    return items.filter(item =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [items, deferredFilter]);

  return (
    <div>
      {/* Input обновляется мгновенно */}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Поиск..."
      />

      {/* Показываем индикатор, если значения не совпадают */}
      {filter !== deferredFilter && <div>Обновление...</div>}

      {/* Список обновляется с задержкой */}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// useTransition vs useDeferredValue
function ComparisonExample({ data }) {
  // useTransition - когда контролируете setState
  const [isPending, startTransition] = useTransition();
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (value) => {
    startTransition(() => {
      setFilteredData(expensiveFilter(data, value));
    });
  };

  // useDeferredValue - когда не контролируете setState
  // (например, значение приходит как props)
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filteredData2 = useMemo(() =>
    expensiveFilter(data, deferredFilter),
    [data, deferredFilter]
  );
}
`

const suspenseSnippet = `
// React 18 - улучшенный Suspense
import { Suspense, lazy } from 'react';

// Ленивая загрузка компонентов
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
}

// Suspense для данных (с библиотеками типа React Query, SWR)
function UserProfile({ userId }) {
  // Используем библиотеку с поддержкой Suspense
  const user = useSuspenseQuery(['user', userId], fetchUser);

  return <div>{user.name}</div>;
}

function ProfilePage({ userId }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}

// Вложенные Suspense границы
function Dashboard() {
  return (
    <div>
      {/* Быстрая часть загружается сразу */}
      <Header />

      {/* Медленные части загружаются независимо */}
      <Suspense fallback={<Skeleton />}>
        <LeftSidebar />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <MainContent />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <RightSidebar />
      </Suspense>
    </div>
  );
}

// Новое: Suspense на сервере (SSR streaming)
// Части страницы отправляются по мере готовности
`

const newRootAPISnippet = `
// React 17 - старый API ReactDOM.render
import ReactDOM from 'react-dom';

const container = document.getElementById('root');
ReactDOM.render(<App />, container);

// Unmount
ReactDOM.unmountComponentAtNode(container);

// React 18 - новый API createRoot (Concurrent Mode)
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

// Рендер с конкурентными возможностями
root.render(<App />);

// Unmount
root.unmount();

// Для обратной совместимости можно использовать Legacy Mode
import { render } from 'react-dom';
render(<App />, container); // Работает как в React 17

// SSR с гидратацией
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = hydrateRoot(container, <App />);
`

const useIdSnippet = `
// useId - генерация уникальных ID для accessibility
import { useId } from 'react';

function FormField({ label, type = 'text' }) {
  // Генерирует уникальный ID
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </div>
  );
}

// Использование в форме
function RegistrationForm() {
  return (
    <form>
      {/* Каждое поле получит уникальный ID */}
      <FormField label="Имя" />
      <FormField label="Email" type="email" />
      <FormField label="Пароль" type="password" />
    </form>
  );
}

// Множественные связанные элементы
function AccessibleComponent() {
  const id = useId();

  return (
    <div>
      <label htmlFor={\`\${id}-input\`}>Описание</label>
      <input
        id={\`\${id}-input\`}
        aria-describedby={\`\${id}-hint\`}
      />
      <span id={\`\${id}-hint\`}>
        Введите подробное описание
      </span>
    </div>
  );
}

// SSR - useId работает одинаково на сервере и клиенте!
// Гарантирует совпадение ID при гидратации
`

const useSyncExternalStoreSnippet = `
// useSyncExternalStore - подписка на внешние хранилища
import { useSyncExternalStore } from 'react';

// Пример: Redux-подобное хранилище
const store = {
  state: { count: 0 },
  listeners: new Set(),

  getState() {
    return this.state;
  },

  setState(newState) {
    this.state = newState;
    this.listeners.forEach(listener => listener());
  },

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};

// Использование в компоненте
function Counter() {
  const state = useSyncExternalStore(
    store.subscribe.bind(store),  // subscribe
    store.getState.bind(store),   // getSnapshot
    store.getState.bind(store)    // getServerSnapshot (для SSR)
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => store.setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}

// Подписка на browser API
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,  // getSnapshot
    () => true               // getServerSnapshot
  );

  return isOnline;
}

// Использование
function NetworkStatus() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}
`

const useInsertionEffectSnippet = `
// useInsertionEffect - для CSS-in-JS библиотек
import { useInsertionEffect } from 'react';

// Обычно используется внутри библиотек, не в пользовательском коде
function useCSS(styles) {
  useInsertionEffect(() => {
    // Вставка стилей ДО мутаций DOM
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);
}

// Порядок выполнения эффектов:
// 1. useInsertionEffect - вставка CSS перед отрисовкой
// 2. useLayoutEffect - чтение layout, синхронные мутации DOM
// 3. useEffect - асинхронные side effects

// Пример использования в CSS-in-JS библиотеке
function Button({ children }) {
  const className = useCSS(\`
    .button {
      background: blue;
      color: white;
      padding: 10px 20px;
    }
  \`);

  return <button className={className}>{children}</button>;
}

// ⚠️ Не используйте для обычного кода!
// useInsertionEffect только для авторов библиотек CSS-in-JS
`

const strictModeSnippet = `
// React 18 - улучшенный Strict Mode
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <MyApplication />
    </StrictMode>
  );
}

// Что делает Strict Mode в React 18:

// 1. Двойной вызов эффектов (только в dev mode)
function Component() {
  useEffect(() => {
    console.log('Mount');

    return () => {
      console.log('Cleanup');
    };
  }, []);

  // В dev с Strict Mode:
  // Mount
  // Cleanup (имитация unmount)
  // Mount (проверка правильной очистки)

  // В production:
  // Mount (один раз)
}

// 2. Двойной вызов useState/useReducer initializer
function Component() {
  const [state] = useState(() => {
    console.log('Initialize state');
    return 0;
  });

  // В dev с Strict Mode:
  // "Initialize state" выведется дважды

  // Помогает обнаружить побочные эффекты в инициализаторах
}

// 3. Предупреждения о устаревших API
function LegacyComponent() {
  // Предупреждения о:
  // - Legacy Context API
  // - findDOMNode
  // - String refs
  // - и других устаревших паттернах
}

// Зачем двойной вызов?
// Подготовка к новой функции: Offscreen Component
// Компоненты могут монтироваться/размонтироваться
// при сохранении состояния (background tabs, modals)
`

const migrationGuideSnippet = `
// Миграция с React 17 на React 18

// Шаг 1: Обновление зависимостей
// npm install react@18 react-dom@18
// npm install @types/react@18 @types/react-dom@18 (TypeScript)

// Шаг 2: Замена ReactDOM.render на createRoot
// До (React 17):
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// После (React 18):
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Шаг 3: Обновление TypeScript типов (если используется)
// До:
interface AppProps {
  children: React.ReactNode;
}

// После - то же самое, но проверьте конфликты типов

// Шаг 4: Тестирование с автоматическим батчингом
// Проверьте компоненты, которые полагаются на множественные рендеры:
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // В React 17 - 2 ре-рендера
    // В React 18 - 1 ре-рендер
    fetch('/api').then(() => {
      setCount(1);
      setCount(2);
    });
  }, []);
}

// Если нужно старое поведение:
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(1); // Ре-рендер 1
});
flushSync(() => {
  setCount(2); // Ре-рендер 2
});

// Шаг 5: Обновление серверного рендеринга
// До (React 17):
import { renderToString } from 'react-dom/server';
const html = renderToString(<App />);

// После (React 18) - с Suspense поддержкой:
import { renderToPipeableStream } from 'react-dom/server';

renderToPipeableStream(<App />, {
  onShellReady() {
    response.statusCode = 200;
    response.setHeader('Content-type', 'text/html');
    stream.pipe(response);
  }
});

// Шаг 6: Обновление тестов
// Enzyme НЕ поддерживает React 18 полностью
// Мигрируйте на React Testing Library

// Было:
import { shallow } from 'enzyme';
const wrapper = shallow(<Component />);

// Стало:
import { render } from '@testing-library/react';
const { getByText } = render(<Component />);
`

const highlightedConcurrentRendering = ref('')
const highlightedAutomaticBatching = ref('')
const highlightedUseTransition = ref('')
const highlightedUseDeferredValue = ref('')
const highlightedSuspense = ref('')
const highlightedNewRootAPI = ref('')
const highlightedUseId = ref('')
const highlightedUseSyncExternalStore = ref('')
const highlightedUseInsertionEffect = ref('')
const highlightedStrictMode = ref('')
const highlightedMigrationGuide = ref('')

onMounted(() => {
  highlightedConcurrentRendering.value = Prism.highlight(
    concurrentRenderingSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedAutomaticBatching.value = Prism.highlight(
    automaticBatchingSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedUseTransition.value = Prism.highlight(
    useTransitionSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedUseDeferredValue.value = Prism.highlight(
    useDeferredValueSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedSuspense.value = Prism.highlight(
    suspenseSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedNewRootAPI.value = Prism.highlight(
    newRootAPISnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedUseId.value = Prism.highlight(
    useIdSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedUseSyncExternalStore.value = Prism.highlight(
    useSyncExternalStoreSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedUseInsertionEffect.value = Prism.highlight(
    useInsertionEffectSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedStrictMode.value = Prism.highlight(
    strictModeSnippet,
    Prism.languages.javascript,
    'javascript'
  )
  highlightedMigrationGuide.value = Prism.highlight(
    migrationGuideSnippet,
    Prism.languages.javascript,
    'javascript'
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
              React 18: Конкурентный рендеринг и новые возможности
            </h1>

            <p class="font-weight-regular mb-6">
              <b>React 18</b> — это крупное обновление, которое вводит <b>конкурентный рендеринг</b>
              (Concurrent Rendering) как основу для новых возможностей. Ключевые изменения:
              автоматический батчинг, новые хуки (useTransition, useDeferredValue, useId),
              улучшенный Suspense, стриминговый SSR и новый Root API.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что нового в React 18</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-flash</v-icon>
                    <h3 class="text-h6 font-weight-bold">Ключевые возможности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Concurrent Rendering</strong> — прерываемый рендеринг</li>
                    <li><strong>Automatic Batching</strong> — везде</li>
                    <li><strong>useTransition</strong> — приоритет обновлений</li>
                    <li><strong>useDeferredValue</strong> — отложенные значения</li>
                    <li><strong>Suspense</strong> — для данных и SSR</li>
                    <li><strong>Streaming SSR</strong> — по частям</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-wrench</v-icon>
                    <h3 class="text-h6 font-weight-bold">Новые API</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>createRoot</strong> — новый Root API</li>
                    <li><strong>useId</strong> — уникальные ID для SSR</li>
                    <li><strong>useSyncExternalStore</strong> — внешние хранилища</li>
                    <li><strong>useInsertionEffect</strong> — для CSS-in-JS</li>
                    <li><strong>Strict Mode</strong> — улучшенный</li>
                    <li><strong>hydrateRoot</strong> — SSR гидратация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Конкурентный рендеринг (Concurrent Rendering)</h2>
            <p class="font-weight-regular mb-4">
              <b>Главное изменение React 18</b> — способность прерывать рендеринг и возобновлять его позже.
              React может начать обновление, прервать его при более важном событии, и вернуться к нему потом.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConcurrentRendering"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Автоматический батчинг (Automatic Batching)</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Улучшение производительности:</strong> React 18 группирует все обновления состояния
              в один ре-рендер, даже в промисах, таймаутах и native event handlers!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAutomaticBatching"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. useTransition — управление приоритетами</h2>
            <p class="font-weight-regular mb-4">
              <code>useTransition</code> позволяет помечать обновления как неотложные (urgent) или переходные (transitions).
              Переходные обновления могут быть прерваны более важными.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseTransition"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. useDeferredValue — отложенные значения</h2>
            <p class="font-weight-regular mb-4">
              <code>useDeferredValue</code> возвращает отложенную версию значения, которая обновляется
              с низким приоритетом. Похож на debounce, но адаптивный.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseDeferredValue"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
                <th class="text-left font-weight-bold">Преимущества</th>
                <th class="text-left font-weight-bold">Недостатки</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>useTransition</b></td>
                <td>Контролируете setState</td>
                <td>Полный контроль, индикатор isPending</td>
                <td>Требует оборачивания setState</td>
              </tr>
              <tr>
                <td><b>useDeferredValue</b></td>
                <td>Значение из props/контекста</td>
                <td>Проще использовать</td>
                <td>Нет прямого isPending</td>
              </tr>
              <tr>
                <td><b>debounce/throttle</b></td>
                <td>Старые браузеры, фиксированная задержка</td>
                <td>Простота, предсказуемость</td>
                <td>Фиксированная задержка, искусственная</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">5. Улучшенный Suspense</h2>
            <p class="font-weight-regular mb-4">
              В React 18 Suspense теперь работает не только для code splitting, но и для данных (с библиотеками),
              а также поддерживает SSR streaming.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSuspense"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Новый Root API — createRoot</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Для использования новых возможностей React 18 необходимо
              перейти с <code>ReactDOM.render</code> на <code>createRoot</code>!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedNewRootAPI"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. useId — уникальные ID для SSR</h2>
            <p class="font-weight-regular mb-4">
              <code>useId</code> генерирует стабильные уникальные ID, которые совпадают между
              сервером и клиентом при SSR гидратации.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseId"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. useSyncExternalStore — внешние хранилища</h2>
            <p class="font-weight-regular mb-4">
              <code>useSyncExternalStore</code> позволяет подписываться на внешние хранилища (Redux, MobX, browser API)
              с гарантией консистентности в Concurrent Mode.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseSyncExternalStore"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. useInsertionEffect — для CSS-in-JS</h2>
            <p class="font-weight-regular mb-4">
              <code>useInsertionEffect</code> предназначен для авторов CSS-in-JS библиотек.
              Выполняется перед всеми DOM мутациями.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUseInsertionEffect"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Улучшенный Strict Mode</h2>
            <p class="font-weight-regular mb-4">
              Strict Mode в React 18 помогает подготовиться к будущим возможностям, таким как
              Offscreen Components, проверяя корректную очистку эффектов.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedStrictMode"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Миграция на React 18</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMigrationGuide"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Concurrent Rendering и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Concurrent Rendering позволяет React прерывать рендеринг для обработки более важных
                  обновлений (например, пользовательского ввода), а затем возвращаться к прерванной работе.
                  Это делает UI более отзывчивым, особенно при тяжёлых вычислениях.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между useTransition и useDeferredValue?</p>
                <p class="font-weight-regular ma-0">
                  <code>useTransition</code> используется когда вы контролируете setState и хотите пометить
                  обновление как переходное. <code>useDeferredValue</code> используется когда значение
                  приходит извне (props, контекст) и вы хотите получить его отложенную версию.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что изменилось в автоматическом батчинге?</p>
                <p class="font-weight-regular ma-0">
                  В React 17 батчинг работал только в event handlers. В React 18 батчинг автоматический
                  везде: в промисах, setTimeout, native event handlers. Это уменьшает количество ре-рендеров
                  и улучшает производительность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Обязательно ли переходить на createRoot?</p>
                <p class="font-weight-regular ma-0">
                  Не обязательно для базовой работы, но для использования новых возможностей React 18
                  (Concurrent Features) необходим <code>createRoot</code>. Старый <code>ReactDOM.render</code>
                  работает в Legacy Mode без конкурентных возможностей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как useId помогает с SSR?</p>
                <p class="font-weight-regular ma-0">
                  <code>useId</code> генерирует ID, которые гарантированно совпадают между сервером и клиентом,
                  что предотвращает гидратацию mismatch. Раньше приходилось использовать глобальные счётчики
                  или UUID, которые могли не совпадать.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужен useSyncExternalStore?</p>
                <p class="font-weight-regular ma-0">
                  В Concurrent Mode обычные подписки на внешние хранилища могут приводить к tearing
                  (несогласованности UI). <code>useSyncExternalStore</code> гарантирует консистентность
                  даже при конкурентном рендеринге.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему Strict Mode вызывает эффекты дважды?</p>
                <p class="font-weight-regular ma-0">
                  Это подготовка к Offscreen Components — будущей возможности React, где компоненты
                  могут монтироваться/размонтироваться при сохранении состояния (background tabs, modals).
                  Двойной вызов проверяет правильность cleanup функций.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики React 18</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать createRoot для новых проектов</li>
                    <li>Применять useTransition для тяжёлых обновлений</li>
                    <li>Использовать Suspense для code splitting</li>
                    <li>Включать Strict Mode в разработке</li>
                    <li>Полагаться на автоматический батчинг</li>
                    <li>useId для accessibility</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Использование ReactDOM.render в новом коде</li>
                    <li>Излишнее использование flushSync</li>
                    <li>Игнорирование Strict Mode warnings</li>
                    <li>Ручная генерация ID без useId</li>
                    <li>Подписка на внешние store без useSyncExternalStore</li>
                    <li>useInsertionEffect в пользовательском коде</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Профилируйте с React DevTools</li>
                    <li>Начинайте с useTransition для input</li>
                    <li>Комбинируйте Suspense границы</li>
                    <li>Мигрируйте постепенно</li>
                    <li>Тестируйте с Concurrent Features</li>
                    <li>Следите за React Working Group</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение с React 17</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Возможность</th>
                <th class="text-left font-weight-bold">React 17</th>
                <th class="text-left font-weight-bold">React 18</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Рендеринг</b></td>
                <td>Синхронный, блокирующий</td>
                <td>Конкурентный, прерываемый</td>
              </tr>
              <tr>
                <td><b>Батчинг</b></td>
                <td>Только в event handlers</td>
                <td>Автоматически везде</td>
              </tr>
              <tr>
                <td><b>Root API</b></td>
                <td>ReactDOM.render</td>
                <td>createRoot, hydrateRoot</td>
              </tr>
              <tr>
                <td><b>Suspense</b></td>
                <td>Только code splitting</td>
                <td>+ данные, SSR streaming</td>
              </tr>
              <tr>
                <td><b>Приоритеты</b></td>
                <td>Нет встроенных</td>
                <td>useTransition, useDeferredValue</td>
              </tr>
              <tr>
                <td><b>SSR</b></td>
                <td>renderToString (блокирующий)</td>
                <td>renderToPipeableStream (потоковый)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>React 18</b> — это фундаментальное обновление, которое вводит конкурентный рендеринг
              как основу для будущих возможностей. Ключевые изменения: автоматический батчинг везде,
              новые хуки для управления приоритетами (useTransition, useDeferredValue), улучшенный
              Suspense, стриминговый SSR и новый Root API. Миграция проста для большинства приложений,
              но открывает множество возможностей для оптимизации производительности и UX.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/blog/2022/03/29/react-v18"
                target="_blank"
                class="mr-2">
                React 18 Release
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/reactwg/react-18/discussions"
                target="_blank">
                React 18 Working Group
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
