<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const blobBasicsSnippet = `
// =====================================
// BLOB - Binary Large Object
// =====================================

// 1. Создание Blob из строки
const textBlob = new Blob(['Привет, мир!'], { type: 'text/plain' })
console.log(textBlob.size)  // 23 (в байтах, UTF-8)
console.log(textBlob.type)  // "text/plain"

// 2. Создание Blob из нескольких частей
const multiPartBlob = new Blob(
  ['<html><body>', '<h1>Hello</h1>', '</body></html>'],
  { type: 'text/html' }
)

// 3. Создание Blob из типизированного массива
const bytes = new Uint8Array([72, 101, 108, 108, 111]) // "Hello"
const binaryBlob = new Blob([bytes], { type: 'application/octet-stream' })

// 4. Создание Blob из JSON
const jsonData = { name: 'John', age: 30 }
const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' })

// 5. Свойства Blob
console.log(textBlob instanceof Blob)  // true
console.log(textBlob.size)             // размер в байтах
console.log(textBlob.type)             // MIME тип

// 6. Создание Blob URL
const blobURL = URL.createObjectURL(textBlob)
console.log(blobURL)  // blob:http://localhost:3000/uuid
// ⚠️ Важно: освобождать память после использования
URL.revokeObjectURL(blobURL)
`

const blobMethodsSnippet = `
// =====================================
// МЕТОДЫ BLOB
// =====================================

const textBlob = new Blob(['Hello World!'], { type: 'text/plain' })

// 1. slice() - создание части Blob
const partialBlob = textBlob.slice(0, 5)  // "Hello"
const partialBlob2 = textBlob.slice(6)     // "World!"
const partialWithType = textBlob.slice(0, 5, 'text/plain')

// 2. text() - чтение как текст (Promise)
textBlob.text().then(text => {
  console.log(text)  // "Hello World!"
})

// async/await версия
const text = await textBlob.text()
console.log(text)

// 3. arrayBuffer() - чтение как бинарные данные
textBlob.arrayBuffer().then(buffer => {
  console.log(new Uint8Array(buffer))  // [72, 101, 108, 108, 111, ...]
})

// 4. stream() - чтение через потоки
const stream = textBlob.stream()
const reader = stream.getReader()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log('Chunk:', new TextDecoder().decode(value))
}
`

const fileBasicsSnippet = `
// =====================================
// FILE - расширение Blob для файлов
// =====================================

// File наследуется от Blob и добавляет метаданные

// 1. Создание File программно
const file = new File(
  ['Содержимое файла'],
  'example.txt',
  {
    type: 'text/plain',
    lastModified: Date.now()
  }
)

console.log(file.name)          // "example.txt"
console.log(file.size)          // размер в байтах
console.log(file.type)          // "text/plain"
console.log(file.lastModified)  // timestamp
console.log(file.lastModifiedDate) // Date объект (deprecated)

// 2. File - это Blob
console.log(file instanceof Blob)  // true
console.log(file instanceof File)  // true

// 3. Все методы Blob доступны
const text = await file.text()
const buffer = await file.arrayBuffer()
const part = file.slice(0, 10)

// 4. Создание File из существующего Blob
const blob = new Blob(['Some data'], { type: 'text/plain' })
const fileFromBlob = new File([blob], 'data.txt', { type: 'text/plain' })
`

const fileInputSnippet = `
// =====================================
// РАБОТА С <input type="file">
// =====================================

// HTML: <input type="file" id="fileInput" multiple accept="image/*">

const fileInput = document.getElementById('fileInput')

// Обработка выбора файлов
fileInput.addEventListener('change', async (event) => {
  const files = event.target.files  // FileList объект

  console.log('Количество файлов:', files.length)

  // FileList не массив, но итерируемый
  for (const file of files) {
    console.log('Имя:', file.name)
    console.log('Размер:', file.size, 'байт')
    console.log('Тип:', file.type)
    console.log('Изменен:', new Date(file.lastModified))

    // Чтение содержимого
    const content = await file.text()
    console.log('Содержимое:', content)
  }

  // Преобразование FileList в массив
  const filesArray = Array.from(files)
  // или
  const filesArray2 = [...files]

  // Фильтрация файлов
  const imageFiles = filesArray.filter(file => file.type.startsWith('image/'))

  // Сортировка по размеру
  const sortedFiles = filesArray.sort((a, b) => a.size - b.size)
})

// Программный клик на input
const openFileDialog = () => {
  fileInput.click()
}
`

