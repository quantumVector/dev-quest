<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const basicSyntaxSnippet = `
// Создание регулярных выражений
const regex1 = /pattern/flags;           // Литеральная запись
const regex2 = new RegExp('pattern', 'flags'); // Конструктор

// Основные флаги
const global = /abc/g;      // g - глобальный поиск (все совпадения)
const ignoreCase = /abc/i;  // i - игнорировать регистр
const multiline = /abc/m;   // m - многострочный режим
const dotAll = /abc/s;      // s - . включает \\n
const unicode = /abc/u;     // u - Unicode режим
const sticky = /abc/y;      // y - поиск с текущей позиции

// Комбинирование флагов
const combined = /pattern/gim;

// Методы для работы с RegExp
const text = "Hello World 123";
const pattern = /\\d+/;

console.log(pattern.test(text));        // true - есть ли совпадение
console.log(pattern.exec(text));        // ["123"] - детали совпадения
console.log(text.match(pattern));       // ["123"] - поиск в строке
console.log(text.search(pattern));      // 12 - позиция первого совпадения
console.log(text.replace(pattern, "456")); // "Hello World 456"
`

const characterClassesSnippet = `
// Символьные классы
const digits = /\\d/;       // [0-9] - любая цифра
const nonDigits = /\\D/;    // [^0-9] - любой не-цифра
const word = /\\w/;         // [a-zA-Z0-9_] - буква, цифра или _
const nonWord = /\\W/;      // [^a-zA-Z0-9_] - не буква/цифра/_
const space = /\\s/;        // [ \\t\\r\\n\\f] - пробельный символ
const nonSpace = /\\S/;     // [^ \\t\\r\\n\\f] - не пробельный

// Собственные классы
const vowels = /[aeiou]/i;           // любая гласная
const notVowels = /[^aeiou]/i;       // не гласная
const range = /[a-zA-Z0-9]/;         // буквы и цифры
const specific = /[.,!?]/;           // конкретные символы

// Квантификаторы
const oneOrMore = /\\d+/;            // 1 или больше цифр
const zeroOrMore = /\\d*/;           // 0 или больше цифр
const zeroOrOne = /\\d?/;            // 0 или 1 цифра
const exactly = /\\d{3}/;            // ровно 3 цифры
const range2 = /\\d{2,5}/;           // от 2 до 5 цифр
const minimum = /\\d{2,}/;           // минимум 2 цифры

// Жадные vs ленивые квантификаторы
const greedy = /<.*>/;     // жадный - захватит всё между < и >
const lazy = /<.*?>/;      // ленивый - минимальный захват
`

const anchorsGroupsSnippet = `
// Якоря и границы
const startLine = /^Hello/;          // начало строки
const endLine = /world$/;            // конец строки
const wordBoundary = /\\bword\\b/;    // граница слова
const notWordBoundary = /\\Bword\\B/; // не граница слова

// Группы и захваты
const simpleGroup = /(\\d{2})-(\\d{2})-(\\d{4})/; // захватывающие группы
const namedGroup = /(?<day>\\d{2})-(?<month>\\d{2})-(?<year>\\d{4})/; // именованные группы
const nonCapturing = /(?:\\d{2})-(?:\\d{2})-(?:\\d{4})/; // не захватывающая группа

const dateText = "Дата: 25-12-2023";
const match = dateText.match(namedGroup);
console.log(match.groups.day);   // "25"
console.log(match.groups.month); // "12"
console.log(match.groups.year);  // "2023"

// Альтернация
const either = /cat|dog/;           // либо cat, либо dog
const grouped = /(cat|dog)s?/;      // cats, cat, dogs, dog

// Обратные ссылки
const repeated = /(['"])(.*?)\\1/;   // строка в кавычках (одинаковых)
const text2 = 'Он сказал "Привет" и добавил \\'Пока\\'';
console.log(text2.match(repeated)); // находит строки в кавычах
`

