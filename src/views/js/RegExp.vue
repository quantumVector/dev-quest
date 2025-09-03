<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const regexpBasicsSnippet = `
// Создание регулярных выражений в JavaScript

// 1. Литеральная форма (рекомендуемая)
const regex1 = /hello/i;           // i - ignore case (нечувствителен к регистру)
const regex2 = /\\d+/g;            // g - global (все совпадения)
const regex3 = /^[a-zA-Z]+$/m;     // m - multiline (многострочный режим)

// 2. Конструктор RegExp
const pattern = "hello";
const flags = "gi";
const regex4 = new RegExp(pattern, flags);     // Для динамических паттернов
const regex5 = new RegExp("\\\\d+", "g");     // Двойное экранирование в строках!

// Основные флаги
console.log(regex1.flags);         // "i"
console.log(regex1.global);        // false
console.log(regex1.ignoreCase);    // true
console.log(regex1.multiline);     // false

// Проверка и поиск
const text = "Hello World 123";
console.log(regex1.test(text));    // true - есть совпадение
console.log(regex1.exec(text));    // ["Hello", index: 0, input: "Hello World 123", groups: undefined]

// Методы строк с регулярками
console.log(text.match(/\\d+/));    // ["123"]
console.log(text.search(/\\d+/));   // 12 (индекс первого совпадения)
console.log(text.replace(/\\d+/, "456")); // "Hello World 456"
console.log(text.split(/\\s+/));    // ["Hello", "World", "123"]
`

const basicPatternsSnippet = `
// Базовые паттерны и метасимволы

// Основные метасимволы
const patterns = {
  // Символьные классы
  digit: /\\d/g,              // [0-9] - цифры
  nonDigit: /\\D/g,           // [^0-9] - не цифры
  word: /\\w/g,               // [a-zA-Z0-9_] - буквы, цифры, _
  nonWord: /\\W/g,            // [^a-zA-Z0-9_] - не буквы/цифры/_
  whitespace: /\\s/g,         // [ \\t\\n\\r\\f\\v] - пробельные символы
  nonWhitespace: /\\S/g,      // [^ \\t\\n\\r\\f\\v] - не пробельные
  any: /./g,                  // любой символ кроме \\n

  // Якори (anchors)
  start: /^Hello/,            // начало строки
  end: /world$/,              // конец строки
  wordBoundary: /\\bword\\b/, // граница слова
  nonWordBoundary: /\\Bword\\B/, // не граница слова

  // Квантификаторы
  zeroOrMore: /a*/,           // 0 или больше 'a'
  oneOrMore: /a+/,            // 1 или больше 'a'
  zeroOrOne: /a?/,            // 0 или 1 'a'
  exactN: /a{3}/,             // точно 3 'a'
  minN: /a{3,}/,              // минимум 3 'a'
  minMax: /a{2,5}/,           // от 2 до 5 'a'

  // Символьные наборы
  range: /[a-z]/,             // любая строчная буква
  exclude: /[^0-9]/,          // любой символ кроме цифр
  multiple: /[aeiou]/,        // любая гласная
  escape: /[\\[\\]]/,         // экранирование спецсимволов

  // Альтернации
  or: /cat|dog/,              // 'cat' ИЛИ 'dog'
  groupOr: /(red|blue) car/,  // 'red car' или 'blue car'
};

// Примеры использования
const testString = "Hello world! 123 test@email.com";

console.log(testString.match(patterns.digit));      // ["1", "2", "3"]
console.log(testString.match(patterns.word));       // ["H", "e", "l", "l", "o", "w", ...]
console.log(testString.match(/\\w+/g));             // ["Hello", "world", "123", "test", "email", "com"]
console.log(patterns.start.test("Hello world"));    // true
console.log(patterns.end.test("Hello world"));      // true
console.log(patterns.wordBoundary.test("sword"));   // false (word не на границе)
console.log(patterns.wordBoundary.test("a word b")); // true

// Жадные vs ленивые квантификаторы
const html = '<div>content</div>';
console.log(html.match(/<.*>/));      // ["<div>content</div>"] - жадный
console.log(html.match(/<.*?>/));     // ["<div>"] - ленивый

// Квантификаторы с +, *, ? можно сделать ленивыми добавив ?
console.log("aaaa".match(/a+/));      // ["aaaa"] - жадный
console.log("aaaa".match(/a+?/));     // ["a"] - ленивый
`

