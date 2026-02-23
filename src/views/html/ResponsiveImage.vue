<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
<!-- Простая адаптивность через CSS -->
<img src="photo.jpg" alt="Фотография" class="responsive-img">

<style>
.responsive-img {
  max-width: 100%;
  height: auto;
}
</style>
`

const snippet2 = `
<!-- Разные изображения для разных размеров экрана -->
<picture>
  <source media="(min-width: 768px)" srcset="photo-desktop.jpg">
  <source media="(min-width: 480px)" srcset="photo-tablet.jpg">
  <img src="photo-mobile.jpg" alt="Фотография">
</picture>
`

const snippet3 = `
<!-- Поддержка Retina: дескриптор плотности (x) -->
<img src="photo-1x.jpg"
     srcset="photo-1x.jpg 1x, photo-2x.jpg 2x, photo-3x.jpg 3x"
     alt="Фотография">

<!-- Адаптивные размеры: дескриптор ширины (w) + sizes -->
<img src="photo-400.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
     alt="Фотография">
`

const snippet4 = `
<!-- Современные форматы с fallback -->
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Фотография">
</picture>

<!-- Art Direction: разные кадрировки для разных экранов -->
<picture>
  <source media="(min-width: 768px)" srcset="landscape-wide.jpg">
  <source media="(min-width: 480px)" srcset="landscape-medium.jpg">
  <img src="portrait-mobile.jpg" alt="Пейзаж">
</picture>
`

const snippet5 = `
<!-- Комплексный пример -->
<picture>
  <!-- Десктоп: WebP с разными плотностями -->
  <source media="(min-width: 1024px)"
          srcset="hero-desktop.webp 1x, hero-desktop-2x.webp 2x"
          type="image/webp">
  <source media="(min-width: 1024px)"
          srcset="hero-desktop.jpg 1x, hero-desktop-2x.jpg 2x">

  <!-- Планшет: адаптивные размеры -->
  <source media="(min-width: 768px)"
          srcset="hero-tablet-400.webp 400w, hero-tablet-800.webp 800w"
          sizes="(max-width: 900px) 100vw, 800px"
          type="image/webp">
  <source media="(min-width: 768px)"
          srcset="hero-tablet-400.jpg 400w, hero-tablet-800.jpg 800w"
          sizes="(max-width: 900px) 100vw, 800px">

  <!-- Мобильные устройства -->
  <img src="hero-mobile.jpg"
       srcset="hero-mobile.webp 1x, hero-mobile-2x.webp 2x"
       alt="Главное изображение"
       loading="lazy"
       decoding="async">
</picture>
`

const snippet6 = `
<!-- ПРАВИЛЬНО: медиа-запросы в sizes, файлы в srcset -->
<img
  src="photo-800.jpg"
  srcset="
    photo-400.jpg 400w,
    photo-800.jpg 800w,
    photo-1200.jpg 1200w
  "
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw
  "
  alt="Фотография"
/>

<!-- НЕПРАВИЛЬНО: медиа-запросы нельзя писать в srcset -->
<!-- srcset="(max-width: 768px) photo-400.jpg" — это невалидно! -->

<!-- НЕПРАВИЛЬНО: px нельзя писать в srcset -->
<!-- srcset="photo-400.jpg 400px" — невалидно, нужно 400w -->

<!-- НЕПРАВИЛЬНО: нельзя миксовать w и x -->
<!-- srcset="photo-400.jpg 400w, photo@2x.jpg 2x" — невалидно! -->
`

const snippet7 = `
<!-- Пример: viewport 1000px, DPR = 2, sizes="50vw" -->
<!--
  Шаг 1: браузер вычисляет из sizes
    max-width: 768px не срабатывает → берётся 50vw
    50vw от 1000px = 500 CSS px

  Шаг 2: учитывается DPR
    500 × 2 = 1000 физических пикселей нужно

  Шаг 3: выбор из srcset
    Доступны: 400w, 800w, 1200w
    Нужно ~1000px → выбирается photo-1200.jpg (ближайшее большее)
-->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Фотография"
/>
`

const snippet8 = `
<!-- sizes НЕ задаёт размер в layout! -->
<!-- Это НЕПРАВИЛЬНОЕ понимание: -->
<!-- sizes="50vw" не сделает картинку 50vw на странице -->

<!-- Правильно: CSS задаёт реальный размер, sizes сообщает это браузеру -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  style="width: 50vw;"
  alt="Фотография"
