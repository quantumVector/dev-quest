<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
<!-- JSON-LD формат (рекомендуемый) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Полное руководство по React Hooks",
  "image": [
    "https://example.com/article-image-1x1.jpg",
    "https://example.com/article-image-4x3.jpg",
    "https://example.com/article-image-16x9.jpg"
  ],
  "datePublished": "2025-02-04T08:00:00+00:00",
  "dateModified": "2025-02-04T12:30:00+00:00",
  "author": [{
    "@type": "Person",
    "name": "Иван Петров",
    "url": "https://example.com/authors/ivan-petrov"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Tech Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.jpg"
    }
  },
  "description": "Подробное руководство по использованию React Hooks с примерами и лучшими практиками",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/articles/react-hooks-guide"
  }
}
<\/script>
`

const snippet2 = `
<!-- Microdata формат (встроенный в HTML) -->
<article itemscope itemtype="https://schema.org/Article">
<header>
  <h1 itemprop="headline">Полное руководство по React Hooks</h1>
  <p>
    <time itemprop="datePublished" datetime="2025-02-04T08:00:00+00:00">
      4 февраля 2025
    </time>
    автор:
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
        <span itemprop="name">Иван Петров</span>
      </span>
  </p>
  <img itemprop="image" src="article-image.jpg" alt="React Hooks">
</header>

<div itemprop="articleBody">
  <p>Содержимое статьи...</p>
</div>
</article>
`

const snippet3 = `
<!-- Product разметка для товара -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MacBook Pro 16\" M3 Max",
  "image": [
    "https://example.com/macbook-pro-front.jpg",
    "https://example.com/macbook-pro-side.jpg",
    "https://example.com/macbook-pro-back.jpg"
  ],
  "description": "Мощный ноутбук для профессионалов с процессором M3 Max",
  "sku": "MBP16-M3MAX-1TB",
  "mpn": "MRW13",
  "brand": {
    "@type": "Brand",
    "name": "Apple"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/macbook-pro-m3-max",
    "priceCurrency": "RUB",
    "price": "299990",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Tech Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  },
  "review": [{
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Алексей Смирнов"
    },
    "reviewBody": "Отличный ноутбук для разработки. Очень быстрый и тихий.",
    "datePublished": "2025-01-15"
  }]
}
<\/script>
`

const snippet4 = `
<!-- Breadcrumb разметка (хлебные крошки) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Главная",
    "item": "https://example.com/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Электроника",
    "item": "https://example.com/electronics"
  }, {
    "@type": "ListItem",
    "position": 3,
    "name": "Ноутбуки",
    "item": "https://example.com/electronics/laptops"
  }, {
    "@type": "ListItem",
    "position": 4,
    "name": "MacBook Pro",
    "item": "https://example.com/electronics/laptops/macbook-pro"
  }]
}
<\/script>

<!-- Соответствующий HTML -->
<nav aria-label="Breadcrumb">
<ol>
  <li><a href="/">Главная</a></li>
  <li><a href="/electronics">Электроника</a></li>
  <li><a href="/electronics/laptops">Ноутбуки</a></li>
  <li aria-current="page">MacBook Pro</li>
