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

            <h2 class="text-h5 font-weight-bold mb-3">Основные ARIA-атрибуты</h2>

            <v-table density="comfortable" class="mb-10">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Атрибут</th>
                <th class="text-left font-weight-bold">Назначение и использование</th>
                <th class="text-left font-weight-bold">Пример</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>role</code></td>
                <td class="pt-2 pb-2">
                  Определяет роль элемента для assistive technologies. Используется когда семантический HTML недостаточен.
                  <br><b>Частые роли:</b> button, dialog, navigation, alert, tabpanel, menuitem
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="button"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-label</code></td>
                <td class="pt-2 pb-2">
                  Добавляет текстовую метку элементу, которая будет прочитана скринридером. Используется когда визуальная метка отсутствует или недостаточна (иконки, кнопки без текста).
                  <br><b>Переопределяет</b> видимый текст элемента.
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-label="Закрыть диалог"&gt;×&lt;/button&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-labelledby</code></td>
                <td class="pt-2 pb-2">
                  Связывает элемент с другим элементом, который служит его меткой. Используется для связи заголовков с контейнерами, модальных окон с их заголовками.
                  <br><b>Приоритет:</b> выше чем aria-label и видимый текст. Можно указать несколько ID через пробел.
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="dialog" aria-labelledby="modal-title"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-describedby</code></td>
                <td class="pt-2 pb-2">
                  Связывает элемент с дополнительным описанием. Используется для подсказок, сообщений об ошибках, дополнительных инструкций к полям форм.
                  <br><b>Отличие от labelledby:</b> описание читается после основной метки и менее приоритетно.
                </td>
                <td class="pt-2 pb-2"><code>&lt;input aria-describedby="password-hint"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-hidden</code></td>
                <td class="pt-2 pb-2">
                  Полностью скрывает элемент и его потомков от assistive technologies. Используется для декоративных элементов, иконок-дубликатов текста, технических элементов.
                  <br><b>⚠️ Осторожно:</b> не скрывает визуально, только от скринридеров.
                </td>
                <td class="pt-2 pb-2"><code>&lt;span aria-hidden="true"&gt;🏠&lt;/span&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-expanded</code></td>
                <td class="pt-2 pb-2">
                  Указывает состояние раскрытия/свёрнутости элемента. Используется для аккордеонов, выпадающих меню, раскрывающихся панелей.
                  <br><b>Значения:</b> true (раскрыто), false (свёрнуто), undefined (не применимо). Нужно программно переключать при изменении состояния.
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-expanded="false" aria-controls="menu"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-controls</code></td>
                <td class="pt-2 pb-2">
                  Указывает ID элемента(ов), которым управляет текущий элемент. Используется с кнопками, управляющими другими областями (табы, модалы, выпадающие списки).
                  <br><b>Связка:</b> часто используется вместе с aria-expanded для навигации.
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-controls="panel-1"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-live</code></td>
                <td class="pt-2 pb-2">
                  Объявляет об изменениях в динамическом контенте. Используется для уведомлений, сообщений чата, обновлений статуса, таймеров.
                  <br><b>Значения:</b> off (не объявлять), polite (объявить когда пользователь не занят), assertive (объявить немедленно).
                </td>
                <td class="pt-2 pb-2"><code>&lt;div aria-live="polite" role="status"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-atomic</code></td>
                <td class="pt-2 pb-2">
                  Определяет, следует ли скринридеру читать весь регион целиком или только изменившуюся часть.
                  Используется вместе с aria-live.
                  <br><b>Значения:</b> true (читать весь контент), false (читать только изменения).
                </td>
                <td class="pt-2 pb-2"><code>&lt;div aria-live="polite" aria-atomic="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-disabled</code></td>
                <td class="pt-2 pb-2">
                  Указывает, что элемент отключен но остаётся в DOM и может получать фокус. Используется когда нужно показать неактивное состояние с сохранением в порядке табуляции.
                  <br><b>Отличие от disabled:</b> HTML disabled полностью убирает элемент из навигации.
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-disabled="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-required</code></td>
                <td class="pt-2 pb-2">
                  Помечает поле формы как обязательное. Используется для информирования пользователей скринридеров о необходимости заполнения.
                  <br><b>Дополнение:</b> не заменяет валидацию, только информирует. Предпочтительнее HTML5 <code>required</code>.
                </td>
                <td class="pt-2 pb-2"><code>&lt;input aria-required="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-invalid</code></td>
                <td class="pt-2 pb-2">
                  Указывает, что значение поля некорректно. Используется после валидации для обозначения ошибок ввода.
                  <br><b>Значения:</b> true (ошибка), false (корректно), grammar (грамматическая ошибка), spelling (орфография).
                  <br><b>Связка:</b> используйте с aria-describedby для описания ошибки.
                </td>
                <td class="pt-2 pb-2"><code>&lt;input aria-invalid="true" aria-describedby="error"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-current</code></td>
                <td class="pt-2 pb-2">
                  Помечает текущий элемент в наборе элементов. Используется для активной страницы в навигации, текущего шага в мастере, активной даты в календаре.
                  <br><b>Значения:</b> page (страница), step (шаг), location (местоположение), date (дата), time (время), true (общий случай).
                </td>
                <td class="pt-2 pb-2"><code>&lt;a href="/about" aria-current="page"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-selected</code></td>
                <td class="pt-2 pb-2">
                  Указывает, что элемент выбран в группе выбираемых элементов. Используется для табов, элементов списка с множественным выбором, выбранных опций.
                  <br><b>Отличие от aria-current:</b> selected для выбора в UI-виджетах, current для навигации/контекста.
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="tab" aria-selected="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-modal</code></td>
                <td class="pt-2 pb-2">
                  Указывает, что элемент является модальным и блокирует взаимодействие с остальным контентом. Используется для модальных окон, диалогов, лайтбоксов.
                  <br><b>Требования:</b> при aria-modal="true" нужно программно управлять фокусом и блокировать навигацию за пределы модала.
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="dialog" aria-modal="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-pressed</code></td>
                <td class="pt-2 pb-2">
                  Указывает состояние кнопки-переключателя (toggle button). Используется для кнопок вкл/выкл, кнопок с сохранением состояния.
                  <br><b>Значения:</b> true (нажато), false (не нажато), mixed (частично нажато для группы).
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-pressed="false"&gt;Подписаться&lt;/button&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-checked</code></td>
                <td class="pt-2 pb-2">
                  Указывает состояние чекбокса или радиокнопки. Используется для кастомных checkbox/radio элементов, элементов с множественным выбором.
                  <br><b>Значения:</b> true (выбрано), false (не выбрано), mixed (частично выбрано).
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="checkbox" aria-checked="true"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-haspopup</code></td>
                <td class="pt-2 pb-2">
                  Указывает, что элемент открывает всплывающий элемент. Используется для кнопок с меню, комбобоксов, элементов с подсказками.
                  <br><b>Значения:</b> true/menu (меню), dialog (диалог), listbox (список), tree (дерево), grid (таблица).
                </td>
                <td class="pt-2 pb-2"><code>&lt;button aria-haspopup="menu"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-valuenow</code></td>
                <td class="pt-2 pb-2">
                  Текущее значение элемента с диапазоном. Используется для слайдеров, прогресс-баров, спиннеров.
                  <br><b>Связка:</b> используется с aria-valuemin, aria-valuemax, aria-valuetext для полного описания.
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"&gt;</code></td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>aria-orientation</code></td>
                <td class="pt-2 pb-2">
                  Указывает ориентацию элемента. Используется для слайдеров, скроллбаров, табов, меню.
                  <br><b>Значения:</b> horizontal (горизонтальная), vertical (вертикальная).
                  <br><b>Важно:</b> влияет на клавиатурную навигацию (стрелки вверх/вниз vs влево/вправо).
                </td>
                <td class="pt-2 pb-2"><code>&lt;div role="tablist" aria-orientation="vertical"&gt;</code></td>
              </tr>
              </tbody>
            </v-table>

            <v-alert type="warning" class="mb-8">
              <b>Правило первого приоритета:</b> Используйте нативные HTML-элементы когда возможно.
              Например, <code>&lt;button&gt;</code> лучше чем <code>&lt;div role="button"&gt;</code>,
              потому что нативные элементы включают клавиатурную навигацию, фокус и семантику по умолчанию.
              ARIA следует использовать только когда HTML недостаточно.
            </v-alert>

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
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как интерпретировать результаты Lighthouse по доступности?</p>
                <p class="font-weight-regular ma-0">
                  Lighthouse показывает автоматически обнаруживаемые проблемы и дает оценку 0-100.
                  Однако автоматические тесты покрывают лишь часть требований WCAG. Оценка 100 не гарантирует
                  полную доступность — обязательно нужно ручное тестирование с клавиатуры и скринридерами.
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

            <h2 class="text-h5 font-weight-bold mb-3">Проверка доступности в Lighthouse</h2>

            <p class="font-weight-regular mb-4">
              Lighthouse — встроенный инструмент Chrome DevTools, который автоматически проверяет множество аспектов доступности.
            </p>

            <v-card class="pa-4 mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Как запустить проверку:</h3>
              <ol class="pl-4 mb-4">
                <li>Открыть DevTools (F12)</li>
                <li>Перейти во вкладку <b>Lighthouse</b></li>
                <li>Выбрать категорию <b>Accessibility</b></li>
                <li>Нажать <b>Analyze page load</b></li>
              </ol>
            </v-card>

            <h3 class="text-h6 font-weight-bold mb-3">Что проверяет Lighthouse:</h3>

            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">✅ Структура документа</h4>
                  <ul class="pl-4">
                    <li>Наличие <code>&lt;html lang&gt;</code></li>
                    <li>Валидные ARIA-атрибуты</li>
                    <li>Уникальные ID</li>
                    <li>Корректная иерархия заголовков</li>
                    <li>Правильные role-атрибуты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">🖼️ Изображения и медиа</h4>
                  <ul class="pl-4">
                    <li>Наличие <code>alt</code> у <code>&lt;img&gt;</code></li>
                    <li>Описательные alt-тексты</li>
                    <li>Субтитры для видео</li>
                    <li>Транскрипты для аудио</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">⌨️ Навигация</h4>
                  <ul class="pl-4">
                    <li>Все элементы доступны с клавиатуры</li>
                    <li>Видимый фокус</li>
                    <li>Правильный порядок табуляции</li>
                    <li>Отсутствие <code>tabindex</code> > 0</li>
                    <li>Обработка клавиатурных событий</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">🎨 Визуальная доступность</h4>
                  <ul class="pl-4">
                    <li>Контраст текста (минимум 4.5:1)</li>
                    <li>Контраст интерактивных элементов (3:1)</li>
                    <li>Размер кликабельных областей (44×44px)</li>
                    <li>Масштабируемость текста</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">📝 Формы</h4>
                  <ul class="pl-4">
                    <li>Связь <code>&lt;label&gt;</code> с <code>&lt;input&gt;</code></li>
                    <li>Описательные имена полей</li>
                    <li>Сообщения об ошибках</li>
                    <li>Атрибуты <code>aria-required</code>, <code>aria-invalid</code></li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h4 class="font-weight-bold mb-2">🔊 Динамический контент</h4>
                  <ul class="pl-4">
                    <li>Использование <code>aria-live</code></li>
                    <li>Корректные role для виджетов</li>
                    <li>Состояния элементов (expanded, selected)</li>
                    <li>Фокус при открытии модалов</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <v-alert type="info" class="mb-6">
              <b>Важно:</b> Lighthouse обнаруживает только ~30-50% проблем доступности.
              Автоматические тесты не заменяют ручное тестирование со скринридерами и навигацией с клавиатуры.
            </v-alert>

            <h3 class="text-h6 font-weight-bold mb-3">Интерпретация результатов:</h3>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Оценка</th>
                <th class="text-left font-weight-bold">Значение</th>
                <th class="text-left font-weight-bold">Действия</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b style="color: #0cce6b">90-100</b></td>
                <td class="pt-2 pb-2">Отлично</td>
                <td class="pt-2 pb-2">Мелкие улучшения, ручное тестирование</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b style="color: #ffa400">50-89</b></td>
                <td class="pt-2 pb-2">Требует внимания</td>
                <td class="pt-2 pb-2">Исправить выявленные проблемы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b style="color: #ff4e42">0-49</b></td>
                <td class="pt-2 pb-2">Критично</td>
                <td class="pt-2 pb-2">Срочно исправить основные нарушения</td>
              </tr>
              </tbody>
            </v-table>

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
