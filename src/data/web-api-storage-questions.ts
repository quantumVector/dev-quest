import type { Question } from '@/types/question.ts'

export const webStorageQuestions: Question[] = [
  // Тема 1: Основы Web Storage API
  {
    id: 1,
    question: "Какие два типа хранилища предоставляет Web Storage API?",
    options: [
      "sessionStorage и cacheStorage",
      "localStorage и sessionStorage",
      "cookieStorage и localStorage",
      "memoryStorage и diskStorage"
    ],
    correctAnswer: 1,
    explanation: "Web Storage API предоставляет два механизма хранения: localStorage (постоянное хранилище) и sessionStorage (хранилище на время сеанса).",
    topic: "Основы Web Storage"
  },
  {
    id: 2,
    question: "В чем основное различие между localStorage и sessionStorage?",
    options: [
      "localStorage быстрее sessionStorage",
      "localStorage имеет больший размер",
      "localStorage сохраняется между сеансами браузера, sessionStorage очищается при закрытии вкладки",
      "sessionStorage работает только с числами"
    ],
    correctAnswer: 2,
    explanation: "localStorage хранит данные постоянно (пока не будут явно удалены), а sessionStorage очищается при закрытии вкладки или окна браузера.",
    topic: "Основы Web Storage"
  },
  {
    id: 3,
    question: "Какой тип данных можно хранить в Web Storage?",
    options: [
      "Любые JavaScript объекты",
      "Только строки",
      "Строки, числа и boolean",
      "Все примитивные типы и объекты"
    ],
    correctAnswer: 1,
    explanation: "Web Storage хранит только строки. Для хранения других типов данных необходимо использовать JSON.stringify() для сериализации и JSON.parse() для десериализации.",
    topic: "Основы Web Storage"
  },
  {
    id: 4,
    question: "Какой максимальный размер данных обычно доступен в localStorage?",
    options: [
      "1 MB",
      "5-10 MB",
      "50 MB",
      "Неограничен"
    ],
    correctAnswer: 1,
    explanation: "Обычно localStorage имеет ограничение около 5-10 MB в зависимости от браузера. Это значительно больше, чем у cookies (4 KB), но меньше, чем у IndexedDB.",
    topic: "Основы Web Storage"
  },
  {
    id: 5,
    question: "Как добавить данные в localStorage?",
    options: [
      "localStorage.add('key', 'value')",
      "localStorage.setItem('key', 'value')",
      "localStorage.put('key', 'value')",
      "localStorage.save('key', 'value')"
    ],
    correctAnswer: 1,
    explanation: "Для добавления данных используется метод setItem(key, value). Также можно использовать синтаксис localStorage.key = value, но setItem() предпочтительнее.",
    topic: "Основы Web Storage"
  },
  {
    id: 6,
    question: "Как получить данные из localStorage?",
    options: [
      "localStorage.get('key')",
      "localStorage.getItem('key')",
      "localStorage.read('key')",
      "localStorage.fetch('key')"
    ],
    correctAnswer: 1,
    explanation: "Для получения данных используется метод getItem(key). Возвращает строку или null, если ключ не найден.",
    topic: "Основы Web Storage"
  },
  {
    id: 7,
    question: "Что вернет localStorage.getItem('nonExistentKey')?",
    options: [
      "undefined",
      "null",
      "''",
      "Выбросит ошибку"
    ],
    correctAnswer: 1,
    explanation: "Метод getItem() возвращает null, если указанный ключ не существует в хранилище.",
    topic: "Основы Web Storage"
  },
  {
    id: 8,
    question: "Как удалить конкретный элемент из localStorage?",
    options: [
      "localStorage.delete('key')",
      "localStorage.removeItem('key')",
      "localStorage.clear('key')",
      "localStorage.erase('key')"
    ],
    correctAnswer: 1,
    explanation: "Метод removeItem(key) удаляет конкретный элемент из хранилища по ключу.",
    topic: "Основы Web Storage"
  },

  // Тема 2: Методы и свойства
  {
    id: 9,
    question: "Как очистить все данные в localStorage?",
    options: [
      "localStorage.removeAll()",
      "localStorage.clear()",
      "localStorage.deleteAll()",
      "localStorage.empty()"
    ],
    correctAnswer: 1,
    explanation: "Метод clear() удаляет все элементы из хранилища. Используйте с осторожностью, так как это необратимая операция.",
    topic: "Методы и свойства"
  },
  {
    id: 10,
    question: "Как узнать количество элементов в localStorage?",
    options: [
      "localStorage.count",
      "localStorage.size",
      "localStorage.length",
      "localStorage.getLength()"
    ],
    correctAnswer: 2,
    explanation: "Свойство length возвращает количество элементов, хранящихся в localStorage или sessionStorage.",
    topic: "Методы и свойства"
  },
  {
    id: 11,
    question: "Как получить ключ по индексу в localStorage?",
    options: [
      "localStorage.getKey(index)",
      "localStorage.key(index)",
      "localStorage.keyAt(index)",
      "localStorage[index]"
    ],
    correctAnswer: 1,
    explanation: "Метод key(index) возвращает имя ключа на указанной позиции. Это полезно для итерации по всем элементам хранилища.",
    topic: "Методы и свойства"
  },
  {
    id: 12,
    question: "Что выведет этот код?\n\nlocalStorage.setItem('count', 42);\nconsole.log(typeof localStorage.getItem('count'));",
    options: [
      "'number'",
      "'string'",
      "'object'",
      "undefined"
    ],
    correctAnswer: 1,
    explanation: "Web Storage хранит все значения как строки. Число 42 будет преобразовано в строку '42', поэтому typeof вернет 'string'.",
    topic: "Методы и свойства"
  },
  {
    id: 13,
    question: "Как правильно сохранить объект в localStorage?",
    options: [
      "localStorage.setItem('user', user)",
      "localStorage.setItem('user', JSON.stringify(user))",
      "localStorage.setItem('user', String(user))",
      "localStorage.setObject('user', user)"
    ],
    correctAnswer: 1,
    explanation: "Перед сохранением объектов необходимо сериализовать их с помощью JSON.stringify(). При получении используется JSON.parse().",
    topic: "Методы и свойства"
  },
  {
    id: 14,
    question: "Можно ли использовать точечную нотацию для работы с localStorage?",
    options: [
      "Нет, только методы setItem/getItem",
      "Да, можно использовать localStorage.key = value",
      "Только для чтения, не для записи",
      "Только в Chrome"
    ],
    correctAnswer: 1,
    explanation: "Помимо методов setItem/getItem можно использовать точечную нотацию: localStorage.key = value или localStorage[key] = value, но методы предпочтительнее.",
    topic: "Методы и свойства"
  },

  // Тема 3: События storage
  {
    id: 15,
    question: "Какое событие срабатывает при изменении localStorage?",
    options: [
      "change",
      "storage",
      "storagechange",
      "update"
    ],
    correctAnswer: 1,
    explanation: "Событие 'storage' срабатывает при изменении данных в localStorage или sessionStorage. Слушатель добавляется на объект window.",
    topic: "События storage"
  },
  {
    id: 16,
    question: "Где срабатывает событие storage при изменении localStorage?",
    options: [
      "В той же вкладке, где произошло изменение",
      "Во всех открытых вкладках того же origin, кроме той, где произошло изменение",
      "Во всех вкладках, включая ту, где произошло изменение",
      "События не срабатывают"
    ],
    correctAnswer: 1,
    explanation: "Событие storage срабатывает во всех открытых вкладках/окнах того же origin, КРОМЕ той, где произошло изменение. Это позволяет синхронизировать данные между вкладками.",
    topic: "События storage"
  },
  {
    id: 17,
    question: "Какую информацию содержит объект StorageEvent?",
    options: [
      "Только новое значение",
      "key, oldValue, newValue, url, storageArea",
      "Только key и newValue",
      "timestamp и value"
    ],
    correctAnswer: 1,
    explanation: "StorageEvent содержит: key (изменившийся ключ), oldValue (предыдущее значение), newValue (новое значение), url (URL страницы, где произошло изменение), storageArea (ссылка на хранилище).",
    topic: "События storage"
  },
  {
    id: 18,
    question: "Как добавить слушатель события storage?",
    options: [
      "localStorage.addEventListener('storage', handler)",
      "window.addEventListener('storage', handler)",
      "document.addEventListener('storage', handler)",
      "storage.addEventListener('change', handler)"
    ],
    correctAnswer: 1,
    explanation: "Событие storage добавляется на объект window: window.addEventListener('storage', handler).",
    topic: "События storage"
  },
  {
    id: 19,
    question: "Сработает ли событие storage при вызове localStorage.clear()?",
    options: [
      "Нет, событие не сработает",
      "Да, с key = null",
      "Да, для каждого удаленного ключа",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "При вызове clear() событие storage срабатывает один раз с key = null, oldValue = null, newValue = null.",
    topic: "События storage"
  },
  {
    id: 20,
    question: "Можно ли отменить изменение в обработчике события storage?",
    options: [
      "Да, с помощью event.preventDefault()",
      "Нет, событие информационное",
      "Да, вернув false",
      "Да, с помощью event.stopPropagation()"
    ],
    correctAnswer: 1,
    explanation: "Событие storage является информационным. Невозможно отменить или предотвратить изменение данных через обработчик события.",
    topic: "События storage"
  },

  // Тема 4: Безопасность и ограничения
  {
    id: 21,
    question: "Кто имеет доступ к данным в localStorage?",
    options: [
      "Все сайты",
      "Только скрипты с того же origin (протокол + домен + порт)",
      "Все поддомены основного домена",
      "Любой скрипт на странице"
    ],
    correctAnswer: 1,
    explanation: "localStorage следует политике same-origin. Доступ имеют только скрипты с тем же origin (протокол, домен и порт должны совпадать).",
    topic: "Безопасность"
  },
  {
    id: 22,
    question: "Безопасно ли хранить чувствительные данные (пароли, токены) в localStorage?",
    options: [
      "Да, данные зашифрованы",
      "Нет, localStorage уязвим для XSS-атак",
      "Да, если использовать HTTPS",
      "Да, но только в sessionStorage"
    ],
    correctAnswer: 1,
    explanation: "localStorage НЕ следует использовать для чувствительных данных. Он уязвим для XSS-атак: вредоносный JavaScript может получить доступ к любым данным в localStorage.",
    topic: "Безопасность"
  },
  {
    id: 23,
    question: "Что такое XSS в контексте localStorage?",
    options: [
      "Ошибка хранилища",
      "Cross-Site Scripting - внедрение вредоносного кода, который может читать localStorage",
      "Метод шифрования данных",
      "Способ увеличения размера хранилища"
    ],
    correctAnswer: 1,
    explanation: "XSS (Cross-Site Scripting) позволяет злоумышленнику выполнить JavaScript на странице, что дает полный доступ к localStorage. Поэтому в нем не следует хранить критичные данные.",
    topic: "Безопасность"
  },
  {
    id: 24,
    question: "Доступен ли localStorage в режиме инкогнито/приватном режиме?",
    options: [
      "Нет, полностью заблокирован",
      "Да, но очищается после закрытия окна",
      "Да, работает как обычно",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "В приватном режиме localStorage доступен, но ведет себя как sessionStorage - все данные удаляются после закрытия последнего приватного окна.",
    topic: "Безопасность"
  },
  {
    id: 25,
    question: "Что произойдет при превышении квоты localStorage?",
    options: [
      "Старые данные автоматически удалятся",
      "Будет выброшено исключение QuotaExceededError",
      "Новые данные не сохранятся без ошибки",
      "Браузер запросит разрешение на увеличение квоты"
    ],
    correctAnswer: 1,
    explanation: "При попытке сохранить данные при заполненном хранилище будет выброшено исключение QuotaExceededError (или DOMException). Необходима обработка этой ошибки.",
    topic: "Безопасность"
  },

  // Тема 5: Сравнение с другими технологиями
  {
    id: 26,
    question: "В чем основное отличие localStorage от cookies?",
    options: [
      "localStorage быстрее",
      "localStorage не отправляется автоматически с каждым HTTP-запросом",
      "localStorage имеет меньший размер",
      "Cookies безопаснее"
    ],
    correctAnswer: 1,
    explanation: "Главное отличие: cookies автоматически отправляются с каждым HTTP-запросом, что увеличивает трафик. localStorage хранится только на клиенте и не передается серверу автоматически.",
    topic: "Сравнение"
  },
  {
    id: 27,
    question: "Какой объем данных могут хранить cookies?",
    options: [
      "До 4 KB на cookie",
      "До 10 MB",
      "Неограничен",
      "До 1 MB"
    ],
    correctAnswer: 0,
    explanation: "Cookies ограничены примерно 4 KB на cookie, в то время как localStorage обычно предоставляет 5-10 MB. Также есть ограничение на количество cookies на домен (~20-50).",
    topic: "Сравнение"
  },
  {
    id: 28,
    question: "Когда стоит использовать sessionStorage вместо localStorage?",
    options: [
      "Когда нужно больше места",
      "Когда данные должны быть доступны только в текущей сессии/вкладке",
      "Когда нужна лучшая производительность",
      "Никогда, localStorage всегда лучше"
    ],
    correctAnswer: 1,
    explanation: "sessionStorage подходит для временных данных, которые должны существовать только в рамках одной сессии браузера (например, состояние формы, временные настройки).",
    topic: "Сравнение"
  },
  {
    id: 29,
    question: "В чем преимущество IndexedDB над localStorage?",
    options: [
      "IndexedDB проще в использовании",
      "IndexedDB поддерживает большие объемы данных, индексы, транзакции и асинхронный API",
      "IndexedDB быстрее",
      "IndexedDB работает во всех браузерах"
    ],
    correctAnswer: 1,
    explanation: "IndexedDB предназначен для больших объемов структурированных данных, поддерживает индексы, транзакции, асинхронный API, может хранить не только строки. Но сложнее в использовании.",
    topic: "Сравнение"
  },
  {
    id: 30,
    question: "Являются ли sessionStorage в разных вкладках общими?",
    options: [
      "Да, всегда общие",
      "Нет, каждая вкладка имеет свой sessionStorage",
      "Общие только для одного домена",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "Каждая вкладка/окно имеет свой независимый sessionStorage. Данные не разделяются даже между вкладками одного и того же сайта.",
    topic: "Сравнение"
  },

  // Тема 6: Практическое применение
  {
    id: 31,
    question: "Как правильно проверить поддержку localStorage?",
    options: [
      "if (localStorage) {}",
      "if (typeof localStorage !== 'undefined') {}",
      "try { localStorage.setItem('test', 'test'); localStorage.removeItem('test'); } catch(e) {}",
      "Все варианты верны"
    ],
    correctAnswer: 2,
    explanation: "Лучший способ - попытка использования с обработкой ошибок, так как localStorage может быть недоступен в приватном режиме или при отключенных cookies в некоторых браузерах.",
    topic: "Практика"
  },
  {
    id: 32,
    question: "Что вернет localStorage.getItem() для несуществующего ключа?",
    options: [
      "undefined",
      "null",
      "''",
      "false"
    ],
    correctAnswer: 1,
    explanation: "getItem() возвращает null для несуществующих ключей. Это важно учитывать при проверке наличия значения.",
    topic: "Практика"
  },
  {
    id: 33,
    question: "Как безопасно получить и распарсить JSON из localStorage?",
    options: [
      "JSON.parse(localStorage.getItem('key'))",
      "const data = localStorage.getItem('key'); return data ? JSON.parse(data) : null;",
      "JSON.parse(localStorage.key)",
      "localStorage.getJSON('key')"
    ],
    correctAnswer: 1,
    explanation: "Необходимо проверить, что значение существует, прежде чем парсить. JSON.parse(null) выбросит ошибку. Также полезно обернуть в try-catch для обработки невалидного JSON.",
    topic: "Практика"
  },
  {
    id: 34,
    question: "Как итерировать по всем элементам localStorage?",
    options: [
      "for (let key in localStorage) {}",
      "for (let i = 0; i < localStorage.length; i++) { let key = localStorage.key(i); }",
      "localStorage.forEach()",
      "Object.keys(localStorage)"
    ],
    correctAnswer: 1,
    explanation: "Правильный способ - использовать свойство length и метод key(i). Цикл for...in может включать унаследованные свойства, Object.keys() может не работать корректно.",
    topic: "Практика"
  },
  {
    id: 35,
    question: "Можно ли хранить Date объекты напрямую в localStorage?",
    options: [
      "Да, localStorage поддерживает Date",
      "Нет, нужно преобразовать в строку (ISO string или timestamp)",
      "Да, но только в формате timestamp",
      "Нет, Date нельзя сериализовать"
    ],
    correctAnswer: 1,
    explanation: "Date нужно преобразовать в строку: date.toISOString() или date.getTime(). При получении восстановить: new Date(dateString) или new Date(timestamp).",
    topic: "Практика"
  },
  {
    id: 36,
    question: "Что произойдет при сохранении undefined в localStorage?",
    options: [
      "Сохранится как undefined",
      "Сохранится строка 'undefined'",
      "Выбросит ошибку",
      "Не сохранится"
    ],
    correctAnswer: 1,
    explanation: "undefined будет преобразован в строку 'undefined'. Это может привести к неожиданным результатам. Лучше проверять значения перед сохранением.",
    topic: "Практика"
  },

  // Тема 7: Оптимизация и производительность
  {
    id: 37,
    question: "Является ли доступ к localStorage синхронным или асинхронным?",
    options: [
      "Асинхронным",
      "Синхронным",
      "Зависит от размера данных",
      "Может быть настроен"
    ],
    correctAnswer: 1,
    explanation: "localStorage работает синхронно, что может блокировать главный поток при работе с большими объемами данных. Для больших данных лучше использовать IndexedDB с асинхронным API.",
    topic: "Производительность"
  },
  {
    id: 38,
    question: "Может ли частое использование localStorage влиять на производительность?",
    options: [
      "Нет, влияния нет",
      "Да, особенно при работе с большими объемами данных",
      "Только в старых браузерах",
      "Только при записи, не при чтении"
    ],
    correctAnswer: 1,
    explanation: "Частые операции чтения/записи больших объемов данных могут замедлить приложение, так как localStorage синхронный. Рекомендуется кешировать часто используемые данные в памяти.",
    topic: "Производительность"
  },
  {
    id: 39,
    question: "Стоит ли сжимать данные перед сохранением в localStorage?",
    options: [
      "Нет, это усложняет код",
      "Да, если данные большие и это критично для квоты",
      "Браузер сжимает автоматически",
      "Это невозможно"
    ],
    correctAnswer: 1,
    explanation: "Для больших данных можно использовать библиотеки сжатия (например, LZ-string), чтобы экономить место. Но это добавляет overhead на сжатие/распаковку.",
    topic: "Производительность"
  },
  {
    id: 40,
    question: "Как лучше организовать хранение данных в localStorage для оптимальной производительности?",
    options: [
      "Хранить каждое свойство отдельно",
      "Группировать связанные данные в один ключ с JSON объектом",
      "Использовать максимально длинные ключи",
      "Дублировать данные для быстрого доступа"
    ],
    correctAnswer: 1,
    explanation: "Лучше группировать связанные данные в один JSON объект под одним ключом. Это уменьшает количество операций чтения/записи и упрощает управление данными.",
    topic: "Производительность"
  }
]
