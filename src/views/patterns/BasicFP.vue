<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const imperativeSnippet = `
// Императивный подход - КАК делать
const numbers = [1, 2, 3, 4, 5];
let doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

console.log(doubled); // [2, 4, 6, 8, 10]

// Мутация данных
let user = { name: 'John', age: 30 };
user.age = 31; // Изменили оригинал
`

const declarativeSnippet = `
// Декларативный подход - ЧТО нужно получить
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8, 10]

// Иммутабельность
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 }; // Новый объект

console.log(user);        // { name: 'John', age: 30 }
console.log(updatedUser); // { name: 'John', age: 31 }
`

const pureFunctionsSnippet = `
// ✅ Чистая функция - детерминированная, без побочных эффектов
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 - всегда одинаковый результат

const multiply = (arr, factor) => arr.map(x => x * factor);
console.log(multiply([1, 2, 3], 2)); // [2, 4, 6]

// ❌ Нечистая функция - зависит от внешнего состояния
let counter = 0;
const incrementCounter = () => {
  counter++; // Побочный эффект - изменение внешней переменной
  return counter;
}

// ❌ Нечистая функция - недетерминированная
const getRandomNumber = () => Math.random(); // Разные результаты
const getCurrentTime = () => new Date(); // Зависит от времени

// ❌ Нечистая функция - мутирует аргумент
const addToArray = (arr, item) => {
  arr.push(item); // Изменяет оригинальный массив
  return arr;
}
`

const immutabilitySnippet = `
// Иммутабельность - данные не изменяются

// Массивы
const original = [1, 2, 3];

// ❌ Мутация
original.push(4); // Изменяет оригинал

// ✅ Иммутабельно
const withAdded = [...original, 4];     // [1, 2, 3, 4]
const withoutFirst = original.slice(1); // [2, 3]
const mapped = original.map(x => x * 2); // [2, 4, 6]

// Объекты
const person = { name: 'John', age: 30 };

// ❌ Мутация
person.age = 31;

// ✅ Иммутабельно
const olderPerson = { ...person, age: 31 };
const withCity = { ...person, city: 'NYC' };

// Глубокое копирование для вложенных структур
const user = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' }
};

const updatedUser = {
  ...user,
  address: { ...user.address, city: 'LA' }
};
`

const higherOrderSnippet = `
// Функции высшего порядка - принимают или возвращают функции

// 1. Принимают функцию как аргумент
const numbers = [1, 2, 3, 4, 5];

const double = x => x * 2;
const isEven = x => x % 2 === 0;

console.log(numbers.map(double));      // [2, 4, 6, 8, 10]
console.log(numbers.filter(isEven));   // [2, 4]
console.log(numbers.reduce((a, b) => a + b, 0)); // 15

// 2. Возвращают функцию
const multiplyBy = factor => number => number * factor;

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 3. Композиция функций
const compose = (...fns) => x =>
  fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const square = x => x * x;

const addOneThenSquare = compose(square, addOne);
console.log(addOneThenSquare(5)); // (5 + 1)² = 36
`

const compositionSnippet = `
// Композиция и pipe

// compose - справа налево
const compose = (...fns) => x =>
  fns.reduceRight((acc, fn) => fn(acc), x);

// pipe - слева направо
const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x);

// Пример обработки пользовательских данных
const users = [
  { name: 'john', age: 25, active: true },
  { name: 'jane', age: 30, active: false },
  { name: 'bob', age: 35, active: true }
];

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

const getActiveUsers = users =>
  users.filter(u => u.active);

const getUserNames = users =>
  users.map(u => u.name);

const capitalizeNames = names =>
  names.map(capitalize);

// Композиция
const getActiveUserNames = pipe(
  getActiveUsers,
  getUserNames,
  capitalizeNames
);

console.log(getActiveUserNames(users)); // ['John', 'Bob']
`

