<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'

const basicCustomElementSnippet = `
// =====================================
// ОСНОВЫ CUSTOM ELEMENTS
// =====================================

// 1. Создание простого веб-компонента
class MyButton extends HTMLElement {
  constructor() {
    super();

    // Создаем Shadow DOM для инкапсуляции
    this.attachShadow({ mode: 'open' });

    // Создаем разметку
    this.shadowRoot.innerHTML = \`
      <style>
        button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: transform 0.2s;
        }

        button:hover {
          transform: scale(1.05);
        }

        button:active {
          transform: scale(0.95);
        }
      </style>
      <button>
        <slot>Кнопка</slot>
      </button>
    \`;

    // Получаем ссылку на кнопку
    this.button = this.shadowRoot.querySelector('button');
  }

  // Жизненный цикл: компонент добавлен в DOM
  connectedCallback() {
    console.log('MyButton подключен к DOM');
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  // Жизненный цикл: компонент удален из DOM
  disconnectedCallback() {
    console.log('MyButton отключен от DOM');
    this.button.removeEventListener('click', this.handleClick);
  }

  // Обработчик клика
  handleClick(event) {
    console.log('Кнопка нажата!');

    // Создаем и отправляем кастомное событие
    this.dispatchEvent(new CustomEvent('my-button-click', {
      bubbles: true,
      composed: true, // Событие пересекает границы Shadow DOM
      detail: {
        message: 'Привет из MyButton!',
        timestamp: Date.now(),
        originalEvent: event
      }
    }));
  }
}

// Регистрируем веб-компонент
customElements.define('my-button', MyButton);

// Использование в HTML:
// <my-button>Нажми меня</my-button>
`

const customEventsSnippet = `
// =====================================
// CUSTOM EVENTS - ДЕТАЛЬНО
// =====================================

// 1. Создание и отправка кастомных событий
class EventEmitter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      <style>
        .controls {
          display: flex;
          gap: 10px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        button {
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

      <div class="controls">
        <button id="simple">Простое событие</button>
        <button id="complex">Сложное событие</button>
        <button id="cancelable">Отменяемое событие</button>
      </div>
    \`;
  }

  connectedCallback() {
    // Простое событие
    this.shadowRoot.getElementById('simple').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('simple-event'));
    });

    // Сложное событие с данными
    this.shadowRoot.getElementById('complex').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('complex-event', {
        bubbles: true,          // Всплывает по DOM дереву
        composed: true,         // Пересекает Shadow DOM
        cancelable: false,      // Нельзя отменить
        detail: {
          userId: 123,
          action: 'button-click',
          metadata: {
            source: 'EventEmitter component',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          },
          customData: new Map([
            ['key1', 'value1'],
            ['key2', 'value2']
          ])
        }
      }));
    });

    // Отменяемое событие
    this.shadowRoot.getElementById('cancelable').addEventListener('click', () => {
      const event = new CustomEvent('cancelable-event', {
        bubbles: true,
        composed: true,
        cancelable: true,       // Можно отменить через preventDefault()
        detail: {
          action: 'delete-user',
          userId: 456
        }
      });

      this.dispatchEvent(event);

      // Проверяем, было ли событие отменено
      if (event.defaultPrevented) {
        console.log('Действие было отменено!');
      } else {
        console.log('Действие выполнено');
        // Здесь была бы логика удаления
      }
    });
  }
}

customElements.define('event-emitter', EventEmitter);

// 2. Слушатель событий в родительском компоненте
document.addEventListener('simple-event', (event) => {
  console.log('Получено простое событие:', event);
});

document.addEventListener('complex-event', (event) => {
  console.log('Получено сложное событие:', event.detail);

  // Обработка данных
  const { userId, action, metadata, customData } = event.detail;
  console.log(\`Пользователь \${userId} выполнил действие: \${action}\`);
  console.log('Метаданные:', metadata);
  console.log('Кастомные данные:', customData);
});

document.addEventListener('cancelable-event', (event) => {
  console.log('Получено отменяемое событие:', event.detail);

  // Условие для отмены
  if (event.detail.userId === 456) {
    event.preventDefault(); // Отменяем событие
    console.log('Событие отменено - пользователь защищен от удаления');
  }
});

// 3. Цепочка событий и их обработка
class EventChain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      <div>
        <button id="trigger">Запустить цепочку событий</button>
      </div>
    \`;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('trigger').addEventListener('click', () => {
      // Первое событие
      this.dispatchEvent(new CustomEvent('chain-start', {
        bubbles: true,
        composed: true,
        detail: { step: 1, data: 'initial data' }
      }));
    });

    // Слушаем собственное событие для продолжения цепочки
    this.addEventListener('chain-continue', (event) => {
      const { step, data } = event.detail;

      if (step < 3) {
        setTimeout(() => {
          this.dispatchEvent(new CustomEvent('chain-continue', {
            bubbles: true,
            composed: true,
            detail: {
              step: step + 1,
              data: data + \` -> step \${step + 1}\`
            }
          }));
        }, 500);
      } else {
        // Завершение цепочки
        this.dispatchEvent(new CustomEvent('chain-end', {
          bubbles: true,
          composed: true,
          detail: { finalData: data + ' -> completed' }
        }));
      }
    });
  }
}

customElements.define('event-chain', EventChain);

// Обработчики цепочки событий
document.addEventListener('chain-start', (event) => {
  console.log('🚀 Цепочка началась:', event.detail);

  // Запускаем продолжение
  event.target.dispatchEvent(new CustomEvent('chain-continue', {
    bubbles: true,
    composed: true,
    detail: event.detail
  }));
});

document.addEventListener('chain-continue', (event) => {
  console.log(\`⛓️ Шаг \${event.detail.step}:\`, event.detail.data);
});

document.addEventListener('chain-end', (event) => {
  console.log('🏁 Цепочка завершена:', event.detail.finalData);
});
`

