<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'

const snippet1 = `
/* Специфичность: 0,0,0,1 */
p { color: blue; }

/* Специфичность: 0,0,1,0 */
.text { color: red; }

/* Специфичность: 0,1,0,0 */
#title { color: green; }

/* Специфичность: 1,0,0,0 */
p { color: purple !important; }
`

const snippet2 = `
/* Специфичность: 0,0,1,1 */
p.highlight { color: orange; }

/* Специфичность: 0,0,2,0 */
.container .text { color: navy; }

/* Специфичность: 0,1,1,1 */
#header .nav a { color: black; }

/* Специфичность: 0,0,0,3 */
div > p + span { color: gray; }
`

const snippet3 = `
/* Примеры расчета специфичности */

/* 0,0,0,1 - один элемент */
h1 { color: red; }

/* 0,0,1,0 - один класс */
.title { color: blue; }

/* 0,1,0,0 - один ID */
#main { color: green; }

/* 0,0,1,1 - класс + элемент */
.content p { color: orange; }

/* 0,1,1,2 - ID + класс + два элемента */
#sidebar .widget ul li { color: purple; }

/* 0,0,3,1 - три класса + элемент */
.nav.active.dropdown a { color: yellow; }

/* 0,2,0,1 - два ID + элемент */
#header#main h1 { color: pink; }
`

const snippet4 = `
/* Практические примеры конфликтов */

/* HTML: <p class="text" id="intro">Текст</p> */

/* Специфичность: 0,0,0,1 - НЕ применится */
p { color: blue; }

/* Специфичность: 0,0,1,0 - НЕ применится */
.text { color: red; }

/* Специфичность: 0,1,0,0 - применится */
#intro { color: green; }

/* Специфичность: 0,1,1,1 - применится (самая высокая) */
#intro.text p { color: black; }
/* Ошибка! Этот селектор не подойдет к HTML выше */

/* Правильно: */
p#intro.text { color: black; }
`

const snippet5 = `
/* Способы повышения специфичности */

/* Вместо этого: */
.button { background: blue; }

/* Можно написать: */
.container .button { background: blue; }
/* или */
.button.button { background: blue; }
/* или */
:where(.container) .button { background: blue; } /* специфичность 0,0,1,0 */

/* Понижение специфичности с :where() */
:where(#sidebar, .widget) p {
  color: gray; /* специфичность: 0,0,0,1 */
}

/* Обычно было бы: 0,1,0,1 или 0,0,1,1 */
#sidebar p, .widget p {
  color: gray;
}
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.css, 'css')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              5. Специфичность селекторов в CSS
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Специфичность (Specificity)</b> — это система приоритетов в CSS, которая определяет,
              какое правило будет применено к элементу, когда несколько селекторов указывают на один и тот же элемент.
              Чем выше специфичность, тем выше приоритет правила.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Система подсчета специфичности</h2>
            <p class="font-weight-regular mb-4">
              Специфичность записывается в виде четырех чисел: <code>a,b,c,d</code>
            </p>

            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Позиция</th>
                <th class="text-left font-weight-bold">Что считается</th>
                <th class="text-left font-weight-bold">Примеры</th>
                <th class="text-left font-weight-bold">Вес</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>a</b></td>
                <td class="pt-2 pb-2">!important</td>
                <td class="pt-2 pb-2">color: red !important</td>
                <td class="pt-2 pb-2">1000</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>b</b></td>
                <td class="pt-2 pb-2">ID селекторы</td>
                <td class="pt-2 pb-2">#header, #main</td>
                <td class="pt-2 pb-2">100</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>c</b></td>
                <td class="pt-2 pb-2">Классы, атрибуты, псевдоклассы</td>
                <td class="pt-2 pb-2">.nav, [href], :hover</td>
                <td class="pt-2 pb-2">10</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>d</b></td>
                <td class="pt-2 pb-2">Элементы и псевдоэлементы</td>
                <td class="pt-2 pb-2">div, p, ::before</td>
                <td class="pt-2 pb-2">1</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Базовые примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинированные селекторы</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры расчета</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Правила приоритета</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">1. Сравнение слева направо</h3>
                  <p class="mb-2">Сначала сравнивается позиция 'a', потом 'b', потом 'c', потом 'd'</p>
                  <p class="mb-0"><code>0,1,0,0</code> побеждает <code>0,0,999,999</code></p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">2. Порядок в коде</h3>
                  <p class="mb-2">При одинаковой специфичности побеждает последнее правило</p>
                  <p class="mb-0">Важно для правил с одинаковым весом</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">3. Inline стили</h3>
                  <p class="mb-2">style="color: red" имеет специфичность <code>1,0,0,0</code></p>
                  <p class="mb-0">Побеждает все CSS-правила без !important</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">4. Универсальный селектор</h3>
                  <p class="mb-2">*, :not(), :where() не добавляют специфичность</p>
                  <p class="mb-0">Комбинаторы (+, >, ~) тоже не считаются</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практические конфликты</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Управление специфичностью</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какая специфичность у селектора <code>#nav .menu li a:hover</code>?</p>
                <p class="font-weight-regular ma-0">
                  <code>0,1,2,2</code> — один ID (#nav), два класса/псевдокласса (.menu, :hover), два элемента (li, a).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему <code>div.class</code> имеет бо́льшую специфичность, чем <code>.class</code>?</p>
                <p class="font-weight-regular ma-0">
                  <code>div.class</code> = <code>0,0,1,1</code>, <code>.class</code> = <code>0,0,1,0</code>.
                  Добавление элемента увеличивает специфичность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает <code>:not()</code> со специфичностью?</p>
                <p class="font-weight-regular ma-0">
                  <code>:not()</code> сам не добавляет специфичность, но его содержимое считается.
                  <code>:not(.class)</code> = <code>0,0,1,0</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между <code>:where()</code> и <code>:is()</code>?</p>
                <p class="font-weight-regular ma-0">
                  <code>:where()</code> всегда имеет специфичность 0. <code>:is()</code> принимает специфичность
                  самого специфичного селектора из своего списка.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как избежать войны специфичности?</p>
                <p class="font-weight-regular ma-0">
                  BEM методология, CSS-модули, CSS-in-JS, использование одинакового уровня специфичности,
                  избегание глубокой вложенности селекторов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать <code>!important</code>?</p>
                <p class="font-weight-regular ma-0">
                  Только для utility-классов (.hidden, .sr-only) или переопределения стилей из библиотек.
                  В обычном коде это антипаттерн.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Держите специфичность низкой</h3>
                  <ul class="pl-4">
                    <li>Используйте классы, не ID</li>
                    <li>Избегайте глубокой вложенности</li>
                    <li>Один-два уровня достаточно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Структурируйте CSS</h3>
                  <ul class="pl-4">
                    <li>BEM или другая методология</li>
                    <li>CSS-модули</li>
                    <li>Utility-first подход</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Инструменты</h3>
                  <ul class="pl-4">
                    <li>Specificity Calculator</li>
                    <li>DevTools показывают перечеркнутые стили</li>
                    <li>CSS-линтеры</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Специфичность CSS — это система <code>a,b,c,d</code>, где a=!important, b=ID, c=классы/атрибуты/псевдоклассы,
              d=элементы. Понимание специфичности критично для написания поддерживаемого CSS и решения конфликтов стилей.
              Главный принцип: держите специфичность низкой и используйте структурированные подходы.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
                target="_blank">
                MDN: CSS Specificity
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