const fileReaderSnippet = `
// =====================================
// FILEREADER - классический способ чтения файлов
// =====================================

const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0]

  // 1. Чтение как текст
  const textReader = new FileReader()

  textReader.onload = (e) => {
    console.log('Текст:', e.target.result)
  }

  textReader.onerror = (e) => {
    console.error('Ошибка чтения:', e.target.error)
  }

  textReader.onprogress = (e) => {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100
      console.log('Прогресс:', percentComplete + '%')
    }
  }

  textReader.readAsText(file, 'UTF-8')

  // 2. Чтение как Data URL (для изображений)
  const imageReader = new FileReader()

  imageReader.onload = (e) => {
    const img = document.createElement('img')
    img.src = e.target.result  // data:image/png;base64,...
    document.body.appendChild(img)
  }

  imageReader.readAsDataURL(file)

  // 3. Чтение как ArrayBuffer (бинарные данные)
  const binaryReader = new FileReader()

  binaryReader.onload = (e) => {
    const buffer = e.target.result
    const bytes = new Uint8Array(buffer)
    console.log('Первые 10 байт:', bytes.slice(0, 10))
  }

  binaryReader.readAsArrayBuffer(file)

  // 4. Чтение как Binary String (устарело, но работает)
  const binaryStringReader = new FileReader()

  binaryStringReader.onload = (e) => {
    console.log('Binary string:', e.target.result)
  }

  binaryStringReader.readAsBinaryString(file)
})

// Современный async подход вместо FileReader
async function modernReadFile(file) {
  // Вместо FileReader используем методы File
  const text = await file.text()
  const buffer = await file.arrayBuffer()

  // Data URL через Promise
  const dataURL = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })

  return { text, buffer, dataURL }
}
`

const blobUrlSnippet = `
// =====================================
// BLOB URL - временные ссылки на данные
// =====================================

// 1. Создание Blob URL для изображения
async function displayImageFromBlob(blob) {
  const url = URL.createObjectURL(blob)

  const img = document.createElement('img')
  img.src = url
  img.onload = () => {
    // ⚠️ Освобождаем память после загрузки
    URL.revokeObjectURL(url)
  }

  document.body.appendChild(img)
}

// 2. Скачивание файла через Blob URL
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  // Освобождаем через небольшую задержку
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

// Пример: скачивание текстового файла
const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
downloadBlob(textBlob, 'hello.txt')

// 3. Открытие PDF в новой вкладке
async function openPdfInNewTab(pdfBlob) {
  const url = URL.createObjectURL(pdfBlob)
  const newWindow = window.open(url, '_blank')

  // Освобождаем после закрытия окна
  if (newWindow) {
    newWindow.addEventListener('unload', () => {
      URL.revokeObjectURL(url)
    })
  }
}

// 4. Видео плеер с Blob URL
function playVideoFromBlob(videoBlob) {
  const url = URL.createObjectURL(videoBlob)

  const video = document.createElement('video')
  video.src = url
  video.controls = true
  video.onended = () => {
    URL.revokeObjectURL(url)
  }

  document.body.appendChild(video)
  video.play()
}

// 5. ⚠️ Важно: управление памятью
const urls = []

// Создаем много URL
for (let i = 0; i < 1000; i++) {
  const blob = new Blob([i.toString()])
  urls.push(URL.createObjectURL(blob))
}

// Память занята! Нужно освободить
urls.forEach(url => URL.revokeObjectURL(url))
`