const advancedComponentSnippet = `
// =====================================
// ПРОДВИНУТЫЙ ВЕББКОМПОНЕНТ
// =====================================

class UserCard extends HTMLElement {
  // Наблюдаемые атрибуты
  static get observedAttributes() {
    return ['user-id', 'user-name', 'user-avatar', 'theme'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Внутреннее состояние
    this.state = {
      loading: false,
      user: null,
      error: null
    };

    this.render();
  }

  // Геттеры и сеттеры для атрибутов
  get userId() {
    return this.getAttribute('user-id');
  }

  set userId(value) {
    this.setAttribute('user-id', value);
  }

  get userName() {
    return this.getAttribute('user-name');
  }

  set userName(value) {
    this.setAttribute('user-name', value);
  }

  get theme() {
    return this.getAttribute('theme') || 'light';
  }

  set theme(value) {
    this.setAttribute('theme', value);
  }

  // Рендеринг компонента
  render() {
    const theme = this.theme;
    const isDark = theme === 'dark';

    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .card {
          border: 1px solid \${isDark ? '#444' : '#ddd'};
          border-radius: 12px;
          padding: 20px;
          background: \${isDark ? '#1a1a1a' : 'white'};
          color: \${isDark ? 'white' : '#333'};
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          max-width: 300px;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 15px;
        }

        .name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .loading {
          text-align: center;
          color: \${isDark ? '#888' : '#666'};
        }

        .error {
          color: #ff6b6b;
          text-align: center;
        }

        .actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }

        button {
          flex: 1;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .primary {
          background: #007bff;
          color: white;
        }

        .primary:hover {
          background: #0056b3;
        }

        .secondary {
          background: \${isDark ? '#444' : '#f8f9fa'};
          color: \${isDark ? 'white' : '#333'};
          border: 1px solid \${isDark ? '#666' : '#ddd'};
        }

        .secondary:hover {
          background: \${isDark ? '#555' : '#e2e6ea'};
        }

        @media (max-width: 480px) {
          .card {
            padding: 15px;
          }

          .actions {
            flex-direction: column;
          }
        }
      </style>

      <div class="card">
        \${this.renderContent()}
      </div>
    \`;

    this.attachEventListeners();
  }

  renderContent() {
    if (this.state.loading) {
      return '<div class="loading">Загрузка...</div>';
    }

    if (this.state.error) {
      return \`<div class="error">Ошибка: \${this.state.error}</div>\`;
    }

    if (this.state.user) {
      return \`
        <img class="avatar" src="\${this.state.user.avatar}" alt="Аватар" />
        <div class="name">\${this.state.user.name}</div>
        <div>Email: \${this.state.user.email}</div>
        <div>ID: \${this.state.user.id}</div>

        <div class="actions">
          <button class="primary" id="view-profile">Профиль</button>
          <button class="secondary" id="send-message">Сообщение</button>
        </div>
      \`;
    }

    return '<div>Пользователь не найден</div>';
  }

  attachEventListeners() {
    const profileBtn = this.shadowRoot.getElementById('view-profile');
    const messageBtn = this.shadowRoot.getElementById('send-message');

    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('profile-view', {
          bubbles: true,
          composed: true,
          detail: {
            userId: this.state.user.id,
            userName: this.state.user.name,
            action: 'view-profile'
          }
        }));
      });
    }

    if (messageBtn) {
      messageBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('message-send', {
          bubbles: true,
          composed: true,
          detail: {
            userId: this.state.user.id,
            userName: this.state.user.name,
            action: 'send-message'
          }
        }));
      });
    }
  }

  // Жизненный цикл: компонент подключен
  connectedCallback() {
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  // Жизненный цикл: атрибуты изменились
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'user-id':
        if (newValue) {
          this.loadUser(newValue);
        }
        break;

      case 'theme':
        this.render();
        break;

      case 'user-name':
      case 'user-avatar':
        if (this.state.user) {
          this.render();
        }
        break;
    }
  }

  // Загрузка данных пользователя
  async loadUser(userId) {
    this.setState({ loading: true, error: null });

    try {
      // Отправляем событие о начале загрузки
      this.dispatchEvent(new CustomEvent('user-load-start', {
        bubbles: true,
        composed: true,
        detail: { userId }
      }));

      // Симуляция API запроса
      const user = await this.fetchUser(userId);

      this.setState({
        user,
        loading: false,
        error: null
      });

      // Отправляем событие об успешной загрузке
      this.dispatchEvent(new CustomEvent('user-load-success', {
        bubbles: true,
        composed: true,
        detail: { user }
      }));

    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
        user: null
      });

      // Отправляем событие об ошибке
      this.dispatchEvent(new CustomEvent('user-load-error', {
        bubbles: true,
        composed: true,
        detail: {
          error: error.message,
          userId
        }
      }));
    }
  }

  // Симуляция API
  async fetchUser(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId === '404') {
          reject(new Error('Пользователь не найден'));
          return;
        }

        resolve({
          id: userId,
          name: this.userName || \`Пользователь \${userId}\`,
          email: \`user\${userId}@example.com\`,
          avatar: this.getAttribute('user-avatar') ||
                  \`https://ui-avatars.com/api/?name=User+\${userId}&size=60\`
        });
      }, 1000);
    });
  }

  // Обновление состояния
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  // Публичные методы
  refresh() {
    if (this.userId) {
      this.loadUser(this.userId);
    }
  }

  setTheme(theme) {
    this.theme = theme;
  }
}

customElements.define('user-card', UserCard);

// Использование компонента
document.addEventListener('DOMContentLoaded', () => {
  // Обработчики событий компонента
  document.addEventListener('profile-view', (event) => {
    console.log('👤 Просмотр профиля:', event.detail);
    // Здесь можно открыть модальное окно или перейти на страницу профиля
  });

  document.addEventListener('message-send', (event) => {
    console.log('💬 Отправка сообщения:', event.detail);
    // Здесь можно открыть чат или форму сообщения
  });

  document.addEventListener('user-load-start', (event) => {
    console.log('🔄 Начало загрузки пользователя:', event.detail.userId);
  });

  document.addEventListener('user-load-success', (event) => {
    console.log('✅ Пользователь загружен:', event.detail.user);
  });

  document.addEventListener('user-load-error', (event) => {
    console.log('❌ Ошибка загрузки:', event.detail.error);
  });
});

/*
HTML для использования:
<user-card user-id="123" user-name="Анна Иванова" theme="light"></user-card>
<user-card user-id="456" theme="dark"></user-card>
<user-card user-id="404"></user-card> <!-- Для демонстрации ошибки -->
*/
`