const curryingSnippet = `
// Каррирование - преобразование функции с несколькими аргументами
// в последовательность функций с одним аргументом

// Обычная функция
const add = (a, b, c) => a + b + c;
console.log(add(1, 2, 3)); // 6

// Каррированная функция
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

// Частичное применение
const add5 = curriedAdd(5);
const add5and10 = add5(10);
console.log(add5and10(3)); // 18

// Универсальная функция каррирования
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return (...nextArgs) =>
        curried.apply(this, [...args, ...nextArgs]);
    }
  };
};

// Использование
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));    // 6
console.log(curriedSum(1, 2)(3));    // 6
console.log(curriedSum(1)(2, 3));    // 6
`

const practicalExampleSnippet = `
// Практический пример: обработка данных с API

// Сырые данные
const apiResponse = [
  { id: 1, name: 'john doe', price: '100', available: 'true' },
  { id: 2, name: 'jane smith', price: '200', available: 'false' },
  { id: 3, name: 'bob jones', price: '150', available: 'true' }
];

// Чистые функции для трансформации
const parseBoolean = str => str === 'true';
const parseNumber = str => Number(str);
const capitalize = str =>
  str.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

const transformProduct = product => ({
  id: product.id,
  name: capitalize(product.name),
  price: parseNumber(product.price),
  available: parseBoolean(product.available)
});

const filterAvailable = products =>
  products.filter(p => p.available);

const sortByPrice = products =>
  [...products].sort((a, b) => a.price - b.price);

const addDiscountPrice = discount => products =>
  products.map(p => ({
    ...p,
    discountPrice: p.price * (1 - discount)
  }));

// Композиция всех трансформаций
const processProducts = pipe(
  products => products.map(transformProduct),
  filterAvailable,
  sortByPrice,
  addDiscountPrice(0.1) // 10% скидка
);

const result = processProducts(apiResponse);
console.log(result);
/* [
  {
    id: 1,
    name: 'John Doe',
    price: 100,
    available: true,
    discountPrice: 90
  },
  {
    id: 3,
    name: 'Bob Jones',
    price: 150,
    available: true,
    discountPrice: 135
  }
] */
`

const functorsMonadsSnippet = `
// Функторы и монады (упрощенно)

// Функтор - контейнер с методом map
class Maybe {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  isNothing() {
    return this.value === null || this.value === undefined;
  }

  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this.value));
  }

  getOrElse(defaultValue) {
    return this.isNothing() ? defaultValue : this.value;
  }
}

// Использование Maybe для безопасной работы с null/undefined
const user = { name: 'John', address: { city: 'NYC' } };
const noAddressUser = { name: 'Jane' };

const getCity = user =>
  Maybe.of(user)
    .map(u => u.address)
    .map(a => a.city)
    .map(c => c.toUpperCase())
    .getOrElse('Unknown');

console.log(getCity(user));          // 'NYC'
console.log(getCity(noAddressUser)); // 'Unknown'

// Either - для обработки ошибок
class Either {
  constructor(value, isRight) {
    this.value = value;
    this.isRight = isRight;
  }

  static right(value) {
    return new Either(value, true);
  }

  static left(value) {
    return new Either(value, false);
  }

  map(fn) {
    return this.isRight
      ? Either.right(fn(this.value))
      : this;
  }

  chain(fn) {
    return this.isRight ? fn(this.value) : this;
  }
}

const divide = (a, b) =>
  b === 0
    ? Either.left('Division by zero')
    : Either.right(a / b);

const result1 = divide(10, 2).map(x => x * 2); // Right(10)
const result2 = divide(10, 0).map(x => x * 2); // Left('Division by zero')
`

const highlightedImperative = ref('')
const highlightedDeclarative = ref('')
const highlightedPure = ref('')
const highlightedImmutability = ref('')
const highlightedHigherOrder = ref('')
const highlightedComposition = ref('')
const highlightedCurrying = ref('')
const highlightedPractical = ref('')
const highlightedFunctorsMonads = ref('')

