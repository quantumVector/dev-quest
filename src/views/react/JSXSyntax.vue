<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const whatIsJsxSnippet = `
// JSX - JavaScript XML синтаксис

// JSX код (синтаксический сахар)
const element = <h1>Hello, World!</h1>;

// Компилируется в обычный JavaScript:
const element = React.createElement('h1', null, 'Hello, World!');

// JSX позволяет писать UI как HTML, но это JavaScript!
const name = 'Иван';
const greeting = <h1>Привет, {name}!</h1>;

// Можно использовать любые JavaScript выражения
const user = {
  firstName: 'Мария',
  lastName: 'Петрова'
};

const element = (
  <h1>
    Здравствуйте, {user.firstName} {user.lastName}!
  </h1>
);
`

const jsxVsCreateElementSnippet = `
// Сравнение JSX и React.createElement

// ===== JSX =====
const element = (
  <div className="container">
    <h1 id="title">Заголовок</h1>
    <p style={{ color: 'blue' }}>
      Текст параграфа
    </p>
    <button onClick={handleClick}>
      Нажми меня
    </button>
  </div>
);

// ===== React.createElement (результат компиляции) =====
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement(
    'h1',
    { id: 'title' },
    'Заголовок'
  ),
  React.createElement(
    'p',
    { style: { color: 'blue' } },
    'Текст параграфа'
  ),
  React.createElement(
    'button',
    { onClick: handleClick },
    'Нажми меня'
  )
);

// Структура вызова React.createElement:
// React.createElement(
//   type,        // Тип элемента: 'div', 'h1' или компонент
//   props,       // Объект с пропсами (или null)
//   ...children  // Дочерние элементы
// )
`

const jsxFeaturesSnippet = `
// Возможности JSX

// 1. Встраивание выражений JavaScript
const price = 1000;
const element = <div>Цена: {price * 1.2} руб</div>;

// 2. Атрибуты (props)
const image = <img src={user.avatarUrl} alt={user.name} />;

// 3. className вместо class (зарезервированное слово)
const box = <div className="container box-primary">Контент</div>;

// 4. Стили как объекты
const styled = (
  <div style={{
    backgroundColor: 'blue',
    fontSize: '16px',
    padding: '10px'
  }}>
    Стилизованный блок
  </div>
);

// 5. camelCase для HTML атрибутов
const input = (
  <input
    onChange={handleChange}
    onKeyDown={handleKeyDown}
    autoComplete="off"
    tabIndex={1}
  />
);

// 6. Самозакрывающиеся теги обязательны
const correct = <img src="photo.jpg" />;
const wrong = <img src="photo.jpg">;  // ❌ Ошибка!

// 7. Условный рендеринг
const message = (
  <div>
    {isLoggedIn ? (
      <h1>Добро пожаловать!</h1>
    ) : (
      <h1>Пожалуйста, войдите</h1>
    )}
  </div>
);

// 8. Списки и key
const items = ['Яблоко', 'Банан', 'Апельсин'];
const list = (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// 9. Фрагменты для группировки без обертки
const fragment = (
  <>
    <h1>Заголовок</h1>
    <p>Параграф</p>
  </>
);

// Или с ключом:
const fragmentWithKey = (
  <React.Fragment key={id}>
    <h1>Заголовок</h1>
    <p>Параграф</p>
  </React.Fragment>
);
`

const jsxComponentsSnippet = `
// JSX с компонентами

// Пользовательские компоненты начинаются с заглавной буквы!
function Welcome({ name }) {
  return <h1>Привет, {name}!</h1>;
}

// Использование
const app = <Welcome name="Иван" />;

// Компилируется в:
const app = React.createElement(Welcome, { name: 'Иван' });

// Вложенные компоненты
function App() {
  return (
    <div>
      <Welcome name="Иван" />
      <Welcome name="Мария" />
      <Welcome name="Пётр" />
    </div>
  );
}

// Передача children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Использование с children
const card = (
  <Card title="Заголовок">
    <p>Это контент карточки</p>
    <button>Нажми меня</button>
  </Card>
);

// Spread оператор для props
const props = {
  firstName: 'Иван',
  lastName: 'Петров',
  age: 30
};

const user = <UserProfile {...props} />;

// Это то же самое что:
const user = (
  <UserProfile
    firstName="Иван"
    lastName="Петров"
    age={30}
  />
);
`

