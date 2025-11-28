<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const basicExampleSnippet = `
// ❌ Без useMemo - вычисление при каждом рендере
function ExpensiveComponent({ items, filterText }) {
  // Эта функция выполняется КАЖДЫЙ раз при рендере компонента
  // Даже если items и filterText не изменились!
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// ✅ С useMemo - вычисление только при изменении зависимостей
import { useMemo } from 'react';

function OptimizedComponent({ items, filterText }) {
  // Вычисление выполняется только если items или filterText изменились
  const filteredItems = useMemo(() => {
    console.log('Пересчет фильтрации...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]); // Массив зависимостей

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
`

const usageExampleSnippet = `
// Синтаксис useMemo
const memoizedValue = useMemo(
  () => {
    // Вычисления
    return computeExpensiveValue(a, b);
  },
  [a, b] // Зависимости
);

// Полный пример с useMemo
import { useMemo, useState } from 'react';

function ProductList({ products }) {
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // useMemo для фильтрации
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);

  // useMemo для сортировки
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }, [filteredProducts, sortOrder]);

  return (
    <div>
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder}
      </button>
      <ul>
        {sortedProducts.map(product => (
          <li key={product.id}>
            {product.name} - $\{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
`

const complexCalculationSnippet = `
// Пример сложных вычислений с useMemo

function DataAnalytics({ data }) {
  // 1. Статистические вычисления
  const statistics = useMemo(() => {
    console.log('Computing statistics...');

    const sum = data.reduce((acc, val) => acc + val, 0);
    const average = sum / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);

    // Медиана
    const sorted = [...data].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    // Стандартное отклонение
    const variance = data.reduce((acc, val) =>
      acc + Math.pow(val - average, 2), 0
    ) / data.length;
    const stdDev = Math.sqrt(variance);

    return { sum, average, min, max, median, stdDev };
  }, [data]);

  // 2. Группировка данных
  const groupedData = useMemo(() => {
    console.log('Grouping data...');

    return data.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  }, [data]);

  // 3. Построение графа зависимостей
  const dependencyGraph = useMemo(() => {
    console.log('Building dependency graph...');

    const graph = new Map();
    data.forEach(item => {
      const dependencies = item.dependencies || [];
      graph.set(item.id, {
        ...item,
        children: dependencies
      });
    });
    return graph;
  }, [data]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Average: {statistics.average.toFixed(2)}</p>
      <p>Std Dev: {statistics.stdDev.toFixed(2)}</p>
      {/* ... */}
    </div>
  );
}
`

const referenceEqualitySnippet = `
// useMemo для сохранения ссылочного равенства

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ Без useMemo - новый объект каждый раз
  const config = {
    theme: 'dark',
    language: 'ru',
    maxItems: 100
  };

  // ✅ С useMemo - тот же объект при неизменных зависимостях
  const memoizedConfig = useMemo(() => ({
    theme: 'dark',
    language: 'ru',
    maxItems: 100
  }), []); // Пустой массив - создается только один раз

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Без useMemo: ChildComponent ре-рендерится всегда */}
      <ChildComponent config={config} />

      {/* С useMemo: ChildComponent НЕ ре-рендерится если config не изменился */}
      <OptimizedChild config={memoizedConfig} />
    </div>
  );
}

// Мемоизированный дочерний компонент
const ChildComponent = React.memo(({ config }) => {
  console.log('ChildComponent rendered');
  return <div>Theme: {config.theme}</div>;
});

const OptimizedChild = React.memo(({ config }) => {
  console.log('OptimizedChild rendered');
  return <div>Theme: {config.theme}</div>;
});
`

const withReactMemoSnippet = `
// Комбинация useMemo и React.memo

import { useMemo } from 'react';

function TodoList({ todos, filter }) {
  // useMemo для данных
  const visibleTodos = useMemo(() => {
    console.log('Filtering todos...');

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // useMemo для обработчиков
  const handlers = useMemo(() => ({
    onToggle: (id) => {
      console.log('Toggle:', id);
    },
    onDelete: (id) => {
      console.log('Delete:', id);
    }
  }), []); // Обработчики не меняются

  return (
    <div>
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handlers={handlers}
        />
      ))}
    </div>
  );
}

// React.memo предотвращает ре-рендер при неизменных пропсах
const TodoItem = React.memo(({ todo, handlers }) => {
  console.log('TodoItem rendered:', todo.id);

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handlers.onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => handlers.onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
});
`

