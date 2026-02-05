<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
<!-- Базовый lazy loading для изображений -->
<img src="hero.jpg" alt="Герой" loading="eager">
<!-- ⬆️ Критическое изображение - загружаем сразу -->

<img src="gallery-1.jpg" alt="Галерея 1" loading="lazy">
<img src="gallery-2.jpg" alt="Галерея 2" loading="lazy">
<!-- ⬆️ Изображения ниже первого экрана - lazy -->

<!-- Для старых браузеров используем polyfill -->
<script src="https://cdn.jsdelivr.net/npm/loading-attribute-polyfill@latest/dist/loading-attribute-polyfill.min.js"><\/script>
`

const snippet2 = `
<!-- Lazy loading для iframe (YouTube, карты) -->

<!-- YouTube видео -->
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  loading="lazy"
  width="560"
  height="315"
  title="YouTube видео"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>

<!-- Google Maps -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  loading="lazy"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen
  title="Google карта">
</iframe>

<!-- Экономия: ~500KB на YouTube, ~1-2MB на Maps -->
`

const snippet3 = `
<!-- Продвинутая техника: native lazy + IntersectionObserver fallback -->
<img
  data-src="image.jpg"
  src="placeholder.jpg"
  alt="Изображение"
  class="lazy-image"
  loading="lazy">

<script>
// Для старых браузеров без поддержки loading="lazy"
if ('loading' in HTMLImageElement.prototype) {
  // Браузер поддерживает native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback: IntersectionObserver
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy-image');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll('.lazy-image');
  images.forEach(img => imageObserver.observe(img));
}
<\/script>
`

const snippet4 = `
<!-- Оптимизация с placeholder и fade-in эффектом -->
<style>
.image-wrapper {
  position: relative;
  background: #f0f0f0;
  overflow: hidden;
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

.lazy-image.loaded {
  opacity: 1;
}

/* Placeholder с blur эффектом */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  transform: scale(1.1);
}
</style>

<div class="image-wrapper">
  <!-- Tiny placeholder (1-2KB) -->
  <img
    src="image-tiny.jpg"
    class="image-placeholder"
    aria-hidden="true">

  <!-- Реальное изображение -->
  <img
    data-src="image-full.jpg"
    alt="Описание"
    class="lazy-image"
    loading="lazy"
    onload="this.classList.add('loaded')">
</div>
`

const snippet5 = `
<!-- React пример с библиотекой react-lazy-load-image-component -->
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Gallery() {
  return (
    <div>
      {/* Hero изображение - загружаем сразу */}
      <img
        src="hero.jpg"
        alt="Hero"
        loading="eager"
        fetchpriority="high"
      />

      {/* Галерея - lazy loading */}
      {images.map((image) => (
        <LazyLoadImage
          key={image.id}
          src={image.src}
          alt={image.alt}
          effect="blur"
          threshold={100}
          placeholderSrc={image.placeholder}
        />
      ))}
    </div>
  );
}
`

const snippet6 = `
<!-- Vue пример с v-lazy директивой -->
<template>
  <div>
    <!-- Hero - eager loading -->
    <img
      src="hero.jpg"
      alt="Hero"
      loading="eager">

    <!-- Галерея - lazy loading -->
    <img
      v-for="image in images"
      :key="image.id"
      v-lazy="image.src"
      :alt="image.alt"
      loading="lazy">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VueLazyload from 'vue-lazyload';

const images = ref([
  { id: 1, src: 'gallery-1.jpg', alt: 'Изображение 1' },
  { id: 2, src: 'gallery-2.jpg', alt: 'Изображение 2' },
  // ...
]);
<\/script>
`

const snippet7 = `
<!-- Lazy loading с современными форматами -->
<picture>
<!-- WebP для современных браузеров -->
<source
  type="image/webp"
  data-srcset="image.webp"
  srcset="placeholder.webp">

<!-- AVIF для самых новых -->
<source
  type="image/avif"
  data-srcset="image.avif"
  srcset="placeholder.avif">

<!-- Fallback JPEG -->
<img
  data-src="image.jpg"
  src="placeholder.jpg"
  alt="Изображение"
  loading="lazy"
  class="lazy-picture">
</picture>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const picture = entry.target;
      const sources = picture.querySelectorAll('source');
      const img = picture.querySelector('img');

      sources.forEach(source => {
        source.srcset = source.dataset.srcset;
      });

      img.src = img.dataset.src;
      observer.unobserve(picture);
    }
  });
});

document.querySelectorAll('.lazy-picture').forEach(img => {
  observer.observe(img.parentElement);
});
<\/script>
  `

const snippet8 = `
<!-- Техника Facade Pattern для тяжелых iframe -->
<style>
.video-facade {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  background: #000;
  cursor: pointer;
}

.video-facade::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68px;
  height: 48px;
  background: red;
  border-radius: 12px;
  z-index: 1;
}

.video-facade::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-35%, -50%);
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  z-index: 2;
}

.video-facade img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}
</style>

