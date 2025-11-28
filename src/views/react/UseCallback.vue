<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const badExampleSnippet = `
// ❌ ПРОБЛЕМА: Функция пересоздается при каждом рендере

import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  // Каждый рендер создается НОВАЯ функция!
  const handleAddTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      {/* При изменении count AddTodoForm ПЕРЕРЕНДЕРИВАЕТСЯ,
          хотя todos не изменились! */}
      <AddTodoForm onAdd={handleAddTodo} />

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

// Мемоизированный компонент
const AddTodoForm = React.memo(({ onAdd }) => {
  console.log('AddTodoForm render'); // Будет логироваться каждый раз!
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
});

// ПРОБЛЕМА: onAdd каждый раз новая функция → React.memo не работает!
`

const goodExampleSnippet = `
// ✅ РЕШЕНИЕ: useCallback сохраняет ссылку на функцию

import { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  // Функция создается ОДИН РАЗ и сохраняется между рендерами
  const handleAddTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []); // Пустой массив зависимостей = функция никогда не пересоздается

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      {/* Теперь AddTodoForm НЕ перерендеривается при изменении count */}
      <AddTodoForm onAdd={handleAddTodo} />

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

const AddTodoForm = React.memo(({ onAdd }) => {
  console.log('AddTodoForm render'); // Только при первом рендере!
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
});

// РЕШЕНО: onAdd стабильная ссылка → React.memo предотвращает рендер!
`

const basicUsageSnippet = `
// Базовое использование useCallback

import { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Без зависимостей - функция создается один раз
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1); // Используем функциональное обновление
  }, []);

  // С зависимостями - пересоздается при изменении count
  const handleIncrementByAmount = useCallback((amount) => {
    setCount(count + amount); // count в зависимостях!
  }, [count]); // При изменении count создается новая функция

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={() => handleIncrementByAmount(5)}>+5</button>
    </div>
  );
}
`

const dependenciesSnippet = `
// Зависимости в useCallback

function SearchResults({ query, filters }) {
  const [results, setResults] = useState([]);

  // ❌ НЕПРАВИЛЬНО: Забыли зависимость
  const handleSearch = useCallback(() => {
    fetchResults(query, filters) // query и filters не в зависимостях!
      .then(setResults);
  }, []); // Будет использовать старые query и filters

  // ✅ ПРАВИЛЬНО: Все используемые переменные в зависимостях
  const handleSearchCorrect = useCallback(() => {
    fetchResults(query, filters)
      .then(setResults);
  }, [query, filters]); // Пересоздается при изменении query или filters

  // ✅ АЛЬТЕРНАТИВА: Функциональное обновление + ref
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const handleSearchWithRef = useCallback(() => {
    fetchResults(query, filtersRef.current)
      .then(setResults);
  }, [query]); // Только query в зависимостях

  return (
    <div>
      <button onClick={handleSearchCorrect}>Search</button>
      <ResultsList results={results} />
    </div>
  );
}
`

const eventHandlersSnippet = `
// useCallback с обработчиками событий

function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Обработчик для конкретного поля
  const handleNameChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  // Универсальный обработчик
  const handleChange = useCallback((field) => {
    return (e) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
  }, []);

  // Обработчик отправки с валидацией
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Fill all fields');
      return;
    }

    submitForm(formData);
  }, [formData]); // Пересоздается при изменении formData

  return (
    <form onSubmit={handleSubmit}>
      {/* Вариант 1: Отдельные обработчики */}
      <input value={formData.name} onChange={handleNameChange} />
      <input value={formData.email} onChange={handleEmailChange} />

      {/* Вариант 2: Универсальный обработчик */}
      <input value={formData.name} onChange={handleChange('name')} />
      <input value={formData.email} onChange={handleChange('email')} />

      <button type="submit">Submit</button>
    </form>
  );
}
`

const childComponentsSnippet = `
// useCallback для дочерних компонентов

function ParentComponent() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // ✅ Стабильная ссылка для мемоизированного компонента
  const handleItemClick = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const handleItemDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onClick={handleItemClick}
          onDelete={handleItemDelete}
        />
      ))}
    </div>
  );
}

// Мемоизированный дочерний компонент
const ItemCard = React.memo(({ item, isSelected, onClick, onDelete }) => {
  console.log('ItemCard render:', item.id);

  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, [item.id, onDelete]);

  return (
    <div onClick={handleClick} className={isSelected ? 'selected' : ''}>
      <h3>{item.title}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});
`

const effectsSnippet = `
// useCallback с useEffect

function DataFetcher({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Стабильная функция для useEffect
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]); // Пересоздается только при изменении userId

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData в зависимостях

  // Без useCallback fetchData пересоздавалась бы каждый рендер
  // → бесконечный цикл: fetchData меняется → effect запускается → рендер → fetchData меняется...

  return (
    <div>
      {loading ? <Spinner /> : <UserData data={data} />}
      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}
`