const communicationSnippet = `
// =====================================
// КОММУНИКАЦИЯ МЕЖДУ КОМПОНЕНТАМИ
// =====================================

// 1. Родительский компонент-контейнер
class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.state = {
      selectedUser: null,
      users: [
        { id: '1', name: 'Анна Иванова' },
        { id: '2', name: 'Петр Петров' },
        { id: '3', name: 'Мария Сидорова' }
      ]
    };

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          padding: 20px;
        }

        .dashboard {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
          max-width: 1200px;
        }

        .user-list {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
        }

        .user-detail {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        h2 {
          margin-top: 0;
          color: #333;
        }

        @media (max-width: 768px) {
          .dashboard {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="dashboard">
        <div class="user-list">
          <h2>Пользователи</h2>
          <user-list></user-list>
        </div>

        <div class="user-detail">
          <h2>Детали пользователя</h2>
          \${this.state.selectedUser
            ? \`<user-card user-id="\${this.state.selectedUser.id}"
                          user-name="\${this.state.selectedUser.name}"></user-card>\`
            : '<p>Выберите пользователя из списка</p>'
          }
        </div>
      </div>
    \`;

    this.setupCommunication();
  }

  connectedCallback() {
    this.updateUserList();
  }

  setupCommunication() {
    // Слушаем события от дочерних компонентов
    this.addEventListener('user-selected', (event) => {
      console.log('👆 Пользователь выбран:', event.detail);
      this.selectUser(event.detail.user);
    });

    this.addEventListener('user-action', (event) => {
      console.log('🎬 Действие пользователя:', event.detail);
      this.handleUserAction(event.detail);
    });
  }

  selectUser(user) {
    this.state.selectedUser = user;
    this.render();

    // Уведомляем другие компоненты об изменении
    this.dispatchEvent(new CustomEvent('dashboard-state-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selectedUser: user,
        action: 'user-selected'
      }
    }));
  }

  handleUserAction(actionDetail) {
    // Обработка различных действий пользователя
    switch (actionDetail.action) {
      case 'edit':
        this.editUser(actionDetail.user);
        break;
      case 'delete':
        this.deleteUser(actionDetail.user);
        break;
      case 'refresh':
        this.refreshUser(actionDetail.user);
        break;
    }
  }

  updateUserList() {
    const userListElement = this.shadowRoot.querySelector('user-list');
    if (userListElement) {
      // Передаем данные дочернему компоненту
      userListElement.setUsers(this.state.users);
    }
  }

  editUser(user) {
    console.log('✏️ Редактирование пользователя:', user);
    // Логика редактирования
  }

  deleteUser(user) {
    console.log('🗑️ Удаление пользователя:', user);
    // Логика удаления
  }

  refreshUser(user) {
    console.log('🔄 Обновление пользователя:', user);
    // Логика обновления
  }
}

// 2. Компонент списка пользователей
class UserList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.users = [];
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        .user-item {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s;
          background: white;
        }

        .user-item:hover {
          background: #e3f2fd;
          border-color: #2196f3;
          transform: translateX(4px);
        }

        .user-item.active {
          background: #2196f3;
          color: white;
          border-color: #1976d2;
        }

        .empty {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 20px;
        }
      </style>

      <div class="user-list-container">
        \${this.users.length > 0
          ? this.users.map(user => \`
              <div class="user-item" data-user-id="\${user.id}">
                \${user.name}
              </div>
            \`).join('')
          : '<div class="empty">Нет пользователей</div>'
        }
      </div>
    \`;

    this.attachItemListeners();
  }

  attachItemListeners() {
    const items = this.shadowRoot.querySelectorAll('.user-item');
    items.forEach(item => {
      item.addEventListener('click', (event) => {
        const userId = event.target.dataset.userId;
        const user = this.users.find(u => u.id === userId);

        if (user) {
          // Удаляем активный класс у всех элементов
          items.forEach(i => i.classList.remove('active'));
          // Добавляем активный класс к выбранному
          event.target.classList.add('active');

          // Отправляем событие выбора пользователя
          this.dispatchEvent(new CustomEvent('user-selected', {
            bubbles: true,
            composed: true,
            detail: {
              user,
              source: 'user-list',
              timestamp: Date.now()
            }
          }));
        }
      });
    });
  }

  // Публичный метод для установки пользователей
  setUsers(users) {
    this.users = users;
    this.render();

    // Отправляем событие об обновлении списка
    this.dispatchEvent(new CustomEvent('users-updated', {
      bubbles: true,
      composed: true,
      detail: {
        count: users.length,
        users: users
      }
    }));
  }

  // Публичный метод для добавления пользователя
  addUser(user) {
    this.users.push(user);
    this.render();

    this.dispatchEvent(new CustomEvent('user-added', {
      bubbles: true,
      composed: true,
      detail: { user }
    }));
  }

  // Публичный метод для удаления пользователя
  removeUser(userId) {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const removedUser = this.users.splice(userIndex, 1)[0];
      this.render();

      this.dispatchEvent(new CustomEvent('user-removed', {
        bubbles: true,
        composed: true,
        detail: { user: removedUser }
      }));
    }
  }
}

// 3. Глобальный менеджер событий для коммуникации
class EventBus {
  constructor() {
    this.events = new Map();
  }

  // Подписка на событие
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);

    return () => this.off(eventName, callback); // Возвращаем функцию отписки
  }

  // Отписка от события
  off(eventName, callback) {
    if (this.events.has(eventName)) {
      const callbacks = this.events.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Отправка события
  emit(eventName, data) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(\`Error in event handler for \${eventName}:\`, error);
        }
      });
    }
  }

  // Однократная подписка
  once(eventName, callback) {
    const unsubscribe = this.on(eventName, (data) => {
