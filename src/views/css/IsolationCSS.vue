<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

// --- Проблема ---
const snippetProblem = `
/* Компонент A */
.button { background: #007bff; }

/* Компонент B — случайно перебивает */
.button { background: #dc3545; } /* Красный вместо синего! */
`

// --- CSS Modules ---
const snippetModules = `
/* Button.module.css */
.button { padding: 12px 24px; border: none; border-radius: 4px; }
.primary { background: #007bff; color: white; }

// Button.jsx
import styles from './Button.module.css';
const Button = ({ variant = 'primary', children }) => (
  <button className={\`\${styles.button} \${styles[variant]}\`}>{children}</button>
);
// Результат в DOM: class="Button_button__3xKL2 Button_primary__2kF9x"
`

// --- Vue Scoped ---
const snippetScoped = `
<style scoped>
.button { background: #007bff; }
</style>
/* Компилируется в: .button[data-v-f3f3eg9] { background: #007bff; } */
`

// --- Shadow DOM ---
const snippetShadow = `
class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = \`
      <style>
        /* Полностью изолировано от внешних стилей */
        .button { background: #28a745; color: white; }
      </style>
      <button class="button"><slot></slot></button>
    \`;
  }
}
customElements.define('my-card', MyCard);
`

// --- CSS-in-JS ---
const snippetCSSinJS = `
import styled from 'styled-components';

// Уникальный хеш-класс генерируется автоматически
const Button = styled.button\`
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
\`;
// Результат в DOM: class="sc-bdVaJa kJhWER"
`

// --- Zero-runtime ---
const snippetZeroRuntime = `
// Vanilla Extract — стили компилируются в статический CSS
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({ padding: '12px 24px', border: 'none' });

export const variants = styleVariants({
  primary:   [base, { background: '#007bff', color: 'white' }],
  secondary: [base, { background: '#6c757d', color: 'white' }],
});
`

// --- @scope ---
const snippetScope = `
/* Нативная изоляция без сборщиков — Chrome 118+ */
@scope (.card) {
  .title { color: #333; font-size: 1.5rem; }
  .button { background: #007bff; }
}

/* С ограничением области (limits) */
@scope (.card) to (.nested-card) {
  .title { color: red; } /* Не применится внутри .nested-card */
}
`

// --- Миграция ---
const snippetMigration = `
/* Шаг 1: bridge.css — CSS-переменные как общий язык */
:root {
  --primary: #007bff;
  --radius: 4px;
}

/* Шаг 2: новые компоненты сразу с изоляцией */
/* Button.module.css */
.button {
  background: var(--primary);
  border-radius: var(--radius);
}

/* Шаг 3: webpack — две системы рядом */
{ test: /\.module\.css$/, use: ['style-loader', { loader: 'css-loader', options: { modules: true } }] }
{ test: /(?<!\.module)\.css$/, use: ['style-loader', 'css-loader'] }
`

const snippets = {
  problem:     ref(''),
  modules:     ref(''),
  scoped:      ref(''),
  shadow:      ref(''),
  cssInJs:     ref(''),
  zeroRuntime: ref(''),
  scope:       ref(''),
  migration:   ref(''),
}

