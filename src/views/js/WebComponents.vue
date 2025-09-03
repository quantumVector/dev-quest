<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-css.js'

const templateBasicSnippet = `
<!-- HTML Template - шаблон для переиспользования -->
<template id="my-card-template">
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Заголовок карточки</h3>
    </div>
    <div class="card-body">
      <p class="card-content">Содержимое карточки</p>
      <button class="card-button">Кнопка</button>
    </div>
  </div>

  <style>
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card-header {
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .card-title {
      margin: 0;
      color: #333;
    }

    .card-button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</template>

<!-- Использование Template -->
<script>
// Клонирование template
const template = document.getElementById('my-card-template');
const clone = template.content.cloneNode(true);

// Модификация клонированного содержимого
clone.querySelector('.card-title').textContent = 'Новый заголовок';
clone.querySelector('.card-content').textContent = 'Новое содержимое';

// Добавление в DOM
document.body.appendChild(clone);
</script>
`

const shadowDomBasicSnippet = `
<!-- HTML для демонстрации -->
<div id="host-element">Это host элемент</div>

<script>
// Создание Shadow DOM
const hostElement = document.getElementById('host-element');
const shadowRoot = hostElement.attachShadow({ mode: 'open' });

// Добавление содержимого в Shadow DOM
shadowRoot.innerHTML = \`
  <style>
    /* Стили изолированы внутри Shadow DOM */
    .shadow-content {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }

    h2 {
      margin: 0 0 10px 0;
      font-size: 1.5rem;
    }

    /* Этот стиль НЕ влияет на внешние p элементы */
    p {
      color: yellow;
      font-weight: bold;
    }
  </style>

  <div class="shadow-content">
    <h2>Содержимое Shadow DOM</h2>
    <p>Этот текст изолирован от внешних стилей</p>
    <slot name="user-content"></slot>
  </div>
\`;

console.log('Shadow Root:', shadowRoot);
console.log('Host Element:', hostElement);
</script>
`

const customElementSnippet = `
// Определение пользовательского элемента
class MyCard extends HTMLElement {
constructor() {
super();

// Создаем Shadow DOM
this.attachShadow({ mode: 'open' });
}

// Вызывается при подключении к DOM
connectedCallback() {
this.render();
this.setupEventListeners();
}

// Атрибуты для наблюдения
static get observedAttributes() {
return ['title', 'content', 'variant'];
}

// Вызывается при изменении атрибутов
attributeChangedCallback(name, oldValue, newValue) {
if (oldValue !== newValue) {
this.render();
}
}

// Рендеринг компонента
render() {
const title = this.getAttribute('title') || 'Заголовок по умолчанию';
const content = this.getAttribute('content') || 'Содержимое по умолчанию';
const variant = this.getAttribute('variant') || 'default';

this.shadowRoot.innerHTML = \`
<style>
:host {
  display: block;
  font-family: Arial, sans-serif;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  transition: box-shadow 0.3s;
}

.card.primary {
  border-color: #007bff;
  background: #f8f9ff;
}

.card.success {
  border-color: #28a745;
  background: #f8fff8;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.content {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}
</style>

<div class="card \${variant}">
<div class="header">\${title}</div>
<div class="content">\${content}</div>
<div class="actions">
  <button class="btn-primary" id="action-btn">Действие</button>
  <slot name="custom-actions"></slot>
</div>
</div>
\`;
}

// Настройка событий
setupEventListeners() {
const actionBtn = this.shadowRoot.getElementById('action-btn');
actionBtn.addEventListener('click', () => {
// Dispatch custom event
this.dispatchEvent(new CustomEvent('card-action', {
detail: { title: this.getAttribute('title') },
bubbles: true
}));
});
}

// Public методы
updateContent(newContent) {
this.setAttribute('content', newContent);
}
}

// Регистрация пользовательского элемента
customElements.define('my-card', MyCard);

// Использование:
/*
<my-card
  title="Заголовок карточки"
  content="Описание карточки"
  variant="primary">
<button slot="custom-actions">Дополнительное действие</button>
</my-card>
*/
`

