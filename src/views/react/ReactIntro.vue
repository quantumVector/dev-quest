<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const basicComponentSnippet = `
// Простой React компонент
import React from 'react';

function Welcome({ name }) {
  return (
    <div className="greeting">
      <h1>Привет, {name}!</h1>
      <p>Добро пожаловать в React</p>
    </div>
  );
}

// Использование
function App() {
  return (
    <div>
      <Welcome name="Иван" />
      <Welcome name="Мария" />
    </div>
  );
}

export default App;
`

const virtualDomSnippet = `
// Virtual DOM в действии

// До обновления
<div id="root">
  <h1>Счётчик: 0</h1>
  <button>Увеличить</button>
</div>

// После обновления (изменился только текст в h1)
<div id="root">
  <h1>Счётчик: 1</h1>  <!-- Только это обновится в реальном DOM -->
  <button>Увеличить</button>
</div>

// React создаёт Virtual DOM дерево:
const virtualTree = {
  type: 'div',
  props: { id: 'root' },
  children: [
    {
      type: 'h1',
      children: ['Счётчик: 1']  // Изменилось!
    },
    {
      type: 'button',
      children: ['Увеличить']  // Не изменилось
    }
  ]
};

// React делает diff и обновляет только изменённый узел
`

const componentTypeSnippet = `
// 1. Функциональный компонент (современный подход)
function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>Счёт: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
}

// 2. Классовый компонент (legacy)
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Счёт: {this.state.count}</p>
        <button onClick={this.increment}>
          Увеличить
        </button>
      </div>
    );
  }
}
`

const hooksSnippet = `
// React Hooks - современный способ работы с состоянием и эффектами

import React, { useState, useEffect, useContext, useRef } from 'react';

function UserProfile({ userId }) {
  // useState - локальное состояние
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useRef - хранение мутабельного значения
  const mountedRef = useRef(true);

  // useEffect - побочные эффекты
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();

        // Проверяем, что компонент всё ещё смонтирован
        if (mountedRef.current) {
          setUser(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // Cleanup функция при размонтировании
    return () => {
      mountedRef.current = false;
    };
  }, [userId]); // Зависимости - перезапуск при изменении userId

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
`

const contextSnippet = `
// Context API - глобальное состояние без prop drilling

import React, { createContext, useContext, useState } from 'react';

// 1. Создание контекста
const ThemeContext = createContext();

// 2. Provider компонент
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Хук для использования контекста
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
}

// 4. Использование в компонентах
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={\`header header--\${theme}\`}>
      <h1>Моё приложение</h1>
      <button onClick={toggleTheme}>
        Переключить тему
      </button>
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      {/* Другие компоненты тоже имеют доступ к theme */}
    </ThemeProvider>
  );
}
`

const jsxSnippet = `
// JSX - JavaScript XML синтаксис

// JSX код
const element = (
  <div className="container">
    <h1>Привет, {user.name}!</h1>
    <p>Сегодня {new Date().toLocaleDateString()}</p>
    {isLoggedIn ? (
      <button onClick={handleLogout}>Выйти</button>
    ) : (
      <button onClick={handleLogin}>Войти</button>
    )}
  </div>
);

// Компилируется в:
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Привет, ', user.name, '!'),
  React.createElement('p', null, 'Сегодня ', new Date().toLocaleDateString()),
  isLoggedIn
    ? React.createElement('button', { onClick: handleLogout }, 'Выйти')
    : React.createElement('button', { onClick: handleLogin }, 'Войти')
);

// Преимущества JSX:
// 1. Читаемость - похоже на HTML
// 2. Инструменты - подсветка синтаксиса, автодополнение
// 3. Типобезопасность - ошибки на этапе компиляции
// 4. Производительность - оптимизация на этапе сборки
`

const performanceSnippet = `
// Оптимизация производительности React

import React, { memo, useMemo, useCallback } from 'react';

// 1. React.memo - мемоизация компонента
const ExpensiveComponent = memo(({ data, onAction }) => {
  console.log('Рендер ExpensiveComponent');

  return (
    <div>
      <h3>{data.title}</h3>
      <button onClick={onAction}>Действие</button>
    </div>
  );
});

// 2. useMemo - мемоизация вычислений
function DataList({ items, filter }) {
  // Фильтрация выполняется только при изменении items или filter
  const filteredItems = useMemo(() => {
    console.log('Вычисление фильтрованного списка');
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 3. useCallback - мемоизация функций
function TodoList({ todos }) {
  const [count, setCount] = React.useState(0);

  // Функция не пересоздаётся при изменении count
  const handleToggle = useCallback((id) => {
    console.log('Toggle todo:', id);
    // ... логика
  }, []); // Пустой массив зависимостей

  return (
    <div>
      <p>Рендеров: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>

      {todos.map(todo => (
        <ExpensiveComponent
          key={todo.id}
          data={todo}
          onAction={() => handleToggle(todo.id)}
        />
      ))}
    </div>
  );
}

// 4. Ленивая загрузка компонентов
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Загрузка...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
`

