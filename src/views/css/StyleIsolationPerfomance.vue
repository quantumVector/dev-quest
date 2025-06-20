<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Без изоляции - высокая специфичность */
body .sidebar .widget .card .header .title {
  font-size: 1.2rem;
  color: #333;
}

/* Необходимость перебивать стили */
.content-area .sidebar .widget .card .header .title {
  color: #666 !important;
}

/* Проблемы с рефакторингом */
.old-widget .card .title {
  /* Кто-то может зависеть от этого стиля */
  margin-bottom: 15px;
}
`

const snippet2 = `
/* CSS Modules - предсказуемая производительность */
/* Button.module.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

.primary { background: #007bff; }
.secondary { background: #6c757d; }

/* Результат: простые селекторы с низкой специфичностью */
.Button_button__3xKL2 { /* ... */ }
.Button_primary__2kF9x { /* ... */ }
`

const snippet3 = `
// Runtime CSS-in-JS - динамические накладные расходы
import styled from 'styled-components';

const DynamicButton = styled.button\`
  background: \${props => {
    // Вычисления на каждый рендер
    const baseColor = props.theme.primary;
    const alpha = props.active ? 1 : 0.8;
    return \`rgba(\${baseColor}, \${alpha})\`;
  }};

  padding: \${props => {
    // Условная логика
    switch(props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
\`;

// Каждый рендер = новые вычисления стилей
function App() {
  const [active, setActive] = useState(false);

  return (
    <DynamicButton
      active={active}
      size="large"
      theme={{ primary: '74, 144, 226' }}
    >
      Кнопка
    </DynamicButton>
  );
}
`

const snippet4 = `
/* Zero-runtime CSS-in-JS - оптимизированный подход */
import { style, createVar } from '@vanilla-extract/css';

// Переменные извлекаются в CSS custom properties
const primaryColor = createVar();
const buttonSize = createVar();

// Стили компилируются в статический CSS
const button = style({
  vars: {
    [primaryColor]: '#007bff',
    [buttonSize]: '12px 24px'
  },
  background: primaryColor,
  padding: buttonSize,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
});

// Варианты также статические
const variants = {
  small: style({ vars: { [buttonSize]: '8px 16px' } }),
  large: style({ vars: { [buttonSize]: '16px 32px' } })
};
`

const snippet5 = `
/* Shadow DOM - изолированная производительность */
class PerformantWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // CSS парсится только один раз
    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          /* Изолированный контекст стилей */
          contain: layout style paint;
          display: block;
        }

        .widget {
          /* Простые селекторы, быстрый матчинг */
          padding: 20px;
          border: 1px solid #ddd;
        }

        .title {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      </style>

      <div class="widget">
        <h3 class="title"><slot name="title"></slot></h3>
        <div><slot></slot></div>
      </div>
    \`;
  }
}

// Стили не пересчитываются для внешних элементов
customElements.define('performant-widget', PerformantWidget);
`

const snippet6 = `
/* Сравнение производительности селекторов */

/* МЕДЛЕННО - глубокая вложенность, высокая специфичность */
.layout .sidebar .navigation .menu .item .link:hover {
  color: blue;
}

/* БЫСТРО - CSS Modules, простые селекторы */
.Navigation_link__abc123:hover {
  color: blue;
}

/* МЕДЛЕННО - универсальные селекторы */
* .widget * .button {
  margin: 5px;
}

/* БЫСТРО - изолированные классы */
.Widget_button__def456 {
  margin: 5px;
}

/* МЕДЛЕННО - псевдоселекторы на вложенных элементах */
.form div:nth-child(odd) input:not(:disabled):hover {
  border-color: red;
}

/* БЫСТРО - прямое обращение к элементу */
.FormInput_input__ghi789:hover {
  border-color: red;
}
`

const snippet7 = `
// Сопровождаемость - до изоляции
/* global.css - сложно понять зависимости */
.button { background: blue; }
.card .button { background: red; } /* Кто использует? */
.sidebar .button { background: green; } /* Безопасно ли удалить? */

/* home.css */
.hero .button { background: orange; } /* Конфликт с .card .button? */

/* products.css */
.product-card .button { background: purple; } /* Еще один конфликт */

// Проблемы:
// 1. Неясно, какие стили где используются
// 2. Страх удалять код
// 3. Отладка требует знания всей кодовой базы
// 4. Рефакторинг может сломать неожиданные места
`

