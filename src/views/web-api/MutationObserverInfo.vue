<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicExampleSnippet = `
// =====================================
// БАЗОВЫЙ ПРИМЕР MUTATIONOBSERVER
// =====================================

// 1. Целевой элемент для наблюдения
const targetNode = document.getElementById('app')

// 2. Конфигурация - что отслеживать
const config = {
  attributes: true,        // Изменения атрибутов
  childList: true,         // Добавление/удаление дочерних элементов
  subtree: true,           // Наблюдать за всем поддеревом
  characterData: true,     // Изменения текстового содержимого
  attributeOldValue: true, // Сохранять старые значения атрибутов
  characterDataOldValue: true // Сохранять старые текстовые данные
}

// 3. Callback функция - что делать при изменениях
const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    console.log('Тип изменения:', mutation.type)
    console.log('Целевой элемент:', mutation.target)

    if (mutation.type === 'childList') {
      console.log('Добавленные узлы:', mutation.addedNodes)
      console.log('Удаленные узлы:', mutation.removedNodes)
    }

    if (mutation.type === 'attributes') {
      console.log('Измененный атрибут:', mutation.attributeName)
      console.log('Старое значение:', mutation.oldValue)
    }

    if (mutation.type === 'characterData') {
      console.log('Новый текст:', mutation.target.data)
      console.log('Старый текст:', mutation.oldValue)
    }
  }
}

// 4. Создание наблюдателя
const observer = new MutationObserver(callback)

// 5. Запуск наблюдения
observer.observe(targetNode, config)

// 6. Остановка наблюдения (когда нужно)
// observer.disconnect()

// 7. Получение накопленных мутаций (до вызова callback)
// const mutations = observer.takeRecords()
`

const mutationTypesSnippet = `
// =====================================
// ТИПЫ МУТАЦИЙ И ИХ ОСОБЕННОСТИ
// =====================================

const targetElement = document.querySelector('#target')

// 1. ATTRIBUTES - изменение атрибутов
const attributesObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      const element = mutation.target
      const attrName = mutation.attributeName
      const oldValue = mutation.oldValue
      const newValue = element.getAttribute(attrName)

      console.log(\`Атрибут "\${attrName}" изменен\`)
      console.log(\`Старое значение: \${oldValue}\`)
      console.log(\`Новое значение: \${newValue}\`)
    }
  })
})

attributesObserver.observe(targetElement, {
  attributes: true,
  attributeOldValue: true,
  attributeFilter: ['class', 'data-status'] // Только эти атрибуты
})

// Тестирование
targetElement.className = 'active'        // Сработает
targetElement.setAttribute('data-status', 'loading') // Сработает
targetElement.id = 'new-id'              // НЕ сработает (не в фильтре)

// 2. CHILDLIST - добавление/удаление элементов
const childListObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      // Добавленные элементы
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('Добавлен элемент:', node.tagName)
        }
      })

      // Удаленные элементы
      mutation.removedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          console.log('Удален элемент:', node.tagName)
        }
      })

      console.log('Предыдущий сосед:', mutation.previousSibling)
      console.log('Следующий сосед:', mutation.nextSibling)
    }
  })
})

childListObserver.observe(targetElement, {
  childList: true
})

// Тестирование
const newDiv = document.createElement('div')
targetElement.appendChild(newDiv)        // Сработает
targetElement.removeChild(newDiv)        // Сработает

// 3. SUBTREE - наблюдение за всем поддеревом
const subtreeObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('Изменение в поддереве:', mutation.target)
  })
})

subtreeObserver.observe(targetElement, {
  childList: true,
  subtree: true // Наблюдать за всеми потомками
})

// Тестирование
const deepChild = targetElement.querySelector('.deep-child')
deepChild.textContent = 'Изменено'       // Сработает

// 4. CHARACTERDATA - изменение текстового содержимого
const textObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'characterData') {
      console.log('Старый текст:', mutation.oldValue)
      console.log('Новый текст:', mutation.target.data)
    }
  })
})

// Важно: наблюдаем за текстовым узлом, не за элементом
const textNode = targetElement.firstChild
if (textNode && textNode.nodeType === Node.TEXT_NODE) {
  textObserver.observe(textNode, {
    characterData: true,
    characterDataOldValue: true
  })
}

// Тестирование
textNode.data = 'Новый текст'            // Сработает

// 5. КОМБИНИРОВАННОЕ наблюдение
const fullObserver = new MutationObserver((mutations) => {
  const changes = {
    attributes: [],
    childList: [],
    characterData: []
  }

  mutations.forEach(mutation => {
    changes[mutation.type].push(mutation)
  })

  console.log('Сводка изменений:', {
    'Атрибуты': changes.attributes.length,
    'Дочерние элементы': changes.childList.length,
    'Текстовое содержимое': changes.characterData.length
  })
})

fullObserver.observe(targetElement, {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
})
`

