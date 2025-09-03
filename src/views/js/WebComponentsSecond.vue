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
// <my-button>Нажми меня<\/my-button>
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
         callback(data);
         unsubscribe(); // Автоматически отписываемся после первого срабатывания
       });
       return unsubscribe;
     }

     // Очистка всех подписчиков
     clear() {
       this.events.clear();
     }

     // Получение списка активных событий
     getEventNames() {
       return Array.from(this.events.keys());
     }

     // Количество подписчиков на событие
     getListenerCount(eventName) {
       return this.events.has(eventName) ? this.events.get(eventName).length : 0;
     }
   }

   // Создаем глобальный экземпляр шины событий
   const globalEventBus = new EventBus();

   // 4. Компонент с использованием EventBus
   class NotificationCenter extends HTMLElement {
     constructor() {
       super();
       this.attachShadow({ mode: 'open' });
       this.notifications = [];
       this.render();
       this.setupEventBus();
     }

     render() {
       this.shadowRoot.innerHTML = \\\`
  <style>
:host {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  width: 300px;
}

.notification {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
  position: relative;
}

.notification.success {
  border-left: 4px solid #4caf50;
}

.notification.error {
  border-left: 4px solid #f44336;
}

.notification.info {
  border-left: 4px solid #2196f3;
}

.notification.warning {
  border-left: 4px solid #ff9800;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #333;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>

<div class="notifications">
           \\\${this.notifications.map(notification => \`
             <div class="notification \${notification.type}" data-id="\${notification.id}">
               <button class="close-btn" onclick="this.parentElement.style.animation='slideOut 0.3s ease'; setTimeout(() => this.parentElement.remove(), 300);">&times;</button>
               <div><strong>\${notification.title}</strong></div>
               <div>\${notification.message}</div>
             </div>
           \`).join('')}
         </div>
       \`;
     }

     setupEventBus() {
       // Подписываемся на различные события через EventBus
       globalEventBus.on('user-selected', (data) => {
         this.showNotification({
           type: 'info',
           title: 'Пользователь выбран',
           message: \`Выбран пользователь: \${data.user.name}\`
         });
       });

       globalEventBus.on('user-action', (data) => {
         this.showNotification({
           type: 'success',
           title: 'Действие выполнено',
           message: \`Действие "\${data.action}" для пользователя \${data.user.name}\`
         });
       });

       globalEventBus.on('error', (data) => {
         this.showNotification({
           type: 'error',
           title: 'Ошибка',
           message: data.message || 'Произошла неизвестная ошибка'
         });
       });
     }

     showNotification({ type = 'info', title, message, duration = 5000 }) {
       const notification = {
         id: Date.now() + Math.random(),
         type,
         title,
         message
       };

       this.notifications.unshift(notification);
       this.render();

       // Автоматическое удаление через specified время
       setTimeout(() => {
         this.removeNotification(notification.id);
       }, duration);
     }

     removeNotification(id) {
       const index = this.notifications.findIndex(n => n.id === id);
       if (index !== -1) {
         this.notifications.splice(index, 1);
         this.render();
       }
     }
   }

   // Регистрируем компоненты
   customElements.define('user-dashboard', UserDashboard);
   customElements.define('user-list', UserList);
   customElements.define('notification-center', NotificationCenter);

   // 5. Интеграция с глобальной шиной событий
   document.addEventListener('DOMContentLoaded', () => {
     // Мост между DOM событиями и EventBus
     document.addEventListener('user-selected', (event) => {
       globalEventBus.emit('user-selected', event.detail);
     });

     document.addEventListener('user-action', (event) => {
       globalEventBus.emit('user-action', event.detail);
     });

     document.addEventListener('user-load-error', (event) => {
       globalEventBus.emit('error', {
         message: \`Не удалось загрузить пользователя: \${event.detail.error}\`
       });
     });
   });

   /*
   HTML для использования:
   <user-dashboard></user-dashboard>
   <notification-center></notification-center>
   */
   `

  const highlightedBasic = ref('')
  const highlightedEvents = ref('')
  const highlightedAdvanced = ref('')
  const highlightedCommunication = ref('')

  onMounted(() => {
    highlightedBasic.value = Prism.highlight(basicCustomElementSnippet, Prism.languages.javascript, 'javascript')
    highlightedEvents.value = Prism.highlight(customEventsSnippet, Prism.languages.javascript, 'javascript')
    highlightedAdvanced.value = Prism.highlight(advancedComponentSnippet, Prism.languages.javascript, 'javascript')
    highlightedCommunication.value = Prism.highlight(communicationSnippet, Prism.languages.javascript, 'javascript')
  })
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              WebComponents: Custom Elements + Custom Events
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Web Components</b> — это набор веб-технологий, позволяющих создавать
              переиспользуемые пользовательские элементы. <b>Custom Elements</b> позволяют
              определить новые HTML теги, а <b>Custom Events</b> обеспечивают коммуникацию между
              компонентами. Это нативная браузерная технология без зависимости от фреймворков.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы Custom Elements</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-cube-outline</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Custom Elements</h3>
                  <p class="text-body-2">
                    Создание собственных HTML тегов с инкапсулированной логикой
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-eye-off</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Shadow DOM</h3>
                  <p class="text-body-2">Изоляция стилей и разметки от остальной части страницы</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-message-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Custom Events</h3>
                  <p class="text-body-2">
                    Создание и отправка собственных событий для коммуникации
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Custom Events — детальная коммуникация</h2>

            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Custom Events — это мощный механизм для коммуникации между
              компонентами. Свойство <code>composed: true</code> позволяет событиям пересекать
              границы Shadow DOM.
            </v-alert>

            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedEvents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутый веб-компонент</h2>

            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedAdvanced"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Коммуникация между компонентами</h2>

            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedCommunication"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Жизненный цикл Custom Elements</h2>

            <v-table density="comfortable" class="mb-8">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Метод</th>
                  <th class="text-left font-weight-bold">Когда вызывается</th>
                  <th class="text-left font-weight-bold">Использование</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pt-3 pb-3"><code>constructor()</code></td>
                  <td class="pt-3 pb-3">При создании элемента</td>
                  <td class="pt-3 pb-3">Инициализация Shadow DOM, состояния</td>
                </tr>
                <tr>
                  <td class="pt-3 pb-3"><code>connectedCallback()</code></td>
                  <td class="pt-3 pb-3">Добавление в DOM</td>
                  <td class="pt-3 pb-3">Подписка на события, запуск таймеров</td>
                </tr>
                <tr>
                  <td class="pt-3 pb-3"><code>disconnectedCallback()</code></td>
                  <td class="pt-3 pb-3">Удаление из DOM</td>
                  <td class="pt-3 pb-3">Очистка ресурсов, отписка от событий</td>
                </tr>
                <tr>
                  <td class="pt-3 pb-3"><code>attributeChangedCallback()</code></td>
                  <td class="pt-3 pb-3">Изменение атрибута</td>
                  <td class="pt-3 pb-3">Реакция на изменения атрибутов</td>
                </tr>
                <tr>
                  <td class="pt-3 pb-3"><code>adoptedCallback()</code></td>
                  <td class="pt-3 pb-3">Перемещение в другой документ</td>
                  <td class="pt-3 pb-3">Редко используется</td>
                </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Чем Web Components отличаются от React/Vue компонентов?
                </p>
                <p class="font-weight-regular ma-0">
                  Web Components — это нативная браузерная технология, не требующая фреймворков. Они
                  работают везде, где есть поддержка браузера, обеспечивают истинную инкапсуляцию
                  через Shadow DOM и могут использоваться в любых фреймворках или без них.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Shadow DOM и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Shadow DOM создает изолированное DOM поддерево, где стили и разметка не влияют на
                  внешнюю страницу и наоборот. Это обеспечивает истинную инкапсуляцию компонента,
                  предотвращая конфликты стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Как работают Custom Events и почему нужен composed: true?
                </p>
                <p class="font-weight-regular ma-0">
                  Custom Events позволяют компонентам отправлять собственные события. Флаг
                  <code>composed: true</code>
                  разрешает событию пересекать границы Shadow DOM, что необходимо для коммуникации
                  между компонентами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Как обеспечить коммуникацию между несвязанными компонентами?
                </p>
                <p class="font-weight-regular ma-0">
                  Можно использовать: 1) CustomEvents с bubbling через document, 2) глобальную шину
                  событий (EventBus), 3) глобальное состояние, 4) паттерн pub/sub. EventBus —
                  наиболее гибкое решение.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Когда использовать Web Components вместо фреймворков?
                </p>
                <p class="font-weight-regular ma-0">
                  Web Components идеальны для: библиотек компонентов, виджетов для встраивания в
                  разные сайты, legacy приложений, микрофронтендов. Для больших SPA фреймворки могут
                  быть удобнее.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать Web Components?</p>
                <p class="font-weight-regular ma-0">
                  Можно использовать любые testing фреймворки (Jest, Mocha). Важно тестировать
                  Shadow DOM через
                  <code>element.shadowRoot.querySelector()</code> и проверять отправку Custom
                  Events.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества и недостатки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">✅ Преимущества</h3>
                  <ul class="pl-4">
                    <li><strong>Нативность:</strong> Работают без фреймворков</li>
                    <li><strong>Переносимость:</strong> Можно использовать везде</li>
                    <li><strong>Инкапсуляция:</strong> Истинная изоляция через Shadow DOM</li>
                    <li><strong>Стандарты:</strong> Часть веб-стандартов</li>
                    <li><strong>Производительность:</strong> Нет виртуального DOM</li>
                    <li><strong>Долговечность:</strong> Не зависят от версий фреймворков</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-error">❌ Недостатки</h3>
                  <ul class="pl-4">
                    <li><strong>Поддержка браузеров:</strong> Требуют полифиллы для IE</li>
                    <li><strong>Экосистема:</strong> Меньше готовых решений</li>
                    <li><strong>Инструменты:</strong> Менее развитый тулинг</li>
                    <li><strong>Состояние:</strong> Нет встроенного state management</li>
                    <li><strong>Роутинг:</strong> Нет встроенной маршрутизации</li>
                    <li><strong>Кривая обучения:</strong> Низкоуровневый API</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать Shadow DOM для изоляции</li>
                    <li>Определять observedAttributes</li>
                    <li>Правильно очищать ресурсы</li>
                    <li>Использовать composed: true для событий</li>
                    <li>Валидировать входные данные</li>
                    <li>Следовать семантике HTML</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Утечек памяти при отписке</li>
                    <li>Мутации внешнего DOM</li>
                    <li>Глобальных стилей в Shadow DOM</li>
                    <li>Тяжелых операций в constructor</li>
                    <li>Прямого доступа к Shadow DOM извне</li>
                    <li>Игнорирования accessibility</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте TypeScript для больших проектов</li>
                    <li>Создайте базовый класс для общей логики</li>
                    <li>Документируйте API компонентов</li>
                    <li>Тестируйте в разных браузерах</li>
                    <li>Используйте lit-element для упрощения</li>
                    <li>Оптимизируйте Bundle Size</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Web Components</b> с <b>Custom Elements</b> и <b>Custom Events</b> предоставляют
              мощные нативные возможности для создания переиспользуемых компонентов. Они
              обеспечивают истинную инкапсуляцию через Shadow DOM и гибкую коммуникацию через
              события. Хотя экосистема менее развита чем у React/Vue, Web Components идеальны для
              библиотек компонентов, виджетов и микрофронтендов.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
                target="_blank"
                class="mr-2"
              >
                MDN Web Components
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/custom-elements-v1/"
                target="_blank"
              >
                Custom Elements v1
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