const antiPatternsSnippet = `
// ❌ АНТИПАТТЕРНЫ - когда НЕ нужен useMemo

// 1. Простые вычисления
function Component({ a, b }) {
  // ❌ Избыточно для простого сложения
  const sum = useMemo(() => a + b, [a, b]);

  // ✅ Просто вычислите
  const sum = a + b;

  return <div>{sum}</div>;
}

// 2. Примитивные значения
function Component({ value }) {
  // ❌ Примитивы и так сравниваются по значению
  const doubled = useMemo(() => value * 2, [value]);

  // ✅ Не нужна мемоизация
  const doubled = value * 2;

  return <div>{doubled}</div>;
}

// 3. Вычисления вне рендера
function Component({ items }) {
  // ❌ Это антипаттерн
  const expensiveValue = useMemo(() => {
    // Сложные вычисления
    return complexCalculation(items);
  }, [items]);

  // ✅ Если результат нужен один раз, используйте useState
  const [value] = useState(() => complexCalculation(items));

  return <div>{value}</div>;
}

// 4. Мемоизация всего подряд
function Component({ data }) {
  // ❌ Избыточная мемоизация - оверхед больше пользы
  const a = useMemo(() => data.a, [data]);
  const b = useMemo(() => data.b, [data]);
  const c = useMemo(() => data.c, [data]);

  // ✅ Деструктуризация проще
  const { a, b, c } = data;

  return <div>{a} {b} {c}</div>;
}
`

const performanceComparisonSnippet = `
// Сравнение производительности с и без useMemo

// ❌ Без оптимизации
function SlowComponent({ items, threshold }) {
  // При каждом рендере:
  // 1. Фильтрация массива
  const filtered = items.filter(item => item.value > threshold);

  // 2. Сортировка
  const sorted = [...filtered].sort((a, b) => b.value - a.value);

  // 3. Вычисление статистики
  const stats = {
    total: sorted.reduce((sum, item) => sum + item.value, 0),
    average: sorted.reduce((sum, item) => sum + item.value, 0) / sorted.length,
    max: Math.max(...sorted.map(item => item.value))
  };

  // 4. Форматирование данных для графика
  const chartData = sorted.map(item => ({
    x: item.name,
    y: item.value,
    color: item.value > stats.average ? 'green' : 'red'
  }));

  return (
    <div>
      <Chart data={chartData} />
      <Stats data={stats} />
    </div>
  );
}

// ✅ С useMemo - оптимизировано
function OptimizedComponent({ items, threshold }) {
  // 1. Мемоизация фильтрации
  const filtered = useMemo(() =>
    items.filter(item => item.value > threshold),
    [items, threshold]
  );

  // 2. Мемоизация сортировки
  const sorted = useMemo(() =>
    [...filtered].sort((a, b) => b.value - a.value),
    [filtered]
  );

  // 3. Мемоизация статистики
  const stats = useMemo(() => ({
    total: sorted.reduce((sum, item) => sum + item.value, 0),
    average: sorted.reduce((sum, item) => sum + item.value, 0) / sorted.length,
    max: Math.max(...sorted.map(item => item.value))
  }), [sorted]);

  // 4. Мемоизация данных для графика
  const chartData = useMemo(() =>
    sorted.map(item => ({
      x: item.name,
      y: item.value,
      color: item.value > stats.average ? 'green' : 'red'
    })),
    [sorted, stats.average]
  );

  return (
    <div>
      <Chart data={chartData} />
      <Stats data={stats} />
    </div>
  );
}
`

const realWorldExampleSnippet = `
// Реальный пример: Dashboard с множественными вычислениями

import { useMemo, useState } from 'react';

function SalesDashboard({ salesData, dateRange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 1. Фильтрация по дате
  const dateFilteredData = useMemo(() => {
    return salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= dateRange.start && saleDate <= dateRange.end;
    });
  }, [salesData, dateRange]);

  // 2. Фильтрация по категории
  const categoryFilteredData = useMemo(() => {
    if (selectedCategory === 'all') return dateFilteredData;
    return dateFilteredData.filter(sale =>
      sale.category === selectedCategory
    );
  }, [dateFilteredData, selectedCategory]);

  // 3. Вычисление метрик
  const metrics = useMemo(() => {
    const revenue = categoryFilteredData.reduce(
      (sum, sale) => sum + sale.amount, 0
    );

    const avgTransaction = revenue / categoryFilteredData.length || 0;

    const topProduct = categoryFilteredData.reduce((top, sale) => {
      if (!top || sale.amount > top.amount) return sale;
      return top;
    }, null);

    return {
      revenue,
      transactions: categoryFilteredData.length,
      avgTransaction,
      topProduct
    };
  }, [categoryFilteredData]);

  // 4. Группировка по дням для графика
  const chartData = useMemo(() => {
    const grouped = categoryFilteredData.reduce((acc, sale) => {
      const day = sale.date.split('T')[0];
      if (!acc[day]) {
        acc[day] = { date: day, revenue: 0, count: 0 };
      }
      acc[day].revenue += sale.amount;
      acc[day].count += 1;
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );
  }, [categoryFilteredData]);

  // 5. Список категорий для фильтра
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      salesData.map(sale => sale.category)
    );
    return ['all', ...Array.from(uniqueCategories)];
  }, [salesData]);

  return (
    <div className="dashboard">
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <MetricsPanel metrics={metrics} />

      <RevenueChart data={chartData} />

      <TransactionsList
        transactions={categoryFilteredData.slice(0, 10)}
      />
    </div>
  );
}
`