const groupsSnippet = `
// Группы и захват (capturing groups)

// Обычные группы ()
const namePattern = /(\\w+)\\s+(\\w+)/;
const fullName = "John Doe";
const match = fullName.match(namePattern);

console.log(match[0]);  // "John Doe" - полное совпадение
console.log(match[1]);  // "John" - первая группа
console.log(match[2]);  // "Doe" - вторая группа

// Именованные группы (?<name>...) - ES2018
const namedPattern = /(?<firstName>\\w+)\\s+(?<lastName>\\w+)/;
const namedMatch = fullName.match(namedPattern);

console.log(namedMatch.groups.firstName); // "John"
console.log(namedMatch.groups.lastName);  // "Doe"

// Незахватывающие группы (?:...)
const nonCapturing = /(?:Mr|Ms|Dr)\\.\\s+(\\w+)/;
const title = "Dr. Smith";
const titleMatch = title.match(nonCapturing);
console.log(titleMatch[1]); // "Smith" - только захваченная группа

// Обратные ссылки (backreferences)
const repeated = /(\\w+)\\s+\\1/; // \\1 ссылается на первую группу
console.log(repeated.test("hello hello")); // true
console.log(repeated.test("hello world")); // false

// Именованные обратные ссылки
const namedRepeated = /(?<word>\\w+)\\s+\\k<word>/;
console.log(namedRepeated.test("test test")); // true

// Замена с использованием групп
const datePattern = /(\\d{2})\\/(\\d{2})\\/(\\d{4})/;
const date = "12/31/2023";

// Перестановка формата даты
const newDate = date.replace(datePattern, '$3-$1-$2'); // "2023-12-31"
console.log(newDate);

// С именованными группами
const namedDatePattern = /(?<month>\\d{2})\\/(?<day>\\d{2})\\/(?<year>\\d{4})/;
const newNamedDate = date.replace(namedDatePattern, '$<year>-$<month>-$<day>');
console.log(newNamedDate); // "2023-12-31"

// Сложный пример: парсинг URL
const urlPattern = /^(https?):\\/\\/(?<host>[^\/]+)(?<path>\\/[^?#]*)?(?<query>\\?[^#]*)?(?<hash>#.*)?$/;
const url = "https://example.com/path/to/page?param=value#section";
const urlMatch = url.match(urlPattern);

console.log(urlMatch.groups);
// {
//   host: "example.com",
//   path: "/path/to/page",
//   query: "?param=value",
//   hash: "#section"
// }
`

const lookaheadSnippet = `
// Утверждения (assertions) - lookahead/lookbehind

// Позитивная lookahead (?=...)
// "совпадение, за которым следует..."
const positiveLookahead = /\\d+(?=\\s*px)/g;
const css = "width: 100px; height: 200em; margin: 15px;";
console.log(css.match(positiveLookahead)); // ["100", "15"]

// Негативная lookahead (?!...)
// "совпадение, за которым НЕ следует..."
const negativeLookahead = /\\d+(?!\\s*px)/g;
console.log(css.match(negativeLookahead)); // ["200"]

// Позитивная lookbehind (?<=...) - ES2018
// "совпадение, перед которым стоит..."
const positiveLookbehind = /(?<=\\$)\\d+/g;
const prices = "Apple $5, Banana $2.50, Orange €3";
console.log(prices.match(positiveLookbehind)); // ["5", "2", "50"]

// Негативная lookbehind (?<!...)
// "совпадение, перед которым НЕ стоит..."
const negativeLookbehind = /(?<!\\$)\\d+/g;
console.log(prices.match(negativeLookbehind)); // ["50", "3"] (не после $)

// Практические примеры
const examples = {
  // Пароль: минимум 8 символов, содержит цифру и букву
  passwordPattern: /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$/,

  // Email с проверкой домена
  emailPattern: /^[\\w.-]+@(?=.*\\.[a-z]{2,})[\\w.-]+\\.[a-z]{2,}$/i,

  // Число, не начинающееся с 0 (кроме самого 0)
  numberNoLeadingZero: /^(?!0\\d)\\d+$/,

  // HTML тег без определенных атрибутов
  htmlWithoutClass: /<(\\w+)(?![^>]*class=)[^>]*>/g,

  // Слово, не входящее в состав другого слова
  standaloneWord: /(?<!\\w)word(?!\\w)/g,
};

// Тестирование паттернов
console.log(examples.passwordPattern.test("password123"));     // true
console.log(examples.passwordPattern.test("password"));        // false (нет цифры)

console.log(examples.numberNoLeadingZero.test("123"));         // true
console.log(examples.numberNoLeadingZero.test("0123"));        // false

const htmlText = '<div class="test">content</div><span>text</span>';
console.log(htmlText.match(examples.htmlWithoutClass)); // ["<span>"]

// Комбинирование утверждений
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
// Минимум: 1 строчная, 1 заглавная, 1 цифра, 1 спецсимвол, минимум 8 символов

console.log(strongPassword.test("Password123!"));      // true
console.log(strongPassword.test("password123"));       // false (нет заглавной и спецсимвола)
`

