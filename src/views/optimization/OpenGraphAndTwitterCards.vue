<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
<!-- Базовые Open Graph мета-теги -->
<head>
  <!-- Обязательные OG теги -->
  <meta property="og:title" content="Заголовок страницы для социальных сетей">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:image" content="https://example.com/images/og-image.jpg">

  <!-- Рекомендуемые OG теги -->
  <meta property="og:description" content="Описание страницы, которое увидят пользователи">
  <meta property="og:site_name" content="Название сайта">
  <meta property="og:locale" content="ru_RU">

  <!-- Дополнительные мета-теги для изображения -->
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Описание изображения">
  <meta property="og:image:type" content="image/jpeg">
</head>
`

const snippet2 = `
<!-- Open Graph для разных типов контента -->

<!-- Статья / Блог пост -->
<meta property="og:type" content="article">
<meta property="article:published_time" content="2025-02-03T10:00:00Z">
<meta property="article:modified_time" content="2025-02-03T15:30:00Z">
<meta property="article:author" content="https://example.com/author/john">
<meta property="article:section" content="Technology">
<meta property="article:tag" content="JavaScript">
<meta property="article:tag" content="Frontend">

<!-- Видео контент -->
<meta property="og:type" content="video.movie">
<meta property="og:video" content="https://example.com/video.mp4">
<meta property="og:video:secure_url" content="https://example.com/video.mp4">
<meta property="og:video:type" content="video/mp4">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">
<meta property="og:video:duration" content="300">

<!-- Музыка -->
<meta property="og:type" content="music.song">
<meta property="music:duration" content="240">
<meta property="music:album" content="Album Name">
<meta property="music:musician" content="Artist Name">

<!-- Продукт / E-commerce -->
<meta property="og:type" content="product">
<meta property="product:price:amount" content="49.99">
<meta property="product:price:currency" content="USD">
<meta property="product:availability" content="in stock">
<meta property="product:condition" content="new">
`

const snippet3 = `
<!-- Twitter Card мета-теги -->

<!-- Summary Card (по умолчанию) -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@username">
<meta name="twitter:creator" content="@author">
<meta name="twitter:title" content="Заголовок для Twitter">
<meta name="twitter:description" content="Описание для Twitter">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
<meta name="twitter:image:alt" content="Описание изображения">

<!-- Summary Card с большим изображением -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:creator" content="@author">
<meta name="twitter:title" content="Заголовок статьи">
<meta name="twitter:description" content="Подробное описание контента">
<meta name="twitter:image" content="https://example.com/large-image.jpg">

<!-- App Card (для мобильных приложений) -->
<meta name="twitter:card" content="app">
<meta name="twitter:site" content="@username">
<meta name="twitter:description" content="Описание приложения">
<meta name="twitter:app:name:iphone" content="App Name">
<meta name="twitter:app:id:iphone" content="123456789">
<meta name="twitter:app:url:iphone" content="app://open">
<meta name="twitter:app:name:googleplay" content="App Name">
<meta name="twitter:app:id:googleplay" content="com.example.app">

<!-- Player Card (для медиа-контента) -->
<meta name="twitter:card" content="player">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="Название видео">
<meta name="twitter:description" content="Описание видео">
<meta name="twitter:player" content="https://example.com/player">
<meta name="twitter:player:width" content="1280">
<meta name="twitter:player:height" content="720">
<meta name="twitter:image" content="https://example.com/video-thumbnail.jpg">
`

const snippet4 = `
<!-- Полный набор мета-тегов для всех платформ -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Основные мета-теги -->
  <title>Заголовок страницы - Сайт</title>
  <meta name="description" content="Описание страницы для поисковых систем">
  <link rel="canonical" href="https://example.com/page">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:title" content="Заголовок для Facebook">
  <meta property="og:description" content="Описание для Facebook">
  <meta property="og:image" content="https://example.com/images/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Описание изображения">
  <meta property="og:site_name" content="Название сайта">
  <meta property="og:locale" content="ru_RU">
  <meta property="article:author" content="https://example.com/author">
  <meta property="article:published_time" content="2025-02-03T10:00:00Z">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@username">
  <meta name="twitter:creator" content="@author">
  <meta name="twitter:title" content="Заголовок для Twitter">
  <meta name="twitter:description" content="Описание для Twitter">
  <meta name="twitter:image" content="https://example.com/images/twitter-image.jpg">
  <meta name="twitter:image:alt" content="Описание изображения">

  <!-- Альтернативные изображения -->
  <meta property="og:image" content="https://example.com/images/og-square.jpg">
  <meta property="og:image:width" content="1080">
  <meta property="og:image:height" content="1080">