const slotExampleSnippet = `
// Компонент с продвинутыми слотами
class UserProfile extends HTMLElement {
constructor() {
super();
this.attachShadow({ mode: 'open' });
}

connectedCallback() {
this.render();
}

render() {
this.shadowRoot.innerHTML = \`
<style>
:host {
  display: block;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.avatar-slot {
  margin-bottom: 10px;
}

.avatar-slot::slotted(img) {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.profile-content {
  padding: 20px;
}

.info-slot::slotted(.info-item) {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.actions-slot {
  padding: 16px;
  border-top: 1px solid #eee;
  background: #f8f9fa;
}

.actions-slot::slotted(button) {
  margin-right: 8px;
}

.default-avatar {
  width: 80px;
  height: 80px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}
</style>

<div class="profile-header">
<div class="avatar-slot">
  <slot name="avatar">
    <div class="default-avatar">👤</div>
  </slot>
</div>
<slot name="name">
  <h3>Имя пользователя</h3>
</slot>
</div>

<div class="profile-content">
<div class="info-slot">
  <slot name="info"></slot>
</div>
</div>

<div class="actions-slot">
<slot name="actions">
  <button>Профиль</button>
</slot>
</div>
\`;
}
}

customElements.define('user-profile', UserProfile);

// Использование с слотами:
/*
<user-profile>
<img slot="avatar" src="avatar.jpg" alt="Avatar">
<h3 slot="name">Иван Иванов</h3>

<div slot="info">
  <div class="info-item">
    <span>Email:</span>
    <span>ivan@example.com</span>
  </div>
  <div class="info-item">
    <span>Роль:</span>
    <span>Разработчик</span>
  </div>
</div>

<div slot="actions">
  <button>Редактировать</button>
  <button>Удалить</button>
</div>
</user-profile>
*/
`

const encapsulationExampleSnippet = `
// Демонстрация инкапсуляции стилей
class StyleEncapsulation extends HTMLElement {
constructor() {
super();
this.attachShadow({ mode: 'open' });
}

connectedCallback() {
this.render();
this.demonstrateEncapsulation();
}

render() {
this.shadowRoot.innerHTML = \`
<style>
/* Эти стили действуют ТОЛЬКО внутри Shadow DOM */

/* :host - селектор для host элемента */
:host {
  display: block;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
}

/* :host() - условный селектор host */
:host(.highlighted) {
  background: #ffffcc;
  border: 2px solid #ffeb3b;
}

/* :host-context() - стили в зависимости от предка */
:host-context(.dark-theme) {
  background: #333;
  color: white;
}

/* Обычные стили - изолированы */
h1 {
  color: red;
  font-size: 2rem;
  margin: 0;
}

p {
  color: blue;
  font-weight: bold;
}

.internal-class {
  background: yellow;
  padding: 10px;
}

/* ::slotted() - стили для slotted контента */
::slotted(.external-content) {
  border: 2px solid green;
  padding: 10px;
}

::slotted(strong) {
  color: purple;
}
</style>

<h1>Заголовок внутри Shadow DOM</h1>
<p>Этот параграф имеет синий цвет</p>
<div class="internal-class">Элемент с внутренним классом</div>

<div>
<h3>Слотованный контент:</h3>
<slot></slot>
</div>
\`;
}

demonstrateEncapsulation() {
// Добавляем внешние стили для сравнения
const externalStyles = document.createElement('style');
externalStyles.textContent = \`
/* Эти стили НЕ влияют на Shadow DOM */
h1 { color: green !important; }
p { color: orange !important; }
.internal-class { background: red !important; }
\`;
document.head.appendChild(externalStyles);

console.log('Внешние стили добавлены, но не влияют на Shadow DOM');
}
}

customElements.define('style-encapsulation', StyleEncapsulation);

// Использование:
/*
<style>
/* Внешние стили */
h1 { color: green; }
p { color: orange; }
</style>

<div class="dark-theme">
<style-encapsulation class="highlighted">
  <div class="external-content">Этот контент приходит извне</div>
  <strong>Жирный текст в слоте</strong>
</style-encapsulation>
</div>

<h1>Внешний заголовок (зеленый)</h1>
<p>Внешний параграф (оранжевый)</p>
*/
`