</ol>
</nav>
`

const snippet5 = `
<!-- Organization разметка -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tech Company",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+7-495-123-45-67",
    "contactType": "customer service",
    "areaServed": "RU",
    "availableLanguage": ["Russian", "English"]
  }],
  "sameAs": [
    "https://www.facebook.com/techcompany",
    "https://twitter.com/techcompany",
    "https://www.linkedin.com/company/techcompany"
  ]
}
<\/script>
`

const snippet6 = `
<!-- WebSite разметка с поиском -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tech Blog",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
<\/script>
`

const snippet7 = `
<!-- FAQ разметка -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Что такое React Hooks?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "<p>React Hooks — это функции, которые позволяют использовать состояние и другие возможности React без написания классов.</p>"
    }
  }, {
    "@type": "Question",
    "name": "Когда следует использовать useEffect?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "<p>useEffect используется для выполнения побочных эффектов в функциональных компонентах: запросы к API, подписки, изменение DOM напрямую.</p>"
    }
  }]
}
<\/script>
`

const snippet8 = `
<!-- Event разметка -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Frontend Meetup 2025",
  "startDate": "2025-03-15T19:00",
  "endDate": "2025-03-15T22:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Технопарк",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Волгоградский проспект, 42",
      "addressLocality": "Москва",
      "postalCode": "109316",
      "addressCountry": "RU"
    }
  },
  "image": "https://example.com/event-image.jpg",
  "description": "Встреча frontend-разработчиков с докладами о React, Vue и современных инструментах",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/events/frontend-meetup-2025",
    "price": "0",
    "priceCurrency": "RUB",
    "availability": "https://schema.org/InStock",
    "validFrom": "2025-02-01T00:00"
  },
  "performer": {
    "@type": "PerformingGroup",
    "name": "Frontend Community"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Tech Events",
    "url": "https://example.com"
  }
}
<\/script>
`

const snippet9 = `
// React компонент с динамической генерацией Schema.org
import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
headline: string;
description: string;
image: string;
datePublished: string;
dateModified: string;
author: {
name: string;
url: string;
};
}

export function ArticleSchema({
headline,
description,
image,
datePublished,
dateModified,
author
}: ArticleSchemaProps) {
const schema = {
'@context': 'https://schema.org',
'@type': 'Article',
headline,
description,
image: [image],
datePublished,
dateModified,
author: {
'@type': 'Person',
name: author.name,
url: author.url
},
publisher: {
'@type': 'Organization',
name: 'Tech Blog',
logo: {
'@type': 'ImageObject',
url: 'https://example.com/logo.jpg'
}
}
};

return (
<Helmet>
<script type="application/ld+json">
  {JSON.stringify(schema)}
<\/script>
<\/Helmet>
);
}

// Использование
function ArticlePage() {
return (
<>
<ArticleSchema
  headline="Введение в TypeScript"
  description="Изучаем основы TypeScript"
  image="https://example.com/typescript-intro.jpg"
  datePublished="2025-02-04T08:00:00+00:00"
  dateModified="2025-02-04T12:00:00+00:00"
  author={{
  name: "Иван Петров",
url: "https://example.com/authors/ivan"
}}
\/>
<article>
{/* Контент статьи */}
<\/article>
<\/>
);
}
`

const snippet10 = `
// Next.js: встроенная поддержка JSON-LD
import { Article } from 'schema-dts';
import { jsonLdScriptProps } from 'next/dist/lib/json-ld-script';

export default function ArticlePage() {
const jsonLd: Article = {
'@context': 'https://schema.org',
'@type': 'Article',
headline: 'Введение в Next.js',
image: 'https://example.com/nextjs-intro.jpg',
datePublished: '2025-02-04T08:00:00+00:00',
author: {
'@type': 'Person',
name: 'Иван Петров'
}
};

return (
<>
<script
  {...jsonLdScriptProps(jsonLd)}
/>
<article>
<h1>Введение в Next.js</h1>
{/* Контент */}
</article>
</>
);
}

// Или с помощью next-seo
import { ArticleJsonLd } from 'next-seo';

export default function ArticlePage() {
return (
<>
<ArticleJsonLd
  url="https://example.com/articles/nextjs-intro"
  title="Введение в Next.js"
  images={['https://example.com/nextjs-intro.jpg']}
  datePublished="2025-02-04T08:00:00+00:00"
  dateModified="2025-02-04T12:00:00+00:00"
  authorName="Иван Петров"
  description="Полное руководство по Next.js"
/>
<article>
{/* Контент */}
</article>
</>
);
}
`

const snippet11 = `
// TypeScript типы для Schema.org
import { Thing, Article, Product, BreadcrumbList } from 'schema-dts';

