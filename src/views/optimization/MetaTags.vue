<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
<!-- Базовые meta-теги для каждой страницы -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Title - заголовок страницы (обязательный) -->
  <title>Заголовок страницы | Название сайта</title>

  <!-- Description - краткое описание страницы -->
  <meta name="description" content="Краткое описание содержимого страницы,
    до 160 символов. Показывается в поисковой выдаче.">

  <!-- Keywords - ключевые слова (устарел, но иногда используется) -->
  <meta name="keywords" content="ключевое слово 1, ключевое слово 2, слово 3">

  <!-- Robots - инструкции для поисковых роботов -->
  <meta name="robots" content="index, follow">

  <!-- Author - автор страницы -->
  <meta name="author" content="Имя Автора">
</head>
<body>
  <!-- Контент страницы -->
</body>
</html>
`

const snippet2 = `
<!-- Title: оптимальная структура -->

<!-- Главная страница -->
<title>Название сайта - краткое описание деятельности</title>

<!-- Внутренние страницы -->
<title>Заголовок страницы | Раздел | Название сайта</title>

<!-- Страница товара -->
<title>iPhone 15 Pro 256GB - купить в Москве | Интернет-магазин</title>

<!-- Блог -->
<title>10 способов оптимизации React приложений | Блог разработчика</title>

<!-- ПЛОХИЕ примеры -->
<title>Страница</title>  <!-- Неинформативно -->
<title>Купить iPhone 15 Pro 256GB Space Black с доставкой по России
недорого в интернет магазине электроники с гарантией</title>
<!-- Слишком длинный, переспам -->
`

const snippet3 = `
<!-- Description: лучшие практики -->

<!-- Хороший description -->
<meta name="description" content="Купите iPhone 15 Pro 256GB
по выгодной цене. Официальная гарантия Apple, доставка по РФ,
рассрочка 0%. В наличии все цвета.">

<!-- Для блога -->
<meta name="description" content="Узнайте 10 практических способов
оптимизации React приложений: мемоизация, code splitting,
ленивая загрузка и другие техники.">

<!-- Для сервисной страницы -->
<meta name="description" content="О компании TechSolutions: 15 лет
на рынке разработки ПО. Более 200 успешных проектов.
Сертифицированные специалисты.">

<!-- ПЛОХИЕ примеры -->
<meta name="description" content="О нас">
<!-- Слишком коротко -->

<meta name="description" content="Добро пожаловать на наш сайт!
Здесь вы найдёте много интересного и полезного.
Заходите к нам чаще!">
<!-- Неинформативно, нет конкретики -->
`

const snippet4 = `
<!-- Keywords: современное использование -->

<!-- Устаревший подход (НЕ используйте) -->
<meta name="keywords" content="купить, айфон, телефон, смартфон,
apple, iphone 15, дешево, недорого, цена, москва, интернет магазин">

<!-- Современный подход (если используете) -->
<meta name="keywords" content="iPhone 15 Pro, Apple смартфон,
купить iPhone Москва">

<!-- Важно знать: -->
<!-- Google НЕ использует keywords с 2009 года -->
<!-- Yandex учитывает минимально, в основном игнорирует -->
<!-- Bing также практически не учитывает -->

<!-- Лучше сосредоточиться на: -->
<!-- 1. Качественном title и description -->
<!-- 2. Структурированных данных (schema.org) -->
<!-- 3. Качественном контенте на странице -->
<!-- 4. Семантической разметке -->
`

const snippet5 = `
<!-- Robots meta-тег: управление индексацией -->

<!-- Разрешить всё (по умолчанию) -->
<meta name="robots" content="index, follow">

<!-- Запретить индексацию страницы -->
<meta name="robots" content="noindex, follow">

<!-- Запретить переход по ссылкам -->
<meta name="robots" content="index, nofollow">

<!-- Запретить всё -->
<meta name="robots" content="noindex, nofollow">

<!-- Дополнительные директивы -->
<meta name="robots" content="index, follow, max-snippet:-1,
max-image-preview:large, max-video-preview:-1">

<!-- Для конкретных ботов -->
<meta name="googlebot" content="noindex">
<meta name="yandex" content="noyaca">  <!-- Запретить Яндекс.Каталог -->

