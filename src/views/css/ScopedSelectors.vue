<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
/* Проблема: глобальные стили конфликтуют */

/* Компонент A */
.button {
  background: blue;
  color: white;
  padding: 10px;
}

.title {
  font-size: 24px;
  color: #333;
}

/* Компонент B */
.button {
  background: red;    /* Конфликт! */
  border-radius: 5px;
}

.title {
  font-size: 18px;    /* Конфликт! */
  color: #666;
}

/* Результат: стили перезаписывают друг друга */
`

const snippet2 = `
/* Решение 1: CSS Modules */

/* styles.module.css */
.button {
  background: blue;
  color: white;
  padding: 10px;
}

.title {
  font-size: 24px;
  color: #333;
}

/* Компилируется в: */
.ComponentA_button_1a2b3c {
  background: blue;
  color: white;
  padding: 10px;
}

.ComponentA_title_4d5e6f {
  font-size: 24px;
  color: #333;
}

/* Использование в React */
import styles from './styles.module.css';

function ComponentA() {
  return (
    <div>
      <h1 className={styles.title}>Заголовок</h1>
      <button className={styles.button}>Кнопка</button>
    </div>
  );
}
`

const snippet3 = `
/* Решение 2: CSS-in-JS (Styled Components) */

import styled from 'styled-components';

// Генерируется уникальный класс автоматически
const Button = styled.button\`
  background: blue;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: darkblue;
  }
\`;

const Title = styled.h1\`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
\`;

// Использование
function ComponentA() {
  return (
    <div>
      <Title>Заголовок</Title>
      <Button>Кнопка</Button>
    </div>
  );
}

/* Результат в DOM: */
/*
<h1 class="sc-bdVaJa fKxRjZ">Заголовок</h1>
<button class="sc-bwzfXH kJhWER">Кнопка</button>
*/
`

const snippet4 = `
/* Решение 3: Vue.js Scoped Styles */

<template>
  <div class="component">
    <h1 class="title">{{ title }}</h1>
    <button class="button" @click="handleClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.component {
  padding: 20px;
  border: 1px solid #ddd;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.button {
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background: darkblue;
}
</style>

<!-- Компилируется в: -->
<div class="component" data-v-f3f3eg9>
  <h1 class="title" data-v-f3f3eg9>Заголовок</h1>
  <button class="button" data-v-f3f3eg9>Кнопка</button>
</div>

<style>
.component[data-v-f3f3eg9] {
  padding: 20px;
  border: 1px solid #ddd;
 }
.title[data-v-f3f3eg9] {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
 }
.button[data-v-f3f3eg9] {
  background: blue;
  color: white;
  padding: 10px 20px;
}
</style>
`

const snippet5 = `
/* Решение 4: Angular ViewEncapsulation */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <h2 class="title">{{ title }}</h2>
      <button class="button" (click)="onClick()">
        {{ buttonText }}
      </button>
    </div>
  \`,
  styles: [\`
    .card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .title {
      color: #333;
      margin-bottom: 16px;
    }

    .button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
    }
  \`],
  encapsulation: ViewEncapsulation.Emulated // по умолчанию
})
export class CardComponent {
  title = 'Заголовок';
  buttonText = 'Нажать';

  onClick() {
    console.log('Клик!');
  }
}

/* Результат в DOM: */
/*
<div class="card" _ngcontent-c0>
  <h2 class="title" _ngcontent-c0>Заголовок</h2>
  <button class="button" _ngcontent-c0>Нажать</button>
</div>
*/

/* CSS: */
.card[_ngcontent-c0] {
  padding: 20px;
  border: 1px solid #ddd;
 }
.title[_ngcontent-c0] {
  color: #333;
  margin-bottom: 16px;
}
.button[_ngcontent-c0] {
  background: #007bff;
  color: white;
}
`

