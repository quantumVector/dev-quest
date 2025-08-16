<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const promiseRaceSnippet = `
// Promise.race - возвращает первый resolved/rejected Promise
const promise1 = new Promise(resolve => setTimeout(() => resolve('Первый'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Второй'), 500));
const promise3 = new Promise((_, reject) => setTimeout(() => reject('Ошибка'), 750));

Promise.race([promise1, promise2, promise3])
  .then(result => console.log(result))  // 'Второй' (самый быстрый)
  .catch(error => console.log(error));

// Пример с отклонением первым
const fastReject = new Promise((_, reject) => setTimeout(() => reject('Быстрая ошибка'), 200));
const slowResolve = new Promise(resolve => setTimeout(() => resolve('Медленный успех'), 1000));

Promise.race([fastReject, slowResolve])
  .then(result => console.log(result))
  .catch(error => console.log(error)); // 'Быстрая ошибка'

// Практический пример: timeout для запроса
const fetchWithTimeout = (url, timeout = 5000) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), timeout)
  );

  return Promise.race([
    fetch(url),
    timeoutPromise
  ]);
};

fetchWithTimeout('/api/data', 3000)
  .then(response => response.json())
  .catch(error => console.error('Запрос завершился с ошибкой:', error));
`

const promiseAnySnippet = `
// Promise.any - возвращает первый successfully resolved Promise
// Отклоняется только если ВСЕ promises отклонены (AggregateError)

const promise1 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 1'), 300));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Успех 2'), 500));
const promise3 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 3'), 200));

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result))  // 'Успех 2' (первый успешный)
  .catch(error => console.log(error));

// Все promises отклонены - AggregateError
const allReject1 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 1'), 100));
const allReject2 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 2'), 200));
const allReject3 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 3'), 300));

Promise.any([allReject1, allReject2, allReject3])
  .then(result => console.log(result))
  .catch(error => {
    console.log(error.name);     // 'AggregateError'
    console.log(error.errors);   // ['Ошибка 1', 'Ошибка 2', 'Ошибка 3']
  });

// Практический пример: запрос к нескольким API
const fetchFromMultipleAPIs = (urls) => {
  const requests = urls.map(url =>
    fetch(url).then(response => {
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return response.json();
    })
  );

  return Promise.any(requests);
};

fetchFromMultipleAPIs([
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
])
.then(data => console.log('Получены данные:', data))
.catch(error => console.log('Все API недоступны:', error.errors));
`

const promiseAllSettledSnippet = `
// Promise.allSettled - дожидается завершения ВСЕХ promises
// Возвращает массив с результатами всех promises (fulfilled/rejected)

const promise1 = Promise.resolve('Успех 1');
const promise2 = Promise.reject('Ошибка 2');
const promise3 = new Promise(resolve => setTimeout(() => resolve('Успех 3'), 1000));
const promise4 = new Promise((_, reject) => setTimeout(() => reject('Ошибка 4'), 500));

Promise.allSettled([promise1, promise2, promise3, promise4])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Promise \${index + 1} успешен:\`, result.value);
      } else {
        console.log(\`Promise \${index + 1} отклонен:\`, result.reason);
      }
    });
  });

// Результат:
// [
//   { status: 'fulfilled', value: 'Успех 1' },
//   { status: 'rejected', reason: 'Ошибка 2' },
//   { status: 'fulfilled', value: 'Успех 3' },
//   { status: 'rejected', reason: 'Ошибка 4' }
// ]

// Практический пример: множественные запросы с обработкой ошибок
const fetchMultipleResources = async (urls) => {
  const requests = urls.map(url =>
    fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject(\`HTTP \${response.status}\`))
      .catch(error => ({ error: error.message || error }))
  );

  const results = await Promise.allSettled(requests);

  const successful = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  const failed = results
    .filter(result => result.status === 'rejected')
    .map((result, index) => ({ url: urls[index], reason: result.reason }));

  return { successful, failed };
};

// Использование
fetchMultipleResources([
  '/api/users',
  '/api/posts',
  '/api/comments'
]).then(({ successful, failed }) => {
  console.log('Успешные запросы:', successful);
  console.log('Неудачные запросы:', failed);
});
`