<!-- Когда использовать noindex: -->
<!-- - Страницы с дублированным контентом -->
<!-- - Личные кабинеты, админки -->
<!-- - Страницы с параметрами фильтрации -->
<!-- - Технические страницы (спасибо за заказ) -->
`

const snippet6 = `
<!-- Полный набор meta-тегов для современного сайта -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- Базовые -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- SEO основные -->
  <title>iPhone 15 Pro 256GB - купить по выгодной цене | TechStore</title>
  <meta name="description" content="Купите iPhone 15 Pro 256GB.
    Официальная гарантия Apple, доставка по РФ, рассрочка 0%.
    Все цвета в наличии. Цена от 129 990 ₽">

  <!-- Robots -->
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow">

  <!-- Автор и копирайт -->
  <meta name="author" content="TechStore">
  <meta name="copyright" content="© 2025 TechStore">

  <!-- Open Graph (социальные сети) -->
  <meta property="og:title" content="iPhone 15 Pro 256GB - купить | TechStore">
  <meta property="og:description" content="Официальная гарантия,
    доставка по РФ, рассрочка 0%">
  <meta property="og:image" content="https://example.com/iphone-15-pro.jpg">
  <meta property="og:url" content="https://example.com/iphone-15-pro">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="TechStore">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="iPhone 15 Pro 256GB - купить">
  <meta name="twitter:description" content="Официальная гарантия Apple">
  <meta name="twitter:image" content="https://example.com/iphone-15-pro.jpg">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/iphone-15-pro">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">

  <!-- Theme color для мобильных браузеров -->
  <meta name="theme-color" content="#007bff">
</head>
<body>
  <!-- Контент -->
</body>
</html>
`

const snippet7 = `
<!-- React/Next.js: динамические meta-теги -->

// pages/_document.js (Next.js)
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {/* Статические meta-теги */}
        <meta name="author" content="Your Company" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// pages/index.js (Next.js) - динамические meta
import Head from 'next/head'