const ecosystemSnippet = `
// React экосистема - популярные библиотеки

// 1. Роутинг - React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/about">О нас</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

// 2. Управление состоянием - Redux Toolkit
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 }
  }
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
    </div>
  );
}

// 3. Запросы к API - React Query
import { useQuery, useMutation } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json())
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 4. Формы - React Hook Form
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email обязателен' })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('password', { minLength: 6 })}
        type="password"
        placeholder="Пароль"
      />

      <button type="submit">Войти</button>
    </form>
  );
}
`

const highlightedBasicComponent = ref('')
const highlightedVirtualDom = ref('')
const highlightedComponentType = ref('')
const highlightedHooks = ref('')
const highlightedContext = ref('')
const highlightedJsx = ref('')
const highlightedPerformance = ref('')
const highlightedEcosystem = ref('')

onMounted(() => {
  highlightedBasicComponent.value = Prism.highlight(
    basicComponentSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedVirtualDom.value = Prism.highlight(
    virtualDomSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedComponentType.value = Prism.highlight(
    componentTypeSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedHooks.value = Prism.highlight(
    hooksSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedContext.value = Prism.highlight(
    contextSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedJsx.value = Prism.highlight(
    jsxSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedPerformance.value = Prism.highlight(
    performanceSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedEcosystem.value = Prism.highlight(
    ecosystemSnippet,
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
              Что такое React.js и какие основные преимущества он предоставляет?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>React</b> — это JavaScript библиотека для создания пользовательских интерфейсов,
              разработанная компанией Meta (Facebook). React использует компонентный подход,
              декларативный стиль программирования и эффективный механизм обновления DOM через
              Virtual DOM. Это один из самых популярных инструментов для фронтенд-разработки в 2025 году.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое React?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-react</v-icon>
                    <h3 class="text-h6 font-weight-bold">Основные факты</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Библиотека, не фреймворк</strong> — фокус на View слое</li>
                    <li><strong>Создана Meta</strong> в 2013 году</li>
                    <li><strong>Open Source</strong> — MIT лицензия</li>
                    <li><strong>Используется</strong> в Facebook, Instagram, Netflix, Airbnb</li>
                    <li><strong>Огромная экосистема</strong> библиотек и инструментов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-puzzle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Ключевые концепции</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Компоненты</strong> — переиспользуемые UI блоки</li>
                    <li><strong>Virtual DOM</strong> — эффективное обновление</li>
                    <li><strong>JSX</strong> — синтаксис для описания UI</li>
                    <li><strong>Однонаправленный поток данных</strong></li>
                    <li><strong>Hooks</strong> — функциональный подход к состоянию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Простой пример React компонента</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicComponent"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные преимущества React</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">1. Производительность</h3>
                  <p class="text-body-2">
                    Virtual DOM минимизирует количество операций с реальным DOM,
                    что делает обновления быстрыми и эффективными
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-puzzle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">2. Компонентность</h3>
                  <p class="text-body-2">
                    Разделение UI на независимые, переиспользуемые компоненты
                    упрощает разработку и поддержку сложных приложений
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-code-braces</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">3. Декларативность</h3>
                  <p class="text-body-2">
                    Описываете "что" должно быть на экране, а не "как" этого достичь.
                    React сам обновляет UI при изменении данных
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-language-javascript</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">4. JavaScript everywhere</h3>
                  <p class="text-body-2">
                    Вся логика на JavaScript, никаких специальных шаблонных языков.
                    JSX — это просто синтаксический сахар
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-account-group</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">5. Огромное сообщество</h3>
                  <p class="text-body-2">
                    Миллионы разработчиков, тысячи библиотек, множество ресурсов
                    для обучения и решения проблем
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-devices</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">6. Кроссплатформенность</h3>
                  <p class="text-body-2">
                    React Native позволяет использовать те же навыки для создания
                    мобильных приложений на iOS и Android
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Virtual DOM — ключевая особенность</h2>
            <p class="font-weight-regular mb-4">
              <b>Virtual DOM</b> — это облегченное представление реального DOM в памяти JavaScript.
              React создает виртуальное дерево, сравнивает его с предыдущей версией (diffing) и
              применяет только минимально необходимые изменения к реальному DOM (reconciliation).
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVirtualDom"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы компонентов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComponentType"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">React Hooks — современный подход</h2>
            <p class="font-weight-regular mb-4">
              <b>Hooks</b> (хуки) — это функции, которые позволяют "подключаться" к состоянию и
              жизненному циклу React из функциональных компонентов. Введены в React 16.8 (2019).
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHooks"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные хуки React</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Хук</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>useState</code></td>
                <td>Локальное состояние компонента</td>
                <td>const [state, setState] = useState(initial)</td>
              </tr>
              <tr>
                <td><code>useEffect</code></td>
                <td>Побочные эффекты (API, подписки)</td>
                <td>useEffect(() => { /* эффект */ }, [deps])</td>
              </tr>
              <tr>
                <td><code>useContext</code></td>
                <td>Доступ к контексту</td>
                <td>const value = useContext(Context)</td>
              </tr>
              <tr>
                <td><code>useRef</code></td>
                <td>Мутабельная ссылка, DOM элементы</td>
                <td>const ref = useRef(initialValue)</td>
              </tr>
              <tr>
                <td><code>useMemo</code></td>
                <td>Мемоизация вычислений</td>
                <td>const value = useMemo(() => compute(), [deps])</td>
              </tr>
              <tr>
                <td><code>useCallback</code></td>
                <td>Мемоизация функций</td>
                <td>const fn = useCallback(() => {}, [deps])</td>
              </tr>
              <tr>
                <td><code>useReducer</code></td>
                <td>Сложное состояние (альтернатива useState)</td>
                <td>const [state, dispatch] = useReducer(reducer, init)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Context API — управление глобальным состоянием</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedContext"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">JSX — JavaScript XML</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsx"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">React экосистема</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEcosystem"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение React с другими решениями</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">React</th>
                <th class="text-left font-weight-bold">Vue</th>
                <th class="text-left font-weight-bold">Angular</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Тип</b></td>
                <td>Библиотека (View)</td>
                <td>Прогрессивный фреймворк</td>
                <td>Полноценный фреймворк</td>
              </tr>
              <tr>
                <td><b>Размер</b></td>
                <td>~42 KB (gzipped)</td>
                <td>~34 KB</td>
                <td>~167 KB</td>
              </tr>
              <tr>
                <td><b>Кривая обучения</b></td>
                <td>Средняя (JSX, концепции)</td>
                <td>Низкая (проще старт)</td>
                <td>Высокая (много концепций)</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td>Высокая (Virtual DOM)</td>
                <td>Высокая (реактивность)</td>
                <td>Хорошая (change detection)</td>
              </tr>
              <tr>
                <td><b>Экосистема</b></td>
                <td>Огромная</td>
                <td>Большая</td>
                <td>Встроенная</td>
              </tr>
              <tr>
                <td><b>TypeScript</b></td>
                <td>Отличная поддержка</td>
                <td>Хорошая поддержка</td>
                <td>Нативная поддержка</td>
              </tr>
              <tr>
                <td><b>Мобильная разработка</b></td>
                <td>React Native</td>
                <td>Capacitor, NativeScript</td>
                <td>Ionic, NativeScript</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Virtual DOM и как он работает?</p>
                <p class="font-weight-regular ma-0">
                  Virtual DOM — это представление реального DOM в JavaScript объектах. React создает
                  виртуальное дерево, при обновлении состояния сравнивает новое дерево со старым (diffing),
                  вычисляет минимальный набор изменений и применяет их к реальному DOM (reconciliation).
                  Это быстрее прямых манипуляций с DOM.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между state и props?</p>
                <p class="font-weight-regular ma-0">
                  <b>Props</b> (properties) — это данные, передаваемые от родителя к ребенку. Они
                  иммутабельны внутри компонента. <b>State</b> — это внутреннее изменяемое состояние
                  компонента. При изменении state компонент перерендеривается.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое JSX и обязательно ли его использовать?</p>
                <p class="font-weight-regular ma-0">
                  JSX — это синтаксическое расширение JavaScript, позволяющее писать HTML-подобный
                  код в JavaScript. Он не обязателен — можно использовать React.createElement(), но
                  JSX делает код более читаемым и поддерживается всеми современными инструментами сборки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое React Hooks и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Hooks — это функции, позволяющие использовать состояние и другие возможности React
                  в функциональных компонентах. Они решают проблемы классовых компонентов: сложная
                  логика жизненного цикла, проблемы с this, сложность переиспользования логики.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает reconciliation в React?</p>
                <p class="font-weight-regular ma-0">
                  Reconciliation — это процесс, при котором React определяет, какие части UI нужно
                  обновить. React использует алгоритм diff, сравнивая новое и старое дерево компонентов.
                  Ключевые оптимизации: сравнение по типу элемента, использование key для списков,
                  предположение о стабильности дерева.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между controlled и uncontrolled компонентами?</p>
                <p class="font-weight-regular ma-0">
                  <b>Controlled</b> компоненты — состояние формы контролируется React через state.
                  <b>Uncontrolled</b> — DOM сам управляет состоянием, React получает значения через refs.
                  Controlled предпочтительнее для валидации, динамического поведения и единого источника правды.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое keys в React и почему они важны?</p>
                <p class="font-weight-regular ma-0">
                  Keys помогают React идентифицировать, какие элементы изменились, были добавлены или удалены
                  в списках. Без keys React может неправильно обновлять компоненты или терять состояние.
                  Keys должны быть стабильными, уникальными и не меняться между рендерами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает useEffect и чем он отличается от componentDidMount?</p>
                <p class="font-weight-regular ma-0">
                  useEffect выполняется после рендера компонента. С пустым массивом зависимостей []
                  он похож на componentDidMount, но выполняется асинхронно. useEffect может возвращать
                  cleanup функцию (аналог componentWillUnmount) и перезапускаться при изменении зависимостей.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать React?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">✅ Подходит для</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>SPA (Single Page Applications)</li>
                    <li>Сложные интерактивные интерфейсы</li>
                    <li>Приложения с частыми обновлениями UI</li>
                    <li>Проекты с большой командой</li>
                    <li>Кроссплатформенные приложения (React Native)</li>
                    <li>Прогрессивные веб-приложения (PWA)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">⚠️ Возможны альтернативы</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Простые статические сайты (используйте SSG)</li>
                    <li>Проекты с жесткими требованиями к SEO (Next.js)</li>
                    <li>Маленькие команды/проекты (Vue проще)</li>
                    <li>Корпоративные приложения (Angular лучше)</li>
                    <li>Строгая типизация критична (Angular + TypeScript)</li>
                    <li>Минимальный bundle size (Preact, Svelte)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные тренды React (2025)</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-server</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Server Components</h3>
                  <p class="text-body-2">Компоненты, рендерящиеся на сервере в Next.js 13+</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Concurrent Mode</h3>
                  <p class="text-body-2">Прерываемый рендеринг для улучшения отзывчивости</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-suspense</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Suspense</h3>
                  <p class="text-body-2">Декларативная загрузка данных и code splitting</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-code-tags</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">React Compiler</h3>
                  <p class="text-body-2">Автоматическая оптимизация без memo/useCallback</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать функциональные компоненты и хуки</li>
                    <li>Разделять компоненты по ответственности</li>
                    <li>Использовать TypeScript для типобезопасности</li>
                    <li>Мемоизировать дорогие вычисления (useMemo)</li>
                    <li>Использовать key для списков</li>
                    <li>Следовать принципам SOLID</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Прямых манипуляций с DOM (используйте ref)</li>
                    <li>Мутирования state напрямую</li>
                    <li>Слишком больших компонентов</li>
                    <li>Излишней оптимизации (memo везде)</li>
                    <li>Index как key в динамических списках</li>
                    <li>Prop drilling (используйте Context/Redux)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте React DevTools для отладки</li>
                    <li>Изучите паттерны (Compound, HOC, Render Props)</li>
                    <li>Автоматизируйте тестирование (Jest, RTL)</li>
                    <li>Изучите Next.js для production приложений</li>
                    <li>Следите за обновлениями React</li>
                    <li>Читайте официальную документацию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>React</b> — это мощная, гибкая и популярная библиотека для создания пользовательских
              интерфейсов. Основные преимущества: <b>производительность</b> через Virtual DOM,
              <b>компонентная архитектура</b>, <b>декларативный подход</b>, <b>огромная экосистема</b>
              и <b>активное сообщество</b>. React подходит для большинства современных веб-приложений,
              от небольших SPA до крупных enterprise решений. Знание React — обязательный навык для
              фронтенд-разработчика в 2025 году.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/"
                target="_blank"
                class="mr-2">
                React Documentation
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://github.com/facebook/react"
                target="_blank">
                React GitHub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
