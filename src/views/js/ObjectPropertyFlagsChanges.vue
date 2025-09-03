<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
const user = {
  name: 'John',
  age: 30
}

// Получаем дескриптор свойства
const descriptor = Object.getOwnPropertyDescriptor(user, 'name')
console.log(descriptor)
// {
//   value: 'John',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// Получаем все дескрипторы
const allDescriptors = Object.getOwnPropertyDescriptors(user)
console.log(allDescriptors)
`

const snippet2 = `
const obj = {}

// Создаем свойство с кастомными флагами
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,    // нельзя изменять
  enumerable: true,   // видно в for..in
  configurable: false // нельзя удалять/изменять дескриптор
})

obj.name = 'Jane' // Не сработает (в strict mode выбросит ошибку)
console.log(obj.name) // 'John'

delete obj.name // Не сработает
console.log(obj.name) // 'John'
`

const snippet3 = `
const user = {}

// Создаем свойство с геттером и сеттером
Object.defineProperty(user, 'fullName', {
  get() {
    return \`\${this.firstName} \${this.lastName}\`
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ')
  },
  enumerable: true,
  configurable: true
})

user.firstName = 'John'
user.lastName = 'Doe'
console.log(user.fullName) // 'John Doe'

user.fullName = 'Jane Smith'
console.log(user.firstName) // 'Jane'
console.log(user.lastName)  // 'Smith'
`

const snippet4 = `
const obj = {
  regularProp: 'visible',
  _secret: 'hidden'
}

// Скрываем приватные свойства
Object.defineProperty(obj, '_secret', {
  enumerable: false
})

console.log(Object.keys(obj)) // ['regularProp']
for (let key in obj) {
  console.log(key) // только 'regularProp'
}

// Но свойство все еще доступно напрямую
console.log(obj._secret) // 'hidden'

// Создаем неизменяемое свойство
Object.defineProperty(obj, 'constant', {
  value: 'CONST_VALUE',
  writable: false,
  enumerable: true,
  configurable: false
})
`

const snippet5 = `
// Метод для создания "приватных" свойств
function createUser(name, age) {
  const user = {}

  Object.defineProperty(user, 'name', {
    value: name,
    writable: false,
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(user, 'age', {
    get() { return age },
    set(value) {
      if (typeof value === 'number' && value > 0) {
        age = value
      } else {
        throw new Error('Age must be a positive number')
      }
    },
    enumerable: true,
    configurable: false
  })

  return user
}

const user = createUser('John', 25)
console.log(user.name) // 'John'
user.name = 'Jane' // Не изменится
console.log(user.name) // 'John'

user.age = 30 // Сработает
console.log(user.age) // 30

user.age = -5 // Ошибка: Age must be a positive number
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Дескрипторы свойств в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Дескрипторы свойств</b> — это объекты, которые описывают свойства других объектов в JavaScript.
              Каждое свойство объекта имеет дескриптор, который определяет его поведение: можно ли изменять значение,
              видимо ли оно при перечислении, можно ли удалить и т.д.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Типы дескрипторов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Свойства</th>
                <th class="text-left font-weight-bold">Описание</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Data descriptor</b></td>
                <td class="pt-2 pb-2">value, writable</td>
                <td class="pt-2 pb-2">Обычные свойства с значением</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Accessor descriptor</b></td>
                <td class="pt-2 pb-2">get, set</td>
                <td class="pt-2 pb-2">Свойства с геттерами и сеттерами</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Общие свойства</b></td>
                <td class="pt-2 pb-2">enumerable, configurable</td>
                <td class="pt-2 pb-2">Есть у обоих типов</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Флаги дескрипторов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">writable</h3>
                  <p class="mb-2">Можно ли изменять значение свойства</p>
                  <v-chip size="small" color="success" class="ma-1">true</v-chip>
                  <span class="text-caption">можно изменять</span><br>
                  <v-chip size="small" color="error" class="ma-1">false</v-chip>
                  <span class="text-caption">только чтение</span>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">enumerable</h3>
                  <p class="mb-2">Видно ли свойство при перечислении</p>
                  <v-chip size="small" color="success" class="ma-1">true</v-chip>
                  <span class="text-caption">видно в for..in, Object.keys()</span><br>
                  <v-chip size="small" color="error" class="ma-1">false</v-chip>
                  <span class="text-caption">скрыто при перечислении</span>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">configurable</h3>
                  <p class="mb-2">Можно ли удалить свойство или изменить дескриптор</p>
                  <v-chip size="small" color="success" class="ma-1">true</v-chip>
                  <span class="text-caption">можно удалить/настроить</span><br>
                  <v-chip size="small" color="error" class="ma-1">false</v-chip>
                  <span class="text-caption">неизменяемый дескриптор</span>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">value</h3>
                  <p class="mb-2">Значение свойства (для data descriptor)</p>
                  <p class="text-caption mb-0">Может быть любым JavaScript значением</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Получение дескриптора</h2>
            <p class="font-weight-regular mb-4">
              <code>Object.getOwnPropertyDescriptor()</code> возвращает дескриптор конкретного свойства:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Изменение флагов свойства</h2>
            <p class="font-weight-regular mb-4">
              <code>Object.defineProperty()</code> создает новое свойство или изменяет существующее:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Геттеры и сеттеры</h2>
            <p class="font-weight-regular mb-4">
              Accessor descriptors позволяют создавать вычисляемые свойства:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Практическое применение</h2>
            <p class="font-weight-regular mb-4">
              Создание скрытых и неизменяемых свойств:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Паттерн: Контролируемые свойства</h2>
            <p class="font-weight-regular mb-4">
              Создание объектов с валидацией и неизменяемыми свойствами:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Связанные методы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Получение дескрипторов</h3>
                  <ul class="pl-4">
                    <li><code>Object.getOwnPropertyDescriptor()</code></li>
                    <li><code>Object.getOwnPropertyDescriptors()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Определение свойств</h3>
                  <ul class="pl-4">
                    <li><code>Object.defineProperty()</code></li>
                    <li><code>Object.defineProperties()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Блокировка объектов</h3>
                  <ul class="pl-4">
                    <li><code>Object.preventExtensions()</code></li>
                    <li><code>Object.seal()</code></li>
                    <li><code>Object.freeze()</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Проверка состояния</h3>
                  <ul class="pl-4">
                    <li><code>Object.isExtensible()</code></li>
                    <li><code>Object.isSealed()</code></li>
                    <li><code>Object.isFrozen()</code></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие флаги по умолчанию у обычных свойств?</p>
                <p class="font-weight-regular ma-0">
                  У свойств, созданных через присвоение (<code>obj.prop = value</code>), все флаги
                  <code>true</code>. У свойств, созданных через <code>defineProperty</code> без явного
                  указания флагов — все <code>false</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между writable: false и Object.freeze()?</p>
                <p class="font-weight-regular ma-0">
                  <code>writable: false</code> блокирует только изменение конкретного свойства.
                  <code>Object.freeze()</code> блокирует изменение всех свойств объекта и запрещает
                  добавление новых.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли изменить флаги, если configurable: false?</p>
                <p class="font-weight-regular ma-0">
                  Нет, если <code>configurable: false</code>, то нельзя изменить дескриптор или удалить
                  свойство. Исключение: можно изменить <code>writable</code> с <code>true</code> на
                  <code>false</code>, но не наоборот.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что происходит при попытке записи в writable: false?</p>
                <p class="font-weight-regular ma-0">
                  В нестрогом режиме операция тихо игнорируется. В строгом режиме (<code>'use strict'</code>)
                  выбрасывается <code>TypeError</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать действительно приватные свойства?</p>
                <p class="font-weight-regular ma-0">
                  Дескрипторы не делают свойства приватными — они остаются доступными напрямую.
                  Для приватности используйте замыкания, WeakMap, или современный синтаксис
                  приватных полей <code>#privateField</code>.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Дескрипторы свойств позволяют тонко настраивать поведение свойств объектов в JavaScript.
              <code>Object.getOwnPropertyDescriptor()</code> получает информацию о свойстве, а
              <code>Object.defineProperty()</code> создает или изменяет свойства с нужными флагами.
              Это основа для создания неизменяемых объектов, валидации данных и реализации геттеров/сеттеров.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty"
                target="_blank">
                MDN: Object.defineProperty()
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
