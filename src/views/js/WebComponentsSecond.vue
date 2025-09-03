<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const basicExample = `
// =====================================
// ОСНОВЫ CUSTOM ELEMENTS
// =====================================

class MyButton extends HTMLElement {
  constructor() {
    super();
    // Создаем Shadow DOM для инкапсуляции
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      <style>
        button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover { transform: scale(1.05); }
      </style>
      <button><slot>Click me</slot></button>
    \`;
  }

  connectedCallback() {
    // Компонент добавлен в DOM
    this.shadowRoot.querySelector('button')
      .addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    // Компонент удален из DOM - очищаем ресурсы
    this.shadowRoot.querySelector('button')
      .removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    // Создаем и отправляем кастомное событие
    this.dispatchEvent(new CustomEvent('my-button-click', {
      bubbles: true,        // Всплывает по DOM дереву
      composed: true,       // Пересекает границы Shadow DOM
      detail: {             // Передаваемые данные
        message: 'Hello from MyButton!',
        timestamp: Date.now()
      }
    }));
  }
}

// Регистрируем веб-компонент
customElements.define('my-button', MyButton);

// Использование в HTML: <my-button>Нажми меня</my-button>
`

const eventsExample = `
// =====================================
// CUSTOM EVENTS - КОММУНИКАЦИЯ
// =====================================

class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['user-id', 'user-name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const userName = this.getAttribute('user-name') || 'Unknown';
    const userId = this.getAttribute('user-id') || '0';

    this.shadowRoot.innerHTML = \`
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 8px 0;
          background: white;
        }
        button {
          margin: 4px;
          padding: 8px 16px;
          border: 1px solid #007bff;
          background: white;
          color: #007bff;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background: #007bff;
          color: white;
        }
      </style>
      <div class="card">
        <h3>\${userName}</h3>
        <p>ID: \${userId}</p>
        <button id="edit">Edit</button>
        <button id="delete">Delete</button>
      </div>
    \`;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.shadowRoot.getElementById('edit').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('user-edit', {
        bubbles: true,
        composed: true,
        detail: {
          userId: this.getAttribute('user-id'),
          userName: this.getAttribute('user-name'),
          action: 'edit'
        }
      }));
    });

    this.shadowRoot.getElementById('delete').addEventListener('click', () => {
      const event = new CustomEvent('user-delete', {
        bubbles: true,
        composed: true,
        cancelable: true,  // Можно отменить через preventDefault()
        detail: {
          userId: this.getAttribute('user-id'),
          userName: this.getAttribute('user-name')
        }
      });

      this.dispatchEvent(event);

      if (!event.defaultPrevented) {
        console.log('Deletion confirmed');
        // Логика удаления
      } else {
        console.log('Deletion cancelled');
      }
    });
  }

  // Реакция на изменение атрибутов
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('user-card', UserCard);

// Слушаем события от компонентов
document.addEventListener('user-edit', (event) => {
  console.log('Edit user:', event.detail);
});

document.addEventListener('user-delete', (event) => {
  // Можем отменить удаление
  if (event.detail.userId === 'admin') {
    event.preventDefault();
    alert('Cannot delete admin user!');
  }
});
`

