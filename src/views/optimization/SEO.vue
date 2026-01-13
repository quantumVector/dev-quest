<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'

const metaTagsSnippet = `
<!-- Базовые meta-теги для SEO -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- Основные meta-теги -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Title - главный SEO элемент (50-60 символов оптимально) -->
  <title>Заголовок страницы - Название сайта</title>

  <!-- Description - описание для поисковой выдачи (150-160 символов) -->
  <meta name="description" content="Краткое описание содержимого страницы для поисковых систем и пользователей">

  <!-- Keywords - практически не используется современными поисковиками -->
  <meta name="keywords" content="ключевое, слово, фраза">

  <!-- Robots - управление индексацией -->
  <meta name="robots" content="index, follow">
  <!-- Варианты: noindex, nofollow, noarchive, nosnippet -->

  <!-- Canonical URL - указывает основную версию страницы -->
  <link rel="canonical" href="https://example.com/page">

  <!-- Автор и копирайт -->
  <meta name="author" content="Имя Автора">
  <meta name="copyright" content="© 2025 Company Name">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
</html>
`

const openGraphSnippet = `
<!-- Open Graph теги для соцсетей (Facebook, LinkedIn, etc) -->
<head>
  <!-- Базовые OG теги -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:title" content="Заголовок для соцсетей">
  <meta property="og:description" content="Описание для соцсетей (до 200 символов)">
  <meta property="og:image" content="https://example.com/og-image.jpg">

  <!-- Дополнительные OG теги -->
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Описание изображения">
  <meta property="og:site_name" content="Название сайта">
  <meta property="og:locale" content="ru_RU">

  <!-- Для статей -->
  <meta property="article:published_time" content="2025-01-13T10:00:00Z">
  <meta property="article:author" content="https://example.com/author">
  <meta property="article:section" content="Technology">
  <meta property="article:tag" content="JavaScript">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@username">
  <meta name="twitter:creator" content="@username">
  <meta name="twitter:title" content="Заголовок для Twitter">
  <meta name="twitter:description" content="Описание для Twitter">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">

  <!-- Альтернативные языковые версии -->
  <link rel="alternate" hreflang="en" href="https://example.com/en/page">
  <link rel="alternate" hreflang="ru" href="https://example.com/ru/page">
  <link rel="alternate" hreflang="x-default" href="https://example.com/page">
</head>
`

const schemaOrgSnippet = `
<!-- Schema.org разметка - структурированные данные для поисковиков -->

<!-- 1. Article (статья) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Заголовок статьи",
  "description": "Краткое описание статьи",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Имя Автора",
    "url": "https://example.com/author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Название организации",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2025-01-13",
  "dateModified": "2025-01-13"
}
<\/script>

<!-- 2. Product (товар) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Название товара",
  "image": "https://example.com/product.jpg",
  "description": "Описание товара",
  "sku": "12345",
  "brand": {
    "@type": "Brand",
    "name": "Бренд"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product",
    "priceCurrency": "RUB",
    "price": "1999.00",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}
<\/script>

<!-- 3. BreadcrumbList (хлебные крошки) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Категория",
      "item": "https://example.com/category"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Текущая страница",
      "item": "https://example.com/category/page"
    }
  ]
}
<\/script>

<!-- 4. Organization (организация) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Название компании",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-123-456-7890",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://facebook.com/company",
    "https://twitter.com/company",
    "https://linkedin.com/company/company"
  ]
}
<\/script>
`

const robotsTxtSnippet = `
# robots.txt - управление доступом поисковых роботов

# Разрешить всем роботам все
User-agent: *
Allow: /

# Запретить определенные директории
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /temp/

# Запретить файлы определенного типа
Disallow: /*.json$
Disallow: /*.pdf$

# Для конкретного робота (например, Google)
User-agent: Googlebot
Allow: /
Disallow: /no-google/

# Указание на sitemap
Sitemap: https://example.com/sitemap.xml

# Задержка между запросами (для вежливых ботов)
Crawl-delay: 10

# Примеры для различных сценариев:

# Блокировка всех роботов
# User-agent: *
# Disallow: /

# Блокировка конкретного бота
# User-agent: BadBot
# Disallow: /

# Разрешить только Google
# User-agent: Googlebot
# Allow: /
# User-agent: *
# Disallow: /
`

