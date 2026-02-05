<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
<!-- Canonical URL - указание на основную версию страницы -->

<!-- Вариант 1: Страница на русском - указывает сама на себя -->
<link rel="canonical" href="https://example.com/ru/products">

<!-- Вариант 2: Копия страницы с параметрами - указывает на основную -->
<link rel="canonical" href="https://example.com/ru/products">
<!-- https://example.com/ru/products?sort=price -->
<!-- https://example.com/ru/products?utm_source=google -->

<!-- Вариант 3: Разные домены - указание на главный -->
<!-- На example.co.uk -->
<link rel="canonical" href="https://example.com/products">
`

const snippet2 = `
<!-- hreflang - указание языковых и региональных версий -->

<!-- Английская версия для США -->
<link rel="alternate" hreflang="en-US"
      href="https://example.com/en-us/products">

<!-- Английская версия для UK -->
<link rel="alternate" hreflang="en-GB"
      href="https://example.com/en-gb/products">

<!-- Русская версия -->
<link rel="alternate" hreflang="ru"
      href="https://example.com/ru/products">

<!-- Немецкая версия -->
<link rel="alternate" hreflang="de"
      href="https://example.com/de/products">

<!-- Версия по умолчанию (fallback) -->
<link rel="alternate" hreflang="x-default"
      href="https://example.com/en/products">

<!-- Текущая страница тоже должна быть в списке -->
<link rel="alternate" hreflang="ru"
      href="https://example.com/ru/products">
`

const snippet3 = `
<!-- Полный пример для мультиязычного сайта -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Продукты | Наш Магазин</title>

  <!-- Canonical - основная версия этой страницы -->
  <link rel="canonical" href="https://example.com/ru/products">

  <!-- hreflang - все языковые версии -->
  <!-- Английский (США) -->
  <link rel="alternate" hreflang="en-US"
        href="https://example.com/en-us/products">

  <!-- Английский (UK) -->
  <link rel="alternate" hreflang="en-GB"
        href="https://example.com/en-gb/products">

  <!-- Русский -->
  <link rel="alternate" hreflang="ru"
        href="https://example.com/ru/products">

  <!-- Немецкий -->
  <link rel="alternate" hreflang="de"
        href="https://example.com/de/products">

  <!-- Французский -->
  <link rel="alternate" hreflang="fr"
        href="https://example.com/fr/products">

  <!-- Испанский (Испания) -->
  <link rel="alternate" hreflang="es-ES"
        href="https://example.com/es-es/products">

  <!-- Испанский (Латинская Америка) -->
  <link rel="alternate" hreflang="es-419"
        href="https://example.com/es-latam/products">

  <!-- Китайский упрощенный -->
  <link rel="alternate" hreflang="zh-Hans"
        href="https://example.com/zh-cn/products">

  <!-- Китайский традиционный -->
  <link rel="alternate" hreflang="zh-Hant"
        href="https://example.com/zh-tw/products">

  <!-- Версия по умолчанию -->
  <link rel="alternate" hreflang="x-default"
        href="https://example.com/en/products">
</head>
<body>
  <!-- Контент страницы -->
</body>
</html>
`

const snippet4 = `
<!-- Различные стратегии URL для мультиязычных сайтов -->

<!-- 1. Поддомены (subdomains) -->
<link rel="alternate" hreflang="en" href="https://en.example.com/products">
<link rel="alternate" hreflang="ru" href="https://ru.example.com/products">
<link rel="alternate" hreflang="de" href="https://de.example.com/products">

<!-- Плюсы: Независимые сайты, легко масштабировать
     Минусы: SEO-вес распределяется между доменами -->

<!-- 2. Подпапки (subdirectories) -->
<link rel="alternate" hreflang="en" href="https://example.com/en/products">
<link rel="alternate" hreflang="ru" href="https://example.com/ru/products">
<link rel="alternate" hreflang="de" href="https://example.com/de/products">

<!-- Плюсы: SEO-вес на одном домене, проще управлять
     Минусы: Все на одном сервере -->

<!-- 3. Параметры запроса (query parameters) -->
<link rel="alternate" hreflang="en" href="https://example.com/products?lang=en">
<link rel="alternate" hreflang="ru" href="https://example.com/products?lang=ru">

