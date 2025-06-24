<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Основные 2D трансформации */
.translate-example {
  transform: translate(50px, 100px);
  /* или раздельно */
  transform: translateX(50px) translateY(100px);
}

.rotate-example {
  transform: rotate(45deg);
  /* или в радианах */
  transform: rotate(0.785rad);
}

.scale-example {
  transform: scale(1.5); /* увеличение в 1.5 раза */
  transform: scale(2, 0.5); /* ширина x2, высота x0.5 */
  transform: scaleX(2) scaleY(0.5); /* раздельно */
}

.skew-example {
  transform: skew(15deg, 10deg);
  transform: skewX(15deg) skewY(10deg); /* раздельно */
}
`

const snippet2 = `
/* 3D трансформации */
.transform-3d {
  /* Включаем 3D контекст */
  transform-style: preserve-3d;
  perspective: 1000px;
}

.translate-3d {
  transform: translate3d(50px, 100px, -20px);
  /* или раздельно */
  transform: translateX(50px) translateY(100px) translateZ(-20px);
}

.rotate-3d {
  transform: rotateX(45deg); /* вращение вокруг оси X */
  transform: rotateY(45deg); /* вращение вокруг оси Y */
  transform: rotateZ(45deg); /* вращение вокруг оси Z */

  /* или единой функцией */
  transform: rotate3d(1, 1, 0, 45deg);
}

.scale-3d {
  transform: scale3d(2, 1.5, 0.8);
  transform: scaleZ(2); /* масштабирование по оси Z */
}

.perspective-example {
  perspective: 500px; /* расстояние до точки наблюдения */
  perspective-origin: 50% 50%; /* точка перспективы */
}
`

const snippet3 = `
/* Matrix трансформации - максимальный контроль */
.matrix-2d {
  /* matrix(scaleX, skewY, skewX, scaleY, translateX, translateY) */
  transform: matrix(1.5, 0.2, -0.3, 1.2, 50, 100);

  /* Эквивалентно комбинации: */
  /* transform: scale(1.5, 1.2) skew(-0.3rad, 0.2rad) translate(50px, 100px); */
}

.matrix-3d {
  /* matrix3d - 16 параметров для полного 3D контроля */
  transform: matrix3d(
    1, 0, 0, 0,    /* первая строка матрицы */
    0, 1, 0, 0,    /* вторая строка */
    0, 0, 1, 0,    /* третья строка */
    0, 0, 0, 1     /* четвертая строка */
  );
}

/* Пример сложной matrix для поворота и масштабирования */
.complex-matrix {
  transform: matrix(
    0.866, 0.5,    /* cos(30°), sin(30°) - поворот */
    -0.5, 0.866,   /* -sin(30°), cos(30°) */
    100, 50        /* translateX, translateY */
  );
}
`

const snippet4 = `
/* Transform origin - точка трансформации */
.transform-origin-examples {
  /* По умолчанию центр элемента */
  transform-origin: center center; /* 50% 50% */

  /* Угол элемента */
  transform-origin: top left; /* 0% 0% */
  transform-origin: bottom right; /* 100% 100% */

  /* Точные значения */
  transform-origin: 20px 30px;
  transform-origin: 25% 75%;

  /* 3D версия */
  transform-origin: 50% 50% 100px; /* x, y, z */
}

/* Примеры использования */
.rotate-around-corner {
  transform-origin: top left;
  transform: rotate(45deg);
  /* Поворот вокруг левого верхнего угла */
}

.scale-from-bottom {
  transform-origin: bottom center;
  transform: scale(1.5);
  /* Масштабирование от нижней границы */
}
`

const snippet5 = `
/* Практические примеры использования */

/* 1. Карточка с hover эффектом */
.card {
  transition: transform 0.3s ease;
  transform-origin: center bottom;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
}

/* 2. Кнопка с press эффектом */
.button {
  transition: transform 0.1s ease;
}

.button:active {
  transform: scale(0.95);
}

/* 3. Вращающийся loader */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 4. Flip карточка */
.flip-container {
  perspective: 1000px;
}

.flip-card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-container:hover .flip-card {
  transform: rotateY(180deg);
}

.flip-card-back {
  transform: rotateY(180deg);
}
`

const snippet6 = `
/* Сложные анимации с множественными трансформациями */

/* Волновой эффект */
.wave-animation {
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-20px) rotate(5deg) scale(1.1);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg) scale(1.05);
  }
  75% {
    transform: translateY(-15px) rotate(3deg) scale(1.08);
  }
}

