<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const localStorageSnippet = `
// =====================================
// LOCALSTORAGE + STORAGE EVENT
// =====================================

// 1. Базовая синхронизация через localStorage
class CartSync {
  constructor() {
    this.cart = this.loadCart()
    this.listeners = new Set()

    // Подписываемся на изменения в других вкладках
    window.addEventListener('storage', this.handleStorageChange.bind(this))
  }

  loadCart() {
    try {
      const data = localStorage.getItem('cart')
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading cart:', error)
      return []
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart = cart

      // Уведомляем подписчиков в ТЕКУЩЕЙ вкладке
      this.notifyListeners(cart)
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  handleStorageChange(event) {
    // Storage event срабатывает только в ДРУГИХ вкладках
    if (event.key === 'cart' && event.newValue !== null) {
      try {
        const newCart = JSON.parse(event.newValue)
        this.cart = newCart

        // Уведомляем подписчиков об изменении из другой вкладки
        this.notifyListeners(newCart)
      } catch (error) {
        console.error('Error parsing cart:', error)
      }
    }
  }

  addItem(item) {
    const cart = [...this.cart, { ...item, id: Date.now() }]
    this.saveCart(cart)
  }

  removeItem(itemId) {
    const cart = this.cart.filter(item => item.id !== itemId)
    this.saveCart(cart)
  }

  updateQuantity(itemId, quantity) {
    const cart = this.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    this.saveCart(cart)
  }

  clearCart() {
    this.saveCart([])
  }

  subscribe(callback) {
    this.listeners.add(callback)

    // Возвращаем функцию отписки
    return () => this.listeners.delete(callback)
  }

  notifyListeners(cart) {
    this.listeners.forEach(callback => callback(cart))
  }

  getCart() {
    return [...this.cart]
  }
}

// Использование
const cartSync = new CartSync()

// Подписываемся на изменения
const unsubscribe = cartSync.subscribe((cart) => {
  console.log('Cart updated:', cart)
  updateUI(cart)
})

// Добавляем товар
cartSync.addItem({
  name: 'iPhone 15',
  price: 999,
  quantity: 1
})

// Удаляем товар
cartSync.removeItem(itemId)

// Отписываемся
unsubscribe()
`

const broadcastChannelSnippet = `
// =====================================
// BROADCAST CHANNEL API
// =====================================

// 1. Базовая реализация через BroadcastChannel
class CartSyncBroadcast {
  constructor() {
    this.cart = this.loadCart()
    this.listeners = new Set()

    // Создаем канал для коммуникации между вкладками
    this.channel = new BroadcastChannel('cart-sync')

    // Подписываемся на сообщения из других вкладок
    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    try {
      const data = localStorage.getItem('cart')
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error loading cart:', error)
      return []
    }
  }

  saveCart(cart) {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
      this.cart = cart

      // Отправляем сообщение во ВСЕ другие вкладки
      this.channel.postMessage({
        type: 'CART_UPDATED',
        cart: cart,
        timestamp: Date.now()
      })

      // Уведомляем подписчиков в текущей вкладке
      this.notifyListeners(cart)
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  handleMessage(event) {
    const { type, cart } = event.data

    if (type === 'CART_UPDATED') {
      this.cart = cart

      // Обновляем localStorage в этой вкладке
      localStorage.setItem('cart', JSON.stringify(cart))

      // Уведомляем подписчиков
      this.notifyListeners(cart)
    }
  }

  addItem(item) {
    const cart = [...this.cart, { ...item, id: Date.now() }]
    this.saveCart(cart)
  }

  removeItem(itemId) {
    const cart = this.cart.filter(item => item.id !== itemId)
    this.saveCart(cart)
  }

  updateQuantity(itemId, quantity) {
    const cart = this.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    this.saveCart(cart)
  }

  subscribe(callback) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  notifyListeners(cart) {
    this.listeners.forEach(callback => callback(cart))
  }

  getCart() {
    return [...this.cart]
  }

  destroy() {
    // Закрываем канал при уничтожении
    this.channel.close()
  }
}

// Использование
const cartSync = new CartSyncBroadcast()

cartSync.subscribe((cart) => {
  console.log('Cart synced across tabs:', cart)
  renderCart(cart)
})

// 2. Расширенная версия с разными типами сообщений
class AdvancedCartSync {
  constructor() {
    this.cart = this.loadCart()
    this.listeners = new Map() // type -> Set<callback>
    this.channel = new BroadcastChannel('cart-sync-advanced')

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  handleMessage(event) {
    const { type, payload } = event.data

    switch (type) {
      case 'ITEM_ADDED':
        this.handleItemAdded(payload)
        break

      case 'ITEM_REMOVED':
        this.handleItemRemoved(payload)
        break

      case 'QUANTITY_UPDATED':
        this.handleQuantityUpdated(payload)
        break

      case 'CART_CLEARED':
        this.handleCartCleared()
        break

      case 'REQUEST_SYNC':
        // Другая вкладка запрашивает текущее состояние
        this.sendFullSync()
        break

      case 'FULL_SYNC':
        // Получили полное состояние от другой вкладки
        this.cart = payload.cart
        localStorage.setItem('cart', JSON.stringify(this.cart))
        this.notify('SYNCED', this.cart)
        break
    }
  }

  handleItemAdded(item) {
    this.cart.push(item)
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.notify('ITEM_ADDED', item)
  }

  handleItemRemoved(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId)
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.notify('ITEM_REMOVED', itemId)
  }

  handleQuantityUpdated({ itemId, quantity }) {
    this.cart = this.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.notify('QUANTITY_UPDATED', { itemId, quantity })
  }

  handleCartCleared() {
    this.cart = []
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.notify('CART_CLEARED', null)
  }

  addItem(item) {
    const newItem = { ...item, id: Date.now() }
    this.cart.push(newItem)
    localStorage.setItem('cart', JSON.stringify(this.cart))

    // Отправляем сообщение в другие вкладки
    this.channel.postMessage({
      type: 'ITEM_ADDED',
      payload: newItem
    })

    this.notify('ITEM_ADDED', newItem)
  }

  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId)
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.channel.postMessage({
      type: 'ITEM_REMOVED',
      payload: itemId
    })

    this.notify('ITEM_REMOVED', itemId)
  }

  updateQuantity(itemId, quantity) {
    this.cart = this.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.channel.postMessage({
      type: 'QUANTITY_UPDATED',
      payload: { itemId, quantity }
    })

    this.notify('QUANTITY_UPDATED', { itemId, quantity })
  }

  clearCart() {
    this.cart = []
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.channel.postMessage({
      type: 'CART_CLEARED'
    })

    this.notify('CART_CLEARED', null)
  }

  // Запрос синхронизации (при открытии новой вкладки)
  requestSync() {
    this.channel.postMessage({
      type: 'REQUEST_SYNC'
    })
  }

  // Отправка полного состояния
  sendFullSync() {
    this.channel.postMessage({
      type: 'FULL_SYNC',
      payload: { cart: this.cart }
    })
  }

  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type).add(callback)

    return () => this.listeners.get(type)?.delete(callback)
  }

  notify(type, payload) {
    const callbacks = this.listeners.get(type)
    if (callbacks) {
      callbacks.forEach(callback => callback(payload))
    }
  }

  getCart() {
    return [...this.cart]
  }

  destroy() {
    this.channel.close()
    this.listeners.clear()
  }
}

// Использование
const cart = new AdvancedCartSync()

// При загрузке страницы запрашиваем синхронизацию
window.addEventListener('load', () => {
  cart.requestSync()
})

// Подписываемся на разные события
cart.subscribe('ITEM_ADDED', (item) => {
  console.log('Item added:', item)
  showNotification(\`Added \${item.name} to cart\`)
})

cart.subscribe('ITEM_REMOVED', (itemId) => {
  console.log('Item removed:', itemId)
})

cart.subscribe('SYNCED', (fullCart) => {
  console.log('Cart synced:', fullCart)
  renderCart(fullCart)
})
`