export default function HomePage({ product }) {
  return (
    <>
      <Head>
        <title>{product.name} - купить в магазине | {product.brand}</title>
        <meta
          name="description"
          content={\`Купите \${product.name}. \${product.shortDescription}.
            Цена: \${product.price} ₽\`}
        />
        <meta property="og:title" content={\`\${product.name} | Shop\`} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={product.image} />
        <link rel="canonical" href={\`https://example.com/\${product.slug}\`} />
      </Head>

      <main>
        {/* Контент страницы */}
      <\/main>
    <\/>
  )
}
`

const snippet8 = `
<!-- Vue.js: vue-meta или useHead -->

<!-- Composition API с VueUse -->
<script setup>
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

const props = defineProps({
  product: Object
})

useHead({
  title: computed(() => \`\${props.product.name} - купить | TechStore\`),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        \`Купите \${props.product.name}. \${props.product.description}\`)
    },
    {
      property: 'og:title',
      content: computed(() => props.product.name)
    },
    {
      property: 'og:image',
      content: computed(() => props.product.image)
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() => \`https://example.com/products/\${props.product.slug}\`)
    }
  ]
})
<\/script>

<template>
  <div class="product-page">
    <!-- Контент -->
  </div>
</template>
`

const snippet9 = `
<!-- Валидация и проверка meta-тегов -->

<!-- Google Search Console -->
<!-- Проверяет title, description, canonical -->
<!-- Показывает ошибки дублирования -->

<!-- Yandex Вебмастер -->
<!-- Аналогично Google, для Яндекса -->

<!-- Инструменты для разработки -->

<!-- 1. Browser DevTools -->
<!-- Просмотр: Elements -> <head> -->
<!-- Проверка отрисовки: Console -> document.title -->

<!-- 2. Lighthouse (Chrome DevTools) -->
<!-- Аудит SEO секции -->
<!-- Проверка описания, title, meta viewport -->

<!-- 3. Онлайн-инструменты -->
<!-- - Meta Tags - https://metatags.io/ -->
<!-- - Open Graph Check - https://www.opengraph.xyz/ -->
<!-- - Twitter Card Validator -->
<!-- - Structured Data Testing Tool -->

<!-- 4. Плагины для VS Code -->
<!-- - HTMLHint -->
<!-- - SEO Peek -->

<!-- Пример проверки через JavaScript -->
<script>
// Проверка длины title
const titleLength = document.title.length;
if (titleLength > 60) {
  console.warn(\`Title слишком длинный: \${titleLength} символов\`);
}

// Проверка наличия description
const description = document.querySelector('meta[name="description"]');
if (!description) {
  console.error('Отсутствует meta description');
} else if (description.content.length > 160) {
  console.warn(\`Description слишком длинный: \${description.content.length} символов\`);
}
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
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Дефолтные meta-теги: title, description, keywords
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Meta-теги</b> — это HTML-элементы, которые предоставляют метаданные о веб-странице
              поисковым системам, браузерам и социальным сетям. Три основных тега (title, description, keywords)
              исторически были основой SEO, хотя их значимость со временем изменилась.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные meta-теги</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тег</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Актуальность</th>
                <th class="text-left font-weight-bold">Длина</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>&lt;title&gt;</b></td>
                <td class="pt-2 pb-2">Заголовок страницы в поиске и вкладке</td>
                <td class="pt-2 pb-2">Критически важен</td>
                <td class="pt-2 pb-2">50-60 символов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>description</b></td>
                <td class="pt-2 pb-2">Краткое описание содержимого</td>
                <td class="pt-2 pb-2">Очень важен</td>
                <td class="pt-2 pb-2">120-160 символов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>keywords</b></td>
                <td class="pt-2 pb-2">Ключевые слова страницы</td>
                <td class="pt-2 pb-2">Устарел (игнорируется)</td>
                <td class="pt-2 pb-2">Не ограничена</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>robots</b></td>
                <td class="pt-2 pb-2">Инструкции для поисковых роботов</td>
                <td class="pt-2 pb-2">Важен</td>
                <td class="pt-2 pb-2">N/A</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>viewport</b></td>
                <td class="pt-2 pb-2">Настройка отображения на мобильных</td>
                <td class="pt-2 pb-2">Обязателен</td>
                <td class="pt-2 pb-2">N/A</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Базовая структура meta-тегов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Title: оптимальная структура</h2>
            <p class="font-weight-regular mb-4">
              Title — самый важный элемент для SEO. Отображается в поисковой выдаче,
              вкладке браузера и социальных сетях.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Лучшие практики</h3>
                  <ul class="pl-4">
                    <li>50-60 символов (Google обрезает длиннее)</li>
                    <li>Главное ключевое слово в начале</li>
                    <li>Уникальный для каждой страницы</li>
                    <li>Читаемый и привлекательный</li>
                    <li>Включайте бренд в конце</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Избегайте</h3>
                  <ul class="pl-4">
                    <li>Переспам ключевых слов</li>
                    <li>Общие фразы типа "Главная"</li>
                    <li>Дублирование на разных страницах</li>
                    <li>Слишком длинные заголовки (&gt;70)</li>
                    <li>CAPSLOCK и избыток символов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">3. Description: правила создания</h2>
            <p class="font-weight-regular mb-4">
              Description показывается в поисковой выдаче под заголовком. Не влияет на ранжирование напрямую,
              но влияет на CTR (кликабельность).
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Правила написания</h3>
                  <ul class="pl-4">
                    <li>120-160 символов оптимально</li>
                    <li>Призыв к действию (CTA)</li>
                    <li>Конкретные преимущества</li>
                    <li>Естественное использование ключевых слов</li>
                    <li>Уникальный для каждой страницы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Что включить</h3>
                  <ul class="pl-4">
                    <li>Основное ключевое слово</li>
                    <li>Уникальное торговое предложение (УТП)</li>
                    <li>Конкретные цифры/факты</li>
                    <li>Ответ на вопрос пользователя</li>
                    <li>Призыв к действию</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">4. Keywords: история и современность</h2>
            <p class="font-weight-regular mb-4">
              Meta keywords устарел и игнорируется основными поисковыми системами с 2009 года.
              Его использование не вредит, но и не помогает SEO.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Robots: управление индексацией</h2>
            <p class="font-weight-regular mb-4">
              Контролирует, как поисковые роботы индексируют страницу и переходят по ссылкам.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Основные директивы</h3>
                  <ul class="pl-4">
                    <li><code>index</code> - индексировать</li>
                    <li><code>noindex</code> - не индексировать</li>
                    <li><code>follow</code> - переходить по ссылкам</li>
                    <li><code>nofollow</code> - игнорировать ссылки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Дополнительные</h3>
                  <ul class="pl-4">
                    <li><code>noarchive</code> - не кэшировать</li>
                    <li><code>nosnippet</code> - не показывать сниппет</li>
                    <li><code>max-snippet</code> - размер сниппета</li>
                    <li><code>max-image-preview</code> - размер превью</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Когда использовать</h3>
                  <ul class="pl-4">
                    <li>Страницы поиска/фильтрации</li>
                    <li>Дубли контента</li>
                    <li>Технические страницы</li>
                    <li>Личные кабинеты</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">6. Полный набор meta-тегов</h2>
            <p class="font-weight-regular mb-4">
              Современная страница включает не только базовые meta-теги, но и Open Graph, Twitter Cards:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. React/Next.js: динамические meta-теги</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Vue.js: управление meta-тегами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Валидация и проверка</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на SEO</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Прямое влияние</h3>
                  <ul class="pl-4">
                    <li><b>Title</b> — сильное влияние на ранжирование</li>
                    <li><b>Robots</b> — контроль индексации</li>
                    <li><b>Canonical</b> — устранение дублей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Косвенное влияние</h3>
                  <ul class="pl-4">
                    <li><b>Description</b> — влияет на CTR</li>
                    <li><b>OG-теги</b> — социальный трафик</li>
                    <li><b>Viewport</b> — мобильный опыт</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Не влияют</h3>
                  <ul class="pl-4">
                    <li><b>Keywords</b> — игнорируется с 2009</li>
                    <li><b>Author</b> — справочная информация</li>
                    <li><b>Copyright</b> — юридическая информация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему meta keywords больше не используется?</p>
                <p class="font-weight-regular ma-0">
                  Google перестал учитывать keywords в 2009 из-за спама. Вебмастера злоупотребляли
                  этим тегом, добавляя нерелевантные ключевые слова. Современные алгоритмы анализируют
                  контент страницы напрямую, без необходимости в keywords.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какая оптимальная длина title и description?</p>
                <p class="font-weight-regular ma-0">
                  Title: 50-60 символов (Google показывает ~600px, ~60 символов). Description: 120-160 символов
                  для десктопа, 120 для мобильных. Превышение приводит к обрезанию многоточием.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Может ли Google переписать title или description?</p>
                <p class="font-weight-regular ma-0">
                  Да, Google может генерировать свои заголовки и описания, если считает ваши
                  неподходящими. Часто происходит это регулярно. Google будет использовать ваши теги, если они качественные
                  и релевантные.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие ошибки в meta-тегах критичны для SEO?</p>
                <p class="font-weight-regular ma-0">
                  Дубли title/description на разных страницах, слишком короткие/длинные теги,
                  переспам ключевых слов, отсутствие title, неправильный canonical, отсутствие
                  viewport для мобильных устройств.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как часто нужно обновлять meta-теги?</p>
                <p class="font-weight-regular ma-0">
                  При изменении контента страницы, смене позиционирования, A/B тестировании заголовков,
                  обновлении продуктов/услуг. Для блогов - при публикации новых статей обязательно
                  создавайте уникальные meta-теги.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики 2024-2025</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Title</h3>
                  <ul class="pl-4">
                    <li>50-60 символов</li>
                    <li>Ключевые слова в начале</li>
                    <li>Уникальный для каждой страницы</li>
                    <li>Бренд в конце через |</li>
                    <li>Призыв к действию</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Description</h3>
                  <ul class="pl-4">
                    <li>120-160 символов</li>
                    <li>Конкретные преимущества</li>
                    <li>Естественные ключевые слова</li>
                    <li>Призыв к действию</li>
                    <li>Уникальный контент</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Дополнительно</h3>
                  <ul class="pl-4">
                    <li>Open Graph теги</li>
                    <li>Twitter Cards</li>
                    <li>Canonical URL</li>
                    <li>Structured Data</li>
                    <li>Favicon всех размеров</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Чеклист для проверки meta-тегов</h2>
            <v-alert type="info" class="mb-6">
              <template v-slot:prepend>
                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
              </template>
              <div>
                <p class="mb-2 font-weight-bold">Перед релизом проверьте:</p>
                <ul class="pl-4 ma-0">
                  <li>✓ Title уникален и 50-60 символов</li>
                  <li>✓ Description уникален и 120-160 символов</li>
                  <li>✓ Viewport meta для мобильных</li>
                  <li>✓ Canonical URL указан корректно</li>
                  <li>✓ Open Graph теги для соцсетей</li>
                  <li>✓ Robots meta для правильной индексации</li>
                  <li>✓ Нет дублей на других страницах</li>
                  <li>✓ Favicon добавлен</li>
                  <li>✓ Язык страницы указан (lang="ru")</li>
                  <li>✓ Проверено в валидаторах</li>
                </ul>
              </div>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для работы</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Тестирование</h3>
                  <ul class="pl-4">
                    <li>Google Search Console</li>
                    <li>Yandex Вебмастер</li>
                    <li>Meta Tags - metatags.io</li>
                    <li>Open Graph Check</li>
                    <li>Twitter Card Validator</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Разработка</h3>
                  <ul class="pl-4">
                    <li>Next.js Metadata API</li>
                    <li>React Helmet / React Helmet Async</li>
                    <li>VueUse - useHead</li>
                    <li>Lighthouse (Chrome DevTools)</li>
                    <li>Browser extensions (SEO Peek)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Дефолтные meta-теги остаются критически важными для SEO и социальных сетей. Title и Description
              напрямую влияют на CTR в поисковой выдаче, а Keywords устарел и игнорируется. Современный подход —
              динамическая генерация уникальных meta-тегов для каждой страницы, использование Open Graph и
              Twitter Cards, правильная настройка robots и canonical. Регулярный аудит и A/B тестирование
              meta-тегов помогают оптимизировать конверсию из поиска.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developers.google.com/search/docs/appearance/snippet"
                target="_blank">
                Google: Управление сниппетами
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
  background: #2d2d2d;
  overflow-x: auto;
}

.ol-list {
  padding-left: 20px;
}
</style>
