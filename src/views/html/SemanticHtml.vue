<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet = `
<!-- Шапка сайта или раздела -->
<header>
  <h1>Мой блог</h1>
</header>

<!-- Навигационное меню -->
<nav>
  <ul>
    <li><a href="/">Главная</a></li>
    <li><a href="/about">Обо мне</a></li>
  </ul>
</nav>

<!-- Уникальный контент страницы -->
<main>
  <!-- Самостоятельный контентный блок -->
  <article>
    <h2>Заголовок статьи</h2>
    <p>Текст статьи…</p>
  </article>

  <!-- Боковая колонка, контекст -->
  <aside>
    <h3>Ссылки</h3>
    <!-- ... -->
  </aside>
</main>

<!-- Подвал -->
<footer>
  <small>© 2025</small>
</footer>
`

const highlightedSnippet = ref('')

onMounted(() => {
  highlightedSnippet.value = Prism.highlight(snippet, Prism.languages.markup, 'markup')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              2. Что такое семантическая вёрстка?
            </h1>
            <p class="font-weight-regular mb-6"><b>Семантическая вёрстка</b> — это подход к HTML-разметке,
              при котором теги подбираются так, чтобы отражать <i>смысл</i> и <i>структуру</i> содержимого страницы,
              а не лишь то, как оно будет выглядеть в браузере.</p>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые идеи</h2>
            <v-table density="comfortable" class="mb-10">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold">Что даёт</th>
                  <th class="text-left font-weight-bold">Почему важно на собеседовании</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pt-2 pb-2"><b>Понятная структура документа</b> — сразу видно, где шапка,
                    меню, основная статья, колонтитул и т.д.</td>
                  <td class="pt-2 pb-2">Показывает, что вы умеете мыслить не только «как отцентрировать
                    div», но и архитектурно.</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Доступность (a11y)</b> — скринридеры и другие вспомогательные
                    технологии «понимают» документ.</td>
                  <td class="pt-2 pb-2">В крупных компаниях WCAG-комплаенс часто обязателен.</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>SEO</b> — поисковики лучше индексируют семантически размеченный контент.</td>
                  <td class="pt-2 pb-2">Улучшение видимости сайта без хака « набить ключевые слова».</td>
                </tr>
                <tr>
                  <td class="pt-2 pb-2"><b>Удобная поддержка</b> — разработчики быстрее читают код,
                    тестировщики пишут селекторы,
                    а CSS остаётся более «чистым».</td>
                  <td class="pt-2 pb-2">Говорит о вашей командной работе и умении писать поддерживаемый код.</td>
                </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры семантических тегов</h2>
            <pre class="mb-10 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-10">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем <code>&lt;section&gt;</code> отличается от
                  <code>&lt;div&gt;</code>?</p>
                <p class="font-weight-regular ma-0">
                  <code>&lt;section&gt;</code> применяется,
                  когда блок действительно образует логически завершённый раздел, обычно с заголовком.
                  <code>&lt;div&gt;</code> — «пустой» контейнер без семантики, используйте его, если
                  ни один другой тег не подходит.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать <code>&lt;article&gt;</code> vs.
                  <code>&lt;section&gt;</code>?</p>
                <p class="font-weight-regular ma-0">
                  <code>&lt;article&gt;</code> подразумевает независимость: статью можно вынести и
                  читать вне контекста страницы. <code>&lt;section&gt;</code> чаще часть более крупного документа.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Нужно ли использовать ARIA-атрибуты, если есть семантические теги?</p>
                <p class="font-weight-regular ma-0">
                  Семантические теги уже несут роль, но ARIA дополняет или уточняет, особенно в сложных
                  виджетах (dialog, tabs). Главное правило: <i>«Сначала семантика HTML, потом ARIA»</i>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как семантика влияет на CSS/JS?</p>
                <p class="font-weight-regular ma-0">
                  Меньше классов «для смысла», чище каскад, селекторы становятся очевиднее
                  (<code>header nav a</code> вместо <code>.header .menu a</code>).
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">Семантическая вёрстка — это использование HTML-тегов
              по их прямому назначению (header, nav, main, article, footer и т.д.), чтобы код отражал
              структуру и смысл контента. Это улучшает доступность, SEO и поддержку проекта.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