onMounted(() => {
  snippets.problem.value     = Prism.highlight(snippetProblem,     Prism.languages.css,        'css')
  snippets.modules.value     = Prism.highlight(snippetModules,     Prism.languages.javascript, 'javascript')
  snippets.scoped.value      = Prism.highlight(snippetScoped,      Prism.languages.css,        'css')
  snippets.shadow.value      = Prism.highlight(snippetShadow,      Prism.languages.javascript, 'javascript')
  snippets.cssInJs.value     = Prism.highlight(snippetCSSinJS,     Prism.languages.javascript, 'javascript')
  snippets.zeroRuntime.value = Prism.highlight(snippetZeroRuntime, Prism.languages.javascript, 'javascript')
  snippets.scope.value       = Prism.highlight(snippetScope,       Prism.languages.css,        'css')
  snippets.migration.value   = Prism.highlight(snippetMigration,   Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">

            <!-- Заголовок -->
            <h1 class="text-h4 font-weight-bold mb-4">Изоляция стилей в CSS</h1>
            <p class="mb-8">
              CSS глобален по природе — любой класс может случайно перебить другой. Изоляция стилей
              решает эту проблему, делая стили компонента локальными: они не вытекают наружу и не
              получают нежелательных влияний извне. Это фундамент компонентной архитектуры.
            </p>

            <!-- Проблема -->
            <h2 class="text-h5 font-weight-bold mb-3">Проблема глобальных стилей</h2>
            <p class="mb-3">
              В обычном CSS все классы живут в одном глобальном пространстве имён. Два компонента
              с одинаковым классом <code>.button</code> неизбежно конфликтуют — побеждает тот, кто
              загружен позже. Это ведёт к «войнам специфичности», страху удалять старый код и
              непредсказуемым визуальным регрессиям.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.problem.value"></code></pre>

            <!-- Принципы -->
            <h2 class="text-h5 font-weight-bold mb-3">Три принципа изоляции</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Принцип</th>
                <th class="text-left font-weight-bold">Что означает</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Инкапсуляция</b></td>
                <td class="pt-2 pb-2">Стили компонента не влияют на окружение и не зависят от него</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Предсказуемость</b></td>
                <td class="pt-2 pb-2">Компонент выглядит одинаково в любом контексте</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Безопасное удаление</b></td>
                <td class="pt-2 pb-2">Удаление компонента не ломает чужие стили</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Методы -->
            <h2 class="text-h5 font-weight-bold mb-3">Методы изоляции</h2>

            <!-- 1. CSS Modules -->
            <h3 class="text-h6 font-weight-bold mb-2">1. CSS Modules</h3>
            <p class="mb-3">
              Сборщик (Webpack, Vite) автоматически переименовывает классы в уникальные хеши на этапе
              компиляции. Никакого runtime overhead — просто обычный CSS с гарантированно уникальными
              именами. Лучший выбор для React-проектов: минимальная настройка, максимальная
              предсказуемость, отличная поддержка TypeScript через декларации <code>*.module.css</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.modules.value"></code></pre>

            <!-- 2. Scoped Styles -->
            <h3 class="text-h6 font-weight-bold mb-2">2. Scoped Styles (Vue / Angular / Svelte)</h3>
            <p class="mb-3">
              Фреймворки добавляют к каждому элементу уникальный атрибут (<code>data-v-xxxxxx</code> во Vue,
              <code>_ngcontent-c0</code> в Angular) и модифицируют CSS-селекторы, дописывая этот атрибут.
              Результат аналогичен CSS Modules, но без необходимости явного импорта — достаточно
              написать <code>&lt;style scoped&gt;</code>. Svelte делает то же самое, добавляя суффикс к имени класса.
            </p>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="snippets.scoped.value"></code></pre>
            <v-alert type="info" variant="tonal" density="compact" class="mb-8">
              Angular предлагает три режима: <b>Emulated</b> (по умолчанию, эмулирует Shadow DOM через атрибуты),
              <b>ShadowDom</b> (нативный Shadow DOM) и <b>None</b> (без изоляции).
            </v-alert>

            <!-- 3. Shadow DOM -->
            <h3 class="text-h6 font-weight-bold mb-2">3. Shadow DOM (Web Components)</h3>
            <p class="mb-3">
              Единственный метод с <b>истинной</b> изоляцией на уровне браузера. Shadow DOM создаёт
              отдельное DOM-дерево с собственным CSS-контекстом: стили внутри не вытекают наружу,
              а внешние стили не проникают внутрь (за исключением наследуемых свойств и
              CSS-переменных). Браузер может оптимизировать рендеринг независимо для каждого
              Shadow DOM. Идеален для библиотек компонентов, которые должны работать в любом окружении.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.shadow.value"></code></pre>

            <!-- 4. CSS-in-JS -->
            <h3 class="text-h6 font-weight-bold mb-2">4. CSS-in-JS (Styled Components, Emotion)</h3>
            <p class="mb-3">
              Стили описываются прямо в JavaScript. Библиотека генерирует уникальный хеш-класс
              в <b>runtime</b> и вставляет стили в <code>&lt;style&gt;</code>-тег. Главное преимущество —
              возможность использовать любые JS-выражения, props и тему прямо в CSS. Платите за это
              runtime overhead и увеличением bundle (Styled Components ~13 KB, Emotion ~8 KB).
              На сервере требует дополнительной настройки для SSR.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.cssInJs.value"></code></pre>

            <!-- 5. Zero-runtime -->
            <h3 class="text-h6 font-weight-bold mb-2">5. Zero-runtime CSS-in-JS (Vanilla Extract, Linaria)</h3>
            <p class="mb-3">
              Лучшее из двух миров: пишете стили с TypeScript и JS-синтаксисом, а компилятор
              извлекает их в статические CSS-файлы на этапе сборки. Никакого runtime overhead,
              полная type-safety, отличная поддержка SSR. Vanilla Extract — выбор для TypeScript-first
              команд. Linaria ближе к синтаксису Styled Components, но без затрат в runtime.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.zeroRuntime.value"></code></pre>

            <!-- 6. CSS @scope -->
            <h3 class="text-h6 font-weight-bold mb-2">6. Нативный CSS @scope</h3>
            <p class="mb-3">
              Новая спецификация (Chrome 118+), позволяющая ограничить область действия стилей
              без инструментов сборки. Поддерживает <b>limits</b> — вы можете задать не только
              «где начинается» область, но и «где заканчивается». Пока не годится для production
              из-за ограниченной поддержки браузерами, но активно развивается.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.scope.value"></code></pre>

            <!-- Сравнение -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение методов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Уровень изоляции</th>
                <th class="text-left font-weight-bold">Runtime overhead</th>
                <th class="text-left font-weight-bold">TypeScript</th>
                <th class="text-left font-weight-bold">SSR</th>
                <th class="text-left font-weight-bold">Bundle (доп.)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Modules</b></td>
                <td class="pt-2 pb-2">Высокая</td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">0 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Scoped (Vue/Angular)</b></td>
                <td class="pt-2 pb-2">Высокая</td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">0 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Shadow DOM</b></td>
                <td class="pt-2 pb-2">Полная (нативная)</td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">0 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">Полная</td>
                <td class="pt-2 pb-2">Средний</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">~13 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Emotion</b></td>
                <td class="pt-2 pb-2">Полная</td>
                <td class="pt-2 pb-2">Низкий</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">~8 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vanilla Extract</b></td>
                <td class="pt-2 pb-2">Высокая</td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">0 KB</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>CSS @scope</b></td>
                <td class="pt-2 pb-2">Высокая</td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">—</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">0 KB</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Влияние на производительность</h2>
            <p class="mb-4">
              Изоляция сама по себе не замедляет приложение — важно <b>как</b> она реализована.
            </p>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Быстро</h3>
                  <ul class="pl-4">
                    <li>Короткие, предсказуемые селекторы (CSS Modules)</li>
                    <li>Изолированный layout-контекст (Shadow DOM)</li>
                    <li>Статический CSS без runtime вычислений</li>
                    <li>CSS containment: <code>contain: layout style paint</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Осторожно</h3>
                  <ul class="pl-4">
                    <li>Runtime CSS-in-JS с пересчётом на каждый рендер</li>
                    <li>Большое количество динамических тегов <code>&lt;style&gt;</code></li>
                    <li>Глубокие вложенные селекторы</li>
                    <li>CSS-in-JS без SSR-конфигурации (FOUC)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Влияние на сопровождаемость -->
            <h2 class="text-h5 font-weight-bold mb-3">Влияние на сопровождаемость</h2>
            <p class="mb-4">
              Это главная причина применять изоляцию. Хорошо изолированный компонент даёт:
            </p>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">Без изоляции</th>
                <th class="text-left font-weight-bold">С изоляцией</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Удаление кода</td>
                <td class="pt-2 pb-2">Страшно — вдруг кто-то зависит</td>
                <td class="pt-2 pb-2">Безопасно — стили локальны</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Рефакторинг</td>
                <td class="pt-2 pb-2">Требует знания всей кодовой базы</td>
                <td class="pt-2 pb-2">Ограничен файлом компонента</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Отладка</td>
                <td class="pt-2 pb-2">Поиск источника среди сотен правил</td>
                <td class="pt-2 pb-2">Стиль = файл компонента</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Переиспользование</td>
                <td class="pt-2 pb-2">Рискованно — контекст влияет</td>
                <td class="pt-2 pb-2">Безопасно — компонент самодостаточен</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Onboarding</td>
                <td class="pt-2 pb-2">Нужно изучать всю архитектуру CSS</td>
                <td class="pt-2 pb-2">Новичок разбирается в одном файле</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Миграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Миграция с глобальных стилей</h2>
            <p class="mb-3">
              Переход не должен быть «всё или ничего». Стратегия <b>Strangler Fig</b> — постепенная
              замена: новые компоненты сразу пишутся с изоляцией, старые мигрируют по приоритету.
              CSS-переменные служат мостом между двумя системами.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="snippets.migration.value"></code></pre>
            <v-alert type="warning" variant="tonal" density="compact" class="mb-8">
              Перед удалением глобальных стилей обязательно проверьте их использование инструментами
              вроде PurgeCSS или Coverage в DevTools. Мертвый CSS-код часто скрывает неожиданные зависимости.
            </v-alert>

            <!-- Когда что выбирать -->
            <h2 class="text-h5 font-weight-bold mb-3">Когда что выбирать</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">По стеку</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>React</b> — CSS Modules или Vanilla Extract</li>
                    <li class="mb-1"><b>Vue</b> — Scoped Styles (встроено)</li>
                    <li class="mb-1"><b>Angular</b> — ViewEncapsulation.Emulated (по умолчанию)</li>
                    <li class="mb-1"><b>Svelte</b> — автоматически (встроено)</li>
                    <li class="mb-1"><b>Vanilla JS / библиотека</b> — Shadow DOM</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3">По задаче</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>Статические стили</b> — CSS Modules</li>
                    <li class="mb-1"><b>Динамические стили / теминг</b> — CSS-in-JS</li>
                    <li class="mb-1"><b>Performance-critical</b> — Zero-runtime</li>
                    <li class="mb-1"><b>Независимая библиотека</b> — Shadow DOM</li>
                    <li class="mb-1"><b>Без сборщика</b> — CSS @scope (с полифилом)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Вопросы для собеседования</h2>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title><b>Что такое изоляция стилей и зачем она нужна?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  CSS глобален по природе: любой класс может случайно перебить другой. Изоляция — набор
                  техник, ограничивающих область видимости стилей конкретным компонентом. Это исключает
                  конфликты имён, делает компоненты предсказуемыми в любом контексте и безопасными для удаления.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title><b>В чём разница между CSS Modules и CSS-in-JS?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  CSS Modules работают на этапе сборки (build-time): сборщик переименовывает классы
                  в уникальные хеши. Zero runtime, обычный CSS-синтаксис. CSS-in-JS (Styled Components,
                  Emotion) генерирует и вставляет стили в runtime, что даёт полную динамику и доступ
                  к JS-контексту, но добавляет накладные расходы. Zero-runtime CSS-in-JS (Vanilla Extract)
                  объединяет оба подхода: JS-синтаксис + статический CSS на выходе.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title><b>Как работает Shadow DOM и чем отличается от других методов?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  Shadow DOM — единственный метод с <b>нативной</b> изоляцией на уровне браузера.
                  Он создаёт изолированное DOM-дерево со своим CSS-контекстом: стили внутри не вытекают
                  наружу, внешние стили не проникают внутрь. CSS Modules и Scoped Styles лишь эмулируют
                  изоляцию через уникальные имена классов — технически это всё равно глобальный CSS,
                  просто с очень специфичными селекторами.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title><b>Как мигрировать существующий проект на изолированные стили?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  Стратегия Strangler Fig: новые компоненты сразу с изоляцией, старые мигрируют постепенно.
                  Настроить сборщик на поддержку обеих систем одновременно. Использовать CSS-переменные
                  как общий язык между системами. Перед удалением глобальных стилей проверить их
                  реальное использование через DevTools Coverage или PurgeCSS.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title><b>Влияет ли изоляция на производительность?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  Build-time методы (CSS Modules, Scoped, Zero-runtime) практически не влияют на
                  производительность — даже улучшают её, создавая более простые и предсказуемые
                  селекторы. Shadow DOM позволяет браузеру оптимизировать рендеринг независимо.
                  Runtime CSS-in-JS при неаккуратном использовании может создавать накладные расходы
                  (пересчёт стилей на каждый рендер, вставка тегов), но современные библиотеки это минимизируют.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title><b>Что такое CSS @scope?</b></v-expansion-panel-title>
                <v-expansion-panel-text>
                  Нативная CSS-функция (Chrome 118+) для ограничения области действия стилей без
                  инструментов сборки. Позволяет задать не только «корень» области (<code>@scope (.card)</code>),
                  но и «границу» — место, где область заканчивается (<code>@scope (.card) to (.nested-card)</code>).
                  Пока не подходит для production из-за ограниченной поддержки браузерами.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Итог -->
            <v-card class="pa-6 mb-6" color="blue-grey-lighten-5">
              <h2 class="text-h6 font-weight-bold mb-3">Итог</h2>
              <p class="mb-0">
                Изоляция стилей — не опциональное улучшение, а необходимость для любого
                компонентного приложения. Выбирайте build-time методы как основу (CSS Modules,
                Scoped Styles) — они бесплатны по производительности. Добавляйте CSS-in-JS только
                там, где нужна настоящая динамика. Для библиотек компонентов Shadow DOM даёт
                наивысший уровень изоляции. Следите за CSS @scope — в перспективе это нативное
                решение без компромиссов.
              </p>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}
.custom-code code {
  background: none !important;
  color: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
}
:deep(.token.comment)    { color: #6272a4; }
:deep(.token.string)     { color: #f1fa8c; }
:deep(.token.keyword)    { color: #ff79c6; }
:deep(.token.function)   { color: #50fa7b; }
:deep(.token.number)     { color: #bd93f9; }
:deep(.token.operator)   { color: #ff79c6; }
:deep(.token.punctuation){ color: #f8f8f2; }
:deep(.token.property)   { color: #66d9ef; }
:deep(.token.tag)        { color: #ff79c6; }
:deep(.token.attr-name)  { color: #50fa7b; }
:deep(.token.attr-value) { color: #f1fa8c; }
</style>