const comparisonSnippet = `
// Сравнение методов Promise

// Тестовые promises
const fast = new Promise(resolve => setTimeout(() => resolve('Быстрый'), 100));
const slow = new Promise(resolve => setTimeout(() => resolve('Медленный'), 500));
const error = new Promise((_, reject) => setTimeout(() => reject('Ошибка'), 300));

// Promise.all - ВСЕ должны успешно выполниться
Promise.all([fast, slow])
  .then(results => console.log('Promise.all:', results)) // ['Быстрый', 'Медленный']
  .catch(error => console.log('Promise.all error:', error));

Promise.all([fast, slow, error])
  .then(results => console.log('Promise.all:', results))
  .catch(error => console.log('Promise.all error:', error)); // 'Ошибка'

// Promise.race - первый завершившийся (успех ИЛИ ошибка)
Promise.race([fast, slow])
  .then(result => console.log('Promise.race:', result)) // 'Быстрый'
  .catch(error => console.log('Promise.race error:', error));

Promise.race([fast, slow, error])
  .then(result => console.log('Promise.race:', result)) // 'Быстрый' (он быстрее ошибки)
  .catch(error => console.log('Promise.race error:', error));

// Promise.any - первый успешный
Promise.any([error, slow])
  .then(result => console.log('Promise.any:', result)) // 'Медленный'
  .catch(error => console.log('Promise.any error:', error));

// Promise.allSettled - результаты всех
Promise.allSettled([fast, slow, error])
  .then(results => console.log('Promise.allSettled:', results));
  // [
  //   { status: 'fulfilled', value: 'Быстрый' },
  //   { status: 'fulfilled', value: 'Медленный' },
  //   { status: 'rejected', reason: 'Ошибка' }
  // ]
`

const practicalExamplesSnippet = `
// Практические примеры использования

// 1. Promise.race для timeout
const createTimeoutPromise = (ms, message = 'Timeout') =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

const fetchWithTimeout = (url, timeoutMs = 5000) => {
  return Promise.race([
    fetch(url),
    createTimeoutPromise(timeoutMs, 'Request timeout')
  ]);
};

// 2. Promise.any для fallback запросов
const fetchWithFallback = (primaryUrl, fallbackUrls) => {
  return Promise.any([
    fetch(primaryUrl),
    ...fallbackUrls.map(url => fetch(url))
  ]);
};

// 3. Promise.allSettled для batch операций
const batchProcess = async (items, processor) => {
  const promises = items.map(item =>
    processor(item).catch(error => ({ error, item }))
  );

  const results = await Promise.allSettled(promises);

  return {
    successful: results
      .filter(r => r.status === 'fulfilled' && !r.value.error)
      .map(r => r.value),
    failed: results
      .filter(r => r.status === 'rejected' || r.value?.error)
      .map(r => ({
        item: r.value?.item,
        error: r.status === 'rejected' ? r.reason : r.value.error
      }))
  };
};

// 4. Комбинированное использование
class APIManager {
  constructor(baseUrls, timeout = 5000) {
    this.baseUrls = baseUrls;
    this.timeout = timeout;
  }

  // Запрос к первому доступному серверу
  async fetchFromAnyServer(endpoint) {
    const requests = this.baseUrls.map(baseUrl =>
      this.fetchWithTimeout(\`\${baseUrl}\${endpoint}\`, this.timeout)
    );

    try {
      return await Promise.any(requests);
    } catch (error) {
      throw new Error('Все серверы недоступны');
    }
  }

  // Запрос ко всем серверам для сверки данных
  async fetchFromAllServers(endpoint) {
    const requests = this.baseUrls.map(baseUrl =>
      this.fetchWithTimeout(\`\${baseUrl}\${endpoint}\`, this.timeout)
        .then(response => response.json())
        .catch(error => ({ error: error.message }))
    );

    const results = await Promise.allSettled(requests);
    return results.map((result, index) => ({
      server: this.baseUrls[index],
      status: result.status,
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }));
  }

  fetchWithTimeout(url, timeout) {
    return Promise.race([
      fetch(url),
      createTimeoutPromise(timeout)
    ]);
  }
}
`

