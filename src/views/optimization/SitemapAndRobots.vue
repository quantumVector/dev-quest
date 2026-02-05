<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
<!-- Базовая структура XML Sitemap -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-02-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2025-02-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/blog/article-1</loc>
    <lastmod>2025-01-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`

const snippet2 = `
<!-- Индексный sitemap для больших сайтов -->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
    <lastmod>2025-02-05</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml</loc>
    <lastmod>2025-02-04</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-products.xml</loc>
    <lastmod>2025-02-03</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-images.xml</loc>
    <lastmod>2025-02-02</lastmod>
  </sitemap>
</sitemapindex>
`

const snippet3 = `
<!-- Специализированные sitemap -->

<!-- Image Sitemap -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/gallery</loc>
    <image:image>
      <image:loc>https://example.com/images/photo1.jpg</image:loc>
      <image:title>Заголовок изображения</image:title>
      <image:caption>Описание изображения</image:caption>
    </image:image>
  </url>
</urlset>

<!-- Video Sitemap -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/videos</loc>
    <video:video>
      <video:thumbnail_loc>https://example.com/thumb.jpg</video:thumbnail_loc>
      <video:title>Заголовок видео</video:title>
      <video:description>Описание видео</video:description>
      <video:content_loc>https://example.com/video.mp4</video:content_loc>
      <video:duration>600</video:duration>
    </video:video>
  </url>
</urlset>

<!-- News Sitemap -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://example.com/news/article</loc>
    <news:news>
      <news:publication>
        <news:name>Example News</news:name>
        <news:language>ru</news:language>
      </news:publication>
      <news:publication_date>2025-02-05T10:00:00Z</news:publication_date>
      <news:title>Заголовок новости</news:title>
    </news:news>
  </url>
</urlset>
`

const snippet4 = `
# Базовый robots.txt

# Разрешить всем ботам
User-agent: *
Allow: /

# Запретить индексацию служебных директорий
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /temp/

# Запретить индексацию файлов определенных типов
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /search?

# Ссылка на sitemap
Sitemap: https://example.com/sitemap.xml

# Задержка между запросами (в секундах)
Crawl-delay: 1
`

const snippet5 = `
# Продвинутый robots.txt с правилами для разных ботов

# Общие правила для всех ботов
User-agent: *
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Allow: /api/public/
Sitemap: https://example.com/sitemap.xml

# Специальные правила для Googlebot
User-agent: Googlebot
Disallow: /private/
Allow: /private/public-section/
Crawl-delay: 0

# Специальные правила для Googlebot-Image
User-agent: Googlebot-Image
Disallow: /images/private/
Allow: /images/

# Правила для Bingbot
User-agent: Bingbot
Crawl-delay: 2
Disallow: /search/

# Блокировка плохих ботов
User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: MJ12bot
Disallow: /

# Правила для рекламных ботов
User-agent: Mediapartners-Google
Allow: /

# Дополнительные sitemap
Sitemap: https://example.com/sitemap-posts.xml
Sitemap: https://example.com/sitemap-products.xml
Sitemap: https://example.com/sitemap-images.xml
`

const snippet6 = `
# robots.txt для разных окружений

# === PRODUCTION ===
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/internal/
Sitemap: https://example.com/sitemap.xml

# === STAGING ===
User-agent: *
Disallow: /

# === DEVELOPMENT ===
User-agent: *
Disallow: /

# === ТЕСТИРОВАНИЕ КОНКРЕТНЫХ РАЗДЕЛОВ ===
# Разрешить только новый раздел на staging
User-agent: Googlebot
Allow: /new-section/
Disallow: /
`

const snippet7 = `
// Генерация sitemap в Node.js/Next.js

