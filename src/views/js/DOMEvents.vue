<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const eventPhasesSnippet = `
// Фазы жизненного цикла события DOM

// HTML структура:
// <div id="outer">
//   <div id="middle">
//     <button id="inner">Кнопка</button>
//   </div>
// </div>

const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

// 1. Фаза погружения (Capturing Phase)
outer.addEventListener('click', function(e) {
  console.log('Outer - Capturing', e.eventPhase); // 1 (CAPTURING_PHASE)
  console.log('Target:', e.target.id);          // "inner"
  console.log('CurrentTarget:', e.currentTarget.id); // "outer"
}, true); // true = слушать на фазе погружения

middle.addEventListener('click', function(e) {
  console.log('Middle - Capturing', e.eventPhase); // 1
}, true);

// 2. Фаза цели (Target Phase)
inner.addEventListener('click', function(e) {
  console.log('Inner - Target', e.eventPhase); // 2 (AT_TARGET)
  console.log('Target === CurrentTarget:', e.target === e.currentTarget); // true
});

// 3. Фаза всплытия (Bubbling Phase) - по умолчанию
middle.addEventListener('click', function(e) {
  console.log('Middle - Bubbling', e.eventPhase); // 3 (BUBBLING_PHASE)
});

outer.addEventListener('click', function(e) {
  console.log('Outer - Bubbling', e.eventPhase); // 3
});

// При клике на кнопку порядок выполнения:
// 1. Outer - Capturing
// 2. Middle - Capturing
// 3. Inner - Target
// 4. Middle - Bubbling
// 5. Outer - Bubbling
`

const targetVsCurrentTargetSnippet = `
// Разница между target и currentTarget

// HTML:
// <ul id="menu">
//   <li data-action="save">
//     <span>💾</span> Сохранить
//   </li>
//   <li data-action="delete">
//     <span>🗑️</span> Удалить
//   </li>
// </ul>

const menu = document.getElementById('menu');

menu.addEventListener('click', function(event) {
  // event.target - элемент, на котором ПРОИЗОШЛО событие
  console.log('Target:', event.target); // может быть <span>, <li> или текстовый узел

  // event.currentTarget - элемент, на котором ОБРАБАТЫВАЕТСЯ событие
  console.log('CurrentTarget:', event.currentTarget); // всегда <ul id="menu">

  // Поиск нужного элемента
  let clickedItem = event.target;

  // Поднимаемся вверх до нужного элемента
  while (clickedItem && !clickedItem.dataset.action) {
    clickedItem = clickedItem.parentElement;
  }

  if (clickedItem && clickedItem.dataset.action) {
    console.log('Действие:', clickedItem.dataset.action);
  }
});

// Более элегантное решение с closest()
menu.addEventListener('click', function(event) {
  const actionItem = event.target.closest('[data-action]');

  if (actionItem) {
    const action = actionItem.dataset.action;
    console.log('Выбрано действие:', action);

    switch(action) {
      case 'save':
        handleSave();
        break;
      case 'delete':
        handleDelete();
        break;
    }
  }
});
`

const capturingExampleSnippet = `
// Практические примеры отлова событий на погружении

// 1. Перехват всех кликов для аналитики
document.addEventListener('click', function(event) {
  // Срабатывает ДО всех других обработчиков
  console.log('Analytics: клик по', event.target.tagName);

  // Отправка данных в аналитику
  if (event.target.dataset.track) {
    sendAnalytics({
      action: 'click',
      element: event.target.dataset.track,
      timestamp: Date.now()
    });
  }
}, true); // true = фаза погружения

// 2. Глобальная обработка ошибок форм
document.addEventListener('invalid', function(event) {
  // Срабатывает на погружении до стандартного поведения
  console.log('Validation error:', event.target.name);

  // Кастомная обработка ошибок валидации
  showCustomErrorMessage(event.target);

  // Предотвращаем стандартное сообщение браузера
  event.preventDefault();
}, true);

// 3. Перехват отправки форм для предобработки
document.addEventListener('submit', function(event) {
  const form = event.target;

  // Добавляем CSRF токен ко всем формам
  if (!form.querySelector('[name="csrf_token"]')) {
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrf_token';
    csrfInput.value = getCSRFToken();
    form.appendChild(csrfInput);
  }

  // Логирование отправки форм
  console.log('Form submitted:', form.id || form.action);
}, true);

// 4. Контроль доступа к элементам
document.addEventListener('click', function(event) {
  if (event.target.dataset.requireAuth && !isUserAuthenticated()) {
    event.stopPropagation(); // останавливаем дальнейшее распространение
    event.preventDefault();  // отменяем действие по умолчанию

    showLoginModal();
    return;
  }
}, true);
`