const configOptionsSnippet = `
// =====================================
// ОПЦИИ КОНФИГУРАЦИИ - ДЕТАЛЬНЫЙ ОБЗОР
// =====================================

// Полная конфигурация с комментариями
const fullConfig = {
  // === ОСНОВНЫЕ ОПЦИИ (хотя бы одна обязательна) ===

  // childList: отслеживать добавление/удаление дочерних элементов
  childList: true,

  // attributes: отслеживать изменения атрибутов
  attributes: true,

  // characterData: отслеживать изменения текстового содержимого
  characterData: true,

  // === РАСШИРЕННЫЕ ОПЦИИ ===

  // subtree: применять настройки ко всему поддереву
  subtree: true,

  // attributeOldValue: сохранять предыдущие значения атрибутов
  // ⚠️ Требует attributes: true
  attributeOldValue: true,

  // characterDataOldValue: сохранять предыдущие текстовые данные
  // ⚠️ Требует characterData: true
  characterDataOldValue: true,

  // attributeFilter: отслеживать только указанные атрибуты
  // ⚠️ Требует attributes: true
  attributeFilter: ['class', 'style', 'data-id']
}

// === ПРИМЕРЫ РАЗНЫХ КОНФИГУРАЦИЙ ===

// 1. Минимальная конфигурация - только добавление элементов
const minimalConfig = {
  childList: true
}

// 2. Отслеживание изменений классов
const classConfig = {
  attributes: true,
  attributeFilter: ['class'],
  attributeOldValue: true
}

// 3. Глубокое отслеживание всех изменений
const deepConfig = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
}

// 4. Только изменения в стилях
const styleConfig = {
  attributes: true,
  attributeFilter: ['style', 'class']
}

// 5. Отслеживание текстового содержимого во всем дереве
const textConfig = {
  characterData: true,
  subtree: true,
  characterDataOldValue: true
}

// === ТИПИЧНЫЕ ОШИБКИ В КОНФИГУРАЦИИ ===

// ❌ ОШИБКА: не указана ни одна основная опция
const invalidConfig1 = {
  subtree: true // Нужна хотя бы одна из: childList, attributes, characterData
}

// ❌ ОШИБКА: attributeOldValue без attributes
const invalidConfig2 = {
  childList: true,
  attributeOldValue: true // Нужен attributes: true
}

// ❌ ОШИБКА: attributeFilter без attributes
const invalidConfig3 = {
  childList: true,
  attributeFilter: ['class'] // Нужен attributes: true
}

// ✅ ПРАВИЛЬНО: всё корректно настроено
const validConfig = {
  attributes: true,
  attributeFilter: ['class', 'id'],
  attributeOldValue: true
}

// === ВЫБОР КОНФИГУРАЦИИ ПОД ЗАДАЧУ ===

// Задача 1: Отслеживать добавление элементов в список
const listConfig = {
  childList: true,
  subtree: false // Только прямые дети
}

// Задача 2: Отслеживать изменения видимости элемента
const visibilityConfig = {
  attributes: true,
  attributeFilter: ['class', 'style', 'hidden']
}

// Задача 3: Отслеживать изменения в редакторе контента
const editorConfig = {
  childList: true,
  characterData: true,
  subtree: true
}

// Задача 4: Отслеживать изменения data-атрибутов
const dataAttributesConfig = {
  attributes: true,
  attributeFilter: Array.from({ length: 10 }, (_, i) => \`data-value\${i}\`)
}
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ
// =====================================

// 1. Отслеживание изменений в списке TODO
class TodoListObserver {
  constructor(listElement) {
    this.listElement = listElement
    this.observer = null
    this.setupObserver()
  }

  setupObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              console.log('Добавлена задача:', node.textContent)
              this.animateNewItem(node)
            }
          })

          mutation.removedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              console.log('Удалена задача:', node.textContent)
            }
          })
        }
      })
    })

    this.observer.observe(this.listElement, {
      childList: true
    })
  }

  animateNewItem(item) {
    item.style.opacity = '0'
    requestAnimationFrame(() => {
      item.style.transition = 'opacity 0.3s'
      item.style.opacity = '1'
    })
  }

  disconnect() {
    this.observer.disconnect()
  }
}

// Использование
const todoList = document.querySelector('#todo-list')
const todoObserver = new TodoListObserver(todoList)

// 2. Автосохранение при изменении контента
class AutoSave {
  constructor(element, saveCallback) {
    this.element = element
    this.saveCallback = saveCallback
    this.saveTimeout = null
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver(() => {
      // Debounce - сохраняем через 2 секунды после последнего изменения
      clearTimeout(this.saveTimeout)
      this.saveTimeout = setTimeout(() => {
        this.save()
      }, 2000)
    })

    observer.observe(this.element, {
      childList: true,
      characterData: true,
      subtree: true
    })
  }

  save() {
    const content = this.element.innerHTML
    console.log('Автосохранение...')
    this.saveCallback(content)
  }
}

// Использование
const editor = document.querySelector('#editor')
const autoSave = new AutoSave(editor, (content) => {
  localStorage.setItem('draft', content)
})

// 3. Отслеживание изменений темы (светлая/темная)
class ThemeObserver {
  constructor() {
    this.callbacks = []
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' &&
            mutation.attributeName === 'class') {
          const isDark = document.body.classList.contains('dark-theme')
          this.notifyThemeChange(isDark ? 'dark' : 'light')
        }
      })
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  onThemeChange(callback) {
    this.callbacks.push(callback)
  }

  notifyThemeChange(theme) {
    this.callbacks.forEach(callback => callback(theme))
  }
}

// Использование
const themeObserver = new ThemeObserver()
themeObserver.onThemeChange((theme) => {
  console.log('Тема изменена на:', theme)
  // Обновить стили графиков, карт и т.д.
})

// 4. Отслеживание появления элементов (ленивая загрузка)
class LazyLoadObserver {
  constructor(selector, loadCallback) {
    this.selector = selector
    this.loadCallback = loadCallback
    this.loadedElements = new WeakSet()
    this.setupObserver()
    this.checkExistingElements()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.checkElement(node)
            // Проверяем потомков
            node.querySelectorAll(this.selector).forEach(el => {
              this.checkElement(el)
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  checkExistingElements() {
    document.querySelectorAll(this.selector).forEach(el => {
      this.checkElement(el)
    })
  }

  checkElement(element) {
    if (element.matches && element.matches(this.selector) &&
        !this.loadedElements.has(element)) {
      this.loadedElements.add(element)
      this.loadCallback(element)
    }
  }
}

// Использование
const lazyLoader = new LazyLoadObserver('img[data-src]', (img) => {
  img.src = img.dataset.src
  console.log('Загружено изображение:', img.dataset.src)
})

// 5. Отслеживание изменений в форме
class FormChangeTracker {
  constructor(formElement) {
    this.formElement = formElement
    this.initialState = this.captureState()
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver(() => {
      const hasChanges = this.hasUnsavedChanges()
      this.updateUI(hasChanges)
    })

    observer.observe(this.formElement, {
      attributes: true,
      attributeFilter: ['value'],
      subtree: true,
      childList: true
    })

    // Также слушаем события input
    this.formElement.addEventListener('input', () => {
      const hasChanges = this.hasUnsavedChanges()
      this.updateUI(hasChanges)
    })
  }

  captureState() {
    const formData = new FormData(this.formElement)
    return Object.fromEntries(formData.entries())
  }

  hasUnsavedChanges() {
    const currentState = this.captureState()
    return JSON.stringify(this.initialState) !== JSON.stringify(currentState)
  }

  updateUI(hasChanges) {
    const saveButton = document.querySelector('#save-button')
    if (saveButton) {
      saveButton.disabled = !hasChanges
      saveButton.textContent = hasChanges ? 'Сохранить изменения' : 'Нет изменений'
    }
  }

  resetInitialState() {
    this.initialState = this.captureState()
    this.updateUI(false)
  }
}

// Использование
const form = document.querySelector('#user-form')
const formTracker = new FormChangeTracker(form)

// 6. Отслеживание появления модальных окон
class ModalObserver {
  constructor() {
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE &&
              node.matches('.modal')) {
            this.onModalOpen(node)
          }
        })

        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE &&
              node.matches('.modal')) {
            this.onModalClose(node)
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  onModalOpen(modal) {
    console.log('Модальное окно открыто:', modal.id)
    // Отключить скролл
    document.body.style.overflow = 'hidden'
    // Установить фокус
    const firstInput = modal.querySelector('input, button')
    if (firstInput) firstInput.focus()
  }

  onModalClose(modal) {
    console.log('Модальное окно закрыто:', modal.id)
    // Включить скролл
    document.body.style.overflow = ''
  }
}

const modalObserver = new ModalObserver()

// 7. Синхронизация двух элементов
class ElementSync {
  constructor(sourceElement, targetElement) {
    this.sourceElement = sourceElement
    this.targetElement = targetElement
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData' ||
            mutation.type === 'childList') {
          this.sync()
        }
      })
    })

    observer.observe(this.sourceElement, {
      characterData: true,
      childList: true,
      subtree: true
    })
  }

  sync() {
    this.targetElement.innerHTML = this.sourceElement.innerHTML
  }
}

// Использование - синхронизация превью
const editor2 = document.querySelector('#editor')
const preview = document.querySelector('#preview')
const sync = new ElementSync(editor2, preview)
`