const jsxToolsSnippet = `
// Инструменты для работы с JSX

// 1. Babel - основной транспилятор JSX
// package.json
{
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-react": "^7.23.0"
  }
}

// .babelrc или babel.config.js
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"  // Новый JSX transform (React 17+)
    }]
  ]
}

// 2. TypeScript - нативная поддержка JSX
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",  // или "react" для старого transform
    "jsxImportSource": "react"
  }
}

// 3. SWC - быстрая альтернатива Babel
// .swcrc
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}

// 4. esbuild - очень быстрый сборщик с JSX поддержкой
// esbuild.config.js
require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  loader: { '.jsx': 'jsx' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment'
});

// 5. Vite - современный инструмент сборки
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`

const modernJsxTransformSnippet = `
// Новый JSX Transform (React 17+)

// ===== СТАРЫЙ способ (React 16 и ниже) =====
import React from 'react';  // Обязательный импорт!

function App() {
  return <h1>Hello World</h1>;
}

// Компилируется в:
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello World');
}

// ===== НОВЫЙ способ (React 17+) =====
// Импорт React не нужен!
function App() {
  return <h1>Hello World</h1>;
}

// Компилируется в:
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello World' });
}

// Преимущества нового transform:
// 1. Не нужно импортировать React в каждом файле
// 2. Немного меньший размер бандла
// 3. Лучшая производительность компиляции
// 4. Подготовка к будущим оптимизациям

// Настройка в Babel:
{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"  // Новый transform
    }]
  ]
}

// Настройка в TypeScript:
{
  "compilerOptions": {
    "jsx": "react-jsx"  // Вместо "react"
  }
}
`

const jsxAdvancedSnippet = `
// Продвинутые техники JSX

// 1. Динамические компоненты
const components = {
  photo: PhotoComponent,
  video: VideoComponent,
  text: TextComponent
};

function MediaRenderer({ type }) {
  const SpecificComponent = components[type];
  return <SpecificComponent />;
}

// 2. Dot notation для компонентов
const Form = {
  Input: ({ ...props }) => <input {...props} />,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Label: ({ children }) => <label>{children}</label>
};

// Использование
<Form.Label>
  Имя:
  <Form.Input type="text" />
</Form.Label>

// 3. Boolean атрибуты
<input disabled />  // disabled={true}
<input disabled={false} />  // атрибут не будет добавлен

// 4. Пропуск falsy значений
<div>
  {false}      {/* ничего */}
  {null}       {/* ничего */}
  {undefined}  {/* ничего */}
  {true}       {/* ничего */}
  {0}          {/* "0" - будет отображено! */}
  {''}         {/* ничего */}
</div>

// 5. Комментарии в JSX
<div>
  {/* Это комментарий в JSX */}
  <h1>Заголовок</h1>
  {/*
    Многострочный
    комментарий
  */}
</div>

// 6. Экранирование HTML
const rawHTML = '<script>alert("XSS")<\/script>';

// Безопасно - React экранирует:
<div>{rawHTML}</div>  // Покажет текст, не выполнит скрипт

// Небезопасно - вставка как HTML (используйте осторожно!):
<div dangerouslySetInnerHTML={{ __html: rawHTML }} />

// 7. Props как spread с условием
const isAdmin = true;
const button = (
<button
  className="btn"
  {...(isAdmin && { onClick: handleAdminClick })}
>
Кнопка
</button>
);

// 8. Render props паттерн
<DataProvider
  render={(data) => (
<div>
<h1>{data.title}</h1>
<p>{data.content}</p>
</div>
)}
/>
`

const jsxLimitationsSnippet = `
// Ограничения и особенности JSX

// 1. Один корневой элемент (решение - Fragment)
// ❌ Неправильно:
function Component() {
return (
<h1>Заголовок</h1>
<p>Параграф</p>
);
}

// ✅ Правильно:
function Component() {
return (
<>
<h1>Заголовок</h1>
<p>Параграф</p>
</>
);
}

// 2. class → className (class зарезервирован в JS)
// ❌ Неправильно:
<div class="container"></div>

// ✅ Правильно:
<div className="container"></div>

// 3. for → htmlFor (for зарезервирован в JS)
// ❌ Неправильно:
<label for="username">Имя:</label>

// ✅ Правильно:
<label htmlFor="username">Имя:</label>

// 4. Стили как объекты, не строки
// ❌ Неправильно:
<div style="color: red; font-size: 16px"></div>

// ✅ Правильно:
<div style={{ color: 'red', fontSize: '16px' }}></div>

// 5. Обработчики событий - camelCase
// ❌ Неправильно:
<button onclick={handler}></button>

// ✅ Правильно:
<button onClick={handler}></button>

// 6. Самозакрывающиеся теги обязательны
// ❌ Неправильно:
<img src="photo.jpg">
<input type="text">

// ✅ Правильно:
<img src="photo.jpg" />
<input type="text" />

// 7. Встроенные обработчики с параметрами
// ❌ Неправильно (вызовется сразу):
<button onClick={handleClick(id)}>Нажми</button>

// ✅ Правильно:
<button onClick={() => handleClick(id)}>Нажми</button>

// Или:
<button onClick={handleClick.bind(null, id)}>Нажми</button>

// 8. Boolean props
// Эти варианты эквивалентны:
<input disabled />
<input disabled={true} />

// Для false нужно явно указать:
<input disabled={false} />

// 9. Зарезервированные слова
// tabindex → tabIndex
// readonly → readOnly
// maxlength → maxLength
// cellspacing → cellSpacing
// rowspan → rowSpan
// colspan → colSpan
// autocomplete → autoComplete
`