const sharedWorkerSnippet = `
// =====================================
// SHARED WORKER (продвинутый подход)
// =====================================

// cart-worker.js - Shared Worker файл
// Этот код работает в отдельном потоке, общем для всех вкладок

let cart = []
const connections = new Set()

// Загружаем корзину из IndexedDB при старте
async function loadCart() {
  // Используем IndexedDB для персистентности
  const db = await openDB()
  const tx = db.transaction('cart', 'readonly')
  const store = tx.objectStore('cart')
  cart = await store.getAll()
}

async function saveCart() {
  const db = await openDB()
  const tx = db.transaction('cart', 'readwrite')
  const store = tx.objectStore('cart')
  await store.clear()
  for (const item of cart) {
    await store.add(item)
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CartDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' })
      }
    }
  })
}

// Обработка подключений от вкладок
self.onconnect = async (event) => {
  const port = event.ports[0]
  connections.add(port)

  // Загружаем корзину если еще не загружена
  if (cart.length === 0) {
    await loadCart()
  }

  // Отправляем текущее состояние корзины новой вкладке
  port.postMessage({
    type: 'INIT',
    cart: cart
  })

  port.onmessage = async (messageEvent) => {
    const { type, payload } = messageEvent.data

    switch (type) {
      case 'ADD_ITEM':
        cart.push(payload)
        await saveCart()
        broadcast({ type: 'ITEM_ADDED', payload })
        break

      case 'REMOVE_ITEM':
        cart = cart.filter(item => item.id !== payload)
        await saveCart()
        broadcast({ type: 'ITEM_REMOVED', payload })
        break

      case 'UPDATE_QUANTITY':
        cart = cart.map(item =>
          item.id === payload.itemId
            ? { ...item, quantity: payload.quantity }
            : item
        )
        await saveCart()
        broadcast({ type: 'QUANTITY_UPDATED', payload })
        break

      case 'CLEAR_CART':
        cart = []
        await saveCart()
        broadcast({ type: 'CART_CLEARED' })
        break

      case 'GET_CART':
        port.postMessage({
          type: 'CART_DATA',
          cart: cart
        })
        break
    }
  }

  port.onmessageerror = (error) => {
    console.error('Message error:', error)
  }

  // Удаляем подключение при закрытии
  port.start()
}

function broadcast(message) {
  connections.forEach(port => {
    try {
      port.postMessage(message)
    } catch (error) {
      // Порт закрыт, удаляем
      connections.delete(port)
    }
  })
}

// main.js - Код в основной вкладке
class CartSyncWorker {
  constructor() {
    this.cart = []
    this.listeners = new Set()
    this.worker = new SharedWorker('cart-worker.js')

    // Обработка сообщений от worker
    this.worker.port.onmessage = this.handleMessage.bind(this)

    // Запускаем подключение
    this.worker.port.start()
  }

  handleMessage(event) {
    const { type, payload, cart } = event.data

    switch (type) {
      case 'INIT':
        this.cart = cart
        this.notifyListeners(this.cart)
        break

      case 'ITEM_ADDED':
        this.cart.push(payload)
        this.notifyListeners(this.cart)
        break

      case 'ITEM_REMOVED':
        this.cart = this.cart.filter(item => item.id !== payload)
        this.notifyListeners(this.cart)
        break

      case 'QUANTITY_UPDATED':
        this.cart = this.cart.map(item =>
          item.id === payload.itemId
            ? { ...item, quantity: payload.quantity }
            : item
        )
        this.notifyListeners(this.cart)
        break

      case 'CART_CLEARED':
        this.cart = []
        this.notifyListeners(this.cart)
        break

      case 'CART_DATA':
        this.cart = cart
        this.notifyListeners(this.cart)
        break
    }
  }

  addItem(item) {
    const newItem = { ...item, id: Date.now() }
    this.worker.port.postMessage({
      type: 'ADD_ITEM',
      payload: newItem
    })
  }

  removeItem(itemId) {
    this.worker.port.postMessage({
      type: 'REMOVE_ITEM',
      payload: itemId
    })
  }

  updateQuantity(itemId, quantity) {
    this.worker.port.postMessage({
      type: 'UPDATE_QUANTITY',
      payload: { itemId, quantity }
    })
  }

  clearCart() {
    this.worker.port.postMessage({
      type: 'CLEAR_CART'
    })
  }

  refreshCart() {
    this.worker.port.postMessage({
      type: 'GET_CART'
    })
  }

  subscribe(callback) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  notifyListeners(cart) {
    this.listeners.forEach(callback => callback(cart))
  }

  getCart() {
    return [...this.cart]
  }
}

// Использование
const cartSync = new CartSyncWorker()

cartSync.subscribe((cart) => {
  console.log('Cart updated via SharedWorker:', cart)
  renderCart(cart)
})

cartSync.addItem({
  name: 'MacBook Pro',
  price: 2499,
  quantity: 1
})
`