const realWorldExamplesSnippet = `
// =====================================
// РЕАЛЬНЫЕ ПРИМЕРЫ ИЗ ПРАКТИКИ
// =====================================

// 1. Интеграция с SPA-фреймворками (React/Vue Router)
class RouteChangeDetector {
  constructor() {
    this.currentPath = location.pathname
    this.callbacks = []
    this.setupObserver()
  }

  setupObserver() {
    // Отслеживаем изменения title (часто меняется при смене роута)
    const observer = new MutationObserver(() => {
      const newPath = location.pathname
      if (newPath !== this.currentPath) {
        this.currentPath = newPath
        this.notifyRouteChange(newPath)
      }
    })

    observer.observe(document.querySelector('title'), {
      childList: true,
      characterData: true
    })

    // Также отслеживаем изменения в корневом элементе
    const appObserver = new MutationObserver(() => {
      const newPath = location.pathname
      if (newPath !== this.currentPath) {
        this.currentPath = newPath
        this.notifyRouteChange(newPath)
      }
    })

    appObserver.observe(document.getElementById('app'), {
      childList: true
    })
  }

  onRouteChange(callback) {
    this.callbacks.push(callback)
  }

  notifyRouteChange(path) {
    console.log('Роут изменен:', path)
    this.callbacks.forEach(cb => cb(path))
  }
}

const routeDetector = new RouteChangeDetector()
routeDetector.onRouteChange((path) => {
  // Отправка аналитики
  analytics.pageView(path)
})

// 2. Отслеживание рекламных блоков (для блокировщиков рекламы)
class AdBlockDetector {
  constructor() {
    this.isAdBlockActive = false
    this.setupObserver()
  }

  setupObserver() {
    // Создаем приманку для AdBlock
    const bait = document.createElement('div')
    bait.className = 'ad advertisement adsbox'
    bait.style.cssText = 'width:1px;height:1px;position:absolute;left:-999px;'
    document.body.appendChild(bait)

    // Наблюдаем за удалением приманки
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.removedNodes.forEach(node => {
          if (node === bait) {
            this.isAdBlockActive = true
            console.log('AdBlock обнаружен!')
            this.showMessage()
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Проверка через некоторое время
    setTimeout(() => {
      if (bait.offsetHeight === 0) {
        this.isAdBlockActive = true
        this.showMessage()
      }
    }, 100)
  }

  showMessage() {
    const message = document.createElement('div')
    message.textContent = 'Пожалуйста, отключите AdBlock для полного доступа'
    message.style.cssText = 'position:fixed;top:0;left:0;right:0;background:orange;padding:10px;'
    document.body.prepend(message)
  }
}

new AdBlockDetector()

// 3. Отслеживание изменений в localStorage (через DOM)
class LocalStorageObserver {
  constructor() {
    this.callbacks = new Map()
    this.setupObserver()
  }

  setupObserver() {
    // Создаем скрытый элемент для хранения данных
    const storageElement = document.createElement('div')
    storageElement.id = 'local-storage-mirror'
    storageElement.style.display = 'none'
    document.body.appendChild(storageElement)

    // Переопределяем localStorage методы
    const originalSetItem = localStorage.setItem.bind(localStorage)

    localStorage.setItem = (key, value) => {
      originalSetItem(key, value)
      storageElement.setAttribute(\`data-\${key}\`, value)
    }

    // Наблюдаем за изменениями атрибутов
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          const key = mutation.attributeName.replace('data-', '')
          const newValue = mutation.target.getAttribute(mutation.attributeName)
          this.notifyChange(key, mutation.oldValue, newValue)
        }
      })
    })

    observer.observe(storageElement, {
      attributes: true,
      attributeOldValue: true
    })
  }

  watch(key, callback) {
    if (!this.callbacks.has(key)) {
      this.callbacks.set(key, [])
    }
    this.callbacks.get(key).push(callback)
  }

  notifyChange(key, oldValue, newValue) {
    if (this.callbacks.has(key)) {
      this.callbacks.get(key).forEach(cb => cb(oldValue, newValue))
    }
  }
}

const storageObserver = new LocalStorageObserver()
storageObserver.watch('user', (oldValue, newValue) => {
  console.log('User changed:', { oldValue, newValue })
})

// 4. Отслеживание производительности рендеринга
class PerformanceMonitor {
  constructor() {
    this.mutationCount = 0
    this.mutationRate = 0
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      this.mutationCount += mutations.length

      // Проверяем частоту мутаций
      if (this.mutationCount > 100) {
        console.warn('⚠️ Высокая частота DOM мутаций:', this.mutationCount)
        this.logSlowMutations(mutations)
      }
    })

    observer.observe(document.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    })

    // Сброс счетчика каждую секунду
    setInterval(() => {
      this.mutationRate = this.mutationCount
      this.mutationCount = 0

      if (this.mutationRate > 50) {
        console.log(\`Мутаций в секунду: \${this.mutationRate}\`)
      }
    }, 1000)
  }

  logSlowMutations(mutations) {
    const summary = mutations.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1
      return acc
    }, {})
    console.table(summary)
  }
}

const perfMonitor = new PerformanceMonitor()

// 5. Отслеживание добавления скриптов (безопасность)
class ScriptInjectionDetector {
  constructor() {
    this.allowedScripts = new Set([
      'https://cdn.example.com/app.js',
      'https://analytics.google.com/analytics.js'
    ])
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === 'SCRIPT') {
            this.checkScript(node)
          }
        })
      })
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })
  }

  checkScript(scriptElement) {
    const src = scriptElement.src

    if (src && !this.allowedScripts.has(src)) {
      console.error('🚨 Обнаружен неавторизованный скрипт:', src)
      scriptElement.remove()
      this.reportToServer(src)
    }
  }

  reportToServer(src) {
    fetch('/api/security/report', {
      method: 'POST',
      body: JSON.stringify({ type: 'unauthorized_script', src }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

new ScriptInjectionDetector()

// 6. Отслеживание изменений в таблице (DataTable)
class DataTableObserver {
  constructor(tableElement) {
    this.table = tableElement
    this.rowCache = new Map()
    this.setupObserver()
  }

  setupObserver() {
    const tbody = this.table.querySelector('tbody')

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.tagName === 'TR') {
              this.onRowAdded(node)
            }
          })

          mutation.removedNodes.forEach(node => {
            if (node.tagName === 'TR') {
              this.onRowRemoved(node)
            }
          })
        }

        if (mutation.type === 'characterData') {
          const row = mutation.target.closest('tr')
          if (row) {
            this.onRowUpdated(row)
          }
        }
      })
    })

    observer.observe(tbody, {
      childList: true,
      characterData: true,
      subtree: true
    })
  }

  onRowAdded(row) {
    const rowData = this.extractRowData(row)
    this.rowCache.set(row, rowData)
    console.log('Добавлена строка:', rowData)
    this.updateSummary()
  }

  onRowRemoved(row) {
    const rowData = this.rowCache.get(row)
    console.log('Удалена строка:', rowData)
    this.rowCache.delete(row)
    this.updateSummary()
  }

  onRowUpdated(row) {
    const oldData = this.rowCache.get(row)
    const newData = this.extractRowData(row)
    console.log('Обновлена строка:', { oldData, newData })
    this.rowCache.set(row, newData)
  }

  extractRowData(row) {
    return Array.from(row.cells).map(cell => cell.textContent)
  }

  updateSummary() {
    const totalRows = this.rowCache.size
    console.log(\`Всего строк: \${totalRows}\`)
  }
}

const table = document.querySelector('#data-table')
const tableObserver = new DataTableObserver(table)

// 7. Отслеживание infinite scroll загрузки
class InfiniteScrollObserver {
  constructor(containerElement, loadMoreCallback) {
    this.container = containerElement
    this.loadMoreCallback = loadMoreCallback
    this.isLoading = false
    this.setupObserver()
  }

  setupObserver() {
    const observer = new MutationObserver(() => {
      if (this.isLoading) return

      const scrollHeight = this.container.scrollHeight
      const scrollTop = this.container.scrollTop
      const clientHeight = this.container.clientHeight

      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100

      if (scrollPercent > 80) {
        this.loadMore()
      }
    })

    observer.observe(this.container, {
      childList: true,
      subtree: true
    })

    // Также слушаем scroll
    this.container.addEventListener('scroll', () => {
      // MutationObserver обработает после рендера
    })
  }

  async loadMore() {
    this.isLoading = true
    console.log('Загрузка дополнительного контента...')

    await this.loadMoreCallback()

    this.isLoading = false
  }
}

const feed = document.querySelector('#feed')
const infiniteScroll = new InfiniteScrollObserver(feed, async () => {
  // Загрузка данных с сервера
  const data = await fetch('/api/posts?page=' + currentPage).then(r => r.json())
  data.forEach(post => {
    const postElement = createPostElement(post)
    feed.appendChild(postElement)
  })
  currentPage++
})
`

