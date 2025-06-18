<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup.js'

const snippet1 = `
<!-- Плохо: недоступно -->
<div onclick="submitForm()">Отправить</div>
<input type="text" placeholder="Введите имя">

<!-- Хорошо: доступно -->
<button type="submit">Отправить</button>
<label for="name">Имя:</label>
<input type="text" id="name" name="name" required>
`

const snippet2 = `
<!-- ARIA-атрибуты для сложных элементов -->
<div role="button"
     tabindex="0"
     aria-label="Закрыть диалог"
     onclick="closeDialog()"
     onkeydown="handleKeyDown(event)">
  ×
</div>

<!-- Скрытый текст для скринридеров -->
<button>
  <span aria-hidden="true">🏠</span>
  <span class="sr-only">Главная страница</span>
</button>

<!-- Описание состояния -->
<button aria-expanded="false" aria-controls="menu">
  Меню
</button>
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.markup, 'markup')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.markup, 'markup')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              3. Доступность в Web
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Веб-доступность (Web Accessibility, a11y)</b> — это практика создания веб-сайтов и приложений,
              которые могут использовать все люди, включая пользователей с различными нарушениями и ограничениями.
              Цель — обеспечить равный доступ к информации и функциональности для всех.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Кому важна доступность?</h2>
            <v-table density="comfortable" class="mb-10">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип пользователей</th>
                <th class="text-left font-weight-bold">Потребности</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Слабовидящие и слепые</b></td>
                <td class="pt-2 pb-2">Скринридеры, увеличение текста, высокий контраст</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Глухие и слабослышащие</b></td>
                <td class="pt-2 pb-2">Субтитры, визуальные индикаторы вместо звуковых</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Моторные нарушения</b></td>
                <td class="pt-2 pb-2">Навигация с клавиатуры, крупные кликабельные области</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Когнитивные особенности</b></td>
                <td class="pt-2 pb-2">Простой интерфейс, ясные инструкции, избежание мигания</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Временные ограничения</b></td>
                <td class="pt-2 pb-2">Сломанная рука, яркий свет на экране, шумная среда</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Основные принципы WCAG</h2>
            <p class="font-weight-regular mb-4">
              <b>WCAG (Web Content Accessibility Guidelines)</b> — международный стандарт доступности.
              Основан на четырех принципах:
            </p>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">1. Воспринимаемость (Perceivable)</h3>
                  <p class="mb-2">Информация должна быть представлена так, чтобы пользователи могли её воспринять</p>
                  <v-chip size="small" class="ma-1">alt-тексты</v-chip>
                  <v-chip size="small" class="ma-1">контраст</v-chip>
                  <v-chip size="small" class="ma-1">субтитры</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">2. Управляемость (Operable)</h3>
                  <p class="mb-2">Интерфейс должен быть управляемым для всех пользователей</p>
                  <v-chip size="small" class="ma-1">клавиатура</v-chip>
                  <v-chip size="small" class="ma-1">тайминги</v-chip>
                  <v-chip size="small" class="ma-1">судороги</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">3. Понятность (Understandable)</h3>
                  <p class="mb-2">Информация и управление интерфейсом должны быть понятными</p>
                  <v-chip size="small" class="ma-1">язык</v-chip>
                  <v-chip size="small" class="ma-1">предсказуемость</v-chip>
                  <v-chip size="small" class="ma-1">помощь при вводе</v-chip>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">4. Надёжность (Robust)</h3>
                  <p class="mb-2">Контент должен быть совместим с различными технологиями</p>
                  <v-chip size="small" class="ma-1">валидный HTML</v-chip>
                  <v-chip size="small" class="ma-1">совместимость</v-chip>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Базовые техники доступности</h2>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">ARIA-атрибуты</h2>
            <p class="font-weight-regular mb-4">
              <b>ARIA (Accessible Rich Internet Applications)</b> — набор атрибутов для улучшения доступности
              динамического контента и сложных элементов интерфейса.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-10">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между семантическим HTML и ARIA?</p>
                <p class="font-weight-regular ma-0">
                  Семантический HTML изначально несёт смысл (<code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>).
                  ARIA дополняет или переопределяет семантику там, где HTML недостаточно. Правило:
                  <i>«Сначала семантический HTML, потом ARIA»</i>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить навигацию с клавиатуры?</p>
                <p class="font-weight-regular ma-0">
                  Использовать <code>tabindex</code>, обрабатывать события <code>keydown</code>
                  (Enter, Space, Escape, стрелки), обеспечить видимый фокус через CSS <code>:focus</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать доступность?</p>
                <p class="font-weight-regular ma-0">
                  Автоматически: axe-core, Lighthouse. Вручную: навигация только с клавиатуры,
                  скринридеры (NVDA, JAWS, VoiceOver), проверка контраста.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой контраст считается достаточным?</p>
                <p class="font-weight-regular ma-0">
                  WCAG AA требует соотношение 4.5:1 для обычного текста и 3:1 для крупного (18pt+ или 14pt+ жирный).
                  Уровень AAA более строгий: 7:1 и 4.5:1 соответственно.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Зачем <code>alt</code> у изображений?</p>
                <p class="font-weight-regular ma-0">
                  Скринридеры читают <code>alt</code>-текст вместо изображения. Если изображение декоративное,
                  используйте <code>alt=""</code>. Для информативных изображений описывайте их содержание и контекст.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для проверки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Автоматические</h3>
                  <ul class="pl-4">
                    <li>axe DevTools</li>
                    <li>Lighthouse</li>
                    <li>WAVE</li>
                    <li>Pa11y</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Скринридеры</h3>
                  <ul class="pl-4">
                    <li>NVDA (Windows)</li>
                    <li>JAWS (Windows)</li>
                    <li>VoiceOver (Mac/iOS)</li>
                    <li>TalkBack (Android)</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Ручное тестирование</h3>
                  <ul class="pl-4">
                    <li>Навигация Tab/Shift+Tab</li>
                    <li>Контрастомеры</li>
                    <li>Симуляторы нарушений</li>
                    <li>Масштабирование до 200%</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Веб-доступность — это не «дополнительная функция», а базовое требование качественного веба.
              Следование принципам WCAG, использование семантического HTML, ARIA-атрибутов и регулярное
              тестирование делают ваши проекты доступными для всех пользователей. Это не только этично,
              но и выгодно: расширяется аудитория, улучшается SEO, снижаются правовые риски.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank">
                WCAG Quick Reference
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