const methodsSnippet = `
// Методы RegExp и String для работы с регулярными выражениями

const text = "The quick brown fox jumps over the lazy dog. The fox is quick.";
const pattern = /fox/g;
const patternWithGroups = /(quick|brown|lazy)\\s+(\\w+)/g;

// === МЕТОДЫ RegExp ===

// test() - проверка наличия совпадений
console.log(pattern.test(text));          // true
console.log(/elephant/.test(text));       // false

// exec() - получение информации о совпадении
pattern.lastIndex = 0; // сброс для глобального поиска
let match;
while ((match = pattern.exec(text)) !== null) {
  console.log(\`Найдено: "\${match[0]}" на позиции \${match.index}\`);
  // Найдено: "fox" на позиции 16
  // Найдено: "fox" на позиции 49
}

// === МЕТОДЫ String ===

// match() - поиск совпадений
console.log(text.match(/fox/));           // ["fox", index: 16, input: "...", groups: undefined]
console.log(text.match(/fox/g));          // ["fox", "fox"] - только совпадения

// matchAll() - все совпадения с группами (ES2020)
const matches = [...text.matchAll(patternWithGroups)];
matches.forEach((match, i) => {
  console.log(\`Совпадение \${i + 1}: \${match[0]}, группы: [\${match[1]}, \${match[2]}]\`);
});
// Совпадение 1: quick brown, группы: [quick, brown]
// Совпадение 2: lazy dog, группы: [lazy, dog]

// search() - индекс первого совпадения
console.log(text.search(/fox/));          // 16
console.log(text.search(/elephant/));     // -1

// replace() - замена
console.log(text.replace(/fox/g, "cat"));
console.log(text.replace(/fox/, "cat"));  // замена только первого

// replace() с функцией
const titleCase = text.replace(/\\b\\w+/g, (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
});
console.log(titleCase);

// replace() с группами
const phonePattern = /(\\d{3})(\\d{3})(\\d{4})/;
const phone = "1234567890";
const formattedPhone = phone.replace(phonePattern, "($1) $2-$3");
console.log(formattedPhone); // "(123) 456-7890"

// replaceAll() - замена всех (ES2021)
console.log(text.replaceAll(/fox/g, "cat"));
console.log(text.replaceAll("fox", "cat")); // работает и со строками

// split() - разделение
console.log(text.split(/\\s+/));           // разделение по пробелам
console.log(text.split(/[.!?]+/));         // разделение по знакам препинания

// split() с группами (захваченные группы попадают в результат)
console.log("a1b2c3d".split(/(\\d)/));     // ["a", "1", "b", "2", "c", "3", "d"]

// === ПРОДВИНУТЫЕ ПРИМЕРЫ ===

// Валидация и извлечение данных
const logPattern = /\\[(\\d{4}-\\d{2}-\\d{2})\\s(\\d{2}:\\d{2}:\\d{2})\\]\\s(\\w+):\\s(.+)/;
const logLine = "[2023-12-01 14:30:15] ERROR: Database connection failed";
const logMatch = logLine.match(logPattern);

if (logMatch) {
  console.log({
    date: logMatch[1],
    time: logMatch[2],
    level: logMatch[3],
    message: logMatch[4]
  });
}

// Поиск и замена с вычислениями
const mathExpression = "Calculate: 2 + 3, 5 * 4, 10 / 2";
const result = mathExpression.replace(/(\\d+)\\s*([+\\-*/])\\s*(\\d+)/g, (match, a, op, b) => {
  const numA = parseInt(a);
  const numB = parseInt(b);
  let result;

  switch (op) {
    case '+': result = numA + numB; break;
    case '-': result = numA - numB; break;
    case '*': result = numA * numB; break;
    case '/': result = numA / numB; break;
  }

  return result;
});
console.log(result); // "Calculate: 5, 20, 5"

// Условная замена
const conditionalReplace = "Hello world, hello JavaScript!";
const replaced = conditionalReplace.replace(/hello/gi, (match, offset) => {
  return offset > 10 ? match.toUpperCase() : match.toLowerCase();
});
console.log(replaced); // "hello world, HELLO JavaScript!"
`