const performanceSnippet = `
// =====================================
// ПРОИЗВОДИТЕЛЬНОСТЬ И ОПТИМИЗАЦИЯ
// =====================================

// 1. Проблема: слишком много мутаций
// ❌ ПЛОХО - observer вызывается для каждого элемента
function badAppendItems(container, items) {
  items.forEach(item => {
    const div = document.createElement('div')
    div.textContent = item
    container.appendChild(div) // Observer срабатывает каждый раз!
  })
}

// ✅ ХОРОШО - batch операции
function goodAppendItems(container, items) {
  const fragment = document.createDocumentFragment()
  items.forEach(item => {
    const div = document.createElement('div')
    div.textContent = item
    fragment.appendChild(div) // Observer НЕ срабатывает
  })
  container.appendChild(fragment) // Observer срабатывает ОДИН раз
}

// 2. Debounce для частых изменений
class DebouncedObserver {
  constructor(target, config, callback, delay = 250) {
    this.callback = callback
    this.delay = delay
    this.timeout = null
    this.pendingMutations = []

    this.observer = new MutationObserver((mutations) => {
      this.pendingMutations.push(...mutations)

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.callback(this.pendingMutations)
        this.pendingMutations = []
      }, this.delay)
    })

    this.observer.observe(target, config)
  }

  disconnect() {
    clearTimeout(this.timeout)
    this.observer.disconnect()
  }
}

// Использование
const debouncedObserver = new DebouncedObserver(
  document.getElementById('editor'),
  { characterData: true, childList: true, subtree: true },
  (mutations) => {
    console.log('Обработка', mutations.length, 'мутаций')
    // Автосохранение и т.д.
  },
  1000
)

// 3. Throttle для ограничения частоты обработки
class ThrottledObserver {
  constructor(target, config, callback, interval = 1000) {
    this.callback = callback
    this.interval = interval
    this.lastCall = 0
    this.pendingMutations = []

    this.observer = new MutationObserver((mutations) => {
      this.pendingMutations.push(...mutations)

      const now = Date.now()
      const timeSinceLastCall = now - this.lastCall

      if (timeSinceLastCall >= this.interval) {
        this.callback(this.pendingMutations)
        this.pendingMutations = []
        this.lastCall = now
      }
    })

    this.observer.observe(target, config)
  }
}

// 4. Оптимизация: отключение при неактивности
class SmartObserver {
  constructor(target, config, callback) {
    this.target = target
    this.config = config
    this.callback = callback
    this.observer = null
    this.isActive = false

    this.setupVisibilityListener()
    this.start()
  }

  setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop()
      } else {
        this.start()
      }
    })
  }

  start() {
    if (this.isActive) return

    this.observer = new MutationObserver(this.callback)
    this.observer.observe(this.target, this.config)
    this.isActive = true
    console.log('Observer запущен')
  }

  stop() {
    if (!this.isActive) return

    this.observer.disconnect()
    this.observer = null
    this.isActive = false
    console.log('Observer остановлен')
  }
}

// 5. Использование takeRecords для синхронной обработки
class SyncObserver {
  constructor(target, config) {
    this.observer = new MutationObserver(() => {
      // Асинхронная обработка
      console.log('Асинхронная обработка мутаций')
    })

    this.observer.observe(target, config)
  }

  processNow() {
    // Получаем накопленные мутации до вызова callback
    const mutations = this.observer.takeRecords()

    if (mutations.length > 0) {
      console.log('Синхронная обработка', mutations.length, 'мутаций')
      this.processMutations(mutations)
    }
  }

  processMutations(mutations) {
    // Обработка мутаций
  }
}

// 6. Мемоизация для предотвращения дублирующихся обработок
class MemoizedObserver {
  constructor(target, config, callback) {
    this.processedMutations = new WeakSet()
    this.callback = callback

    this.observer = new MutationObserver((mutations) => {
      const newMutations = mutations.filter(m => {
        if (this.processedMutations.has(m.target)) {
          return false
        }
        this.processedMutations.add(m.target)
        return true
      })

      if (newMutations.length > 0) {
        this.callback(newMutations)
      }
    })

    this.observer.observe(target, config)
  }
}

// 7. Batch обработка с requestIdleCallback
class IdleObserver {
  constructor(target, config, callback) {
    this.callback = callback
    this.pendingMutations = []
    this.isScheduled = false

    this.observer = new MutationObserver((mutations) => {
      this.pendingMutations.push(...mutations)

      if (!this.isScheduled) {
        this.isScheduled = true
        requestIdleCallback((deadline) => {
          this.processMutations(deadline)
        })
      }
    })

    this.observer.observe(target, config)
  }

  processMutations(deadline) {
    while (this.pendingMutations.length > 0 && deadline.timeRemaining() > 0) {
      const mutation = this.pendingMutations.shift()
      this.callback([mutation])
    }

    if (this.pendingMutations.length > 0) {
      requestIdleCallback((deadline) => {
        this.processMutations(deadline)
      })
    } else {
      this.isScheduled = false
    }
  }
}

// 8. Метрики производительности
class ObserverMetrics {
  constructor(target, config, callback) {
    this.metrics = {
      totalMutations: 0,
      processingTime: 0,
      callCount: 0,
      averageTime: 0
    }

    this.observer = new MutationObserver((mutations) => {
      const startTime = performance.now()

      this.metrics.totalMutations += mutations.length
      this.metrics.callCount++

      callback(mutations)

      const endTime = performance.now()
      const duration = endTime - startTime

      this.metrics.processingTime += duration
      this.metrics.averageTime = this.metrics.processingTime / this.metrics.callCount

      if (duration > 16) { // Больше одного фрейма (60fps)
        console.warn(\`⚠️ Медленная обработка: \${duration.toFixed(2)}ms\`)
      }
    })

    this.observer.observe(target, config)
  }

  getMetrics() {
    return {
      ...this.metrics,
      mutationsPerCall: this.metrics.totalMutations / this.metrics.callCount
    }
  }

  logMetrics() {
    console.table(this.getMetrics())
  }
}

const metricsObserver = new ObserverMetrics(
  document.body,
  { childList: true, subtree: true },
  (mutations) => {
    // Обработка мутаций
  }
)

// Логируем метрики каждые 10 секунд
setInterval(() => {
  metricsObserver.logMetrics()
}, 10000)
`