const snippet6 = `
/* Решение 5: Svelte - автоматический scoping */

<script>
  export let title = 'Заголовок';
  export let buttonText = 'Кнопка';

  function handleClick() {
    console.log('Клик в Svelte!');
  }
<\/script>

<div class="card">
<h2 class="title">{title}</h2>
<button class="button" on:click={handleClick}>
  {buttonText}
</button>
</div>

<style>
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
}

.title {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.button {
  background: #ff3e00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: #cc3200;
}
</style>

<!-- Компилируется в уникальные классы: -->
<div class="card svelte-1a2b3c4">
<h2 class="title svelte-1a2b3c4">Заголовок</h2>
<button class="button svelte-1a2b3c4">Кнопка</button>
</div>
`

const snippet7 = `
/* Решение 6: Shadow DOM (веб-компоненты) */

class CustomCard extends HTMLElement {
  constructor() {
  super();

  // Создаем Shadow DOM
  const shadow = this.attachShadow({ mode: 'open' });

  // HTML шаблон
  const template = document.createElement('template');
  template.innerHTML = \`
<style>
/* Стили полностью изолированы внутри Shadow DOM */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.title {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background: #218838;
}
</style>

<div class="card">
<h2 class="title">
  <slot name="title">Заголовок по умолчанию</slot>
</h2>
<button class="button" id="btn">
  <slot name="button">Кнопка</slot>
</button>
</div>
\`;

// Клонируем и добавляем в Shadow DOM
shadow.appendChild(template.content.cloneNode(true));

// Обработчик событий
shadow.getElementById('btn').addEventListener('click', () => {
  this.dispatchEvent(new CustomEvent('cardClick', {
    detail: { message: 'Кнопка нажата!' }
  }));
});

// Регистрируем веб-компонент
customElements.define('custom-card', CustomCard);

/* Использование: */
/*
<custom-card>
  <span slot="title">Мой заголовок</span>
  <span slot="button">Моя кнопка</span>
</custom-card>
*/
`

const snippet8 = `
/* Сравнение подходов к scoped селекторам */

// 1. CSS Modules - статическое время компиляции
.button {
  background: blue;
}
// ↓ компилируется в ↓
.Button_button_1a2b3c {
  background: blue;
}

// 2. Styled Components - runtime генерация
const Button = styled.button\`background: blue;\`;
// ↓ генерирует ↓
.sc-bdVaJa {
  background: blue;
}

// 3. Vue Scoped - атрибутная изоляция
<style scoped>
  .button {
    background: blue;
  }
 </style>
// ↓ компилируется в ↓
.button[data-v-f3f3eg9] {
  background: blue;
}

// 4. Angular ViewEncapsulation - эмуляция Shadow DOM
.button {
  background: blue;
}
// ↓ компилируется в ↓
.button[_ngcontent-c0] {
  background: blue;
}

// 5. Svelte - суффиксы классов
.button {
  background: blue;
}
// ↓ компилируется в ↓
.button.svelte-1a2b3c4 {
  background: blue;
}

// 6. Shadow DOM - истинная изоляция
.button {
  background: blue;
} // Полностью изолировано

// 7. CSS @scope - нативная изоляция
@scope (.button-container) {
  .button {
    background: blue;
  }
}
// ↓ работает как ↓
.button-container .button {
  background: blue;
}
`

const snippet9 = `
/* Проблемы и ограничения scoped селекторов */

/* 1. Проблема с дочерними компонентами */
/* Родительский компонент */
<style scoped>
  .parent .child-title {
    color: red; /* НЕ применится к дочернему компоненту */
  }
</style>

/* Решения: */
/* Vue: deep селекторы */
<style scoped>
  .parent :deep(.child-title) {
    color: red; /* Применится */
  }
</style>

/* CSS Modules: глобальное исключение */
.parent :global(.child-title) {
  color: red;
}

/* Styled Components: глобальные стили */
const GlobalStyle = createGlobalStyle\`
  .child-title {
    color: red;
  }
\`;

/* 2. Проблема с третьими библиотеками */
/* Библиотечные компоненты могут не наследовать scoped стили */

/* 3. Увеличение размера CSS */
/* Каждый класс дублируется с уникальным идентификатором */

/* 4. Сложности с динамическими стилями */
/* Не все подходы поддерживают CSS переменные и calc() */

/* 5. Производительность */
/* Некоторые подходы генерируют стили в runtime */
`