const validationSnippet = `
// Практические паттерны для валидации

const validators = {
  // Email (упрощенная версия)
  email: /^[\\w._%+-]+@[\\w.-]+\\.[A-Z]{2,}$/i,

  // Email (более строгая)
  emailStrict: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

  // Телефон (разные форматы)
  phone: /^(?:\\+?1[-.]?)?\\(?[0-9]{3}\\)?[-.]?[0-9]{3}[-.]?[0-9]{4}$/,
  phoneInternational: /^\\+?[1-9]\\d{1,14}$/,

  // Пароль (сильный)
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,

  // URL
  url: /^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&=]*)$/,

  // IP адрес (IPv4)
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

  // Кредитная карта (основные форматы)
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,

  // Имя пользователя
  username: /^[a-zA-Z0-9_]{3,20}$/,

  // Hex цвет
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // Дата (DD/MM/YYYY или DD-MM-YYYY)
  date: /^(0[1-9]|[12][0-9]|3[01])[\\/-](0[1-9]|1[012])[\\/-](19|20)\\d\\d$/,

  // Время (HH:MM)
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,

  // Почтовый индекс (US)
  zipCodeUS: /^\\d{5}(?:-\\d{4})?$/,

  // Почтовый индекс (Россия)
  zipCodeRU: /^\\d{6}$/,

  // HTML теги
  htmlTag: /<\\/?[a-z][\\s\\S]*>/i,

  // Только буквы (включая Unicode)
  lettersOnly: /^[\\p{L}\\s]+$/u,

  // Номер документа (паспорт РФ)
  russianPassport: /^\\d{4}\\s?\\d{6}$/,
};

// Функции валидации
function createValidator(pattern, errorMessage) {
  return function(value) {
    const isValid = pattern.test(value);
    return {
      isValid,
      message: isValid ? 'Valid' : errorMessage
    };
  };
}

const emailValidator = createValidator(
  validators.email,
  'Некорректный формат email'
);

const phoneValidator = createValidator(
  validators.phone,
  'Некорректный формат телефона'
);

const passwordValidator = createValidator(
  validators.strongPassword,
  'Пароль должен содержать минимум 8 символов, включая строчные и заглавные буквы, цифры и специальные символы'
);

// Тестирование
const testCases = [
  { type: 'email', value: 'user@example.com' },
  { type: 'email', value: 'invalid.email' },
  { type: 'phone', value: '+1 (555) 123-4567' },
  { type: 'phone', value: '123' },
  { type: 'password', value: 'SecurePass123!' },
  { type: 'password', value: 'weak' },
];

testCases.forEach(testCase => {
  let validator;
  switch (testCase.type) {
    case 'email': validator = emailValidator; break;
    case 'phone': validator = phoneValidator; break;
    case 'password': validator = passwordValidator; break;
  }

  const result = validator(testCase.value);
  console.log(\`\${testCase.type}: "\${testCase.value}" - \${result.message}\`);
});

// Комплексная валидация формы
function validateForm(data) {
  const errors = {};

  if (!validators.email.test(data.email)) {
    errors.email = 'Некорректный email';
  }

  if (!validators.strongPassword.test(data.password)) {
    errors.password = 'Слабый пароль';
  }

  if (!validators.phone.test(data.phone)) {
    errors.phone = 'Некорректный номер телефона';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Пример использования
const formData = {
  email: 'user@example.com',
  password: 'MyPassword123!',
  phone: '(555) 123-4567'
};

const validation = validateForm(formData);
console.log('Форма валидна:', validation.isValid);
if (!validation.isValid) {
  console.log('Ошибки:', validation.errors);
}
`