</head>
<body>
  <!-- Контент страницы -->
</body>
</html>
`

const snippet5 = `
// React компонент для динамической генерации мета-тегов
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

export function SEO({
  title,
  description,
  image = '/default-og-image.jpg',
  url = window.location.href,
  type = 'website',
  author,
  publishedTime,
  tags = []
}: SEOProps) {
  const siteName = 'Название сайта';
  const twitterHandle = '@username';

  // Абсолютный URL для изображения
  const absoluteImageUrl = image.startsWith('http')
    ? image
    : \`\${window.location.origin}\${image}\`;

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title} - {siteName}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Дополнительные теги для статей */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}

// Использование компонента
function ArticlePage() {
  return (
    <>
      <SEO
        title="Заголовок статьи"
        description="Описание статьи для социальных сетей"
        image="/images/article-cover.jpg"
        type="article"
        author="https://example.com/author/john"
        publishedTime="2025-02-03T10:00:00Z"
        tags={['JavaScript', 'React', 'Frontend']}
      />
      <article>
        {/* Контент статьи */}
      </article>
    </>
  );
}
`

const snippet6 = `
// Next.js - метаданные через Metadata API (App Router)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заголовок страницы',
  description: 'Описание страницы',
  openGraph: {
    type: 'article',
    url: 'https://example.com/article',
    title: 'Заголовок для OG',
    description: 'Описание для OG',
    siteName: 'Название сайта',
    locale: 'ru_RU',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Описание изображения',
      },
      {
        url: 'https://example.com/og-image-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Квадратное изображение',
      }
    ],
    article: {
      publishedTime: '2025-02-03T10:00:00Z',
      modifiedTime: '2025-02-03T15:00:00Z',
      authors: ['https://example.com/author'],
      tags: ['JavaScript', 'Next.js'],
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@username',
    creator: '@author',
    title: 'Заголовок для Twitter',
    description: 'Описание для Twitter',
    images: ['https://example.com/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://example.com/article',
  }
};

export default function ArticlePage() {
  return (
    <article>
      <h1>Заголовок статьи</h1>
      {/* Контент */}
    </article>
  );
}

// Динамическая генерация метаданных
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await fetchArticle(params.slug);

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: 'article',
      article: {
        publishedTime: article.publishedAt,
        authors: [article.author.url],
        tags: article.tags,
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    }
  };
}
`

const snippet7 = `
<!-- Vue.js с vue-meta или @vueuse/head -->
<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';

interface Props {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  image: '/default-og.jpg',
  type: 'website'
});

const siteUrl = 'https://example.com';
const siteName = 'Название сайта';

const absoluteImage = computed(() =>
  props.image.startsWith('http')
    ? props.image
    : \`\${siteUrl}\${props.image}\`
);

useHead({
  title: \`\${props.title} - \${siteName}\`,
  meta: [
    { name: 'description', content: props.description },

    // Open Graph
    { property: 'og:type', content: props.type },
    { property: 'og:url', content: window.location.href },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: absoluteImage.value },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: siteName },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@username' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: absoluteImage.value },
  ]
});
<\/script>

<template>
  <article>
    <h1>{{ title }}</h1>
    <!-- Контент -->
  </article>
</template>

<!-- Использование компонента -->
<script setup>
import ArticleSEO from './ArticleSEO.vue';

const article = {
  title: 'Заголовок статьи',
  description: 'Описание статьи',
  image: '/images/article.jpg'
};
<\/script>

<template>
  <ArticleSEO
    :title="article.title"
    :description="article.description"
    :image="article.image"
    type="article"
  />
</template>
`

const snippet8 = `
// Тестирование и валидация Open Graph

// 1. Facebook Sharing Debugger
// https://developers.facebook.com/tools/debug/
// Проверяет OG теги, показывает предпросмотр, очищает кеш

// 2. Twitter Card Validator
// https://cards-dev.twitter.com/validator
// Проверяет Twitter Card теги, показывает превью

// 3. LinkedIn Post Inspector
// https://www.linkedin.com/post-inspector/
// Валидирует для LinkedIn

// 4. Автоматическое тестирование
import { JSDOM } from 'jsdom';

async function validateOpenGraph(url: string) {
const response = await fetch(url);
const html = await response.text();
const dom = new JSDOM(html);
const document = dom.window.document;

const errors: string[] = [];
const warnings: string[] = [];

// Проверка обязательных OG тегов
const requiredOGTags = ['og:title', 'og:type', 'og:image', 'og:url'];

requiredOGTags.forEach(tag => {
const element = document.querySelector(\`meta[property="\${tag}"]\`);
if (!element || !element.getAttribute('content')) {
errors.push(\`Отсутствует обязательный тег: \${tag}\`);
}
});

// Проверка изображения
const ogImage = document.querySelector('meta[property="og:image"]');
if (ogImage) {
const imageUrl = ogImage.getAttribute('content');
if (imageUrl && !imageUrl.startsWith('http')) {
warnings.push('og:image должен быть абсолютным URL');
}

const width = document.querySelector('meta[property="og:image:width"]');
const height = document.querySelector('meta[property="og:image:height"]');

if (!width || !height) {
warnings.push('Рекомендуется указать og:image:width и og:image:height');
}
}

// Проверка Twitter Card
const twitterCard = document.querySelector('meta[name="twitter:card"]');
if (!twitterCard) {
warnings.push('Отсутствует twitter:card');
}

// Проверка длины текста
const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) {
const titleLength = ogTitle.getAttribute('content')?.length || 0;
if (titleLength > 60) {
warnings.push('og:title превышает рекомендуемые 60 символов');
}
}

const ogDescription = document.querySelector('meta[property="og:description"]');
if (ogDescription) {
const descLength = ogDescription.getAttribute('content')?.length || 0;
if (descLength > 200) {
warnings.push('og:description превышает рекомендуемые 200 символов');
}
if (descLength < 50) {
warnings.push('og:description слишком короткое (минимум 50 символов)');
}
}

return { errors, warnings };
}

// Использование
const result = await validateOpenGraph('https://example.com/article');
console.log('Errors:', result.errors);
console.log('Warnings:', result.warnings);
`

const snippet9 = `
// Генерация изображений для Open Graph динамически
// С использованием Vercel OG Image Generation

// app/api/og/route.tsx (Next.js)
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
const { searchParams } = new URL(request.url);
const title = searchParams.get('title') || 'Заголовок по умолчанию';
const description = searchParams.get('description') || '';

return new ImageResponse(
(
<div
  style={{
  height: '100%',
width: '100%',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#1a1a1a',
backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}}
>
<div
  style={{
  display: 'flex',
flexDirection: 'column',
padding: '60px',
color: 'white',
}}
>
<h1
  style={{
  fontSize: '72px',
fontWeight: 'bold',
margin: 0,
marginBottom: '20px',
}}
>
{title}
</h1>
{description && (
<p
  style={{
  fontSize: '32px',
opacity: 0.8,
margin: 0,
}}
>
{description}
</p>
)}
</div>
</div>
),
{
width: 1200,
height: 630,
}
);
}

// Использование в метаданных
export const metadata = {
openGraph: {
images: [
{
url: '/api/og?title=Моя статья&description=Описание',
width: 1200,
height: 630,
}
],
},
};

// Альтернатива: node-canvas для серверного рендеринга
import { createCanvas, loadImage } from 'canvas';

async function generateOGImage(
title: string,
description: string
): Promise<Buffer> {
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Фон с градиентом
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Заголовок
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 72px Arial';
ctx.textAlign = 'center';

// Перенос текста на новую строку
const maxWidth = width - 120;
const words = title.split(' ');
let line = '';
let y = 250;

words.forEach((word) => {
const testLine = line + word + ' ';
const metrics = ctx.measureText(testLine);

if (metrics.width > maxWidth && line !== '') {
ctx.fillText(line, width / 2, y);
line = word + ' ';
y += 80;
} else {
line = testLine;
}
});
ctx.fillText(line, width / 2, y);

// Описание
if (description) {
ctx.font = '32px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.fillText(description, width / 2, y + 60);
}

return canvas.toBuffer('image/jpeg');
}
`

const snippet10 = `
// Best practices и чек-лист

/**
* РАЗМЕРЫ ИЗОБРАЖЕНИЙ
*/
const OG_IMAGE_RECOMMENDATIONS = {
facebook: {
recommended: { width: 1200, height: 630 },
minimum: { width: 600, height: 315 },
ratio: '1.91:1',
format: 'JPG или PNG',
maxSize: '8 MB'
},
twitter: {
summary: { width: 120, height: 120, ratio: '1:1' },
summaryLargeImage: { width: 1200, height: 628, ratio: '1.91:1' },
format: 'JPG, PNG, WEBP, GIF',
maxSize: '5 MB'
},
linkedin: {
recommended: { width: 1200, height: 627 },
ratio: '1.91:1',
format: 'JPG или PNG',
maxSize: '5 MB'
}
};

/**
* ДЛИНА ТЕКСТА
*/
const TEXT_LENGTH_LIMITS = {
title: {
facebook: 60, // символов
twitter: 70,
linkedin: 70
},
description: {
facebook: 200,
twitter: 200,
linkedin: 256
}
};

/**
* ЧЕК-ЛИСТ ДЛЯ ПРОВЕРКИ
*/
const OG_CHECKLIST = [
// Обязательные теги
'✓ og:title',
'✓ og:type',
'✓ og:image',
'✓ og:url',

// Рекомендуемые теги
'✓ og:description',
'✓ og:site_name',
'✓ og:locale',

// Изображение
'✓ og:image:width',
'✓ og:image:height',
'✓ og:image:alt',
'✓ Абсолютный URL для изображения',
'✓ HTTPS для изображения',
'✓ Размер изображения 1200x630',

// Twitter
'✓ twitter:card',
'✓ twitter:site',
'✓ twitter:creator (для статей)',

// Дополнительно
'✓ Каноническая ссылка (canonical)',
'✓ Мобильная версия изображения',
'✓ Альтернативные изображения (квадрат для Instagram)',
];

/**
* ЧАСТЫЕ ОШИБКИ
*/
const COMMON_MISTAKES = {
'Относительные URL для изображений': {
wrong: '<meta property="og:image" content="/image.jpg">',
correct: '<meta property="og:image" content="https://example.com/image.jpg">'
},

'HTTP вместо HTTPS': {
wrong: '<meta property="og:image" content="http://example.com/image.jpg">',
correct: '<meta property="og:image" content="https://example.com/image.jpg">'
},

'Дублирование og:title и title': {
note: 'og:title может отличаться от <title> - оптимизируйте для соцсетей'
  },

  'Отсутствие og:image:alt': {
  note: 'Важно для доступности и SEO'
  },

  'Слишком маленькое изображение': {
  note: 'Минимум 600x315px, рекомендуется 1200x630px'
  },

  'Забыли протестировать': {
  note: 'Всегда проверяйте через Facebook Debugger и Twitter Card Validator'
  }
  };

  /**
  * ПОЛЕЗНЫЕ ИНСТРУМЕНТЫ
  */
  const USEFUL_TOOLS = [
  {
  name: 'Facebook Sharing Debugger',
  url: 'https://developers.facebook.com/tools/debug/',
  purpose: 'Проверка OG тегов, очистка кеша Facebook'
  },
  {
  name: 'Twitter Card Validator',
  url: 'https://cards-dev.twitter.com/validator',
  purpose: 'Валидация Twitter Cards'
  },
  {
  name: 'LinkedIn Post Inspector',
  url: 'https://www.linkedin.com/post-inspector/',
  purpose: 'Проверка для LinkedIn'
  },
  {
  name: 'OpenGraph.xyz',
  url: 'https://www.opengraph.xyz/',
  purpose: 'Быстрая проверка OG тегов'
  },
  {
  name: 'metatags.io',
  url: 'https://metatags.io/',
  purpose: 'Генератор и превью мета-тегов'
  },
  {
  name: 'Cloudinary',
  url: 'https://cloudinary.com/',
  purpose: 'Автоматическая оптимизация изображений'
  }
  ];
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
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.markup, 'markup')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
  })

  </script>

  <template>
  <v-app>
  <v-container>
  <v-row justify="center">
  <v-col lg="8">
  <h1 class="text-h4 font-weight-bold mb-6">
  Open Graph и Twitter Cards для соцсетей
  </h1>

  <p class="font-weight-regular mb-6">
  <b>Open Graph</b> и <b>Twitter Cards</b> — это протоколы метаданных, которые контролируют,
  как ваш контент отображается при публикации в социальных сетях. Правильная настройка
  этих мета-тегов критически важна для улучшения кликабельности, вовлеченности и
  распространения контента в соцсетях.
  </p>

  <h2 class="text-h5 font-weight-bold mb-3">Зачем нужны Open Graph и Twitter Cards</h2>
  <v-table density="comfortable" class="mb-8">
  <thead>
  <tr>
  <th class="text-left font-weight-bold">Преимущество</th>
  <th class="text-left font-weight-bold">Описание</th>
  <th class="text-left font-weight-bold">Влияние</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td class="pt-2 pb-2"><b>Контроль превью</b></td>
  <td class="pt-2 pb-2">Вы определяете заголовок, описание и изображение</td>
  <td class="pt-2 pb-2">↑ Кликабельность на 2-3x</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>Брендинг</b></td>
  <td class="pt-2 pb-2">Единообразное представление во всех соцсетях</td>
  <td class="pt-2 pb-2">↑ Узнаваемость бренда</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>SEO косвенно</b></td>
  <td class="pt-2 pb-2">Больше шеров → больше трафика → лучше ранжирование</td>
  <td class="pt-2 pb-2">↑ Органический трафик</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>Аналитика</b></td>
  <td class="pt-2 pb-2">Отслеживание распространения контента</td>
  <td class="pt-2 pb-2">↑ Понимание аудитории</td>
  </tr>
  </tbody>
  </v-table>

  <h2 class="text-h5 font-weight-bold mb-3">1. Базовые Open Graph теги</h2>
  <p class="font-weight-regular mb-4">
  Минимальный набор обязательных OG-тегов для Facebook, LinkedIn и других платформ:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">2. Open Graph для разных типов контента</h2>
  <p class="font-weight-regular mb-4">
  Специфичные теги для статей, видео, музыки и продуктов:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">3. Twitter Cards</h2>
  <p class="font-weight-regular mb-4">
  Twitter использует свои собственные мета-теги с fallback на Open Graph:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">4. Полный набор мета-тегов</h2>
  <p class="font-weight-regular mb-4">
  Комплексный пример с поддержкой всех платформ:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">5. React компонент для SEO</h2>
  <p class="font-weight-regular mb-4">
  Динамическая генерация мета-тегов в React приложении:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">6. Next.js Metadata API</h2>
  <p class="font-weight-regular mb-4">
  Современный подход к метаданным в Next.js App Router:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">7. Vue.js с useHead</h2>
  <p class="font-weight-regular mb-4">
  Управление мета-тегами в Vue.js через @vueuse/head:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">8. Валидация и тестирование</h2>
  <p class="font-weight-regular mb-4">
  Автоматическая проверка Open Graph тегов:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">9. Динамическая генерация OG изображений</h2>
  <p class="font-weight-regular mb-4">
  Создание уникальных превью для каждой страницы:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">10. Best Practices и чек-лист</h2>
  <p class="font-weight-regular mb-4">
  Рекомендации, частые ошибки и полезные инструменты:
  </p>
  <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

  <h2 class="text-h5 font-weight-bold mb-3">Требования к изображениям</h2>
  <v-table density="comfortable" class="mb-8">
  <thead>
  <tr>
  <th class="text-left font-weight-bold">Платформа</th>
  <th class="text-left font-weight-bold">Рекомендуемый размер</th>
  <th class="text-left font-weight-bold">Соотношение</th>
  <th class="text-left font-weight-bold">Формат</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td class="pt-2 pb-2"><b>Facebook/LinkedIn</b></td>
  <td class="pt-2 pb-2">1200 × 630px</td>
  <td class="pt-2 pb-2">1.91:1</td>
  <td class="pt-2 pb-2">JPG, PNG (до 8MB)</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>Twitter Summary</b></td>
  <td class="pt-2 pb-2">120 × 120px</td>
  <td class="pt-2 pb-2">1:1</td>
  <td class="pt-2 pb-2">JPG, PNG, WebP, GIF</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>Twitter Large Image</b></td>
  <td class="pt-2 pb-2">1200 × 628px</td>
  <td class="pt-2 pb-2">1.91:1</td>
  <td class="pt-2 pb-2">JPG, PNG, WebP (до 5MB)</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>Instagram (квадрат)</b></td>
  <td class="pt-2 pb-2">1080 × 1080px</td>
  <td class="pt-2 pb-2">1:1</td>
  <td class="pt-2 pb-2">JPG, PNG</td>
  </tr>
  </tbody>
  </v-table>

  <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки</h2>
  <v-row class="mb-8">
  <v-col cols="12" md="6">
  <v-card class="pa-4 h-100" color="error" variant="tonal">
  <h3 class="text-h6 font-weight-bold mb-3">❌ Не делайте</h3>
  <ul class="pl-4">
  <li>Относительные URL для изображений</li>
  <li>HTTP вместо HTTPS</li>
  <li>Слишком длинные заголовки (>60 символов)</li>
  <li>Отсутствие og:image:alt</li>
  <li>Маленькие изображения (<600x315px)</li>
  <li>Забыть протестировать в дебаггерах</li>
  </ul>
  </v-card>
  </v-col>
  <v-col cols="12" md="6">
  <v-card class="pa-4 h-100" color="success" variant="tonal">
  <h3 class="text-h6 font-weight-bold mb-3">✅ Делайте</h3>
  <ul class="pl-4">
  <li>Абсолютные HTTPS URL</li>
  <li>Оптимизируйте заголовки для соцсетей</li>
  <li>Добавляйте alt-текст к изображениям</li>
  <li>Используйте размер 1200x630px</li>
  <li>Тестируйте через валидаторы</li>
  <li>Добавляйте альтернативные изображения</li>
  </ul>
  </v-card>
  </v-col>
  </v-row>

  <h2 class="text-h5 font-weight-bold mb-3">Инструменты для проверки</h2>
  <v-row class="mb-8">
  <v-col cols="12" md="4">
  <v-card class="pa-4 h-100">
  <h3 class="text-h6 font-weight-bold mb-2">Facebook</h3>
  <p class="mb-2">Sharing Debugger</p>
  <v-chip size="small" class="ma-1">Очистка кеша</v-chip>
  <v-chip size="small" class="ma-1">Превью карточки</v-chip>
  </v-card>
  </v-col>
  <v-col cols="12" md="4">
  <v-card class="pa-4 h-100">
  <h3 class="text-h6 font-weight-bold mb-2">Twitter</h3>
  <p class="mb-2">Card Validator</p>
  <v-chip size="small" class="ma-1">Типы карточек</v-chip>
  <v-chip size="small" class="ma-1">Превью</v-chip>
  </v-card>
  </v-col>
  <v-col cols="12" md="4">
  <v-card class="pa-4 h-100">
  <h3 class="text-h6 font-weight-bold mb-2">LinkedIn</h3>
  <p class="mb-2">Post Inspector</p>
  <v-chip size="small" class="ma-1">Валидация</v-chip>
  <v-chip size="small" class="ma-1">Обновление кеша</v-chip>
  </v-card>
  </v-col>
  </v-row>

  <h2 class="text-h5 font-weight-bold mb-3">Часто задаваемые вопросы на собеседовании</h2>
  <ol class="ol-list mb-8">
  <li class="mb-4">
  <p class="font-weight-bold mb-1">В чем разница между Open Graph и Twitter Cards?</p>
  <p class="font-weight-regular ma-0">
  Open Graph — универсальный протокол (Facebook, LinkedIn, Discord). Twitter Cards —
  специфичны для Twitter, но Twitter также поддерживает OG как fallback. Для полной
  поддержки используйте оба.
  </p>
  </li>
  <li class="mb-4">
  <p class="font-weight-bold mb-1">Какие теги обязательны для Open Graph?</p>
  <p class="font-weight-regular ma-0">
  Обязательны 4 тега: <code>og:title</code>, <code>og:type</code>, <code>og:image</code>,
  <code>og:url</code>. Рекомендуется также добавить <code>og:description</code>,
  <code>og:site_name</code> и размеры изображения.
  </p>
  </li>
  <li class="mb-4">
  <p class="font-weight-bold mb-1">Почему изображение не обновляется в Facebook?</p>
  <p class="font-weight-regular ma-0">
  Facebook кеширует OG-данные. Используйте Facebook Sharing Debugger для принудительной
  очистки кеша. Также убедитесь, что используете абсолютный HTTPS URL.
  </p>
  </li>
  <li class="mb-4">
  <p class="font-weight-bold mb-1">Как динамически генерировать OG изображения?</p>
  <p class="font-weight-regular ma-0">
  В Next.js используйте <code>ImageResponse</code> API или Vercel OG. Для других
  фреймворков — node-canvas, Puppeteer или сервисы типа Cloudinary Dynamic Images.
  </p>
  </li>
  <li class="mb-4">
  <p class="font-weight-bold mb-1">Нужны ли отдельные изображения для каждой соцсети?</p>
  <p class="font-weight-regular ma-0">
  Идеально — да (1.91:1 для Facebook, 1:1 для Instagram). Но минимум — одно изображение
  1200×630px работает везде. Используйте <code>&lt;picture&gt;</code> для альтернатив.
  </p>
  </li>
  <li class="mb-4">
  <p class="font-weight-bold mb-1">Влияют ли OG теги на SEO напрямую?</p>
  <p class="font-weight-regular ma-0">
  Напрямую нет — Google не использует их для ранжирования. Но косвенно да: больше кликов
  из соцсетей → больше трафика → лучше поведенческие факторы → выше позиции.
  </p>
  </li>
  </ol>

  <h2 class="text-h5 font-weight-bold mb-3">Рекомендации по тексту</h2>
  <v-table density="comfortable" class="mb-8">
  <thead>
  <tr>
  <th class="text-left font-weight-bold">Элемент</th>
  <th class="text-left font-weight-bold">Оптимальная длина</th>
  <th class="text-left font-weight-bold">Максимум</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td class="pt-2 pb-2"><b>og:title</b></td>
  <td class="pt-2 pb-2">40-60 символов</td>
  <td class="pt-2 pb-2">60 символов</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>og:description</b></td>
  <td class="pt-2 pb-2">150-200 символов</td>
  <td class="pt-2 pb-2">200 символов</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>twitter:title</b></td>
  <td class="pt-2 pb-2">50-70 символов</td>
  <td class="pt-2 pb-2">70 символов</td>
  </tr>
  <tr>
  <td class="pt-2 pb-2"><b>twitter:description</b></td>
  <td class="pt-2 pb-2">100-200 символов</td>
  <td class="pt-2 pb-2">200 символов</td>
  </tr>
  </tbody>
  </v-table>

  <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
  <p class="font-weight-regular mb-6">
  Open Graph и Twitter Cards критически важны для представления контента в социальных сетях.
  Минимальный набор включает <code>og:title</code>, <code>og:type</code>, <code>og:image</code>
  и <code>og:url</code>. Используйте изображения 1200×630px, тестируйте через официальные
  валидаторы, добавляйте альтернативные форматы и размеры. Для динамических приложений
  генерируйте мета-теги на сервере или используйте SSR/SSG фреймворки.
  </p>

  <div class="d-flex justify-end">
  <v-btn
  color='second'
  size="small"
  variant="elevated"
  href="https://ogp.me/"
  target="_blank">
  Open Graph Protocol
  </v-btn>
  </div>
  </v-col>
  </v-row>
  </v-container>

  </v-app>
  </template>

  <style scoped>
  .custom-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
  }

  .custom-code code {
  background: none !important;
  color: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
  }

  .ol-list {
  padding-left: 20px;
  }

  .ol-list li {
  margin-bottom: 12px;
  }
  </style>
