<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Проблемы абсолютных единиц */
.header {
  font-size: 24px; /* Не адаптируется к настройкам пользователя */
  padding: 20px;   /* Не масштабируется */
  margin: 16px;    /* Фиксированные отступы */
}

.sidebar {
  width: 300px;    /* Не адаптивно */
  height: 500px;   /* Переполнение на мобильных */
}

/* На мобильном устройстве будет слишком крупно/мелко */
@media (max-width: 768px) {
  .header {
    font-size: 18px; /* Приходится переопределять */
    padding: 15px;
  }
}
`

const snippet2 = `
/* Относительные единицы - адаптивность */
.header {
  font-size: 1.5rem;  /* 24px при font-size: 16px */
  padding: 1.25rem;   /* 20px, но адаптируется */
  margin: 1rem;       /* 16px, масштабируется */
}

.sidebar {
  width: 20vw;        /* 20% от ширины viewport */
  min-width: 18.75rem; /* 300px минимум */
  height: 50vh;       /* 50% от высоты viewport */
}

/* Автоматически адаптируется без media queries */
/* Если пользователь увеличил шрифт - все масштабируется */
`

const snippet3 = `
/* em - относительно родительского font-size */
.parent {
  font-size: 18px; /* базовый размер */
}

.child {
  font-size: 1.2em;    /* 18px * 1.2 = 21.6px */
  margin: 0.5em;       /* 21.6px * 0.5 = 10.8px */
  padding: 1em 1.5em;  /* 21.6px на 32.4px */
}

.nested {
  font-size: 1.1em;    /* 21.6px * 1.1 = 23.76px */
  /* Проблема: каскадное наследование может привести к
     непредсказуемым размерам в глубокой вложенности */
}

/* Пример каскадного эффекта */
.level1 { font-size: 1.2em; } /* 19.2px */
.level2 { font-size: 1.2em; } /* 23.04px */
.level3 { font-size: 1.2em; } /* 27.65px - уже слишком крупно! */
`

const snippet4 = `
/* rem - относительно корневого font-size */
:root {
  font-size: 16px; /* базовый размер для rem */
}

.header {
  font-size: 2rem;     /* всегда 32px */
  margin: 1.5rem;      /* всегда 24px */
}

.card {
  padding: 1rem;       /* всегда 16px */
  border-radius: 0.5rem; /* всегда 8px */
}

.nested-deep {
  font-size: 1.2rem;   /* всегда 19.2px, независимо от вложенности */
}

/* Адаптация под настройки пользователя */
@media (prefers-reduced-motion: no-preference) {
  :root {
    font-size: 18px; /* Увеличиваем базовый размер */
    /* Все rem значения автоматически увеличатся */
  }
}
`

const snippet5 = `
/* Viewport единицы - адаптивность к размеру экрана */

/* vw/vh - процент от размера viewport */
.hero {
  width: 100vw;        /* полная ширина viewport */
  height: 100vh;       /* полная высота viewport */
  font-size: 4vw;      /* размер шрифта зависит от ширины */
}

/* vmin/vmax - минимальная/максимальная сторона viewport */
.responsive-square {
  width: 50vmin;       /* 50% от меньшей стороны */
  height: 50vmin;      /* всегда квадрат */
  font-size: 3vmin;    /* пропорциональный текст */
}

.full-screen-text {
  font-size: 10vmax;   /* 10% от большей стороны */
  /* Отлично для заголовков на полный экран */
}

/* Проблема: слишком мелкий/крупный текст на экстремальных размерах */
.problematic {
  font-size: 5vw; /* На 320px = 16px, на 1920px = 96px! */
}
`

const snippet6 = `
/* Современные viewport единицы - решение проблем мобильных браузеров */

/* Традиционные проблемы на мобильных */
.old-fullscreen {
  height: 100vh; /* Может не учитывать адресную строку */
}

/* Новые динамические единицы */
.hero-section {
  height: 100dvh;  /* Dynamic Viewport Height - учитывает изменения UI */
  width: 100dvw;   /* Dynamic Viewport Width */
}

/* Статические единицы - фиксированные размеры */
.stable-header {
  height: 10svh;   /* Small Viewport Height - наименьший размер */
}

/* Большие единицы - максимальный размер */
.full-experience {
  height: 100lvh;  /* Large Viewport Height - наибольший размер */
}

/* Практическое применение */
.mobile-safe-hero {
  height: 100dvh;              /* Адаптируется к UI браузера */
  min-height: 100svh;          /* Минимум = без UI элементов */
  padding: clamp(1rem, 5vw, 3rem); /* Адаптивные отступы */
}
`

const snippet7 = `
/* Процентные единицы - контекстуальная адаптивность */

.container {
  width: 1200px;
  padding: 20px;
}

.flexible-grid {
  width: 100%;           /* Всегда заполняет родителя */
  display: flex;
}

.column {
  width: 33.333%;        /* Треть от родителя */
  padding: 2%;           /* Отступы тоже относительные */
}

