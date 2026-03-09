<script setup lang="ts">
import { onMounted, ref } from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const snippetBasicExample = `
// Styled Components — пример динамических стилей через пропсы
import styled, { ThemeProvider } from 'styled-components';

const Button = styled.button\`
  padding: \${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  background: \${props => props.primary
    ? props.theme.primary
    : props.theme.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: \${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: \${props => props.disabled ? 0.6 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: \${props => props.primary
      ? props.theme.primaryDark
      : props.theme.secondaryDark};
  }
\`;

const theme = {
  primary: '#007bff',
  primaryDark: '#0056b3',
  secondary: '#6c757d',
  secondaryDark: '#545b62'
};

<ThemeProvider theme={theme}>
  <Button primary size="large">Основная кнопка</Button>
  <Button disabled>Недоступная кнопка</Button>
</ThemeProvider>
`

const snippetVanillaExtract = `
// Vanilla Extract — всё вычисляется на этапе сборки, runtime = 0
// button.css.ts
import { style, styleVariants, recipe } from '@vanilla-extract/css';
import { vars } from './theme.css';

const base = style({
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': { transform: 'translateY(-1px)' }
});

export const variants = styleVariants({
  primary: { background: vars.colors.primary, color: 'white' },
  secondary: { background: vars.colors.secondary, color: 'white' },
  ghost: { background: 'transparent', color: vars.colors.primary,
           border: \`1px solid \${vars.colors.primary}\` }
});

export const buttonRecipe = recipe({
  base,
  variants: {
    variant: variants,
    size: {
      small: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '16px 32px', fontSize: '18px' }
    }
  },
  defaultVariants: { variant: 'primary', size: 'medium' }
});

// Компонент — только выбирает нужный класс, никаких вычислений в браузере
export function Button({ variant, size, children }) {
  return <button className={buttonRecipe({ variant, size })}>{children}</button>;
}
`

const snippetHybrid = `
// Гибридный подход: статические классы + CSS-переменные для runtime-значений
// styles.css.ts (Vanilla Extract)
export const dynamicButton = style({
  background: 'var(--btn-bg, #007bff)',
  color: 'var(--btn-color, white)',
  padding: 'var(--btn-padding, 12px 24px)',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
});

// Компонент — статический класс + inline CSS-переменные для уникальных значений
function BrandButton({ brandColor, children }) {
  return (
    <button
      className={dynamicButton}
      style={{ '--btn-bg': brandColor, '--btn-color': getContrastColor(brandColor) }}
    >
      {children}
    </button>
  );
}
`

const highlightedBasic = ref('')
const highlightedVanilla = ref('')
const highlightedHybrid = ref('')