/>
<!-- CSS → реально делает 50vw -->
<!-- sizes → подсказывает браузеру для выбора файла из srcset -->
`

const snippet9 = `
<!-- В sizes допустимы: px, vw, calc() -->
sizes="600px"                       <!-- фиксированная ширина контейнера -->
sizes="50vw"                        <!-- половина viewport -->
sizes="calc(100vw - 32px)"          <!-- с учётом паддингов -->
sizes="(max-width: 768px) 100vw,
       (max-width: 1200px) 50vw,
       33vw"                        <!-- каскад условий, fallback в конце -->

<!-- В sizes НЕ допустимы: %, em, rem, vh, auto -->
<!-- Причина: браузер вычисляет sizes ДО layout,
     поэтому нужны значения, зависящие только от viewport -->
`

const snippet10 = `
<!-- Next.js: <Image> генерирует srcset автоматически -->
import Image from "next/image";

<Image
  src="/photo.jpg"
  width={800}
  height={600}
  quality={75}
  alt="Пример"
/>
<!-- Next.js создаёт URL: /_next/image?url=/photo.jpg&w=800&q=75 -->
<!-- Браузер отправляет: Accept: image/webp -->
<!-- Next.js проверяет заголовок и отдаёт WebP если поддерживается -->

<!-- При fill: sizes обязателен -->
<Image
  src="/photo.jpg"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Пример"
