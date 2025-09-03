<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const localSymbolsSnippet = `
// Локальные символы - всегда уникальны
const sym1 = Symbol('mySymbol')
const sym2 = Symbol('mySymbol')

console.log(sym1 === sym2) // false - разные символы!
console.log(sym1.toString()) // "Symbol(mySymbol)"
console.log(sym2.toString()) // "Symbol(mySymbol)"

// Описание одинаковое, но символы разные
console.log(sym1.description) // "mySymbol"
console.log(sym2.description) // "mySymbol"
`

const globalSymbolsSnippet = `
// Глобальный реестр символов - Symbol.for()
const globalSym1 = Symbol.for('sharedSymbol')
const globalSym2 = Symbol.for('sharedSymbol')

console.log(globalSym1 === globalSym2) // true - один и тот же символ!

// Проверяем ключ глобального символа
console.log(Symbol.keyFor(globalSym1)) // "sharedSymbol"
console.log(Symbol.keyFor(globalSym2)) // "sharedSymbol"

// Локальные символы не имеют ключа в глобальном реестре
const localSym = Symbol('local')
console.log(Symbol.keyFor(localSym)) // undefined
`

const practicalExampleSnippet = `
// Практический пример: кэш с глобальными символами

// Модуль A
function moduleA() {
  const cacheKey = Symbol.for('app.cache.user')
  const obj = {}
  obj[cacheKey] = { id: 1, name: 'John' }
  return obj
}

// Модуль B (в другом файле)
function moduleB(obj) {
  const cacheKey = Symbol.for('app.cache.user') // Тот же символ!
  return obj[cacheKey] // Получаем данные
}

// Использование
const data = moduleA()
console.log(moduleB(data)) // { id: 1, name: 'John' }

// Без глобального реестра это было бы невозможно
`

const systemSymbolsSnippet = `
// Системные (well-known) символы

// Symbol.iterator - делает объект итерируемым
const myIterable = {
  data: [1, 2, 3],

  // Определяем кастомный итератор
  [Symbol.iterator]() {
    let index = 0
    const data = this.data

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false }
        }
        return { done: true }
      }
    }
  }
}

// Теперь объект можно использовать в for...of
for (const value of myIterable) {
  console.log(value) // 1, 2, 3
}

// Symbol.toStringTag - настройка Object.prototype.toString()
const myObject = {
  [Symbol.toStringTag]: 'MyCustomObject'
}

console.log(Object.prototype.toString.call(myObject))
// "[object MyCustomObject]"
`

const asyncIteratorSnippet = `
// Symbol.asyncIterator - для асинхронной итерации

const asyncIterable = {
  data: ['a', 'b', 'c'],

  [Symbol.asyncIterator]() {
    let index = 0
    const data = this.data

    return {
      async next() {
        if (index < data.length) {
          // Симулируем асинхронную операцию
          await new Promise(resolve => setTimeout(resolve, 100))
          return { value: data[index++], done: false }
        }
        return { done: true }
      }
    }
  }
}

// Использование с for await...of
async function iterate() {
  for await (const value of asyncIterable) {
    console.log(value) // 'a', 'b', 'c' с задержкой
  }
}

iterate()
`

const symbolSpeciesSnippet = `
// Symbol.species - контролирует создание производных объектов

class MyArray extends Array {
  // Переопределяем Symbol.species
  static get [Symbol.species]() {
    return Array // Возвращаем обычный Array вместо MyArray
  }

  // Кастомный метод
  multiply(factor) {
    return this.map(x => x * factor)
  }
}

const myArr = new MyArray(1, 2, 3)
console.log(myArr instanceof MyArray) // true

// map() использует Symbol.species для создания результата
const mapped = myArr.map(x => x * 2)
console.log(mapped instanceof MyArray) // false (благодаря Symbol.species)
console.log(mapped instanceof Array)   // true

// Без Symbol.species mapped был бы экземпляром MyArray
`

const toPrimitiveSnippet = `
// Symbol.toPrimitive - контролирует преобразование к примитивам

const obj = {
  value: 100,

  [Symbol.toPrimitive](hint) {
    console.log('Hint:', hint)

    switch (hint) {
      case 'number':
        return this.value
      case 'string':
        return \`Value: \${this.value}\`
      case 'default':
        return this.value
      default:
        return null
    }
  }
}

console.log(+obj)        // Hint: number -> 100
console.log(\`\${obj}\`)    // Hint: string -> "Value: 100"
console.log(obj + 10)    // Hint: default -> 110
console.log(obj == 100)  // Hint: default -> true
`