onMounted(() => {
  highlightedImperative.value = Prism.highlight(imperativeSnippet, Prism.languages.javascript, 'javascript')
  highlightedDeclarative.value = Prism.highlight(declarativeSnippet, Prism.languages.javascript, 'javascript')
  highlightedPure.value = Prism.highlight(pureFunctionsSnippet, Prism.languages.javascript, 'javascript')
  highlightedImmutability.value = Prism.highlight(immutabilitySnippet, Prism.languages.javascript, 'javascript')
  highlightedHigherOrder.value = Prism.highlight(higherOrderSnippet, Prism.languages.javascript, 'javascript')
  highlightedComposition.value = Prism.highlight(compositionSnippet, Prism.languages.javascript, 'javascript')
  highlightedCurrying.value = Prism.highlight(curryingSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExampleSnippet, Prism.languages.javascript, 'javascript')
  highlightedFunctorsMonads.value = Prism.highlight(functorsMonadsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Basic FP: Основы функционального программирования
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Функциональное программирование (FP)</b> — это парадигма программирования, которая рассматривает
              вычисления как применение математических функций и избегает изменения состояния и мутабельных данных.
              В JavaScript FP широко используется благодаря поддержке функций первого класса.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные принципы FP</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-function</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Чистые функции</h3>
                  <p class="text-body-2">
                    Одинаковый вход → одинаковый выход.
                    Нет побочных эффектов.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-lock</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Иммутабельность</h3>
                  <p class="text-body-2">
                    Данные не изменяются после создания.
                    Создаются новые копии.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-arrow-decision</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Декларативность</h3>
                  <p class="text-body-2">
                    Описываем ЧТО делать,
                    а не КАК это делать.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Императивный vs Декларативный подход</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Императивный (КАК)</h3>
                  <pre class="mb-0 pa-4 rounded custom-code"><code v-html="highlightedImperative"></code></pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Декларативный (ЧТО)</h3>
                  <pre class="mb-0 pa-4 rounded custom-code"><code v-html="highlightedDeclarative"></code></pre>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Чистые функции (Pure Functions)</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Чистая функция:</strong> Детерминированная (одинаковый вход → одинаковый выход) и не имеет побочных эффектов
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPure"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Иммутабельность (Immutability)</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-shield-check</v-icon>
              <strong>Принцип:</strong> Вместо изменения существующих данных создавайте новые структуры
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedImmutability"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Функции высшего порядка (Higher-Order Functions)</h2>
            <p class="font-weight-regular mb-4">
              Функции, которые принимают другие функции как аргументы или возвращают функции как результат.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedHigherOrder"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Композиция функций (Function Composition)</h2>
            <p class="font-weight-regular mb-4">
              Создание сложных функций путем комбинирования простых функций.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComposition"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Каррирование (Currying)</h2>
            <p class="font-weight-regular mb-4">
              Преобразование функции с множеством аргументов в последовательность функций с одним аргументом.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCurrying"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример: Обработка данных</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Функторы и монады (упрощенно)</h2>
            <p class="font-weight-regular mb-4">
              Продвинутые концепции FP для работы с контекстами и обработки ошибок.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFunctorsMonads"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества FP</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Преимущество</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Предсказуемость</b></td>
                <td>Чистые функции всегда дают одинаковый результат</td>
                <td>Легче тестировать и отлаживать</td>
              </tr>
              <tr>
                <td><b>Переиспользуемость</b></td>
                <td>Маленькие функции легко комбинировать</td>
                <td>Композиция и pipe</td>
              </tr>
              <tr>
                <td><b>Читаемость</b></td>
                <td>Декларативный код описывает намерения</td>
                <td>map/filter вместо циклов</td>
              </tr>
              <tr>
                <td><b>Параллелизм</b></td>
                <td>Иммутабельные данные безопасны для многопоточности</td>
                <td>Нет race conditions</td>
              </tr>
              <tr>
                <td><b>Отладка</b></td>
                <td>Нет побочных эффектов = проще найти баги</td>
                <td>Функции можно тестировать изолированно</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Недостатки и ограничения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Сложности</h3>
                  <ul class="pl-4">
                    <li>Высокий порог входа</li>
                    <li>Производительность при глубоком копировании</li>
                    <li>Больше памяти для иммутабельных структур</li>
                    <li>Не всё подходит под FP парадигму</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Решения</h3>
                  <ul class="pl-4">
                    <li>Постепенное внедрение концепций</li>
                    <li>Structural sharing (Immutable.js)</li>
                    <li>Оптимизации компилятора</li>
                    <li>Гибридный подход (FP + OOP)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что делает функцию чистой?</p>
                <p class="font-weight-regular ma-0">
                  Чистая функция: (1) детерминированная - одинаковый вход дает одинаковый выход,
                  (2) без побочных эффектов - не изменяет внешнее состояние, не взаимодействует с внешним миром.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между map и forEach?</p>
                <p class="font-weight-regular ma-0">
                  map - чистая функция, возвращает новый массив, не мутирует оригинал.
                  forEach - для побочных эффектов, не возвращает значение, императивный подход.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем нужна иммутабельность?</p>
                <p class="font-weight-regular ma-0">
                  Предсказуемость, безопасность при многопоточности, упрощение отладки,
                  возможность использования time-travel debugging, оптимизации в React (shallow comparison).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое каррирование и зачем оно нужно?</p>
                <p class="font-weight-regular ma-0">
                  Каррирование - преобразование функции с несколькими аргументами в последовательность
                  функций с одним аргументом. Полезно для частичного применения и создания специализированных функций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается compose от pipe?</p>
                <p class="font-weight-regular ma-0">
                  compose выполняет функции справа налево (как в математике),
                  pipe - слева направо (как Unix pipes). Результат одинаковый, разница в порядке чтения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли использовать FP в production?</p>
                <p class="font-weight-regular ma-0">
                  Да! Библиотеки как Ramda, Lodash/FP, React (hooks), Redux - все используют FP принципы.
                  Важно найти баланс между FP и практичностью для конкретной задачи.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Библиотеки для FP в JavaScript</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Ramda</h3>
                  <p class="text-body-2 mb-2">Функциональная библиотека с автоматическим каррированием</p>
                  <ul class="pl-4 text-body-2">
                    <li>Чистые функции</li>
                    <li>Иммутабельность</li>
                    <li>Композиция</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Lodash/FP</h3>
                  <p class="text-body-2 mb-2">FP версия популярной утилитарной библиотеки</p>
                  <ul class="pl-4 text-body-2">
                    <li>Каррирование</li>
                    <li>Иммутабельные операции</li>
                    <li>Композиция</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Immutable.js</h3>
                  <p class="text-body-2 mb-2">Персистентные иммутабельные структуры данных</p>
                  <ul class="pl-4 text-body-2">
                    <li>Structural sharing</li>
                    <li>Производительность</li>
                    <li>Typed Records</li>
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
                    <li>Писать чистые функции</li>
                    <li>Избегать мутаций</li>
                    <li>Использовать map/filter/reduce</li>
                    <li>Применять композицию</li>
                    <li>Предпочитать const</li>
                    <li>Делать функции маленькими</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Побочных эффектов без причины</li>
                    <li>Изменения аргументов</li>
                    <li>Глобальных переменных</li>
                    <li>Императивных циклов для трансформаций</li>
                    <li>Длинных функций</li>
                    <li>Смешивания логики и эффектов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Начинайте с простых концепций</li>
                    <li>Используйте TypeScript для типизации</li>
                    <li>Тестируйте чистые функции</li>
                    <li>Изучайте паттерны (Maybe, Either)</li>
                    <li>Читайте код библиотек</li>
                    <li>Балансируйте прагматизм и чистоту</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Функциональное программирование</b> в JavaScript - это набор принципов и техник:
              чистые функции, иммутабельность, композиция, функции высшего порядка.
              FP делает код более предсказуемым, тестируемым и масштабируемым. Современный JavaScript
              (особенно React и Redux) активно использует FP концепции. Главное - находить баланс
              между функциональной чистотой и практичностью решения задач.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://mostly-adequate.gitbook.io/mostly-adequate-guide"
                target="_blank"
                class="mr-2">
                Mostly Adequate Guide to FP
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://ramdajs.com/"
                target="_blank">
                Ramda.js
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