const communicationExample = `
// =====================================
// КОММУНИКАЦИЯ МЕЖДУ КОМПОНЕНТАМИ
// =====================================

// 1. EventBus для глобальной коммуникации
class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }

  emit(eventName, data) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach(callback => callback(data));
    }
  }

  off(eventName, callback) {
    if (this.events.has(eventName)) {
      const callbacks = this.events.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

const eventBus = new EventBus();

// 2. Компонент-издатель
class DataProvider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = { users: [], loading: false };
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        button {
          padding: 10px 20px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <button id="load-data">Load Users</button>
    \`;

    this.shadowRoot.getElementById('load-data')
      .addEventListener('click', this.loadData.bind(this));
  }

  async loadData() {
    this.data.loading = true;
    eventBus.emit('data-loading', { loading: true });

    // Симуляция API запроса
    setTimeout(() => {
      this.data = {
        loading: false,
        users: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Charlie' }
        ]
      };

      // Уведомляем все заинтересованные компоненты
      eventBus.emit('data-loaded', this.data);
    }, 1000);
  }
}

// 3. Компонент-подписчик
class UserList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.users = [];
    this.loading = false;

    // Подписываемся на события
    eventBus.on('data-loading', this.handleLoading.bind(this));
    eventBus.on('data-loaded', this.handleDataLoaded.bind(this));

    this.render();
  }

  handleLoading(data) {
    this.loading = data.loading;
    this.render();
  }

  handleDataLoaded(data) {
    this.users = data.users;
    this.loading = data.loading;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        .loading { color: #666; font-style: italic; }
        .user { padding: 8px; border: 1px solid #ddd; margin: 4px 0; }
      </style>
      <div>
        <h3>Users:</h3>
        \${this.loading
          ? '<div class="loading">Loading...</div>'
          : this.users.map(user =>
              \`<div class="user">\${user.name} (ID: \${user.id})</div>\`
            ).join('')
        }
      </div>
    \`;
  }

  disconnectedCallback() {
    // Отписываемся при удалении компонента
    eventBus.off('data-loading', this.handleLoading);
    eventBus.off('data-loaded', this.handleDataLoaded);
  }
}

customElements.define('data-provider', DataProvider);
customElements.define('user-list', UserList);

/*
HTML для использования:
<data-provider></data-provider>
<user-list></user-list>
*/
`

