<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
/* FLEXBOX - одномерная система (строка ИЛИ столбец) */
.navbar {
  display: flex;
  justify-content: space-between; /* горизонтальное выравнивание */
  align-items: center;            /* вертикальное выравнивание */
}

.navigation {
  display: flex;
  gap: 20px;
}

.button-group {
  display: flex;
  flex-direction: column; /* вертикальная ориентация */
  gap: 10px;
}
`

const snippet2 = `
/* GRID - двумерная система (строки И столбцы одновременно) */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 150px;
  grid-template-rows: 60px 1fr 40px;
  gap: 10px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
`

const snippet3 = `
/* FLEXBOX: Когда контент определяет размер */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: #e1e5e9;
  border-radius: 16px;
  white-space: nowrap;
  /* Размер зависит от содержимого */
}

/* Адаптивная навигация */
.responsive-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .responsive-nav {
    flex-direction: column;
    align-items: center;
  }
}
`

const snippet4 = `
/* GRID: Когда нужна точная структура */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 20px;
}

/* Сложные макеты с пересечениями */
.magazine-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}

.featured-article {
  grid-column: 1 / 3;  /* занимает 2 колонки */
  grid-row: 1 / 3;     /* занимает 2 строки */
}
`

const snippet5 = `
/* FLEXBOX: Центрирование элемента */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* GRID: Центрирование элемента */
.grid-center {
  display: grid;
  place-items: center;
  height: 100vh;
}

/* Flexbox проще для простого центрирования */
/* Grid лучше когда центрируемый элемент - часть сложного макета */
`

const snippet6 = `
/* НЕВОЗМОЖНО заменить: Flexbox для одномерных задач */

/* 1. Распределение пространства между элементами */
.space-between-flex {
  display: flex;
  justify-content: space-between;
}

/* Grid НЕ МОЖЕТ этого сделать так же элегантно */
.space-between-grid {
  display: grid;
  grid-template-columns: auto 1fr auto; /* Сложнее и менее гибко */
}

/* 2. Автоматическое заполнение по содержимому */
.auto-width-items {
  display: flex;
  gap: 10px;
}

.item {
  flex: 0 0 auto; /* Размер по содержимому */
}

/* 3. Вертикальное выравнивание в строке */
.vertical-align-mixed {
  display: flex;
  align-items: baseline; /* baseline, center, stretch */
}
`

const snippet7 = `
/* НЕВОЗМОЖНО заменить: Grid для двумерных макетов */

/* 1. Перекрывающиеся элементы в сетке */
.overlapping-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
}

.item1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  background: rgba(255, 0, 0, 0.5);
}

.item2 {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  background: rgba(0, 255, 0, 0.5);
}

/* Flexbox НЕ МОЖЕТ создать такие пересечения */

/* 2. Автоматическое размещение с контролем */
.masonry-like {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 150px; /* Одинаковая высота строк */
  gap: 15px;
}