/* Проблемы с height в процентах */
.parent {
  height: 400px;         /* Должна быть определена */
}

.child {
  height: 50%;           /* 200px - работает */
}

.problematic-child {
  /* Если родитель не имеет определенной высоты,
     процентная высота не работает */
  height: 100%;          /* Может быть 0! */
}

/* Решение современными единицами */
.modern-fullheight {
  height: 100dvh;        /* Надежная альтернатива */
  min-height: 100%;      /* Fallback */
}
`

const snippet8 = `
/* ch/ex - типографические единицы */

/* ch - ширина символа "0" в текущем шрифте */
.monospace-layout {
  font-family: 'Courier New', monospace;
  width: 60ch;           /* ~60 символов в строке */
  /* Идеально для читаемости текста */
}

.input-field {
  width: 12ch;           /* Поле для 12 символов */
  font-family: monospace;
}

/* ex - высота символа "x" в текущем шрифте */
.baseline-aligned {
  margin-top: 2ex;       /* Отступ в 2 высоты "x" */
  font-size: 3ex;        /* Размер относительно высоты строчных */
}

/* Практическое применение */
.readable-text {
  max-width: 65ch;       /* Оптимальная длина строки */
  line-height: 1.6;      /* Относительная высота строки */
  margin-bottom: 1.5em;  /* Отступ между абзацами */
}
`

const snippet9 = `
/* Комбинирование единиц - лучшие практики */

/* Адаптивная типографика с clamp() */
.responsive-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Минимум 1.5rem, максимум 3rem, предпочтительно 4vw */
}

.adaptive-padding {
  padding: clamp(1rem, 5vw, 4rem);
  /* Отступы адаптируются, но в разумных пределах */
}

/* Многоуровневая адаптивность */
.smart-container {
  width: min(90vw, 1200px);     /* Не больше 90% экрана или 1200px */
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
}

/* CSS Grid с относительными единицами */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  padding: clamp(1rem, 5vw, 3rem);
}

/* Комбинация для идеальной читаемости */
.perfect-text {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  max-width: 65ch;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
}
`

const snippet10 = `
/* Частые ошибки и их решения */

/* ❌ НЕПРАВИЛЬНО: Каскадные em */
.bad-nesting {
  font-size: 1.2em;
}
.bad-nesting .child {
  font-size: 1.2em;  /* 1.44em от корня */
}
.bad-nesting .child .grandchild {
  font-size: 1.2em;  /* 1.728em от корня - слишком крупно */
}

/* ✅ ПРАВИЛЬНО: Используем rem */
.good-nesting {
  font-size: 1.2rem;
}
.good-nesting .child {
  font-size: 1.2rem; /* всегда 1.2rem */
}
.good-nesting .child .grandchild {
  font-size: 1.2rem; /* всегда 1.2rem */
}

/* ❌ НЕПРАВИЛЬНО: Некомпенсированные viewport единицы */
.bad-viewport {
  font-size: 5vw;  /* На 4K мониторе = огромный текст */
}

/* ✅ ПРАВИЛЬНО: Ограниченные размеры */
.good-viewport {
  font-size: clamp(1rem, 5vw, 2.5rem);
}

/* ❌ НЕПРАВИЛЬНО: Процентная высота без контекста */
.parent-no-height {
  /* height не определена */
}
.child-no-height {
  height: 100%; /* Не работает! */
}

/* ✅ ПРАВИЛЬНО: Viewport или определенный контекст */
.parent-with-height {
  height: 100vh; /* или конкретное значение */
}
.child-works {
  height: 100%; /* Теперь работает */
}
`

const snippet11 = `
/* Accessibility и пользовательские настройки */

/* Базовая настройка для accessibility */
:root {
  font-size: 16px; /* Базовый размер по умолчанию */
}

/* Уважение к настройкам пользователя */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Адаптация к увеличенному шрифту */
@media (min-resolution: 2dppx) {
  :root {
    font-size: 18px; /* Увеличиваем для Retina дисплеев */
  }
}

/* Система предпочтений для крупного текста */
@media (prefers-contrast: high) {
  :root {
    font-size: 18px;
  }

  .text {
    font-weight: 600; /* Делаем текст жирнее */
    line-height: 1.8; /* Увеличиваем межстрочный интервал */
  }
}

/* Респект к системным настройкам font-size */
html {
  font-size: 100%; /* Наследует от браузера */
}

.scalable-ui {
  padding: 1rem;      /* Масштабируется с настройками */
  margin: 0.75rem;
  border-radius: 0.25rem;
}
`

const snippet12 = `
/* Производительность относительных единиц */

/* Эффективные вычисления */
.efficient-layout {
  /* rem быстрее em в глубокой вложенности */
  font-size: 1.2rem;
  margin: 1rem;

  /* Viewport единицы требуют пересчета при resize */
  width: clamp(20rem, 50vw, 60rem); /* Ограничиваем пересчеты */
}

