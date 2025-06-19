<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
<!-- Vue.js Scoped Styles -->
<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <p class="content">{{ content }}</p>
    <button class="btn primary">Действие</button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

.title {
  color: #333;
  margin-bottom: 16px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background: #007bff;
  color: white;
}
</style>

<!-- Компилируется в: -->
<style>
.card[data-v-f3f3eg9] {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

.title[data-v-f3f3eg9] {
  color: #333;
  margin-bottom: 16px;
}

.btn[data-v-f3f3eg9] {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary[data-v-f3f3eg9] {
  background: #007bff;
  color: white;
}
</style>
`

const snippet2 = `
/* Angular ViewEncapsulation.Emulated */
@Component({
  selector: 'app-card',
  template: \`
    <div class="card">
      <h2 class="title">{{ title }}</h2>
      <p class="content">{{ content }}</p>
      <button class="btn primary" (click)="onClick()">
        {{ buttonText }}
      </button>
    </div>
  \`,
  styles: [\`
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .title {
      color: #333;
      margin-bottom: 16px;
      font-size: 1.5rem;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .primary {
      background: #007bff;
      color: white;
    }

    .primary:hover {
      background: #0056b3;
    }
  \`],
  encapsulation: ViewEncapsulation.Emulated // по умолчанию
})
export class CardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() buttonText: string = 'Кнопка';

  onClick() {
    console.log('Кнопка нажата');
  }
}

/* Компилируется в: */
.card[_ngcontent-c0] {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title[_ngcontent-c0] {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
`

const snippet3 = `
/* Svelte - автоматический scoping */
<script>
  export let title = '';
  export let content = '';
  export let variant = 'primary';

  function handleClick() {
    console.log('Кнопка нажата');
  }
</script>

<div class="card">
<h2 class="title">{title}</h2>
<p class="content">{content}</p>
<button class="btn {variant}" on:click={handleClick}>
  <slot name="button">Действие</slot>
</button>
</div>

<style>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  max-width: 400px;
}

.title {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.content {
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.primary {
  background: #007bff;
  color: white;
}

.primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.secondary {
  background: #6c757d;
  color: white;
}
</style>

<!-- Компилируется в уникальные классы: -->
<style>
.card.svelte-1a2b3c4 {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  max-width: 400px;
}

.title.svelte-1a2b3c4 {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.5rem;
}
</style>
`

const snippet4 = `
/* Проблемы с наследованием в scoped стилях */

/* Родительский компонент */
<template>
  <div class="parent">
    <h1 class="title">Родительский заголовок</h1>
    <ChildComponent />
  </div>
</template>

<style scoped>
.parent {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  padding: 20px;
}

.title {
  color: #333;
  font-size: 2rem;
}

/* Этот стиль НЕ применится к дочернему компоненту */
.child-title {
  color: red;
}
</style>

/* Дочерний компонент */
<template>
  <div class="child">
    <h2 class="child-title">Дочерний заголовок</h2>
    <p class="text">Текст дочернего компонента</p>
  </div>
</template>

<style scoped>
.child {
  background: white;
  padding: 15px;
  border-radius: 4px;
}

.child-title {
  color: blue; /* Этот цвет применится */
  font-size: 1.5rem;
}

.text {
  color: #666;
}
</style>
`

const snippet5 = `
/* Решения для работы с дочерними компонентами */

/* 1. Deep селекторы (Vue.js) */
<style scoped>
.parent {
  padding: 20px;
}

/* Проникает в дочерние компоненты */
.parent :deep(.child-title) {
  color: red;
}

/* Старый синтаксис (deprecated) */
.parent >>> .child-title {
  color: red;
}

.parent /deep/ .child-title {
  color: red;
}
</style>

/* 2. Глобальные стили в scoped */
<style scoped>
.local-class {
  color: blue;
}
</style>

<style>
/* Глобальные стили */
.global-class {
  font-weight: bold;
}
</style>

/* 3. CSS переменные для передачи стилей */
<template>
  <div class="parent" :style="cssVars">
    <ChildComponent />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['primaryColor', 'fontSize']);

const cssVars = computed(() => ({
  '--primary-color': props.primaryColor || '#007bff',
  '--font-size': props.fontSize || '16px'
}));
</script>

<style scoped>
.parent {
  --primary-color: #007bff;
  --font-size: 16px;
}

/* Дочерний компонент может использовать эти переменные */
.child-element {
  color: var(--primary-color);
  font-size: var(--font-size);
}
</style>
`

const snippet6 = `
/* Продвинутые техники scoped селекторов */

/* 1. Slotted селекторы (Vue.js) */
<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
  border: 1px solid #ddd;
}

/* Стилизация содержимого слота */
.wrapper :slotted(.slot-content) {
  color: red;
  font-weight: bold;
}

/* Стилизация всех элементов в слоте */
.wrapper :slotted(*) {
  margin-bottom: 10px;
}
</style>

/* 2. Модульные селекторы */
<style module>
.card {
  border: 1px solid #ddd;
  padding: 20px;
}

.title {
  color: #333;
  font-size: 1.5rem;
}
</style>

<template>
  <div :class="$style.card">
    <h2 :class="$style.title">Заголовок</h2>
  </div>
</template>

/* 3. Комбинирование scoped и module */
<style scoped>
.component-root {
  background: #f5f5f5;
}
</style>

<style module="styles">
.dynamicClass {
  color: var(--dynamic-color);
  transition: color 0.3s ease;
}
</style>

<template>
  <div class="component-root" :class="styles.dynamicClass">
    Контент
  </div>
</template>
`

const snippet7 = `
/* Имплементация scoped селекторов "под капотом" */

// Псевдокод процесса компиляции
function compileScopedStyles(component) {
const scopeId = generateScopeId(component.filename);

// 1. Обработка шаблона
const template = component.template.replace(
/<(\w+)([^>]*)>/g,
(match, tag, attrs) => {
// Добавляем scope атрибут к каждому элементу
return \`<\${tag}\${attrs} \${scopeId}>\`;
}
);

// 2. Обработка стилей
const styles = component.styles.replace(
/([^{}]+){/g,
(match, selector) => {
// Добавляем scope атрибут к каждому селектору
const scopedSelector = selector
.split(',')
.map(s => s.trim() + '[' + scopeId + ']')
.join(', ');
return scopedSelector + ' {';
}
);

return {
template,
styles,
scopeId
};
}

// Пример генерации scope ID
function generateScopeId(filename) {
const hash = createHash(filename + Date.now());
return \`data-v-\${hash.substring(0, 8)}\`;
}

/* Результат компиляции */
// Исходный код:
// <div class="card"><h2 class="title">Text</h2></div>
// .card { padding: 20px; }
// .title { color: blue; }

// После компиляции:
// <div class="card" data-v-f3f3eg9><h2 class="title" data-v-f3f3eg9>Text</h2></div>
// .card[data-v-f3f3eg9] { padding: 20px; }
// .title[data-v-f3f3eg9] { color: blue; }
`

const snippet8 = `
/* Оптимизация производительности scoped стилей */

/* 1. Минимизация глубины селекторов */
/* ❌ Плохо - высокая специфичность */
<style scoped>
.component .container .card .header .title {
  color: blue;
}
</style>

/* ✅ Хорошо - низкая специфичность */
<style scoped>
.card-title {
  color: blue;
}
</style>

/* 2. Использование CSS переменных */
<style scoped>
.component {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --spacing: 16px;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}

.text {
  color: var(--secondary-color);
  margin-bottom: var(--spacing);
}
</style>

/* 3. Группировка связанных стилей */
<style scoped>
/* Базовые стили компонента */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

/* Состояния */
.card.loading {
  opacity: 0.6;
  pointer-events: none;
}

.card.error {
  border-color: #dc3545;
}

/* Варианты */
.card.compact {
  padding: 10px;
}

.card.expanded {
  padding: 24px;
}
</style>

/* 4. Предотвращение стилевых конфликтов */
<style scoped>
/* Используйте префиксы для внутренних классов */
.my-component-button {
  background: blue;
}

.my-component-input {
  border: 1px solid #ddd;
}

/* Избегайте стилизации голых элементов */
/* ❌ Плохо */
p {
  color: red;
}

/* ✅ Хорошо */
.component-text {
  color: red;
}
</style>
`

const snippet9 = `
/* Тестирование scoped компонентов */

// Jest тест для Vue компонента со scoped стилями
import { mount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('Card Component', () => {
it('применяет scoped стили корректно', async () => {
const wrapper = mount(Card, {
props: {
title: 'Test Title',
content: 'Test Content'
}
});

// Проверяем наличие scope атрибута
const cardElement = wrapper.find('.card');
expect(cardElement.attributes()).toHaveProperty('data-v-f3f3eg9');

// Проверяем применение стилей
expect(cardElement.classes()).toContain('card');

// Проверяем изоляцию стилей
const titleElement = wrapper.find('.title');
expect(titleElement.attributes()).toHaveProperty('data-v-f3f3eg9');
});

it('не влияет на стили других компонентов', () => {
// Монтируем два компонента
const wrapper1 = mount(Card);
const wrapper2 = mount(AnotherCard);

// Проверяем разные scope ID
const scope1 = wrapper1.find('.card').attributes('data-v-f3f3eg9');
const scope2 = wrapper2.find('.card').attributes('data-v-a1b2c3d4');

expect(scope1).not.toBe(scope2);
});
});

// Cypress E2E тест
describe('Scoped Styles Integration', () => {
it('стили изолированы между компонентами', () => {
cy.visit('/components-demo');

// Проверяем, что стили первого компонента не влияют на второй
cy.get('[data-cy="card-1"] .title').should('have.css', 'color', 'rgb(51, 51, 51)');
cy.get('[data-cy="card-2"] .title').should('have.css', 'color', 'rgb(0, 123, 255)');

// Проверяем наличие разных scope атрибутов
cy.get('[data-cy="card-1"]').should('have.attr', 'data-v-f3f3eg9');
cy.get('[data-cy="card-2"]').should('have.attr', 'data-v-a1b2c3d4');
});
});
`

const snippet10 = `
/* Отладка scoped стилей */

/* 1. DevTools инспектор */
// В DevTools можно увидеть:
// - Scope атрибуты элементов (data-v-*)
// - Скомпилированные селекторы с атрибутами
// - Конфликты специфичности
// - Неприменившиеся стили

/* 2. Vue DevTools */
// Показывает:
// - Дерево компонентов с scope ID
// - Информацию о scoped стилях
// - Связь между компонентами и их стилями

/* 3. Логирование в процессе сборки */
// webpack.config.js
module.exports = {
module: {
rules: [
{
test: /\.vue$/,
loader: 'vue-loader',
options: {
loaderOptions: {
css: {
// Включаем source maps для отладки
sourceMap: true
}
}
}
}
]
}
};

/* 4. Плагин для анализа bundle */
// webpack-bundle-analyzer покажет размер CSS
// и поможет оптимизировать scoped стили

/* 5. Отладочные комментарии */
<style scoped>
/* DEBUG: Card component styles */
.card {
  /* DEBUG: Основной контейнер */
  border: 1px solid #ddd;
}

.title {
  /* DEBUG: Заголовок карточки */
  color: #333;
}
</style>

/* 6. Условная отладка */
<style scoped>
.debug-mode .card {
  outline: 2px solid red;
}

.debug-mode .title {
  background: yellow;
}
</style>

<template>
  <div class="card" :class="{ 'debug-mode': isDebugMode }">
    <h2 class="title">{{ title }}</h2>
  </div>
</template>
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
highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.markup, 'markup')
highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.markup, 'markup')
highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.markup, 'markup')
highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.markup, 'markup')
highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.css, 'css')
highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Как работает использование селекторов с областью видимости (scoped selectors) для изоляции стилей?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Scoped селекторы</b> — это механизм автоматической изоляции стилей в компонентах,
              который предотвращает влияние стилей одного компонента на другие. Реализуется добавлением
              уникальных атрибутов к элементам и соответствующих селекторов к CSS правилам.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Принцип работы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Этап</th>
                <th class="text-left font-weight-bold">Процесс</th>
                <th class="text-left font-weight-bold">Результат</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>1. Генерация ID</b></td>
                <td class="pt-2 pb-2">Создается уникальный scope ID для компонента</td>
                <td class="pt-2 pb-2">data-v-f3f3eg9</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>2. Модификация HTML</b></td>
                <td class="pt-2 pb-2">ID добавляется как атрибут к каждому элементу</td>
                <td class="pt-2 pb-2">&lt;div class="card" data-v-f3f3eg9&gt;</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>3. Модификация CSS</b></td>
                <td class="pt-2 pb-2">ID добавляется к каждому селектору</td>
                <td class="pt-2 pb-2">.card[data-v-f3f3eg9] { }</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>4. Изоляция</b></td>
                <td class="pt-2 pb-2">Стили применяются только к элементам с соответствующим ID</td>
                <td class="pt-2 pb-2">Полная изоляция стилей</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Vue.js Scoped Styles</h2>
            <p class="font-weight-regular mb-4">
              Vue автоматически добавляет уникальные data-атрибуты к элементам и селекторам:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Angular ViewEncapsulation</h2>
            <p class="font-weight-regular mb-4">
              Angular использует ViewEncapsulation.Emulated для эмуляции Shadow DOM:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Svelte - автоматический scoping</h2>
            <p class="font-weight-regular mb-4">
              Svelte автоматически генерирует уникальные имена классов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы с наследованием</h2>
            <p class="font-weight-regular mb-4">
              Scoped стили по умолчанию не влияют на дочерние компоненты:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решения для дочерних компонентов</h2>
            <p class="font-weight-regular mb-4">
              Существует несколько способов стилизации дочерних компонентов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <p class="font-weight-regular mb-4">
              Дополнительные возможности для работы со scoped стилями:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Как это работает "под капотом"</h2>
            <p class="font-weight-regular mb-4">
              Процесс компиляции scoped стилей на примере псевдокода:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <p class="font-weight-regular mb-4">
              Лучшие практики для эффективного использования scoped стилей:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Тестирование scoped компонентов</h2>
            <p class="font-weight-regular mb-4">
              Примеры unit и e2e тестов для проверки изоляции стилей:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка scoped стилей</h2>
            <p class="font-weight-regular mb-4">
              Инструменты и техники для отладки проблем с изоляцией:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение с другими подходами</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества scoped стилей</h3>
                  <ul class="pl-4">
                    <li>Автоматическая изоляция</li>
                    <li>Нет конфликтов имен</li>
                    <li>Простота использования</li>
                    <li>Хорошая производительность</li>
                    <li>Поддержка в DevTools</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Недостатки</h3>
                  <ul class="pl-4">
                    <li>Увеличенный размер CSS</li>
                    <li>Сложности с динамическими стилями</li>
                    <li>Проблемы с треть
