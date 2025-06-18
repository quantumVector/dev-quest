<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Пример</title>
</head>
<body>
  <h1>Моя первая страница</h1>
  <p>HTML описывает содержание, а CSS задаёт стиль.</p>
  <a href="https://developer.mozilla.org/">Документация MDN</a>
</body>
</html>`

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
              1. Что такое HTML и для чего нужен?
            </h1>

            <p class="font-weight-regular mb-6">HTML — это язык гипертекстовой разметки, который задаёт структуру и семантику веб-страницы.
              Он описывает, какие элементы содержатся на странице (заголовки, списки, изображения, ссылки),
              чтобы браузер мог построить DOM и отобразить контент. Оформление задаётся CSS, а поведение — JavaScript;
              HTML служит фундаментом, на который они накладываются.</p>

            <!-- Таблица с ключевой информацией -->
            <v-table density="comfortable" class="mb-10">
              <tbody>
              <tr>
                <td>Расшифровка</td>
                <td>HyperText Markup Language — «язык гипертекстовой разметки»</td>
              </tr>
              <tr>
                <td>Основная роль</td>
                <td class="pt-2 pb-2">Структурировать контент: задаёт, где заголовок, абзац, список, изображение, таблица и т. д.</td>
              </tr>
              <tr>
                <td>Ключевые особенности</td>
                <td class="pt-2 pb-2">Гипертекст — поддержка ссылок; разметка — описывает семантику элементов, а не их внешний вид.</td>
              </tr>
              <tr>
                <td>Чего <em>не</em> делает</td>
                <td class="pt-2 pb-2">Не содержит логики (как JavaScript) и не отвечает за оформление (как CSS), хотя может
                  включать встроенные скрипты/стили.</td>
              </tr>
              <tr>
                <td>Как работает</td>
                <td class="pt-2 pb-2">Браузер парсит HTML → строит DOM-дерево → потом применяет CSS → затем запускает JS.</td>
              </tr>
              <tr>
                <td>Зачем нужен</td>
                <td>
                  <ul class="pl-4 pt-2 pb-2">
                    <li>Отображение контента в браузере</li>
                    <li>SEO и доступность. Семантические теги помогают поисковикам и скрин-ридерам.</li>
                    <li>Фундамент для интеграции с CSS, JS, Web Components</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Примеры тегов</td>
                <td>&lt;h1&gt;, &lt;p&gt;, &lt;a&gt;, &lt;ul&gt;, &lt;img&gt;, &lt;article&gt;</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Минимальный пример HTML‑страницы</h2>
            <pre class="mb-0 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet"></code></pre>

            <div class="d-flex justify-end mb-10">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/ru/docs/Web/HTML"
                target="_blank">
                Открыть MDN
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