const jsxPerformanceSnippet = `
// JSX и производительность

// 1. Избегайте создания объектов в рендере
// ❌ Плохо - создается новый объект при каждом рендере
function Component() {
return <div style={{ color: 'red' }}>Текст</div>;
}

// ✅ Хорошо - объект создается один раз
const styles = { color: 'red' };
function Component() {
return <div style={styles}>Текст</div>;
}

// 2. Избегайте создания функций в рендере
// ❌ Плохо - новая функция каждый рендер
function Parent() {
return <Child onClick={() => console.log('click')} />;
}

// ✅ Хорошо - useCallback
function Parent() {
const handleClick = useCallback(() => {
console.log('click');
}, []);

return <Child onClick={handleClick} />;
}

// 3. Используйте key для списков
// ❌ Плохо - index как key
{items.map((item, index) => (
<Item key={index} data={item} />
))}

// ✅ Хорошо - уникальный ID
{items.map(item => (
<Item key={item.id} data={item} />
))}

// 4. Условный рендеринг - ленивая оценка
// ❌ Плохо - оба компонента создаются
{condition ? <Heavy /> : <Light />}

// ✅ Хорошо - создается только нужный
{condition && <Heavy />}
{!condition && <Light />}

// 5. Мемоизация компонентов
const MemoizedComponent = React.memo(({ data }) => {
return <div>{data.name}</div>;
});

// 6. Деструктуризация props в JSX
// ❌ Медленнее
<Component
  firstName={user.firstName}
  lastName={user.lastName}
  age={user.age}
/>

// ✅ Быстрее (но менее явно)
<Component {...user} />
`

const highlightedWhatIsJsx = ref('')
const highlightedJsxVsCreateElement = ref('')
const highlightedJsxFeatures = ref('')
const highlightedJsxComponents = ref('')
const highlightedJsxTools = ref('')
const highlightedModernJsxTransform = ref('')
const highlightedJsxAdvanced = ref('')
const highlightedJsxLimitations = ref('')
const highlightedJsxPerformance = ref('')