const eventDelegationSnippet = `
// Делегирование событий - практическое применение

// HTML:
// <div id="task-list">
//   <div class="task" data-id="1">
//     <span class="task-text">Задача 1</span>
//     <button class="edit-btn">Редактировать</button>
//     <button class="delete-btn">Удалить</button>
//   </div>
//   <!-- ... другие задачи ... -->
// </div>

class TaskManager {
  constructor() {
    this.taskList = document.getElementById('task-list');
    this.setupEventDelegation();
  }

  setupEventDelegation() {
    // Один обработчик для всех действий
    this.taskList.addEventListener('click', (event) => {
      const target = event.target;
      const taskElement = target.closest('.task');

      if (!taskElement) return;

      const taskId = taskElement.dataset.id;

      if (target.classList.contains('edit-btn')) {
        this.editTask(taskId, taskElement);
      } else if (target.classList.contains('delete-btn')) {
        this.deleteTask(taskId, taskElement);
      } else if (target.classList.contains('task-text')) {
        this.toggleTaskComplete(taskId, taskElement);
      }
    });

    // Обработка клавиатуры для доступности
    this.taskList.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const taskElement = event.target.closest('.task');
        if (taskElement && event.target.classList.contains('task-text')) {
          event.preventDefault();
          this.toggleTaskComplete(taskElement.dataset.id, taskElement);
        }
      }
    });
  }

  addTask(taskData) {
    const taskElement = this.createTaskElement(taskData);
    this.taskList.appendChild(taskElement);
    // Новые элементы автоматически работают с делегированием!
  }

  editTask(taskId, element) {
    console.log('Editing task:', taskId);
    // Логика редактирования
  }

  deleteTask(taskId, element) {
    console.log('Deleting task:', taskId);
    element.remove();
  }

  toggleTaskComplete(taskId, element) {
    element.classList.toggle('completed');
  }
}

// Преимущества делегирования:
// 1. Один обработчик вместо множества
// 2. Автоматически работает с динамически добавленными элементами
// 3. Лучшая производительность
// 4. Меньше потребление памяти
`

const stopPropagationSnippet = `
// Управление распространением событий

// HTML:
// <div id="modal" class="modal">
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <h2>Модальное окно</h2>
//     <button id="save-btn">Сохранить</button>
//   </div>
// </div>

const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');
const closeBtn = modal.querySelector('.close');
const saveBtn = document.getElementById('save-btn');

// Закрытие модального окна при клике на фон
modal.addEventListener('click', function(event) {
  console.log('Клик по модальному окну');
  closeModal();
});

// Предотвращение закрытия при клике на содержимое
modalContent.addEventListener('click', function(event) {
  console.log('Клик по содержимому модального окна');
  // Останавливаем всплытие, чтобы не сработал обработчик modal
  event.stopPropagation();
});

// Закрытие по кнопке
closeBtn.addEventListener('click', function(event) {
  console.log('Клик по кнопке закрытия');
  closeModal();
  // stopPropagation не нужен, так как закрываем модальное окно
});

// Обработка сохранения
saveBtn.addEventListener('click', function(event) {
  console.log('Клик по кнопке сохранения');

  if (validateForm()) {
    saveData();
    closeModal();
  } else {
    // Останавливаем распространение, чтобы модальное окно не закрылось
    event.stopPropagation();
    showValidationErrors();
  }
});

// stopImmediatePropagation - останавливает ВСЕ обработчики
document.addEventListener('click', function(event) {
  if (event.target.dataset.emergency) {
    event.stopImmediatePropagation(); // Другие обработчики не выполнятся
    handleEmergency();
  }
});

// Этот обработчик НЕ выполнится для элементов с data-emergency
document.addEventListener('click', function(event) {
  console.log('Обычная обработка клика');
});

function closeModal() {
  modal.style.display = 'none';
}

function validateForm() {
  // Логика валидации
  return true;
}

function saveData() {
  console.log('Данные сохранены');
}

function showValidationErrors() {
  console.log('Показываем ошибки валидации');
}

function handleEmergency() {
  console.log('Аварийная обработка!');
}
`