// Утилита для создания типизированной разметки
function createSchemaMarkup<T extends Thing>(schema: T): string {
return JSON.stringify({
'@context': 'https://schema.org',
...schema
});
}

// Пример использования
const articleSchema = createSchemaMarkup<Article>({
  '@type': 'Article',
  headline: 'Заголовок статьи',
  datePublished: '2025-02-04T08:00:00+00:00',
  author: {
  '@type': 'Person',
  name: 'Автор'
  }
  });

  // Валидация обязательных полей
  interface RequiredArticleFields {
  headline: string;
  datePublished: string;
  author: {
  name: string;
  };
  publisher: {
  name: string;
  logo: string;
  };
  }

  function createArticleSchema(fields: RequiredArticleFields): Article {
  return {
  '@type': 'Article',
  headline: fields.headline,
  datePublished: fields.datePublished,
  author: {
  '@type': 'Person',
  name: fields.author.name
  },
  publisher: {
  '@type': 'Organization',
  name: fields.publisher.name,
  logo: {
  '@type': 'ImageObject',
  url: fields.publisher.logo
  }
  }
  };
  }
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
  const highlightedSnippet11 = ref('')

  onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.markup, 'markup')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.markup, 'markup')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.markup, 'markup')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.markup, 'markup')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.markup, 'markup')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.markup, 'markup')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.markup, 'markup')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.markup, 'markup')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
  highlightedSnippet11.value = Prism.highlight(snippet11, Prism.languages.javascript, 'javascript')
  })

  </script>

  <template>
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col lg="8">
              <h1 class="text-h4 font-weight-bold mb-6">
                Schema.org разметка: Article, Product, Breadcrumb
              </h1>

              <p class="font-weight-regular mb-6">
                <b>Schema.org</b> — это словарь структурированных данных, который помогает поисковым системам
                лучше понимать содержимое веб-страниц. Разметка Schema.org позволяет создавать rich snippets
                (расширенные сниппеты) в результатах поиска, улучшая CTR и видимость сайта.
              </p>

              <h2 class="text-h5 font-weight-bold mb-3">Зачем нужна Schema.org разметка</h2>
              <v-table density="comfortable" class="mb-8">
                <thead>
                <tr>
                  <th class="text-left font-weight-bold">Преимущество</th>
                  <th class="text-left font-weight-bold">Описание</th>
                  <th class="text-left font-weight-bold">Влияние на SEO</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="pt-2 pb-2"><b>Rich Snippets</b></td>
                  <td class="pt-2 pb-2">Расширенные сниппеты с рейтингами, ценами, датами</td>
                  <td class="pt-2 pb-2">Увеличение CTR на 20-30%</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Knowledge Graph</b></td>
                  <td class="pt-2 pb-2">Информационные панели Google</td>
                  <td class="pt-2 pb-2">Повышение авторитетности</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Voice Search</b></td>
                  <td class="pt-2 pb-2">Оптимизация для голосовых помощников</td>
                  <td class="pt-2 pb-2">Лучшее ранжирование в голосовом поиске</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Понимание контекста</b></td>
                  <td class="pt-2 pb-2">Поисковики лучше понимают содержание</td>
                  <td class="pt-2 pb-2">Более точное ранжирование</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Структурированность</b></td>
                  <td class="pt-2 pb-2">Четкая семантическая структура контента</td>
                  <td class="pt-2 pb-2">Улучшение индексации</td>
                </tr>
                </tbody>
              </v-table>

              <h2 class="text-h5 font-weight-bold mb-3">Форматы Schema.org разметки</h2>
              <v-row class="mb-8">
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">JSON-LD</h3>
                    <p class="mb-2"><b>Рекомендуется Google</b></p>
                    <ul class="pl-4 mb-2">
                      <li>Отделен от HTML</li>
                      <li>Легко генерировать программно</li>
                      <li>Не влияет на вёрстку</li>
                      <li>Проще поддерживать</li>
                    </ul>
                    <v-chip color="success" size="small">Лучший выбор</v-chip>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Microdata</h3>
                    <p class="mb-2"><b>Встроен в HTML</b></p>
                    <ul class="pl-4 mb-2">
                      <li>Интегрирован в разметку</li>
                      <li>Сложнее поддерживать</li>
                      <li>Может влиять на вёрстку</li>
                      <li>Устаревает</li>
                    </ul>
                    <v-chip color="warning" size="small">Устаревает</v-chip>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">RDFa</h3>
                    <p class="mb-2"><b>Альтернатива Microdata</b></p>
                    <ul class="pl-4 mb-2">
                      <li>Более гибкий синтаксис</li>
                      <li>Сложнее в использовании</li>
                      <li>Реже применяется</li>
                      <li>Избыточен для большинства случаев</li>
                    </ul>
                    <v-chip color="error" size="small">Не рекомендуется</v-chip>
                  </v-card>
                </v-col>
              </v-row>

              <h2 class="text-h5 font-weight-bold mb-3">1. Article — разметка статей</h2>
              <p class="font-weight-regular mb-4">
                Используется для статей, новостей, блог-постов. Помогает Google показывать статьи в новостной ленте,
                Google Discover и создавать rich snippets с датами, авторами и изображениями.
              </p>
              <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

              <h3 class="text-h6 font-weight-bold mb-3">Microdata вариант (для сравнения)</h3>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">2. Product — разметка товаров</h2>
              <p class="font-weight-regular mb-4">
                Для товаров в интернет-магазинах. Отображает цену, наличие, рейтинг и отзывы прямо в результатах поиска.
                Критично для e-commerce проектов.
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">3. Breadcrumb — хлебные крошки</h2>
              <p class="font-weight-regular mb-4">
                Навигационная цепочка, показывающая путь пользователя на сайте. Google использует для отображения
                структуры сайта в результатах поиска вместо URL.
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">4. Organization — информация об организации</h2>
              <p class="font-weight-regular mb-4">
                Базовая информация о компании, логотип, контакты. Используется для Knowledge Graph и контактной информации.
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">5. WebSite — разметка сайта с поиском</h2>
              <p class="font-weight-regular mb-4">
                Добавляет поисковую строку прямо в результатах Google (sitelinks searchbox).
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">6. FAQPage — страница с вопросами и ответами</h2>
              <p class="font-weight-regular mb-4">
                Позволяет отображать FAQ прямо в результатах поиска с возможностью разворачивания ответов.
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">7. Event — разметка мероприятий</h2>
              <p class="font-weight-regular mb-4">
                Для событий, конференций, вебинаров. Позволяет добавлять события в Google Calendar прямо из поиска.
              </p>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">Реализация в React приложениях</h2>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">Next.js и Schema.org</h2>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">TypeScript типизация</h2>
              <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet11"></code></pre>

              <h2 class="text-h5 font-weight-bold mb-3">Обязательные и рекомендуемые поля</h2>
              <v-row class="mb-8">
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Article</h3>
                    <p class="mb-2"><b>Обязательные:</b></p>
                    <ul class="pl-4 mb-2">
                      <li>headline</li>
                      <li>datePublished</li>
                      <li>author</li>
                      <li>publisher</li>
                      <li>image</li>
                    </ul>
                    <p class="mb-2"><b>Рекомендуемые:</b></p>
                    <ul class="pl-4">
                      <li>dateModified</li>
                      <li>description</li>
                      <li>mainEntityOfPage</li>
                    </ul>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Product</h3>
                    <p class="mb-2"><b>Обязательные:</b></p>
                    <ul class="pl-4 mb-2">
                      <li>name</li>
                      <li>image</li>
                      <li>offers (price, availability)</li>
                    </ul>
                    <p class="mb-2"><b>Рекомендуемые:</b></p>
                    <ul class="pl-4">
                      <li>description</li>
                      <li>brand</li>
                      <li>sku</li>
                      <li>aggregateRating</li>
                      <li>review</li>
                    </ul>
                  </v-card>
                </v-col>
              </v-row>

              <h2 class="text-h5 font-weight-bold mb-3">Инструменты для проверки</h2>
              <v-row class="mb-8">
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Google Rich Results Test</h3>
                    <p class="mb-2">Официальный инструмент Google для проверки структурированных данных</p>
                    <v-btn size="small" variant="outlined" href="https://search.google.com/test/rich-results" target="_blank">
                      Открыть
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Schema.org Validator</h3>
                    <p class="mb-2">Проверка синтаксиса и валидности разметки Schema.org</p>
                    <v-btn size="small" variant="outlined" href="https://validator.schema.org/" target="_blank">
                      Открыть
                    </v-btn>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card class="pa-4 h-100">
                    <h3 class="text-h6 font-weight-bold mb-2">Structured Data Linter</h3>
                    <p class="mb-2">Детальный анализ JSON-LD разметки с подсветкой ошибок</p>
                    <v-btn size="small" variant="outlined" href="https://linter.structured-data.org/" target="_blank">
                      Открыть
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>

              <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки при реализации</h2>
              <v-row class="mb-8">
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100 bg-error" variant="tonal">
                    <h3 class="text-h6 font-weight-bold mb-2">❌ Неправильно</h3>
                    <ul class="pl-4">
                      <li>Отсутствие обязательных полей</li>
                      <li>Некорректный формат дат (нужен ISO 8601)</li>
                      <li>Дублирование разметки на странице</li>
                      <li>Несоответствие разметки видимому контенту</li>
                      <li>Невалидный JSON (забыли запятую, кавычки)</li>
                    </ul>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="pa-4 h-100 bg-success" variant="tonal">
                    <h3 class="text-h6 font-weight-bold mb-2">✅ Правильно</h3>
                    <ul class="pl-4">
                      <li>Все обязательные поля заполнены</li>
                      <li>Даты в ISO формате: 2025-02-04T08:00:00+00:00</li>
                      <li>Одна разметка одного типа на страницу</li>
                      <li>Разметка совпадает с контентом</li>
                      <li>JSON валиден и проверен инструментами</li>
                    </ul>
                  </v-card>
                </v-col>
              </v-row>

              <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
              <ol class="ol-list mb-8">
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Что такое Schema.org и зачем оно нужно?</p>
                  <p class="font-weight-regular ma-0">
                    Schema.org — это словарь структурированных данных, который помогает поисковым системам понимать содержимое страниц. Позволяет создавать rich snippets в поисковой выдаче, что увеличивает CTR и видимость сайта.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Какой формат разметки лучше использовать: JSON-LD, Microdata или RDFa?</p>
                  <p class="font-weight-regular ma-0">
                    Google рекомендует JSON-LD, так как он отделен от HTML, легко генерируется программно и не влияет на вёрстку. Microdata встроен в HTML, но сложнее поддерживать. RDFa избыточен для большинства задач.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Как проверить правильность Schema.org разметки?</p>
                  <p class="font-weight-regular ma-0">
                    Используйте Google Rich Results Test для проверки поддержки rich snippets, Schema.org Validator для валидации синтаксиса, и Structured Data Linter для детального анализа JSON-LD.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Какие обязательные поля для Article разметки?</p>
                  <p class="font-weight-regular ma-0">
                    Обязательные: headline, datePublished, author (с полем name), publisher (с полями name и logo), image. Рекомендуемые: dateModified, description, mainEntityOfPage.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">В чем разница между Article, NewsArticle и BlogPosting?</p>
                  <p class="font-weight-regular ma-0">
                    Article — базовый тип для любых статей. NewsArticle — для новостных статей с актуальностью. BlogPosting — для блог-постов. NewsArticle и BlogPosting наследуют от Article и добавляют специфичные поля.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Как динамически генерировать Schema.org в React/Next.js?</p>
                  <p class="font-weight-regular ma-0">
                    В React используйте react-helmet для вставки JSON-LD в head. В Next.js используйте встроенную поддержку через next/head или библиотеку next-seo с компонентами типа ArticleJsonLd.
                  </p>
                </li>
                <li class="mb-4">
                  <p class="font-weight-bold mb-1">Гарантирует ли Schema.org появление rich snippets?</p>
                  <p class="font-weight-regular ma-0">
                    Нет. Schema.org — это рекомендация для поисковиков, но они сами решают, показывать ли rich snippets. Зависит от качества контента, релевантности запроса и других факторов ранжирования.
                  </p>
                </li>
              </ol>

              <h2 class="text-h5 font-weight-bold mb-3">Best Practices</h2>
              <v-alert type="info" class="mb-6">
                <template v-slot:prepend>
                  <v-icon>mdi-lightbulb-outline</v-icon>
                </template>
                <div>
                  <p class="mb-2 font-weight-bold">Рекомендации по внедрению Schema.org:</p>
                  <ul class="pl-4 ma-0">
                    <li>Используйте JSON-LD формат для новых проектов</li>
                    <li>Добавляйте разметку только для контента, который действительно есть на странице</li>
                    <li>Проверяйте разметку перед деплоем через Google Rich Results Test</li>
                    <li>Используйте TypeScript типы из пакета schema-dts для безопасности</li>
                    <li>Генерируйте разметку программно, а не хардкодьте</li>
                    <li>Обновляйте dateModified при изменении контента</li>
                    <li>Следите за обновлениями документации Schema.org</li>
                  </ul>
                </div>
              </v-alert>

              <h2 class="text-h5 font-weight-bold mb-3">Влияние на SEO метрики</h2>
              <v-table density="comfortable" class="mb-8">
                <thead>
                <tr>
                  <th class="text-left font-weight-bold">Метрика</th>
                  <th class="text-left font-weight-bold">Влияние Schema.org</th>
                  <th class="text-left font-weight-bold">Примерное улучшение</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="pt-2 pb-2"><b>CTR</b></td>
                  <td class="pt-2 pb-2">Rich snippets привлекают больше кликов</td>
                  <td class="pt-2 pb-2">+20-30%</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Видимость</b></td>
                  <td class="pt-2 pb-2">Появление в специальных блоках (карусели, карточки)</td>
                  <td class="pt-2 pb-2">+15-25%</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Позиции</b></td>
                  <td class="pt-2 pb-2">Косвенное улучшение через поведенческие факторы</td>
                  <td class="pt-2 pb-2">+5-10%</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Индексация</b></td>
                  <td class="pt-2 pb-2">Лучшее понимание контента роботами</td>
                  <td class="pt-2 pb-2">Качественное</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Voice Search</b></td>
                  <td class="pt-2 pb-2">Оптимизация для голосовых помощников</td>
                  <td class="pt-2 pb-2">Значительное</td>
                </tr>
                </tbody>
              </v-table>

              <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
              <p class="font-weight-regular mb-6">
                Schema.org разметка — это мощный инструмент для улучшения видимости сайта в поисковых системах. Article, Product и Breadcrumb — наиболее важные типы разметки для контентных и коммерческих сайтов. JSON-LD формат является рекомендуемым способом реализации. Правильное внедрение Schema.org увеличивает CTR на 20-30% и улучшает индексацию контента. Обязательно проверяйте разметку через Google Rich Results Test перед публикацией.
              </p>

              <div class="d-flex justify-end gap-2">
                <v-btn
                  color='second'
                  size="small"
                  variant="elevated"
                  href="https://schema.org/"
                  target="_blank">
                  Schema.org Documentation
                </v-btn>
                <v-btn
                  color='second'
                  size="small"
                  variant="elevated"
                  href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
                  target="_blank">
                  Google Structured Data Guide
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
      color: #ccc;
      overflow-x: auto;
    }

    .gap-2 {
      gap: 8px;
    }
  </style>
