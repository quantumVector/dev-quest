<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Проблемы неэффективных анимаций */

/* ❌ ПЛОХО: Анимация свойств, вызывающих reflow/repaint */
.bad-animation {
  transition: width 0.3s ease, height 0.3s ease;
}
.bad-animation:hover {
  width: 200px;    /* Вызывает layout (reflow) */
  height: 150px;   /* Вызывает layout (reflow) */
  background: red; /* Вызывает paint (repaint) */
  margin-left: 20px; /* Вызывает layout соседних элементов */
}

/* ❌ ПЛОХО: Анимация позиционирования */
.bad-move {
  transition: left 0.3s ease, top 0.3s ease;
  position: relative;
}
.bad-move:hover {
  left: 100px;  /* Дорогие вычисления layout */
  top: 50px;    /* Перерисовка всей страницы */
}

/* Результат: лаги, низкий FPS, плохой UX */
`

const snippet2 = `
/* ✅ ХОРОШО: Анимация только композитных свойств */

/* Композитные свойства (GPU-ускоренные): */
.efficient-animation {
  transition: transform 0.3s ease, opacity 0.3s ease;
  /* Эти свойства обрабатываются на GPU */
}

.efficient-animation:hover {
  transform: translateX(100px) scale(1.1); /* Только композитор */
  opacity: 0.8;                            /* Только композитор */
  /* Никаких layout/paint операций! */
}

/* Принудительное создание композитного слоя */
.will-animate {
  will-change: transform; /* Подсказка браузеру */
  /* или */
  transform: translateZ(0); /* Hack для старых браузеров */
  /* или */
  transform: translate3d(0, 0, 0); /* 3D контекст */
}

/* Современный подход с contain */
.contained-animation {
  contain: layout style paint; /* Изолирует влияние на соседей */
}
`

const snippet3 = `
/* Transform функции для плавных анимаций */