const sitemapXmlSnippet = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<!-- Главная страница -->
<url>
  <loc>https://example.com/</loc>
  <lastmod>2025-01-13</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>

<!-- Важная страница -->
<url>
  <loc>https://example.com/about</loc>
  <lastmod>2025-01-10</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

<!-- Статья/блог пост -->
<url>
  <loc>https://example.com/blog/post-1</loc>
  <lastmod>2025-01-13</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>

<!-- Дополнительные страницы -->
<url>
  <loc>https://example.com/products</loc>
  <lastmod>2025-01-12</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.6</priority>
</url>

</urlset>

<!--
changefreq возможные значения:
- always (постоянно меняется)
- hourly (каждый час)
- daily (каждый день)
- weekly (каждую неделю)
- monthly (каждый месяц)
- yearly (каждый год)
- never (никогда не меняется)

priority: от 0.0 до 1.0 (важность страницы относительно других)
-->
`

const lazyLoadingSnippet = `
<!-- Lazy Loading для изображений -->

<!-- 1. Нативный lazy loading (современные браузеры) -->
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>

<!-- 2. Iframe с lazy loading -->
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  loading="lazy"
  title="Video title"
  width="560"
  height="315"
></iframe>

<!-- 3. Picture с lazy loading и современными форматами -->
<picture>
<source
  srcset="image.avif"
  type="image/avif"
  media="(min-width: 800px)"
>
<source
  srcset="image.webp"
  type="image/webp"
>
<img
  src="image.jpg"
  alt="Description"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>
</picture>

<!-- 4. Intersection Observer для кастомной загрузки -->
<img
  data-src="image.jpg"
  alt="Description"
  class="lazy-image"
  width="800"
  height="600"
>

<script>
// Intersection Observer для lazy loading
const lazyImages = document.querySelectorAll('.lazy-image');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy-image');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px' // Начать загрузку за 50px до появления
});

lazyImages.forEach(img => imageObserver.observe(img));
<\/script>

<!-- 5. Placeholder для lazy loading -->
<img
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3C/svg%3E"
  data-src="image.jpg"
  alt="Description"
  class="lazy-image"
  style="background: #f0f0f0;"
>
`

const lighthouseOptimizationSnippet = `
// Оптимизация метрик Web Vitals для Lighthouse

// 1. Уменьшение TTFB (Time to First Byte)
// - Использовать CDN
// - Включить HTTP/2 или HTTP/3
// - Оптимизировать серверный код
// - Использовать кэширование на сервере
// - Минимизировать редиректы

// nginx конфигурация для кэширования
/*
server {
location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
expires 1y;
add_header Cache-Control "public, immutable";
}
}
*/

// 2. Улучшение LCP (Largest Contentful Paint)
// - Оптимизировать изображения
// - Использовать preload для критических ресурсов
// - Удалить render-blocking ресурсы
// - Использовать CDN для изображений

// Preload критических ресурсов
// <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
// <link rel="preload" href="/css/critical.css" as="style">
// <link rel="preload" href="/images/hero.jpg" as="image">

// 3. Оптимизация FCP (First Contentful Paint)
// - Inline критический CSS
// - Использовать font-display: swap
// - Минимизировать JavaScript на начальной загрузке

// Font display optimization
/*
@font-face {
font-family: 'MyFont';
src: url('/fonts/myfont.woff2') format('woff2');
font-display: swap; // Показывать fallback шрифт сразу
}
*/