const practicalExamplesSnippet = `
// =====================================
// ПРАКТИЧЕСКИЕ ПРИМЕРЫ
// =====================================

// 1. Загрузка файла на сервер с прогрессом
async function uploadFileWithProgress(file, url) {
  const formData = new FormData()
  formData.append('file', file)

  const xhr = new XMLHttpRequest()

  return new Promise((resolve, reject) => {
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        console.log(\`Загружено: \${percentComplete.toFixed(2)}%\`)
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(\`Upload failed: \${xhr.status}\`))
      }
    }

    xhr.onerror = () => reject(new Error('Network error'))

    xhr.open('POST', url)
    xhr.send(formData)
  })
}

// 2. Сжатие изображения перед загрузкой
async function compressImage(file, maxWidth = 800, quality = 0.8) {
  const bitmap = await createImageBitmap(file)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Вычисляем пропорциональные размеры
  const scale = maxWidth / bitmap.width
  canvas.width = maxWidth
  canvas.height = bitmap.height * scale

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality)
  })
}

// Использование
const imageFile = document.querySelector('#fileInput').files[0]
const compressedBlob = await compressImage(imageFile)
console.log('Оригинал:', imageFile.size, 'байт')
console.log('Сжатый:', compressedBlob.size, 'байт')

// 3. Чтение Excel файла (XLSX)
async function readExcelFile(file) {
  const arrayBuffer = await file.arrayBuffer()

  // Используем библиотеку xlsx
  const workbook = XLSX.read(arrayBuffer, { type: 'array' })
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
  const data = XLSX.utils.sheet_to_json(firstSheet)

  return data
}

// 4. Создание ZIP архива из файлов
async function createZipArchive(files) {
  const zip = new JSZip()

  for (const file of files) {
    zip.file(file.name, file)
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(zipBlob, 'archive.zip')
}

// 5. Конвертация изображения в разные форматы
async function convertImageFormat(file, targetFormat = 'image/webp') {
  const bitmap = await createImageBitmap(file)

  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0)

  return new Promise((resolve) => {
    canvas.toBlob(resolve, targetFormat)
  })
}

// 6. Chunked upload - загрузка большого файла частями
async function uploadLargeFile(file, url, chunkSize = 1024 * 1024) {
  const totalChunks = Math.ceil(file.size / chunkSize)

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    const formData = new FormData()
    formData.append('chunk', chunk)
    formData.append('chunkIndex', i.toString())
    formData.append('totalChunks', totalChunks.toString())
    formData.append('filename', file.name)

    await fetch(url, {
      method: 'POST',
      body: formData
    })

    console.log(\`Chunk \${i + 1}/\${totalChunks} uploaded\`)
  }
}

// 7. Извлечение метаданных из изображения (EXIF)
async function extractImageMetadata(file) {
  const arrayBuffer = await file.arrayBuffer()

  // Используем библиотеку exif-js
  const dataView = new DataView(arrayBuffer)
  // Здесь идет парсинг EXIF данных

  return {
    width: 1920,
    height: 1080,
    camera: 'Canon EOS 5D',
    takenAt: new Date('2024-01-01'),
    gps: { lat: 55.7558, lon: 37.6173 }
  }
}

// 8. Создание thumbnail для видео
async function createVideoThumbnail(videoFile) {
  const url = URL.createObjectURL(videoFile)

  const video = document.createElement('video')
  video.src = url

  return new Promise((resolve) => {
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(5, video.duration / 2)
    })

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        resolve(blob)
      }, 'image/jpeg', 0.8)
    })
  })
}
`