const highlightedRace = ref('')
const highlightedAny = ref('')
const highlightedAllSettled = ref('')
const highlightedComparison = ref('')
const highlightedPractical = ref('')

onMounted(() => {
  highlightedRace.value = Prism.highlight(promiseRaceSnippet, Prism.languages.javascript, 'javascript')
  highlightedAny.value = Prism.highlight(promiseAnySnippet, Prism.languages.javascript, 'javascript')
  highlightedAllSettled.value = Prism.highlight(promiseAllSettledSnippet, Prism.languages.javascript, 'javascript')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.javascript, 'javascript')
  highlightedPractical.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Promise.race, Promise.any и Promise.allSettled
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Promise.race</b>, <b>Promise.any</b> и <b>Promise.allSettled</b> — это методы для работы
              с несколькими Promise одновременно, каждый с уникальной логикой завершения. Понимание различий
              между ними критично для эффективной работы с асинхронным кодом.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Resolves когда</th>
                <th class="text-left font-weight-bold">Rejects когда</th>
                <th class="text-left font-weight-bold">Результат</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code class="text-primary">Promise.race</code></td>
                <td class="pt-2 pb-2">Первый resolve/reject</td>
                <td class="pt-2 pb-2">Первый reject</td>
                <td class="pt-2 pb-2">Значение первого</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code class="text-success">Promise.any</code></td>
                <td class="pt-2 pb-2">Первый resolve</td>
                <td class="pt-2 pb-2">Все reject</td>
                <td class="pt-2 pb-2">Первое успешное значение</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code class="text-warning">Promise.allSettled</code></td>
                <td class="pt-2 pb-2">Все завершены</td>
                <td class="pt-2 pb-2">Никогда</td>
                <td class="pt-2 pb-2">Массив результатов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code class="text-info">Promise.all</code></td>
                <td class="pt-2 pb-2">Все resolve</td>
                <td class="pt-2 pb-2">Любой reject</td>
                <td class="pt-2 pb-2">Массив значений</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Promise.race — гонка на скорость</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-run-fast</v-icon>
                    <h3 class="text-h6 font-weight-bold">Особенности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Первый финиширует</strong> — resolve или reject</li>
                    <li><strong>Игнорирует остальные</strong> после первого результата</li>
                    <li><strong>Быстрое завершение</strong> — хорошо и плохо</li>
                    <li><strong>Тип результата</strong> зависит от победителя</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-clock-fast</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Timeout для запросов</strong></li>
                    <li><strong>Выбор быстрейшего сервера</strong></li>
                    <li><strong>User race conditions</strong></li>
                    <li><strong>Первый доступный ресурс</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRace"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Promise.any — первый успешный</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-trophy</v-icon>
                    <h3 class="text-h6 font-weight-bold">Особенности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Первый успех</strong> — игнорирует ошибки до того</li>
                    <li><strong>AggregateError</strong> если все отклонены</li>
                    <li><strong>Оптимистичный</strong> — ждет успеха</li>
                    <li><strong>ES2021 (ES12)</strong> — относительно новый</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-backup-restore</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Fallback стратегии</strong></li>
                    <li><strong>Множественные API</strong></li>
                    <li><strong>Резервные источники данных</strong></li>
                    <li><strong>Отказоустойчивость</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAny"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Promise.allSettled — дождаться всех</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-clipboard-check</v-icon>
                    <h3 class="text-h6 font-weight-bold">Особенности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Никогда не reject</strong> — всегда resolve</li>
                    <li><strong>Массив результатов</strong> со статусами</li>
                    <li><strong>Полная информация</strong> о всех операциях</li>
                    <li><strong>ES2020 (ES11)</strong> — относительно новый</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="warning" class="mr-2">mdi-chart-line</v-icon>
                    <h3 class="text-h6 font-weight-bold">Применение</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>Batch операции</strong></li>
                    <li><strong>Сбор статистики</strong></li>
                    <li><strong>Независимые задачи</strong></li>
                    <li><strong>Логирование результатов</strong></li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAllSettled"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение в действии</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPractical"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Promise.race и Promise.any?</p>
                <p class="font-weight-regular ma-0">
                  <code>Promise.race</code> возвращает результат первого завершившегося Promise (успех ИЛИ ошибка).
                  <code>Promise.any</code> возвращает первый успешный результат, игнорируя предыдущие ошибки,
                  и отклоняется только если ВСЕ Promise отклонены.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать Promise.allSettled вместо Promise.all?</p>
                <p class="font-weight-regular ma-0">
                  Используйте <code>Promise.allSettled</code>, когда нужно получить результаты всех операций,
                  независимо от успеха или неудачи. <code>Promise.all</code> завершается неудачей при первой ошибке,
                  а <code>allSettled</code> всегда дожидается завершения всех Promise.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое AggregateError в Promise.any?</p>
                <p class="font-weight-regular ma-0">
                  <code>AggregateError</code> — это специальный тип ошибки, который содержит массив всех ошибок
                  от отклоненных Promise. Он возникает в <code>Promise.any</code> только когда ВСЕ Promise отклонены.
                  У него есть свойство <code>errors</code> с массивом всех причин отклонения.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как реализовать timeout с Promise.race?</p>
                <p class="font-weight-regular ma-0">
                  Создайте Promise, который отклоняется через заданное время, и используйте <code>Promise.race</code>
                  между основным Promise и таймаутом. Первый завершившийся определит результат —
                  либо успешный ответ, либо таймаут-ошибка.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В каком порядке выполняются Promise в этих методах?</p>
                <p class="font-weight-regular ma-0">
                  Все Promise начинают выполняться одновременно (параллельно), а не последовательно.
                  Разница только в логике завершения метода — race ждет первого любого, any — первого успешного,
                  allSettled — всех завершившихся.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли отменить остальные Promise после завершения race/any?</p>
                <p class="font-weight-regular ma-0">
                  Нет, нельзя. Promise не имеют встроенного механизма отмены. После завершения
                  <code>Promise.race</code> или <code>Promise.any</code> остальные Promise продолжают выполняться,
                  просто их результаты игнорируются. Для отмены нужно использовать AbortController.
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
                    <li>Обрабатывать AggregateError в any</li>
                    <li>Использовать timeout в race</li>
                    <li>Проверять статус в allSettled</li>
                    <li>Логировать все результаты</li>
                    <li>Учитывать поддержку браузерами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Полагаться только на race без timeout</li>
                    <li>Игнорировать ошибки в allSettled</li>
                    <li>Забывать про AggregateError</li>
                    <li>Смешивать синхронные и асинхронные операции</li>
                    <li>Ожидать отмены остальных Promise</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Комбинируйте методы для сложной логики</li>
                    <li>Добавляйте полифиллы для старых браузеров</li>
                    <li>Используйте AbortController для отмены</li>
                    <li>Мониторьте производительность</li>
                    <li>Тестируйте граничные случаи</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Chrome</th>
                <th class="text-left font-weight-bold">Firefox</th>
                <th class="text-left font-weight-bold">Safari</th>
                <th class="text-left font-weight-bold">IE/Edge</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>Promise.race</code></td>
                <td class="pt-2 pb-2">32+</td>
                <td class="pt-2 pb-2">29+</td>
                <td class="pt-2 pb-2">11+</td>
                <td class="pt-2 pb-2">Edge 18+</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>Promise.any</code></td>
                <td class="pt-2 pb-2">85+</td>
                <td class="pt-2 pb-2">79+</td>
                <td class="pt-2 pb-2">14+</td>
                <td class="pt-2 pb-2">Edge 85+</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>Promise.allSettled</code></td>
                <td class="pt-2 pb-2">76+</td>
                <td class="pt-2 pb-2">71+</td>
                <td class="pt-2 pb-2">13+</td>
                <td class="pt-2 pb-2">Edge 76+</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Полифиллы для старых браузеров</h2>
            <v-alert color="warning" class="mb-6">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Внимание:</strong> Promise.any и Promise.allSettled относительно новые методы.
              Для поддержки старых браузеров используйте полифиллы или библиотеки типа core-js.
            </v-alert>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Простой полифилл Promise.any</h3>
                  <pre class="text-caption"><code>if (!Promise.any) {
  Promise.any = function(promises) {
    return new Promise((resolve, reject) => {
      const errors = [];
      let rejected = 0;

      promises.forEach((promise, i) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch(error => {
            errors[i] = error;
            if (++rejected === promises.length) {
              reject(new AggregateError(errors));
            }
          });
      });
    });
  };
}</code></pre>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Полифилл Promise.allSettled</h3>
                  <pre class="text-caption"><code>if (!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(
      promises.map(p =>
        Promise.resolve(p)
          .then(value => ({
            status: 'fulfilled',
            value
          }))
          .catch(reason => ({
            status: 'rejected',
            reason
          }))
      )
    );
  };
}</code></pre>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и memory leaks</h2>
            <v-alert color="info" class="mb-6">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Важно:</strong> Promise после завершения race/any продолжают выполняться.
              Для длительных операций это может привести к утечкам памяти или ненужной нагрузке.
            </v-alert>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Проблемы</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Неотменяемые операции</strong> продолжают работу</li>
                    <li><strong>Memory leaks</strong> при длительных задачах</li>
                    <li><strong>Лишняя нагрузка</strong> на сервер/CPU</li>
                    <li><strong>Сложность отладки</strong> параллельных процессов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Решения</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>AbortController</strong> для отмены запросов</li>
                    <li><strong>Timeout</strong> для ограничения времени</li>
                    <li><strong>Cleanup функции</strong> для освобождения ресурсов</li>
                    <li><strong>Мониторинг</strong> активных операций</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать каждый метод</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-primary">Promise.race</h3>
                  <ul class="pl-4 mb-3">
                    <li>Timeout для операций</li>
                    <li>Первый доступный ресурс</li>
                    <li>User interaction race conditions</li>
                    <li>Быстрые fail-fast сценарии</li>
                  </ul>
                  <v-chip color="primary" size="small">Скорость важнее результата</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-success">Promise.any</h3>
                  <ul class="pl-4 mb-3">
                    <li>Fallback стратегии</li>
                    <li>Множественные источники данных</li>
                    <li>Отказоустойчивые системы</li>
                    <li>Первый успешный результат</li>
                  </ul>
                  <v-chip color="success" size="small">Надежность важнее скорости</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-warning">Promise.allSettled</h3>
                  <ul class="pl-4 mb-3">
                    <li>Batch обработка</li>
                    <li>Независимые операции</li>
                    <li>Сбор статистики/метрик</li>
                    <li>Анализ результатов</li>
                  </ul>
                  <v-chip color="warning" size="small">Полнота данных важнее</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-3 text-info">Promise.all</h3>
                  <ul class="pl-4 mb-3">
                    <li>Все операции критичны</li>
                    <li>Зависимые данные</li>
                    <li>Атомарные операции</li>
                    <li>Fail-fast при любой ошибке</li>
                  </ul>
                  <v-chip color="info" size="small">Все или ничего</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Promise.race</b> возвращает первый завершившийся результат (успех или ошибка).
              <b>Promise.any</b> возвращает первый успешный результат, игнорируя ошибки.
              <b>Promise.allSettled</b> дожидается завершения всех Promise и возвращает массив с результатами.
              Выбор метода зависит от бизнес-логики: нужна ли скорость, надежность или полнота данных.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
                target="_blank"
                class="mr-2">
                MDN Promise Reference
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://tc39.es/ecma262/#sec-promise-objects"
                target="_blank">
                ECMAScript Specification
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