// 4. Code splitting в Webpack/Vite
// webpack.config.js
module.exports = {
optimization: {
splitChunks: {
chunks: 'all',
cacheGroups: {
vendor: {
test: /[\\\\/]node_modules[\\\\/]/,
name: 'vendors',
priority: 10
},
common: {
minChunks: 2,
priority: 5,
reuseExistingChunk: true
}
}
}
}
};

// 5. Динамические импорты для React/Vue
// React
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
return (
<Suspense fallback={<div>Loading...</div>}>
<HeavyComponent />
</Suspense>
);
}

// Vue 3
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() =>
import('./HeavyComponent.vue')
);

// 6. Resource Hints
// <link rel="dns-prefetch" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link rel="prefetch" href="/next-page.js">
// <link rel="prerender" href="/next-page.html">

// 7. Compression
// Включить gzip/brotli на сервере
// nginx:
/*
gzip on;
gzip_vary on;
gzip_types text/plain text/css text/xml text/javascript
application/x-javascript application/xml+rss
application/javascript application/json;
*/

// 8. Минимизация и оптимизация
// - Минифицировать CSS/JS
// - Удалить неиспользуемый код (tree-shaking)
// - Оптимизировать изображения (WebP, AVIF)
// - Использовать responsive images
`

const googleSearchConsoleSnippet = `
<!-- Интеграция с Google Search Console -->

<!-- 1. Верификация сайта через meta-тег -->
<head>
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
</head>

<!-- 2. Верификация через HTML файл -->
<!-- Загрузить файл google1234567890abcdef.html в корень сайта -->

<!-- 3. Отправка sitemap в Search Console -->
/*
Через интерфейс:
1. Войти в Google Search Console
2. Выбрать свойство (сайт)
3. Sitemaps → Добавить карту сайта
4. Ввести URL: https://example.com/sitemap.xml
*/

<!-- 4. Мониторинг индексации -->
/*
Проверить индексацию страницы:
site:example.com/your-page

Проверить все проиндексированные страницы:
site:example.com
*/

<!-- 5. Запрос на переиндексацию -->
/*
1. Search Console → URL Inspection
2. Ввести URL страницы
3. Request Indexing
*/

// JavaScript для динамической отправки sitemap
// Генерация sitemap.xml для SPA (Next.js пример)
// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
const baseUrl = 'https://example.com';

// Получить все страницы
const pages = await getAllPages();