const proxySymbolsSnippet = `
// Символы в Proxy для метапрограммирования

const target = {}
const handler = {
  get(target, prop, receiver) {
    if (typeof prop === 'symbol') {
      console.log('Accessing symbol property:', prop.toString())
    }
    return Reflect.get(target, prop, receiver)
  },

  set(target, prop, value, receiver) {
    if (typeof prop === 'symbol') {
      console.log('Setting symbol property:', prop.toString())
    }
    return Reflect.set(target, prop, value, receiver)
  }
}

const proxy = new Proxy(target, handler)

const sym = Symbol('test')
proxy[sym] = 'value'     // "Setting symbol property: Symbol(test)"
console.log(proxy[sym])  // "Accessing symbol property: Symbol(test)"
                         // "value"
`

const comparingSymbolsSnippet = `
// Сравнение различных способов создания символов

// 1. Локальные символы
const local1 = Symbol('test')
const local2 = Symbol('test')
console.log(local1 === local2) // false

// 2. Глобальные символы
const global1 = Symbol.for('test')
const global2 = Symbol.for('test')
console.log(global1 === global2) // true

// 3. Системные символы
const system1 = Symbol.iterator
const system2 = Symbol.iterator
console.log(system1 === system2) // true

// Проверка принадлежности к глобальному реестру
console.log(Symbol.keyFor(local1))  // undefined
console.log(Symbol.keyFor(global1)) // "test"
console.log(Symbol.keyFor(system1)) // undefined (системные не в глобальном реестре)
`

const highlightedLocalSymbols = ref('')
const highlightedGlobalSymbols = ref('')
const highlightedPracticalExample = ref('')
const highlightedSystemSymbols = ref('')
const highlightedAsyncIterator = ref('')
const highlightedSymbolSpecies = ref('')
const highlightedToPrimitive = ref('')
const highlightedProxySymbols = ref('')
const highlightedComparingSymbols = ref('')