const debounceSnippet = `
// useCallback с debounce/throttle

import { useState, useCallback, useRef } from 'react';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Debounce функция
  const debounceTimerRef = useRef(null);

  const performSearch = useCallback((term) => {
    fetch(\`/api/search?q=\${term}\`)
      .then(res => res.json())
      .then(setResults);
  }, []);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Очищаем предыдущий таймер
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Запускаем новый таймер
    debounceTimerRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  }, [performSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <SearchResults results={results} />
    </div>
  );
}

// Альтернатива: кастомный хук useDebouncedCallback
function useDebouncedCallback(callback, delay, deps) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...deps]);
}
`

const whenToUseSnippet = `
// Когда использовать useCallback, а когда нет

// ❌ НЕ НУЖЕН useCallback - простой обработчик в родителе
function SimpleButton() {
  const [count, setCount] = useState(0);

  // Обычная функция достаточно - нет дочерних компонентов
  const handleClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}

// ❌ НЕ НУЖЕН - инлайн функция не влияет на производительность
function InlineHandler() {
  const [text, setText] = useState('');

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)} // Это нормально
    />
  );
}

// ✅ НУЖЕН - передача в мемоизированный компонент
function WithMemoizedChild() {
  const [count, setCount] = useState(0);

  const handleUpdate = useCallback(() => {
    console.log('Updated');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveComponent onUpdate={handleUpdate} />
    </div>
  );
}

const ExpensiveComponent = React.memo(({ onUpdate }) => {
  // Тяжелые вычисления
  return <div>Expensive render</div>;
});

// ✅ НУЖЕН - зависимость в useEffect
function WithEffect() {
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    const result = await api.getData();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div>{data}</div>;
}

// ✅ НУЖЕН - передача в сторонние библиотеки
function WithLibrary() {
  const handleChange = useCallback((value) => {
    console.log('Changed:', value);
  }, []);

  return <ExternalLibraryComponent onChange={handleChange} />;
}
`

const performanceSnippet = `
// Производительность: useCallback vs обычные функции

import { useState, useCallback, memo } from 'react';

// Пример: Большой список элементов

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // ❌ БЕЗ useCallback - каждый элемент перерендеривается
  const handleToggleBad = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // ✅ С useCallback - только измененный элемент рендерится
  const handleToggleGood = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const handleDeleteGood = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />

      {/* С handleToggleBad все элементы перерендерятся */}
      {/* С handleToggleGood только изменившийся */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleGood}
          onDelete={handleDeleteGood}
        />
      ))}
    </div>
  );
}

const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log('Render TodoItem:', todo.id);

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

// Результат:
// БЕЗ useCallback: 100 элементов → 100 рендеров при изменении одного
// С useCallback: 100 элементов → 1 рендер при изменении одного
`

const commonMistakesSnippet = `
// Частые ошибки с useCallback

// ❌ ОШИБКА 1: Забыли зависимости
function BadDeps() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count); // Всегда будет 0!
  }, []); // count должен быть в зависимостях

  return <button onClick={handleClick}>Log count</button>;
}

// ✅ ПРАВИЛЬНО
function GoodDeps() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count);
  }, [count]); // count в зависимостях

  return <button onClick={handleClick}>Log count</button>;
}

// ❌ ОШИБКА 2: Избыточное использование
function Overkill() {
  const [text, setText] = useState('');

  // НЕ НУЖЕН - нет мемоизированных компонентов
  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return <input value={text} onChange={handleChange} />;
}

// ❌ ОШИБКА 3: Создание функции в useCallback
function NestedFunction() {
  const [items, setItems] = useState([]);

  // ПЛОХО: Каждый раз создается новая функция внутри
  const handleClick = useCallback((id) => {
    return () => { // ← Эта функция создается заново!
      setItems(prev => prev.filter(item => item.id !== id));
    };
  }, []);

  return items.map(item => (
    <button key={item.id} onClick={handleClick(item.id)}>
      Delete
    </button>
  ));
}

// ✅ ПРАВИЛЬНО: Функция стабильна
function StableFunction() {
  const [items, setItems] = useState([]);

  const handleClick = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return items.map(item => (
    <button key={item.id} onClick={() => handleClick(item.id)}>
      Delete
    </button>
  ));
}

// ❌ ОШИБКА 4: Неправильная мемоизация с объектами
function ObjectInDeps() {
  const config = { timeout: 1000 }; // Новый объект каждый рендер!

  const handleFetch = useCallback(() => {
    fetchWithConfig(config); // config всегда новый → callback пересоздается
  }, [config]);

  return <button onClick={handleFetch}>Fetch</button>;
}

// ✅ ПРАВИЛЬНО: Используем примитивы или useMemo
function PrimitivesInDeps() {
  const timeout = 1000;

  const handleFetch = useCallback(() => {
    fetchWithConfig({ timeout });
  }, [timeout]); // Примитив стабилен

  return <button onClick={handleFetch}>Fetch</button>;
}
`

