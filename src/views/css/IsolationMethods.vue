<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* CSS Modules - автоматическая генерация уникальных классов */
/* Button.module.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background: #007bff;
  color: white;
}

.secondary {
  background: #6c757d;
  color: white;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`

const snippet2 = `
// Использование CSS Modules
import styles from './Button.module.css';

function Button({ variant = 'primary', disabled = false, children }) {
  const className = [
    styles.button,
    styles[variant],
    disabled && styles.disabled
  ].filter(Boolean).join(' ');

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

// Результат: class="Button_button__3xKL2 Button_primary__2kF9x"
`

const snippet3 = `
/* Styled Components - CSS-in-JS подход */
import styled, { css } from 'styled-components';

const Button = styled.button\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  \${props => props.variant === 'primary' && css\`
    background: #007bff;
    color: white;

    &:hover {
      background: #0056b3;
    }
  \`}

  \${props => props.variant === 'secondary' && css\`
    background: #6c757d;
    color: white;

    &:hover {
      background: #545b62;
    }
  \`}

  \${props => props.disabled && css\`
    opacity: 0.6;
    cursor: not-allowed;
  \`}
\`;

// Использование: <Button variant="primary">Кнопка</Button>
`

const snippet4 = `
/* Vue.js Scoped Styles */
<template>
  <div class="card">
    <header class="card-header">
      <h2 class="title">{{ title }}</h2>
    </header>
    <div class="card-body">
      <p class="content">{{ content }}</p>
      <button class="button primary">Действие</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  background: #f5f5f5;
  padding: 16px;
}

.title {
  margin: 0;
  color: #333;
}

.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}

.primary {
  background: #007bff;
  color: white;
}
</style>

<!-- Компилируется в: .card[data-v-f3f3eg9] -->
`

const snippet5 = `
/* Shadow DOM - нативная изоляция */
class CustomCard extends HTMLElement {
  constructor() {
    super();

    // Создаем Shadow DOM
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }

        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .title {
          color: #333;
          margin-top: 0;
        }

        .button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }

        .button:hover {
          background: #0056b3;
        }
      </style>

      <div class="card">
        <h3 class="title">
          <slot name="title">Заголовок по умолчанию</slot>
        </h3>
        <p>
          <slot>Контент по умолчанию</slot>
        </p>
        <button class="button">
          <slot name="action">Действие</slot>
        </button>
      </div>
    \`;
  }
}

customElements.define('custom-card', CustomCard);
`

const snippet6 = `
/* Emotion - CSS-in-JS библиотека */
import { css, cx } from '@emotion/css';

const baseButton = css\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
\`;

const primaryButton = css\`
  background: #007bff;
  color: white;

  &:hover:not(:disabled) {
    background: #0056b3;
  }
\`;

const secondaryButton = css\`
  background: #6c757d;
  color: white;

  &:hover:not(:disabled) {
    background: #545b62;
  }
\`;

const disabledButton = css\`
  opacity: 0.6;
  cursor: not-allowed;
\`;

// Использование
function Button({ variant, disabled, children }) {
  const className = cx(
    baseButton,
    variant === 'primary' && primaryButton,
    variant === 'secondary' && secondaryButton,
    disabled && disabledButton
  );

  return <button className={className}>{children}</button>;
}
`

const snippet7 = `
/* PostCSS плагины для изоляции */

/* 1. postcss-modules */
/* Автоматическое преобразование классов */
.component {
  color: red;
}
/* Становится: .component_abc123 { color: red; } */

/* 2. postcss-prefixwrap */
/* Добавляет префикс-обертку */
.button { color: blue; }
/* Становится: .my-app .button { color: blue; } */

/* 3. postcss-plugin-namespace */
/* Добавляет namespace ко всем селекторам */
.card { padding: 20px; }
/* Становится: .ns-card { padding: 20px; } */
`

const snippet8 = `
/* BEM методология - изоляция через именование */
/* Блок */
.search-form {
  padding: 20px;
  background: #f5f5f5;
}

/* Элементы */
.search-form__input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-form__button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.search-form__results {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Модификаторы */
.search-form--compact {
  padding: 10px;
}

.search-form__button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-form__input--error {
  border-color: #dc3545;
}
`

const snippet9 = `
/* Atomic CSS / Utility-First подход */
/* Tailwind CSS - пример изоляции через утилиты */

<!-- Компонент кнопки через утилиты -->
<button class="
  px-6 py-3
  bg-blue-500 hover:bg-blue-600
  text-white font-medium
  rounded-lg border-none
  cursor-pointer transition-colors
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Кнопка
</button>

<!-- Создание переиспользуемых компонентов -->
<div class="
  max-w-sm rounded-lg overflow-hidden shadow-lg bg-white
  border border-gray-200 hover:shadow-xl transition-shadow
">
  <div class="px-6 py-4">
    <h3 class="font-bold text-xl mb-2 text-gray-800">Заголовок</h3>
    <p class="text-gray-600 text-base">Описание карточки</p>
  </div>
</div>
`

const snippet10 = `
/* Современные подходы: Zero-runtime CSS-in-JS */

/* Vanilla Extract - статически извлекаемый CSS-in-JS */
import { style, vars } from '@vanilla-extract/css';

const button = style({
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'all 0.2s ease',
});

const primary = style({
  background: '#007bff',
  color: 'white',
  ':hover': {
    background: '#0056b3',
  },
});

/* Linaria - CSS-in-JS с извлечением на build-time */
import { css } from 'linaria';

const buttonClass = css\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
\`;

/* Stitches - CSS-in-JS с вариантами */
import { styled } from '@stitches/react';

const Button = styled('button', {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',

  variants: {
    color: {
      primary: { background: '#007bff', color: 'white' },
      secondary: { background: '#6c757d', color: 'white' },
    },
    size: {
      small: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '16px 32px', fontSize: '18px' },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
});
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')
const highlightedSnippet8 = ref('')
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.css, 'css')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.css, 'css')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.css, 'css')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Какие методы или подходы можно использовать для изоляции стилей в CSS?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Изоляция стилей в CSS</b> — это набор техник и подходов, которые предотвращают
              неконтролируемое влияние стилей одних компонентов на другие. Существует множество
              методов, от простых соглашений до сложных технологических решений.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Классификация методов изоляции</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Категория</th>
                <th class="text-left font-weight-bold">Методы</th>
                <th class="text-left font-weight-bold">Время применения</th>
                <th class="text-left font-weight-bold">Производительность</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Статические</b></td>
                <td class="pt-2 pb-2">CSS Modules, PostCSS плагины</td>
                <td class="pt-2 pb-2">Build-time</td>
                <td class="pt-2 pb-2">Высокая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Динамические</b></td>
                <td class="pt-2 pb-2">Styled Components, Emotion</td>
                <td class="pt-2 pb-2">Runtime</td>
                <td class="pt-2 pb-2">Средняя</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Фреймворковые</b></td>
                <td class="pt-2 pb-2">Vue Scoped, Angular ViewEncapsulation</td>
                <td class="pt-2 pb-2">Build-time</td>
                <td class="pt-2 pb-2">Высокая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Нативные</b></td>
                <td class="pt-2 pb-2">Shadow DOM, Web Components</td>
                <td class="pt-2 pb-2">Runtime</td>
                <td class="pt-2 pb-2">Очень высокая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Методологические</b></td>
                <td class="pt-2 pb-2">BEM, OOCSS, SMACSS</td>
                <td class="pt-2 pb-2">Development</td>
                <td class="pt-2 pb-2">Высокая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Гибридные</b></td>
                <td class="pt-2 pb-2">Zero-runtime CSS-in-JS</td>
                <td class="pt-2 pb-2">Build-time</td>
                <td class="pt-2 pb-2">Высокая</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. CSS Modules</h2>
            <p class="font-weight-regular mb-4">
              Автоматическая генерация уникальных имен классов на этапе сборки:
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. CSS-in-JS (Styled Components)</h2>
            <p class="font-weight-regular mb-4">
              Динамическая генерация стилей с автоматической изоляцией:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Scoped Styles (Vue.js)</h2>
            <p class="font-weight-regular mb-4">
              Фреймворковый подход с автоматическим добавлением уникальных атрибутов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Shadow DOM</h2>
            <p class="font-weight-regular mb-4">
              Нативная изоляция стилей на уровне браузера:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. CSS-in-JS библиотеки (Emotion)</h2>
            <p class="font-weight-regular mb-4">
              Гибкий подход с композицией стилей:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. PostCSS плагины</h2>
            <p class="font-weight-regular mb-4">
              Автоматическая трансформация CSS на этапе сборки:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. BEM методология</h2>
            <p class="font-weight-regular mb-4">
              Изоляция через строгие соглашения именования:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Atomic CSS / Utility-First</h2>
            <p class="font-weight-regular mb-4">
              Изоляция через микро-утилиты (Tailwind CSS):
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Zero-runtime CSS-in-JS</h2>
            <p class="font-weight-regular mb-4">
              Современные решения без runtime overhead:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов по критериям</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Производительность</h3>
                  <p class="mb-2"><b>Лучшие:</b> Shadow DOM, CSS Modules, BEM</p>
                  <p class="mb-2"><b>Хорошие:</b> Scoped Styles, Zero-runtime</p>
                  <p class="mb-0"><b>Средние:</b> CSS-in-JS библиотеки</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Гибкость</h3>
                  <p class="mb-2"><b>Лучшие:</b> CSS-in-JS, Emotion</p>
                  <p class="mb-2"><b>Хорошие:</b> CSS Modules, Styled Components</p>
                  <p class="mb-0"><b>Ограниченные:</b> BEM, Atomic CSS</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Простота внедрения</h3>
                  <p class="mb-2"><b>Простые:</b> BEM, Scoped Styles</p>
                  <p class="mb-2"><b>Средние:</b> CSS Modules, Tailwind</p>
                  <p class="mb-0"><b>Сложные:</b> Shadow DOM, Zero-runtime</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Экосистема</h3>
                  <p class="mb-2"><b>Богатые:</b> CSS-in-JS, CSS Modules</p>
                  <p class="mb-2"><b>Развивающиеся:</b> Zero-runtime</p>
                  <p class="mb-0"><b>Зрелые:</b> BEM, Shadow DOM</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Выбор подхода по типу проекта</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Статические сайты</h3>
                  <ul class="pl-4">
                    <li>BEM методология</li>
                    <li>PostCSS плагины</li>
                    <li>Utility-first CSS</li>
                    <li>Простые naming conventions</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">SPA приложения</h3>
                  <ul class="pl-4">
                    <li>CSS Modules</li>
                    <li>Scoped Styles</li>
                    <li>CSS-in-JS</li>
                    <li>Component-based подходы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Библиотеки компонентов</h3>
                  <ul class="pl-4">
                    <li>Shadow DOM</li>
                    <li>Zero-runtime CSS-in-JS</li>
                    <li>CSS Modules</li>
                    <li>Строгие naming conventions</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой подход к изоляции стилей выбрать для нового проекта?</p>
                <p class="font-weight-regular ma-0">
                  Зависит от стека: React → CSS Modules/Styled Components, Vue → Scoped Styles,
                  Vanilla → BEM/Shadow DOM. Учитывайте команду, производительность и maintenance.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между CSS Modules и CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules — статическое решение (build-time), CSS-in-JS — динамическое (runtime).
                  Modules быстрее, CSS-in-JS гибче для теминга и условных стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает изоляция в Shadow DOM?</p>
                <p class="font-weight-regular ma-0">
                  Создается изолированное DOM-дерево со своим CSS контекстом. Стили не попадают наружу
                  и не принимают стили извне (кроме наследуемых свойств).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли комбинировать разные подходы изоляции?</p>
                <p class="font-weight-regular ma-0">
                  Да, но осторожно: глобальные reset стили + CSS Modules для компонентов +
                  CSS-in-JS для динамики. Главное — консистентность и понятность команде.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы решает zero-runtime CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Убирает runtime overhead CSS-in-JS, сохраняя типизацию и DX. Стили извлекаются
                  в статические CSS файлы на build-time. Лучшее из двух миров.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить изоляцию в микрофронтендах?</p>
                <p class="font-weight-regular ma-0">
                  Shadow DOM, строгие префиксы, CSS Modules с уникальными именами,
                  или runtime изоляция через CSS-in-JS с уникальными контекстами.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Современные тренды</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Zero-runtime</h3>
                  <ul class="pl-4">
                    <li>Vanilla Extract</li>
                    <li>Linaria</li>
                    <li>Compiled CSS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Utility-first</h3>
                  <ul class="pl-4">
                    <li>Tailwind CSS</li>
                    <li>UnoCSS</li>
                    <li>Open Props</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Container Queries</h3>
                  <ul class="pl-4">
                    <li>@container rules</li>
                    <li>Element-based isolation</li>
                    <li>Context-aware styling</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Native CSS</h3>
                  <ul class="pl-4">
                    <li>@layer cascade layers</li>
                    <li>CSS Nesting</li>
                    <li>:where() / :is()</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации по выбору</h2>
            <v-alert type="info" class="mb-6">
              <template v-slot:prepend>
                <v-icon>mdi-lightbulb-outline</v-icon>
              </template>
              <div>
                <p class="mb-2 font-weight-bold">Для новых проектов в 2024-2025:</p>
                <ul class="pl-4 ma-0">
                  <li><strong>React:</strong> CSS Modules + Zero-runtime CSS-in-JS для динамики</li>
                  <li><strong>Vue:</strong> Scoped Styles + CSS Modules для переиспользуемых компонентов</li>
                  <li><strong>Angular:</strong> ViewEncapsulation + CSS Modules</li>
                  <li><strong>Vanilla JS:</strong> Shadow DOM + BEM для фоллбека</li>
                  <li><strong>Библиотеки компонентов:</strong> Shadow DOM или Zero-runtime решения</li>
                </ul>
              </div>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Выбор метода изоляции стилей зависит от проекта, команды и требований к производительности.
              Современные подходы стремятся к балансу между DX (Developer Experience) и производительностью.
              Zero-runtime CSS-in-JS и улучшенные CSS Modules становятся стандартом для новых проектов,
              а Shadow DOM обеспечивает самую сильную изоляцию для библиотек компонентов.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scoping"
                target="_blank">
                MDN: CSS Scoping
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