const lookaheadLookbehindSnippet = `
// Опережающие и ретроспективные проверки

// Позитивная опережающая проверка (?=...)
const followedBy = /\\d+(?=px)/;    // цифры, за которыми следует "px"
console.log("100px 200em".match(followedBy)); // ["100"]

// Негативная опережающая проверка (?!...)
const notFollowedBy = /\\d+(?!px)/; // цифры, за которыми НЕ следует "px"
console.log("100px 200em".match(notFollowedBy)); // ["200"]

// Позитивная ретроспективная проверка (?<=...)
const precededBy = /(?<=\\$)\\d+/;   // цифры, перед которыми стоит "$"
console.log("$100 €200".match(precededBy)); // ["100"]

// Негативная ретроспективная проверка (?<!...)
const notPrecededBy = /(?<!\\$)\\d+/; // цифры, перед которыми НЕ стоит "$"
console.log("$100 €200".match(notPrecededBy)); // ["200"]

// Практический пример: пароль
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
// Минимум 8 символов, есть строчная, заглавная, цифра и спецсимвол

console.log(passwordRegex.test("Password123!")); // true
console.log(passwordRegex.test("password"));     // false
`

const practicalExamplesSnippet = `
// Практические примеры валидации

// Email (упрощенный)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

// Телефон (российский)
const phoneRegex = /^\\+?7\\s?\\(?\\d{3}\\)?\\s?\\d{3}[-\\s]?\\d{2}[-\\s]?\\d{2}$/;

// URL
const urlRegex = /^https?:\\/\\/[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(:[0-9]+)?(\\/.*)?$/;

// IP адрес
const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Дата в формате DD.MM.YYYY
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(19|20)\\d{2}$/;

// Извлечение данных
const logEntry = "2023-12-25 14:30:15 ERROR User johndoe failed login";
const logRegex = /^(\\d{4}-\\d{2}-\\d{2})\\s+(\\d{2}:\\d{2}:\\d{2})\\s+(\\w+)\\s+(.+)$/;

const match = logEntry.match(logRegex);
if (match) {
  console.log("Дата:", match[1]);     // "2023-12-25"
  console.log("Время:", match[2]);    // "14:30:15"
  console.log("Уровень:", match[3]);  // "ERROR"
  console.log("Сообщение:", match[4]); // "User johndoe failed login"
}

// Замена с функцией
const text = "Цена: $100, Скидка: $20";
const priceRegex = /\\$(\\d+)/g;

const converted = text.replace(priceRegex, (match, price) => {
  return \`₽\${price * 75}\`; // конвертация $ в ₽
});
console.log(converted); // "Цена: ₽7500, Скидка: ₽1500"
`

const commonMistakesSnippet = `
// Распространенные ошибки и ловушки

// ❌ Забывание экранирования
const wrong1 = /www.example.com/; // . означает любой символ!
const correct1 = /www\\.example\\.com/; // правильно

// ❌ Жадные квантификаторы
const html = '<div class="test">content</div>';
const wrong2 = /<.*>/;  // захватит всю строку
const correct2 = /<.*?>/; // захватит только <div class="test">

// ❌ Неправильное использование глобального флага
const regex = /\\d+/g;
console.log(regex.test("123")); // true
console.log(regex.test("123")); // false! (lastIndex сохраняется)

// Решение: сброс или создание нового
regex.lastIndex = 0; // сброс
// или
const freshRegex = /\\d+/g; // новый экземпляр

// ❌ Игнорирование специальных символов
const userInput = "user@example.com";
const wrong3 = new RegExp(userInput); // опасно если ввод содержит спецсимволы
const correct3 = new RegExp(userInput.replace(/[.*+?^$\{\}()|[\\]\\\\]/g, '\\\\$&'));

// ❌ Неправильная работа с многострочным текстом
const multiText = \`line1
line2
line3\`;

const wrong4 = /^line2$/;   // не найдет
const correct4 = /^line2$/m; // найдет с флагом m
`

const highlightedBasicSyntax = ref('')
const highlightedCharacterClasses = ref('')
const highlightedAnchorsGroups = ref('')
const highlightedLookaheadLookbehind = ref('')
const highlightedPracticalExamples = ref('')
const highlightedCommonMistakes = ref('')