/* Базовые трансформации */
.transform-basics {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Перемещение (самое эффективное) */
.translate-demo:hover {
  transform: translateX(100px);           /* По X */
  transform: translateY(50px);            /* По Y */
  transform: translate(100px, 50px);      /* X и Y */
  transform: translate3d(100px, 50px, 0); /* 3D контекст */
}

/* Масштабирование */
.scale-demo:hover {
  transform: scale(1.2);          /* Равномерно */
  transform: scaleX(1.5);         /* Только по X */
  transform: scaleY(0.8);         /* Только по Y */
  transform: scale3d(1.2, 1.2, 1); /* 3D контекст */
}

/* Поворот */
.rotate-demo:hover {
  transform: rotate(45deg);        /* 2D поворот */
  transform: rotateX(30deg);       /* Вокруг оси X */
  transform: rotateY(45deg);       /* Вокруг оси Y */
  transform: rotateZ(90deg);       /* Вокруг оси Z */
  transform: rotate3d(1, 1, 0, 45deg); /* Произвольная ось */
}

/* Наклон (используется реже) */
.skew-demo:hover {
  transform: skewX(20deg);         /* Наклон по X */
  transform: skewY(10deg);         /* Наклон по Y */
  transform: skew(20deg, 10deg);   /* По обеим осям */
}
`

const snippet4 = `
/* Комбинирование трансформаций */

/* Порядок имеет значение! */
.transform-order {
  transition: transform 0.3s ease;
}

/* Разный порядок = разный результат */
.order-1:hover {
  transform: translateX(100px) rotate(45deg);
  /* Сначала сдвиг, потом поворот */
}

.order-2:hover {
  transform: rotate(45deg) translateX(100px);
  /* Сначала поворот, потом сдвиг по повернутой оси */
}

/* Комплексная анимация */
.complex-transform:hover {
  transform:
    translate3d(50px, -20px, 0)    /* Перемещение */
    rotate(15deg)                  /* Поворот */
    scale(1.1)                     /* Масштаб */
    skewX(5deg);                   /* Небольшой наклон */
}

/* 3D трансформации для глубины */
.card-3d {
  transform-style: preserve-3d; /* Сохраняет 3D контекст для детей */
  perspective: 1000px;          /* Задает перспективу */
}

.card-3d:hover {
  transform: rotateY(180deg) translateZ(20px);
}
`

const snippet5 = `
/* Продвинутые техники оптимизации */

/* 1. Используем will-change правильно */
.optimized-element {
  /* Включаем перед анимацией */
  will-change: transform;
}

.optimized-element.animating {
  /* Во время анимации */
  animation: slideIn 0.3s ease-out;
}

.optimized-element.animation-complete {
  /* Выключаем после анимации */
  will-change: auto;
}

/* 2. Принудительное создание слоя только когда нужно */
.hover-optimize {
  transition: transform 0.3s ease;
}

.hover-optimize:hover {
  transform: translate3d(0, 0, 0); /* Создает слой только при наведении */
}

/* 3. Изолируем анимации */
.animation-container {
  contain: layout style paint; /* Ограничиваем влияние */
  overflow: hidden;           /* Предотвращаем scroll при анимации */
}

/* 4. Оптимизация для мобильных */
@media (hover: hover) and (pointer: fine) {
  /* Hover эффекты только для устройств с точным указателем */
  .desktop-hover:hover {
    transform: scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Уважаем настройки пользователя */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`

const snippet6 = `
/* Timing functions для естественности */

/* Стандартные функции */
.timing-examples {
  transition-property: transform;
  transition-duration: 0.3s;
}

.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* Кастомные cubic-bezier для профессиональных анимаций */
.material-design {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  /* Material Design Standard */
}

.bounce-in {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* Bounce эффект */
}

.smooth-in-out {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* Очень плавное ускорение/замедление */
}

.quick-start {
  transition-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  /* Быстрый старт, плавное торможение */
}

/* Анимации с steps для дискретных переходов */
.step-animation {
  animation: discrete-change 1s steps(4, end);
}

@keyframes discrete-change {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
`

const snippet7 = `
/* CSS Animations vs Transitions */

/* Transitions - для простых состояний */
.button {
  transform: scale(1);
  transition: transform 0.2s ease-out;
}

.button:hover {
  transform: scale(1.05); /* Простое изменение состояния */
}

/* Animations - для сложных последовательностей */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Комплексная анимация с несколькими этапами */
.entrance-animation {
  animation: slideInBounce 0.6s ease-out forwards;
}

@keyframes slideInBounce {
  0% {
    transform: translate3d(-100%, 0, 0) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translate3d(10%, 0, 0) scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}

/* Управление анимациями через CSS переменные */
.variable-animation {
  --duration: 0.3s;
  --delay: 0s;
  --timing: ease-out;

  animation: fadeInUp var(--duration) var(--timing) var(--delay) forwards;
}

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 30px, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
`

const snippet8 = `
/* Продвинутые паттерны анимаций */

/* 1. Последовательные анимации (stagger) */
.stagger-container .item {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.stagger-container .item:nth-child(1) { animation-delay: 0.1s; }
.stagger-container .item:nth-child(2) { animation-delay: 0.2s; }
.stagger-container .item:nth-child(3) { animation-delay: 0.3s; }
.stagger-container .item:nth-child(4) { animation-delay: 0.4s; }

/* Или через CSS calc */
.auto-stagger .item {
  animation: fadeInUp 0.4s ease-out forwards;
  animation-delay: calc(var(--item-index) * 0.1s);
  opacity: 0;
}

/* 2. Параллакс эффекты */
.parallax-element {
  transform: translate3d(0, calc(var(--scroll-y) * -0.5px), 0);
  /* Управляется через JavaScript */
}

/* 3. Hover эффекты с композитными слоями */
.card {
  transition: transform 0.3s ease-out;
  will-change: transform; /* Только если часто анимируется */
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.1);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease-out;
}

.card:hover::before {
  transform: scaleY(1);
}
`

const snippet9 = `
/* Мониторинг производительности анимаций */

/* JavaScript для отслеживания FPS */
const trackAnimationPerformance = () => {
  let lastTime = performance.now();
  let frames = 0;

  function countFPS() {
    frames++;
    const currentTime = performance.now();

    if (currentTime - lastTime >= 1000) {
      console.log(\`FPS: \${frames}\`);
      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(countFPS);
  }

  requestAnimationFrame(countFPS);
};

/* Мониторинг композитных слоев в DevTools */
// Chrome DevTools -> Rendering -> Layer borders
// Показывает границы композитных слоев

/* Профилирование анимаций */
// Performance tab в DevTools
// Записывайте во время анимации для анализа

/* CSS для отладки */
.debug-composite {
  /* Показывает, что элемент на композитном слое */
  outline: 2px solid red;
}

/* Проверка поддержки will-change */
@supports (will-change: transform) {
  .modern-animation {
    will-change: transform;
  }
}

/* Fallback для старых браузеров */
@supports not (will-change: transform) {
  .legacy-animation {
    transform: translate3d(0, 0, 0); /* Принудительный композитный слой */
  }
}
`

const snippet10 = `
/* Практические паттерны для собеседования */

/* 1. Создание плавного загрузчика */
.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  will-change: transform;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 2. Модальное окно с анимацией */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: background-color 0.3s ease;
}

.modal.open {
  background: rgba(0,0,0,0.5);
  pointer-events: auto;
}

.modal-content {
  transform: scale(0.8) translateY(20px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  will-change: transform, opacity;
}

.modal.open .modal-content {
  transform: scale(1) translateY(0);
  opacity: 1;
}

/* 3. Hover эффект для кнопок */
.button-fancy {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.button-fancy::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.button-fancy:hover::before {
  width: 300px;
  height: 300px;
}

.button-fancy:active {
  transform: scale(0.98);
}
`

const snippet11 = `
/* Адаптивные анимации и accessibility */

/* Респект к пользовательским настройкам */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Адаптация к производительности устройства */
@media (update: slow) {
  /* Устройства с медленным обновлением экрана */
  .heavy-animation {
    animation: none;
  }
}

/* Оптимизация для мобильных */
@media (hover: none) and (pointer: coarse) {
  /* Мобильные устройства */
  .hover-effect {
    /* Заменяем hover на focus или touch события */
    transition: none;
  }

  .hover-effect:focus,
  .hover-effect:active {
    transform: scale(1.05);
  }
}

/* Батарея-френдли анимации */
@media (prefers-reduced-motion: no-preference) and (battery: low) {
  /* Если браузер поддерживает battery API */
  .expensive-animation {
    animation-iteration-count: 1;
    animation-duration: 0.1s;
  }
}

/* Контроль через CSS переменные */
:root {
  --animation-speed: 1;
  --animation-enabled: 1;
}

.controllable-animation {
  animation: slideIn calc(0.3s / var(--animation-speed)) ease-out;
  animation-play-state: var(--animation-enabled) ? running : paused;
}

/* JavaScript контроль */
/*
// Определение производительности устройства
const isLowEndDevice = navigator.hardwareConcurrency <= 2;
if (isLowEndDevice) {
  document.documentElement.style.setProperty('--animation-speed', '2');
}
*/
`

const snippet12 = `
/* Отладка и диагностика анимаций */

/* Визуализация композитных слоев */
.debug-layer {
  /* В Chrome DevTools: Rendering -> Layer borders */
  outline: 1px solid red; /* Ручная проверка */
}

/* Проверка, что элемент на композитном слое */
.check-compositing {
  /* Любой из этих приемов создает новый слой: */
  will-change: transform;
  /* или */
  transform: translateZ(0);
  /* или */
  transform: translate3d(0, 0, 0);
  /* или */
  backface-visibility: hidden;
  /* или */
  position: fixed;
  /* или */
  opacity < 1 с дочерними элементами
}

/* Измерение производительности через CSS */
.performance-test {
  /* Используем CSS Animation Events */
  animation: test-performance 1s linear;
}

@keyframes test-performance {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

/* JavaScript для измерения */
/*
element.addEventListener('animationstart', (e) => {
  console.time('animation-duration');
});

element.addEventListener('animationend', (e) => {
  console.timeEnd('animation-duration');
});
*/

/* Общие антипаттерны для избегания */
.antipattern-examples {
  /* ❌ НЕ ДЕЛАЙТЕ ТАК: */

  /* Анимация layout-свойств */
  transition: width 0.3s; /* Вызывает reflow */

  /* Анимация paint-свойств */
  transition: background-color 0.3s; /* Вызывает repaint */

  /* Слишком много will-change */
  will-change: transform, opacity, width, height; /* Избыточно */

  /* Анимация без аппаратного ускорения */
  transition: left 0.3s; /* Используйте transform: translateX() */

  /* Слишком длинные анимации */
  animation-duration: 5s; /* > 500ms считается медленным */
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
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
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
              Плавные и эффективные анимации с трансформациями
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Эффективные анимации</b> — это анимации, которые работают со скоростью 60 FPS,
              не блокируют главный поток браузера и обеспечивают плавный пользовательский опыт.
              Ключ к этому — использование только композитных свойств (transform, opacity)
              и правильная оптимизация.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы производительности браузера</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип операции</th>
                <th class="text-left font-weight-bold">Что происходит</th>
                <th class="text-left font-weight-bold">Производительность</th>
                <th class="text-left font-weight-bold">Примеры свойств</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Layout (Reflow)</b></td>
                <td class="pt-2 pb-2">Пересчет позиций и размеров</td>
                <td class="pt-2 pb-2">❌ Очень медленно</td>
                <td class="pt-2 pb-2">width, height, padding, margin</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Paint (Repaint)</b></td>
                <td class="pt-2 pb-2">Перерисовка пикселей</td>
                <td class="pt-2 pb-2">⚠️ Медленно</td>
                <td class="pt-2 pb-2">color, background, border-radius</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Composite</b></td>
                <td class="pt-2 pb-2">Композиция слоев на GPU</td>
                <td class="pt-2 pb-2">✅ Быстро</td>
                <td class="pt-2 pb-2">transform, opacity, filter</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы неэффективных анимаций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Эффективный подход с композитными свойствами</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Transform функции для анимаций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комбинирование трансформаций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые техники оптимизации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Timing Functions для естественности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">CSS Animations vs Transitions</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые паттерны анимаций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Мониторинг производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические паттерны</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Принципы эффективных анимаций</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делайте</h3>
                  <ul class="pl-4">
                    <li>Анимируйте только transform и opacity</li>
                    <li>Используйте will-change перед анимацией</li>
                    <li>Держите анимации короткими (200-500ms)</li>
                    <li>Используйте ease-out для UI переходов</li>
                    <li>Тестируйте на слабых устройствах</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегайте</h3>
                  <ul class="pl-4">
                    <li>Анимации width, height, padding, margin</li>
                    <li>Анимации color, background без необходимости</li>
                    <li>Слишком много will-change одновременно</li>
                    <li>Длинные анимации (>500ms для UI)</li>
                    <li>Анимации left/top вместо transform</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Адаптивные анимации и accessibility</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet11"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Отладка и диагностика</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet12"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему transform быстрее, чем изменение left/top?</p>
                <p class="font-weight-regular ma-0">
                  Transform обрабатывается на композитном слое GPU, не вызывает layout/paint.
                  Left/top требуют пересчета позиций всех элементов (reflow).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать will-change?</p>
                <p class="font-weight-regular ma-0">
                  Только перед началом анимации и убирать после. Постоянное использование
                  потребляет память. Альтернатива — transform: translateZ(0).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между animations и transitions?</p>
                <p class="font-weight-regular ma-0">
                  Transitions — для простых переходов между состояниями.
                  Animations — для сложных последовательностей с keyframes.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать анимации для мобильных?</p>
                <p class="font-weight-regular ma-0">
                  Использовать только compositor-only свойства, учитывать prefers-reduced-motion,
                  тестировать на реальных устройствах, избегать hover на touch.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое композитный слой?</p>
                <p class="font-weight-regular ma-0">
                  Отдельный слой, обрабатываемый GPU. Создается автоматически для 3D transforms,
                  opacity < 1, filters, или принудительно через will-change.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Инструменты для отладки</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Chrome DevTools</h3>
                  <ul class="pl-4">
                    <li>Performance tab для профилирования</li>
                    <li>Rendering → Layer borders</li>
                    <li>Rendering → Paint flashing</li>
                    <li>Rendering → FPS meter</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Firefox DevTools</h3>
                  <ul class="pl-4">
                    <li>Performance профайлер</li>
                    <li>Inspector → Animations</li>
                    <li>Settings → Show paint rectangles</li>
                    <li>CSS Grid/Flexbox инспектор</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="primary" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 Производительность</h3>
                  <ul class="pl-4">
                    <li>Только transform и opacity</li>
                    <li>60 FPS на всех устройствах</li>
                    <li>Профилирование на слабых девайсах</li>
                    <li>Мониторинг композитных слоев</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="secondary" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">♿ Доступность</h3>
                  <ul class="pl-4">
                    <li>prefers-reduced-motion</li>
                    <li>Короткие анимации (200-500ms)</li>
                    <li>Не мигающие эффекты</li>
                    <li>Альтернативы для анимаций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">🎨 UX Design</h3>
                  <ul class="pl-4">
                    <li>Естественные timing functions</li>
                    <li>Осмысленные анимации</li>
                    <li>Обратная связь пользователю</li>
                    <li>Консистентность во всем UI</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              Эффективные анимации с трансформациями — основа современного веб-UI. Ключевые принципы:
              использование только композитных свойств (transform, opacity), правильная оптимизация
              с will-change, учет accessibility и производительности на всех устройствах.
              Профилирование и тестирование — обязательная часть разработки анимаций.
            </p>

            <div class="d-flex justify-space-between">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://web.dev/animations-guide/"
                target="_blank">
                Web.dev Animations Guide
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://csstriggers.com/"
                target="_blank">
                CSS Triggers Reference
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