<!-- Плюсы: Простая реализация
     Минусы: Хуже для SEO, сложнее индексация -->

<!-- 4. Разные домены (ccTLD - country code Top Level Domain) -->
<link rel="alternate" hreflang="en-US" href="https://example.com/products">
<link rel="alternate" hreflang="en-GB" href="https://example.co.uk/products">
<link rel="alternate" hreflang="de" href="https://example.de/products">
<link rel="alternate" hreflang="ru" href="https://example.ru/products">

<!-- Плюсы: Сильный региональный сигнал для Google
     Минусы: Дорого, сложное управление, разделение SEO-веса -->
`

const snippet5 = `
<!-- Правильное использование языковых кодов -->

<!-- ISO 639-1: двухбуквенные коды языков -->
<link rel="alternate" hreflang="en" href="..."> <!-- Английский -->
<link rel="alternate" hreflang="ru" href="..."> <!-- Русский -->
<link rel="alternate" hreflang="de" href="..."> <!-- Немецкий -->
<link rel="alternate" hreflang="fr" href="..."> <!-- Французский -->
<link rel="alternate" hreflang="es" href="..."> <!-- Испанский -->
<link rel="alternate" hreflang="ja" href="..."> <!-- Японский -->
<link rel="alternate" hreflang="ko" href="..."> <!-- Корейский -->

<!-- ISO 639-1 + ISO 3166-1: язык + регион -->
<link rel="alternate" hreflang="en-US" href="..."> <!-- Английский США -->
<link rel="alternate" hreflang="en-GB" href="..."> <!-- Английский UK -->
<link rel="alternate" hreflang="en-CA" href="..."> <!-- Английский Канада -->
<link rel="alternate" hreflang="en-AU" href="..."> <!-- Английский Австралия -->

<link rel="alternate" hreflang="es-ES" href="..."> <!-- Испанский Испания -->
<link rel="alternate" hreflang="es-MX" href="..."> <!-- Испанский Мексика -->
<link rel="alternate" hreflang="es-AR" href="..."> <!-- Испанский Аргентина -->
<link rel="alternate" hreflang="es-419" href="..."> <!-- Испанский Лат. Америка -->

<link rel="alternate" hreflang="pt-BR" href="..."> <!-- Португальский Бразилия -->
<link rel="alternate" hreflang="pt-PT" href="..."> <!-- Португальский Португалия -->

<link rel="alternate" hreflang="zh-Hans" href="..."> <!-- Китайский упрощенный -->
<link rel="alternate" hreflang="zh-Hant" href="..."> <!-- Китайский традиционный -->
<link rel="alternate" hreflang="zh-CN" href="..."> <!-- Китайский КНР -->
<link rel="alternate" hreflang="zh-TW" href="..."> <!-- Китайский Тайвань -->

<!-- Специальное значение x-default -->
<link rel="alternate" hreflang="x-default" href="https://example.com">
<!-- Используется как fallback для неопределенных регионов/языков -->
`

const snippet6 = `
<!-- Распространенные ошибки и их исправления -->

<!-- ❌ ОШИБКА 1: Canonical указывает на другой язык -->
<!-- На странице /ru/products -->
<link rel="canonical" href="https://example.com/en/products">
<!-- ✅ ПРАВИЛЬНО: -->
<link rel="canonical" href="https://example.com/ru/products">

<!-- ❌ ОШИБКА 2: Нет самоссылки в hreflang -->
<!-- На странице /ru/products -->
<link rel="alternate" hreflang="en" href="https://example.com/en/products">
<link rel="alternate" hreflang="de" href="https://example.com/de/products">
<!-- ✅ ПРАВИЛЬНО: добавить текущую страницу -->
<link rel="alternate" hreflang="ru" href="https://example.com/ru/products">
<link rel="alternate" hreflang="en" href="https://example.com/en/products">
<link rel="alternate" hreflang="de" href="https://example.com/de/products">