const advancedExamplesSnippet = `
// =====================================
// ПРОДВИНУТЫЕ ПРИМЕРЫ
// =====================================

// 1. Drag & Drop загрузка файлов
const dropZone = document.getElementById('dropZone')

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  dropZone.classList.add('drag-over')
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over')
})

dropZone.addEventListener('drop', async (e) => {
  e.preventDefault()
  dropZone.classList.remove('drag-over')

  const files = Array.from(e.dataTransfer.files)

  for (const file of files) {
    console.log('Dropped:', file.name)
    await processFile(file)
  }
})

// 2. Clipboard API - вставка из буфера обмена
document.addEventListener('paste', async (e) => {
  const items = e.clipboardData.items

  for (const item of items) {
    if (item.kind === 'file') {
      const file = item.getAsFile()
      console.log('Pasted file:', file.name)

      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        // Отображаем изображение
      }
    }
  }
})

// 3. Streaming большого файла
async function streamLargeFile(file) {
  const stream = file.stream()
  const reader = stream.getReader()

  let bytesRead = 0

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    bytesRead += value.length
    console.log(\`Read \${bytesRead} of \${file.size} bytes\`)

    // Обработка чанка данных
    await processChunk(value)
  }
}

// 4. Web Workers для обработки файлов
// main.js
const worker = new Worker('file-processor.worker.js')

worker.postMessage({ file: file })

worker.onmessage = (e) => {
  console.log('Processed data:', e.data)
}

// file-processor.worker.js
self.onmessage = async (e) => {
  const file = e.data.file
  const buffer = await file.arrayBuffer()

  // Тяжелая обработка данных
  const result = heavyProcessing(buffer)

  self.postMessage(result)
}

// 5. IndexedDB для хранения файлов
async function saveFileToIndexedDB(file) {
  const db = await openDatabase()
  const transaction = db.transaction(['files'], 'readwrite')
  const store = transaction.objectStore('files')

  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
    data: await file.arrayBuffer(),
    savedAt: Date.now()
  }

  await store.add(fileData)
}

async function loadFileFromIndexedDB(filename) {
  const db = await openDatabase()
  const transaction = db.transaction(['files'], 'readonly')
  const store = transaction.objectStore('files')

  const fileData = await store.get(filename)

  return new File([fileData.data], fileData.name, {
    type: fileData.type
  })
}

// 6. Service Worker для кэширования файлов
// service-worker.js
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/uploads/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }

        return fetch(event.request).then((response) => {
          const clonedResponse = response.clone()

          caches.open('file-cache').then((cache) => {
            cache.put(event.request, clonedResponse)
          })

          return response
        })
      })
    )
  }
})

// 7. Media Source Extensions для видео
async function playVideoChunks(videoChunks) {
  const mediaSource = new MediaSource()
  const video = document.querySelector('video')

  video.src = URL.createObjectURL(mediaSource)

  mediaSource.addEventListener('sourceopen', async () => {
    const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"')

    for (const chunk of videoChunks) {
      const arrayBuffer = await chunk.arrayBuffer()

      await new Promise((resolve) => {
        sourceBuffer.addEventListener('updateend', resolve, { once: true })
        sourceBuffer.appendBuffer(arrayBuffer)
      })
    }

    mediaSource.endOfStream()
  })
}

// 8. File System Access API (современные браузеры)
async function saveFileWithSystemDialog() {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt']
        }
      }
    ]
  }

  const handle = await window.showSaveFilePicker(options)
  const writable = await handle.createWritable()

  await writable.write('File content')
  await writable.close()
}

async function openFileWithSystemDialog() {
  const [fileHandle] = await window.showOpenFilePicker()
  const file = await fileHandle.getFile()

  return file
}
`

const highlightedBlobBasics = ref('')
const highlightedBlobMethods = ref('')
const highlightedFileBasics = ref('')
const highlightedFileInput = ref('')
const highlightedFileReader = ref('')
const highlightedBlobUrl = ref('')
const highlightedPracticalExamples = ref('')
const highlightedAdvancedExamples = ref('')