/* 3D куб */
.cube {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  animation: rotate-cube 4s infinite linear;
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
}

.cube-front { transform: translateZ(50px); }
.cube-back { transform: rotateY(180deg) translateZ(50px); }
.cube-right { transform: rotateY(90deg) translateZ(50px); }
.cube-left { transform: rotateY(-90deg) translateZ(50px); }
.cube-top { transform: rotateX(90deg) translateZ(50px); }
.cube-bottom { transform: rotateX(-90deg) translateZ(50px); }

@keyframes rotate-cube {
  from { transform: rotateX(0) rotateY(0); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}
`

const snippet7 = `
/* Производительность и оптимизация */

/* ХОРОШО - используем transform вместо изменения position */
.optimized-animation {
  /* Создает композитный слой */
  will-change: transform;
  transform: translateZ(0); /* включает аппаратное ускорение */
}

.slide-in {
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.slide-in.active {
  transform: translateX(0);
}

/* ПЛОХО - вызывает reflow/repaint */
.non-optimized {
  left: -100px;
  transition: left 0.3s ease;
}

.non-optimized.active {
  left: 0;
}

/* GPU ускорение */
.gpu-accelerated {
  transform: translate3d(0, 0, 0); /* принудительно создает слой */
  /* или */
  will-change: transform;
}

/* Батчинг трансформаций */
.combined-transforms {
  /* Лучше объединить в одну декларацию */
  transform: translateX(50px) rotate(45deg) scale(1.2);

  /* Чем несколько отдельных */
  /* transform: translateX(50px);
     transform: rotate(45deg);      ← перезапишет предыдущий
     transform: scale(1.2); */
}
`

const snippet8 = `
/* Backface visibility и transform-style */

/* Скрытие обратной стороны */
.card-flip {
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.card-container:hover .card-flip {
  transform: rotateY(180deg);
}

/* 3D контекст для дочерних элементов */
.preserve-3d-container {
  transform-style: preserve-3d;
}

.preserve-3d-container .child {
  /* Наследует 3D контекст от родителя */
  transform: rotateX(45deg) translateZ(20px);
}

/* Плоское отображение (по умолчанию) */
.flat-container {
  transform-style: flat;
}

/* Пример: карусель с 3D эффектом */
.carousel-3d {
  perspective: 800px;
  transform-style: preserve-3d;
}

.carousel-item {
  backface-visibility: hidden;
  transition: transform 0.5s;
}

.carousel-item:nth-child(1) { transform: rotateY(0deg) translateZ(200px); }
.carousel-item:nth-child(2) { transform: rotateY(60deg) translateZ(200px); }
.carousel-item:nth-child(3) { transform: rotateY(120deg) translateZ(200px); }
.carousel-item:nth-child(4) { transform: rotateY(180deg) translateZ(200px); }
.carousel-item:nth-child(5) { transform: rotateY(240deg) translateZ(200px); }
.carousel-item:nth-child(6) { transform: rotateY(300deg) translateZ(200px); }
`

const snippet9 = `
/* Интерактивные трансформации с JavaScript */
// Следование за курсором
const followMouse = (element) => {
  document.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;

    element.style.transform = \`translate(\${deltaX}px, \${deltaY}px)\`;
  });
};

// Параллакс эффект
const parallaxScroll = () => {
  const scrolled = window.scrollY;
  const elements = document.querySelectorAll('.parallax');

  elements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    element.style.transform = \`translateY(\${scrolled * speed}px)\`;
  });
};

window.addEventListener('scroll', parallaxScroll);

// Плавная анимация с requestAnimationFrame
let animationId;
const smoothTransform = (element, targetX, targetY) => {
  let currentX = 0;
  let currentY = 0;

  const animate = () => {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    element.style.transform = \`translate(\${currentX}px, \${currentY}px)\`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animate();
};
`

const snippet10 = `
/* Адаптивные трансформации */

/* Масштабирование на разных экранах */
@media (max-width: 768px) {
  .responsive-transform {
    transform: scale(0.8) translateY(-20px);
  }
}

@media (max-width: 480px) {
  .responsive-transform {
    transform: scale(0.6) translateY(-10px);
  }
}

/* Container queries для точного контроля */
@container (max-width: 300px) {
  .container-responsive {
    transform: scale(0.9);
  }
}

/* Предпочтения пользователя */
@media (prefers-reduced-motion: reduce) {
  .respect-motion-preferences {
    transform: none !important;
    transition: none !important;
    animation: none !important;
  }
}

/* Поддержка темной темы в трансформациях */
@media (prefers-color-scheme: dark) {
  .theme-aware-transform {
    transform: scale(1.1); /* больше в темной теме */
  }
}

/* CSS Custom Properties для динамических трансформаций */
.dynamic-transform {
  --scale: 1;
  --rotation: 0deg;
  --translate-x: 0px;
  --translate-y: 0px;

  transform:
    scale(var(--scale))
    rotate(var(--rotation))
    translate(var(--translate-x), var(--translate-y));
}

/* Изменение через JavaScript */
/* element.style.setProperty('--scale', '1.5'); */
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
              Какие виды трансформаций можно применять в CSS и для чего они используются?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>CSS трансформации</b> позволяют изменять внешний вид элементов без влияния на layout:
              перемещать, вращать, масштабировать и искажать элементы в 2D и 3D пространстве.
              Трансформации обрабатываются на GPU, что обеспечивает высокую производительность анимаций.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные виды трансформаций</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Тип</th>
                <th class="text-left font-weight-bold">Функции</th>
                <th class="text-left font-weight-bold">Назначение</th>
                <th class="text-left font-weight-bold">Примеры использования</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Translate</b></td>
                <td class="pt-2 pb-2">translateX(), translateY(), translate()</td>
                <td class="pt-2 pb-2">Перемещение элемента</td>
                <td class="pt-2 pb-2">Анимации, позиционирование</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Rotate</b></td>
                <td class="pt-2 pb-2">rotate(), rotateX(), rotateY(), rotateZ()</td>
                <td class="pt-2 pb-2">Поворот элемента</td>
                <td class="pt-2 pb-2">Спиннеры, hover эффекты</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Scale</b></td>
                <td class="pt-2 pb-2">scale(), scaleX(), scaleY(), scaleZ()</td>
                <td class="pt-2 pb-2">Масштабирование</td>
                <td class="pt-2 pb-2">Zoom эффекты, responsive дизайн</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Skew</b></td>
                <td class="pt-2 pb-2">skew(), skewX(), skewY()</td>
                <td class="pt-2 pb-2">Искажение/наклон</td>
                <td class="pt-2 pb-2">Декоративные эффекты</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Matrix</b></td>
                <td class="pt-2 pb-2">matrix(), matrix3d()</td>
                <td class="pt-2 pb-2">Комплексные трансформации</td>
                <td class="pt-2 pb-2">Точный математический контроль</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Perspective</b></td>
                <td class="pt-2 pb-2">perspective()</td>
                <td class="pt-2 pb-2">3D глубина</td>
                <td class="pt-2 pb-2">3D эффекты, карточки</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">2D трансформации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3D трансформации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Matrix трансформации</h2>
            <p class="font-weight-regular mb-4">
              Matrix предоставляет математический способ описания любых трансформаций через матрицы:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Transform Origin - точка трансформации</h2>
            <p class="font-weight-regular mb-4">
              Определяет точку, относительно которой применяются трансформации:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Практические примеры</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сложные анимации</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность и оптимизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3D контекст и видимость</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">JavaScript интеграция</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Адаптивность и доступность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="success" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Преимущества Transform</h3>
                  <ul class="pl-4">
                    <li><b>GPU ускорение</b> - плавные анимации</li>
                    <li><b>Без reflow</b> - не влияет на layout</li>
                    <li><b>Композитные слои</b> - изолированный рендеринг</li>
                    <li><b>Субпиксельная точность</b> - гладкие трансформации</li>
                    <li><b>3D возможности</b> - depth и perspective</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100" color="warning" variant="tonal">
                  <h3 class="text-h6 font-weight-bold mb-2">Ограничения</h3>
                  <ul class="pl-4">
                    <li><b>Не влияет на layout</b> - может пересекаться с другими элементами</li>
                    <li><b>Поддержка браузеров</b> - 3D требует префиксов</li>
                    <li><b>Точность float</b> - возможны артефакты</li>
                    <li><b>Память GPU</b> - много слоев = больше потребления</li>
                    <li><b>Accessibility</b> - может мешать screen readers</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Случаи использования</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">UI/UX Эффекты</h3>
                  <ul class="pl-4">
                    <li>Hover состояния кнопок</li>
                    <li>Модальные окна</li>
                    <li>Карточки продуктов</li>
                    <li>Навигационные меню</li>
                    <li>Индикаторы загрузки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Анимации</h3>
                  <ul class="pl-4">
                    <li>Переходы между страницами</li>
                    <li>Параллакс эффекты</li>
                    <li>Микроанимации</li>
                    <li>Scroll-triggered анимации</li>
                    <li>Игровые элементы</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">3D Эффекты</h3>
                  <ul class="pl-4">
                    <li>Flip карточки</li>
                    <li>Карусели и слайдеры</li>
                    <li>Кубические интерфейсы</li>
                    <li>Презентации</li>
                    <li>AR/VR элементы</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между transform и изменением position?</p>
                <p class="font-weight-regular ma-0">
                  Transform не вызывает reflow/repaint, работает на GPU, создает композитный слой.
                  Position изменяет layout, может вызвать пересчет всей страницы.
                  Transform лучше для анимаций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать 3D трансформации?</p>
                <p class="font-weight-regular ma-0">
                  Для создания глубины, flip эффектов, каруселей, когда нужна перспектива.
                  Требуют больше ресурсов GPU, нужна осторожность на мобильных устройствах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как оптимизировать производительность трансформаций?</p>
                <p class="font-weight-regular ma-0">
                  Использовать will-change, translate3d(0,0,0) для принудительного GPU слоя,
                  избегать сложных matrix вычислений, батчить изменения, использовать
                  requestAnimationFrame для JS анимаций.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое transform-origin и зачем он нужен?</p>
                <p class="font-weight-regular ma-0">
                  Определяет точку, относительно которой происходят трансформации.
                  По умолчанию center. Позволяет вращать элементы вокруг углов,
                  масштабировать от определенной стороны.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как комбинировать несколько трансформаций?</p>
                <p class="font-weight-regular ma-0">
                  Перечислить через пробел в одном свойстве transform.
                  Порядок важен: сначала масштабирование, потом поворот, затем перемещение.
                  Каждая следующая трансформация применяется к результату предыдущей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как комбинировать несколько трансформаций?</p>
                <p class="font-weight-regular ma-0">
                  Перечислить через пробел в одном свойстве transform.
                  Порядок важен: сначала масштабирование, потом поворот, затем перемещение.
                  Каждая следующая трансформация применяется к результату предыдущей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем особенности matrix трансформаций?</p>
                <p class="font-weight-regular ma-0">
                  Matrix позволяет объединить все трансформации в одну математическую операцию.
                  Более эффективно для сложных анимаций, но сложнее в понимании и отладке.
                  Matrix3d предоставляет полный контроль над 3D трансформациями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы могут возникнуть с трансформациями?</p>
                <p class="font-weight-regular ma-0">
                  Элементы могут выходить за границы контейнера, пересекаться с другими элементами,
                  проблемы с z-index в 3D контексте, артефакты рендеринга на некоторых устройствах,
                  проблемы с accessibility для людей с вестибулярными нарушениями.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-alert type="info" class="mb-4">
              <v-alert-title>Рекомендации по использованию</v-alert-title>
              <ul class="pl-4 mt-2 mb-0">
                <li>Используйте <code>transform</code> вместо изменения <code>left/top</code> для анимаций</li>
                <li>Добавляйте <code>will-change: transform</code> перед анимацией</li>
                <li>Убирайте <code>will-change</code> после завершения анимации</li>
                <li>Используйте <code>translate3d()</code> для принудительного GPU ускорения</li>
                <li>Тестируйте производительность на слабых устройствах</li>
                <li>Учитывайте <code>prefers-reduced-motion</code> для accessibility</li>
              </ul>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-4">
              CSS трансформации — это мощный инструмент для создания современных, интерактивных интерфейсов.
              Они обеспечивают высокую производительность благодаря GPU ускорению и не влияют на layout страницы.
              Правильное использование трансформаций позволяет создавать плавные анимации, 3D эффекты и
              улучшать пользовательский опыт.
            </p>

            <v-card class="pa-4" color="info" variant="tonal">
              <p class="font-weight-bold mb-2">💡 Ключевые моменты для собеседования:</p>
              <ul class="pl-4 mb-0">
                <li>Трансформации работают на GPU и не вызывают reflow</li>
                <li>Порядок трансформаций в одном свойстве имеет значение</li>
                <li>3D трансформации требуют <code>perspective</code> и <code>transform-style: preserve-3d</code></li>
                <li>Matrix предоставляет математический контроль над всеми трансформациями</li>
                <li>Transform-origin определяет точку трансформации</li>
                <li>Важно учитывать производительность и accessibility</li>
              </ul>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