onMounted(() => {
  highlightedBasicSyntax.value = Prism.highlight(basicSyntaxSnippet, Prism.languages.javascript, 'javascript')
  highlightedCharacterClasses.value = Prism.highlight(characterClassesSnippet, Prism.languages.javascript, 'javascript')
  highlightedAnchorsGroups.value = Prism.highlight(anchorsGroupsSnippet, Prism.languages.javascript, 'javascript')
  highlightedLookaheadLookbehind.value = Prism.highlight(lookaheadLookbehindSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedCommonMistakes.value = Prism.highlight(commonMistakesSnippet, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Регулярные выражения (RegExp) в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Регулярные выражения (RegExp)</b> — это мощный инструмент для поиска, проверки и замены текстовых шаблонов.
              В JavaScript регулярные выражения представлены объектом RegExp и предоставляют гибкие возможности
              для работы со строками через паттерны.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основной синтаксис и флаги</h2>
            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Флаг</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>g</b></td>
                <td>Глобальный поиск (все совпадения)</td>
                <td><code>/abc/g</code></td>
              </tr>
              <tr>
                <td><b>i</b></td>
                <td>Игнорировать регистр</td>
                <td><code>/abc/i</code></td>
              </tr>
              <tr>
                <td><b>m</b></td>
                <td>Многострочный режим</td>
                <td><code>/^abc/m</code></td>
              </tr>
              <tr>
                <td><b>s</b></td>
                <td>Точка включает переносы строк</td>
                <td><code>/a.c/s</code></td>
              </tr>
              <tr>
                <td><b>u</b></td>
                <td>Unicode режим</td>
                <td><code>/\\u{1F600}/u</code></td>
              </tr>
              <tr>
                <td><b>y</b></td>
                <td>Поиск с текущей позиции</td>
                <td><code>/abc/y</code></td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicSyntax"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Символьные классы и квантификаторы</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Готовые классы</h3>
                  <ul class="pl-4">
                    <li><code>\\d</code> — цифры [0-9]</li>
                    <li><code>\\w</code> — буквы, цифры, _</li>
                    <li><code>\\s</code> — пробельные символы</li>
                    <li><code>\\D</code> — не цифры</li>
                    <li><code>\\W</code> — не буквы/цифры</li>
                    <li><code>\\S</code> — не пробелы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Квантификаторы</h3>
                  <ul class="pl-4">
                    <li><code>+</code> — 1 или больше</li>
                    <li><code>*</code> — 0 или больше</li>
                    <li><code>?</code> — 0 или 1</li>
                    <li><code>{n}</code> — ровно n</li>
                    <li><code>{n,m}</code> — от n до m</li>
                    <li><code>{n,}</code> — минимум n</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCharacterClasses"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Якоря и группы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAnchorsGroups"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Опережающие и ретроспективные проверки</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Lookahead и Lookbehind</strong> позволяют проверить, что идет до или после паттерна, не включая это в результат.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLookaheadLookbehind"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Распространенные ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCommonMistakes"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Методы для работы с RegExp</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод</th>
                <th class="text-left font-weight-bold">Возвращает</th>
                <th class="text-left font-weight-bold">Описание</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><code>regex.test(str)</code></td>
                <td>boolean</td>
                <td>Проверяет наличие совпадения</td>
              </tr>
              <tr>
                <td><code>regex.exec(str)</code></td>
                <td>Array | null</td>
                <td>Возвращает детали первого совпадения</td>
              </tr>
              <tr>
                <td><code>str.match(regex)</code></td>
                <td>Array | null</td>
                <td>Находит совпадения в строке</td>
              </tr>
              <tr>
                <td><code>str.search(regex)</code></td>
                <td>number</td>
                <td>Позиция первого совпадения</td>
              </tr>
              <tr>
                <td><code>str.replace(regex, replacement)</code></td>
                <td>string</td>
                <td>Заменяет совпадения</td>
              </tr>
              <tr>
                <td><code>str.split(regex)</code></td>
                <td>Array</td>
                <td>Разбивает строку по паттерну</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между /pattern/ и new RegExp('pattern')?</p>
                <p class="font-weight-regular ma-0">
                  Литеральная запись /pattern/ компилируется во время разбора кода и более производительна.
                  new RegExp() позволяет создавать регулярные выражения из строк динамически,
                  но требует двойного экранирования спецсимволов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое жадные и ленивые квантификаторы?</p>
                <p class="font-weight-regular ma-0">
                  Жадные квантификаторы (+, *, {n,}) захватывают максимально возможное количество символов.
                  Ленивые квантификаторы (+?, *?, {n,}?) захватывают минимально возможное количество.
                  Это критично при работе с HTML тегами или строками в кавычках.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает глобальный флаг /g?</p>
                <p class="font-weight-regular ma-0">
                  Флаг /g заставляет регулярное выражение искать все совпадения, а не только первое.
                  Важно: regex.test() с флагом /g сохраняет состояние в lastIndex, что может привести
                  к неожиданному поведению при повторных вызовах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое обратные ссылки в регулярных выражениях?</p>
                <p class="font-weight-regular ma-0">
                  Обратные ссылки (\\1, \\2) позволяют ссылаться на ранее захваченные группы в том же паттерне.
                  Например, /(['"])(.*?)\\1/ найдет строки в одинаковых кавычках.
                  Полезно для поиска повторяющихся элементов или парных тегов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между \\b и \\B?</p>
                <p class="font-weight-regular ma-0">
                  \\b — граница слова (переход между \\w и \\W символами или началом/концом строки).
                  \\B — НЕ граница слова (внутри слова или между не-словесными символами).
                  /\\bcat\\b/ найдет "cat" как отдельное слово, но не в "concatenate".
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как правильно экранировать пользовательский ввод в RegExp?</p>
                <p class="font-weight-regular ma-0">
                  Используйте функцию экранирования: str.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&').
                  Это заэкранирует все специальные символы регулярных выражений в пользовательском вводе,
                  предотвращая ошибки и потенциальные уязвимости.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Unicode флаг /u и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  Флаг /u включает полную поддержку Unicode, включая символы вне BMP (emoji, символы других языков).
                  Без него \\u{1F600} не работает, нужно использовать суррогатные пары.
                  Обязателен для корректной работы с современными Unicode символами.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем отличие match() от exec()?</p>
                <p class="font-weight-regular ma-0">
                  str.match(regex) — метод строки, с флагом /g возвращает все совпадения без деталей групп.
                  regex.exec(str) — метод регулярного выражения, всегда возвращает детали первого совпадения
                  с информацией о группах. Для получения всех совпадений exec() нужно вызывать в цикле.
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
                    <li>Экранировать спецсимволы в пользовательском вводе</li>
                    <li>Использовать именованные группы для читаемости</li>
                    <li>Тестировать регулярки на граничных случаях</li>
                    <li>Использовать ленивые квантификаторы при необходимости</li>
                    <li>Документировать сложные паттерны</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Сложных паттернов без комментариев</li>
                    <li>Повторного использования глобальных регулярок</li>
                    <li>Игнорирования производительности</li>
                    <li>Парсинга HTML регулярными выражениями</li>
                    <li>Чрезмерно жадных квантификаторов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Используйте online-тестеры для отладки</li>
                    <li>Изучайте готовые паттерны для валидации</li>
                    <li>Понимайте ограничения регулярных выражений</li>
                    <li>Измеряйте производительность на больших данных</li>
                    <li>Комбинируйте с обычными строковыми методами</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Регулярные выражения</b> — мощный инструмент для работы с текстом, но требующий понимания синтаксиса
              и особенностей. Ключевые концепции: символьные классы, квантификаторы, группы, якоря и lookahead/lookbehind.
              Правильное использование флагов и методов критично для эффективной работы. Помните про экранирование
              пользовательского ввода и тестирование на граничных случаях.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions"
                target="_blank"
                class="mr-2">
                MDN RegExp Guide
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://regex101.com"
                target="_blank">
                Regex101 Tester
