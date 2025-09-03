<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-css.js'

const templateExample = `
<!-- HTML Template -->
<template id="card-template">
  <div class="card">
    <h3 class="title">Заголовок</h3>
    <p class="content">Содержимое</p>
  </div>
  <style>
    .card { border: 1px solid #ddd; padding: 16px; }
  </style>
</template>

<script>
// Использование template
const template = document.getElementById('card-template');
const clone = template.content.cloneNode(true);
document.body.appendChild(clone);
<\/script>
`

const shadowDomExample = `
// Создание Shadow DOM
const element = document.createElement('div');
const shadowRoot = element.attachShadow({ mode: 'open' });

shadowRoot.innerHTML = \`
  <style>
    /* Изолированные стили */
    h2 { color: red; }
    p { color: blue; }
  </style>
  <h2>Shadow DOM содержимое</h2>
  <p>Стили изолированы от внешнего документа</p>
  <slot></slot> <!-- Место для внешнего контента -->
\`;

document.body.appendChild(element);
`

const customElementExample = `
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Отслеживаемые атрибуты
  static get observedAttributes() {
    return ['title', 'content'];
  }

  // Подключение к DOM
  connectedCallback() {
    this.render();
  }

  // Изменение атрибутов
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute('title') || 'Заголовок';
    const content = this.getAttribute('content') || 'Контент';

    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: block; padding: 16px; border: 1px solid #ccc; }
        .title { color: #333; margin: 0 0 8px 0; }
        .content { color: #666; }
        ::slotted(.highlight) { background: yellow; }
      </style>

      <h3 class="title">\${title}</h3>
      <p class="content">\${content}</p>
      <slot></slot>
    \`;
  }
}

// Регистрация элемента
customElements.define('my-element', MyElement);

// Использование:
// <my-element title="Привет" content="Мир">
//   <span class="highlight" slot="">Дополнительный контент</span>
// </my-element>
`

const highlightedTemplate = ref('')
const highlightedShadowDom = ref('')
const highlightedCustomElement = ref('')

onMounted(() => {
  highlightedTemplate.value = Prism.highlight(templateExample, Prism.languages.javascript, 'javascript')
  highlightedShadowDom.value = Prism.highlight(shadowDomExample, Prism.languages.javascript, 'javascript')
  highlightedCustomElement.value = Prism.highlight(customElementExample, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Components: Templates, Shadow DOM, Custom Elements
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Components</b> — это набор веб-стандартов для создания переиспользуемых компонентов:
              <b>Custom Elements</b>, <b>Shadow DOM</b>, <b>HTML Templates</b> и <b>ES Modules</b>.
              Они позволяют инкапсулировать функциональность и стили без фреймворков.
            </p>

            <!-- Основы -->
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-file-document</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Templates</h3>
                  <p class="text-body-2">Шаблоны HTML для клонирования</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-shield</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Shadow DOM</h3>
                  <p class="text-body-2">Изоляция DOM и стилей</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-puzzle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Custom Elements</h3>
                  <p class="text-body-2">Пользовательские HTML элементы</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- HTML Templates -->
            <h2 class="text-h5 font-weight-bold mb-3">HTML Templates</h2>
            <v-alert color="info" class="mb-4">
              <strong>Template</strong> — элемент <code>&lt;template&gt;</code> содержит HTML разметку,
              которая не отображается до клонирования и вставки в DOM.
            </v-alert>

            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedTemplate"></code></pre>

            <!-- Shadow DOM -->
            <h2 class="text-h5 font-weight-bold mb-3">Shadow DOM</h2>
            <v-alert color="success" class="mb-4">
              <strong>Shadow DOM</strong> создает изолированную область внутри элемента.
              CSS и DOM не пересекаются с внешним документом.
            </v-alert>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Режимы Shadow DOM</h3>
                  <ul class="pl-4">
                    <li><code>open</code> — доступ через element.shadowRoot</li>
                    <li><code>closed</code> — element.shadowRoot === null</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Специальные селекторы</h3>
                  <ul class="pl-4">
                    <li><code>:host</code> — стили для host элемента</li>
                    <li><code>:host(.class)</code> — условные стили</li>
                    <li><code>::slotted()</code> — стили для slotted контента</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedShadowDom"></code></pre>

            <!-- Custom Elements -->
            <h2 class="text-h5 font-weight-bold mb-3">Custom Elements</h2>

            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Lifecycle методы</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>connectedCallback()</code> — добавление в DOM</li>
                    <li><code>disconnectedCallback()</code> — удаление из DOM</li>
                    <li><code>attributeChangedCallback()</code> — изменение атрибутов</li>
                    <li><code>adoptedCallback()</code> — перемещение в документ</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Ключевые особенности</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>observedAttributes</code> — отслеживаемые атрибуты</li>
                    <li><code>&lt;slot&gt;</code> — композиция контента</li>
                    <li>Custom Events для коммуникации</li>
                    <li>Extends HTMLElement</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedCustomElement"></code></pre>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Ключевые вопросы на собеседовании</h2>

            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title>Что такое Web Components?</v-expansion-panel-title>
                <v-expansion-panel-text>
                  Набор веб-стандартов: Custom Elements (пользовательские HTML элементы),
                  Shadow DOM (инкапсуляция), HTML Templates (шаблоны), ES Modules.
                  Позволяют создавать переиспользуемые компоненты без фреймворков.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Разница между open и closed Shadow DOM?</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <strong>Open:</strong> доступен через element.shadowRoot<br>
                  <strong>Closed:</strong> element.shadowRoot возвращает null<br>
                  Open используется чаще, closed обеспечивает максимальную инкапсуляцию.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Как работают slots?</v-expansion-panel-title>
                <v-expansion-panel-text>
                  Slots создают "дырки" в Shadow DOM для внешнего контента.
                  <code>&lt;slot name="header"&gt;</code> + <code>&lt;div slot="header"&gt;</code>
                  позволяют точно контролировать размещение контента.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Как стили изолированы в Shadow DOM?</v-expansion-panel-title>
                <v-expansion-panel-text>
                  Shadow DOM создает границу стилей. Внешние CSS не влияют на внутренние элементы,
                  внутренние не вытекают наружу. Исключения: наследуемые свойства (color, font)
                  и стили через ::slotted().
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>Web Components vs React/Vue?</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <strong>Web Components:</strong> нативные, без зависимостей, работают везде<br>
                  <strong>Фреймворки:</strong> богатая экосистема, dev tools, но vendor lock-in<br>
                  Выбор зависит от задач: библиотеки компонентов — WC, сложные приложения — фреймворки.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Преимущества и недостатки -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Преимущества</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Нативная поддержка браузеров</li>
                    <li>Независимость от фреймворков</li>
                    <li>Истинная инкапсуляция</li>
                    <li>Переиспользуемость между проектами</li>
                    <li>Долговечность (стандарты)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Ограничения</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Больше boilerplate кода</li>
                    <li>Ограниченная экосистема</li>
                    <li>Сложности с SSR</li>
                    <li>Нет встроенного state management</li>
                    <li>Менее развитые dev tools</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Практическое применение -->
            <h2 class="text-h5 font-weight-bold mb-3">Практическое применение</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-library</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Design Systems</h3>
                  <p class="text-body-2">Библиотеки UI компонентов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-puzzle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Микрофронтенды</h3>
                  <p class="text-body-2">Изолированные компоненты</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-widgets</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Виджеты</h3>
                  <p class="text-body-2">Встраиваемые компоненты</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                target="_blank"
                class="mr-2">
                MDN Web Components
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://lit.dev/"
                target="_blank">
                Lit Library
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