const customEventsSnippet = `
// Кастомные события и их жизненный цикл

// Создание и диспетчеризация кастомных событий
class EventEmitter {
  constructor(element) {
    this.element = element || document;
  }

  // Создание кастомного события
  emit(eventName, detail = {}) {
    const customEvent = new CustomEvent(eventName, {
      detail: detail,
      bubbles: true,      // событие всплывает
      cancelable: true,   // можно отменить с preventDefault()
      composed: true      // проходит через Shadow DOM границы
    });

    this.element.dispatchEvent(customEvent);
    return customEvent;
  }

  // Удобные методы для подписки
  on(eventName, handler, options = {}) {
    this.element.addEventListener(eventName, handler, options);
  }

  off(eventName, handler) {
    this.element.removeEventListener(eventName, handler);
  }

  once(eventName, handler) {
    this.element.addEventListener(eventName, handler, { once: true });
  }
}

// Практический пример: система уведомлений
class NotificationSystem extends EventEmitter {
  constructor() {
    super();
    this.notifications = [];
  }

  show(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };

    this.notifications.push(notification);

    // Генерируем кастомное событие
    this.emit('notification:show', {
      notification,
      count: this.notifications.length
    });

    return notification;
  }

  hide(notificationId) {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      const notification = this.notifications.splice(index, 1)[0];

      this.emit('notification:hide', {
        notification,
        count: this.notifications.length
      });
    }
  }

  clear() {
    const count = this.notifications.length;
    this.notifications = [];

    this.emit('notification:clear', {
      cleared: count
    });
  }
}

// Использование системы уведомлений
const notifications = new NotificationSystem();

// Подписка на события (можно на фазе погружения)
document.addEventListener('notification:show', function(event) {
  console.log('New notification:', event.detail.notification.message);
  updateNotificationCounter(event.detail.count);
}, true); // фаза погружения

// Подписка на всплытие
document.addEventListener('notification:hide', function(event) {
  console.log('Notification hidden');
  updateNotificationCounter(event.detail.count);
});

// Делегирование для UI
document.addEventListener('click', function(event) {
  if (event.target.dataset.notify) {
    const message = event.target.dataset.notify;
    const type = event.target.dataset.notifyType || 'info';

    notifications.show(message, type);
  }

  if (event.target.classList.contains('notification-close')) {
    const notificationId = parseInt(event.target.dataset.notificationId);
    notifications.hide(notificationId);
  }
});

function updateNotificationCounter(count) {
  const counter = document.getElementById('notification-counter');
  if (counter) {
    counter.textContent = count;
    counter.style.display = count > 0 ? 'block' : 'none';
  }
}

// HTML для тестирования:
// <button data-notify="Задача выполнена!" data-notify-type="success">
//   Выполнить задачу
// </button>
// <button data-notify="Произошла ошибка" data-notify-type="error">
//   Вызвать ошибку
// </button>
`

