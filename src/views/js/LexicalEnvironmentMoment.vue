<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Демонстрация момента создания лексического окружения
console.log("=== Момент создания лексического окружения ===");

// 1. ВАЖНО: Лексическое окружение создается в момент ВЫПОЛНЕНИЯ функции, НЕ определения!

// Определение функции (создается только объект функции)
console.log("1. Определяем функцию outerFunction");
function outerFunction(param) {
  console.log("  outerFunction выполняется, param =", param);

  // В этот момент создается лексическое окружение outerFunction:
  // {
  //   Environment Record: { param: значение, innerVar: undefined (hoisting) }
  //   Outer Reference: Global Lexical Environment
  // }

  var innerVar = "Переменная outerFunction";
  console.log("  innerVar =", innerVar);

  // Определение вложенной функции
  function innerFunction() {
    console.log("    innerFunction выполняется");
    console.log("    Доступ к param:", param);        // Из родительского окружения
    console.log("    Доступ к innerVar:", innerVar);  // Из родительского окружения

    // Лексическое окружение innerFunction создается ТОЛЬКО при вызове:
    // {
    //   Environment Record: { } (пустое)
    //   Outer Reference: outerFunction Lexical Environment
    // }
  }

  console.log("  Вложенная функция определена, но её лексическое окружение ещё НЕ создано");

  // Возвращаем функцию (замыкание)
  return innerFunction;
}

console.log("2. Функция outerFunction определена, но лексическое окружение ещё НЕ создано");

// Вызов функции - ЗДЕСЬ создается лексическое окружение outerFunction
console.log("3. Вызываем outerFunction('test')");
const closure = outerFunction('test');

console.log("4. Получили замыкание, теперь вызываем его");
// Вызов замыкания - ЗДЕСЬ создается лексическое окружение innerFunction
closure();
`

const snippet2 = `
// Детальный разбор фаз создания лексического окружения
console.log("=== Фазы создания лексического окружения ===");

function demonstratePhases() {
  console.log("\\n1. CREATION PHASE (Фаза создания):");
  console.log("   - Создается Environment Record");
  console.log("   - Устанавливается Outer Reference");
  console.log("   - Происходит hoisting переменных и функций");

  // В этот момент:
  // - hoistedVar уже существует в Environment Record (undefined)
  // - hoistedFunction уже существует и инициализирована
  // - letVariable и constVariable созданы, но в TDZ

  console.log("   - hoistedVar до инициализации:", typeof hoistedVar);      // "undefined"
  console.log("   - hoistedFunction доступна:", typeof hoistedFunction);   // "function"
  // console.log("   - letVariable:", letVariable);                        // ReferenceError (TDZ)

  console.log("\\n2. EXECUTION PHASE (Фаза выполнения):");
  console.log("   - Присваиваются значения переменным");
  console.log("   - Выходим из TDZ для let/const");

  var hoistedVar = "Проинициализирована";
  let letVariable = "Вышла из TDZ";
  const constVariable = "Тоже вышла из TDZ";

  function hoistedFunction() {
    return "Была доступна с самого начала";
  }

  console.log("   - hoistedVar:", hoistedVar);
  console.log("   - letVariable:", letVariable);
  console.log("   - constVariable:", constVariable);
  console.log("   - hoistedFunction():", hoistedFunction());

  return function returnedFunction() {
    // Лексическое окружение returnedFunction создается ТОЛЬКО при вызове этой функции
    console.log("\\n3. Лексическое окружение returnedFunction создано при вызове");
    console.log("   - Имеет доступ ко всем переменным demonstratePhases");
    console.log("   - hoistedVar:", hoistedVar);
    console.log("   - letVariable:", letVariable);
    console.log("   - constVariable:", constVariable);
  };
}

console.log("Определили demonstratePhases - лексическое окружение ещё НЕ создано");

console.log("\\nВызываем demonstratePhases:");
const returnedFunc = demonstratePhases();

console.log("\\nВызываем возвращенную функцию:");
returnedFunc();
`

const snippet3 = `
// Практический пример: различие между определением и выполнением
console.log("=== Определение vs Выполнение ===");

let globalCounter = 0;