const reactExampleSnippet = `
// =====================================
// REACT ИНТЕГРАЦИЯ
// =====================================

import { useState, useEffect, useContext, createContext } from 'react'

// 1. Хук для синхронизации через localStorage
function useCartSync() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Загружаем корзину при монтировании
    const loadCart = () => {
      try {
        const data = localStorage.getItem('cart')
        if (data) {
          setCart(JSON.parse(data))
        }
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }

    loadCart()

    // Подписываемся на изменения из других вкладок
    const handleStorageChange = (event) => {
      if (event.key === 'cart' && event.newValue) {
        try {
          const newCart = JSON.parse(event.newValue)
          setCart(newCart)
        } catch (error) {
          console.error('Error parsing cart:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const saveCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const addItem = (item) => {
    const newCart = [...cart, { ...item, id: Date.now() }]
    saveCart(newCart)
  }

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId)
    saveCart(newCart)
  }

  const updateQuantity = (itemId, quantity) => {
    const newCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    saveCart(newCart)
  }

  const clearCart = () => {
    saveCart([])
  }

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
}

// Компонент корзины
function Cart() {
  const { cart, addItem, removeItem, updateQuantity } = useCartSync()

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - \${item.price} x {item.quantity}
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 2. Хук для BroadcastChannel
function useCartSyncBroadcast() {
  const [cart, setCart] = useState([])
  const channelRef = useRef(null)

  useEffect(() => {
    // Загружаем корзину
    const data = localStorage.getItem('cart')
    if (data) {
      setCart(JSON.parse(data))
    }

    // Создаем канал
    channelRef.current = new BroadcastChannel('cart-sync')

    // Подписываемся на сообщения
    channelRef.current.onmessage = (event) => {
      const { type, cart: newCart } = event.data

      if (type === 'CART_UPDATED') {
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
      }
    }

    return () => {
      channelRef.current?.close()
    }
  }, [])

  const updateCart = useCallback((newCart) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))

    // Отправляем в другие вкладки
    channelRef.current?.postMessage({
      type: 'CART_UPDATED',
      cart: newCart
    })
  }, [])

  const addItem = useCallback((item) => {
    const newCart = [...cart, { ...item, id: Date.now() }]
    updateCart(newCart)
  }, [cart, updateCart])

  const removeItem = useCallback((itemId) => {
    const newCart = cart.filter(item => item.id !== itemId)
    updateCart(newCart)
  }, [cart, updateCart])

  const updateQuantity = useCallback((itemId, quantity) => {
    const newCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    updateCart(newCart)
  }, [cart, updateCart])

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity
  }
}

// 3. Context для глобального доступа
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const cart = useCartSyncBroadcast()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

// Использование
function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Cart />
    </CartProvider>
  )
}

function ProductList() {
  const { addItem } = useCart()

  const products = [
    { name: 'iPhone 15', price: 999 },
    { name: 'MacBook Pro', price: 2499 },
    { name: 'AirPods Pro', price: 249 }
  ]

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.name}>
          {product.name} - \${product.price}
          <button onClick={() => addItem({ ...product, quantity: 1 })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

function Header() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header>
      <h1>Shop</h1>
      <div>Cart: {totalItems} items</div>
    </header>
  )
}
`