import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://example.com' })
  const writeStream = createWriteStream('./public/sitemap.xml')

  sitemap.pipe(writeStream)

  // Статические страницы
  sitemap.write({
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString()
  })

  // Динамические страницы из базы данных
  const posts = await fetchPosts()
  posts.forEach(post => {
    sitemap.write({
      url: \`/blog/\${post.slug}\`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: post.updatedAt
    })
  })

  sitemap.end()
  await streamToPromise(sitemap)
}

// Next.js API route: pages/api/sitemap.xml.ts
export default async function handler(req, res) {
  const sitemap = new SitemapStream({ hostname: 'https://example.com' })

  const pages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
  ]

  pages.forEach(page => sitemap.write(page))

  const posts = await fetchPosts()
  posts.forEach(post => {
    sitemap.write({
      url: \`/blog/\${post.slug}\`,
      lastmod: post.updatedAt,
      priority: 0.7
    })
  })

  sitemap.end()

  const sitemapOutput = await streamToPromise(sitemap)

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemapOutput)
  res.end()
}
`

const snippet8 = `
// Автоматическая генерация sitemap в Next.js 13+

// app/sitemap.ts (Next.js App Router)
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'

  // Статические маршруты
  const routes = ['', '/about', '/contact'].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Динамические маршруты из API
  const posts = await fetch('https://api.example.com/posts').then(res => res.json())
  const postRoutes = posts.map((post) => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const products = await fetch('https://api.example.com/products').then(res => res.json())
  const productRoutes = products.map((product) => ({
    url: \`\${baseUrl}/products/\${product.slug}\`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [...routes, ...postRoutes, ...productRoutes]
}

// app/robots.ts (Next.js App Router)
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://example.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/private/', '/cart/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot'],
        disallow: '/',
      },
    ],
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  }
}
`

const snippet9 = `
<!-- Подключение sitemap в HTML -->
<head>
  <!-- Указание основного sitemap -->
  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">

  <!-- RSS feed как альтернатива для блога -->
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml">
</head>

<!-- Проверка robots.txt через meta-теги -->
<head>
  <!-- Управление индексацией конкретной страницы -->
  <meta name="robots" content="index, follow">

  <!-- Запрет индексации -->
  <meta name="robots" content="noindex, nofollow">

  <!-- Для конкретных ботов -->
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="noindex, nofollow">

  <!-- Продвинутые директивы -->
  <meta name="robots" content="index, follow, max-snippet:150, max-image-preview:large">
</head>
`

const snippet10 = `
# Специальные случаи и лучшие практики robots.txt

# === ОБРАБОТКА ПАРАМЕТРОВ URL ===
# Игнорировать параметры сортировки и фильтрации
User-agent: *
Disallow: /*?sort=
Disallow: /*?filter=
Disallow: /*&page=
Allow: /*?*$  # Разрешить если нет параметров выше

# === ЗАЩИТА ОТ ПАРСИНГА ===
# Блокировка известных скраперов
User-agent: wget
User-agent: HTTrack
User-agent: EmailCollector
Disallow: /

# === МОБИЛЬНЫЕ ВЕРСИИ ===
# Если есть отдельная мобильная версия
User-agent: *
Disallow: /m/
# Указать в head: <link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.example.com/">

# === A/B ТЕСТИРОВАНИЕ ===
# Запретить индексацию вариантов тестов
User-agent: *
Disallow: /*?variant=
Disallow: /ab-test/

# === ПАГИНАЦИЯ ===
# Разрешить первую страницу, ограничить остальные
User-agent: *
Allow: /blog/
Allow: /blog/page/1
Disallow: /blog/page/

# === AJAX/API ENDPOINTS ===
User-agent: *
Disallow: /api/
Allow: /api/public/
Disallow: /*.json$
Disallow: /xhr/

# === ДУБЛИКАТЫ КОНТЕНТА ===
# Если есть версии для печати
Disallow: /print/
Disallow: /*?print=1

# Если есть параметры отслеживания
Disallow: /*?utm_
Disallow: /*?ref=
Disallow: /*?source=
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
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
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
              XML Sitemap и robots.txt: управление индексацией сайта
            </h1>

            <p class="font-weight-regular mb-6">
              <b>XML Sitemap и robots.txt</b> — два ключевых файла для управления тем, как поисковые системы
              сканируют и индексируют ваш сайт. Sitemap помогает поисковикам найти все важные страницы,
              а robots.txt контролирует, какие страницы можно сканировать.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение XML Sitemap и robots.txt</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">XML Sitemap</th>
                <th class="text-left font-weight-bold">robots.txt</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Назначение</b></td>
                <td class="pt-2 pb-2">Карта сайта для поисковиков</td>
                <td class="pt-2 pb-2">Правила сканирования</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Формат</b></td>
                <td class="pt-2 pb-2">XML</td>
                <td class="pt-2 pb-2">Текстовый файл</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Расположение</b></td>
                <td class="pt-2 pb-2">/sitemap.xml (гибкое)</td>
                <td class="pt-2 pb-2">/robots.txt (строго в корне)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Действие</b></td>
                <td class="pt-2 pb-2">Помогает найти страницы</td>
                <td class="pt-2 pb-2">Запрещает/разрешает сканирование</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Обязательность</b></td>
                <td class="pt-2 pb-2">Рекомендуется</td>
                <td class="pt-2 pb-2">Опционально, но важно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Размер</b></td>
                <td class="pt-2 pb-2">До 50 МБ / 50,000 URL</td>
                <td class="pt-2 pb-2">Неограничен (но обычно мал)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Базовая структура XML Sitemap</h2>
            <p class="font-weight-regular mb-4">
              XML Sitemap содержит список URL со метаданными о приоритете и частоте обновления:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Индексный Sitemap для больших сайтов</h2>
            <p class="font-weight-regular mb-4">
              Если у вас больше 50,000 URL или размер превышает 50 МБ, используйте sitemap index:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Специализированные Sitemap</h2>
            <p class="font-weight-regular mb-4">
              Для изображений, видео и новостей существуют расширенные форматы:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Базовый robots.txt</h2>
            <p class="font-weight-regular mb-4">
              Простой файл для управления доступом ботов к разделам сайта:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Продвинутый robots.txt</h2>
            <p class="font-weight-regular mb-4">
              Детальные правила для разных поисковых ботов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. robots.txt для разных окружений</h2>
            <p class="font-weight-regular mb-4">
              Важно блокировать индексацию staging и development окружений:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Генерация Sitemap в Node.js</h2>
            <p class="font-weight-regular mb-4">
              Автоматическое создание sitemap с динамическим контентом:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Next.js App Router: sitemap и robots</h2>
            <p class="font-weight-regular mb-4">
              Современный подход в Next.js 13+ с встроенной поддержкой:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Подключение в HTML</h2>
            <p class="font-weight-regular mb-4">
              Правильное указание sitemap и управление индексацией через meta-теги:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. Специальные случаи и best practices</h2>
            <p class="font-weight-regular mb-4">
              Продвинутые техники для сложных сценариев:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые теги XML Sitemap</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">&lt;loc&gt;</h3>
                  <p class="mb-0">Обязательный. Полный URL страницы. Должен начинаться с протокола (http/https) и быть не длиннее 2048 символов.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">&lt;lastmod&gt;</h3>
                  <p class="mb-0">Дата последнего изменения в формате ISO 8601. Помогает поисковикам определить, когда пересканировать страницу.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">&lt;changefreq&gt;</h3>
                  <p class="mb-0">Частота изменений: always, hourly, daily, weekly, monthly, yearly, never. Это рекомендация, не гарантия.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">&lt;priority&gt;</h3>
                  <p class="mb-0">Приоритет от 0.0 до 1.0. Относительная важность страницы на вашем сайте. Не влияет на рейтинг в поиске.</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Директивы robots.txt</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">User-agent</h3>
                  <ul class="pl-4 mb-0">
                    <li>* — все боты</li>
                    <li>Googlebot — Google</li>
                    <li>Bingbot — Bing</li>
                    <li>Yandex — Яндекс</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Allow/Disallow</h3>
                  <ul class="pl-4 mb-0">
                    <li>/ — весь сайт</li>
                    <li>/admin/ — директория</li>
                    <li>*.pdf — по расширению</li>
                    <li>/*?param= — параметры</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Дополнительно</h3>
                  <ul class="pl-4 mb-0">
                    <li>Sitemap: URL карты</li>
                    <li>Crawl-delay: секунды</li>
                    <li>Host: основной домен</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Где должен находиться robots.txt?</p>
                <p class="font-weight-regular ma-0">
                  Строго в корне домена: https://example.com/robots.txt. Поддомены должны иметь свой robots.txt.
                  Путь /subfolder/robots.txt не будет работать.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Может ли robots.txt полностью скрыть страницу от индексации?</p>
                <p class="font-weight-regular ma-0">
                  Нет! Disallow блокирует сканирование, но не индексацию. Если на страницу есть внешние ссылки,
                  она может попасть в индекс без содержимого. Используйте meta robots="noindex" или X-Robots-Tag.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Нужен ли sitemap для маленького сайта?</p>
                <p class="font-weight-regular ma-0">
                  Да, рекомендуется. Даже для 10-20 страниц sitemap помогает контролировать приоритеты,
                  даты обновления и гарантирует, что поисковики найдут все страницы.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как часто обновлять sitemap?</p>
                <p class="font-weight-regular ma-0">
                  Для статических сайтов — при публикации нового контента. Для динамических — генерировать
                  на лету или через cron. Google сам определяет, как часто проверять sitemap.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли в robots.txt блокировать JavaScript или CSS?</p>
                <p class="font-weight-regular ma-0">
                  Технически можно, но не рекомендуется. Google использует JavaScript для рендеринга, а блокировка
                  CSS/JS мешает правильной индексации. Исключение: реально служебные скрипты, которые не влияют на контент.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли частота обновления sitemap на индексацию?</p>
                <p class="font-weight-regular ma-0">
                  Нет прямой связи. Google сам решает, как часто проверять sitemap. Важнее правильно указывать
                  lastmod и отправлять ping при значимых обновлениях через Search Console API.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Best Practices</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">XML Sitemap</h3>
                  <ul class="pl-4">
                    <li>Включайте только канонические URL</li>
                    <li>Обновляйте lastmod при изменениях</li>
                    <li>Разделяйте на тематические части</li>
                    <li>Используйте сжатие (.xml.gz)</li>
                    <li>Добавьте в robots.txt и Search Console</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">robots.txt</h3>
                  <ul class="pl-4">
                    <li>Всегда тестируйте изменения</li>
                    <li>Блокируйте staging/dev окружения</li>
                    <li>Не блокируйте CSS/JS без причины</li>
                    <li>Указывайте все sitemap</li>
                    <li>Используйте комментарии для ясности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <ul class="pl-4">
                    <li>Проверяйте Coverage в Search Console</li>
                    <li>Отслеживайте ошибки индексации</li>
                    <li>Валидируйте XML структуру</li>
                    <li>Тестируйте robots.txt в инструментах Google</li>
                    <li>Логируйте доступ ботов к sitemap</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для работы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Генерация</h3>
                  <ul class="pl-4">
                    <li>XML Sitemap Generator</li>
                    <li>Screaming Frog SEO Spider</li>
                    <li>Next.js sitemap.ts/xml</li>
                    <li>next-sitemap package</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Валидация</h3>
                  <ul class="pl-4">
                    <li>Google Search Console</li>
                    <li>XML Sitemap Validator</li>
                    <li>robots.txt Tester</li>
                    <li>Bing Webmaster Tools</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Мониторинг</h3>
                  <ul class="pl-4">
                    <li>Google Analytics</li>
                    <li>Log file analysis</li>
                    <li>Sitemap ping services</li>
                    <li>Custom monitoring scripts</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Автоматизация</h3>
                  <ul class="pl-4">
                    <li>CI/CD интеграция</li>
                    <li>Cron jobs для обновления</li>
                    <li>Webhook уведомления</li>
                    <li>API интеграции CMS</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              XML Sitemap и robots.txt — фундаментальные инструменты для управления индексацией сайта.
              Sitemap помогает поисковым системам найти и приоритизировать страницы, а robots.txt
              контролирует доступ ботов к ресурсам. Правильная настройка обоих файлов критична для SEO,
              особенно на больших сайтах с динамическим контентом. Современные фреймворки вроде Next.js
              предоставляют встроенные инструменты для автоматической генерации этих файлов.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview"
                target="_blank">
                Google: Sitemap Documentation
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