const highlightedBasic = ref('')
const highlightedEvents = ref('')
const highlightedCommunication = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(basicExample, Prism.languages.javascript, 'javascript')
  highlightedEvents.value = Prism.highlight(eventsExample, Prism.languages.javascript, 'javascript')
  highlightedCommunication.value = Prism.highlight(communicationExample, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Web Components: Custom Elements & Custom Events
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Components</b> — нативная браузерная технология для создания переиспользуемых компонентов.
              <b>Custom Elements</b> позволяют создавать собственные HTML теги,
              <b>Custom Events</b> обеспечивают коммуникацию между ними.
            </p>

            <!-- Ключевые концепции -->
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-cube-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Custom Elements</h3>
                  <p class="text-body-2">Собственные HTML теги с инкапсулированной логикой</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-eye-off</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Shadow DOM</h3>
                  <p class="text-body-2">Изоляция стилей и разметки</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-message-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Custom Events</h3>
                  <p class="text-body-2">Коммуникация между компонентами</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Базовый пример -->
            <h2 class="text-h5 font-weight-bold mb-3">1. Основы Custom Elements</h2>
            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <!-- Custom Events -->
            <h2 class="text-h5 font-weight-bold mb-3">2. Custom Events для коммуникации</h2>
            <v-alert color="info" class="mb-4">
              <strong>Ключевые свойства:</strong><br>
              • <code>bubbles: true</code> — событие всплывает по DOM дереву<br>
              • <code>composed: true</code> — пересекает границы Shadow DOM<br>
              • <code>cancelable: true</code> — можно отменить через preventDefault()<br>
              • <code>detail</code> — данные для передачи
            </v-alert>
            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedEvents"></code></pre>

            <!-- Коммуникация -->
            <h2 class="text-h5 font-weight-bold mb-3">3. Коммуникация через EventBus</h2>
            <pre class="mb-6 pa-4 rounded-lg custom-code"><code v-html="highlightedCommunication"></code></pre>

            <!-- Жизненный цикл -->
            <h2 class="text-h5 font-weight-bold mb-3">4. Жизненный цикл</h2>
            <v-table density="compact" class="mb-6">
              <thead>
              <tr>
                <th class="font-weight-bold">Метод</th>
                <th class="font-weight-bold">Когда вызывается</th>
                <th class="font-weight-bold">Назначение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>constructor()</code></td>
                <td>При создании элемента</td>
                <td>Инициализация Shadow DOM</td>
              </tr>
              <tr>
                <td><code>connectedCallback()</code></td>
                <td>Добавление в DOM</td>
                <td>Подписка на события</td>
              </tr>
              <tr>
                <td><code>disconnectedCallback()</code></td>
                <td>Удаление из DOM</td>
                <td>Очистка ресурсов</td>
              </tr>
              <tr>
                <td><code>attributeChangedCallback()</code></td>
                <td>Изменение атрибута</td>
                <td>Реакция на изменения</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы собеседования -->
            <h2 class="text-h5 font-weight-bold mb-3">5. Частые вопросы на собеседовании</h2>

            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title class="font-weight-bold">
                  Отличия от React/Vue компонентов?
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  • <strong>Нативность:</strong> работают без фреймворков<br>
                  • <strong>Универсальность:</strong> можно использовать в любых проектах<br>
                  • <strong>Изоляция:</strong> истинная инкапсуляция через Shadow DOM<br>
                  • <strong>Стандарты:</strong> часть веб-платформы
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="font-weight-bold">
                  Что такое Shadow DOM?
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Изолированное DOM поддерево, где:<br>
                  • Стили не влияют на внешнюю страницу<br>
                  • Внешние стили не влияют на компонент<br>
                  • JavaScript селекторы не пересекают границы<br>
                  • Обеспечивает истинную инкапсуляцию
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="font-weight-bold">
                  Как работает коммуникация компонентов?
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <strong>1. Custom Events:</strong> dispatchEvent() + addEventListener()<br>
                  <strong>2. Атрибуты:</strong> для передачи данных в компонент<br>
                  <strong>3. Slots:</strong> для передачи содержимого<br>
                  <strong>4. EventBus:</strong> для глобальной коммуникации<br>
                  <strong>5. Прямые вызовы:</strong> публичные методы компонентов
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title class="font-weight-bold">
                  Поддержка браузерами?
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  • <strong>Современные браузеры:</strong> полная поддержка<br>
                  • <strong>IE:</strong> требуются полифиллы<br>
                  • <strong>Can I Use:</strong> ~95% поддержка globally<br>
                  • <strong>Полифиллы:</strong> @webcomponents/webcomponentsjs
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Плюсы и минусы -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-success">✅ Преимущества</h3>
                  <ul class="pl-4">
                    <li>Нативность и универсальность</li>
                    <li>Истинная инкапсуляция</li>
                    <li>Долговечность (стандарты)</li>
                    <li>Производительность</li>
                    <li>Интероперабельность</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-error">❌ Недостатки</h3>
                  <ul class="pl-4">
                    <li>Менее развитая экосистема</li>
                    <li>Нужны полифиллы для IE</li>
                    <li>Низкоуровневый API</li>
                    <li>Нет встроенного state management</li>
                    <li>Ограниченный тулинг</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Когда использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">6. Когда использовать?</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="green-lighten-5">
                  <h4 class="font-weight-bold mb-2 text-green-darken-2">👍 Подходят для:</h4>
                  <ul class="pl-4">
                    <li>Библиотек компонентов</li>
                    <li>Виджетов для встраивания</li>
                    <li>Legacy проектов</li>
                    <li>Микрофронтендов</li>
                    <li>Дизайн-систем</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="red-lighten-5">
                  <h4 class="font-weight-bold mb-2 text-red-darken-2">👎 Не подходят для:</h4>
                  <ul class="pl-4">
                    <li>Крупных SPA приложений</li>
                    <li>Проектов с активной разработкой</li>
                    <li>Когда нужен богатый ecosystem</li>
                    <li>Команд без опыта</li>
                    <li>Tight deadlines</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Практические советы -->
            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Практические советы:</strong><br>
              • Всегда очищайте ресурсы в <code>disconnectedCallback()</code><br>
              • Используйте <code>composed: true</code> для событий между компонентами<br>
              • Валидируйте атрибуты в <code>attributeChangedCallback()</code><br>
              • Рассмотрите библиотеки типа LitElement для упрощения разработки
            </v-alert>

            <div class="d-flex justify-end gap-2">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                target="_blank"
              >
                MDN Web Components
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