<!-- ❌ ОШИБКА 3: Несовпадение hreflang между страницами -->
<!-- На /ru/products -->
<link rel="alternate" hreflang="en" href="https://example.com/en/products">
<!-- На /en/products -->
<link rel="alternate" hreflang="ru" href="https://example.com/ru/blog">
<!-- ✅ ПРАВИЛЬНО: обе страницы должны ссылаться друг на друга -->

<!-- ❌ ОШИБКА 4: Неправильные коды языков -->
<link rel="alternate" hreflang="uk" href="..."> <!-- uk = украинский, не UK! -->
<link rel="alternate" hreflang="EN" href="..."> <!-- регистр важен, должно быть en -->
<!-- ✅ ПРАВИЛЬНО: -->
<link rel="alternate" hreflang="en-GB" href="..."> <!-- Английский UK -->
<link rel="alternate" hreflang="uk" href="..."> <!-- Украинский -->
<link rel="alternate" hreflang="en" href="..."> <!-- Английский -->

<!-- ❌ ОШИБКА 5: Canonical на странице 404/redirect -->
<link rel="canonical" href="https://example.com/deleted-page">
<!-- ✅ ПРАВИЛЬНО: canonical должен указывать на доступную страницу -->

<!-- ❌ ОШИБКА 6: Смешивание абсолютных и относительных URL -->
<link rel="alternate" hreflang="en" href="/en/products">
<link rel="alternate" hreflang="ru" href="https://example.com/ru/products">
<!-- ✅ ПРАВИЛЬНО: всегда используйте абсолютные URL -->
<link rel="alternate" hreflang="en" href="https://example.com/en/products">
<link rel="alternate" hreflang="ru" href="https://example.com/ru/products">
`

const snippet7 = `
<!-- Реализация через HTTP-заголовки (для PDF, файлов) -->

<!-- Для страницы /ru/products -->
Link: <https://example.com/en/products>; rel="alternate"; hreflang="en",
      <https://example.com/ru/products>; rel="alternate"; hreflang="ru",
      <https://example.com/de/products>; rel="alternate"; hreflang="de",
      <https://example.com/en/products>; rel="alternate"; hreflang="x-default"

<!-- Для Canonical -->
Link: <https://example.com/ru/products>; rel="canonical"
`

const snippet8 = `
<!-- XML Sitemap с hreflang -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Английская версия -->
  <url>
    <loc>https://example.com/en/products</loc>
    <xhtml:link rel="alternate" hreflang="en"
                href="https://example.com/en/products"/>
    <xhtml:link rel="alternate" hreflang="ru"
                href="https://example.com/ru/products"/>
    <xhtml:link rel="alternate" hreflang="de"
                href="https://example.com/de/products"/>
    <xhtml:link rel="alternate" hreflang="x-default"
                href="https://example.com/en/products"/>
  </url>

  <!-- Русская версия -->
  <url>
    <loc>https://example.com/ru/products</loc>
    <xhtml:link rel="alternate" hreflang="en"
                href="https://example.com/en/products"/>
    <xhtml:link rel="alternate" hreflang="ru"
                href="https://example.com/ru/products"/>
    <xhtml:link rel="alternate" hreflang="de"
                href="https://example.com/de/products"/>
    <xhtml:link rel="alternate" hreflang="x-default"
                href="https://example.com/en/products"/>
  </url>

  <!-- Немецкая версия -->
  <url>
    <loc>https://example.com/de/products</loc>
    <xhtml:link rel="alternate" hreflang="en"
                href="https://example.com/en/products"/>
    <xhtml:link rel="alternate" hreflang="ru"
                href="https://example.com/ru/products"/>
    <xhtml:link rel="alternate" hreflang="de"
                href="https://example.com/de/products"/>
    <xhtml:link rel="alternate" hreflang="x-default"
                href="https://example.com/en/products"/>
  </url>

</urlset>
`

const snippet9 = `
// Next.js - автоматическая генерация hreflang
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'ru', 'de', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
}

// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document({ locale }) {
  return (
    <Html lang={locale}>
      <Head>
        {/* Next.js автоматически добавит hreflang теги */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// Или вручную в Head компоненте
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyPage() {
  const router = useRouter()
  const { pathname, asPath, locales, locale, defaultLocale } = router

  return (
    <>
      <Head>
        {/* Canonical */}
        <link
          rel="canonical"
          href={\`https://example.com\${locale === defaultLocale ? '' : '/' + locale}\${pathname}\`}
        />

        {/* hreflang для всех языков */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={\`https://example.com\${loc === defaultLocale ? '' : '/' + loc}\${pathname}\`}
          />
        ))}

        {/* x-default */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={\`https://example.com\${pathname}\`}
        />
      </Head>

      {/* Контент страницы */}
    </>
  )
}
`

const snippet10 = `
// React + React Helmet для мультиязычности
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', name: 'English', region: 'US' },
  { code: 'ru', name: 'Русский', region: '' },
  { code: 'de', name: 'Deutsch', region: '' },
  { code: 'fr', name: 'Français', region: '' },
]

function ProductPage() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const pathname = window.location.pathname

  // Убираем код языка из pathname
  const pathWithoutLang = pathname.replace(/^\/(en|ru|de|fr)/, '')

  const getUrl = (lang) => {
    return \`https://example.com/\${lang}\${pathWithoutLang}\`
  }

  return (
    <>
      <Helmet>
        {/* Canonical */}
        <link rel="canonical" href={getUrl(currentLang)} />

        {/* hreflang теги */}
        {languages.map((lang) => (
          <link
            key={lang.code}
            rel="alternate"
            hrefLang={lang.region ? \`\${lang.code}-\${lang.region}\` : lang.code}
            href={getUrl(lang.code)}
          />
        ))}

        {/* x-default */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={getUrl('en')}
        />

        {/* Open Graph для соцсетей */}
        <meta property="og:locale" content={currentLang} />
        {languages
          .filter(lang => lang.code !== currentLang)
          .map((lang) => (
            <meta
              key={lang.code}
              property="og:locale:alternate"
              content={lang.code}
            />
          ))}
      </Helmet>

      {/* Контент страницы */}
    </>
  )
}
`

const snippet11 = `
// Утилита для генерации hreflang тегов
interface Language {
  code: string
  region?: string
  domain?: string
}

interface HreflangConfig {
  languages: Language[]
  pathname: string
  baseUrl?: string
  strategy: 'subdirectory' | 'subdomain' | 'domain'
}

function generateHreflangTags(config: HreflangConfig): string[] {
  const { languages, pathname, baseUrl = 'https://example.com', strategy } = config
  const tags: string[] = []

  languages.forEach((lang) => {
    let url: string
    const hrefLang = lang.region ? \`\${lang.code}-\${lang.region}\` : lang.code

    switch (strategy) {
      case 'subdirectory':
        url = \`\${baseUrl}/\${lang.code}\${pathname}\`
        break
      case 'subdomain':
        url = \`https://\${lang.code}.\${baseUrl.replace('https://', '')}\${pathname}\`
        break
      case 'domain':
        url = \`\${lang.domain}\${pathname}\`
        break
    }

    tags.push(
      \`<link rel="alternate" hreflang="\${hrefLang}" href="\${url}">\`
    )
  })

  // Добавляем x-default
  const defaultUrl = strategy === 'subdirectory'
    ? \`\${baseUrl}/en\${pathname}\`
    : \`https://en.\${baseUrl.replace('https://', '')}\${pathname}\`

  tags.push(
    \`<link rel="alternate" hreflang="x-default" href="\${defaultUrl}">\`
  )

  return tags
}

// Использование
const hreflangTags = generateHreflangTags({
  languages: [
    { code: 'en', region: 'US' },
    { code: 'en', region: 'GB' },
    { code: 'ru' },
    { code: 'de' },
  ],
  pathname: '/products',
  strategy: 'subdirectory'
})

console.log(hreflangTags.join('\\n'))
`

const snippet12 = `
<!-- Тестирование и валидация -->

<!-- 1. Google Search Console -->
<!-- Проверка индексации:
     - Search Console → Международное таргетирование → Язык
     - Проверяет корректность hreflang
     - Показывает ошибки -->

<!-- 2. Проверка в браузере -->
<!-- Chrome DevTools → Elements → <head>
     Убедитесь что все теги присутствуют -->

<!-- 3. Онлайн валидаторы -->
<!-- https://technicalseo.com/tools/hreflang/
     https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/
     https://www.sistrix.com/hreflang-validator/ -->

<!-- 4. Yandex Webmaster -->
<!-- Для русскоязычных сайтов - проверка региональности -->

<!-- 5. Screaming Frog SEO Spider -->
<!-- Сканирование всего сайта на наличие hreflang -->
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
const highlightedSnippet12 = ref('')

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
  highlightedSnippet12.value = Prism.highlight(snippet12, Prism.languages.markup, 'markup')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Canonical URL и hreflang для мультиязычных сайтов
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Canonical URL</b> и <b>hreflang</b> — критически важные метатеги для мультиязычных сайтов,
              которые помогают поисковым системам правильно индексировать контент, избегать дублирования
              и показывать пользователям релевантную языковую версию страницы.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое Canonical URL?</h2>
            <v-card class="mb-6 pa-6" color="blue-grey-lighten-5">
              <v-card-text>
                <p class="mb-4">
                  <b>Canonical URL</b> — это тег <code>&lt;link rel="canonical"&gt;</code>, который указывает
                  поисковым системам на основную (каноническую) версию страницы, когда существуют дубликаты
                  или похожие версии контента.
                </p>
                <ul class="mb-0">
                  <li class="mb-2"><b>Цель:</b> Избежать проблем с дублированием контента</li>
                  <li class="mb-2"><b>Применение:</b> Страницы с параметрами, пагинация, версии для печати</li>
                  <li class="mb-2"><b>Важно:</b> Каждая языковая версия имеет свой canonical на себя</li>
                </ul>
              </v-card-text>
            </v-card>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое hreflang?</h2>
            <v-card class="mb-6 pa-6" color="blue-grey-lighten-5">
              <v-card-text>
                <p class="mb-4">
                  <b>hreflang</b> — это атрибут <code>&lt;link rel="alternate" hreflang="..."&gt;</code>,
                  который указывает поисковым системам на альтернативные языковые и региональные версии страницы.
                </p>
                <ul class="mb-0">
                  <li class="mb-2"><b>Цель:</b> Показывать пользователям правильную языковую версию</li>
                  <li class="mb-2"><b>Применение:</b> Мультиязычные и мультирегиональные сайты</li>
                  <li class="mb-2"><b>Важно:</b> Все языковые версии должны ссылаться друг на друга</li>
                </ul>
              </v-card-text>
            </v-card>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Полный пример для мультиязычного сайта</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Стратегии URL для мультиязычных сайтов</h2>
            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Стратегия</th>
                <th class="text-left font-weight-bold">Пример</th>
                <th class="text-left font-weight-bold">Плюсы</th>
                <th class="text-left font-weight-bold">Минусы</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Подпапки</b></td>
                <td class="pt-2 pb-2">/ru/, /en/, /de/</td>
                <td class="pt-2 pb-2">Простота, общий SEO-вес</td>
                <td class="pt-2 pb-2">Все на одном сервере</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Поддомены</b></td>
                <td class="pt-2 pb-2">ru., en., de.</td>
                <td class="pt-2 pb-2">Независимость, масштабируемость</td>
                <td class="pt-2 pb-2">Разделение SEO-веса</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>ccTLD</b></td>
                <td class="pt-2 pb-2">.ru, .com, .de</td>
                <td class="pt-2 pb-2">Сильный региональный сигнал</td>
                <td class="pt-2 pb-2">Дорого, сложное управление</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Параметры</b></td>
                <td class="pt-2 pb-2">?lang=ru</td>
                <td class="pt-2 pb-2">Простая реализация</td>
                <td class="pt-2 pb-2">Плохо для SEO</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Параметры</b></td>
                <td class="pt-2 pb-2">?lang=ru</td>
                <td class="pt-2 pb-2">Простая реализация</td>
                <td class="pt-2 pb-2">Плохо для SEO, сложная индексация</td>
              </tr>
              </tbody>
            </v-table>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правильные языковые коды</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Распространенные ошибки и их исправления</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реализация через HTTP-заголовки</h2>
            <p class="mb-4">
              Для файлов, которые не являются HTML (PDF, изображения), используйте HTTP-заголовки:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">XML Sitemap с hreflang</h2>
            <p class="mb-4">
              Альтернативный способ указания языковых версий через sitemap:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Next.js - автоматическая генерация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">React + React Helmet</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Утилита для генерации hreflang</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet11"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Тестирование и валидация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet12"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <v-expansion-panels class="mb-6">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>В чем разница между canonical и hreflang?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <b>Canonical</b> указывает на основную версию страницы при дублировании контента. <b>hreflang</b> указывает на языковые/региональные версии одного контента. Canonical предотвращает дублирование, hreflang помогает показать правильную языковую версию.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Должна ли каждая языковая версия иметь свой canonical?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Да! Каждая языковая версия должна иметь canonical на себя. Например, страница /ru/products должна иметь canonical на /ru/products, а не на /en/products.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Что такое x-default в hreflang?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  x-default указывает версию по умолчанию для пользователей, чей язык/регион не указан в hreflang. Обычно это английская или основная версия сайта.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Нужны ли hreflang теги на каждой странице?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Да, если страница имеет языковые версии. Каждая страница должна ссылаться на все свои языковые варианты, включая саму себя. Это должно быть двунаправленно - если страница A ссылается на B, то B должна ссылаться на A.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Какую стратегию URL лучше использовать для мультиязычных сайтов?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Подпапки (subdirectories) - наиболее рекомендуемый подход: /en/, /ru/, /de/. Это просто в управлении, SEO-вес остается на одном домене, легко масштабировать. ccTLD (.ru, .de) дают сильный региональный сигнал, но дороги и сложны в управлении.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Как проверить правильность hreflang реализации?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Используйте Google Search Console (Международное таргетирование), онлайн валидаторы (technicalseo.com, aleydasolis.com), Screaming Frog для массовой проверки, и проверяйте двунаправленность ссылок между языковыми версиями.
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <b>Можно ли использовать относительные URL в hreflang?</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Нет! Всегда используйте абсолютные URL с протоколом (https://example.com/ru/products). Относительные URL могут работать некорректно и не рекомендуются спецификацией.
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые выводы</h2>
            <v-card class="mb-6 pa-6" color="blue-grey-lighten-5">
              <v-card-text>
                <h3 class="text-h6 font-weight-bold mb-3">Основные принципы:</h3>
                <ul class="mb-4">
                  <li class="mb-2">Каждая языковая версия должна иметь canonical на себя</li>
                  <li class="mb-2">Все языковые версии должны ссылаться друг на друга через hreflang</li>
                  <li class="mb-2">Используйте правильные языковые коды (ISO 639-1 + ISO 3166-1)</li>
                  <li class="mb-2">Включайте самоссылку (страница должна ссылаться на себя в hreflang)</li>
                  <li class="mb-2">Всегда используйте абсолютные URL</li>
                  <li class="mb-2">Добавляйте x-default для версии по умолчанию</li>
                </ul>

                <h3 class="text-h6 font-weight-bold mb-3">Лучшие практики:</h3>
                <ul>
                  <li class="mb-2">Предпочитайте подпапки (subdirectories) для структуры URL</li>
                  <li class="mb-2">Используйте автоматическую генерацию в Next.js/React</li>
                  <li class="mb-2">Регулярно проверяйте через Search Console и валидаторы</li>
                  <li class="mb-2">Убедитесь в двунаправленности всех hreflang связей</li>
                  <li class="mb-2">Тестируйте на разных устройствах и в разных регионах</li>
                </ul>
              </v-card-text>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Canonical URL и hreflang - критически важные элементы для мультиязычных сайтов.
              Canonical предотвращает дублирование контента, указывая на основную версию страницы.
              hreflang помогает поисковым системам показывать пользователям правильную языковую/региональную
              версию. Правильная реализация улучшает SEO, предотвращает проблемы с индексацией и
              обеспечивает лучший пользовательский опыт для международной аудитории.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developers.google.com/search/docs/specialty/international/localized-versions"
                target="_blank">
                Google: International SEO
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