const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${pages.map(page => \`
<url>
  <loc>\${baseUrl}\${page.url}</loc>
  <lastmod>\${page.lastModified}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
\`).join('')}
</urlset>
\`;

res.setHeader('Content-Type', 'text/xml');
res.write(sitemap);
res.end();

return { props: {} };
}

export default function Sitemap() {
return null;
}
`

const seoChecklistSnippet = `
// SEO Checklist для фронтенд-разработчика

/* ✅ БАЗОВЫЕ META-ТЕГИ */
// [ ] title (уникальный для каждой страницы, 50-60 символов)
// [ ] meta description (150-160 символов)
// [ ] meta viewport для мобильной версии
// [ ] canonical URL для избежания дублей
// [ ] meta robots (index/noindex)
// [ ] favicon и apple-touch-icon

/* ✅ СТРУКТУРИРОВАННЫЕ ДАННЫЕ */
// [ ] Schema.org разметка (Article, Product, Organization)
// [ ] Open Graph теги для соцсетей
// [ ] Twitter Cards
// [ ] Хлебные крошки (Breadcrumb Schema)

/* ✅ ПРОИЗВОДИТЕЛЬНОСТЬ */
// [ ] Lighthouse score > 90
// [ ] LCP < 2.5s
// [ ] FCP < 1.8s
// [ ] TTFB < 600ms
// [ ] CLS < 0.1
// [ ] Lazy loading для изображений
// [ ] Code splitting
// [ ] Минификация CSS/JS
// [ ] Compression (gzip/brotli)

/* ✅ ИЗОБРАЖЕНИЯ */
// [ ] Alt текст для всех изображений
// [ ] Современные форматы (WebP, AVIF)
// [ ] Responsive images (srcset)
// [ ] Оптимизированные размеры
// [ ] Lazy loading
// [ ] Width и height атрибуты

/* ✅ ССЫЛКИ И НАВИГАЦИЯ */
// [ ] Внутренние ссылки используют относительные URL
// [ ] Внешние ссылки с rel="noopener"
// [ ] 404 страница настроена
// [ ] Редиректы 301 для старых URL
// [ ] Sitemap.xml актуален
// [ ] robots.txt настроен

/* ✅ МОБИЛЬНАЯ ВЕРСИЯ */
// [ ] Mobile-first подход
// [ ] Responsive design
// [ ] Touch-friendly элементы (44x44px минимум)
// [ ] Нет горизонтального скролла
// [ ] Быстрая загрузка на 3G

/* ✅ ДОСТУПНОСТЬ (A11Y) */
// [ ] Семантические HTML теги
// [ ] ARIA атрибуты где нужно
// [ ] Keyboard navigation работает
// [ ] Контрастность текста достаточная
// [ ] Screen reader friendly

/* ✅ ИНТЕРНАЦИОНАЛИЗАЦИЯ */
// [ ] hreflang для мультиязычных сайтов
// [ ] lang атрибут в <html>
// [ ] Правильная кодировка (UTF-8)

/* ✅ БЕЗОПАСНОСТЬ */
// [ ] HTTPS включен
// [ ] Security headers настроены
// [ ] CSP (Content Security Policy)
// [ ] Mixed content отсутствует

/* ✅ АНАЛИТИКА И МОНИТОРИНГ */
// [ ] Google Analytics подключен
// [ ] Google Search Console настроен
// [ ] Sitemap отправлен в Search Console
// [ ] Мониторинг ошибок 404
// [ ] Отслеживание Core Web Vitals
`

const highlightedMetaTags = ref('')
const highlightedOpenGraph = ref('')
const highlightedSchemaOrg = ref('')
const highlightedRobotsTxt = ref('')
const highlightedSitemapXml = ref('')
const highlightedLazyLoading = ref('')
const highlightedLighthouse = ref('')
const highlightedSearchConsole = ref('')
const highlightedChecklist = ref('')

onMounted(() => {
highlightedMetaTags.value = Prism.highlight(metaTagsSnippet, Prism.languages.markup, 'markup')
highlightedOpenGraph.value = Prism.highlight(openGraphSnippet, Prism.languages.markup, 'markup')
highlightedSchemaOrg.value = Prism.highlight(schemaOrgSnippet, Prism.languages.markup, 'markup')
highlightedRobotsTxt.value = Prism.highlight(robotsTxtSnippet, Prism.languages.javascript, 'javascript')
highlightedSitemapXml.value = Prism.highlight(sitemapXmlSnippet, Prism.languages.markup, 'markup')
highlightedLazyLoading.value = Prism.highlight(lazyLoadingSnippet, Prism.languages.markup, 'markup')
highlightedLighthouse.value = Prism.highlight(lighthouseOptimizationSnippet, Prism.languages.javascript, 'javascript')
highlightedSearchConsole.value = Prism.highlight(googleSearchConsoleSnippet, Prism.languages.markup, 'markup')
highlightedChecklist.value = Prism.highlight(seoChecklistSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              SEO: Полное руководство по поисковой оптимизации для фронтенд-разработчиков
            </h1>

            <p class="font-weight-regular mb-6">
              <b>SEO (Search Engine Optimization)</b> — комплекс мер по оптимизации сайта для поисковых систем.
              Для фронтенд-разработчика это включает правильную HTML-разметку, мета-теги, структурированные данные,
              оптимизацию производительности и многое другое.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Обзор SEO компонентов</h2>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-tag-multiple</v-icon>
                    <h3 class="text-h6 font-weight-bold">Meta-теги</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Title и Description</li>
                    <li>Open Graph</li>
                    <li>Twitter Cards</li>
                    <li>Canonical URL</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-speedometer</v-icon>
                    <h3 class="text-h6 font-weight-bold">Производительность</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Core Web Vitals</li>
                    <li>Lighthouse аудит</li>
                    <li>Lazy Loading</li>
                    <li>Code Splitting</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="info" class="mr-2">mdi-code-json</v-icon>
                    <h3 class="text-h6 font-weight-bold">Структура</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Schema.org разметка</li>
                    <li>XML Sitemap</li>
                    <li>robots.txt</li>
                    <li>Search Console</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Базовые Meta-теги</h2>
            <v-alert color="info" class="mb-4">
              <strong>Важно:</strong> Meta-теги — первое, что видят поисковые системы. Title и description влияют
              на CTR в поисковой выдаче.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMetaTags"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Open Graph и Twitter Cards</h2>
            <v-alert color="primary" class="mb-4">
              <strong>Open Graph:</strong> Управляет внешним видом ссылок в социальных сетях (Facebook, LinkedIn, VK).
              Twitter Cards — специфичная разметка для Twitter.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedOpenGraph"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Schema.org — структурированные данные</h2>
            <v-alert color="warning" class="mb-4">
              <strong>Schema.org:</strong> JSON-LD разметка помогает поисковикам понять содержимое страницы.
              Влияет на rich snippets в Google (звездочки рейтинга, цены, хлебные крошки).
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSchemaOrg"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. robots.txt — управление индексацией</h2>
            <p class="font-weight-regular mb-4">
              Файл <code>robots.txt</code> находится в корне сайта и указывает поисковым роботам,
              какие страницы можно индексировать.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRobotsTxt"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. XML Sitemap — карта сайта</h2>
            <p class="font-weight-regular mb-4">
              XML Sitemap помогает поисковым системам найти все страницы сайта.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSitemapXml"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Lazy Loading — отложенная загрузка</h2>
            <v-alert color="success" class="mb-4">
              <strong>Lazy Loading:</strong> Загружает изображения и iframe только когда они появляются
              в области видимости. Улучшает LCP и общую производительность.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLazyLoading"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Lighthouse и Core Web Vitals</h2>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">TTFB</h3>
                  <p class="text-body-2">Time to First Byte<br>Цель: < 600ms</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">LCP</h3>
                  <p class="text-body-2">Largest Contentful Paint<br>Цель: < 2.5s</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 text-center" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">FCP</h3>
                  <p class="text-body-2">First Contentful Paint<br>Цель: < 1.8s</p>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedLighthouse"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Google Search Console</h2>
            <p class="font-weight-regular mb-4">
              Google Search Console — инструмент для мониторинга индексации, ошибок и производительности в поиске.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSearchConsole"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Таблица приоритетов SEO</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Приоритет</th>
                <th class="text-left font-weight-bold">Элемент</th>
                <th class="text-left font-weight-bold">Влияние</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><v-chip color="error" size="small">Критично</v-chip></td>
                <td>Title, Description, H1</td>
                <td>Прямое влияние на ранжирование и CTR</td>
              </tr>
              <tr>
                <td><v-chip color="error" size="small">Критично</v-chip></td>
                <td>Core Web Vitals (LCP, FCP, CLS)</td>
                <td>Ranking factor с 2021 года</td>
              </tr>
              <tr>
                <td><v-chip color="warning" size="small">Важно</v-chip></td>
                <td>Schema.org разметка</td>
                <td>Rich snippets, лучший CTR</td>
              </tr>
              <tr>
                <td><v-chip color="warning" size="small">Важно</v-chip></td>
                <td>Mobile-friendly</td>
                <td>Mobile-first индексация</td>
              </tr>
              <tr>
                <td><v-chip color="success" size="small">Полезно</v-chip></td>
                <td>Open Graph, Twitter Cards</td>
                <td>Соцсети, но не прямое влияние на SEO</td>
              </tr>
              <tr>
                <td><v-chip color="success" size="small">Полезно</v-chip></td>
                <td>Canonical, hreflang</td>
                <td>Избежание дублей контента</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">SEO Checklist</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedChecklist"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки SEO</h2>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>1. Дублирование title/description</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-2"><strong>Проблема:</strong> Одинаковые title/description на разных страницах.</p>
                  <p class="mb-2"><strong>Решение:</strong> Каждая страница должна иметь уникальные meta-теги.</p>
                  <p><strong>Проверка:</strong> Search Console → Performance → Pages</p>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>2. Отсутствие canonical URL</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-2"><strong>Проблема:</strong> Одна страница доступна по разным URL (с/без www, http/https).</p>
                  <p class="mb-2"><strong>Решение:</strong> Всегда указывать canonical URL на основную версию.</p>
                  <code class="d-block pa-2 bg-grey-lighten-4">&lt;link rel="canonical" href="https://example.com/page"&gt;</code>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>3. Медленная загрузка (плохой LCP)</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-2"><strong>Проблема:</strong> Неоптимизированные изображения, нет lazy loading.</p>
                  <p class="mb-2"><strong>Решение:</strong></p>
                  <ul class="pl-4">
                    <li>Использовать WebP/AVIF</li>
                    <li>Lazy loading для изображений ниже fold</li>
                    <li>CDN для статики</li>
                    <li>Preload критических ресурсов</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>4. Отсутствие alt у изображений</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-2"><strong>Проблема:</strong> Поисковики не понимают содержимое изображения.</p>
                  <p class="mb-2"><strong>Решение:</strong> Всегда добавлять описательный alt текст.</p>
                  <code class="d-block pa-2 bg-grey-lighten-4">&lt;img src="product.jpg" alt="Красные кроссовки Nike Air Max 90"&gt;</code>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <strong>5. Неправильный robots.txt</strong>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="mb-2"><strong>Проблема:</strong> Случайно заблокированы важные страницы.</p>
                  <p class="mb-2"><strong>Решение:</strong> Проверить robots.txt в Search Console → robots.txt Tester</p>
                  <p><strong>Частая ошибка:</strong> <code>Disallow: /</code> блокирует весь сайт</p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для SEO</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Анализ и аудит</h3>
                  <ul class="pl-4">
                    <li><strong>Lighthouse</strong> — встроен в Chrome DevTools</li>
                    <li><strong>PageSpeed Insights</strong> — от Google</li>
                    <li><strong>GTmetrix</strong> — детальный анализ</li>
                    <li><strong>WebPageTest</strong> — продвинутое тестирование</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <ul class="pl-4">
                    <li><strong>Google Search Console</strong> — обязательно</li>
                    <li><strong>Google Analytics</strong> — поведение пользователей</li>
                    <li><strong>Bing Webmaster Tools</strong> — для Bing</li>
                    <li><strong>Yandex Webmaster</strong> — для Яндекса</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>SEO для фронтенда</b> включает: правильные meta-теги (title, description, OG), Schema.org разметку,
              оптимизацию производительности (Core Web Vitals), lazy loading, XML sitemap, robots.txt и интеграцию
              с Google Search Console. Регулярный аудит через Lighthouse и мониторинг в Search Console —
              обязательная часть работы фронтенд-разработчика.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://developers.google.com/search/docs"
                target="_blank"
                class="mr-2">
                Google SEO Docs
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://web.dev/learn-core-web-vitals/"
                target="_blank"
                class="mr-2">
                Web Vitals
              </v-btn>
              <v-btn
                color="info"
                size="small"
                variant="elevated"
                href="https://schema.org/"
                target="_blank">
                Schema.org
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