const conflictResolutionSnippet = `
// =====================================
// РАЗРЕШЕНИЕ КОНФЛИКТОВ
// =====================================

// 1. Last-Write-Wins (LWW) - побеждает последняя запись
class CartSyncLWW {
  constructor() {
    this.cart = this.loadCart()
    this.version = Date.now()
    this.channel = new BroadcastChannel('cart-sync-lww')

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    try {
      const data = localStorage.getItem('cart-data')
      if (data) {
        const { cart, version } = JSON.parse(data)
        this.version = version
        return cart
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
    return []
  }

  saveCart(cart) {
    const version = Date.now()
    const data = { cart, version }

    localStorage.setItem('cart-data', JSON.stringify(data))
    this.cart = cart
    this.version = version

    // Отправляем с версией
    this.channel.postMessage({
      type: 'CART_UPDATED',
      cart,
      version
    })
  }

  handleMessage(event) {
    const { type, cart, version } = event.data

    if (type === 'CART_UPDATED') {
      // Принимаем только если версия новее
      if (version > this.version) {
        this.cart = cart
        this.version = version
        localStorage.setItem('cart-data', JSON.stringify({ cart, version }))
        this.notifyListeners(cart)
      }
    }
  }

  addItem(item) {
    const cart = [...this.cart, { ...item, id: Date.now() }]
    this.saveCart(cart)
  }

  // ... остальные методы
}

// 2. Operation-based CRDT (Conflict-free Replicated Data Type)
class CartSyncCRDT {
  constructor(replicaId = Math.random().toString(36).substr(2, 9)) {
    this.replicaId = replicaId
    this.items = new Map() // itemId -> { data, operations }
    this.operations = [] // Лог операций
    this.channel = new BroadcastChannel('cart-sync-crdt')

    this.loadState()
    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadState() {
    try {
      const data = localStorage.getItem('cart-crdt')
      if (data) {
        const { items, operations } = JSON.parse(data)
        this.items = new Map(items)
        this.operations = operations
      }
    } catch (error) {
      console.error('Error loading state:', error)
    }
  }

  saveState() {
    const state = {
      items: Array.from(this.items.entries()),
      operations: this.operations
    }
    localStorage.setItem('cart-crdt', JSON.stringify(state))
  }

  createOperation(type, payload) {
    return {
      type,
      payload,
      replicaId: this.replicaId,
      timestamp: Date.now(),
      id: \`\${this.replicaId}-\${Date.now()}-\${Math.random()}\`
    }
  }

  applyOperation(operation) {
    switch (operation.type) {
      case 'ADD_ITEM':
        this.items.set(operation.payload.id, {
          ...operation.payload,
          operations: [operation]
        })
        break

      case 'REMOVE_ITEM':
        this.items.delete(operation.payload.itemId)
        break

      case 'UPDATE_QUANTITY': {
        const item = this.items.get(operation.payload.itemId)
        if (item) {
          item.quantity = operation.payload.quantity
          item.operations.push(operation)
        }
        break
      }
    }

    this.operations.push(operation)
    this.saveState()
  }

  addItem(item) {
    const newItem = { ...item, id: Date.now() }
    const operation = this.createOperation('ADD_ITEM', newItem)

    this.applyOperation(operation)
    this.channel.postMessage(operation)
  }

  removeItem(itemId) {
    const operation = this.createOperation('REMOVE_ITEM', { itemId })

    this.applyOperation(operation)
    this.channel.postMessage(operation)
  }

  updateQuantity(itemId, quantity) {
    const operation = this.createOperation('UPDATE_QUANTITY', {
      itemId,
      quantity
    })

    this.applyOperation(operation)
    this.channel.postMessage(operation)
  }

  handleMessage(event) {
    const operation = event.data

    // Проверяем, не применяли ли мы уже эту операцию
    const exists = this.operations.some(op => op.id === operation.id)

    if (!exists) {
      this.applyOperation(operation)
      this.notifyListeners(this.getCart())
    }
  }

  getCart() {
    return Array.from(this.items.values())
  }

  // Разрешение конфликтов для одновременных обновлений количества
  resolveQuantityConflict(itemId) {
    const item = this.items.get(itemId)
    if (!item || !item.operations) return

    // Сортируем операции по timestamp
    const sortedOps = item.operations.sort((a, b) =>
      a.timestamp - b.timestamp
    )

    // Применяем операции в порядке timestamp
    let finalQuantity = 0
    for (const op of sortedOps) {
      if (op.type === 'UPDATE_QUANTITY') {
        finalQuantity = op.payload.quantity
      }
    }

    item.quantity = finalQuantity
  }
}

// 3. Merge strategy с приоритетами
class CartSyncMerge {
  constructor() {
    this.cart = this.loadCart()
    this.pendingChanges = new Map()
    this.channel = new BroadcastChannel('cart-sync-merge')

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    this.cart = cart
  }

  mergeChanges(remoteCart) {
    const localMap = new Map(this.cart.map(item => [item.id, item]))
    const remoteMap = new Map(remoteCart.map(item => [item.id, item]))
    const merged = new Map()

    // Проходим по локальным элементам
    for (const [id, localItem] of localMap) {
      const remoteItem = remoteMap.get(id)

      if (!remoteItem) {
        // Элемент есть только локально - оставляем
        merged.set(id, localItem)
      } else {
        // Элемент есть в обеих версиях - мержим
        const mergedItem = this.mergeItem(localItem, remoteItem)
        merged.set(id, mergedItem)
      }
    }

    // Добавляем элементы, которые есть только в remote
    for (const [id, remoteItem] of remoteMap) {
      if (!localMap.has(id)) {
        merged.set(id, remoteItem)
      }
    }

    return Array.from(merged.values())
  }

  mergeItem(local, remote) {
    // Стратегия: берем максимальное количество
    return {
      ...local,
      quantity: Math.max(local.quantity, remote.quantity),
      lastModified: Math.max(
        local.lastModified || 0,
        remote.lastModified || 0
      )
    }
  }

  addItem(item) {
    const newItem = {
      ...item,
      id: Date.now(),
      lastModified: Date.now()
    }

    const cart = [...this.cart, newItem]
    this.saveCart(cart)

    this.channel.postMessage({
      type: 'CART_UPDATED',
      cart
    })
  }

  handleMessage(event) {
    if (event.data.type === 'CART_UPDATED') {
      const mergedCart = this.mergeChanges(event.data.cart)
      this.saveCart(mergedCart)
      this.notifyListeners(mergedCart)
    }
  }
}
`