onMounted(() => {
  highlightedBlobBasics.value = Prism.highlight(blobBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedBlobMethods.value = Prism.highlight(blobMethodsSnippet, Prism.languages.javascript, 'javascript')
  highlightedFileBasics.value = Prism.highlight(fileBasicsSnippet, Prism.languages.javascript, 'javascript')
  highlightedFileInput.value = Prism.highlight(fileInputSnippet, Prism.languages.javascript, 'javascript')
  highlightedFileReader.value = Prism.highlight(fileReaderSnippet, Prism.languages.javascript, 'javascript')
  highlightedBlobUrl.value = Prism.highlight(blobUrlSnippet, Prism.languages.javascript, 'javascript')
  highlightedPracticalExamples.value = Prism.highlight(practicalExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedAdvancedExamples.value = Prism.highlight(advancedExamplesSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Blob и File API в JavaScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Blob</b> (Binary Large Object) — объект для работы с бинарными данными.
              <b>File</b> — расширение Blob для работы с файлами, добавляет метаданные (имя, дата изменения).
              Эти API позволяют читать, создавать, изменять и загружать файлы в браузере.
            </p>

            <!-- Сравнение Blob и File -->
            <h2 class="text-h5 font-weight-bold mb-3">Blob vs File: ключевые различия</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Blob</th>
                <th class="text-left font-weight-bold">File</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>Наследование</strong></td>
                <td>Базовый класс</td>
                <td>Наследуется от Blob</td>
              </tr>
              <tr>
                <td><strong>Создание</strong></td>
                <td><code>new Blob([data], options)</code></td>
                <td><code>new File([data], name, options)</code></td>
              </tr>
              <tr>
                <td><strong>Метаданные</strong></td>
                <td>Только size и type</td>
                <td>+ name, lastModified</td>
              </tr>
              <tr>
                <td><strong>Использование</strong></td>
                <td>Общие бинарные данные</td>
                <td>Файлы с файловой системы</td>
              </tr>
              <tr>
                <td><strong>Источник</strong></td>
                <td>Создается программно</td>
                <td>Обычно из <code>&lt;input type="file"&gt;</code></td>
              </tr>
              </tbody>
            </v-table>

            <!-- Blob основы -->
            <h2 class="text-h5 font-weight-bold mb-3">Blob - основы работы</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Blob</strong> — неизменяемый объект. Для модификации нужно создавать новый Blob.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBlobBasics"></code></pre>

            <!-- Методы Blob -->
            <h2 class="text-h5 font-weight-bold mb-3">Методы Blob</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Синхронные</h3>
                  <ul class="pl-4">
                    <li><code>slice(start, end, type)</code> — часть Blob</li>
                    <li><code>stream()</code> — ReadableStream</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Асинхронные (Promise)</h3>
                  <ul class="pl-4">
                    <li><code>text()</code> — текст</li>
                    <li><code>arrayBuffer()</code> — бинарные данные</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBlobMethods"></code></pre>

            <!-- File основы -->
            <h2 class="text-h5 font-weight-bold mb-3">File - расширение Blob</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFileBasics"></code></pre>

            <!-- Input file -->
            <h2 class="text-h5 font-weight-bold mb-3">Работа с &lt;input type="file"&gt;</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-file-upload</v-icon>
              <strong>FileList</strong> — псевдомассив объектов File. Итерируемый, но не имеет методов массива.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFileInput"></code></pre>

            <!-- FileReader -->
            <h2 class="text-h5 font-weight-bold mb-3">FileReader - классический API</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Методы чтения</h3>
                  <ul class="pl-4">
                    <li><code>readAsText()</code> — текст</li>
                    <li><code>readAsDataURL()</code> — base64</li>
                    <li><code>readAsArrayBuffer()</code> — бинарные данные</li>
                    <li><code>readAsBinaryString()</code> — устарел</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">События</h3>
                  <ul class="pl-4">
                    <li><code>onload</code> — успешное чтение</li>
                    <li><code>onerror</code> — ошибка</li>
                    <li><code>onprogress</code> — прогресс</li>
                    <li><code>onabort</code> — прерывание</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFileReader"></code></pre>

            <!-- Blob URL -->
            <h2 class="text-h5 font-weight-bold mb-3">Blob URL - временные ссылки</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Важно:</strong> Blob URL занимают память! Всегда освобождайте их через <code>URL.revokeObjectURL()</code>
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBlobUrl"></code></pre>

            <!-- Практические примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры использования</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPracticalExamples"></code></pre>

            <!-- Продвинутые примеры -->
            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedExamples"></code></pre>

            <!-- MIME типы -->
            <h2 class="text-h5 font-weight-bold mb-3">Популярные MIME типы</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Текстовые</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>text/plain</code> — обычный текст</li>
                    <li><code>text/html</code> — HTML документ</li>
                    <li><code>text/css</code> — CSS стили</li>
                    <li><code>application/json</code> — JSON данные</li>
                    <li><code>application/xml</code> — XML документ</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Бинарные</h3>
                  <ul class="pl-4 text-body-2">
                    <li><code>image/jpeg</code>, <code>image/png</code>, <code>image/webp</code></li>
                    <li><code>video/mp4</code>, <code>video/webm</code></li>
                    <li><code>audio/mpeg</code>, <code>audio/ogg</code></li>
                    <li><code>application/pdf</code> — PDF документ</li>
                    <li><code>application/octet-stream</code> — произвольные данные</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы на собеседовании -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Blob и File?</p>
                <p class="font-weight-regular ma-0">
                  File наследуется от Blob и добавляет метаданные: <code>name</code> (имя файла) и
                  <code>lastModified</code> (timestamp). Blob — общий объект для бинарных данных,
                  File — специально для файлов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как загрузить файл на сервер?</p>
                <p class="font-weight-regular ma-0">
                  Через <code>FormData</code>: создать FormData, добавить файл методом <code>append()</code>,
                  отправить через <code>fetch()</code> или <code>XMLHttpRequest</code>.
                  FormData автоматически устанавливает правильный Content-Type.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между FileReader и blob.text()?</p>
                <p class="font-weight-regular ma-0">
                  FileReader — старый callback-based API с событиями и поддержкой прогресса.
                  <code>blob.text()</code> — современный Promise-based API, проще в использовании,
                  но без прогресса. Для новых проектов предпочтительны методы Blob.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Blob URL и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  Blob URL (blob://...) — временная ссылка на Blob в памяти. Используется для отображения
                  изображений, видео, скачивания файлов. Важно освобождать через <code>URL.revokeObjectURL()</code>
                  для предотвращения утечек памяти.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обработать большой файл без зависания?</p>
                <p class="font-weight-regular ma-0">
                  Использовать chunked processing: <code>file.slice()</code> для разбиения на части,
                  <code>file.stream()</code> для потоковой обработки, или Web Workers для тяжелых вычислений.
                  Также можно использовать <code>requestIdleCallback()</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как создать и скачать файл на клиенте?</p>
                <p class="font-weight-regular ma-0">
                  Создать Blob с данными, создать Blob URL через <code>URL.createObjectURL()</code>,
                  создать элемент <code>&lt;a&gt;</code> с атрибутами <code>href</code> (Blob URL) и
                  <code>download</code> (имя файла), программно кликнуть, освободить URL.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое FileList и как с ним работать?</p>
                <p class="font-weight-regular ma-0">
                  FileList — псевдомассив File объектов из <code>&lt;input type="file"&gt;</code>.
                  Итерируемый (for...of), но не имеет методов массива. Преобразуется в массив через
                  <code>Array.from()</code> или spread оператор.
                </p>
              </li>
            </ol>

            <!-- Лучшие практики -->
            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Освобождать Blob URL</li>
                    <li>Валидировать тип и размер файла</li>
                    <li>Использовать Web Workers для обработки</li>
                    <li>Показывать прогресс загрузки</li>
                    <li>Обрабатывать ошибки</li>
                    <li>Использовать современные методы (text, arrayBuffer)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Загрузки больших файлов без chunking</li>
                    <li>Утечек памяти через Blob URL</li>
                    <li>Блокировки UI при обработке</li>
                    <li>Доверия к MIME типам от клиента</li>
                    <li>Синхронных операций</li>
                    <li>FileReader без необходимости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-alert-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">⚠️ Внимание</h3>
                  <ul class="text-left pl-4">
                    <li>Ограничения размера файла</li>
                    <li>Кросс-браузерная совместимость</li>
                    <li>Безопасность (XSS через файлы)</li>
                    <li>Производительность обработки</li>
                    <li>Мобильные ограничения</li>
                    <li>CORS при загрузке</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Use cases -->
            <h2 class="text-h5 font-weight-bold mb-3">Типичные сценарии использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Загрузка файлов</h3>
                  <ul class="pl-4">
                    <li>Загрузка изображений на сервер</li>
                    <li>Drag & Drop файлов</li>
                    <li>Chunked upload больших файлов</li>
                    <li>Предпросмотр перед загрузкой</li>
                    <li>Множественная загрузка</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Обработка файлов</h3>
                  <ul class="pl-4">
                    <li>Сжатие изображений</li>
                    <li>Конвертация форматов</li>
                    <li>Создание thumbnails</li>
                    <li>Извлечение метаданных</li>
                    <li>Чтение Excel/CSV файлов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Создание файлов</h3>
                  <ul class="pl-4">
                    <li>Генерация отчетов (PDF, Excel)</li>
                    <li>Экспорт данных (JSON, CSV)</li>
                    <li>Создание ZIP архивов</li>
                    <li>Скриншоты canvas</li>
                    <li>Запись аудио/видео</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Работа с медиа</h3>
                  <ul class="pl-4">
                    <li>Аватары пользователей</li>
                    <li>Галереи изображений</li>
                    <li>Видео/аудио плееры</li>
                    <li>WebRTC запись</li>
                    <li>Media Source Extensions</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Итог -->
            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Blob</b> и <b>File</b> API предоставляют мощные инструменты для работы с файлами в браузере:
              чтение, создание, модификация и загрузка. Blob — базовый класс для бинарных данных,
              File — расширение для файлов с метаданными. Современные методы (<code>text()</code>,
              <code>arrayBuffer()</code>) предпочтительнее устаревшего FileReader. Важно помнить об
              управлении памятью (Blob URL), валидации данных и производительности при работе с большими файлами.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Blob"
                target="_blank"
                class="mr-2">
                MDN Blob
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/File"
                target="_blank"
                class="mr-2">
                MDN File
              </v-btn>
              <v-btn
                color="accent"
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader"
                target="_blank">
                MDN FileReader
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
