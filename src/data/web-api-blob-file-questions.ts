import type { Question } from '@/types/question.ts'

export const blobFileQuestions: Question[] = [
  // Тема 1: Что такое Blob
  {
    id: 1,
    question: "Что такое Blob в JavaScript?",
    options: [
      "Бинарный объект для хранения больших файлов",
      "Объект, представляющий неизменяемые необработанные данные",
      "Метод для загрузки файлов",
      "Тип данных для работы с изображениями"
    ],
    correctAnswer: 1,
    explanation: "Blob (Binary Large Object) — это объект, представляющий неизменяемые необработанные данные. Он может содержать данные любого типа и размера.",
    topic: "Основы Blob"
  },
  {
    id: 2,
    question: "Какие параметры принимает конструктор Blob?",
    options: [
      "Только данные",
      "Массив данных и объект с опциями",
      "Путь к файлу и тип",
      "URL и размер"
    ],
    correctAnswer: 1,
    explanation: "Конструктор Blob принимает два параметра: массив данных (array) и объект с опциями (options), где можно указать type (MIME-тип).",
    topic: "Основы Blob"
  },
  {
    id: 3,
    question: "Что выведет этот код?\n\nconst blob = new Blob(['Hello']);\nconsole.log(blob.size);",
    options: [
      "1",
      "5",
      "undefined",
      "0"
    ],
    correctAnswer: 1,
    explanation: "Свойство size возвращает размер данных в байтах. Строка 'Hello' содержит 5 символов, поэтому размер будет 5 байт.",
    topic: "Основы Blob"
  },
  {
    id: 4,
    question: "Можно ли изменить содержимое Blob после создания?",
    options: [
      "Да, через метод update()",
      "Да, через метод modify()",
      "Нет, Blob неизменяемый (immutable)",
      "Да, напрямую изменив свойство data"
    ],
    correctAnswer: 2,
    explanation: "Blob является неизменяемым объектом. После создания его содержимое нельзя изменить. Можно только создать новый Blob.",
    topic: "Основы Blob"
  },
  {
    id: 5,
    question: "Какое свойство Blob содержит MIME-тип данных?",
    options: [
      "mimeType",
      "contentType",
      "type",
      "format"
    ],
    correctAnswer: 2,
    explanation: "Свойство type содержит MIME-тип данных Blob, например 'text/plain' или 'image/png'.",
    topic: "Основы Blob"
  },

  // Тема 2: Методы Blob
  {
    id: 6,
    question: "Какой метод используется для создания части Blob?",
    options: [
      "split()",
      "slice()",
      "substr()",
      "cut()"
    ],
    correctAnswer: 1,
    explanation: "Метод slice() создает новый Blob, содержащий копию указанного диапазона байтов из исходного Blob.",
    topic: "Методы Blob"
  },
  {
    id: 7,
    question: "Какие параметры принимает метод slice()?",
    options: [
      "Только начальный индекс",
      "Начальный индекс, конечный индекс и contentType",
      "Только размер",
      "Только contentType"
    ],
    correctAnswer: 1,
    explanation: "Метод slice() принимает три необязательных параметра: start (начальный байт), end (конечный байт) и contentType (MIME-тип нового Blob).",
    topic: "Методы Blob"
  },
  {
    id: 8,
    question: "Как прочитать содержимое Blob как текст?",
    options: [
      "blob.toString()",
      "blob.text()",
      "blob.read()",
      "blob.getData()"
    ],
    correctAnswer: 1,
    explanation: "Метод text() возвращает Promise, который разрешается строкой с содержимым Blob в кодировке UTF-8.",
    topic: "Методы Blob"
  },
  {
    id: 9,
    question: "Какой метод Blob возвращает Promise с ArrayBuffer?",
    options: [
      "toArrayBuffer()",
      "arrayBuffer()",
      "getBuffer()",
      "buffer()"
    ],
    correctAnswer: 1,
    explanation: "Метод arrayBuffer() возвращает Promise, который разрешается ArrayBuffer с данными Blob в бинарном формате.",
    topic: "Методы Blob"
  },
  {
    id: 10,
    question: "Что делает метод stream() у Blob?",
    options: [
      "Преобразует Blob в строку",
      "Возвращает ReadableStream для чтения данных",
      "Сохраняет Blob в файл",
      "Отправляет Blob на сервер"
    ],
    correctAnswer: 1,
    explanation: "Метод stream() возвращает ReadableStream, что позволяет читать данные Blob порциями (chunks), полезно для больших файлов.",
    topic: "Методы Blob"
  },

  // Тема 3: Создание URL для Blob
  {
    id: 11,
    question: "Какой метод создает временный URL для Blob?",
    options: [
      "Blob.createURL()",
      "URL.createObjectURL()",
      "Blob.getURL()",
      "createBlobURL()"
    ],
    correctAnswer: 1,
    explanation: "URL.createObjectURL() создает уникальный blob: URL, который можно использовать для обращения к Blob объекту.",
    topic: "Blob URL"
  },
  {
    id: 12,
    question: "Почему важно освобождать Blob URL после использования?",
    options: [
      "Чтобы ускорить работу браузера",
      "Чтобы предотвратить утечки памяти",
      "Это необязательно",
      "Чтобы другие могли использовать этот URL"
    ],
    correctAnswer: 1,
    explanation: "Blob URL хранит ссылку на Blob в памяти. Если не освобождать URL через URL.revokeObjectURL(), это приведет к утечке памяти.",
    topic: "Blob URL"
  },
  {
    id: 13,
    question: "Какой метод освобождает Blob URL?",
    options: [
      "URL.deleteObjectURL()",
      "URL.revokeObjectURL()",
      "URL.removeObjectURL()",
      "Blob.revokeURL()"
    ],
    correctAnswer: 1,
    explanation: "URL.revokeObjectURL() освобождает ранее созданный Blob URL и удаляет связанный с ним объект из памяти.",
    topic: "Blob URL"
  },
  {
    id: 14,
    question: "Можно ли использовать Blob URL в другой вкладке браузера?",
    options: [
      "Да, он работает глобально",
      "Нет, он работает только в контексте текущего документа",
      "Да, но только в том же домене",
      "Да, если передать URL через postMessage"
    ],
    correctAnswer: 1,
    explanation: "Blob URL привязан к документу, в котором был создан, и не работает в других вкладках или окнах браузера.",
    topic: "Blob URL"
  },
  {
    id: 15,
    question: "Какой формат имеет Blob URL?",
    options: [
      "http://blob/...",
      "blob:http://example.com/uuid",
      "data:blob/...",
      "file:///blob/..."
    ],
    correctAnswer: 1,
    explanation: "Blob URL имеет формат blob:<origin>/<uuid>, например blob:http://example.com/550e8400-e29b-41d4-a716-446655440000.",
    topic: "Blob URL"
  },

  // Тема 4: Различие между Blob и File
  {
    id: 16,
    question: "Чем File отличается от Blob?",
    options: [
      "File может быть больше по размеру",
      "File наследуется от Blob и добавляет информацию о файле (имя, дата)",
      "File быстрее обрабатывается",
      "File может изменяться, а Blob нет"
    ],
    correctAnswer: 1,
    explanation: "File расширяет Blob, добавляя метаданные файла: name (имя файла), lastModified (дата последнего изменения).",
    topic: "File vs Blob"
  },
  {
    id: 17,
    question: "Какие дополнительные свойства есть у File по сравнению с Blob?",
    options: [
      "path и size",
      "name и lastModified",
      "type и data",
      "url и content"
    ],
    correctAnswer: 1,
    explanation: "File имеет дополнительные свойства: name (имя файла) и lastModified (timestamp последнего изменения).",
    topic: "File vs Blob"
  },
  {
    id: 18,
    question: "Как создать File объект программно?",
    options: [
      "new File(data, filename)",
      "new File([data], filename, options)",
      "File.create(data, filename)",
      "Blob.toFile(data, filename)"
    ],
    correctAnswer: 1,
    explanation: "File создается через конструктор: new File([data], filename, options), где options может содержать type и lastModified.",
    topic: "File vs Blob"
  },
  {
    id: 19,
    question: "Что вернет выражение file instanceof Blob, где file — это File объект?",
    options: [
      "false",
      "true",
      "undefined",
      "TypeError"
    ],
    correctAnswer: 1,
    explanation: "File наследуется от Blob, поэтому file instanceof Blob вернет true.",
    topic: "File vs Blob"
  },
  {
    id: 20,
    question: "Откуда обычно берутся File объекты в браузере?",
    options: [
      "Только из конструктора File",
      "Из input[type=file], drag&drop событий, clipboard API",
      "Только из localStorage",
      "Из CSS стилей"
    ],
    correctAnswer: 1,
    explanation: "File объекты обычно получают из input элементов с type='file', событий drag and drop или Clipboard API.",
    topic: "File vs Blob"
  },

  // Тема 5: FileReader
  {
    id: 21,
    question: "Для чего используется FileReader?",
    options: [
      "Для записи данных в файл",
      "Для асинхронного чтения содержимого Blob/File",
      "Для загрузки файлов на сервер",
      "Для создания Blob объектов"
    ],
    correctAnswer: 1,
    explanation: "FileReader предоставляет методы для асинхронного чтения содержимого Blob или File объектов в различных форматах.",
    topic: "FileReader"
  },
  {
    id: 22,
    question: "Какой метод FileReader читает файл как Data URL?",
    options: [
      "readAsURL()",
      "readAsDataURL()",
      "toDataURL()",
      "readAsBase64()"
    ],
    correctAnswer: 1,
    explanation: "Метод readAsDataURL() читает содержимое Blob/File и представляет его как Data URL (base64-encoded).",
    topic: "FileReader"
  },
  {
    id: 23,
    question: "Какое событие срабатывает при успешном завершении чтения файла?",
    options: [
      "onload",
      "oncomplete",
      "onfinish",
      "onsuccess"
    ],
    correctAnswer: 0,
    explanation: "Событие load (обработчик onload) срабатывает при успешном завершении операции чтения.",
    topic: "FileReader"
  },
  {
    id: 24,
    question: "Где находится результат чтения после успешного завершения?",
    options: [
      "reader.data",
      "reader.result",
      "reader.content",
      "reader.output"
    ],
    correctAnswer: 1,
    explanation: "Результат чтения доступен в свойстве result объекта FileReader после завершения операции.",
    topic: "FileReader"
  },
  {
    id: 25,
    question: "Какой метод FileReader читает файл как текст?",
    options: [
      "readAsString()",
      "readAsText()",
      "getText()",
      "toText()"
    ],
    correctAnswer: 1,
    explanation: "Метод readAsText() читает содержимое Blob/File как текст. Можно указать кодировку вторым параметром (по умолчанию UTF-8).",
    topic: "FileReader"
  },
  {
    id: 26,
    question: "Какой метод FileReader читает файл как ArrayBuffer?",
    options: [
      "readAsBuffer()",
      "readAsBinary()",
      "readAsArrayBuffer()",
      "toArrayBuffer()"
    ],
    correctAnswer: 2,
    explanation: "Метод readAsArrayBuffer() читает содержимое Blob/File как ArrayBuffer, что полезно для работы с бинарными данными.",
    topic: "FileReader"
  },
  {
    id: 27,
    question: "Как отменить операцию чтения в FileReader?",
    options: [
      "reader.stop()",
      "reader.cancel()",
      "reader.abort()",
      "reader.terminate()"
    ],
    correctAnswer: 2,
    explanation: "Метод abort() прерывает операцию чтения. При этом срабатывает событие abort.",
    topic: "FileReader"
  },

  // Тема 6: Практическое применение
  {
    id: 28,
    question: "Как скачать Blob как файл в браузере?",
    options: [
      "Использовать Blob.download()",
      "Создать <a> с blob URL и href, затем кликнуть",
      "Вызвать window.download(blob)",
      "Использовать saveAs(blob)"
    ],
    correctAnswer: 1,
    explanation: "Чтобы скачать Blob, нужно создать элемент <a> с href равным blob URL, установить атрибут download и программно кликнуть по нему.",
    topic: "Практическое применение"
  },
  {
    id: 29,
    question: "Как отправить File на сервер через fetch?",
    options: [
      "Добавить File в FormData и отправить",
      "Преобразовать File в JSON",
      "Использовать File.upload()",
      "Передать File напрямую в body"
    ],
    correctAnswer: 0,
    explanation: "File добавляется в FormData объект, который затем отправляется в body запроса. FormData автоматически устанавливает правильный Content-Type.",
    topic: "Практическое применение"
  },
  {
    id: 30,
    question: "Как отобразить изображение из File в браузере?",
    options: [
      "Установить File как src элемента img",
      "Создать blob URL и установить как src",
      "Преобразовать в base64 через JSON",
      "Использовать File.show()"
    ],
    correctAnswer: 1,
    explanation: "Создается blob URL через URL.createObjectURL(file) и устанавливается как src элемента img. После использования URL нужно освободить.",
    topic: "Практическое применение"
  }
]