const performanceSnippet = `
// =====================================
// ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
// =====================================

// 1. Debounce для частых изменений
class OptimizedCartSync {
  constructor() {
    this.cart = this.loadCart()
    this.channel = new BroadcastChannel('cart-sync-optimized')
    this.saveTimeout = null
    this.SAVE_DELAY = 300 // мс

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  // Debounced save
  saveCart(cart) {
    this.cart = cart

    // Отменяем предыдущий таймер
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
    }

    // Откладываем сохранение
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart))

      // Отправляем в другие вкладки
      this.channel.postMessage({
        type: 'CART_UPDATED',
        cart,
        timestamp: Date.now()
      })

      this.saveTimeout = null
    }, this.SAVE_DELAY)
  }

  // Немедленное сохранение (для важных операций)
  saveCartImmediate(cart) {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout)
      this.saveTimeout = null
    }

    this.cart = cart
    localStorage.setItem('cart', JSON.stringify(cart))

    this.channel.postMessage({
      type: 'CART_UPDATED',
      cart,
      timestamp: Date.now()
    })
  }

  updateQuantity(itemId, quantity) {
    const cart = this.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )

    // Используем debounced save для частых изменений
    this.saveCart(cart)
  }

  removeItem(itemId) {
    const cart = this.cart.filter(item => item.id !== itemId)

    // Немедленное сохранение для удаления
    this.saveCartImmediate(cart)
  }

  handleMessage(event) {
    if (event.data.type === 'CART_UPDATED') {
      this.cart = event.data.cart

      // Обновляем localStorage только если это не наше сообщение
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.notifyListeners(this.cart)
    }
  }
}

// 2. Incremental updates - отправляем только изменения
class IncrementalCartSync {
  constructor() {
    this.cart = this.loadCart()
    this.channel = new BroadcastChannel('cart-sync-incremental')

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    this.cart = cart
  }

  // Отправляем только конкретное изменение
  addItem(item) {
    const newItem = { ...item, id: Date.now() }
    this.cart.push(newItem)
    this.saveCart(this.cart)

    // Отправляем только добавленный элемент
    this.channel.postMessage({
      type: 'ITEM_ADDED',
      item: newItem
    })
  }

  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId)
    this.saveCart(this.cart)

    // Отправляем только ID удаленного элемента
    this.channel.postMessage({
      type: 'ITEM_REMOVED',
      itemId
    })
  }

  updateQuantity(itemId, quantity) {
    const item = this.cart.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
      this.saveCart(this.cart)

      // Отправляем только обновление
      this.channel.postMessage({
        type: 'QUANTITY_UPDATED',
        itemId,
        quantity
      })
    }
  }

  handleMessage(event) {
    const { type, item, itemId, quantity } = event.data

    switch (type) {
      case 'ITEM_ADDED':
        if (!this.cart.find(i => i.id === item.id)) {
          this.cart.push(item)
          this.saveCart(this.cart)
          this.notifyListeners(this.cart)
        }
        break

      case 'ITEM_REMOVED':
        const indexToRemove = this.cart.findIndex(i => i.id === itemId)
        if (indexToRemove !== -1) {
          this.cart.splice(indexToRemove, 1)
          this.saveCart(this.cart)
          this.notifyListeners(this.cart)
        }
        break

      case 'QUANTITY_UPDATED':
        const itemToUpdate = this.cart.find(i => i.id === itemId)
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity
          this.saveCart(this.cart)
          this.notifyListeners(this.cart)
        }
        break
    }
  }
}

// 3. Batching - группируем изменения
class BatchedCartSync {
  constructor() {
    this.cart = this.loadCart()
    this.channel = new BroadcastChannel('cart-sync-batched')
    this.pendingUpdates = []
    this.batchTimeout = null
    this.BATCH_DELAY = 100 // мс

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  loadCart() {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  }

  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
    this.cart = cart
  }

  queueUpdate(update) {
    this.pendingUpdates.push(update)

    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout)
    }

    this.batchTimeout = setTimeout(() => {
      this.flushUpdates()
    }, this.BATCH_DELAY)
  }

  flushUpdates() {
    if (this.pendingUpdates.length === 0) return

    // Применяем все обновления
    for (const update of this.pendingUpdates) {
      this.applyUpdate(update)
    }

    this.saveCart(this.cart)

    // Отправляем батч обновлений
    this.channel.postMessage({
      type: 'BATCH_UPDATE',
      updates: this.pendingUpdates,
      timestamp: Date.now()
    })

    this.pendingUpdates = []
    this.batchTimeout = null
  }

  applyUpdate(update) {
    switch (update.type) {
      case 'ADD_ITEM':
        this.cart.push(update.item)
        break

      case 'REMOVE_ITEM':
        this.cart = this.cart.filter(item => item.id !== update.itemId)
        break

      case 'UPDATE_QUANTITY':
        const item = this.cart.find(item => item.id === update.itemId)
        if (item) {
          item.quantity = update.quantity
        }
        break
    }
  }

  addItem(item) {
    this.queueUpdate({
      type: 'ADD_ITEM',
      item: { ...item, id: Date.now() }
    })
  }

  removeItem(itemId) {
    this.queueUpdate({
      type: 'REMOVE_ITEM',
      itemId
    })
  }

  updateQuantity(itemId, quantity) {
    this.queueUpdate({
      type: 'UPDATE_QUANTITY',
      itemId,
      quantity
    })
  }

  handleMessage(event) {
    if (event.data.type === 'BATCH_UPDATE') {
      for (const update of event.data.updates) {
        this.applyUpdate(update)
      }

      this.saveCart(this.cart)
      this.notifyListeners(this.cart)
    }
  }

  destroy() {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout)
      this.flushUpdates() // Сохраняем pending изменения
    }
    this.channel.close()
  }
}

// 4. Compression для больших корзин
class CompressedCartSync {
  constructor() {
    this.cart = this.loadCart()
    this.channel = new BroadcastChannel('cart-sync-compressed')

    this.channel.onmessage = this.handleMessage.bind(this)
  }

  async loadCart() {
    try {
      const compressed = localStorage.getItem('cart-compressed')
      if (compressed) {
        const decompressed = await this.decompress(compressed)
        return JSON.parse(decompressed)
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
    return []
  }

  async saveCart(cart) {
    this.cart = cart

    const json = JSON.stringify(cart)
    const compressed = await this.compress(json)

    localStorage.setItem('cart-compressed', compressed)

    // Отправляем сжатые данные
    this.channel.postMessage({
      type: 'CART_UPDATED',
      cart: compressed,
      compressed: true
    })
  }

  async compress(str) {
    // Используем CompressionStream API
    const stream = new Blob([str]).stream()
    const compressedStream = stream.pipeThrough(
      new CompressionStream('gzip')
    )

    const blob = await new Response(compressedStream).blob()
    const buffer = await blob.arrayBuffer()

    // Конвертируем в base64 для хранения
    return btoa(
      String.fromCharCode(...new Uint8Array(buffer))
    )
  }

  async decompress(compressed) {
    // Декодируем из base64
    const binary = atob(compressed)
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))

    const stream = new Blob([bytes]).stream()
    const decompressedStream = stream.pipeThrough(
      new DecompressionStream('gzip')
    )

    return await new Response(decompressedStream).text()
  }

  async handleMessage(event) {
    if (event.data.type === 'CART_UPDATED') {
      if (event.data.compressed) {
        const json = await this.decompress(event.data.cart)
        this.cart = JSON.parse(json)
      } else {
        this.cart = event.data.cart
      }

      await this.saveCart(this.cart)
      this.notifyListeners(this.cart)
    }
  }
}
`

