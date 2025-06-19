<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Глобальные стили - проблема конфликтов */
.button {
  background: blue;
  padding: 10px;
}

.card .button {
  background: red; /* Переопределяет предыдущий стиль */
}

/* В другом компоненте */
.sidebar .button {
  background: green; /* Еще одно переопределение */
}
`

const snippet2 = `
/* CSS Modules - файл Button.module.css */
.button {
  background: blue;
  padding: 10px;
  border-radius: 4px;
}

.primary {
  background: var(--primary-color);
}

.secondary {
  background: var(--secondary-color);
}
`

const snippet3 = `
// Использование CSS Modules в React
import styles from './Button.module.css';

function Button({ type = 'primary', children }) {
  return (
    <button className={\`\${styles.button} \${styles[type]}\`}>
      {children}
    </button>
  );
}

// Генерируется уникальный класс: Button_button__2x1kL
`

const snippet4 = `
/* Styled Components в React */
import styled from 'styled-components';

const StyledButton = styled.button\`
  background: \${props => props.primary ? 'blue' : 'gray'};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
\`;

// Использование
<StyledButton primary>Кнопка</StyledButton>
`

const snippet5 = `
/* Vue Scoped Styles */
<template>
  <div class="card">
    <h2 class="title">Заголовок</h2>
    <p class="content">Контент карточки</p>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  border: 1px solid #ddd;
}

.title {
  color: #333;
  margin-bottom: 10px;
}
</style>

<!-- Компилируется в уникальные классы с хешем -->
`

const snippet6 = `
/* Shadow DOM - нативная изоляция */
class MyComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = \`
      <style>
        :host {
          display: block;
          padding: 20px;
        }

        .button {
          background: blue; /* Изолировано от внешних стилей */
        }
      </style>
      <button class="button">Кнопка</button>
    \`;
  }
}
`

const snippet7 = `
/* CSS-in-JS с Emotion */
import { css } from '@emotion/css';

const buttonStyle = css\`
  background: blue;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: darkblue;
  }
\`;

// Использование
<button className={buttonStyle}>Кнопка</button>
`

const snippet8 = `
/* BEM методология - изоляция через именование */
.card {
  padding: 20px;
}

.card__header {
  margin-bottom: 15px;
}

.card__title {
  font-size: 1.5rem;
  color: #333;
}

.card__button {
  background: blue;
  padding: 8px 16px;
}

.card__button--primary {
  background: green;
}
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')
const highlightedSnippet8 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Какие проблемы решает изоляция стилей в CSS?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Изоляция стилей в CSS</b> — это подход, который предотвращает неконтролируемое влияние стилей
              одних компонентов на другие. Решает фундаментальную проблему глобальности CSS, где все стили
              по умолчанию доступны во всем документе.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные проблемы глобальных стилей</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">Последствия</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Конфликты имен классов</b></td>
                <td class="pt-2 pb-2">Неожиданное переопределение стилей</td>
                <td class="pt-2 pb-2">Два компонента с классом .button</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Побочные эффекты</b></td>
                <td class="pt-2 pb-2">Изменения ломают другие части</td>
                <td class="pt-2 pb-2">Изменение h2 влияет на все заголовки</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Сложность поддержки</b></td>
                <td class="pt-2 pb-2">Страх удалять/изменять стили</td>
                <td class="pt-2 pb-2">Мертвый код, который боятся трогать</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Специфичность каскада</b></td>
                <td class="pt-2 pb-2">!important везде, хрупкость</td>
                <td class="pt-2 pb-2">Войны специфичности селекторов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Зависимости порядка</b></td>
                <td class="pt-2 pb-2">Порядок загрузки CSS имеет значение</td>
                <td class="pt-2 pb-2">Стили работают в dev, ломаются в prod</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Пример проблемы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Методы изоляции стилей</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. CSS Modules</h3>
            <p class="font-weight-regular mb-4">
              Автоматическая генерация уникальных имен классов на этапе сборки:
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. CSS-in-JS (Styled Components)</h3>
            <p class="font-weight-regular mb-4">
              Стили описываются прямо в JavaScript, автоматически изолируются:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">3. Scoped Styles (Vue.js)</h3>
            <p class="font-weight-regular mb-4">
              Автоматическое добавление уникальных атрибутов к элементам:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">4. Shadow DOM</h3>
            <p class="font-weight-regular mb-4">
              Нативная изоляция стилей на уровне браузера:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">5. CSS-in-JS библиотеки (Emotion)</h3>
            <p class="font-weight-regular mb-4">
              Динамическая генерация стилей с уникальными классами:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">6. BEM методология</h3>
            <p class="font-weight-regular mb-4">
              Изоляция через строгие соглашения именования:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Компиляция (CSS Modules)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Привычный CSS, автоматизация, tree-shaking</p>
                  <p class="mb-2"><b>Минусы:</b> Нужна настройка сборки, статичность</p>
                  <v-chip size="small" class="ma-1">Webpack</v-chip>
                  <v-chip size="small" class="ma-1">Vite</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Runtime (CSS-in-JS)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Динамичность, теминг, типизация</p>
                  <p class="mb-2"><b>Минусы:</b> Runtime overhead, размер бандла</p>
                  <v-chip size="small" class="ma-1">Styled Components</v-chip>
                  <v-chip size="small" class="ma-1">Emotion</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Фреймворки (Scoped)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Встроенная поддержка, простота</p>
                  <p class="mb-2"><b>Минусы:</b> Привязка к фреймворку</p>
                  <v-chip size="small" class="ma-1">Vue Scoped</v-chip>
                  <v-chip size="small" class="ma-1">Angular ViewEncapsulation</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Нативные (Shadow DOM)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Истинная изоляция, производительность</p>
                  <p class="mb-2"><b>Минусы:</b> Ограниченная поддержка, сложность</p>
                  <v-chip size="small" class="ma-1">Web Components</v-chip>
                  <v-chip size="small" class="ma-1">Lit</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между CSS Modules и CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules — статический подход (компиляция), CSS-in-JS — динамический (runtime).
                  Modules лучше для производительности, CSS-in-JS — для интерактивности и теминга.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать изоляцию стилей?</p>
                <p class="font-weight-regular ma-0">
                  В компонентных архитектурах, больших командах, переиспользуемых библиотеках.
                  Для простых статических сайтов может быть избыточно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли изоляция на производительность?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules и Scoped — минимальное влияние. CSS-in-JS может добавлять runtime overhead.
                  Shadow DOM обычно быстрее за счет изоляции рендеринга.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работать с глобальными стилями при изоляции?</p>
                <p class="font-weight-regular ma-0">
                  :global() в CSS Modules, createGlobalStyle в Styled Components,
                  глобальные CSS файлы для reset/base стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли комбинировать разные подходы?</p>
                <p class="font-weight-regular ma-0">
                  Да: глобальные стили для базовых элементов, CSS Modules для компонентов,
                  CSS-in-JS для динамических стилей. Главное — консистентность в команде.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Современные тренды</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Zero-runtime</h3>
                  <ul class="pl-4">
                    <li>Vanilla Extract</li>
                    <li>Stitches</li>
                    <li>Linaria</li>
                    <li>Compiled</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Utility-first</h3>
                  <ul class="pl-4">
                    <li>Tailwind CSS</li>
                    <li>UnoCSS</li>
                    <li>Windi CSS</li>
                    <li>Atomic CSS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Container Queries</h3>
                  <ul class="pl-4">
                    <li>@container правила</li>
                    <li>Изоляция на уровне контейнера</li>
                    <li>Компонентная адаптивность</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Изоляция стилей решает проблемы конфликтов имен, побочных эффектов и сложности поддержки
              в больших CSS кодбазах. Основные подходы: CSS Modules (статические), CSS-in-JS (динамические),
              Scoped Styles (фреймворки) и Shadow DOM (нативная изоляция). Выбор зависит от требований проекта,
              команды и производительности.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://css-tricks.com/css-modules-part-1-need/"
                target="_blank">
                CSS Modules Guide
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