/* 3. Сложные адаптивные макеты */
.complex-responsive {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

@media (min-width: 768px) {
  .complex-responsive {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 200px 1fr;
  }
}
`

const snippet8 = `
/* КОМБИНИРОВАНИЕ Flexbox и Grid */

/* Grid для общего макета страницы */
.page {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Flexbox для элементов внутри Grid областей */
.header {
  grid-area: header;
  display: flex;           /* Flexbox внутри Grid */
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.main {
  grid-area: main;
  display: grid;           /* Grid внутри Grid */
  grid-template-columns: 1fr 300px;
  gap: 20px;
}

.article-content {
  display: flex;           /* Flexbox для контента статьи */
  flex-direction: column;
  gap: 16px;
}

.sidebar {
  display: flex;           /* Flexbox для виджетов сайдбара */
  flex-direction: column;
  gap: 20px;
}
`

const snippet9 = `
/* ПРОИЗВОДИТЕЛЬНОСТЬ: Когда что использовать */

/* Flexbox - лучше для динамического контента */
.dynamic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Размеры вычисляются по содержимому - хорошо для:
   - Списков переменной длины
   - Навигационных меню
   - Кнопочных панелей
   - Тегов и бейджей */

/* Grid - лучше для статических макетов */
.static-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

/* Размеры заданы явно - хорошо для:
   - Галерей изображений
   - Дашбордов
   - Карточных макетов
   - Табличных данных */
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
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.css, 'css')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.css, 'css')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.css, 'css')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.css, 'css')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Flexbox vs Grid: когда использовать и когда они незаменяемы
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Flexbox и Grid</b> — это две системы макетирования CSS, которые решают разные задачи.
              Flexbox идеален для одномерных макетов (строка ИЛИ столбец), Grid — для двумерных (строки И столбцы).
              Понимание их различий критично для эффективной верстки.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные различия</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Flexbox</th>
                <th class="text-left font-weight-bold">Grid</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Размерность</b></td>
                <td class="pt-2 pb-2">Одномерная (1D)</td>
                <td class="pt-2 pb-2">Двумерная (2D)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Направление</b></td>
                <td class="pt-2 pb-2">Строка ИЛИ столбец</td>
                <td class="pt-2 pb-2">Строки И столбцы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Размеры элементов</b></td>
                <td class="pt-2 pb-2">Зависят от содержимого</td>
                <td class="pt-2 pb-2">Задаются явно</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Позиционирование</b></td>
                <td class="pt-2 pb-2">Последовательное</td>
                <td class="pt-2 pb-2">Произвольное</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Поддержка браузеров</b></td>
                <td class="pt-2 pb-2">Отличная (IE10+)</td>
                <td class="pt-2 pb-2">Хорошая (IE11+, ограниченно)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Flexbox: одномерные макеты</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Grid: двумерные макеты</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Flexbox</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Идеально подходит для:</h3>
                  <ul class="pl-4">
                    <li>Навигационных меню</li>
                    <li>Панелей кнопок</li>
                    <li>Карточек в ряд</li>
                    <li>Центрирования элементов</li>
                    <li>Распределения пространства</li>
                    <li>Вертикального выравнивания</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Особенности:</h3>
                  <ul class="pl-4">
                    <li>Контент определяет размеры</li>
                    <li>Автоматическое заполнение</li>
                    <li>Гибкое поведение элементов</li>
                    <li>Простое выравнивание</li>
                    <li>Хорошо для адаптивности</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать Grid</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Идеально подходит для:</h3>
                  <ul class="pl-4">
                    <li>Макетов страниц</li>
                    <li>Галерей изображений</li>
                    <li>Дашбордов</li>
                    <li>Табличных данных</li>
                    <li>Сложных адаптивных макетов</li>
                    <li>Перекрывающихся элементов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Особенности:</h3>
                  <ul class="pl-4">
                    <li>Точное позиционирование</li>
                    <li>Контроль над размерами</li>
                    <li>Двумерное планирование</li>
                    <li>Именованные области</li>
                    <li>Автоматическое размещение</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Центрирование: Flex vs Grid</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда Flexbox незаменим</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда Grid незаменим</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинирование Flexbox и Grid</h2>
            <p class="font-weight-regular mb-4">
              Лучший подход — комбинировать обе технологии. Grid для общей структуры, Flexbox для деталей:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и выбор</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное отличие Flexbox от Grid?</p>
                <p class="font-weight-regular ma-0">
                  Flexbox — одномерная система (работает в одном направлении: строка ИЛИ столбец).
                  Grid — двумерная система (работает одновременно со строками И столбцами).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли заменить Grid на Flexbox везде?</p>
                <p class="font-weight-regular ma-0">
                  Нет. Grid незаменим для сложных макетов с перекрывающимися элементами, точным позиционированием
                  и двумерным планированием. Flexbox не может создать настоящие сетки.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда лучше использовать Flexbox вместо Grid?</p>
                <p class="font-weight-regular ma-0">
                  Для простых одномерных задач: навигация, панели кнопок, распределение пространства,
                  центрирование, когда размеры элементов зависят от содержимого.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Влияет ли выбор Flex/Grid на производительность?</p>
                <p class="font-weight-regular ma-0">
                  Flexbox быстрее для простых задач (меньше вычислений). Grid эффективнее для сложных макетов
                  (одна система вместо множества вложенных flex-контейнеров).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как лучше всего изучить различия?</p>
                <p class="font-weight-regular ma-0">
                  Практика! Создайте одинаковые макеты на Flexbox и Grid. Попробуйте сделать сложную сетку
                  на Flexbox — увидите ограничения. Изучите Flexbox Froggy и Grid Garden.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие современные техники комбинирования?</p>
                <p class="font-weight-regular ma-0">
                  Grid для макета страницы, Flexbox для компонентов внутри. CSS Subgrid для связи между уровнями Grid.
                  Container Queries для адаптивности на уровне компонентов.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Практические рекомендации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Выбор технологии</h3>
                  <ul class="pl-4">
                    <li>Спросите: одно или два измерения?</li>
                    <li>Контент или макет главнее?</li>
                    <li>Нужна ли точная сетка?</li>
                    <li>Требуются ли пересечения?</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Лучшие практики</h3>
                  <ul class="pl-4">
                    <li>Комбинируйте технологии</li>
                    <li>Grid для основы, Flex для деталей</li>
                    <li>Изучите CSS Subgrid</li>
                    <li>Используйте DevTools для отладки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Обратная совместимость</h3>
                  <ul class="pl-4">
                    <li>@supports для проверки</li>
                    <li>Flexbox как fallback</li>
                    <li>Progressive enhancement</li>
                    <li>Полифилы при необходимости</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Flexbox и Grid — не конкуренты, а дополняющие друг друга инструменты. Flexbox идеален для одномерных
              задач и контентно-зависимых макетов. Grid незаменим для сложных двумерных структур и точного
              позиционирования. Современная верстка использует оба инструмента: Grid для общей структуры,
              Flexbox для компонентов внутри.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/"
                target="_blank">
                CSS-Tricks: Flexbox vs Grid
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