/>
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')
const highlightedSnippet8 = ref('')
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.markup, 'markup')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.markup, 'markup')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.markup, 'markup')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.markup, 'markup')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.markup, 'markup')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.markup, 'markup')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.markup, 'markup')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.markup, 'markup')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.markup, 'markup')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.markup, 'markup')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              4. Как эффективно сделать адаптивное изображение в HTML?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Адаптивные изображения</b> — это техника, которая позволяет загружать и отображать изображения,
              оптимизированные для конкретного устройства пользователя: размера экрана, плотности пикселей,
              пропускной способности сети и формата поддержки браузера.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные задачи адаптивных изображений</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Задача</th>
                <th class="text-left font-weight-bold">Решение</th>
                <th class="text-left font-weight-bold">Результат</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Масштабирование</b></td>
                <td class="pt-2 pb-2">CSS: max-width: 100%, height: auto</td>
                <td class="pt-2 pb-2">Изображение не выходит за границы контейнера</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Разные размеры экрана</b></td>
                <td class="pt-2 pb-2">srcset + sizes или &lt;picture&gt;</td>
                <td class="pt-2 pb-2">Подходящий размер для каждого устройства</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Retina-дисплеи</b></td>
                <td class="pt-2 pb-2">srcset с дескрипторами плотности (1x, 2x)</td>
                <td class="pt-2 pb-2">Чёткость на экранах высокой плотности</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Современные форматы</b></td>
                <td class="pt-2 pb-2">&lt;picture&gt; с &lt;source type="image/webp"&gt;</td>
                <td class="pt-2 pb-2">Меньший размер файлов при поддержке</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Art Direction</b></td>
                <td class="pt-2 pb-2">&lt;picture&gt; с media queries</td>
                <td class="pt-2 pb-2">Разные кадрировки для разных экранов</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Базовая адаптивность через CSS</h2>
            <p class="font-weight-regular mb-4">
              Самый простой способ — сделать изображение масштабируемым через CSS. Размер изображения
              в layout всегда определяется CSS, а не атрибутами <code>sizes</code> или <code>srcset</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Элемент &lt;picture&gt; для разных экранов</h2>
            <p class="font-weight-regular mb-4">
              Для подачи разных изображений на разных устройствах. Медиа-запросы в <code>&lt;picture&gt;</code>
              пишутся в атрибуте <code>media</code> тега <code>&lt;source&gt;</code> — это механизм <b>art direction</b>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Атрибут srcset: дескрипторы w и x</h2>
            <p class="font-weight-regular mb-4">
              В <code>srcset</code> пишутся только файлы с дескрипторами. Медиа-запросы сюда <b>не пишутся</b> — только
              <code>w</code> (ширина ресурса) или <code>x</code> (плотность пикселей). Нельзя использовать <code>px</code>
              и нельзя миксовать <code>w</code> и <code>x</code> в одном атрибуте.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Сценарий</th>
                <th class="text-left font-weight-bold">Дескриптор</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Адаптив + разные ширины</td>
                <td class="pt-2 pb-2"><code>w</code> + <code>sizes</code></td>
                <td class="pt-2 pb-2"><code>photo-400.jpg 400w</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Фиксированный размер, только Retina</td>
                <td class="pt-2 pb-2"><code>x</code></td>
                <td class="pt-2 pb-2"><code>photo@2x.jpg 2x</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">4. Синтаксис srcset и sizes: что куда писать</h2>
            <p class="font-weight-regular mb-4">
              Разделение ответственности: <code>srcset</code> — список файлов, <code>sizes</code> — медиа-условия
              и размер места под картинку. Браузер знает только то, что вы описали в <code>sizes</code>, и выбирает
              файл из <code>srcset</code> на основе этого.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Как браузер выбирает файл из srcset</h2>
            <p class="font-weight-regular mb-4">
              Алгоритм выбора происходит в три шага ещё <b>до</b> загрузки CSS и применения стилей:
            </p>

            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Шаг</th>
                <th class="text-left font-weight-bold">Что происходит</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">1. Вычисление из sizes</td>
                <td class="pt-2 pb-2">Браузер применяет медиа-условия и берёт подходящее значение</td>
                <td class="pt-2 pb-2">viewport 1000px → <code>50vw</code> → 500 CSS px</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">2. Учёт DPR</td>
                <td class="pt-2 pb-2">CSS px умножается на Device Pixel Ratio</td>
                <td class="pt-2 pb-2">500 × 2 (Retina) = 1000 физических px</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">3. Выбор из srcset</td>
                <td class="pt-2 pb-2">Браузер выбирает ближайший подходящий файл</td>
                <td class="pt-2 pb-2">Нужно ~1000px → выбирается <code>1200w</code></td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <v-alert type="warning" variant="tonal" class="mb-8">
              Если <code>sizes</code> не указан, браузер предполагает <code>100vw</code> и может загрузить
              слишком большое изображение.
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">6. sizes не задаёт размер в layout</h2>
            <p class="font-weight-regular mb-4">
              Распространённое заблуждение: если написать <code>sizes="50vw"</code>, картинка станет 50vw на странице.
              Это неверно. <code>sizes</code> — это только подсказка браузеру для выбора файла.
              Реальный размер всегда определяется <b>CSS</b>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Что можно и нельзя писать в sizes</h2>
            <p class="font-weight-regular mb-4">
              Браузер вычисляет <code>sizes</code> до layout, поэтому допустимы только значения,
              зависящие от viewport. Относительные единицы вроде <code>%</code>, <code>em</code>, <code>rem</code>
              запрещены — браузер не знает размер родителя в этот момент.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Атрибут</th>
                <th class="text-left font-weight-bold">Допустимо</th>
                <th class="text-left font-weight-bold">Недопустимо</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>srcset</code></td>
                <td class="pt-2 pb-2"><code>400w</code>, <code>2x</code></td>
                <td class="pt-2 pb-2"><code>400px</code>, медиа-запросы, <code>w</code> и <code>x</code> вместе</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>sizes</code></td>
                <td class="pt-2 pb-2"><code>px</code>, <code>vw</code>, <code>calc()</code>, медиа-условия</td>
                <td class="pt-2 pb-2"><code>%</code>, <code>em</code>, <code>rem</code>, <code>vh</code>, <code>auto</code></td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">8. Современные форматы и Art Direction</h2>
            <p class="font-weight-regular mb-4">
              <code>&lt;picture&gt;</code> позволяет два разных сценария: поддержку современных форматов
              (WebP, AVIF) через <code>type</code> и art direction через <code>media</code>.
              Это нельзя сделать одним <code>srcset</code> на <code>&lt;img&gt;</code>.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Комплексный пример</h2>
            <p class="font-weight-regular mb-4">
              Реальный пример с учётом всех техник:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Next.js Image: WebP и content negotiation</h2>
            <p class="font-weight-regular mb-4">
              Next.js конвертирует изображения в WebP <b>не на диске</b>, а динамически при запросе.
              Оригинальный файл остаётся неизменным. Процесс: браузер отправляет заголовок
              <code>Accept: image/webp</code>, Next.js проверяет его и через библиотеку <b>sharp</b>
              конвертирует изображение на лету, кэшируя результат.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Браузер поддерживает WebP</th>
                <th class="text-left font-weight-bold">Next.js отдаёт</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Да (Chrome, Edge, Firefox, Safari 14+)</td>
                <td class="pt-2 pb-2">WebP, оптимизированный через sharp</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Нет (старые Safari)</td>
                <td class="pt-2 pb-2">Исходный формат (JPEG/PNG)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые атрибуты и их значения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">srcset</h3>
                  <p class="mb-2">Список изображений с дескрипторами:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>1x, 2x</code> — плотность пикселей (нельзя с w)</li>
                    <li><code>400w, 800w</code> — реальная ширина файла (нельзя px)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">sizes</h3>
                  <p class="mb-2">Подсказка браузеру о размере картинки:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>100vw</code> — на всю ширину viewport</li>
                    <li><code>50vw</code> — половина viewport</li>
                    <li><code>calc(100vw - 32px)</code> — с учётом паддингов</li>
                    <li><code>320px</code> — фиксированный размер</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">loading</h3>
                  <p class="mb-2">Стратегия загрузки:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>lazy</code> — при приближении к viewport</li>
                    <li><code>eager</code> — немедленно (по умолчанию)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">decoding</h3>
                  <p class="mb-2">Приоритет декодирования:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>async</code> — асинхронно</li>
                    <li><code>sync</code> — синхронно</li>
                    <li><code>auto</code> — браузер решает</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между srcset и &lt;picture&gt;?</p>
                <p class="font-weight-regular ma-0">
                  <code>srcset</code> — для разных размеров одного изображения, браузер сам выбирает.
                  <code>&lt;picture&gt;</code> — для art direction (разные кадрировки) и поддержки форматов.
                  В <code>&lt;source&gt;</code> можно писать медиа-запросы, в <code>srcset</code> — нельзя.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает алгоритм выбора файла из srcset?</p>
                <p class="font-weight-regular ma-0">
                  Браузер вычисляет размер из <code>sizes</code> (в CSS px), умножает на DPR устройства
                  и выбирает ближайший подходящий файл из <code>srcset</code>. Этот расчёт происходит
                  до загрузки CSS — поэтому в <code>sizes</code> нельзя использовать <code>em</code> или <code>%</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Задаёт ли sizes размер изображения в layout?</p>
                <p class="font-weight-regular ma-0">
                  Нет. <code>sizes</code> — только подсказка браузеру для выбора файла. Реальный размер
                  определяется исключительно CSS. Если не задать CSS, картинка отобразится в своём
                  intrinsic size (реальный размер файла).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли писать px в srcset?</p>
                <p class="font-weight-regular ma-0">
                  Нет. В <code>srcset</code> допустимы только <code>w</code> (ширина файла) и <code>x</code>
                  (плотность пикселей). <code>400px</code> — невалидный синтаксис, браузер проигнорирует.
                  Нельзя также миксовать <code>w</code> и <code>x</code> в одном <code>srcset</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать loading="lazy"?</p>
                <p class="font-weight-regular ma-0">
                  Для изображений ниже первого экрана. Не используйте для LCP-изображений (largest contentful paint) —
                  это замедлит загрузку критического контента.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как Next.js конвертирует изображения в WebP?</p>
                <p class="font-weight-regular ma-0">
                  Через Image Optimization API (<code>/_next/image?url=…&w=800&q=75</code>). Браузер отправляет
                  заголовок <code>Accept: image/webp</code>. Next.js через библиотеку sharp конвертирует
                  файл в память и отдаёт результат — оригинал на диске не меняется. Результат кэшируется
                  для повторных запросов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие форматы изображений поддерживать?</p>
                <p class="font-weight-regular ma-0">
                  Современные: AVIF (лучшее сжатие), WebP (широкая поддержка). Fallback: JPEG/PNG.
                  В <code>&lt;picture&gt;</code> всегда начинайте с самого современного формата — браузер
                  возьмёт первый поддерживаемый.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты и сервисы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Оптимизация на стороне сервера</h3>
                  <ul class="pl-4">
                    <li>Next.js Image (sharp под капотом)</li>
                    <li>Gatsby Image</li>
                    <li>Webpack loaders</li>
                    <li>Vite plugins</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">CDN сервисы</h3>
                  <ul class="pl-4">
                    <li>Cloudflare Images</li>
                    <li>AWS CloudFront</li>
                    <li>ImageKit</li>
                    <li>Fastly</li>
                    <li>Cloudinary</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Инструменты анализа</h3>
                  <ul class="pl-4">
                    <li>Chrome DevTools → Network → Img</li>
                    <li>Lighthouse (Core Web Vitals)</li>
                    <li>Squoosh (сравнение форматов)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Эффективные адаптивные изображения строятся на чётком разделении ответственности:
              <code>srcset</code> описывает доступные файлы (<code>w</code> или <code>x</code>),
              <code>sizes</code> сообщает браузеру о месте под картинку (только <code>px</code>, <code>vw</code>,
              <code>calc()</code>), а <b>CSS</b> реально управляет размером в layout. Браузер применяет
              трёхшаговый алгоритм (sizes → × DPR → выбор из srcset) до загрузки CSS.
              <code>&lt;picture&gt;</code> используется для art direction и поддержки форматов.
              В Next.js оптимизация происходит автоматически через content negotiation и sharp.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images"
                target="_blank">
                MDN: Responsive Images
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