onMounted(() => {
  highlightedLocalSymbols.value = Prism.highlight(
    localSymbolsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedGlobalSymbols.value = Prism.highlight(
    globalSymbolsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedPracticalExample.value = Prism.highlight(
    practicalExampleSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedSystemSymbols.value = Prism.highlight(
    systemSymbolsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedAsyncIterator.value = Prism.highlight(
    asyncIteratorSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedSymbolSpecies.value = Prism.highlight(
    symbolSpeciesSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedToPrimitive.value = Prism.highlight(
    toPrimitiveSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedProxySymbols.value = Prism.highlight(
    proxySymbolsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
  highlightedComparingSymbols.value = Prism.highlight(
    comparingSymbolsSnippet,
    Prism.languages.javascript,
    'javascript',
  )
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Глобальный реестр символов и системные символы
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Как сделать два символа с одним именем?</b> В JavaScript есть несколько способов
              работы с символами: локальные символы (всегда уникальны), глобальные символы через
              <code>Symbol.for()</code>
              (могут быть одинаковыми) и системные символы (предопределенные).
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Локальные символы — всегда уникальны</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Обычные символы <code>Symbol()</code> всегда создают
              уникальные значения, даже с одинаковым описанием!
            </v-alert>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedLocalSymbols"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Глобальный реестр символов — Symbol.for()</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Решение:</strong> <code>Symbol.for(key)</code> создает глобальные символы,
              которые могут быть одинаковыми при одинаковом ключе!
            </v-alert>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedGlobalSymbols"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Разница между типами символов</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Локальные Symbol()</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Всегда уникальны</strong></li>
                    <li>Существуют только в области видимости</li>
                    <li>Нет доступа из других модулей</li>
                    <li>Symbol.keyFor() → undefined</li>
                    <li>Идеальны для приватных свойств</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Глобальные Symbol.for()</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Могут быть одинаковыми</strong></li>
                    <li>Доступны глобально</li>
                    <li>Переиспользуются между модулями</li>
                    <li>Symbol.keyFor() → ключ</li>
                    <li>Идеальны для межмодульного API</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-star-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Системные Symbol.*</h3>
                  <ul class="text-left pl-4">
                    <li><strong>Предопределены движком</strong></li>
                    <li>Управляют поведением языка</li>
                    <li>Доступны как Symbol.iterator</li>
                    <li>Symbol.keyFor() → undefined</li>
                    <li>Используются для метапрограммирования</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">
              Практический пример: межмодульное взаимодействие
            </h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedPracticalExample"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Системные (Well-Known) символы</h2>
            <p class="font-weight-regular mb-4">
              Системные символы — это предопределенные символы, которые JavaScript использует
              внутренне для управления поведением объектов. Они позволяют кастомизировать встроенные
              операции.
            </p>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedSystemSymbols"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">
              Symbol.asyncIterator — асинхронная итерация
            </h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedAsyncIterator"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Symbol.species — контроль наследования</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedSymbolSpecies"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">
              Symbol.toPrimitive — кастомное преобразование
            </h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedToPrimitive"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Символы в метапрограммировании</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedProxySymbols"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение всех типов символов</h2>
            <pre
              class="mb-8 pa-6 rounded-lg custom-code"
            ><code v-html="highlightedComparingSymbols"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Все системные символы</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Символ</th>
                  <th class="text-left font-weight-bold">Назначение</th>
                  <th class="text-left font-weight-bold">Использование</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>Symbol.iterator</code></td>
                  <td>Итерация (for...of)</td>
                  <td>Делает объект итерируемым</td>
                </tr>
                <tr>
                  <td><code>Symbol.asyncIterator</code></td>
                  <td>Асинхронная итерация</td>
                  <td>for await...of</td>
                </tr>
                <tr>
                  <td><code>Symbol.toStringTag</code></td>
                  <td>Object.prototype.toString()</td>
                  <td>Кастомный тег объекта</td>
                </tr>
                <tr>
                  <td><code>Symbol.toPrimitive</code></td>
                  <td>Преобразование к примитиву</td>
                  <td>Контроль +, String(), Number()</td>
                </tr>
                <tr>
                  <td><code>Symbol.species</code></td>
                  <td>Конструктор производных объектов</td>
                  <td>map(), filter(), slice()</td>
                </tr>
                <tr>
                  <td><code>Symbol.hasInstance</code></td>
                  <td>instanceof оператор</td>
                  <td>obj instanceof Constructor</td>
                </tr>
                <tr>
                  <td><code>Symbol.match</code></td>
                  <td>String.prototype.match()</td>
                  <td>Кастомное поведение match</td>
                </tr>
                <tr>
                  <td><code>Symbol.replace</code></td>
                  <td>String.prototype.replace()</td>
                  <td>Кастомное поведение replace</td>
                </tr>
                <tr>
                  <td><code>Symbol.search</code></td>
                  <td>String.prototype.search()</td>
                  <td>Кастомное поведение search</td>
                </tr>
                <tr>
                  <td><code>Symbol.split</code></td>
                  <td>String.prototype.split()</td>
                  <td>Кастомное поведение split</td>
                </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Symbol() и Symbol.for()?</p>
                <p class="font-weight-regular ma-0">
                  <code>Symbol()</code> всегда создает уникальный символ.
                  <code>Symbol.for(key)</code>
                  создает или возвращает существующий глобальный символ по ключу. Глобальные символы
                  позволяют создать "два символа с одним именем" (одинаковые символы).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как проверить, является ли символ глобальным?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>Symbol.keyFor(symbol)</code>. Если возвращается строка — символ
                  глобальный. Если <code>undefined</code> — локальный или системный.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужны системные символы?</p>
                <p class="font-weight-regular ma-0">
                  Они позволяют кастомизировать встроенное поведение JavaScript: итерацию,
                  преобразования типов, строковые операции. Это основа метапрограммирования в JS.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли создать свой системный символ?</p>
                <p class="font-weight-regular ma-0">
                  Нет, системные символы предопределены движком. Но можно создать глобальный символ
                  с соглашением об именовании (например,
                  <code>Symbol.for('myLib.customBehavior')</code>).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем польза Symbol.iterator?</p>
                <p class="font-weight-regular ma-0">
                  Позволяет сделать любой объект итерируемым для <code>for...of</code>,
                  деструктуризации, <code>Array.from()</code>, spread оператора. Объект определяет
                  собственную логику итерации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">
                  Как Symbol.toPrimitive влияет на производительность?
                </p>
                <p class="font-weight-regular ma-0">
                  При частых преобразованиях типов кастомный <code>Symbol.toPrimitive</code> может
                  быть быстрее стандартных методов <code>valueOf()</code> и <code>toString()</code>,
                  так как вызывается напрямую без цепочки вызовов.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать Symbol.for() для публичного API</li>
                    <li>Локальные Symbol() для приватности</li>
                    <li>Системные символы для кастомизации</li>
                    <li>Осмысленные ключи для глобальных символов</li>
                    <li>Документировать использование символов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Переопределения системных символов без нужды</li>
                    <li>Слишком много глобальных символов</li>
                    <li>Symbol() вместо Symbol.for() для общего API</li>
                    <li>Конфликтующие имена глобальных символов</li>
                    <li>Использования символов как строк</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Именуйте глобальные символы с префиксом</li>
                    <li>Кэшируйте часто используемые символы</li>
                    <li>Проверяйте поддержку символов в старых браузерах</li>
                    <li>Используйте TypeScript для типизации символов</li>
                    <li>Тестируйте поведение с системными символами</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Ответ на вопрос:</b> "Два символа с одним именем" создаются через
              <b>глобальный реестр Symbol.for(key)</b>. В отличие от локальных символов, глобальные
              символы с одинаковым ключом возвращают одинаковые значения.
              <b>Системные символы</b> позволяют кастомизировать встроенное поведение JavaScript,
              делая язык более гибким для метапрограммирования.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol"
                target="_blank"
                class="mr-2"
              >
                MDN Symbol
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://tc39.es/ecma262/#sec-symbol-objects"
                target="_blank"
              >
                ECMAScript Spec
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