const snippet10 = `
/* Лучшие практики для scoped селекторов */

/* 1. Используйте CSS переменные для темизации */
<style scoped>
.component {
  --primary-color: #007bff;
  --border-radius: 4px;
  --spacing: 16px;
}

.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  padding: var(--spacing);
}
</style>

/* 2. Структурируйте стили по компонентам */
/* ✅ Хорошо - один файл стилей на компонент */
Button.module.css
Card.module.css
Modal.module.css

/* ❌ Плохо - общий файл стилей */
components.css

/* 3. Избегайте глубокой вложенности */
/* ❌ Плохо */
.card .header .title .text {
  color: blue;
}

/* ✅ Хорошо */
.card-title-text {
  color: blue;
}

/* 4. Используйте семантичные имена классов */
/* ❌ Плохо */
.red-button {
  background: red;
}

/* ✅ Хорошо */
.danger-button {
  background: red;
}
.primary-button {
  background: blue;
}

/* 5. Комбинируйте с utility-классами */
/* Scoped стили для компонентов */
.card {
  padding: 20px;
}

/* Utility для общих свойств */
.mb-4 {
  margin-bottom: 1rem;
}
.text-center {
  text-align: center;
}
`

const snippet11 = `
/* Решение 7: CSS @scope - нативная изоляция */

/* Базовый синтаксис @scope */
@scope (.card) {
  .title {
    color: #333;
    font-size: 1.5rem;
  }

  .button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
  }
}

/* Эквивалентно: */
.card .title {
  color: #333;
  font-size: 1.5rem;
}

/* @scope с границами (limits) */
@scope (.card) to (.nested-card) {
  .title {
  /* Применится только к .title внутри .card,
     но НЕ внутри .nested-card */
    color: red;
  }
}

/* Пример HTML: */
<div class="card">
  <h2 class="title">Красный заголовок</h2>
  <div class="nested-card">
    <h3 class="title">Обычный заголовок (не красный)</h3>
  </div>
</div>

/* @scope с :scope псевдоклассом */
@scope (.component) {
  :scope {
    /* Стили для самого .component */
    padding: 20px;
    border: 1px solid #ddd;
  }

  .header {
    /* Стили для .header внутри .component */
    margin-bottom: 16px;
  }
}

/* Вложенные @scope */
@scope (.outer) {
  .title {
    color: blue;
  }

  @scope (.inner) {
    .title {
      color: red;
    } /* Переопределяет синий */
  }
}

/* @scope с медиа-запросами */
@scope (.responsive-card) {
  .title {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    .title {
      font-size: 1.5rem;
    }
  }
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
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')
const highlightedSnippet11 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.markup, 'markup')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.markup, 'markup')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.css, 'css')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.css, 'css')
  highlightedSnippet11.value = Prism.highlight(snippet11, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Scoped селекторы для изоляции стилей
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Scoped селекторы</b> — это техники и технологии, которые позволяют изолировать CSS стили
              внутри отдельных компонентов, предотвращая конфликты имен и нежелательное влияние стилей
              друг на друга. Эта концепция решает одну из главных проблем CSS — глобальную область видимости.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблема глобальных стилей</h2>
            <p class="font-weight-regular mb-4">
              В обычном CSS все стили глобальны, что приводит к конфликтам:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные подходы к scoped селекторам</h2>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Принцип работы</th>
                <th class="text-left font-weight-bold">Технологии</th>
                <th class="text-left font-weight-bold">Время изоляции</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Modules</b></td>
                <td class="pt-2 pb-2">Генерация уникальных имен классов</td>
                <td class="pt-2 pb-2">Webpack, Vite, PostCSS</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>CSS-in-JS</b></td>
                <td class="pt-2 pb-2">Генерация стилей в JavaScript</td>
                <td class="pt-2 pb-2">Styled Components, Emotion</td>
                <td class="pt-2 pb-2">Runtime</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Атрибутная изоляция</b></td>
                <td class="pt-2 pb-2">Добавление data-атрибутов</td>
                <td class="pt-2 pb-2">Vue, Angular</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Суффиксы классов</b></td>
                <td class="pt-2 pb-2">Добавление уникальных суффиксов</td>
                <td class="pt-2 pb-2">Svelte</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Shadow DOM</b></td>
                <td class="pt-2 pb-2">Истинная изоляция DOM</td>
                <td class="pt-2 pb-2">Web Components</td>
                <td class="pt-2 pb-2">Runtime</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>@scope</b></td>
                <td class="pt-2 pb-2">Нативное ограничение области действия CSS</td>
                <td class="pt-2 pb-2">Современные браузеры</td>
                <td class="pt-2 pb-2">Runtime</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. CSS Modules</h2>
            <p class="font-weight-regular mb-4">
              Автоматическая генерация уникальных имен классов во время сборки:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. CSS-in-JS (Styled Components)</h2>
            <p class="font-weight-regular mb-4">
              Генерация стилей и уникальных классов в JavaScript во время выполнения:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Vue.js Scoped Styles</h2>
            <p class="font-weight-regular mb-4">
              Добавление уникальных data-атрибутов к элементам и селекторам:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Angular ViewEncapsulation</h2>
            <p class="font-weight-regular mb-4">
              Эмуляция Shadow DOM через атрибуты:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Svelte - автоматический scoping</h2>
            <p class="font-weight-regular mb-4">
              Автоматическое добавление уникальных суффиксов к классам:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Shadow DOM (Web Components)</h2>
            <p class="font-weight-regular mb-4">
              Истинная изоляция стилей на уровне браузера:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. CSS @scope - нативная изоляция</h2>
            <p class="font-weight-regular mb-4">
              Новая CSS-функция для нативного ограничения области действия стилей без дополнительных инструментов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet11"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества и недостатки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества</h3>
                  <ul class="pl-4">
                    <li>Полная изоляция стилей</li>
                    <li>Отсутствие конфликтов имен</li>
                    <li>Локальность стилей</li>
                    <li>Простота рефакторинга</li>
                    <li>Предсказуемость поведения</li>
                    <li>Возможность переиспользования</li>
                    <li>Нативная поддержка браузером @scope (без инструментов сборки)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Недостатки</h3>
                  <ul class="pl-4">
                    <li>Увеличение размера CSS</li>
                    <li>Сложности с каскадированием</li>
                    <li>Проблемы с библиотеками</li>
                    <li>Learning curve</li>
                    <li>Дополнительные инструменты</li>
                    <li>Runtime overhead (CSS-in-JS)</li>
                    <li>Ограниченная поддержка браузерами @scope (Chrome 118+, Firefox в разработке)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы и ограничения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы для собеседования</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое scoped селекторы и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Техники изоляции CSS стилей в компонентах для предотвращения конфликтов и нежелательного влияния стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие существуют подходы к реализации scoped стилей?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules, CSS-in-JS, атрибутная изоляция (Vue/Angular), суффиксы классов (Svelte), Shadow DOM.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между build-time и runtime изоляцией?</p>
                <p class="font-weight-regular ma-0">
                  Build-time: трансформация на этапе сборки (CSS Modules, Vue scoped). Runtime: генерация во время выполнения (CSS-in-JS).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает изоляция в Vue.js?</p>
                <p class="font-weight-regular ma-0">
                  Добавление уникальных data-атрибутов к элементам и соответствующих атрибутных селекторов к CSS правилам.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы могут возникнуть со scoped стилями?</p>
                <p class="font-weight-regular ma-0">
                  Сложности с дочерними компонентами, третьими библиотеками, увеличение размера CSS, производительность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда лучше использовать каждый подход?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules - для React/статики, CSS-in-JS - для динамических стилей, scoped - во фреймворках, Shadow DOM - для Web Components.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое CSS @scope и чем отличается от других подходов?</p>
                <p class="font-weight-regular ma-0">
                  Нативная CSS-функция для ограничения области действия стилей с поддержкой границ (limits) и :scope псевдокласса.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Scoped селекторы решают фундаментальную проблему CSS — глобальную область видимости.
              Разные технологии предлагают различные подходы: от compile-time трансформаций до runtime генерации стилей.
              Выбор зависит от технологического стека, требований к производительности и сложности проекта.
              Главное — понимать принципы работы каждого подхода и их ограничения.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://css-tricks.com/css-modules-part-1-need/"
                target="_blank">
                CSS Tricks: CSS Modules
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