const lifecycleExampleSnippet = `
// Полный пример с жизненным циклом
class LifecycleDemo extends HTMLElement {
constructor() {
super();
console.log('🏗️ Constructor вызван');

this.attachShadow({ mode: 'open' });

// Приватные свойства
this._counter = 0;
this._timer = null;
}

// Наблюдаемые атрибуты
static get observedAttributes() {
return ['auto-increment', 'interval', 'max-value'];
}

// Подключение к DOM
connectedCallback() {
console.log('🔗 Connected to DOM');
this.render();
this.setupEventListeners();

if (this.getAttribute('auto-increment') === 'true') {
this.startAutoIncrement();
}
}

// Отключение от DOM
disconnectedCallback() {
console.log('💔 Disconnected from DOM');
this.stopAutoIncrement();
this.cleanup();
}

// Перемещение в DOM
adoptedCallback() {
console.log('📦 Adopted to new document');
}

// Изменение атрибутов
attributeChangedCallback(name, oldValue, newValue) {
console.log(\`🔄 Attribute '\${name}' changed: \${oldValue} → \${newValue}\`);

switch (name) {
case 'auto-increment':
if (newValue === 'true') {
this.startAutoIncrement();
} else {
this.stopAutoIncrement();
}
break;

case 'interval':
if (this._timer) {
this.stopAutoIncrement();
this.startAutoIncrement();
}
break;

case 'max-value':
this.checkMaxValue();
break;
}
}

// Рендеринг
render() {
const interval = this.getAttribute('interval') || '1000';
const maxValue = this.getAttribute('max-value') || '10';

this.shadowRoot.innerHTML = \`
<style>
:host {
  display: block;
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-family: monospace;
}

.counter {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #007bff;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary { background: #007bff; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-warning { background: #ffc107; color: black; }
.btn-danger { background: #dc3545; color: white; }

.info {
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 12px;
}

.max-reached {
  background: #ffebee;
  border: 1px solid #f44336;
  color: #c62828;
}
</style>

<div class="counter" id="counter">\${this._counter}</div>

<div class="controls">
<button class="btn-primary" id="increment">+1</button>
<button class="btn-warning" id="decrement">-1</button>
<button class="btn-success" id="toggle-auto">Auto: OFF</button>
<button class="btn-danger" id="reset">Reset</button>
</div>

<div class="info">
<div>Интервал: \${interval}ms</div>
<div>Максимум: \${maxValue}</div>
<div>Auto-increment: \${this.getAttribute('auto-increment') || 'false'}</div>
</div>
\`;

this.updateCounter();
}

// Настройка событий
setupEventListeners() {
const incrementBtn = this.shadowRoot.getElementById('increment');
const decrementBtn = this.shadowRoot.getElementById('decrement');
const toggleAutoBtn = this.shadowRoot.getElementById('toggle-auto');
const resetBtn = this.shadowRoot.getElementById('reset');

incrementBtn.addEventListener('click', () => this.increment());
decrementBtn.addEventListener('click', () => this.decrement());
toggleAutoBtn.addEventListener('click', () => this.toggleAutoIncrement());
resetBtn.addEventListener('click', () => this.reset());
}

// Методы компонента
increment() {
this._counter++;
this.updateCounter();
this.checkMaxValue();
this.dispatchCounterEvent();
}

decrement() {
this._counter = Math.max(0, this._counter - 1);
this.updateCounter();
this.dispatchCounterEvent();
}

reset() {
this._counter = 0;
this.updateCounter();
this.dispatchCounterEvent();
}

toggleAutoIncrement() {
const current = this.getAttribute('auto-increment') === 'true';
this.setAttribute('auto-increment', (!current).toString());
}

startAutoIncrement() {
this.stopAutoIncrement();
const interval = parseInt(this.getAttribute('interval') || '1000');

this._timer = setInterval(() => {
this.increment();
}, interval);

const toggleBtn = this.shadowRoot.getElementById('toggle-auto');
if (toggleBtn) toggleBtn.textContent = 'Auto: ON';
}

stopAutoIncrement() {
if (this._timer) {
clearInterval(this._timer);
this._timer = null;
}

const toggleBtn = this.shadowRoot.getElementById('toggle-auto');
if (toggleBtn) toggleBtn.textContent = 'Auto: OFF';
}

checkMaxValue() {
const maxValue = parseInt(this.getAttribute('max-value') || '10');
const infoDiv = this.shadowRoot.querySelector('.info');

if (this._counter >= maxValue) {
infoDiv.classList.add('max-reached');
this.stopAutoIncrement();
this.setAttribute('auto-increment', 'false');
} else {
infoDiv.classList.remove('max-reached');
}
}

updateCounter() {
const counterEl = this.shadowRoot.getElementById('counter');
if (counterEl) {
counterEl.textContent = this._counter;
}
}

dispatchCounterEvent() {
this.dispatchEvent(new CustomEvent('counter-change', {
detail: {
value: this._counter,
timestamp: Date.now()
},
bubbles: true
}));
}

cleanup() {
// Очистка ресурсов
this.stopAutoIncrement();
}

// Геттеры и сеттеры
get counter() {
return this._counter;
}

set counter(value) {
this._counter = Math.max(0, parseInt(value) || 0);
this.updateCounter();
}
}

customElements.define('lifecycle-demo', LifecycleDemo);

// Использование:
/*
<lifecycle-demo
  auto-increment="false"
  interval="500"
  max-value="20">
</lifecycle-demo>

<script>
const demo = document.querySelector('lifecycle-demo');

demo.addEventListener('counter-change', (event) => {
  console.log('Счетчик изменился:', event.detail);
});

// Программное управление
setTimeout(() => {
  demo.setAttribute('auto-increment', 'true');
}, 3000);
</script>
*/
`