const highlightedBasicExample = ref('')
const highlightedMutationTypes = ref('')
const highlightedConfigOptions = ref('')
const highlightedPracticalExamples = ref('')
const highlightedRealWorldExamples = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedBasicExample.value = Prism.highlight(basicExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedMutationTypes.value = Prism.highlight(mutationTypesSnippet, Prism.languages.javascript, 'javascript')
  highlightedConfigOptions.value = Prism.highlight(configOptionsSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedRealWorldExamples.value = Prism.highlight(realWorldExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedPerformance.value = Prism.highlight(performanceSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              MutationObserver в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>MutationObserver</b> — это Web API для отслеживания изменений в DOM-дереве.
              Он асинхронно наблюдает за добавлением/удалением элементов, изменением атрибутов
              и текстового содержимого, предоставляя мощный механизм реагирования на DOM-мутации.
            </p>

            <!-- Основные концепции -->
            <h2 class="text-h5 font-weight-bold mb-3">Основные концепции</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-eye</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Наблюдатель</h3>
                  <p class="text-body-2">Объект MutationObserver следит за изменениями в указанном узле DOM</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-cog</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Конфигурация</h3>
                  <p class="text-body-2">Настройка определяет какие типы изменений отслеживать</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-flash</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Callback</h3>
                  <p class="text-body-2">Функция вызывается асинхронно при обнаружении изменений</p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Базовый пример -->
            <h2 class="text-h5 font-weight-bold mb-3">Базовый пример использования</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> MutationObserver работает асинхронно - callback вызывается в микрозадаче
              после завершения текущего кода.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicExample"></code></pre>

            <!-- Типы мутаций -->
            <h2 class="text-h5 font-weight-bold mb-3">Типы мутаций и их особенности</h2>
            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип мутации</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Свойства MutationRecord</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>childList</code></td>
                <td>Добавление/удаление дочерних элементов</td>
                <td><code>addedNodes</code>, <code>removedNodes</code>, <code>previousSibling</code>, <code>nextSibling</code></td>
              </tr>
              <tr>
                <td><code>attributes</code></td>
                <td>Изменение атрибутов элемента</td>
                <td><code>attributeName</code>, <code>oldValue</code></td>
              </tr>
              <tr>
                <td><code>characterData</code></td>
                <td>Изменение текстового содержимого</td>
                <td><code>oldValue</code>, <code>target.data</code></td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMutationTypes"></code></pre>

            <!-- Опции конфигурации -->
            <h2 class="text-h5 font-weight-bold mb-3">Опции конфигурации</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Основные опции</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>childList</code> — отслеживать дочерние элементы</li>
                    <li><code>attributes</code> — отслеживать атрибуты</li>
                    <li><code>characterData</code> — отслеживать текст</li>
                    <li><code>subtree</code> — применять ко всему поддереву</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Дополнительные опции</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>attributeOldValue</code> — сохранять старые значения</li>
                    <li><code>characterDataOldValue</code> — сохранять старый текст</li>
                    <li><code>attributeFilter</code> — фильтр атрибутов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConfigOptions"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-lightbulb</v-icon>
              <strong>Совет:</strong> MutationObserver идеален для реакции на изменения DOM, которые вы не контролируете
              (сторонние библиотеки, расширения браузера, динамический контент).
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Реальные примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Реальные сценарии из практики</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorldExamples"></code></pre>

            <!-- Use cases -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные сценарии применения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-monitor-dashboard</v-icon>
                    <h3 class="text-h6 font-weight-bold">Мониторинг и аналитика</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Отслеживание изменений на странице для аналитики</li>
                    <li>Мониторинг производительности рендеринга</li>
                    <li>Обнаружение изменений контента страницы</li>
                    <li>Трекинг пользовательских действий через DOM</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-auto-fix</v-icon>
                    <h3 class="text-h6 font-weight-bold">Автоматизация и реакция</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Автосохранение при редактировании контента</li>
                    <li>Анимация появления новых элементов</li>
                    <li>Ленивая загрузка изображений при появлении в DOM</li>
                    <li>Синхронизация между элементами интерфейса</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-shield-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Безопасность</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Обнаружение инъекции вредоносных скриптов</li>
                    <li>Мониторинг несанкционированных изменений</li>
                    <li>Защита от XSS через контроль DOM</li>
                    <li>Обнаружение подозрительной активности расширений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-puzzle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Интеграция</h3>
                  </div>
                  <ul class="pl-4 text-body-2">
                    <li>Адаптация к изменениям сторонних библиотек</li>
                    <li>Интеграция с legacy кодом</li>
                    <li>Обработка динамически загружаемого контента</li>
                    <li>Работа с SPA-фреймворками без прямого доступа</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Производительность -->
            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно для производительности:</strong> MutationObserver может вызываться очень часто.
              Используйте debounce/throttle, batch-обработку и отключайте наблюдение когда оно не нужно.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <!-- MutationObserver vs другие API -->
            <h2 class="text-h5 font-weight-bold mb-3">MutationObserver vs другие подходы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Преимущества</th>
                <th class="text-left font-weight-bold">Недостатки</th>
                <th class="text-left font-weight-bold">Когда использовать</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>MutationObserver</b></td>
                <td>Асинхронный, эффективный, batch обработка, поддержка всех типов изменений</td>
                <td>Сложнее в использовании, требует понимания конфигурации</td>
                <td>Отслеживание изменений DOM, которые вы не контролируете</td>
              </tr>
              <tr>
                <td><b>DOM Events</b></td>
                <td>Простые, синхронные, встроенная поддержка</td>
                <td>Только для определенных событий, не все изменения генерируют события</td>
                <td>Пользовательские взаимодействия (click, input, change)</td>
              </tr>
              <tr>
                <td><b>setInterval</b></td>
                <td>Очень простой</td>
                <td>Неэффективный, может пропускать изменения или вызываться зря</td>
                <td>Только для прототипирования, не для продакшена</td>
              </tr>
              <tr>
                <td><b>Proxy</b></td>
                <td>Контроль изменений на уровне данных</td>
                <td>Не работает с DOM напрямую, требует обертывания</td>
                <td>Реактивность данных (Vue, MobX)</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое MutationObserver и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  MutationObserver — это Web API для асинхронного наблюдения за изменениями в DOM-дереве.
                  Позволяет реагировать на добавление/удаление элементов, изменение атрибутов и текста.
                  Используется для мониторинга, автоматизации, безопасности и интеграции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем MutationObserver лучше setInterval для отслеживания DOM?</p>
                <p class="font-weight-regular ma-0">
                  MutationObserver асинхронный, срабатывает только при реальных изменениях (не вхолостую),
                  использует batch-обработку (эффективнее), предоставляет детальную информацию о мутациях.
                  setInterval работает постоянно даже без изменений, синхронный, менее эффективный.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие типы изменений может отслеживать MutationObserver?</p>
                <p class="font-weight-regular ma-0">
                  Три основных типа: <code>childList</code> (добавление/удаление элементов),
                  <code>attributes</code> (изменение атрибутов), <code>characterData</code> (изменение текста).
                  Также поддерживает <code>subtree</code> для наблюдения за всем поддеревом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать производительность MutationObserver?</p>
                <p class="font-weight-regular ma-0">
                  Использовать debounce/throttle, batch DOM операции (DocumentFragment),
                  отключать observer при неактивности страницы, использовать <code>attributeFilter</code>
                  для конкретных атрибутов, избегать тяжелых операций в callback.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между disconnect() и takeRecords()?</p>
                <p class="font-weight-regular ma-0">
                  <code>disconnect()</code> останавливает наблюдение и очищает очередь мутаций.
                  <code>takeRecords()</code> возвращает накопленные мутации без вызова callback
                  и очищает очередь, но НЕ останавливает наблюдение. Полезно для синхронной обработки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ стоит использовать MutationObserver?</p>
                <p class="font-weight-regular ma-0">
                  Не используйте для пользовательских событий (click, input) — есть DOM events.
                  Не используйте для контроля собственного кода — лучше структурировать логику.
                  Не используйте для реактивности данных — есть Proxy, Vue, React hooks.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как MutationObserver работает с Shadow DOM?</p>
                <p class="font-weight-regular ma-0">
                  MutationObserver наблюдает только за деревом, на котором вызван <code>observe()</code>.
                  Для Shadow DOM нужно создать отдельный observer на shadowRoot.
                  Изменения внутри Shadow DOM не видны observer'у, подключенному к light DOM.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Отключать observer когда не нужен</li>
                    <li>Использовать attributeFilter для конкретных атрибутов</li>
                    <li>Batch DOM операции (DocumentFragment)</li>
                    <li>Debounce/throttle частые изменения</li>
                    <li>Проверять nodeType перед обработкой</li>
                    <li>Использовать WeakSet для отслеженных элементов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Тяжелых операций в callback</li>
                    <li>Модификации DOM внутри callback (цикл)</li>
                    <li>Наблюдения без необходимости (subtree: true)</li>
                    <li>Забывать вызывать disconnect()</li>
                    <li>Использовать для событий (click, input)</li>
                    <li>Блокирующих операций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Асинхронность callback (микрозадача)</li>
                    <li>Производительность при частых мутациях</li>
                    <li>Shadow DOM требует отдельный observer</li>
                    <li>Утечки памяти при незакрытых observers</li>
                    <li>Порядок обработки мутаций</li>
                    <li>Совместимость (IE не поддерживает)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>MutationObserver</b> — мощный инструмент для отслеживания изменений в DOM.
              Он асинхронный, эффективный и предоставляет детальную информацию о мутациях.
              Основные применения: мониторинг, автоматизация, безопасность, интеграция со сторонним кодом.
              Ключевые моменты: правильная конфигурация, оптимизация производительности (debounce, batch),
              управление жизненным циклом (disconnect). Не заменяет DOM events для пользовательских взаимодействий
              и не подходит для реактивности данных (лучше использовать Proxy или фреймворки).
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver"
                target="_blank"
                class="mr-2">
                MDN MutationObserver
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://javascript.info/mutation-observer"
                target="_blank"
                class="mr-2">
                JavaScript.info
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://dom.spec.whatwg.org/#mutation-observers"
                target="_blank">
                Спецификация WHATWG
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