const parsingSnippet = `
// Парсинг и извлечение данных с помощью RegExp

// Парсинг CSV (простая версия)
function parseCSV(csvString) {
  const lines = csvString.trim().split('\\n');
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    const row = {};

    values.forEach((value, index) => {
      let cleanValue = value.replace(/^,/, '').replace(/^"|"$/g, '');
      cleanValue = cleanValue.replace(/""/g, '"');
      row[headers[index]] = cleanValue;
    });

    return row;
  });
}

// Извлечение URL из текста
function extractUrls(text) {
  const urlPattern = /https?:\\/\\/(?:[-\\w.])+(?::[0-9]+)?(?:\\/(?:[\\w\\/_.])*)?(?:\\?(?:[\\w&%=.])*)?(?:#(?:\\w)*)?/g;
  return text.match(urlPattern) || [];
}

// Парсинг лог-файлов
function parseLogFile(logContent) {
  const logPattern = /^(\\d{4}-\\d{2}-\\d{2})\\s(\\d{2}:\\d{2}:\\d{2})\\s\\[(\\w+)\\]\\s(.+)$/gm;
  const logs = [];
  let match;

  while ((match = logPattern.exec(logContent)) !== null) {
    logs.push({
      date: match[1],
      time: match[2],
      level: match[3],
      message: match[4]
    });
  }

  return logs;
}

// Извлечение метаданных из HTML
function extractHtmlMeta(html) {
  const patterns = {
    title: /<title>([^<]+)<\\/title>/i,
    metaTags: /<meta\\s+(?:name|property)=['"]([^'"]+)['"]\\s+content=['"]([^'"]+)['"]/gi,
    links: /<a\\s+[^>]*href=['"]([^'"]+)['"][^>]*>([^<]+)<\\/a>/gi
  };

  const result = {
    title: '',
    meta: {},
    links: []
  };

  // Извлечение заголовка
  const titleMatch = html.match(patterns.title);
  if (titleMatch) {
    result.title = titleMatch[1];
  }

  // Извлечение мета-тегов
  let metaMatch;
  while ((metaMatch = patterns.metaTags.exec(html)) !== null) {
    result.meta[metaMatch[1]] = metaMatch[2];
  }

  // Извлечение ссылок
  let linkMatch;
  while ((linkMatch = patterns.links.exec(html)) !== null) {
    result.links.push({
      url: linkMatch[1],
      text: linkMatch[2]
    });
  }

  return result;
}

// Парсинг конфигурационных файлов (.env формат)
function parseEnvFile(envContent) {
  const envPattern = /^\\s*([A-Z_][A-Z0-9_]*)\\s*=\\s*(.*)$/gm;
  const config = {};
  let match;

  while ((match = envPattern.exec(envContent)) !== null) {
    let value = match[2].trim();

    // Удаление кавычек если есть
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    config[match[1]] = value;
  }

  return config;
}

// Извлечение функций из JavaScript кода
function extractJsFunctions(jsCode) {
  const patterns = {
    functionDeclaration: /function\\s+(\\w+)\\s*\\(([^)]*)\\)\\s*\\{/g,
    functionExpression: /(?:const|let|var)\\s+(\\w+)\\s*=\\s*function\\s*\\(([^)]*)\\)\\s*\\{/g,
    arrowFunction: /(?:const|let|var)\\s+(\\w+)\\s*=\\s*\\(([^)]*)\\)\\s*=>/g,
    method: /(\\w+)\\s*\\(([^)]*)\\)\\s*\\{/g
  };

  const functions = [];

  Object.entries(patterns).forEach(([type, pattern]) => {
    let match;
    while ((match = pattern.exec(jsCode)) !== null) {
      functions.push({
        type,
        name: match[1],
        parameters: match[2] ? match[2].split(',').map(p => p.trim()) : []
      });
    }
  });

  return functions;
}

// Парсинг SQL запросов (базовый)
function parseSqlQuery(sql) {
  const patterns = {
    select: /SELECT\\s+(.+?)\\s+FROM\\s+(\\w+)(?:\\s+WHERE\\s+(.+?))?(?:\\s+ORDER\\s+BY\\s+(.+?))?(?:;|$)/i,
    insert: /INSERT\\s+INTO\\s+(\\w+)\\s*\\(([^)]+)\\)\\s*VALUES\\s*\\(([^)]+)\\)/i,
    update: /UPDATE\\s+(\\w+)\\s+SET\\s+(.+?)(?:\\s+WHERE\\s+(.+?))?(?:;|$)/i,
    delete: /DELETE\\s+FROM\\s+(\\w+)(?:\\s+WHERE\\s+(.+?))?(?:;|$)/i
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    const match = sql.match(pattern);
    if (match) {
      switch (type) {
        case 'select':
          return {
            type: 'SELECT',
            columns: match[1].split(',').map(c =>