const highlightedTemplateBasic = ref('')
const highlightedShadowDomBasic = ref('')
const highlightedCustomElement = ref('')
const highlightedSlotExample = ref('')
const highlightedEncapsulationExample = ref('')
const highlightedLifecycleExample = ref('')

onMounted(() => {
highlightedTemplateBasic.value = Prism.highlight(templateBasicSnippet, Prism.languages.javascript, 'javascript')
highlightedShadowDomBasic.value = Prism.highlight(shadowDomBasicSnippet, Prism.languages.javascript, 'javascript')
highlightedCustomElement.value = Prism.highlight(customElementSnippet, Prism.languages.javascript, 'javascript')
highlightedSlotExample.value = Prism.highlight(slotExampleSnippet, Prism.languages.javascript, 'javascript')
highlightedEncapsulationExample.value = Prism.highlight(encapsulationExampleSnippet, Prism.languages.javascript, 'javascript')
highlightedLifecycleExample.value = Prism.highlight(lifecycleExampleSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Components: Templates, Shadow DOM
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Components</b> — это набор веб-стандартов для создания переиспользуемых компонентов:
              <b>Custom Elements</b>, <b>Shadow DOM</b>, <b>HTML Templates</b> и <b>ES Modules</b>.
              Они позволяют инкапсулировать функциональность и стили, создавая независимые компоненты
              без использования фреймворков.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы Web Components</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-puzzle</v-icon>
                    <h3 class="text-h6 font-weight-bold">4 основные технологии</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Custom Elements</strong> — пользовательские HTML элементы</li>
                    <li><strong>Shadow DOM</strong> — инкапсуляция DOM и стилей</li>
                    <li><strong>HTML Templates</strong> — шаблоны для переиспользования</li>
                    <li><strong>ES Modules</strong> — модульная система</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества</h3>
                  <ul class="pl-4">
                    <li>Нативная поддержка браузеров</li>
                    <li>Независимость от фреймворков</li>
                    <li>Инкапсуляция стилей и логики</li>
                    <li>Переиспользуемость</li>
                    <li>Стандартизированный подход</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">HTML Templates — шаблоны</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>HTML Template</strong> — это элемент <code>&lt;template&gt;</code>, который содержит HTML разметку,
              не отображаемую до использования. Контент template можно клонировать и вставлять в DOM.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-file-document-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Декларативность</h3>
                  <p class="text-body-2">HTML разметка описывается декларативно в template</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-content-copy</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Клонирование</h3>
                  <p class="text-body-2">Template можно клонировать множество раз</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-eye-off</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Неактивность</h3>
                  <p class="text-body-2">Скрипты не выполняются, изображения не загружаются</p>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedTemplateBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Shadow DOM — инкапсуляция</h2>

            <v-alert color="success" class="mb-6">
              <v-icon class="mr-2">mdi-shield-check</v-icon>
              <strong>Shadow DOM</strong> создает изолированную область внутри элемента, где CSS и DOM
              не пересекаются с внешним документом. Это обеспечивает инкапсуляцию стилей и структуры.
            </v-alert>

            <v-row class="mb-6">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-shield</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-