const performanceSnippet = `
// Оптимизация производительности событий

// 1. Throttling - ограничение частоты вызовов
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 2. Debouncing - задержка выполнения
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Практическое применение
class PerformantEventHandlers {
  constructor() {
    this.setupScrollHandling();
    this.setupResizeHandling();
    this.setupSearchHandling();
  }

  setupScrollHandling() {
    // Throttling для scroll - срабатывает максимум раз в 16мс (60fps)
    const throttledScroll = throttle((event) => {
      this.handleScroll(event);
    }, 16);

    // Пассивный обработчик для лучшей производительности
    window.addEventListener('scroll', throttledScroll, {
      passive: true // браузер знает, что preventDefault не будет вызван
    });
  }

  setupResizeHandling() {
    // Debouncing для resize - срабатывает после окончания изменения размера
    const debouncedResize = debounce((event) => {
      this.handleResize(event);
    }, 250);

    window.addEventListener('resize', debouncedResize);
  }

  setupSearchHandling() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    // Debouncing для поиска - запрос отправляется после паузы в печати
    const debouncedSearch = debounce((query) => {
      this.performSearch(query);
    }, 300);

    searchInput.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      if (query.length >= 2) {
        debouncedSearch(query);
      }
    });
  }

  handleScroll(event) {
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');

    // Показать/скрыть header при скролле
    if (header) {
      header.classList.toggle('header-hidden', scrollY > 100);
    }

    // Ленивая загрузка изображений
    this.lazyLoadImages();
  }

  handleResize(event) {
    console.log('Window resized:', window.innerWidth, window.innerHeight);

    // Пересчет layout
    this.recalculateLayout();

    // Обновление charts/graphs
    this.updateCharts();
  }

  performSearch(query) {
    console.log('Searching for:', query);

    // Отмена предыдущего запроса
    if (this.searchController) {
      this.searchController.abort();
    }

    // Новый запрос с возможностью отмены
    this.searchController = new AbortController();

    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
      signal: this.searchController.signal
    })
    .then(response => response.json())
    .then(results => {
      this.displaySearchResults(results);
    })
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error);
      }
    });
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  recalculateLayout() {
    // Логика пересчета layout
  }

  updateCharts() {
    // Обновление графиков при изменении размера
  }

  displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
      resultsContainer.innerHTML = results.map(result =>
        \`<div class="search-result">\${result.title}</div>\`
      ).join('');
    }
  }
}

// Инициализация
const performantHandlers = new PerformantEventHandlers();

// Очистка при необходимости
window.addEventListener('beforeunload', () => {
  // Отмена активных запросов
  if (performantHandlers.searchController) {
    performantHandlers.searchController.abort();
  }
});
`

const highlightedEventPhases = ref('')
const highlightedTargetVsCurrentTarget = ref('')
const highlightedCapturingExample = ref('')
const highlightedEventDelegation = ref('')
const highlightedStopPropagation = ref('')
const highlightedCustomEvents = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedEventPhases.value = Prism.highlight(eventPhasesSnippet, Prism.languages.javascript, 'javascript')
  highlightedTargetVsCurrentTarget.value = Prism.highlight(targetVsCurrentTargetSnippet, Prism.languages.javascript, 'javascript')
  highlightedCapturingExample.value = Prism.highlight(capturingExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedEventDelegation.value = Prism.highlight(eventDelegationSnippet, Prism.languages.javascript, 'javascript')
  highlightedStopPropagation.value = Prism.highlight(stopPropagationSnippet, Prism.languages.javascript, 'javascript')
  highlightedCustomEvents.value = Prism.highlight(customEventsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
})