// Определение функции-фабрики
function createCounter(name) {
  console.log(\`Создаем счетчик "\${name}", globalCounter = \${++globalCounter}\`);

  // Лексическое окружение createCounter создается СЕЙЧАС (при вызове):
  // {
  //   Environment Record: { name: значение_параметра, count: undefined }
  //   Outer Reference: Global Lexical Environment
  // }

  let count = 0;

  // Определяем функции, но их лексические окружения ещё НЕ созданы
  function increment() {
    // Лексическое окружение increment создается ТОЛЬКО при вызове
    count++;
    console.log(\`  \${name}: increment to \${count}\`);
    return count;
  }

  function decrement() {
    // Лексическое окружение decrement создается ТОЛЬКО при вызове
    count--;
    console.log(\`  \${name}: decrement to \${count}\`);
    return count;
  }

  function getValue() {
    // Лексическое окружение getValue создается ТОЛЬКО при вызове
    console.log(\`  \${name}: current value is \${count}\`);
    return count;
  }

  // Возвращаем объект с методами (все функции создают замыкания)
  return { increment, decrement, getValue };
}

console.log("\\n1. Определили createCounter");
console.log("   - Лексическое окружение createCounter ещё НЕ создано");

console.log("\\n2. Вызываем createCounter('Counter1')");
const counter1 = createCounter('Counter1');
// ЗДЕСЬ создалось лексическое окружение createCounter для первого вызова

console.log("\\n3. Вызываем createCounter('Counter2')");
const counter2 = createCounter('Counter2');
// ЗДЕСЬ создалось НОВОЕ лексическое окружение createCounter для второго вызова

console.log("\\n4. Вызываем методы счетчиков:");
console.log("   - counter1.increment() - создается лексическое окружение increment");
counter1.increment();

console.log("   - counter2.getValue() - создается лексическое окружение getValue");
counter2.getValue();

console.log("   - counter1.increment() - создается НОВОЕ лексическое окружение increment");
counter1.increment();

console.log("   - Каждый вызов функции создает НОВОЕ лексическое окружение");
`

const snippet4 = `
// Важные нюансы и подводные камни
console.log("=== Важные нюансы создания лексического окружения ===");

// 1. Рекурсивные функции
function recursiveExample(n, depth = 0) {
  console.log(\`  \${"  ".repeat(depth)}Вызов \${depth + 1}, n = \${n}\`);

  // Каждый рекурсивный вызов создает НОВОЕ лексическое окружение
  // со своими копиями параметров n и depth

  if (n <= 1) {
    console.log(\`  \${"  ".repeat(depth)}Базовый случай достигнут\`);
    return n;
  }

  // Два новых лексических окружения будут созданы для рекурсивных вызовов
  return recursiveExample(n - 1, depth + 1) + recursiveExample(n - 2, depth + 1);
}

console.log("\\n1. Рекурсивный пример:");
console.log("   Каждый вызов создает новое лексическое окружение");
const result = recursiveExample(4);
console.log("   Результат:", result);

// 2. Функции как значения
console.log("\\n2. Функции как значения:");
const functionCreator = function(prefix) {
  console.log(\`Создаем функцию с prefix "\${prefix}"\`);

  // Лексическое окружение этого вызова сохраняется в замыкании
  return function(message) {
    // Новое лексическое окружение создается при каждом вызове возвращенной функции
    console.log(\`\${prefix}: \${message}\`);
  };
};

const logger1 = functionCreator("LOG");    // Создается лексическое окружение #1
const logger2 = functionCreator("DEBUG");  // Создается лексическое окружение #2

logger1("Сообщение 1"); // Создается лексическое окружение для вызова logger1
logger2("Сообщение 2"); // Создается лексическое окружение для вызова logger2

// 3. Методы объектов
console.log("\\n3. Методы объектов:");
const obj = {
  name: "TestObject",

  // Метод определен, но лексическое окружение создается при вызове
  regularMethod: function() {
    console.log("  regularMethod вызван, this.name =", this.name);
    // Лексическое окружение создается ЗДЕСЬ при вызове
  },

  // Стрелочная функция - лексическое окружение тоже создается при вызове
  arrowMethod: () => {
    console.log("  arrowMethod вызван, this =", this === globalThis ? "globalThis" : this);
    // Лексическое окружение создается ЗДЕСЬ при вызове
  }
};

console.log("   Методы определены, лексические окружения НЕ созданы");
obj.regularMethod(); // ЗДЕСЬ создается лексическое окружение regularMethod
obj.arrowMethod();   // ЗДЕСЬ создается лексическое окружение arrowMethod

// 4. Конструкторы
console.log("\\n4. Конструкторы:");
function Constructor(value) {
  console.log("  Конструктор вызван с value =", value);
  // Лексическое окружение Constructor создается при каждом вызове new Constructor()

  this.value = value;

  this.getValue = function() {
    // Лексическое окружение getValue создается при каждом вызове метода
    return this.value;
  };
}

const instance1 = new Constructor("Test1"); // Лексическое окружение Constructor #1
const instance2 = new Constructor("Test2"); // Лексическое окружение Constructor #2

console.log("  instance1.getValue():", instance1.getValue()); // Лексическое окружение getValue #1
console.log("  instance2.getValue():", instance2.getValue()); // Лексическое окружение getValue #2
`

const snippet5 = `
// Визуализация жизненного цикла лексического окружения
console.log("=== Жизненный цикл лексического окружения ===");

function demonstrateLifecycle() {
  console.log("\\n📋 Этап 1: ОПРЕДЕЛЕНИЕ функции");
  console.log("   - Создается объект функции");
  console.log("   - Запоминается внешняя область видимости (где функция определена)");
  console.log("   - Лексическое окружение ещё НЕ создано!");

  function innerFunction(param) {
    console.log("\\n🏗️  Этап 2: СОЗДАНИЕ лексического окружения (при вызове)");
    console.log("   - Создается Environment Record");
    console.log("   - Устанавливается Outer Reference");
    console.log("   - Происходит hoisting");
    console.log("   - param =", param);

    console.log("\\n⚡ Этап 3: ВЫПОЛНЕНИЕ кода");
    console.log("   - Инициализируются переменные");
    console.log("   - Выполняется логика функции");

    var localVar = "Локальная переменная";
    console.log("   - localVar =", localVar);

    return function closure() {
      console.log("\\n🔗 Этап 4: ЗАМЫКАНИЕ");
      console.log("   - Внутренняя функция сохраняет ссылку на внешнее окружение");
      console.log("   - param из родительской области:", param);
      console.log("   - localVar из родительской области:", localVar);
    };
  }

  console.log("\\n📦 Возвращаем innerFunction (определена, окружение НЕ создано)");
  return innerFunction;
}

console.log("=== Демонстрация ===");
console.log("1. Определяем demonstrateLifecycle");

const getInnerFunction = demonstrateLifecycle();
console.log("2. Получили innerFunction, её окружение ещё НЕ создано");

const closure = getInnerFunction("test-param");
console.log("3. Вызвали innerFunction - создалось лексическое окружение");

closure();
console.log("4. Вызвали замыкание - создалось новое лексическое окружение");

console.log("\\n🗑️  Этап 5: СБОРКА МУСОРА");
console.log("   - Лексическое окружение удаляется, когда на него нет ссылок");
console.log("   - Замыкания могут сохранять окружение в памяти");
console.log("   - Важно избегать циклических ссылок!");

// Демонстрация того, что каждый вызов создает новое окружение
console.log("\\n=== Каждый вызов = новое окружение ===");

function createUniqueEnvironment(id) {
  const environmentId = Math.random().toString(36).substr(2, 9);
  console.log(\`Создаем окружение \${id} с ID: \${environmentId}\`);

  return function showEnvironment() {
    console.log(\`  Окружение \${id} (ID: \${environmentId}) все еще существует\`);
  };
}

const env1 = createUniqueEnvironment("A"); // Лексическое окружение A
const env2 = createUniqueEnvironment("B"); // Лексическое окружение B
const env3 = createUniqueEnvironment("C"); // Лексическое окружение C

console.log("\\nВызываем функции из разных окружений:");
env1(); // Используется окружение A
env2(); // Используется окружение B
env3(); // Используется окружение C
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
              В какой момент создается лексическое окружение?
            </h1>

            <div class="mb-6 pa-6 rounded-lg" style="background-color: #e8f5e8; border-left: 4px solid #4caf50;">
              <h2 class="text-h6 font-weight-bold mb-3" style="color: #2e7d32;">🎯 Краткий ответ для собеседования:</h2>
              <p class="font-weight-medium mb-2" style="color: #1b5e20;">
                <strong>Лексическое окружение создается в момент ВЫПОЛНЕНИЯ функции, НЕ в момент её определения!</strong>
              </p>
              <div class="mt-4">
                <p class="mb-2" style="color: #2e7d32;"><strong>При определении функции:</strong></p>
                <ul class="mb-3" style="color: #1b5e20;">
                  <li>Создается только объект функции</li>
                  <li>Запоминается место определения (для Outer Reference)</li>
                  <li>Лексическое окружение НЕ создается</li>
                </ul>
                <p class="mb-2" style="color: #2e7d32;"><strong>При вызове функции:</strong></p>
                <ul style="color: #1b5e20;">
                  <li>Создается новое лексическое окружение</li>
                  <li>Инициализируются переменные и параметры</li>
                  <li>Устанавливается ссылка на внешнее окружение</li>
                </ul>
              </div>
            </div>

            <h2 class="text-h5 font-weight-bold mb-3">Демонстрация момента создания</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Фазы создания лексического окружения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практический пример: определение vs выполнение</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Важные нюансы и подводные камни</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Жизненный цикл лексического окружения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Визуальное представление процесса</h2>
            <v-row class="mb-8">
              <v-col cols="12">
                <v-timeline direction="vertical" side="end" class="custom-timeline">
                  <v-timeline-item
                    dot-color="blue"
                    size="large">
                    <template v-slot:icon>
                      <v-icon color="white">mdi-code-braces</v-icon>
                    </template>
                    <div class="pa-4 bg-blue-lighten-5 rounded">
                      <h3 class="font-weight-bold mb-2">1. Определение функции</h3>
                      <ul>
                        <li>Создается объект Function</li>
                        <li>Запоминается лексическая область определения</li>
                        <li>Функция готова к вызову</li>
                        <li><strong>Лексическое окружение НЕ создается!</strong></li>
                      </ul>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="orange"
                    size="large">
                    <template v-slot:icon>
                      <v-icon color="white">mdi-play</v-icon>
                    </template>
                    <div class="pa-4 bg-orange-lighten-5 rounded">
                      <h3 class="font-weight-bold mb-2">2. Вызов функции</h3>
                      <ul>
                        <li><strong>Создается лексическое окружение</strong></li>
                        <li>Инициализируется Environment Record</li>
                        <li>Устанавливается Outer Reference</li>
                        <li>Происходит hoisting переменных</li>
                      </ul>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="green"
                    size="large">
                    <template v-slot:icon>
                      <v-icon color="white">mdi-lightning-bolt</v-icon>
                    </template>
                    <div class="pa-4 bg-green-lighten-5 rounded">
                      <h3 class="font-weight-bold mb-2">3. Выполнение кода</h3>
                      <ul>
                        <li>Присваиваются значения переменным</li>
                        <li>Переменные let/const выходят из TDZ</li>
                        <li>Выполняется логика функции</li>
                        <li>Возможно создание замыканий</li>
                      </ul>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item
                    dot-color="red"
                    size="large">
                    <template v-slot:icon>
                      <v-icon color="white">mdi-delete</v-icon>
                    </template>
                    <div class="pa-4 bg-red-lighten-5 rounded">
                      <h3 class="font-weight-bold mb-2">4. Завершение / Сборка мусора</h3>
                      <ul>
                        <li>Функция завершает выполнение</li>
                        <li>Лексическое окружение помечается для удаления</li>
                        <li>Исключение: замыкания сохраняют ссылки</li>
                        <li>Сборщик мусора удаляет неиспользуемые окружения</li>
                      </ul>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые моменты</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Правильное понимание</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>Лексическое окружение = момент ВЫПОЛНЕНИЯ</li>
                    <li>Каждый вызов = новое окружение</li>
                    <li>Замыкания сохраняют ссылки на окружения</li>
                    <li>Рекурсия создает множество окружений</li>
                    <li>Outer Reference определяется при создании функции</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Частые заблуждения</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li>❌ Окружение создается при определении</li>
                    <li>❌ Одно окружение для всех вызовов</li>
                    <li>❌ Переменные сразу инициализированы</li>
                    <li>❌ Замыкания не влияют на время жизни</li>
                    <li>❌ this определяется при создании функции</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Вопросы на собеседовании</h2>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">1. В какой момент создается лексическое окружение?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Лексическое окружение создается в момент <strong>выполнения</strong> функции, а не в момент её определения.</p>
                  <p><strong>Детально:</strong></p>
                  <ul>
                    <li><strong>При определении:</strong> создается только объект функции, запоминается место определения</li>
                    <li><strong>При вызове:</strong> создается новое лексическое окружение с Environment Record и Outer Reference</li>
                    <li><strong>Каждый вызов:</strong> создает отдельное лексическое окружение</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">2. Что происходит при определении функции?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> При определении функции:</p>
                  <ul>
                    <li>Создается объект Function</li>
                    <li>Запоминается лексическая область, где функция определена (для будущего Outer Reference)</li>
                    <li>Функция становится доступной для вызова</li>
                    <li><strong>Лексическое окружение НЕ создается</strong></li>
                  </ul>
                  <p><strong>Важно:</strong> Место определения функции определяет, на какое внешнее окружение будет ссылаться её Outer Reference при создании.</p>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">3. Создается ли новое окружение при каждом вызове?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Да, при каждом вызове функции создается <strong>новое лексическое окружение</strong>.</p>
                  <p><strong>Это означает:</strong></p>
                  <ul>
                    <li>Каждый вызов имеет свои локальные переменные</li>
                    <li>Рекурсивные вызовы создают стек окружений</li>
                    <li>Замыкания могут сохранять ссылки на разные окружения</li>
                    <li>Параметры функции изолированы между вызовами</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">4. Как замыкания связаны с моментом создания окружения?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Замыкания формируются в момент определения внутренней функции, но лексическое окружение создается при выполнении.</p>
                  <p><strong>Детально:</strong></p>
                  <ul>
                    <li><strong>При определении внутренней функции:</strong> запоминается ссылка на текущее окружение</li>
                    <li><strong>При вызове внешней функции:</strong> создается окружение, которое может быть "захвачено"</li>
                    <li><strong>При вызове внутренней функции:</strong> создается её собственное окружение + доступ к "захваченному"</li>
                    <li><strong>Замыкание продлевает жизнь окружения:</strong> не даёт сборщику мусора его удалить</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">5. Что происходит с окружением после завершения функции?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Лексическое окружение помечается для удаления сборщиком мусора, если на него нет активных ссылок.</p>
                  <p><strong>Исключения:</strong></p>
                  <ul>
                    <li><strong>Замыкания:</strong> сохраняют ссылку на окружение</li>
                    <li><strong>Глобальные переменные:</strong> ссылаются на окружение</li>
                    <li><strong>Event listeners:</strong> могут сохранять ссылки</li>
                    <li><strong>Активные вызовы:</strong> окружения в стеке выполнения</li>
                  </ul>
                  <p><strong>Проблема:</strong> Циклические ссылки могут предотвратить сборку мусора и привести к утечкам памяти.</p>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <div class="font-weight-bold">6. В чем разница между hoisting и созданием окружения?</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p><strong>Ответ:</strong> Hoisting происходит в фазе создания лексического окружения, но это разные концепции:</p>
                  <p><strong>Создание окружения (Creation Phase):</strong></p>
                  <ul>
                    <li>Создается Environment Record</li>
                    <li>Устанавливается Outer Reference</li>
                    <li>Происходит hoisting переменных и функций</li>
                    <li><code>var</code> инициализируются как <code>undefined</code></li>
                    <li><code>let/const</code> помещаются в TDZ</li>
                  </ul>
                  <p><strong>Выполнение кода (Execution Phase):</strong></p>
                  <ul>
                    <li>Присваиваются фактические значения</li>
                    <li><code>let/const</code> выходят из TDZ при инициализации</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Практические советы</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" style="background-color: #fff3e0; border-left: 4px solid #ff9800;">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="orange" class="mr-2">mdi-lightbulb</v-icon>
                    <h3 class="text-h6 font-weight-bold">Отладка</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Используйте debugger для изучения scope chain</li>
                    <li>Помните: каждый breakpoint показывает текущее окружение</li>
                    <li>Инспектируйте замыкания в DevTools</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" style="background-color: #e3f2fd; border-left: 4px solid #2196f3;">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="blue" class="mr-2">mdi-memory</v-icon>
                    <h3 class="text-h6 font-weight-bold">Производительность</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Избегайте создания функций в циклах</li>
                    <li>Очищайте ссылки на замыкания</li>
                    <li>Используйте WeakMap для слабых ссылок</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" style="background-color: #f3e5f5; border-left: 4px solid #9c27b0;">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="purple" class="mr-2">mdi-code-tags</v-icon>
                    <h3 class="text-h6 font-weight-bold">Лучшие практики</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Понимайте время жизни переменных</li>
                    <li>Используйте const/let вместо var</li>
                    <li>Документируйте сложные замыкания</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <div class="mb-6 pa-6 rounded-lg" style="background-color: #fff8e1; border-left: 4px solid #ffc107;">
              <h2 class="text-h6 font-weight-bold mb-3" style="color: #f57c00;">💡 Резюме для собеседования</h2>
              <div style="color: #e65100;">
                <p class="font-weight-medium mb-3">
                  <strong>Главное правило:</strong> Лексическое окружение создается в момент ВЫПОЛНЕНИЯ функции, НЕ определения.
                </p>
                <p class="mb-3">
                  <strong>Этапы:</strong> Определение функции → Вызов функции (создание окружения) → Выполнение кода → Завершение/сборка мусора
                </p>
                <p class="mb-3">
                  <strong>Ключевые моменты:</strong> Каждый вызов = новое окружение, замыкания продлевают жизнь окружения, Outer Reference определяется местом определения функции
                </p>
                <p>
                  <strong>Практическое применение:</strong> Понимание этого принципа критично для работы с замыканиями, модулями, callbacks и избежания утечек памяти.
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