<!-- Легкий placeholder вместо тяжелого YouTube iframe -->
<div class="video-facade" data-video-id="dQw4w9WgXcQ">
<img
  src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
alt="YouTube видео"
loading="lazy">
  </div>

  <script>
  document.querySelectorAll('.video-facade').forEach(facade => {
    facade.addEventListener('click', function() {
      const videoId = this.dataset.videoId;
      const iframe = document.createElement('iframe');

      iframe.src = \`https://www.youtube.com/embed/\${videoId}?autoplay=1\`;
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';

    this.innerHTML = '';
    this.appendChild(iframe);
  });
});

// Экономия: ~500KB на каждое видео до клика!
<\/script>
`

      const snippet9 = `
<!-- Next.js встроенная оптимизация -->
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      {/* Hero - приоритет высокий */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={1200}
        height={600}
        priority
      />

      {/* Галерея - автоматический lazy loading */}
      <div className="gallery">
        {images.map((img) => (
          <Image
            key={img.id}
            src={img.src}
            alt={img.alt}
            width={400}
            height={300}
            placeholder="blur"
            blurDataURL={img.blurDataURL}
          />
        ))}
      </div>
    </div>
  );
}

// Next.js автоматически:
// - Добавляет loading="lazy"
// - Генерирует responsive srcset
// - Оптимизирует форматы (WebP/AVIF)
// - Добавляет blur placeholder
`

      const snippet10 = `
<!-- Измерение эффективности lazy loading -->
<script>
// Performance Observer для отслеживания загрузки
const imageObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Изображение загружено:', {
      name: entry.name,
      duration: entry.duration,
      transferSize: entry.transferSize,
      decodedBodySize: entry.decodedBodySize
    });
  });
});

imageObserver.observe({ entryTypes: ['resource'] });

// Отслеживание lazy-loaded изображений
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageLoadTimes = new Map();

lazyImages.forEach(img => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const startTime = performance.now();

        img.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          imageLoadTimes.set(img.src, loadTime);
          console.log(\`Lazy image loaded in \${loadTime}ms\`);
        });

        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
});

// Метрики экономии трафика
window.addEventListener('load', () => {
  const resources = performance.getEntriesByType('resource');
  const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

  console.log('Общий размер загруженных ресурсов:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
});
<\/script>
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
        highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
        highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.markup, 'markup')
        highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.markup, 'markup')
        highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.markup, 'markup')
        highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
        highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
      })

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Lazy Loading для изображений и iframe
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Lazy loading</b> — техника отложенной загрузки ресурсов (изображений, iframe), которая загружает
              контент только когда он действительно нужен пользователю. Это критическая оптимизация для улучшения
              начальной загрузки страницы и экономии трафика.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Зачем нужен lazy loading</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">Без lazy loading</th>
                <th class="text-left font-weight-bold">С lazy loading</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Трафик</b></td>
                <td class="pt-2 pb-2">5 MB загружается сразу</td>
                <td class="pt-2 pb-2">1.5 MB (только видимое)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Начальная загрузка</b></td>
                <td class="pt-2 pb-2">LCP: 4.5s ❌</td>
                <td class="pt-2 pb-2">LCP: 2.0s ✅</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>HTTP запросы</b></td>
                <td class="pt-2 pb-2">30-40 запросов</td>
                <td class="pt-2 pb-2">5-8 запросов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>YouTube iframe</b></td>
                <td class="pt-2 pb-2">~500KB × количество видео</td>
                <td class="pt-2 pb-2">Загружается при скролле</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Google Maps</b></td>
                <td class="pt-2 pb-2">~1-2 MB сразу</td>
                <td class="pt-2 pb-2">Загружается когда нужно</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Базовый lazy loading (Native API)</h2>
            <p class="font-weight-regular mb-4">
              Современные браузеры поддерживают атрибут <code>loading</code>:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Lazy loading для iframe</h2>
            <p class="font-weight-regular mb-4">
              Критически важно для YouTube, Google Maps и других встраиваемых сервисов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Продвинутая техника с IntersectionObserver</h2>
            <p class="font-weight-regular mb-4">
              Для старых браузеров и более тонкого контроля:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Placeholder с эффектом загрузки</h2>
            <p class="font-weight-regular mb-4">
              Улучшаем UX с помощью размытого placeholder:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. React реализация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Vue реализация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Lazy loading с современными форматами</h2>
            <p class="font-weight-regular mb-4">
              Комбинирование lazy loading и WebP/AVIF:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Facade Pattern для iframe</h2>
            <p class="font-weight-regular mb-4">
              Оптимальная техника для YouTube: показываем легкий placeholder вместо тяжелого iframe:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Next.js автоматическая оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Измерение эффективности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Стратегии применения</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">loading="eager"</h3>
                  <p class="mb-2">Использовать для:</p>
                  <ul class="pl-4">
                    <li>Hero-изображений</li>
                    <li>Логотипов</li>
                    <li>LCP элементов</li>
                    <li>Above-the-fold контента</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">loading="lazy"</h3>
                  <p class="mb-2">Использовать для:</p>
                  <ul class="pl-4">
                    <li>Галерей изображений</li>
                    <li>Контента в футере</li>
                    <li>Всех iframe (YouTube, Maps)</li>
                    <li>Below-the-fold изображений</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на Web Vitals</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">LCP</h3>
                  <p class="mb-2"><b>Без lazy:</b> 4.5s ❌</p>
                  <p class="mb-2"><b>С lazy:</b> 2.0s ✅</p>
                  <p class="mb-0 text-caption">Критический контент загружается быстрее</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">TBT</h3>
                  <p class="mb-2"><b>Без lazy:</b> 800ms ❌</p>
                  <p class="mb-2"><b>С lazy:</b> 150ms ✅</p>
                  <p class="mb-0 text-caption">Меньше блокировок main thread</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">CLS</h3>
                  <p class="mb-2"><b>Важно:</b> Указывать размеры</p>
                  <p class="mb-0 text-caption">width/height предотвращают layout shift</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между loading="lazy" и IntersectionObserver?</p>
                <p class="font-weight-regular ma-0">
                  <code>loading="lazy"</code> — нативное API браузера, работает автоматически, но с меньшим контролем.
                  <code>IntersectionObserver</code> — программный API с полным контролем над порогом видимости,
                  анимациями и callback'ами. IntersectionObserver также работает в старых браузерах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда НЕ использовать lazy loading?</p>
                <p class="font-weight-regular ma-0">
                  Не используйте для LCP-элементов (largest contentful paint), критических изображений выше сгиба,
                  логотипов и первого экрана. Это замедлит начальную отрисовку страницы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем lazy loading для iframe?</p>
                <p class="font-weight-regular ma-0">
                  YouTube iframe загружает ~500KB (API, скрипты, превью), Google Maps ~1-2MB (тайлы, интерактив).
                  Без lazy loading все это загружается сразу, даже если пользователь не доскроллит до iframe.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое Facade Pattern для iframe?</p>
                <p class="font-weight-regular ma-0">
                  Вместо тяжелого YouTube iframe показываем легкий placeholder с превью. При клике заменяем на
                  настоящий iframe. Экономия ~500KB на каждое видео до взаимодействия пользователя.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как предотвратить CLS при lazy loading?</p>
                <p class="font-weight-regular ma-0">
                  Всегда указывайте <code>width</code> и <code>height</code> атрибуты или используйте CSS
                  <code>aspect-ratio</code>. Браузер зарезервирует место до загрузки изображения, предотвращая
                  layout shift.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать lazy loading?</p>
                <p class="font-weight-regular ma-0">
                  DevTools → Network → фильтр Img. Включите Throttling (Fast 3G) и прокручивайте страницу.
                  Смотрите когда появляются новые запросы. Используйте Lighthouse для проверки метрик.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Поддержка браузерами</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">loading="lazy"</h3>
                  <ul class="pl-4">
                    <li>Chrome 77+ ✅</li>
                    <li>Firefox 75+ ✅</li>
                    <li>Safari 15.4+ ✅</li>
                    <li>Edge 79+ ✅</li>
                  </ul>
                  <p class="mb-0 text-caption mt-2">~95% глобальной поддержки</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">IntersectionObserver</h3>
                  <ul class="pl-4">
                    <li>Chrome 51+ ✅</li>
                    <li>Firefox 55+ ✅</li>
                    <li>Safari 12.1+ ✅</li>
                    <li>Edge 15+ ✅</li>
                  </ul>
                  <p class="mb-0 text-caption mt-2">~97% глобальной поддержки</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-alert type="info" class="mb-6">
              <template v-slot:prepend>
                <v-icon>mdi-lightbulb-outline</v-icon>
              </template>
              <div>
                <ul class="pl-4 ma-0">
                  <li>Всегда указывайте <code>width</code> и <code>height</code> для предотвращения CLS</li>
                  <li>Используйте <code>loading="eager"</code> для LCP-изображений</li>
                  <li>Добавляйте <code>fetchpriority="high"</code> для критических изображений</li>
                  <li>Комбинируйте с современными форматами (WebP, AVIF)</li>
                  <li>Для iframe используйте Facade Pattern (особенно YouTube)</li>
                  <li>Тестируйте на медленном соединении (Fast 3G throttling)</li>
                  <li>Измеряйте эффект через Lighthouse и Core Web Vitals</li>
                </ul>
              </div>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Lazy loading — мощная техника оптимизации, которая критически важна для современного веба.
              Используйте нативное <code>loading="lazy"</code> для большинства случаев, IntersectionObserver
              для точного контроля, и Facade Pattern для тяжелых iframe. Правильное применение lazy loading
              значительно улучшает начальную загрузку страницы, экономит трафик пользователей и положительно
              влияет на все Core Web Vitals метрики.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://web.dev/browser-level-image-lazy-loading/"
                target="_blank">
                Web.dev: Native Lazy Loading
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  overflow-x: auto;
}

.ol-list {
  padding-left: 20px;
}

.ol-list li {
  margin-bottom: 16px;
}
</style>