const snippet8 = `
// Сопровождаемость - с изоляцией
/* Button.module.css - понятная область действия */
.button {
  background: var(--button-bg, blue);
  padding: 12px 24px;
}

.primary { --button-bg: #007bff; }
.secondary { --button-bg: #6c757d; }

// Button.jsx - явные зависимости
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      {children}
    </button>
  );
}

// Преимущества:
// 1. Локальные стили - безопасно изменять
// 2. Явный импорт - видны зависимости
// 3. TypeScript поддержка для CSS классов
// 4. Tree-shaking удаляет неиспользуемые стили
// 5. Рефакторинг IDE работает корректно
`

const snippet9 = `
/* Мониторинг производительности CSS */

// 1. Измерение времени стилизации
performance.mark('styles-start');
document.head.appendChild(styleElement);
performance.mark('styles-end');
performance.measure('styles-duration', 'styles-start', 'styles-end');

// 2. CSS containment для изоляции перерасчетов
.isolated-component {
  contain: layout style paint;
}

// 3. Критические стили inline
<style>
  .above-fold { /* критические стили */ }
</style>

// 4. Ленивая загрузка стилей
const loadStyles = async (componentName) => {
  const styles = await import(\`./\${componentName}.module.css\`);
  return styles;
};

// 5. Профилирование в DevTools
// Performance > Rendering > Paint flashing
// Shows which elements are being repainted
`

