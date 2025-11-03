export interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}

export const webAPIInterviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Что такое Blob и для чего он используется?",
    answer: "<p><strong>Blob</strong> (Binary Large Object) — это объект, представляющий неизменяемые необработанные данные произвольного размера в двоичном формате.</p><p>Blob используется для работы с файлоподобными данными в браузере, когда нужно хранить, обрабатывать или передавать бинарные данные.</p><h4>Основные применения:</h4><ul><li><strong>Работа с файлами:</strong> Загрузка, скачивание, обработка файлов</li><li><strong>Медиа-контент:</strong> Создание URL для изображений, видео, аудио</li><li><strong>Генерация файлов:</strong> Создание текстовых файлов, CSV, JSON для скачивания</li><li><strong>Работа с Canvas:</strong> Экспорт изображений из canvas</li><li><strong>Передача данных:</strong> Отправка бинарных данных через Fetch API или XMLHttpRequest</li></ul><p>Blob имеет два основных свойства: <code>size</code> (размер в байтах) и <code>type</code> (MIME-тип данных). Данные внутри Blob неизменяемы, но можно создавать новые Blob на основе существующих.</p>",
    difficulty: 'junior',
    tags: ['Blob', 'основы', 'бинарные данные']
  },
  {
    id: 2,
    question: "В чем разница между Blob и File?",
    answer: "<p><strong>File</strong> — это специализированный тип Blob, который содержит дополнительную информацию о файле.</p><h4>Ключевые различия:</h4><p><strong>File наследуется от Blob</strong> и добавляет дополнительные свойства:</p><ul><li><code>name</code> — имя файла</li><li><code>lastModified</code> — временная метка последнего изменения</li><li><code>lastModifiedDate</code> (устаревшее) — дата последнего изменения</li></ul><p><strong>Blob</strong> — это более общий объект для произвольных бинарных данных, который не связан с файловой системой.</p><h4>Создание:</h4><p>Blob создается программно через конструктор, а File обычно получается из <code>input[type='file']</code>, drag-and-drop или создается через конструктор File с указанием имени.</p><h4>Использование:</h4><p>File используется когда важна информация о файле (имя, дата), Blob — для работы с чистыми данными без метаинформации.</p><p><em>На практике:</em> File можно использовать везде, где ожидается Blob, так как File является его расширением.</p>",
    difficulty: 'junior',
    tags: ['Blob', 'File', 'различия', 'наследование']
  },
  {
    id: 3,
    question: "Как создать Blob из различных типов данных?",
    answer: "<p>Blob можно создать из разных типов данных используя конструктор <code>new Blob()</code>:</p><h4>Из строки:</h4><p>Самый простой случай — передать массив со строкой. Второй параметр определяет MIME-тип.</p><p>Например: <code>new Blob(['Привет, мир!'], { type: 'text/plain' })</code></p><h4>Из ArrayBuffer:</h4><p>Для работы с бинарными данными можно использовать типизированные массивы:</p><p><code>const buffer = new Uint8Array([72, 101, 108, 108, 111]);</code><br><code>const blob = new Blob([buffer], { type: 'application/octet-stream' });</code></p><h4>Из другого Blob:</h4><p>Можно комбинировать несколько Blob в один новый Blob:</p><p><code>new Blob([blob1, blob2, 'текст'], { type: 'text/plain' })</code></p><h4>Из JSON:</h4><p>Полезно для создания файлов JSON:</p><p><code>const data = { name: 'John', age: 30 };</code><br><code>const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });</code></p><p><em>Важно:</em> Первый параметр конструктора всегда должен быть массивом, даже если передается один элемент.</p>",
    difficulty: 'junior',
    tags: ['Blob', 'создание', 'конструктор', 'типы данных']
  },
  {
    id: 4,
    question: "Что такое Blob URL и как его создать?",
    answer: "<p><strong>Blob URL</strong> — это специальный URL-адрес, указывающий на Blob-объект в памяти браузера. Он позволяет работать с Blob как с обычным файлом по URL.</p><h4>Создание Blob URL:</h4><p>Используется метод <code>URL.createObjectURL(blob)</code>, который создает уникальную строку вида <code>blob:https://example.com/550e8400-e29b-41d4-a716-446655440000</code></p><h4>Применение:</h4><ul><li><strong>Отображение изображений:</strong> Установка blob URL как src для img элемента</li><li><strong>Скачивание файлов:</strong> Создание ссылки для загрузки сгенерированного контента</li><li><strong>Воспроизведение медиа:</strong> Использование в video или audio элементах</li><li><strong>Открытие в новой вкладке:</strong> window.open с blob URL</li></ul><h4>Освобождение памяти:</h4><p>Blob URL занимает память, пока существует. Важно освобождать его через <code>URL.revokeObjectURL(blobUrl)</code> когда он больше не нужен.</p><p><em>Best practice:</em> Всегда вызывайте revokeObjectURL после использования, особенно в long-running приложениях, чтобы избежать утечек памяти.</p>",
    difficulty: 'middle',
    tags: ['Blob URL', 'память', 'createObjectURL', 'revokeObjectURL']
  },
  {
    id: 5,
    question: "Как прочитать содержимое Blob или File?",
    answer: "<p>Для чтения содержимого Blob/File используется <strong>FileReader API</strong>:</p><h4>Основные методы FileReader:</h4><p><strong>readAsText():</strong> Читает содержимое как текст. Можно указать кодировку вторым параметром.</p><p><strong>readAsDataURL():</strong> Преобразует в Data URL (base64). Удобно для отображения изображений.</p><p><strong>readAsArrayBuffer():</strong> Читает как ArrayBuffer для работы с бинарными данными.</p><p><strong>readAsBinaryString():</strong> Читает как бинарную строку (устаревший метод).</p><h4>События FileReader:</h4><ul><li><code>onload</code> — успешное чтение</li><li><code>onerror</code> — ошибка чтения</li><li><code>onprogress</code> — процесс чтения (для больших файлов)</li><li><code>onloadend</code> — завершение чтения (успешное или с ошибкой)</li></ul><h4>Современный подход:</h4><p>Можно использовать методы самого Blob: <code>text()</code>, <code>arrayBuffer()</code>, которые возвращают Promise:</p><p><code>const text = await blob.text();</code><br><code>const buffer = await blob.arrayBuffer();</code></p><p><em>Преимущество:</em> Promise-based API проще для работы с async/await.</p>",
    difficulty: 'middle',
    tags: ['FileReader', 'чтение', 'асинхронность', 'методы']
  },
  {
    id: 6,
    question: "Как реализовать скачивание файла, созданного в браузере?",
    answer: "<p>Скачивание файла из браузера реализуется через создание временной ссылки с Blob URL:</p><h4>Базовая реализация:</h4><p>1. Создаем Blob с нужным содержимым<br>2. Создаем Blob URL через <code>URL.createObjectURL()</code><br>3. Создаем ссылку (a элемент)<br>4. Устанавливаем href на Blob URL<br>5. Устанавливаем атрибут download с именем файла<br>6. Программно кликаем по ссылке<br>7. Удаляем ссылку и освобождаем URL</p><h4>Пример функции:</h4><p><code>function downloadFile(content, filename, type) {</code><br><code>&nbsp;&nbsp;const blob = new Blob([content], { type });</code><br><code>&nbsp;&nbsp;const url = URL.createObjectURL(blob);</code><br><code>&nbsp;&nbsp;const a = document.createElement('a');</code><br><code>&nbsp;&nbsp;a.href = url;</code><br><code>&nbsp;&nbsp;a.download = filename;</code><br><code>&nbsp;&nbsp;a.click();</code><br><code>&nbsp;&nbsp;URL.revokeObjectURL(url);</code><br><code>}</code></p><h4>Применение:</h4><p>Скачивание сгенерированных CSV, JSON, текстовых файлов, экспорт данных из canvas, сохранение пользовательского контента.</p><p><em>Важно:</em> Атрибут download работает только для same-origin URL и blob URL.</p>",
    difficulty: 'middle',
    tags: ['скачивание', 'download', 'практика', 'пользовательский опыт']
  },
  {
    id: 7,
    question: "Как работать с частями Blob через метод slice()?",
    answer: "<p>Метод <code>slice()</code> позволяет <strong>извлекать части Blob</strong> без копирования данных в память:</p><h4>Синтаксис:</h4><p><code>blob.slice(start, end, contentType)</code></p><ul><li><code>start</code> — начальная позиция (байт), по умолчанию 0</li><li><code>end</code> — конечная позиция (не включительно), по умолчанию blob.size</li><li><code>contentType</code> — MIME-тип нового Blob, по умолчанию пустая строка</li></ul><h4>Особенности:</h4><p>Slice не копирует данные в памяти — создается <strong>ссылка на часть оригинального Blob</strong>. Это делает операцию очень быстрой даже для больших файлов.</p><h4>Применение:</h4><p><strong>Chunked upload:</strong> Разделение большого файла на части для загрузки по частям.</p><p><strong>Чтение больших файлов:</strong> Обработка файла по частям, чтобы не загружать весь в память.</p><p><strong>Извлечение заголовков:</strong> Чтение первых байтов файла для определения типа.</p><p><strong>Манипуляция данными:</strong> Удаление или замена частей файла.</p><p><em>Производительность:</em> Slice работает за O(1), так как не копирует данные, только создает новый Blob-дескриптор.</p>",
    difficulty: 'middle',
    tags: ['slice', 'chunking', 'производительность', 'память']
  },
  {
    id: 8,
    question: "Как реализовать загрузку большого файла по частям (chunked upload)?",
    answer: "<p><strong>Chunked upload</strong> — это техника загрузки больших файлов по частям, что улучшает надежность и позволяет показывать прогресс:</p><h4>Алгоритм реализации:</h4><p><strong>1. Разбиение файла:</strong> Используем метод <code>slice()</code> для деления файла на части (chunks) фиксированного размера, например 1MB.</p><p><strong>2. Последовательная загрузка:</strong> Отправляем каждую часть отдельным запросом с информацией о позиции.</p><p><strong>3. Отслеживание прогресса:</strong> После каждой успешной загрузки обновляем прогресс-бар.</p><p><strong>4. Обработка ошибок:</strong> При неудаче повторяем загрузку конкретного chunk, а не всего файла.</p><p><strong>5. Финализация:</strong> После загрузки всех частей сервер собирает их в единый файл.</p><h4>Преимущества:</h4><ul><li>Возможность паузы и возобновления загрузки</li><li>Точный прогресс загрузки</li><li>Автоматическое восстановление после сетевых ошибок</li><li>Меньше нагрузка на память — загружаем по частям</li></ul><h4>На сервере:</h4><p>Сервер должен поддерживать прием частей, сохранять их с метаданными и собирать в финальный файл после получения всех chunk.</p>",
    difficulty: 'senior',
    tags: ['chunked upload', 'большие файлы', 'производительность', 'надежность']
  },
  {
    id: 9,
    question: "Как конвертировать изображение из canvas в Blob?",
    answer: "<p>Конвертация canvas в Blob используется для сохранения или загрузки изображений, созданных или отредактированных в браузере:</p><h4>Метод toBlob():</h4><p>Canvas предоставляет асинхронный метод <code>toBlob(callback, type, quality)</code>:</p><ul><li><code>callback</code> — функция, получающая созданный Blob</li><li><code>type</code> — MIME-тип (по умолчанию 'image/png')</li><li><code>quality</code> — качество для JPEG/WebP от 0 до 1</li></ul><h4>Промисификация:</h4><p>Для удобства можно обернуть в Promise:</p><p><code>function canvasToBlob(canvas, type, quality) {</code><br><code>&nbsp;&nbsp;return new Promise(resolve => {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;canvas.toBlob(resolve, type, quality);</code><br><code>&nbsp;&nbsp;});</code><br><code>}</code></p><h4>Применение:</h4><ul><li>Экспорт отредактированных изображений</li><li>Создание превью перед загрузкой</li><li>Применение фильтров и эффектов</li><li>Водяные знаки и аннотации</li><li>Оптимизация размера изображения</li></ul><h4>Форматы:</h4><p>Поддерживаются 'image/png', 'image/jpeg', 'image/webp'. PNG поддерживает прозрачность, JPEG — регулируемое качество для меньшего размера.</p>",
    difficulty: 'middle',
    tags: ['canvas', 'изображения', 'конвертация', 'toBlob']
  },
  {
    id: 10,
    question: "В чем разница между Data URL и Blob URL?",
    answer: "<p>Data URL и Blob URL — два способа представления бинарных данных в виде URL, но с разными характеристиками:</p><h4>Data URL:</h4><p><strong>Формат:</strong> <code>data:[MIME-type];base64,[закодированные данные]</code></p><p><strong>Характеристики:</strong></p><ul><li>Данные встроены прямо в URL</li><li>Очень длинная строка для больших файлов</li><li>Увеличивает размер на ~33% из-за base64</li><li>Можно копировать, сохранять, передавать</li><li>Работает везде, где принимается URL</li><li>Не требует освобождения памяти</li></ul><h4>Blob URL:</h4><p><strong>Формат:</strong> <code>blob:https://example.com/uuid</code></p><p><strong>Характеристики:</strong></p><ul><li>Короткая строка-ссылка на данные в памяти</li><li>Не увеличивает размер — ссылка фиксированной длины</li><li>Работает только в текущей сессии браузера</li><li>Требует явного освобождения памяти</li><li>Быстрее для больших файлов</li><li>Нельзя передать между страницами/вкладками</li></ul><h4>Когда использовать:</h4><p><strong>Data URL:</strong> Маленькие изображения, иконки, inline-вставки, когда нужна переносимость.</p><p><strong>Blob URL:</strong> Большие файлы, временный контент, когда важна производительность.</p>",
    difficulty: 'middle',
    tags: ['Data URL', 'Blob URL', 'различия', 'производительность']
  },
  {
    id: 11,
    question: "Как обработать drag-and-drop файлов?",
    answer: "<p>Drag-and-drop файлов реализуется через <strong>HTML5 Drag and Drop API</strong> в сочетании с File API:</p><h4>Основные события:</h4><p><strong>dragover:</strong> Срабатывает когда элемент перетаскивается над зоной. Нужно вызвать <code>preventDefault()</code> для разрешения drop.</p><p><strong>drop:</strong> Срабатывает когда элемент отпускают в зоне. Здесь получаем файлы.</p><p><strong>dragleave:</strong> Срабатывает когда элемент покидает зону (для визуального feedback).</p><h4>Получение файлов:</h4><p>Файлы доступны через <code>event.dataTransfer.files</code> — это FileList, похожий на массив File объектов.</p><h4>Реализация:</h4><p><code>dropZone.addEventListener('dragover', (e) => {</code><br><code>&nbsp;&nbsp;e.preventDefault();</code><br><code>&nbsp;&nbsp;dropZone.classList.add('drag-over');</code><br><code>});</code></p><p><code>dropZone.addEventListener('drop', async (e) => {</code><br><code>&nbsp;&nbsp;e.preventDefault();</code><br><code>&nbsp;&nbsp;const files = Array.from(e.dataTransfer.files);</code><br><code>&nbsp;&nbsp;// обработка файлов</code><br><code>});</code></p><h4>Улучшения UX:</h4><ul><li>Визуальный feedback при наведении</li><li>Валидация типов файлов</li><li>Превью изображений</li><li>Прогресс загрузки</li></ul>",
    difficulty: 'middle',
    tags: ['drag-and-drop', 'File API', 'UX', 'события']
  },
  {
    id: 12,
    question: "Как проверить MIME-тип файла на клиенте?",
    answer: "<p>Проверка MIME-типа файла важна для валидации загружаемых файлов:</p><h4>Свойство file.type:</h4><p>File объект имеет свойство <code>type</code>, содержащее MIME-тип, например 'image/jpeg', 'application/pdf'.</p><p><strong>Ограничение:</strong> Это значение определяется по расширению файла и может быть легко подделано. Нельзя полагаться только на него для безопасности.</p><h4>Проверка сигнатуры (magic numbers):</h4><p>Для надежной проверки читаем первые байты файла и сравниваем с известными сигнатурами:</p><ul><li>JPEG: FF D8 FF</li><li>PNG: 89 50 4E 47</li><li>PDF: 25 50 44 46</li><li>ZIP: 50 4B 03 04</li></ul><p>Читаем начало файла через <code>slice()</code> и <code>arrayBuffer()</code>, затем сравниваем байты.</p><h4>Комплексный подход:</h4><p><strong>1. Базовая проверка:</strong> file.type для быстрой фильтрации</p><p><strong>2. Сигнатура:</strong> Проверка magic numbers для важных файлов</p><p><strong>3. Серверная валидация:</strong> Окончательная проверка на сервере</p><p><em>Безопасность:</em> Клиентская проверка — только для UX. Всегда валидируйте на сервере.</p>",
    difficulty: 'senior',
    tags: ['MIME-тип', 'валидация', 'безопасность', 'magic numbers']
  },
  {
    id: 13,
    question: "Как работать с Blob в Service Worker?",
    answer: "<p>Service Worker может работать с Blob для <strong>кэширования, оффлайн-доступа и обработки файлов</strong>:</p><h4>Кэширование Blob:</h4><p>В Service Worker можно перехватывать запросы и создавать Response с Blob:</p><p><code>const blob = new Blob(['cached content'], { type: 'text/html' });</code><br><code>return new Response(blob, { status: 200 });</code></p><h4>Обработка файлов:</h4><p>Service Worker может получать файлы через <code>fetch()</code>, обрабатывать их и возвращать модифицированный Blob.</p><h4>Offline-first стратегия:</h4><p>При отсутствии сети Service Worker может отдавать закэшированные Blob-ресурсы из Cache API.</p><h4>Особенности:</h4><ul><li>Blob можно сохранять в Cache API</li><li>Можно создавать синтетические Response с Blob</li><li>Полезно для обработки изображений, оптимизации</li><li>Можно проксировать и трансформировать контент</li></ul><h4>Применение:</h4><p>Оффлайн-режим для медиа-контента, динамическая генерация ресурсов, оптимизация изображений на лету, прокси для внешних ресурсов.</p><p><em>Важно:</em> Blob в Service Worker работает асинхронно, используйте Promise API.</p>",
    difficulty: 'senior',
    tags: ['Service Worker', 'кэширование', 'offline', 'производительность']
  },
  {
    id: 14,
    question: "Какие есть ограничения и best practices при работе с Blob?",
    answer: "<p>При работе с Blob важно понимать ограничения и следовать лучшим практикам:</p><h4>Ограничения памяти:</h4><p><strong>Размер:</strong> Blob хранится в памяти браузера. Для очень больших файлов (гигабайты) может не хватить памяти.</p><p><strong>Blob URL:</strong> Каждый созданный Blob URL занимает память до вызова <code>revokeObjectURL()</code>.</p><h4>Best Practices:</h4><p><strong>Освобождение ресурсов:</strong> Всегда вызывайте <code>URL.revokeObjectURL()</code> после использования Blob URL.</p><p><strong>Обработка по частям:</strong> Для больших файлов используйте <code>slice()</code> и обрабатывайте chunk за chunk.</p><p><strong>Проверка размера:</strong> Проверяйте <code>blob.size</code> перед обработкой и устанавливайте лимиты.</p><p><strong>Типизация:</strong> Всегда указывайте правильный MIME-тип при создании Blob.</p><p><strong>Обработка ошибок:</strong> FileReader может выбросить ошибку при чтении, всегда обрабатывайте <code>onerror</code>.</p><h4>Производительность:</h4><ul><li>Используйте Workers для обработки больших файлов</li><li>Избегайте создания множества Blob URL одновременно</li><li>Кэшируйте обработанные Blob где возможно</li></ul>",
    difficulty: 'senior',
    tags: ['ограничения', 'best practices', 'производительность', 'память']
  },
  {
    id: 15,
    question: "Как использовать Blob с Web Workers?",
    answer: "<p>Web Workers позволяют обрабатывать Blob в <strong>отдельном потоке</strong>, не блокируя основной поток:</p><h4>Передача Blob в Worker:</h4><p>Blob можно передать в Worker через <code>postMessage()</code>. Браузер автоматически клонирует Blob, используя structured clone algorithm.</p><p><code>worker.postMessage({ blob: myBlob });</code></p><h4>Transferable Objects:</h4><p>Для больших данных можно использовать <strong>transferable objects</strong> с ArrayBuffer, чтобы передать владение без копирования:</p><p><code>const buffer = await blob.arrayBuffer();</code><br><code>worker.postMessage({ buffer }, [buffer]);</code></p><h4>Применение:</h4><p><strong>Обработка изображений:</strong> Ресайз, фильтры, компрессия в фоне.</p><p><strong>Парсинг файлов:</strong> CSV, JSON, XML больших размеров.</p><p><strong>Шифрование/дешифрование:</strong> Криптографические операции.</p><p><strong>Генерация контента:</strong> Создание PDF, ZIP файлов.</p><h4>Паттерн использования:</h4><p>1. Передаем Blob/ArrayBuffer в Worker<br>2. Worker обрабатывает данные<br>3. Worker возвращает результат (Blob или данные)<br>4. Основной поток использует результат</p><p><em>Преимущество:</em> Интерфейс остается отзывчивым во время тяжелых операций с файлами.</p>",
    difficulty: 'senior',
    tags: ['Web Workers', 'многопоточность', 'производительность', 'асинхронность']
  }
];