/* Избегаем частых пересчетов */
.avoid-frequent-recalc {
  /* ❌ Каждый resize пересчитывает */
  font-size: 4vw;
  padding: 2vw;
  margin: 1vw;

  /* ✅ Меньше зависимостей от viewport */
  font-size: clamp(1rem, 4vw, 2rem);
  padding: 1rem;
  margin: 0.5rem;
}

/* CSS Custom Properties с относительными единицами */
:root {
  --base-font-size: 1rem;
  --large-font-size: 1.5rem;
  --huge-font-size: clamp(2rem, 5vw, 4rem);

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}

.component {
  font-size: var(--base-font-size);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
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
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.css, 'css')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.css, 'css')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.css, 'css')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.css, 'css')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.css, 'css')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.css, 'css')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.css, 'css')
  highlightedSnippet10.value = Prism.highlight(snippet10, Prism.languages.css, 'css')
  highlightedSnippet11.value = Prism.highlight(snippet11, Prism.languages.css, 'css')
  highlightedSnippet12.value = Prism.highlight(snippet12, Prism.languages.css, 'css')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Зачем нужны относительные единицы измерения в CSS?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Относительные единицы измерения</b> — это система размеров, которые вычисляются относительно
              других значений (родительского элемента, размера шрифта, viewport). Они обеспечивают адаптивность,
              доступность и лучшую масштабируемость интерфейсов по сравнению с абсолютными единицами.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные преимущества</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Преимущество</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример использования</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Адаптивность</b></td>
                <td class="pt-2 pb-2">Автоматическое масштабирование под разные экраны</td>
                <td class="pt-2 pb-2">vw, vh для полноэкранных элементов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Доступность</b></td>
                <td class="pt-2 pb-2">Уважение к настройкам пользователя</td>
                <td class="pt-2 pb-2">rem учитывает увеличенный шрифт</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Согласованность</b></td>
                <td class="pt-2 pb-2">Пропорциональные отношения элементов</td>
                <td class="pt-2 pb-2">em для отступов внутри компонентов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Меньше Media Queries</b></td>
                <td class="pt-2 pb-2">Естественная адаптация без точек останова</td>
                <td class="pt-2 pb-2">clamp() для плавных переходов</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Типографика</b></td>
                <td class="pt-2 pb-2">Контроль читаемости и пропорций</td>
                <td class="pt-2 pb-2">ch для оптимальной длины строки</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы абсолютных единиц</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Решение с относительными единицами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные типы относительных единиц</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. em - относительно родительского font-size</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. rem - относительно корневого font-size</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">3. Viewport единицы (vw, vh, vmin, vmax)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">4. Современные viewport единицы (dvh, svh, lvh)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">5. Процентные единицы (%)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">6. Типографические единицы (ch, ex)</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики и комбинирование</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые ошибки и их решения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение относительных единиц</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">rem</h3>
                  <p class="mb-2"><b>Плюсы:</b> Предсказуемость, accessibility, простота</p>
                  <p class="mb-2"><b>Минусы:</b> Менее гибкий для компонентов</p>
                  <p class="ma-0"><b>Использование:</b> Основные размеры шрифтов, отступы</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">em</h3>
                  <p class="mb-2"><b>Плюсы:</b> Пропорциональность, компонентность</p>
                  <p class="mb-2"><b>Минусы:</b> Каскадные эффекты в глубокой вложенности</p>
                  <p class="ma-0"><b>Использование:</b> Внутренние отступы компонентов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Viewport (vw/vh)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Истинная адаптивность</p>
                  <p class="mb-2"><b>Минусы:</b> Экстремальные значения на разных экранах</p>
                  <p class="ma-0"><b>Использование:</b> Полноэкранные секции, hero-области</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="primary" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Проценты (%)</h3>
                  <p class="mb-2"><b>Плюсы:</b> Контекстуальная адаптивность</p>
                  <p class="mb-2"><b>Минусы:</b> Проблемы с height без определенного контекста</p>
                  <p class="ma-0"><b>Использование:</b> Ширина, флексбокс, грид</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Accessibility и пользовательские настройки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet11"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet12"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Недостатки относительных единиц</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Недостаток</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Решение</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Сложность отладки</b></td>
                <td class="pt-2 pb-2">Вычисляемые значения сложнее отследить</td>
                <td class="pt-2 pb-2">DevTools Computed tab, документирование</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Каскадные эффекты em</b></td>
                <td class="pt-2 pb-2">Непредсказуемые размеры в глубокой вложенности</td>
                <td class="pt-2 pb-2">Использовать rem вместо em для размеров</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность viewport</b></td>
                <td class="pt-2 pb-2">Пересчеты при изменении размера окна</td>
                <td class="pt-2 pb-2">Ограничивать clamp(), избегать в анимациях</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Экстремальные значения</b></td>
                <td class="pt-2 pb-2">Слишком крупные/мелкие размеры на разных экранах</td>
                <td class="pt-2 pb-2">clamp() с разумными min/max значениями</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Браузерная поддержка</b></td>
                <td class="pt-2 pb-2">Новые единицы (dvh, container queries) не везде</td>
                <td class="pt-2 pb-2">