const snippet10 = `
/* Оптимизация bundle size с изоляцией */

// CSS Modules + PurgeCSS
// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
}

// Tree-shaking CSS-in-JS
import { styled } from '@compiled/react';

// Только используемые стили попадают в bundle
const Button = styled.button\`
  padding: 12px 24px;
  background: #007bff;
\`;

// Dynamic imports для code splitting
const LazyStyledComponent = lazy(() =>
  import('./HeavyComponent').then(module => ({
    default: module.StyledHeavyComponent
  }))
);
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
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.css, 'css')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              10. Как изоляция стилей влияет на производительность и сопровождаемость кода?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Изоляция стилей</b> кардинально влияет на производительность рендеринга и качество кода.
              Правильный выбор метода изоляции может улучшить время загрузки, стабильность приложения
              и удобство разработки, в то время как неправильный подход может добавить накладные расходы.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на производительность</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Метод изоляции</th>
                <th class="text-left font-weight-bold">Runtime overhead</th>
                <th class="text-left font-weight-bold">Bundle size</th>
                <th class="text-left font-weight-bold">CSS parsing</th>
                <th class="text-left font-weight-bold">Layout/Paint</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Modules</b></td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">Оптимальный</td>
                <td class="pt-2 pb-2">Быстрый</td>
                <td class="pt-2 pb-2">Быстрый</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">Средний</td>
                <td class="pt-2 pb-2">Большой</td>
                <td class="pt-2 pb-2">Динамический</td>
                <td class="pt-2 pb-2">Средний</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vue Scoped</b></td>
                <td class="pt-2 pb-2">Минимальный</td>
                <td class="pt-2 pb-2">Оптимальный</td>
                <td class="pt-2 pb-2">Быстрый</td>
                <td class="pt-2 pb-2">Быстрый</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Shadow DOM</b></td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">Минимальный</td>
                <td class="pt-2 pb-2">Изолированный</td>
                <td class="pt-2 pb-2">Очень быстрый</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Zero-runtime CSS-in-JS</b></td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">Оптимальный</td>
                <td class="pt-2 pb-2">Быстрый</td>
                <td class="pt-2 pb-2">Быстрый</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>BEM</b></td>
                <td class="pt-2 pb-2">Нет</td>
                <td class="pt-2 pb-2">Может расти</td>
                <td class="pt-2 pb-2">Средний</td>
                <td class="pt-2 pb-2">Средний</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы производительности без изоляции</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизированные решения</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. CSS Modules - статическая оптимизация</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. Runtime CSS-in-JS - накладные расходы</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">3. Zero-runtime подход - лучшее из двух миров</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">4. Shadow DOM - нативная изоляция</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение производительности селекторов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Влияние на сопровождаемость</h2>

            <h3 class="text-h6 font-weight-bold mb-3">Проблемы без изоляции</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Преимущества изолированных стилей</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Метрики сопровождаемости</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Положительные метрики</h3>
                  <ul class="pl-4">
                    <li><b>Локальность изменений</b> - изменения не влияют на другие компоненты</li>
                    <li><b>Предсказуемость</b> - стили работают одинаково в разных контекстах</li>
                    <li><b>Удаляемость</b> - безопасное удаление неиспользуемого кода</li>
                    <li><b>Типизация</b> - IDE поддержка и автодополнение</li>
                    <li><b>Tree-shaking</b> - автоматическое удаление мертвого кода</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Проблемные зоны</h3>
                  <ul class="pl-4">
                    <li><b>Размер конфигурации</b> - сложность настройки сборки</li>
                    <li><b>Обучение команды</b> - необходимость изучения новых подходов</li>
                    <li><b>Отладка</b> - сложность инспектирования генерируемых классов</li>
                    <li><b>Совместимость</b> - интеграция с legacy кодом</li>
                    <li><b>Vendor lock-in</b> - привязка к конкретным решениям</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Мониторинг и оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация размера bundle</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой подход к изоляции наиболее производителен?</p>
                <p class="font-weight-regular ma-0">
                  Shadow DOM для нативной изоляции, CSS Modules для статического анализа,
                  Zero-runtime CSS-in-JS для баланса гибкости и производительности.
                  Избегайте runtime CSS-in-JS в высоконагруженных приложениях.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как измерить влияние изоляции на производительность?</p>
                <p class="font-weight-regular ma-0">
                  Chrome DevTools Performance tab, измерение времени Recalculate Style,
                  Bundle Analyzer для размера CSS, Lighthouse для метрик загрузки.
                  Сравнивать до/после внедрения изоляции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как изоляция влияет на время разработки?</p>
                <p class="font-weight-regular ma-0">
                  Изначально замедляет (настройка, обучение), затем значительно ускоряет
                  за счет предсказуемости, автодополнения IDE, безопасного рефакторинга
                  и отсутствия отладки конфликтов стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда изоляция может ухудшить производительность?</p>
                <p class="font-weight-regular ma-0">
                  Runtime CSS-in-JS с частыми пересчетами, чрезмерная фрагментация CSS,
                  неэффективные селекторы в CSS-in-JS, большое количество динамических стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как внедрить изоляцию в существующий проект?</p>
                <p class="font-weight-regular ma-0">
                  Постепенно: новые компоненты с изоляцией, рефакторинг критических частей,
                  использование CSS Modules/Scoped styles, миграция с глобальных стилей.
                  Измерять метрики на каждом этапе.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как обеспечить кроссбраузерность изолированных стилей?</p>
                <p class="font-weight-regular ma-0">
                  CSS Modules и Scoped styles работают везде, Shadow DOM требует полифилов,
                  CSS-in-JS обычно имеет встроенную поддержку autoprefixer.
                  Проверять поддержку целевых браузеров.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации по выбору</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Высокая производительность</h3>
                  <ul class="pl-4">
                    <li>Shadow DOM для Web Components</li>
                    <li>CSS Modules для React/Vue</li>
                    <li>Zero-runtime CSS-in-JS</li>
                    <li>Scoped styles во фреймворках</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Средняя производительность</h3>
                  <ul class="pl-4">
                    <li>Emotion с оптимизациями</li>
                    <li>Styled Components v5+</li>
                    <li>BEM с минификацией</li>
                    <li>Utility-first CSS</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Избегать для performance</h3>
                  <ul class="pl-4">
                    <li>Runtime CSS-in-JS без кеширования</li>
                    <li>Глубокие селекторы</li>
                    <li>Частые динамические стили</li>
                    <li>Неоптимизированный global CSS</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Изоляция стилей значительно улучшает сопровождаемость кода через предсказуемость,
              локальность изменений и безопасный рефакторинг. Влияние на производительность зависит
              от выбранного метода: статические решения (CSS Modules, Scoped) оптимальны,
              runtime CSS-in-JS требует осторожности, а Shadow DOM обеспечивает лучшую производительность
              рендеринга. Современные zero-runtime подходы объединяют преимущества гибкости и производительности.
            </p>

            <v-alert type="info" class="mb-6">
              <template v-slot:prepend>
                <v-icon>mdi-lightbulb-outline</v-icon>
              </template>
              <div>
                <p class="mb-2 font-weight-bold">Золотое правило выбора:</p>
                <p class="ma-0">
                  Для production приложений приоритет: производительность → сопровождаемость → гибкость.
                  Для библиотек компонентов: изоляция → производительность → DX.
                  Измеряйте реальные метрики в вашем контексте.
                </p>
              </div>
            </v-alert>

            <div class="d-flex justify-end">
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS"
                target="_blank">
                CSS performance optimization
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
