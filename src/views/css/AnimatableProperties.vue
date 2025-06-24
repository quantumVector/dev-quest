<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* АНИМИРУЕМЫЕ свойства трансформаций */

/* ✅ Transform - основное свойство */
.animatable-transform {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.animatable-transform:hover {
  transform: translateX(100px) rotate(45deg) scale(1.2);
}

/* ✅ Transform-origin - точка трансформации */
.animatable-origin {
  transform-origin: center center;
  transition: transform-origin 0.5s ease;
}

.animatable-origin:hover {
  transform-origin: top left;
}

/* ✅ Perspective - 3D глубина */
.animatable-perspective {
  perspective: 500px;
  transition: perspective 0.4s ease;
}

.animatable-perspective:hover {
  perspective: 1000px;
}

/* ✅ Perspective-origin - точка перспективы */
.animatable-perspective-origin {
  perspective: 800px;
  perspective-origin: 50% 50%;
  transition: perspective-origin 0.3s ease;
}

.animatable-perspective-origin:hover {
  perspective-origin: 25% 25%;
}
`

const snippet2 = `
/* НЕ анимируемые свойства трансформаций */

/* ❌ Transform-style - нельзя анимировать */
.non-animatable-style {
  transform-style: flat;
  transition: transform-style 0.3s ease; /* не работает */
}

.non-animatable-style:hover {
  transform-style: preserve-3d; /* резкий переход */
}

/* ❌ Backface-visibility - нельзя анимировать */
.non-animatable-backface {
  backface-visibility: visible;
  transition: backface-visibility 0.3s ease; /* не работает */
}

.non-animatable-backface:hover {
  backface-visibility: hidden; /* резкий переход */
}

/* ❌ Will-change - служебное свойство */
.non-animatable-will-change {
  will-change: auto;
  /* transition: will-change 0.3s ease; - бессмысленно */
}
`

const snippet3 = `
/* Примеры анимации transform свойства */

/* 1. Простые переходы */
.simple-hover {
  transform: scale(1);
  transition: transform 0.2s ease-out;
}

.simple-hover:hover {
  transform: scale(1.1);
}

/* 2. Сложные комбинации */
.complex-animation {
  transform: translateY(0) rotate(0deg) scale(1);
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.complex-animation:hover {
  transform: translateY(-20px) rotate(360deg) scale(1.2);
}

/* 3. Поэтапная анимация */
.staged-animation {
  transform: translateX(0);
  transition: transform 0.6s ease;
}

.staged-animation.stage-1 {
  transform: translateX(50px);
}

.staged-animation.stage-2 {
  transform: translateX(50px) rotate(90deg);
}

.staged-animation.stage-3 {
  transform: translateX(50px) rotate(90deg) scale(0.8);
}
`

const snippet4 = `
/* Анимация transform-origin */

/* Изменение точки вращения */
.rotating-card {
  width: 200px;
  height: 100px;
  transform-origin: center center;
  transition:
    transform 0.4s ease,
    transform-origin 0.4s ease;
}

.rotating-card:hover {
  transform: rotate(180deg);
  transform-origin: top left; /* меняется во время анимации */
}

/* Плавное перемещение точки масштабирования */
.scaling-element {
  transform-origin: 50% 50%;
  transition:
    transform 0.3s ease,
    transform-origin 0.3s ease;
}

.scaling-element:hover {
  transform: scale(1.5);
  transform-origin: 0% 100%; /* масштабирование от левого нижнего угла */
}

/* Динамическая смена точки трансформации */
.dynamic-origin {
  transform-origin: center;
  transition: all 0.5s ease;
}

.dynamic-origin:nth-child(odd):hover {
  transform: rotate(45deg);
  transform-origin: top left;
}

.dynamic-origin:nth-child(even):hover {
  transform: rotate(-45deg);
  transform-origin: bottom right;
}
`

const snippet5 = `
/* Анимация perspective */

/* Изменение глубины 3D сцены */
.perspective-container {
  perspective: 600px;
  transition: perspective 0.6s ease;
}

.perspective-container:hover {
  perspective: 300px; /* объекты выглядят более "выпуклыми" */
}

.perspective-child {
  transform: rotateY(45deg);
  transition: transform 0.3s ease;
}

/* Интерактивное изменение перспективы */
.interactive-perspective {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  transition:
    perspective 0.4s ease,
    perspective-origin 0.4s ease;
}

.interactive-perspective:hover {
  perspective: 400px;
  perspective-origin: 25% 75%;
}

/* Анимация перспективы с JavaScript */
.js-controlled-perspective {
  perspective: 800px;
  transition: perspective 0.3s ease;
}

/* JavaScript:
const element = document.querySelector('.js-controlled-perspective');
const slider = document.querySelector('#perspective-slider');

slider.addEventListener('input', (e) => {
  element.style.perspective = e.target.value + 'px';
});
*/
`

const snippet6 = `
/* Продолжительность и тайминг анимаций */

/* Разные скорости для разных трансформаций */
.multi-timing {
  transform: translateX(0) rotate(0deg) scale(1);
  transition:
    transform 0.3s ease-out; /* все трансформации с одним тайминогом */
}

/* Отдельные тайминги (НЕ РАБОТАЕТ так!) */
.separate-timing-wrong {
  transform: translateX(0) rotate(0deg) scale(1);
  /* Нельзя анимировать части transform отдельно */
  transition:
    translateX 0.2s ease,     /* ❌ не работает */
    rotate 0.4s ease-out,     /* ❌ не работает */
    scale 0.1s ease-in;       /* ❌ не работает */
}

/* ПРАВИЛЬНЫЙ способ - использовать отдельные элементы */
.separate-timing-correct {
  transition: transform 0.3s ease;
}

.separate-timing-correct .translate-layer {
  transition: transform 0.2s ease;
}

.separate-timing-correct .rotate-layer {
  transition: transform 0.4s ease-out;
}

.separate-timing-correct .scale-layer {
  transition: transform 0.1s ease-in;
}

/* Или использовать CSS переменные */
.css-variables-timing {
  --translate-x: 0px;
  --rotation: 0deg;
  --scale: 1;

  transform:
    translateX(var(--translate-x))
    rotate(var(--rotation))
    scale(var(--scale));

  transition: transform 0.3s ease;
}
`

const snippet7 = `
/* Keyframe анимации с трансформациями */

/* Сложная анимация с ключевыми кадрами */
@keyframes complex-transform {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    transform-origin: center center;
  }

  25% {
    transform: translateY(-50px) rotate(90deg) scale(1.2);
    transform-origin: top left;
  }

  50% {
    transform: translateY(-30px) rotate(180deg) scale(0.8);
    transform-origin: bottom right;
  }

  75% {
    transform: translateY(-70px) rotate(270deg) scale(1.1);
    transform-origin: center bottom;
  }

  100% {
    transform: translateY(0) rotate(360deg) scale(1);
    transform-origin: center center;
  }
}

.keyframe-animation {
  animation: complex-transform 2s ease-in-out infinite;
}

/* Анимация изменения перспективы */
@keyframes perspective-shift {
  0% {
    perspective: 1000px;
    perspective-origin: 50% 50%;
  }

  50% {
    perspective: 300px;
    perspective-origin: 25% 25%;
  }

  100% {
    perspective: 1000px;
    perspective-origin: 75% 75%;
  }
}

.perspective-animation {
  animation: perspective-shift 3s ease-in-out infinite;
}
`

const snippet8 = `
/* Производительность анимаций трансформаций */

/* ✅ ХОРОШО - оптимизированные анимации */
.optimized-animation {
  /* Создание композитного слоя */
  will-change: transform;
  transform: translateZ(0); /* принудительное GPU ускорение */

  /* Быстрые, плавные переходы */
  transition: transform 0.2s ease-out;
}

.optimized-animation:hover {
  transform: translate3d(20px, 10px, 0) scale(1.05);
}

/* ❌ ПЛОХО - медленные анимации */
.unoptimized-animation {
  /* Изменение layout свойств */
  transition:
    left 0.3s ease,        /* вызывает reflow */
    top 0.3s ease,         /* вызывает reflow */
    width 0.3s ease,       /* вызывает reflow */
    height 0.3s ease;      /* вызывает reflow */
}

/* ✅ ЛУЧШЕ - использовать transform */
.better-animation {
  transition: transform 0.3s ease;
}

.better-animation:hover {
  /* Эквивалент изменения размеров без reflow */
  transform: scale(1.2) translate(10px, 5px);
}

/* Батчинг анимаций */
.batched-animations {
  /* Объединение трансформаций в одно свойство */
  transform: translateX(0) rotate(0deg) scale(1);
  transition: transform 0.3s ease;
}

.batched-animations:hover {
  /* Все изменения в одной операции */
  transform: translateX(50px) rotate(45deg) scale(1.1);
}
`

const snippet9 = `
/* JavaScript управление анимируемыми свойствами */

// Анимация transform
const animateTransform = (element, targetTransform) => {
  element.style.transition = 'transform 0.3s ease';
  element.style.transform = targetTransform;
};

// Пример использования
const box = document.querySelector('.animated-box');
animateTransform(box, 'translateX(100px) rotate(45deg) scale(1.2)');

// Анимация transform-origin
const animateOrigin = (element, newOrigin) => {
  element.style.transition = 'transform-origin 0.4s ease, transform 0.4s ease';
  element.style.transformOrigin = newOrigin;
  element.style.transform = 'rotate(180deg)';
};

// Пример: смена точки вращения
animateOrigin(box, 'top left');

// Анимация perspective
const animatePerspective = (container, newPerspective) => {
  container.style.transition = 'perspective 0.5s ease';
  container.style.perspective = newPerspective + 'px';
};

// Динамическое изменение перспективы
const perspectiveContainer = document.querySelector('.perspective-container');
animatePerspective(perspectiveContainer, 400);

// Плавная анимация с requestAnimationFrame
let animationId;
const smoothTransformAnimation = (element, startValue, endValue, duration) => {
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing функция
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = startValue + (endValue - startValue) * easeProgress;
    element.style.transform = \`translateX(\${currentValue}px)\`;

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animate(startTime);
};

// Использование
smoothTransformAnimation(box, 0, 200, 1000); // 1 секунда анимации
`

const snippet10 = `
/* Комбинирование анимируемых свойств */

/* Сложная интерактивная карточка */
.interactive-card {
  perspective: 1000px;
  transition: perspective 0.3s ease;
}

.interactive-card .card-inner {
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transform-origin: center center;
  transition:
    transform 0.6s ease,
    transform-origin 0.6s ease;
}

.interactive-card:hover {
  perspective: 600px; /* изменение перспективы */
}

.interactive-card:hover .card-inner {
  transform: rotateY(180deg); /* поворот карточки */
  transform-origin: center center; /* точка остается в центре */
}

/* Параллакс с множественными слоями */
.parallax-container {
  perspective: 1px;
  transition: perspective 0.4s ease;
}

.parallax-layer {
  transform: translateZ(0);
  transition: transform 0.1s linear;
}

.parallax-layer.background {
  transform: translateZ(-1px) scale(2);
}

.parallax-layer.midground {
  transform: translateZ(-0.5px) scale(1.5);
}

.parallax-layer.foreground {
  transform: translateZ(0px) scale(1);
}

/* JavaScript для управления параллаксом */
/*
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;

  document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
    const speed = (index + 1) * 0.5;
    layer.style.transform += ` translateY(${scrollTop * speed}px)`;
  });
});
*/

/* Морфинг форм */
.morphing-shape {
  transform: scale(1) rotate(0deg);
  transform-origin: center center;
  transition:
    transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    transform-origin 0.8s ease;
}

.morphing-shape.circle {
  transform: scale(1) rotate(0deg);
  transform-origin: center center;
}

.morphing-shape.diamond {
  transform: scale(0.7) rotate(45deg);
  transform-origin: center center;
}

.morphing-shape.star {
  transform: scale(1.2) rotate(36deg);
  transform-origin: center center;
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
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Какие свойства CSS можно анимировать с помощью трансформаций?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Анимируемые свойства трансформаций</b> — это CSS свойства, которые можно плавно изменять
              с помощью transitions или animations. Важно понимать, какие свойства поддерживают анимацию,
              а какие изменяются мгновенно, так как это критично для создания плавных переходов.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Анимируемые vs Неанимируемые свойства</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">✅ Анимируемые</h3>
                  <ul class="pl-4">
                    <li><code>transform</code> - основные трансформации</li>
                    <li><code>transform-origin</code> - точка трансформации</li>
                    <li><code>perspective</code> - 3D глубина</li>
                    <li><code>perspective-origin</code> - точка перспективы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="error" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-3">❌ Неанимируемые</h3>
                  <ul class="pl-4">
                    <li><code>transform-style</code> - 3D контекст</li>
                    <li><code>backface-visibility</code> - видимость обратной стороны</li>
                    <li><code>will-change</code> - оптимизация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Анимируемые свойства</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Неанимируемые свойства</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Анимация Transform</h2>
            <p class="font-weight-regular mb-4">
              Свойство <code>transform</code> является основным анимируемым свойством трансформаций:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Анимация Transform-Origin</h2>
            <p class="font-weight-regular mb-4">
              Изменение точки трансформации создает интересные эффекты:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Анимация Perspective</h2>
            <p class="font-weight-regular mb-4">
              Perspective и perspective-origin позволяют динамически изменять 3D восприятие:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Тайминг и продолжительность</h2>
            <v-alert type="warning" class="mb-4">
              <v-alert-title>Важная особенность</v-alert-title>
              Нельзя анимировать отдельные функции transform (translateX, rotate, scale) независимо.
              Все трансформации в одном элементе анимируются как единое целое.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Keyframe анимации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность анимаций</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">JavaScript управление</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Комплексные примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Таблица анимируемости свойств</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Свойство</th>
                <th class="text-left font-weight-bold">Анимируемо</th>
                <th class="text-left font-weight-bold">Тип значения</th>
                <th class="text-left font-weight-bold">Пример анимации</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>transform</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Да</v-chip></td>
                <td class="pt-2 pb-2">Функции трансформации</td>
                <td class="pt-2 pb-2">scale(1) → scale(1.2)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>transform-origin</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Да</v-chip></td>
                <td class="pt-2 pb-2">Позиция (%, px)</td>
                <td class="pt-2 pb-2">center → top left</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>perspective</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Да</v-chip></td>
                <td class="pt-2 pb-2">Длина (px)</td>
                <td class="pt-2 pb-2">1000px → 500px</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>perspective-origin</code></td>
                <td class="pt-2 pb-2"><v-chip color="success" size="small">✅ Да</v-chip></td>
                <td class="pt-2 pb-2">Позиция (%, px)</td>
                <td class="pt-2 pb-2">50% 50% → 25% 75%</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>transform-style</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Ключевое слово</td>
                <td class="pt-2 pb-2">flat | preserve-3d</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>backface-visibility</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Ключевое слово</td>
                <td class="pt-2 pb-2">visible | hidden</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>will-change</code></td>
                <td class="pt-2 pb-2"><v-chip color="error" size="small">❌ Нет</v-chip></td>
                <td class="pt-2 pb-2">Список свойств</td>
                <td class="pt-2 pb-2">auto | transform</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Особенности анимации трансформаций</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Transform</h3>
                  <ul class="pl-4">
                    <li>Анимируется как единое целое</li>
                    <li>Интерполяция между матрицами</li>
                    <li>Порядок функций важен</li>
                    <li>GPU ускорение</li>
                    <li>Субпиксельная точность</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="info" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Transform-Origin</h3>
                  <ul class="pl-4">
                    <li>Анимируется независимо</li>
                    <li>Влияет на визуал анимации</li>
                    <li>Интерполяция координат</li>
                    <li>Может использовать %, px, keyword</li>
                    <li>3D версия с Z координатой</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Можно ли анимировать отдельные функции transform?</p>
                <p class="font-weight-regular ma-0">
                  Нет, нельзя анимировать translateX, rotate, scale отдельно. Transform анимируется
                  как единое свойство. Для независимых аним