onMounted(() => {
highlightedWhatIsJsx.value = Prism.highlight(
whatIsJsxSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxVsCreateElement.value = Prism.highlight(
jsxVsCreateElementSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxFeatures.value = Prism.highlight(
jsxFeaturesSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxComponents.value = Prism.highlight(
jsxComponentsSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxTools.value = Prism.highlight(
jsxToolsSnippet,
Prism.languages.javascript,
'javascript'
)
highlightedModernJsxTransform.value = Prism.highlight(
modernJsxTransformSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxAdvanced.value = Prism.highlight(
jsxAdvancedSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxLimitations.value = Prism.highlight(
jsxLimitationsSnippet,
Prism.languages.jsx,
'jsx'
)
highlightedJsxPerformance.value = Prism.highlight(
jsxPerformanceSnippet,
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
              JSX: JavaScript XML синтаксис
            </h1>

            <p class="font-weight-regular mb-6">
              <b>JSX (JavaScript XML)</b> — это синтаксическое расширение JavaScript, которое позволяет
              писать HTML-подобный код в JavaScript файлах. JSX компилируется в обычные вызовы
              <code>React.createElement()</code> и не является обязательным, но делает код React более
              читаемым и интуитивным.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое JSX?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-code-tags</v-icon>
                    <h3 class="text-h6 font-weight-bold">Определение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Синтаксический сахар</strong> над React.createElement()</li>
                    <li><strong>Не HTML!</strong> — это JavaScript</li>
                    <li><strong>Требует компиляции</strong> перед выполнением</li>
                    <li><strong>Статически типизируем</strong> (с TypeScript)</li>
                    <li><strong>Необязательный</strong> — можно использовать чистый JS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Читаемость</strong> — похож на HTML</li>
                    <li><strong>Поддержка IDE</strong> — автодополнение, подсветка</li>
                    <li><strong>Типобезопасность</strong> — ошибки при компиляции</li>
                    <li><strong>Оптимизация</strong> — на этапе сборки</li>
                    <li><strong>Стандарт</strong> — принят сообществом</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedWhatIsJsx"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Во что компилируется JSX?</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> JSX — это просто синтаксический сахар! Каждый JSX тег компилируется
              в вызов <code>React.createElement(type, props, ...children)</code>
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxVsCreateElement"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Возможности JSX</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxFeatures"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">JSX с компонентами</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важное правило:</strong> Пользовательские компоненты в JSX должны начинаться
              с заглавной буквы! React использует это для различия между HTML тегами и компонентами.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxComponents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для поддержки JSX</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-language-javascript</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Babel</h3>
                  <p class="text-body-2">
                    Стандартный транспилятор JSX
                    <br><code>@babel/preset-react</code>
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-language-typescript</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">TypeScript</h3>
                  <p class="text-body-2">
                    Нативная поддержка JSX/TSX
                    <br><code>jsx: "react-jsx"</code>
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-speedometer</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">SWC</h3>
                  <p class="text-body-2">
                    Быстрая альтернатива Babel
                    <br>Написан на Rust
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">esbuild</h3>
                  <p class="text-body-2">
                    Очень быстрый сборщик
                    <br>Встроенная поддержка JSX
                  </p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxTools"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Новый JSX Transform (React 17+)</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-star</v-icon>
              <strong>Современный подход:</strong> С React 17 появился новый JSX transform, который
              не требует импорта React в каждом файле и генерирует более оптимизированный код.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedModernJsxTransform"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение старого и нового transform</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">Старый Transform</th>
                <th class="text-left font-weight-bold">Новый Transform (React 17+)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Импорт React</b></td>
                <td>Обязателен в каждом файле</td>
                <td>Не требуется</td>
              </tr>
              <tr>
                <td><b>Функция компиляции</b></td>
                <td>React.createElement()</td>
                <td>_jsx() из react/jsx-runtime</td>
              </tr>
              <tr>
                <td><b>Размер бандла</b></td>
                <td>Больше</td>
                <td>Меньше (небольшая оптимизация)</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td>Хорошая</td>
                <td>Лучше</td>
              </tr>
              <tr>
                <td><b>Настройка Babel</b></td>
                <td>runtime: "classic"</td>
                <td>runtime: "automatic"</td>
              </tr>
              <tr>
                <td><b>Настройка TypeScript</b></td>
                <td>jsx: "react"</td>
                <td>jsx: "react-jsx"</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники JSX</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxAdvanced"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ограничения и особенности JSX</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxLimitations"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Различия JSX и HTML</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">HTML</th>
                <th class="text-left font-weight-bold">JSX</th>
                <th class="text-left font-weight-bold">Причина</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>class="..."</code></td>
                <td><code>className="..."</code></td>
                <td>class — зарезервированное слово в JS</td>
              </tr>
              <tr>
                <td><code>for="..."</code></td>
                <td><code>htmlFor="..."</code></td>
                <td>for — зарезервированное слово в JS</td>
              </tr>
              <tr>
                <td><code>style="color: red"</code></td>
                <td><code>style={\\{ color: 'red' }}</code></td>
                <td>Стили как JS объекты</td>
              </tr>
              <tr>
                <td><code>onclick="..."</code></td>
                <td><code>onClick={...}</code></td>
                <td>camelCase для событий</td>
              </tr>
              <tr>
                <td><code>&lt;img src="..."&gt;</code></td>
                <td><code>&lt;img src="..." /&gt;</code></td>
                <td>Самозакрывающиеся теги обязательны</td>
              </tr>
              <tr>
                <td><code>tabindex="1"</code></td>
                <td><code>tabIndex={1}</code></td>
                <td>camelCase для атрибутов</td>
              </tr>
              <tr>
                <td><code>maxlength="10"</code></td>
                <td><code>maxLength={10}</code></td>
                <td>camelCase для атрибутов</td>
              </tr>
              <tr>
                <td><code>&lt;!-- comment --&gt;</code></td>
                <td><code>{/* comment */}</code></td>
                <td>Комментарии как JS выражения</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">JSX и производительность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedJsxPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое JSX и обязательно ли его использовать?</p>
                <p class="font-weight-regular ma-0">
                  JSX — это синтаксическое расширение JavaScript, позволяющее писать HTML-подобный код.
                  Он компилируется в вызовы <code>React.createElement()</code>. JSX не обязателен —
                  можно писать на чистом JavaScript, но JSX делает код более читаемым и является
                  стандартом в React-сообществе.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Во что компилируется JSX?</p>
                <p class="font-weight-regular ma-0">
                  JSX компилируется в вызовы функций. В старом transform — это
                  <code>React.createElement(type, props, ...children)</code>. В новом transform (React 17+) —
                  это <code>_jsx(type, props)</code> из <code>react/jsx-runtime</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие инструменты поддерживают JSX?</p>
                <p class="font-weight-regular ma-0">
                  Основные инструменты: <b>Babel</b> (@babel/preset-react), <b>TypeScript</b> (нативная
                  поддержка), <b>SWC</b> (быстрая альтернатива Babel), <b>esbuild</b> (очень быстрый сборщик),
                  <b>Vite</b> (с @vitejs/plugin-react). Все современные сборщики имеют встроенную или
                  простую поддержку JSX.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему class стал className в JSX?</p>
                <p class="font-weight-regular ma-0">
                  Потому что <code>class</code> — это зарезервированное слово в JavaScript (для объявления
                  классов ES6). JSX — это JavaScript, поэтому используется <code>className</code>.
                  Аналогично <code>for</code> → <code>htmlFor</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между старым и новым JSX transform?</p>
                <p class="font-weight-regular ma-0">
                  Старый transform (до React 17) требовал импорт React в каждом файле и использовал
                  <code>React.createElement()</code>. Новый transform (React 17+) автоматически импортирует
                  функции из <code>react/jsx-runtime</code>, не требует явного импорта React, генерирует
                  более оптимизированный код и немного уменьшает размер бандла.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему компоненты должны начинаться с заглавной буквы?</p>
                <p class="font-weight-regular ma-0">
                  React использует это соглашение для различия между HTML-тегами и пользовательскими
                  компонентами. Элементы с маленькой буквы (<code>&lt;div&gt;</code>) компилируются в
                  строки ('div'), а с заглавной (<code>&lt;Component&gt;</code>) — в переменные/компоненты.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работают стили в JSX?</p>
                <p class="font-weight-regular ma-0">
                  Стили в JSX задаются как JavaScript объекты с camelCase свойствами:
                  <code>style={\{ backgroundColor: 'blue', fontSize: '16px' }}</code>. Это отличается от
                  HTML, где стили — строка. Числовые значения автоматически получают 'px', кроме
                  unitless свойств (zIndex, opacity и др).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое JSX Fragment и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Fragment (<code>&lt;&gt;...&lt;/&gt;</code> или <code>&lt;React.Fragment&gt;</code>) —
                  это способ группировки нескольких элементов без добавления дополнительного узла в DOM.
                  React компоненты должны возвращать один корневой элемент, Fragment решает эту проблему
                  без создания лишних div'ов.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики JSX</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать новый JSX transform</li>
                    <li>Группировать элементы в Fragment</li>
                    <li>Использовать key для списков</li>
                    <li>Выносить сложную логику в функции</li>
                    <li>Использовать автоформатирование (Prettier)</li>
                    <li>Следовать соглашениям именования</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Создания объектов/функций в JSX</li>
                    <li>Index как key в динамических списках</li>
                    <li>Слишком вложенных структур</li>
                    <li>Встраивания сложной логики в JSX</li>
                    <li>Использования dangerouslySetInnerHTML</li>
                    <li>Забывать про заглавные буквы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите TypeScript для типизации</li>
                    <li>Используйте ESLint с react плагином</li>
                    <li>Настройте Prettier для JSX</li>
                    <li>Изучите продвинутые паттерны</li>
                    <li>Практикуйте рефакторинг JSX</li>
                    <li>Читайте официальную документацию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>JSX</b> — это синтаксическое расширение JavaScript, которое делает код React более
              читаемым и интуитивным. JSX компилируется в вызовы <code>React.createElement()</code>
              (старый transform) или <code>_jsx()</code> (новый transform). <b>Основные инструменты
              поддержки JSX:</b> Babel, TypeScript, SWC, esbuild. JSX не обязателен, но является
              стандартом в React-сообществе. Понимание того, во что компилируется JSX, критически
              важно для отладки и оптимизации React приложений.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/writing-markup-with-jsx"
                target="_blank"
                class="mr-2">
                React Docs: JSX
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://babeljs.io/docs/babel-preset-react"
                target="_blank">
                Babel React Preset
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