const currentPhaseStep = ref(1)
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              События DOM: жизненный цикл и обработка
            </h1>

            <p class="font-weight-regular mb-6">
              <b>События DOM</b> проходят через три фазы: <b>погружение (capturing)</b>, <b>цель (target)</b> и <b>всплытие (bubbling)</b>.
              Понимание этих фаз критически важно для эффективной работы с событиями, делегирования и оптимизации производительности.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Три фазы жизненного цикла событий</h2>
            <v-stepper
              v-model="currentPhaseStep"
              class="mb-8"
              alt-labels
              :items="[
                { title: 'Capturing', value: 1 },
                { title: 'Target', value: 2 },
                { title: 'Bubbling', value: 3 }
              ]"
            >
              <template v-slot:item.1>
                <v-card class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-avatar color="primary" size="large" class="mr-4">
                      <v-icon size="large" color="white">mdi-arrow-down</v-icon>
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 font-weight-bold">1. Фаза погружения (Capturing)</h3>
                      <p class="text-body-2 text-grey-600 ma-0">Событие идет от корня к цели</p>
                    </div>
                  </div>

                  <p class="text-body-1 mb-3">
                    Событие начинает свой путь от <strong>корня документа</strong> и движется вниз по DOM-дереву
                    к элементу, на котором произошло событие. На этой фазе срабатывают обработчики,
                    зарегистрированные с флагом <code>useCapture: true</code>.
                  </p>

                  <v-alert color="primary" variant="tonal" class="mb-3">
                    <template v-slot:prepend>
                      <v-icon>mdi-information</v-icon>
                    </template>
                    <strong>Ключевая особенность:</strong> На фазе погружения event.eventPhase === 1 (CAPTURING_PHASE)
                  </v-alert>

                  <div class="bg-blue-lighten-5 pa-4 rounded mb-3">
                    <h4 class="font-weight-bold mb-2">Путь события при клике на кнопку:</h4>
                    <v-timeline density="compact">
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">Document</div>
                      </v-timeline-item>
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">HTML</div>
                      </v-timeline-item>
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">Body</div>
                      </v-timeline-item>
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">Div (outer)</div>
                      </v-timeline-item>
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">Div (middle)</div>
                      </v-timeline-item>
                      <v-timeline-item dot-color="primary" size="small">
                        <div class="font-weight-bold">Button (target) ⭐</div>
                      </v-timeline-item>
                    </v-timeline>
                  </div>

                  <v-list class="bg-grey-lighten-5 rounded">
                    <v-list-subheader>Практическое применение:</v-list-subheader>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-chart-line</v-icon>
                      </template>
                      <v-list-item-title>Глобальная аналитика событий</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-security</v-icon>
                      </template>
                      <v-list-item-title>Контроль доступа к элементам</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-form-select</v-icon>
                      </template>
                      <v-list-item-title>Предварительная обработка форм</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </template>

              <template v-slot:item.2>
                <v-card class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-avatar color="warning" size="large" class="mr-4">
                      <v-icon size="large" color="white">mdi-target</v-icon>
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 font-weight-bold">2. Фаза цели (Target)</h3>
                      <p class="text-body-2 text-grey-600 ma-0">Событие достигло цели</p>
                    </div>
                  </div>

                  <p class="text-body-1 mb-3">
                    Событие достигло элемента, на котором произошло (<strong>target</strong>).
                    На этой фазе <code>event.target === event.currentTarget</code>.
                    Срабатывают обработчики, зарегистрированные на самом элементе.
                  </p>

                  <v-row class="mb-3">
                    <v-col cols="12" md="6">
                      <v-card color="orange" variant="tonal" class="pa-3">
                        <h4 class="font-weight-bold mb-2">event.target</h4>
                        <p class="text-body-2 ma-0">Элемент, где произошло событие (константа для всех фаз)</p>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card color="orange" variant="tonal" class="pa-3">
                        <h4 class="font-weight-bold mb-2">event.currentTarget</h4>
                        <p class="text-body-2 ma-0">Элемент, где обрабатывается событие (меняется на каждой фазе)</p>
                      </v-card>
                    </v-col>
                  </v-row>

                  <div class="bg-orange-lighten-5 pa-4 rounded mb-3">
                    <h4 class="font-weight-bold mb-2">На фазе цели:</h4