const highlightedBasicExample = ref('')
const highlightedUsageExample = ref('')
const highlightedComplexCalculation = ref('')
const highlightedReferenceEquality = ref('')
const highlightedWithReactMemo = ref('')
const highlightedAntiPatterns = ref('')
const highlightedPerformanceComparison = ref('')
const highlightedRealWorldExample = ref('')

onMounted(() => {
  highlightedBasicExample.value = Prism.highlight(basicExampleSnippet, Prism.languages.jsx, 'jsx')
  highlightedUsageExample.value = Prism.highlight(usageExampleSnippet, Prism.languages.jsx, 'jsx')
  highlightedComplexCalculation.value = Prism.highlight(complexCalculationSnippet, Prism.languages.jsx, 'jsx')
  highlightedReferenceEquality.value = Prism.highlight(referenceEqualitySnippet, Prism.languages.jsx, 'jsx')
  highlightedWithReactMemo.value = Prism.highlight(withReactMemoSnippet, Prism.languages.jsx, 'jsx')
  highlightedAntiPatterns.value = Prism.highlight(antiPatternsSnippet, Prism.languages.jsx, 'jsx')
  highlightedPerformanceComparison.value = Prism.highlight(performanceComparisonSnippet, Prism.languages.jsx, 'jsx')
  highlightedRealWorldExample.value = Prism.highlight(realWorldExampleSnippet, Prism.languages.jsx, 'jsx')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              useMemo в React
            </h1>

            <p class="font-weight-regular mb-6">
              <b>useMemo</b> — это React Hook для мемоизации (кэширования) результатов вычислений.
              Он запоминает результат выполнения функции и возвращает закэшированное значение,
              пока зависимости не изменились. Это оптимизирует производительность, избегая
              повторных дорогих вычислений при каждом рендере.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое useMemo?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Без useMemo</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Вычисления каждый раз</strong></li>
                    <li>При каждом рендере компонента</li>
                    <li>Независимо от изменений данных</li>
                    <li>Потеря производительности</li>
                    <li>Лишние вычислительные ресурсы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">С useMemo</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Кэширование результата</strong></li>
                    <li>Вычисление только при изменении зависимостей</li>
                    <li>Переиспользование закэшированного значения</li>
                    <li>Оптимизация производительности</li>
                    <li>Экономия ресурсов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Базовый пример</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Синтаксис и использование</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUsageExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать useMemo?</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Нужен useMemo?</th>
                <th class="text-left font-weight-bold">Причина</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Сложные вычисления</b></td>
                <td class="pt-2 pb-2 text-success">✅ Да</td>
                <td class="pt-2 pb-2">Избегает повторных дорогих операций</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Фильтрация/сортировка больших массивов</b></td>
                <td class="pt-2 pb-2 text-success">✅ Да</td>
                <td class="pt-2 pb-2">O(n) или O(n log n) операции</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Создание объектов/массивов для пропсов</b></td>
                <td class="pt-2 pb-2 text-success">✅ Да</td>
                <td class="pt-2 pb-2">Сохраняет ссылочное равенство для React.memo</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Простая арифметика</b></td>
                <td class="pt-2 pb-2 text-error">❌ Нет</td>
                <td class="pt-2 pb-2">Оверхед useMemo больше пользы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Примитивные значения</b></td>
                <td class="pt-2 pb-2 text-error">❌ Нет</td>
                <td class="pt-2 pb-2">Сравниваются по значению и так</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Деструктуризация объекта</b></td>
                <td class="pt-2 pb-2 text-error">❌ Нет</td>
                <td class="pt-2 pb-2">Не требует вычислений</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Сложные вычисления с useMemo</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComplexCalculation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">useMemo для ссылочного равенства</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Объекты и массивы в JavaScript сравниваются по ссылке.
              Новый объект {} !== новый объект {}, даже если содержимое одинаковое!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReferenceEquality"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинация useMemo и React.memo</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWithReactMemo"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Антипаттерны - когда НЕ нужен useMemo</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Внимание:</strong> Избыточное использование useMemo может ухудшить производительность!
              useMemo сам имеет оверхед: проверка зависимостей, хранение кэша в памяти.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAntiPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformanceComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реальный пример: Dashboard</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorldExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества useMemo</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <ul class="text-left pl-4">
                    <li>Избегает повторных вычислений</li>
                    <li>Сокращает время рендеринга</li>
                    <li>Оптимизирует сложные операции</li>
                    <li>Экономит CPU ресурсы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-link-variant</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Ссылочное равенство</h3>
                  <ul class="text-left pl-4">
                    <li>Сохраняет ссылки на объекты</li>
                    <li>Работает с React.memo</li>
                    <li>Предотвращает лишние ре-рендеры</li>
                    <li>Оптимизирует дочерние компоненты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-code-braces</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Читаемость кода</h3>
                  <ul class="text-left pl-4">
                    <li>Явно показывает оптимизацию</li>
                    <li>Документирует зависимости</li>
                    <li>Упрощает отладку</li>
                    <li>Облегчает рефакторинг</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">useMemo vs другие подходы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>useMemo</b></td>
                <td>Мемоизация значений</td>
                <td>Сложные вычисления, объекты для пропсов</td>
              </tr>
              <tr>
                <td><b>useCallback</b></td>
                <td>Мемоизация функций</td>
                <td>Колбэки для дочерних компонентов</td>
              </tr>
              <tr>
                <td><b>React.memo</b></td>
                <td>Мемоизация компонентов</td>
                <td>Предотвращение ре-рендеров компонента</td>
              </tr>
              <tr>
                <td><b>useState</b></td>
                <td>Хранение состояния</td>
                <td>Начальные вычисления (ленивая инициализация)</td>
              </tr>
              <tr>
                <td><b>useRef</b></td>
                <td>Хранение мутабельных данных</td>
                <td>Кэш без влияния на рендеринг</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между useMemo и useCallback?</p>
                <p class="font-weight-regular ma-0">
                  <code>useMemo</code> возвращает мемоизированное <b>значение</b> (результат вычислений).
                  <code>useCallback</code> возвращает мемоизированную <b>функцию</b>.
                  <code>useCallback(fn, deps)</code> эквивалентен <code>useMemo(() => fn, deps)</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Всегда ли нужно мемоизировать объекты в пропсах?</p>
                <p class="font-weight-regular ma-0">
                  Нет. Только если дочерний компонент обернут в <code>React.memo</code> и вы хотите
                  избежать его ре-рендера. Без React.memo мемоизация объектов бессмысленна для оптимизации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что произойдет, если забыть массив зависимостей?</p>
                <p class="font-weight-regular ma-0">
                  Без массива зависимостей функция будет выполняться при каждом рендере — useMemo
                  станет бесполезным. С пустым массивом <code>[]</code> вычисление выполнится только один раз.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда useMemo может навредить производительности?</p>
                <p class="font-weight-regular ma-0">
                  При мемоизации простых вычислений оверхед (проверка зависимостей, хранение в памяти)
                  больше, чем польза. Также при слишком частом изменении зависимостей — кэш постоянно
                  инвалидируется, но накладные расходы остаются.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать useMemo для side effects?</p>
                <p class="font-weight-regular ma-0">
                  Нет! useMemo для чистых вычислений. React может отбросить кэшированное значение в любой
                  момент. Для side effects используйте <code>useEffect</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как профилировать эффект от useMemo?</p>
                <p class="font-weight-regular ma-0">
                  Используйте React DevTools Profiler для измерения времени рендера до и после добавления
                  useMemo. Добавляйте console.log внутри useMemo для отслеживания пересчетов.
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
                    <li>Мемоизировать дорогие вычисления</li>
                    <li>Объекты/массивы для React.memo</li>
                    <li>Правильно указывать зависимости</li>
                    <li>Измерять производительность</li>
                    <li>Использовать ESLint правила</li>
                    <li>Документировать причину</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Мемоизации простых вычислений</li>
                    <li>Преждевременной оптимизации</li>
                    <li>Мемоизации примитивов</li>
                    <li>Side effects в useMemo</li>
                    <li>Забывать массив зависимостей</li>
                    <li>Мемоизировать все подряд</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Сначала профилируйте, потом оптимизируйте</li>
                    <li>Используйте React.StrictMode</li>
                    <li>Проверяйте с React DevTools</li>
                    <li>Комбинируйте с React.memo</li>
                    <li>Следите за размером зависимостей</li>
                    <li>Тестируйте граничные случаи</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>useMemo</b> — это мощный инструмент оптимизации производительности в React, который
              кэширует результаты вычислений. Используйте его для <b>дорогих вычислений</b>,
              <b>фильтрации/сортировки больших массивов</b> и <b>сохранения ссылочного равенства</b>
              объектов для React.memo. Избегайте преждевременной оптимизации — не все вычисления
              нуждаются в мемоизации. Всегда профилируйте производительность перед и после применения
              useMemo, чтобы убедиться в реальной пользе.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useMemo"
                target="_blank"
                class="mr-2">
                React Docs: useMemo
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/render-and-commit"
                target="_blank">
                React Rendering
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