const highlightedLocalStorage = ref('')
const highlightedBroadcastChannel = ref('')
const highlightedSharedWorker = ref('')
const highlightedReactExample = ref('')
const highlightedConflictResolution = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedLocalStorage.value = Prism.highlight(localStorageSnippet, Prism.languages.javascript, 'javascript')
  highlightedBroadcastChannel.value = Prism.highlight(broadcastChannelSnippet, Prism.languages.javascript, 'javascript')
  highlightedSharedWorker.value = Prism.highlight(sharedWorkerSnippet, Prism.languages.javascript, 'javascript')
  highlightedReactExample.value = Prism.highlight(reactExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedConflictResolution.value = Prism.highlight(conflictResolutionSnippet, Prism.languages.javascript, 'javascript')
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
              Синхронизация состояний между вкладками браузера (на примере корзины)
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Синхронизация состояний между вкладками</b> — это паттерн, позволяющий поддерживать
              одинаковое состояние приложения (например, корзины покупок) во всех открытых вкладках
              браузера. Существует несколько подходов с разными уровнями сложности и надежности.
            </p>

            <!-- Сравнение подходов -->
            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Сложность</th>
                <th class="text-left font-weight-bold">Поддержка</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Использование</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>localStorage + storage event</b></td>
                <td class="text-success">✅ Простая</td>
                <td class="text-success">✅ Отличная</td>
                <td class="text-success">✅ Хорошая</td>
                <td>Базовая синхронизация</td>
              </tr>
              <tr>
                <td><b>BroadcastChannel API</b></td>
                <td class="text-success">✅ Простая</td>
                <td class="text-warning">⚠️ Хорошая (не IE)</td>
                <td class="text-success">✅ Отличная</td>
                <td>Рекомендуемый подход</td>
              </tr>
              <tr>
                <td><b>SharedWorker</b></td>
                <td class="text-error">❌ Сложная</td>
                <td class="text-warning">⚠️ Средняя (не Safari)</td>
                <td class="text-success">✅ Отличная</td>
                <td>Сложные сценарии</td>
              </tr>
              <tr>
                <td><b>Service Worker</b></td>
                <td class="text-error">❌ Сложная</td>
                <td class="text-success">✅ Хорошая</td>
                <td class="text-success">✅ Хорошая</td>
                <td>PWA, offline</td>
              </tr>
              <tr>
                <td><b>WebSocket</b></td>
                <td class="text-warning">⚠️ Средняя</td>
                <td class="text-success">✅ Отличная</td>
                <td class="text-warning">⚠️ Средняя</td>
                <td>Серверная синхронизация</td>
              </tr>
              </tbody>
            </v-table>

            <!-- localStorage + storage event -->
            <h2 class="text-h5 font-weight-bold mb-3">1. localStorage + storage event (базовый подход)</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Плюсы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Очень простая реализация</li>
                    <li>Отличная поддержка браузерами</li>
                    <li>Автоматическая персистентность</li>
                    <li>Не требует дополнительных API</li>
                    <li>Работает даже в старых браузерах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Минусы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>storage event не срабатывает в текущей вкладке</li>
                    <li>Ограничение размера (~5-10MB)</li>
                    <li>Только строки (нужна сериализация)</li>
                    <li>Синхронные операции блокируют поток</li>
                    <li>Нет встроенного разрешения конфликтов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLocalStorage"></code></pre>

            <!-- BroadcastChannel -->
            <h2 class="text-h5 font-weight-bold mb-3">2. BroadcastChannel API (рекомендуемый)</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Рекомендация:</strong> Используйте BroadcastChannel для современных браузеров — это самый простой и эффективный способ синхронизации
            </v-alert>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Плюсы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Простой и чистый API</li>
                    <li>Работает между всеми вкладками</li>
                    <li>Не зависит от localStorage</li>
                    <li>Может передавать любые структуры данных</li>
                    <li>Асинхронная коммуникация</li>
                    <li>Легко реализовать разные типы сообщений</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold">Минусы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Не поддерживается в IE</li>
                    <li>Нет автоматической персистентности</li>
                    <li>Сообщения не сохраняются</li>
                    <li>Новая вкладка не получает текущее состояние автоматически</li>
                    <li>Требуется дополнительная логика для синхронизации</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBroadcastChannel"></code></pre>

            <!-- SharedWorker -->
            <h2 class="text-h5 font-weight-bold mb-3">3. SharedWorker (продвинутый подход)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Использование:</strong> SharedWorker подходит для сложных сценариев с централизованной логикой и работой с IndexedDB
            </v-alert>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Плюсы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Централизованная бизнес-логика</li>
                    <li>Единый источник истины</li>
                    <li>Может работать с IndexedDB</li>
                    <li>Эффективная память (один инстанс)</li>
                    <li>Сложные операции без блокировки UI</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Минусы</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Сложная реализация и отладка</li>
                    <li>Не поддерживается в Safari</li>
                    <li>Требуется отдельный файл worker</li>
                    <li>Сложности с bundlers (Webpack, Vite)</li>
                    <li>Ограниченный доступ к Web APIs</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSharedWorker"></code></pre>

            <!-- React интеграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Интеграция с React</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedReactExample"></code></pre>

            <!-- Разрешение конфликтов -->
            <h2 class="text-h5 font-weight-bold mb-3">Разрешение конфликтов</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> При одновременном изменении корзины в разных вкладках нужна стратегия разрешения конфликтов
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedConflictResolution"></code></pre>

            <!-- Оптимизация производительности -->
            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <!-- Поддержка браузерами -->
            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">API</th>
                <th class="text-left font-weight-bold">Chrome</th>
                <th class="text-left font-weight-bold">Firefox</th>
                <th class="text-left font-weight-bold">Safari</th>
                <th class="text-left font-weight-bold">Edge</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>localStorage</b></td>
                <td class="text-success">✅ 4+</td>
                <td class="text-success">✅ 3.5+</td>
                <td class="text-success">✅ 4+</td>
                <td class="text-success">✅ 8+</td>
              </tr>
              <tr>
                <td><b>storage event</b></td>
                <td class="text-success">✅ 4+</td>
                <td class="text-success">✅ 45+</td>
                <td class="text-success">✅ 4+</td>
                <td class="text-success">✅ 15+</td>
              </tr>
              <tr>
                <td><b>BroadcastChannel</b></td>
                <td class="text-success">✅ 54+</td>
                <td class="text-success">✅ 38+</td>
                <td class="text-success">✅ 15.4+</td>
                <td class="text-success">✅ 79+</td>
              </tr>
              <tr>
                <td><b>SharedWorker</b></td>
                <td class="text-success">✅ 4+</td>
                <td class="text-success">✅ 29+</td>
                <td class="text-error">❌ Нет</td>
                <td class="text-success">✅ 79+</td>
              </tr>
              <tr>
                <td><b>IndexedDB</b></td>
                <td class="text-success">✅ 24+</td>
                <td class="text-success">✅ 16+</td>
                <td class="text-success">✅ 10+</td>
                <td class="text-success">✅ 12+</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Частые вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как синхронизировать корзину между вкладками браузера?</p>
                <p class="font-weight-regular ma-0">
                  Три основных подхода: 1) <b>localStorage + storage event</b> — простой, но event не срабатывает
                  в текущей вкладке. 2) <b>BroadcastChannel</b> — рекомендуемый, простой API для всех вкладок.
                  3) <b>SharedWorker</b> — сложный, но централизованная логика. Выбор зависит от требований
                  к поддержке браузеров и сложности логики.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему storage event не срабатывает в текущей вкладке?</p>
                <p class="font-weight-regular ma-0">
                  По спецификации storage event срабатывает только в других вкладках того же origin.
                  Это сделано намеренно, чтобы избежать циклических обновлений. Для текущей вкладки
                  нужно вызывать callback вручную после сохранения в localStorage.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делать при конфликте изменений из разных вкладок?</p>
                <p class="font-weight-regular ma-0">
                  Существует несколько стратегий: 1) <b>Last-Write-Wins</b> — побеждает последнее изменение
                  по timestamp. 2) <b>Merge</b> — объединение изменений (например, максимальное количество).
                  3) <b>CRDT</b> — conflict-free replicated data types для автоматического разрешения.
                  Выбор зависит от бизнес-логики приложения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как узнать, что пользователь открыл новую вкладку?</p>
                <p class="font-weight-regular ma-0">
                  При загрузке страницы можно отправить сообщение через BroadcastChannel с типом REQUEST_SYNC,
                  на которое другие вкладки ответят текущим состоянием. Или при создании SharedWorker
                  автоматически получить текущее состояние от worker.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между BroadcastChannel и localStorage events?</p>
                <p class="font-weight-regular ma-0">
                  <b>BroadcastChannel:</b> специально для межвкладочной коммуникации, работает во всех вкладках
                  включая текущую, может передавать объекты без сериализации. <b>Storage event:</b> побочный
                  эффект изменения localStorage, не срабатывает в текущей вкладке, только строки, зависит от
                  персистентности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать синхронизацию для частых изменений?</p>
                <p class="font-weight-regular ma-0">
                  Используйте: 1) <b>Debounce</b> — откладывайте сохранение на 300ms. 2) <b>Batching</b> —
                  группируйте изменения и отправляйте батчами. 3) <b>Incremental updates</b> — отправляйте
                  только изменения, а не всю корзину. 4) <b>Compression</b> — сжимайте данные для больших
                  корзин.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое CRDT и зачем он нужен для корзины?</p>
                <p class="font-weight-regular ma-0">
                  <b>CRDT (Conflict-free Replicated Data Type)</b> — структура данных, которая автоматически
                  разрешает конфликты при параллельных изменениях. Для корзины это полезно при одновременном
                  изменении количества товара в разных вкладках — CRDT гарантирует консистентность без
                  явной логики разрешения конфликтов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать синхронизацию между вкладками?</p>
                <p class="font-weight-regular ma-0">
                  1) Вручную открывать несколько вкладок. 2) Использовать Playwright/Puppeteer для
                  автоматизированных тестов с несколькими контекстами браузера. 3) Эмулировать события
                  в юнит-тестах через mock localStorage/BroadcastChannel. 4) Проверять логи и network
                  tab для отладки.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Рекомендуется</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать BroadcastChannel для новых проектов</li>
                    <li>Сохранять в localStorage для персистентности</li>
                    <li>Реализовать стратегию разрешения конфликтов</li>
                    <li>Debounce для частых изменений</li>
                    <li>Валидировать данные перед применением</li>
                    <li>Показывать feedback пользователю</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Полагаться только на storage event</li>
                    <li>Отправлять весь state при каждом изменении</li>
                    <li>Игнорировать конфликты при одновременных изменениях</li>
                    <li>Забывать про cleanup (close channels)</li>
                    <li>Хранить сенситивные данные без шифрования</li>
                    <li>Синхронные блокирующие операции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Комбинировать BroadcastChannel + localStorage</li>
                    <li>Версионировать формат данных</li>
                    <li>Логировать все синхронизации</li>
                    <li>Тестировать edge cases (offline, медленная сеть)</li>
                    <li>Использовать TypeScript для типизации</li>
                    <li>Мониторить размер данных</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Синхронизация состояний между вкладками</b> — важная функция для веб-приложений,
              особенно для корзины покупок. <b>BroadcastChannel API</b> — рекомендуемый современный подход
              с простым API и хорошей поддержкой. <b>localStorage + storage event</b> — fallback для старых
              браузеров. <b>SharedWorker</b> — для сложных сценариев с централизованной логикой. Важно
              реализовать стратегию разрешения конфликтов и оптимизировать производительность через
              debounce, batching или incremental updates. Комбинирование BroadcastChannel для коммуникации
              и localStorage для персистентности дает лучший результат.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API"
                target="_blank"
                class="mr-2">
                MDN BroadcastChannel
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event"
                target="_blank"
                class="mr-2">
                MDN Storage Event
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker"
                target="_blank">
                MDN SharedWorker
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