onMounted(() => {
  highlightedBasic.value = Prism.highlight(snippetBasicExample, Prism.languages.javascript, 'javascript')
  highlightedVanilla.value = Prism.highlight(snippetVanillaExtract, Prism.languages.javascript, 'javascript')
  highlightedHybrid.value = Prism.highlight(snippetHybrid, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">

            <!-- Заголовок -->
            <h1 class="text-h4 font-weight-bold mb-4">CSS-in-JS: полное руководство</h1>
            <p class="font-weight-regular mb-8">
              CSS-in-JS — подход, при котором стили описываются непосредственно в JavaScript-коде.
              Стили могут генерироваться динамически во время выполнения или компилироваться в статические
              CSS-файлы на этапе сборки. В этой статье разберём, что такое CSS-in-JS, какие библиотеки существуют,
              чем они отличаются и как выбрать правильный инструмент.
            </p>

            <!-- Что такое CSS-in-JS -->
            <h2 class="text-h5 font-weight-bold mb-3">Что такое CSS-in-JS и зачем это нужно</h2>
            <p class="font-weight-regular mb-4">
              Традиционный CSS глобален по своей природе: любой класс, объявленный в одном месте, может
              случайно перекрыть стили в другом. В больших командах это превращается в нескончаемую борьбу
              с именами классов, специфичностью и «мёртвыми» стилями, которые никто не решается удалить.
            </p>
            <p class="font-weight-regular mb-4">
              CSS-in-JS решает эту проблему, привязывая стили к конкретному компоненту. Библиотека автоматически
              генерирует уникальные хэшированные имена классов, устраняя конфликты. Кроме того, стили
              становятся реактивными: они могут меняться в зависимости от пропсов, состояния или темы
              без единой строчки ручной манипуляции с DOM.
            </p>
            <p class="font-weight-regular mb-8">
              Важно понимать, что CSS-in-JS — это не один инструмент, а целый класс решений с разными
              компромиссами. Одни библиотеки генерируют CSS прямо в браузере (runtime), другие извлекают
              его на этапе сборки (pre-compile). Выбор между ними определяет производительность,
              гибкость и сложность проекта.
            </p>

            <!-- Обзор библиотек -->
            <h2 class="text-h5 font-weight-bold mb-3">Основные библиотеки</h2>
            <p class="font-weight-regular mb-4">
              Экосистема CSS-in-JS достаточно разнообразна. Ниже — ключевые игроки с их характеристиками:
            </p>
            <v-table density="comfortable" class="mb-4">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Библиотека</th>
                <th class="text-left font-weight-bold">Синтаксис</th>
                <th class="text-left font-weight-bold">Runtime</th>
                <th class="text-left font-weight-bold">Bundle</th>
                <th class="text-left font-weight-bold">TypeScript</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2 text-error">Да</td>
                <td class="pt-2 pb-2">~40kb</td>
                <td class="pt-2 pb-2 text-warning">Средний</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Emotion</b></td>
                <td class="pt-2 pb-2">Objects + strings</td>
                <td class="pt-2 pb-2 text-error">Да</td>
                <td class="pt-2 pb-2">~20kb</td>
                <td class="pt-2 pb-2 text-success">Отличный</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>JSS</b></td>
                <td class="pt-2 pb-2">JS-объекты</td>
                <td class="pt-2 pb-2 text-error">Да</td>
                <td class="pt-2 pb-2">~25kb</td>
                <td class="pt-2 pb-2 text-success">Хороший</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Stitches</b></td>
                <td class="pt-2 pb-2">Система вариантов</td>
                <td class="pt-2 pb-2 text-warning">Минимальный</td>
                <td class="pt-2 pb-2">~10kb</td>
                <td class="pt-2 pb-2 text-success">Отличный</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vanilla Extract</b></td>
                <td class="pt-2 pb-2">TS-объекты</td>
                <td class="pt-2 pb-2 text-success">Нет</td>
                <td class="pt-2 pb-2">~2kb</td>
                <td class="pt-2 pb-2 text-success">Отличный</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Linaria</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2 text-success">Нет</td>
                <td class="pt-2 pb-2">~0kb</td>
                <td class="pt-2 pb-2 text-warning">Средний</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Goober</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2 text-error">Да</td>
                <td class="pt-2 pb-2">~1kb</td>
                <td class="pt-2 pb-2 text-warning">Средний</td>
              </tr>
              </tbody>
            </v-table>
            <p class="font-weight-regular mb-8">
              <b>Styled Components</b> — самая популярная библиотека с огромным сообществом.
              <b>Emotion</b> — быстрее и гибче, поддерживает как объектный, так и строковый синтаксис.
              <b>JSS</b> отличается плагинной архитектурой и чистым JS-объектным подходом.
              <b>Stitches</b> предлагает систему вариантов и минимальный runtime.
              <b>Vanilla Extract</b> и <b>Linaria</b> — zero-runtime решения, извлекающие CSS на этапе сборки.
              <b>Goober</b> — ультралёгкая альтернатива для небольших проектов.
            </p>

            <!-- Пример кода: runtime -->
            <h2 class="text-h5 font-weight-bold mb-3">Как выглядит CSS-in-JS на практике</h2>
            <p class="font-weight-regular mb-4">
              Ниже — типичный пример runtime CSS-in-JS (Styled Components): стили вычисляются
              прямо в браузере на основе пропсов и темы.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasic"></code></pre>

            <!-- Плюсы и минусы -->
            <h2 class="text-h5 font-weight-bold mb-3">Преимущества CSS-in-JS</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎯 Изоляция стилей</h3>
                  <p>
                    Автоматически генерируются уникальные имена классов — никаких конфликтов между
                    компонентами. Стиль живёт рядом с компонентом и удаляется вместе с ним,
                    исключая «мёртвый» CSS.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Динамичность</h3>
                  <p>
                    Стили реагируют на пропсы, состояние и тему в реальном времени. Условная логика
                    любой сложности — прямо в CSS, без манипуляций с классами вручную.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎨 Тематизация</h3>
                  <p>
                    ThemeProvider передаёт тему через контекст. Переключение светлой и тёмной темы,
                    брендовые вариации — всё это без дополнительных CSS-классов или data-атрибутов.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔧 Developer Experience</h3>
                  <p>
                    TypeScript-поддержка, автокомплит CSS-свойств, отладка в DevTools с понятными
                    именами компонентов. Один язык для логики и стилей снижает переключение контекста.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 SSR и критические стили</h3>
                  <p>
                    Стили собираются на сервере и вставляются в HTML как критические — страница
                    отображается корректно сразу, без «вспышки» нестилизованного контента (FOUC).
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📦 Компонентный подход</h3>
                  <p>
                    Стиль, логика и разметка компонента хранятся вместе. Это упрощает переиспользование,
                    рефакторинг и понимание кода — особенно в больших командах.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Недостатки CSS-in-JS</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🐌 Runtime-накладные расходы</h3>
                  <p>
                    Runtime-библиотеки вычисляют и инжектируют CSS при каждом рендере.
                    Это добавляет 5–15ms на рендер, увеличивает размер JS-бандла на 12–40kb
                    и может вызывать лишние перерисовки при изменении пропсов.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📈 Кривая обучения</h3>
                  <p>
                    CSS-разработчикам и дизайнерам, незнакомым с JavaScript, будет непросто.
                    Разные библиотеки предлагают разные API, что усложняет переход между проектами
                    и создаёт зависимость от конкретного инструмента.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔒 Технические ограничения</h3>
                  <p>
                    Сгенерированные стили не кэшируются браузером как статические CSS-файлы.
                    Некоторые функции CSS поддерживаются ограниченно. Строгие CSP-политики
                    (Content Security Policy) могут блокировать inline-стили.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔧 Инструментарий</h3>
                  <p>
                    Поддержка IDE и линтеров остаётся слабее, чем у обычного CSS.
                    Отсутствие единого стандарта приводит к фрагментации экосистемы,
                    а миграция между библиотеками требует значительных усилий.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Runtime vs Pre-compile -->
            <h2 class="text-h5 font-weight-bold mb-3">Runtime против Pre-compile: ключевое различие</h2>
            <p class="font-weight-regular mb-4">
              Это одно из самых важных архитектурных решений при выборе CSS-in-JS. Два подхода дают
              принципиально разные компромиссы между гибкостью и производительностью.
            </p>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-l-lg border-primary">
                  <h3 class="text-h6 font-weight-bold mb-3 text-primary">🔄 Runtime</h3>
                  <p class="mb-3">
                    CSS генерируется прямо в браузере при каждом рендере. Библиотека вычисляет
                    стили на основе текущих пропсов и состояния, создаёт уникальный класс и
                    инжектирует его в &lt;head&gt;.
                  </p>
                  <p class="mb-2"><b>Библиотеки:</b> Styled Components, Emotion, JSS, Goober</p>
                  <p class="mb-2"><b>Главное преимущество:</b> неограниченная динамичность — любые вычисления, любые данные из API или состояния</p>
                  <p class="mb-0"><b>Главный недостаток:</b> накладные расходы в runtime, увеличенный бандл</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-l-lg border-success">
                  <h3 class="text-h6 font-weight-bold mb-3 text-success">⚡ Pre-compile</h3>
                  <p class="mb-3">
                    CSS извлекается в статические файлы на этапе сборки. В браузер попадает уже
                    готовый CSS-файл, а компонент лишь выбирает нужный класс из предопределённого набора.
                  </p>
                  <p class="mb-2"><b>Библиотеки:</b> Vanilla Extract, Linaria, Compiled</p>
                  <p class="mb-2"><b>Главное преимущество:</b> нулевой runtime-overhead, браузерное кэширование статического CSS</p>
                  <p class="mb-0"><b>Главный недостаток:</b> ограниченная динамичность — все варианты стилей должны быть известны заранее</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Детальное сравнение характеристик</h2>
            <v-table density="comfortable" class="mb-6">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Runtime</th>
                <th class="text-left font-weight-bold">Pre-compile</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-3 pb-3"><b>Bundle Size</b></td>
                <td class="pt-3 pb-3 text-error">12–40kb</td>
                <td class="pt-3 pb-3 text-success">~2kb</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Overhead на рендер</b></td>
                <td class="pt-3 pb-3 text-error">5–15ms</td>
                <td class="pt-3 pb-3 text-success">~1ms</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Кэширование CSS</b></td>
                <td class="pt-3 pb-3 text-error">Нет</td>
                <td class="pt-3 pb-3 text-success">Да (статический файл)</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Динамические стили</b></td>
                <td class="pt-3 pb-3 text-success">Любые</td>
                <td class="pt-3 pb-3 text-error">Только предопределённые варианты</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>TypeScript</b></td>
                <td class="pt-3 pb-3 text-warning">Ограниченный</td>
                <td class="pt-3 pb-3 text-success">Полная типизация</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>SSR-производительность</b></td>
                <td class="pt-3 pb-3 text-warning">Средняя</td>
                <td class="pt-3 pb-3 text-success">Отличная</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Hot Reload</b></td>
                <td class="pt-3 pb-3 text-success">Мгновенный</td>
                <td class="pt-3 pb-3 text-warning">Требует пересборки</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Порог входа</b></td>
                <td class="pt-3 pb-3 text-success">Низкий</td>
                <td class="pt-3 pb-3 text-warning">Выше</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Пример: Vanilla Extract -->
            <p class="font-weight-regular mb-4">
              Пример pre-compile подхода с Vanilla Extract: все варианты объявляются статически,
              CSS генерируется при сборке, в браузере — только выбор класса.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedVanilla"></code></pre>

            <!-- Гибридный подход -->
            <h2 class="text-h5 font-weight-bold mb-3">Гибридный подход: лучшее из двух миров</h2>
            <p class="font-weight-regular mb-4">
              На практике часто оптимальным решением является комбинация: pre-compile для базовых
              компонентов дизайн-системы и runtime-логика только там, где она действительно нужна.
              Ключевым мостом между подходами служат CSS-переменные: статический класс задаёт структуру,
              а inline-стиль через CSS custom properties передаёт динамическое значение без пересчёта CSS.
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedHybrid"></code></pre>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Pre-compile покрывает</h3>
                  <ul class="pl-4">
                    <li>Базовые компоненты дизайн-системы</li>
                    <li>Layout и типографику</li>
                    <li>Предопределённые варианты кнопок, карточек, форм</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Runtime — только для</h3>
                  <ul class="pl-4">
                    <li>Пользовательских тем и брендовых цветов</li>
                    <li>Анимаций на основе live-данных</li>
                    <li>A/B-тестирования стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">CSS-переменные как мост</h3>
                  <ul class="pl-4">
                    <li>Динамические значения без пересчёта CSS</li>
                    <li>Кэшируемый статический класс</li>
                    <li>Нативная поддержка всех браузеров</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Сравнение с другими подходами -->
            <h2 class="text-h5 font-weight-bold mb-3">CSS-in-JS vs CSS Modules vs обычный CSS</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">CSS-in-JS</th>
                <th class="text-left font-weight-bold">CSS Modules</th>
                <th class="text-left font-weight-bold">Обычный CSS</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Изоляция</b></td>
                <td class="pt-2 pb-2 text-success">Автоматическая</td>
                <td class="pt-2 pb-2 text-success">Автоматическая</td>
                <td class="pt-2 pb-2 text-error">Ручная</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Динамичность</b></td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-warning">Ограниченная</td>
                <td class="pt-2 pb-2 text-error">Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность</b></td>
                <td class="pt-2 pb-2 text-warning">Runtime overhead</td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-success">Лучшая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Кэширование</b></td>
                <td class="pt-2 pb-2 text-error">Нет (runtime)</td>
                <td class="pt-2 pb-2 text-success">Да</td>
                <td class="pt-2 pb-2 text-success">Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>TypeScript</b></td>
                <td class="pt-2 pb-2 text-success">Отличный</td>
                <td class="pt-2 pb-2 text-warning">Ограниченный</td>
                <td class="pt-2 pb-2 text-error">Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Удобство разработки</b></td>
                <td class="pt-2 pb-2 text-success">Высокое</td>
                <td class="pt-2 pb-2 text-success">Хорошее</td>
                <td class="pt-2 pb-2 text-warning">Среднее</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Где использовать -->
            <h2 class="text-h5 font-weight-bold mb-3">Где стоит использовать CSS-in-JS</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-success">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">✅ Идеально подходит</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>React/Vue-приложения</b> с компонентной архитектурой</li>
                    <li class="mb-1"><b>Дизайн-системы</b> с множеством вариантов компонентов</li>
                    <li class="mb-1"><b>Приложения с темами</b> — светлая/тёмная, мультибрендовость</li>
                    <li class="mb-1"><b>Библиотеки компонентов</b> для переиспользования</li>
                    <li class="mb-1"><b>Динамические стили</b> на основе пользовательских данных</li>
                    <li class="mb-1"><b>Микрофронтенды</b> — полная изоляция стилей между командами</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-error">
                  <h3 class="text-h6 font-weight-bold mb-2 text-error">❌ Не рекомендуется</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>Статические сайты</b> без интерактивности</li>
                    <li class="mb-1"><b>Email-шаблоны</b> — ограниченная поддержка</li>
                    <li class="mb-1"><b>Проекты с жёсткими CSP</b> — inline-стили могут быть заблокированы</li>
                    <li class="mb-1"><b>Небольшие проекты</b> с простой стилизацией</li>
                    <li class="mb-1"><b>Команды без опыта JS</b> — слишком высокий порог входа</li>
                    <li class="mb-1"><b>Критичная производительность</b> на слабых устройствах</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Как выбрать библиотеку -->
            <h2 class="text-h5 font-weight-bold mb-3">Как выбрать конкретную библиотеку</h2>
            <p class="font-weight-regular mb-4">
              Нет универсального ответа — выбор зависит от требований проекта, опыта команды
              и долгосрочных планов. Вот практические рекомендации:
            </p>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-primary">Styled Components</h3>
                  <p class="mb-2">Выбирайте, если команда привыкла к CSS-синтаксису, нужна максимальная гибкость
                    и большое сообщество с готовыми решениями. Хорош для React-экосистемы с активной
                    тематизацией. Избегайте, если критична производительность или нужен строгий TypeScript.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">Emotion</h3>
                  <p class="mb-2">Лучший баланс гибкости и производительности среди runtime-решений.
                    Поддерживает оба синтаксиса, отличная TypeScript-интеграция, используется в MUI.
                    Хороший выбор для больших приложений, где важен DX.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">Stitches</h3>
                  <p class="mb-2">Идеален для дизайн-систем с предсказуемыми вариантами стилей.
                    Система вариантов + compound variants даёт отличную типизацию и читаемость.
                    Менее подходит, если много произвольных runtime-вычислений.</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2 text-info">Vanilla Extract</h3>
                  <p class="mb-2">Выбор для проектов, где производительность критична: zero-runtime,
                    статический CSS, полная TypeScript-типизация включая токены темы. Требует
                    предопределить все варианты заранее — не подойдёт для сильно динамичных интерфейсов.</p>
                </v-card>
              </v-col>
            </v-row>

            <v-alert type="info" class="mb-8">
              <p class="mb-2"><b>Практическое правило для новых проектов (2024–2025):</b></p>
              <ul class="pl-4 ma-0">
                <li>Небольшой проект — Goober или встроенные решения фреймворка</li>
                <li>Средний проект с динамикой — Emotion или Stitches</li>
                <li>Большой проект / дизайн-система — Vanilla Extract + TypeScript</li>
                <li>Начать с CSS Modules и переходить на CSS-in-JS только по мере роста сложности</li>
              </ul>
            </v-alert>

            <!-- Оптимизация и практика -->
            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <p class="font-weight-regular mb-4">
              Если вы выбрали runtime CSS-in-JS и столкнулись с проблемами производительности,
              есть несколько эффективных техник:
            </p>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 Техники оптимизации</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>Мемоизация стилей</b> через useMemo — вычисляйте объект стилей только при изменении зависимостей, а не при каждом рендере</li>
                    <li class="mb-1"><b>Статическая экстракция</b> через babel-плагины — часть стилей вычисляется при сборке</li>
                    <li class="mb-1"><b>CSS-переменные</b> вместо динамических интерполяций — сокращают количество генерируемых классов</li>
                    <li class="mb-1"><b>SSR с критическими стилями</b> — вставляйте только нужные стили в HTML, остальное загружайте асинхронно</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Измерение производительности</h3>
                  <ul class="pl-4">
                    <li class="mb-1"><b>Bundle Analyzer</b> — оцените реальный размер CSS-in-JS библиотеки в бандле</li>
                    <li class="mb-1"><b>React DevTools Profiler</b> — найдите компоненты с лишними пересчётами стилей</li>
                    <li class="mb-1"><b>Chrome DevTools / Rendering</b> — отслеживайте paint и layout, вызванные динамическими стилями</li>
                    <li class="mb-1"><b>Web Vitals / CLS</b> — динамические стили могут вызывать layout shift при SSR</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <!-- Миграция -->
            <h2 class="text-h5 font-weight-bold mb-3">Миграция на CSS-in-JS и между библиотеками</h2>
            <p class="font-weight-regular mb-4">
              Миграция не должна быть всё-или-ничего. Правильная стратегия — постепенный переход,
              компонент за компонентом. Обе системы могут сосуществовать в одном проекте: старые
              компоненты на CSS Modules, новые на CSS-in-JS. Так снижается риск и упрощается
              code review.
            </p>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Откуда → Куда</th>
                <th class="text-left font-weight-bold">Сложность</th>
                <th class="text-left font-weight-bold">Основные изменения</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">CSS → Styled Components / Emotion</td>
                <td class="pt-2 pb-2 text-warning">Средняя</td>
                <td class="pt-2 pb-2">Перенос стилей в компоненты, замена классов на styled</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">CSS Modules → CSS-in-JS</td>
                <td class="pt-2 pb-2 text-warning">Средняя</td>
                <td class="pt-2 pb-2">Упразднение .module.css файлов, логика в компонентах</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Styled Components → Emotion</td>
                <td class="pt-2 pb-2 text-success">Лёгкая</td>
                <td class="pt-2 pb-2">Замена импортов, небольшие API-отличия</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Runtime → Vanilla Extract</td>
                <td class="pt-2 pb-2 text-error">Сложная</td>
                <td class="pt-2 pb-2">Новая архитектура, статические варианты вместо динамики</td>
              </tr>
              </tbody>
            </v-table>

            <!-- Тренды -->
            <h2 class="text-h5 font-weight-bold mb-3">Современные тренды</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔄 Zero-runtime</h3>
                  <p>
                    Главный тренд последних лет — отказ от runtime-вычислений в пользу compile-time.
                    Vanilla Extract, Linaria, Compiled от Facebook, Tamagui для React Native —
                    все они извлекают CSS на этапе сборки.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎯 TypeScript-first</h3>
                  <p>
                    Полная типизация CSS-свойств и значений токенов темы становится стандартом.
                    Vanilla Extract генерирует типы из конфигурации темы, исключая случайные опечатки
                    в именах переменных и значениях.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Новые CSS-стандарты</h3>
                  <p>
                    CSS Houdini, Container Queries, CSS Layers и нативные CSS-переменные постепенно
                    закрывают задачи, для которых раньше был нужен CSS-in-JS. Это меняет
                    соотношение сил в пользу более простых решений.
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Вопросы -->
            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём главное преимущество CSS-in-JS перед обычным CSS?</p>
                <p class="font-weight-regular ma-0">
                  Автоматическая изоляция стилей и реактивность. Стили вычисляются на основе состояния
                  компонента, не конфликтуют с другими компонентами и удаляются вместе с ним.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чём разница между runtime и zero-runtime подходами?</p>
                <p class="font-weight-regular ma-0">
                  Runtime (Styled Components, Emotion) генерируют CSS в браузере — гибко, но с накладными
                  расходами. Zero-runtime (Vanilla Extract, Linaria) извлекают CSS при сборке —
                  быстрее и меньше бандл, но все варианты стилей должны быть известны заранее.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем Styled Components отличается от Emotion?</p>
                <p class="font-weight-regular ma-0">
                  Оба runtime, но Emotion легче (~20kb против ~40kb), поддерживает объектный синтаксис
                  наряду со строковым, имеет лучшую TypeScript-интеграцию. Styled Components популярнее,
                  больше сообщество и экосистема плагинов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает SSR с CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Стили собираются на сервере (например, ServerStyleSheet в Styled Components),
                  вставляются в HTML как критические &lt;style&gt;-теги, затем гидратируются на клиенте.
                  Это предотвращает FOUC и улучшает LCP.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать производительность runtime CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Мемоизировать объекты стилей через useMemo, использовать CSS-переменные вместо
                  динамических интерполяций, применять babel-плагины для статической экстракции,
                  рассмотреть миграцию на zero-runtime если проблемы системные.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда не стоит использовать CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Для статических сайтов, email-шаблонов, проектов с жёсткими CSP,
                  при критичной производительности на слабых устройствах или в командах без
                  опыта JavaScript. В этих случаях CSS Modules или Tailwind — лучший выбор.
                </p>
              </li>
            </ol>

            <!-- Заключение -->
            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-4">
              CSS-in-JS — мощный инструмент, хорошо решающий реальные проблемы больших компонентных
              приложений: изоляцию стилей, тематизацию, динамичность и коллокацию кода.
              Но он не является серебряной пулей.
            </p>
            <p class="font-weight-regular mb-6">
              Ключевое решение — runtime против pre-compile — определяет большинство характеристик
              проекта. Runtime даёт свободу и скорость разработки, pre-compile — производительность
              и типизацию. Гибридный подход с CSS-переменными часто оказывается оптимальным компромиссом.
              Для статических сайтов и простых проектов традиционные подходы по-прежнему предпочтительнее.
            </p>

            <div class="d-flex justify-space-between flex-wrap">
              <v-btn color="primary" size="small" variant="elevated"
                     href="https://styled-components.com/" target="_blank" class="mb-2">
                Styled Components
              </v-btn>
              <v-btn color="secondary" size="small" variant="elevated"
                     href="https://emotion.sh/" target="_blank" class="mb-2">
                Emotion
              </v-btn>
              <v-btn color="warning" size="small" variant="elevated"
                     href="https://stitches.dev/" target="_blank" class="mb-2">
                Stitches
              </v-btn>
              <v-btn color="success" size="small" variant="elevated"
                     href="https://vanilla-extract.style/" target="_blank" class="mb-2">
                Vanilla Extract
              </v-btn>
            </div>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
