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
<!-- Поддержка Retina и разных плотностей -->
<img src="photo-1x.jpg"
     srcset="photo-1x.jpg 1x, photo-2x.jpg 2x, photo-3x.jpg 3x"
     alt="Фотография">

<!-- Или с размерами -->
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

<!-- Art Direction - разные кадрировки -->
<picture>
  <source media="(min-width: 768px)"
          srcset="landscape-wide.jpg">
  <source media="(min-width: 480px)"
          srcset="landscape-medium.jpg">
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

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.markup, 'markup')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.markup, 'markup')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.markup, 'markup')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.markup, 'markup')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.markup, 'markup')
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
                <td class="pt-2 pb-2">Четкость на экранах высокой плотности</td>
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
              Самый простой способ — сделать изображение масштабируемым:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Элемент &lt;picture&gt; для разных экранов</h2>
            <p class="font-weight-regular mb-4">
              Для подачи разных изображений на разных устройствах:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Атрибут srcset для разных плотностей</h2>
            <p class="font-weight-regular mb-4">
              Поддержка Retina-дисплеев и адаптивные размеры:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Современные форматы и Art Direction</h2>
            <p class="font-weight-regular mb-4">
              Комбинирование форматов и разных композиций:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Комплексный пример</h2>
            <p class="font-weight-regular mb-4">
              Реальный пример с учетом всех техник:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые атрибуты и их значения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">srcset</h3>
                  <p class="mb-2">Список изображений с дескрипторами:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>1x, 2x</code> — плотность пикселей</li>
                    <li><code>400w, 800w</code> — ширина в пикселях</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">sizes</h3>
                  <p class="mb-2">Как браузер выберет размер:</p>
                  <ul class="pl-4 mb-0">
                    <li><code>100vw</code> — на всю ширину</li>
                    <li><code>50vw</code> — половина экрана</li>
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
                <p class="font-weight-bold mb-1">В чем разница между srcset и &lt;picture&gt;?</p>
                <p class="font-weight-regular ma-0">
                  <code>srcset</code> — для разных размеров одного изображения. <code>&lt;picture&gt;</code> —
                  для разных изображений (форматы, art direction, медиа-запросы). Picture более мощный и гибкий.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает атрибут sizes?</p>
                <p class="font-weight-regular ma-0">
                  Браузер использует <code>sizes</code> для расчета нужного размера изображения до загрузки CSS.
                  Это медиа-запросы, которые говорят: "при такой ширине экрана изображение займет столько места".
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
                <p class="font-weight-bold mb-1">Как проверить работу адаптивных изображений?</p>
                <p class="font-weight-regular ma-0">
                  DevTools → Network → Img, изменяйте размер окна и плотность пикселей. Смотрите, какие файлы
                  загружаются. Также полезны инструменты типа Lighthouse для анализа производительности.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие форматы изображений поддерживать?</p>
                <p class="font-weight-regular ma-0">
                  Современные: AVIF (лучшее сжатие), WebP (широкая поддержка), JPEG XL (перспективный).
                  Fallback: JPEG/PNG. Всегда начинайте с самого современного формата в <code>&lt;picture&gt;</code>.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты и сервисы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Генерация изображений</h3>
                  <ul class="pl-4">
                    <li>ImageMagick</li>
                    <li>Sharp (Node.js)</li>
                    <li>Squoosh (веб)</li>
                    <li>Cloudinary</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Автоматизация</h3>
                  <ul class="pl-4">
                    <li>Next.js Image</li>
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
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Эффективные адаптивные изображения в HTML включают: базовое CSS-масштабирование,
              использование <code>srcset</code> для разных размеров и плотностей, элемент <code>&lt;picture&gt;</code>
              для art direction и поддержки форматов, а также атрибуты <code>loading</code> и <code>decoding</code>
              для оптимизации производительности. Правильная реализация улучшает UX и Core Web Vitals.
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