const highlightedBadExample = ref('')
const highlightedGoodExample = ref('')
const highlightedBasicUsage = ref('')
const highlightedDependencies = ref('')
const highlightedEventHandlers = ref('')
const highlightedChildComponents = ref('')
const highlightedEffects = ref('')
const highlightedDebounce = ref('')
const highlightedWhenToUse = ref('')
const highlightedPerformance = ref('')
const highlightedCommonMistakes = ref('')

onMounted(() => {
  highlightedBadExample.value = Prism.highlight(badExampleSnippet, Prism.languages.jsx, 'jsx')
  highlightedGoodExample.value = Prism.highlight(goodExampleSnippet, Prism.languages.jsx, 'jsx')
  highlightedBasicUsage.value = Prism.highlight(basicUsageSnippet, Prism.languages.jsx, 'jsx')
  highlightedDependencies.value = Prism.highlight(dependenciesSnippet, Prism.languages.jsx, 'jsx')
  highlightedEventHandlers.value = Prism.highlight(eventHandlersSnippet, Prism.languages.jsx, 'jsx')
  highlightedChildComponents.value = Prism.highlight(childComponentsSnippet, Prism.languages.jsx, 'jsx')
  highlightedEffects.value = Prism.highlight(effectsSnippet, Prism.languages.jsx, 'jsx')
  highlightedDebounce.value = Prism.highlight(debounceSnippet, Prism.languages.jsx, 'jsx')
  highlightedWhenToUse.value = Prism.highlight(whenToUseSnippet, Prism.languages.jsx, 'jsx')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.jsx, 'jsx')
  highlightedCommonMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.jsx, 'jsx')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              useCallback в React: мемоизация функций
            </h1>

            <p class="font-weight-regular mb-6">
              <b>useCallback</b> — это React хук, который возвращает мемоизированную версию функции,
              которая изменяется только при изменении зависимостей. Основное назначение — предотвращение
              ненужных перерендеров дочерних компонентов и оптимизация производительности при работе
              с обработчиками событий.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема: функции пересоздаются каждый рендер</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-circle</v-icon>
              <strong>Проблема:</strong> При каждом рендере компонента создается новая функция с новой ссылкой,
              что ломает мемоизацию через React.memo!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBadExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">✅ Решение: useCallback сохраняет ссылку</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> useCallback создает функцию один раз и возвращает ту же ссылку
              между рендерами, пока не изменятся зависимости.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedGoodExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Синтаксис и базовое использование</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-code-braces</v-icon>
                    <h3 class="text-h6 font-weight-bold">Синтаксис</h3>
                  </div>
                  <code>const memoizedCallback = useCallback(fn, deps)</code>
                  <ul class="pl-4 mt-3">
                    <li><b>fn</b> — функция для мемоизации</li>
                    <li><b>deps</b> — массив зависимостей</li>
                    <li><b>возвращает</b> — мемоизированную функцию</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-lightbulb</v-icon>
                    <h3 class="text-h6 font-weight-bold">Принцип работы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Сохраняет функцию между рендерами</li>
                    <li>Пересоздает только при изменении deps</li>
                    <li>Возвращает одну и ту же ссылку</li>
                    <li>Работает с React.memo</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicUsage"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Зависимости в useCallback</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDependencies"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useCallback с обработчиками событий</h2>
            <p class="font-weight-regular mb-4">
              Самый распространенный случай использования — обработчики событий в формах и интерактивных элементах.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventHandlers"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useCallback для дочерних компонентов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedChildComponents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useCallback с useEffect</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Без useCallback функция в useEffect будет пересоздаваться каждый рендер,
              вызывая бесконечный цикл!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEffects"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useCallback с debounce/throttle</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedDebounce"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать useCallback</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Нужен useCallback</h3>
                  <ul class="text-white pl-4">
                    <li>Передача в React.memo компоненты</li>
                    <li>Зависимость в useEffect/useLayoutEffect</li>
                    <li>Зависимость в других хуках</li>
                    <li>Передача в сторонние библиотеки</li>
                    <li>Контекст для множества компонентов</li>
                    <li>Debounce/throttle функции</li>
                    <li>Оптимизация больших списков</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">❌ НЕ нужен useCallback</h3>
                  <ul class="text-white pl-4">
                    <li>Простые обработчики событий</li>
                    <li>Функции без зависимостей в deps</li>
                    <li>Компоненты без мемоизации</li>
                    <li>Инлайн функции в JSX</li>
                    <li>Функции внутри useEffect</li>
                    <li>Однократно вызываемые функции</li>
                    <li>Преждевременная оптимизация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWhenToUse"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на производительность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommonMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useCallback vs useMemo vs обычные функции</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Обычная функция</th>
                <th class="text-left font-weight-bold">useCallback</th>
                <th class="text-left font-weight-bold">useMemo</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Что возвращает</b></td>
                <td>Новую функцию каждый раз</td>
                <td>Мемоизированную функцию</td>
                <td>Мемоизированное значение</td>
              </tr>
              <tr>
                <td><b>Когда пересоздается</b></td>
                <td>Каждый рендер</td>
                <td>При изменении deps</td>
                <td>При изменении deps</td>
              </tr>
              <tr>
                <td><b>Использование</b></td>
                <td>Простые обработчики</td>
                <td>Обработчики для memo</td>
                <td>Дорогие вычисления</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td>Быстрое создание</td>
                <td>Overhead мемоизации</td>
                <td>Overhead мемоизации</td>
              </tr>
              <tr>
                <td><b>Сложность</b></td>
                <td>Низкая</td>
                <td>Средняя (deps)</td>
                <td>Средняя (deps)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое useCallback и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  useCallback — хук для мемоизации функций. Он возвращает одну и ту же ссылку на функцию
                  между рендерами, пока не изменятся зависимости. Нужен для оптимизации: предотвращает
                  ненужные перерендеры дочерних компонентов, обернутых в React.memo, и позволяет стабильно
                  использовать функции в зависимостях useEffect.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между useCallback и useMemo?</p>
                <p class="font-weight-regular ma-0">
                  useCallback мемоизирует саму функцию: <code>useCallback(fn, deps)</code> ≈ <code>useMemo(() => fn, deps)</code>.
                  useMemo мемоизирует результат вызова функции. useCallback для обработчиков событий,
                  useMemo для дорогих вычислений.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что будет, если забыть зависимости в useCallback?</p>
                <p class="font-weight-regular ma-0">
                  Функция будет замкнута на старые значения переменных из замыкания. Например, если в зависимостях
                  нет count, функция всегда будет видеть count как 0 (значение при первом рендере). ESLint правило
                  react-hooks/exhaustive-deps предупреждает об этом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ нужно использовать useCallback?</p>
                <p class="font-weight-regular ma-0">
                  Когда функция не передается в мемоизированные компоненты или не используется в зависимостях
                  других хуков. Для простых обработчиков событий в JSX обычная функция или инлайн стрелка
                  работают отлично. useCallback имеет свой overhead — не стоит использовать его везде.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как useCallback работает с React.memo?</p>
                <p class="font-weight-regular ma-0">
                  React.memo сравнивает пропсы по ссылке. Без useCallback каждый рендер создает новую функцию →
                  новая ссылка → React.memo считает, что пропс изменился → компонент перерендеривается.
                  С useCallback функция стабильна → React.memo предотвращает рендер.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать useCallback без зависимостей?</p>
                <p class="font-weight-regular ma-0">
                  Да, пустой массив [] означает, что функция создается один раз и никогда не пересоздается.
                  Но функция должна использовать только стабильные значения или функциональные обновления setState.
                  Иначе она будет замкнута на начальные значения.
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
                    <li>Использовать с React.memo компонентами</li>
                    <li>Включать все зависимости</li>
                    <li>Функциональные обновления setState</li>
                    <li>ESLint exhaustive-deps правило</li>
                    <li>Профилировать перед оптимизацией</li>
                    <li>Документировать сложные deps</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Преждевременной оптимизации</li>
                    <li>useCallback без React.memo</li>
                    <li>Игнорирования ESLint предупреждений</li>
                    <li>Создания функций внутри useCallback</li>
                    <li>Объектов в зависимостях</li>
                    <li>useCallback везде "на всякий случай"</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Измеряйте производительность</li>
                    <li>Используйте React DevTools Profiler</li>
                    <li>Комбинируйте с useMemo</li>
                    <li>Создавайте кастомные хуки</li>
                    <li>Изучайте паттерны оптимизации</li>
                    <li>Читайте документацию React</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>useCallback</b> — инструмент оптимизации, который мемоизирует функции и сохраняет их ссылку
              между рендерами. Критически важен при работе с React.memo компонентами и зависимостями в хуках.
              Основные случаи использования: обработчики событий для мемоизированных компонентов, функции
              в зависимостях useEffect, debounce/throttle функции. Не стоит использовать везде — измеряйте
              производительность и оптимизируйте только узкие места.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useCallback"
                target="_blank"
                class="mr-2">
                React Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://kentcdodds.com/blog/usememo-and-usecallback"
                target="_blank">
                When to useMemo/useCallback
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
