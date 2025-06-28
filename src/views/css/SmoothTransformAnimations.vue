<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* ОСНОВНЫЕ принципы плавных анимаций */

/* ❌ Плохо - анимация layout-свойств */
.slow-animation {
  transition:
    left 0.3s ease,        /* Layout reflow */
    top 0.3s ease,         /* Layout reflow */
    width 0.3s ease,       /* Layout reflow */
    height 0.3s ease;      /* Layout reflow */
}

.slow-animation:hover {
  left: 100px;
  top: 50px;
  width: 200px;
  height: 150px;
}

/* ✅ Хорошо - анимация композитных свойств */
.smooth-animation {
  /* Только GPU-оптимизированные свойства */
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease;

  /* Подготовка GPU слоя */
  will-change: transform;
  transform: translateZ(0);
}

.smooth-animation:hover {
  /* Все изменения через transform */
  transform:
    translateX(100px)      /* вместо left */
    translateY(50px)       /* вместо top */
    scale(1.5)             /* вместо width/height */
    translateZ(0);
}

/* Оптимальный timing для плавности */
.optimal-timing {
  /* Кривые Безье для естественности */
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),    /* Material Design easing */
    opacity 0.15s ease-out;                           /* Быстрое появление */
}

/* Разные скорости для разных свойств */
.multi-property-timing {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), /* Bounce effect */
    opacity 0.2s ease-in-out,                          /* Плавное затухание */
    filter 0.4s ease;                                  /* Медленные фильтры */
}
`

const snippet2 = `
/* КРИВЫЕ БЕЗЬЕ для естественных анимаций */

/* Предустановленные timing functions */
.timing-functions {
  /* Базовые функции */
  transition: transform 0.3s linear;        /* Равномерная скорость */
  transition: transform 0.3s ease;          /* Медленный старт/финиш */
  transition: transform 0.3s ease-in;       /* Медленный старт */
  transition: transform 0.3s ease-out;      /* Медленный финиш */
  transition: transform 0.3s ease-in-out;   /* Медленный старт/финиш */
}

/* Кастомные кривые Безье */
.custom-easing {
  /* Material Design Motion */
  --standard: cubic-bezier(0.4, 0, 0.2, 1);       /* Стандартная */
  --decelerate: cubic-bezier(0, 0, 0.2, 1);       /* Замедление */
  --accelerate: cubic-bezier(0.4, 0, 1, 1);       /* Ускорение */
  --sharp: cubic-bezier(0.4, 0, 0.6, 1);          /* Резкая */

  /* iOS подобные кривые */
  --ios-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ios-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);

  /* Пружинные эффекты */
  --spring-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --spring-bouncy: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --spring-snappy: cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

/* Применение разных кривых для разных действий */
.contextual-easing {
  /* Для появления элементов */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.contextual-easing.entering {
  transform: translateY(0) scale(1);
}

.contextual-easing.exiting {
  /* Для исчезновения элементов */
  transition: transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  transform: translateY(-20px) scale(0.95);
}

/* Многоступенчатые анимации */
.multi-step-animation {
  /* Разные этапы с разными кривыми */
  animation: complex-movement 1.5s ease-in-out;
}

@keyframes complex-movement {
  0% {
    transform: translateX(0) scale(1);
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  30% {
    transform: translateX(100px) scale(1.1);
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  60% {
    transform: translateX(200px) scale(0.9);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  100% {
    transform: translateX(300px) scale(1);
  }
}
`

const snippet3 = `
/* ОПТИМИЗАЦИЯ производительности анимаций */

/* Подготовка к анимации */
.animation-preparation {
  /* Создание композитного слоя заранее */
  will-change: transform;
  transform: translateZ(0);

  /* Изоляция содержимого */
  contain: layout paint;

  /* Оптимизация для GPU */
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Селективная оптимизация */
.selective-optimization {
  /* По умолчанию без оптимизации */
  will-change: auto;
  transition: transform 0.3s ease;
}

.selective-optimization:hover,
.selective-optimization:focus,
.selective-optimization.is-animating {
  /* Включаем оптимизацию только при необходимости */
  will-change: transform;
}

/* Очистка оптимизаций после анимации */
.cleanup-optimization {
  transition: transform 0.3s ease;
}

.cleanup-optimization.animation-ended {
  /* Очищаем will-change для экономии памяти */
  will-change: auto;
}

/* Группировка анимаций */
.animation-group {
  /* Общий 3D контекст для группы */
  transform-style: preserve-3d;
  perspective: 1000px;
}

.animation-group .item {
  /* Элементы разделяют GPU контекст */
  transform: translateZ(var(--z-index, 0));
  transition: transform 0.2s ease;
}

/* Батчинг трансформаций */
.batched-transforms {
  /* Объединяем все трансформации в одну операцию */
  --translate-x: 0px;
  --translate-y: 0px;
  --rotate: 0deg;
  --scale: 1;

  transform:
    translateX(var(--translate-x))
    translateY(var(--translate-y))
    rotate(var(--rotate))
    scale(var(--scale))
    translateZ(0);

  transition: transform 0.3s ease;
}

.batched-transforms:hover {
  --translate-x: 50px;
  --translate-y: -20px;
  --rotate: 45deg;
  --scale: 1.2;
}
`

const snippet4 = `
/* ТЕХНИКИ для сложных анимационных последовательностей */

/* Ступенчатые анимации с задержками */
.staggered-animation-container .item {
  transform: translateY(50px);
  opacity: 0;
  transition:
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.6s ease-out;
  transition-delay: calc(var(--index, 0) * 0.1s);
}

.staggered-animation-container.animate .item {
  transform: translateY(0);
  opacity: 1;
}

/* Цепочки анимаций */
.animation-chain {
  /* Первая анимация */
  transform: translateX(-100px);
  opacity: 0;
  transition:
    transform 0.4s ease-out,
    opacity 0.4s ease-out;
}

.animation-chain.step-1 {
  /* Вторая анимация начинается после первой */
  transform: translateX(0);
  opacity: 1;
  transition-delay: 0s;
}

.animation-chain.step-2 {
  /* Третья анимация */
  transform: translateX(0) scale(1.1);
  transition:
    transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    opacity 0.3s ease;
  transition-delay: 0.4s;
}

.animation-chain.step-3 {
  /* Финальное состояние */
  transform: translateX(0) scale(1);
  transition-delay: 0.7s;
}

/* Параллельные анимации с разными кривыми */
.parallel-animations {
  transform: translate(0, 0) scale(1) rotate(0deg);
  filter: blur(0) brightness(1);

  transition:
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),  /* Пружинная */
    filter 0.8s ease-in-out;                            /* Плавная */
}

.parallel-animations:hover {
  transform: translate(100px, -50px) scale(1.2) rotate(15deg);
  filter: blur(2px) brightness(1.3);
}

/* Морфинг анимации */
.morphing-animation {
  /* Плавное изменение формы через clip-path */
  clip-path: circle(20% at 50% 50%);
  transition: clip-path 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.morphing-animation:hover {
  clip-path: circle(70% at 50% 50%);
}

/* Path анимации */
.path-animation {
  /* Движение по сложной траектории */
  offset-path: path('M 50 50 Q 150 20 250 50 T 450 50');
  offset-distance: 0%;
  offset-rotate: auto;

  animation: follow-path 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes follow-path {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
`

const snippet5 = `
/* АДАПТИВНОСТЬ и отзывчивость анимаций */

/* Учет пользовательских предпочтений */
@media (prefers-reduced-motion: reduce) {
  .respectful-animation {
    /* Отключаем анимации для пользователей с чувствительностью */
    animation: none !important;
    transition: none !important;
  }

  .respectful-animation:hover {
    /* Мгновенные изменения вместо анимаций */
    transform: scale(1.05);
    transition: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .respectful-animation {
    /* Полноценные анимации для остальных */
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

/* Адаптация к производительности устройства */
@media (max-width: 768px) {
  .performance-adaptive {
    /* Упрощенные анимации на мобильных */
    transition: transform 0.2s ease-out;
  }

  .performance-adaptive:hover {
    /* Менее сложные трансформации */
    transform: translateY(-5px);
  }
}

@media (min-width: 1200px) {
  .performance-adaptive {
    /* Богатые анимации на десктопе */
    transition:
      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      filter 0.4s ease;
  }

  .performance-adaptive:hover {
    transform:
      translateY(-10px)
      scale(1.05)
      rotate(2deg);
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
  }
}

/* Динамическая адаптация скорости */
.speed-adaptive {
  /* Переменные для контроля скорости */
  --animation-speed: 1;
  --animation-duration: calc(0.3s / var(--animation-speed));

  transition: transform var(--animation-duration) ease-out;
}

/* Контекстно-зависимые анимации */
.context-aware {
  /* Разные анимации для разных состояний */
  transition: transform 0.3s ease;
}

.context-aware.loading {
  /* Пульсирующая анимация загрузки */
  animation: pulse 1.5s ease-in-out infinite;
}

.context-aware.success {
  /* Анимация успеха */
  animation: success-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.context-aware.error {
  /* Анимация ошибки */
  animation: error-shake 0.5s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

@keyframes success-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes error-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`

const snippet6 = `
// JAVASCRIPT для продвинутого контроля анимаций

// Класс для управления плавными анимациями
class SmoothAnimationController {
  constructor() {
    this.animatingElements = new Set();
    this.observer = this.setupIntersectionObserver();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Настройка наблюдателя за видимостью
  setupIntersectionObserver() {
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimation(entry.target);
        } else {
          this.pauseAnimation(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
  }

  // Регистрация элемента для анимации
  registerElement(element, options = {}) {
    const config = {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'translateY(20px)',
      opacity: 0,
      ...options
    };

    element.dataset.animationConfig = JSON.stringify(config);

    // Устанавливаем начальное состояние
    this.setInitialState(element, config);

    // Наблюдаем за элементом
    this.observer.observe(element);
  }

  // Установка начального состояния
  setInitialState(element, config) {
    if (this.prefersReducedMotion) return;

    element.style.transform = config.transform;
    element.style.opacity = config.opacity;
    element.style.transition = 'none';
  }

  // Запуск анимации
  startAnimation(element) {
    if (this.prefersReducedMotion) {
      element.style.transform = 'none';
      element.style.opacity = '1';
      return;
    }

    const config = JSON.parse(element.dataset.animationConfig || '{}');

    // Подготавливаем элемент к анимации
    element.style.willChange = 'transform, opacity';
    element.style.transition = \`
      transform \${config.duration}ms \${config.easing},
      opacity \${config.duration}ms \${config.easing}
    \`;

    // Запускаем анимацию через микротаск
    requestAnimationFrame(() => {
      element.style.transform = 'none';
      element.style.opacity = '1';
    });

    // Очищаем will-change после анимации
    setTimeout(() => {
      element.style.willChange = 'auto';
    }, config.duration);

    this.animatingElements.add(element);
  }

  // Приостановка анимации
  pauseAnimation(element) {
    if (this.animatingElements.has(element)) {
      element.style.willChange = 'auto';
      this.animatingElements.delete(element);
    }
  }

  // Batch анимации для списков
  animateList(container, items, staggerDelay = 100) {
    if (this.prefersReducedMotion) {
      items.forEach(item => {
        item.style.transform = 'none';
        item.style.opacity = '1';
      });
      return;
    }

    items.forEach((item, index) => {
      setTimeout(() => {
        this.startAnimation(item);
      }, index * staggerDelay);
    });
  }

  // Создание кастомной анимации
  createCustomAnimation(element, keyframes, options = {}) {
    const defaultOptions = {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    };

    const animationOptions = { ...defaultOptions, ...options };

    if (this.prefersReducedMotion) {
      // Применяем только финальное состояние
      const finalFrame = keyframes[keyframes.length - 1];
      Object.assign(element.style, finalFrame);
      return Promise.resolve();
    }

    // Подготовка к анимации
    element.style.willChange = 'transform, opacity';

    // Создаем анимацию
    const animation = element.animate(keyframes, animationOptions);

    // Очистка после завершения
    animation.addEventListener('finish', () => {
      element.style.willChange = 'auto';
    });

    return animation.finished;
  }

  // Отзывчивые анимации в зависимости от размера экрана
  createResponsiveAnimation(element, animations) {
    const mediaQueries = {
      mobile: window.matchMedia('(max-width: 768px)'),
      tablet: window.matchMedia('(min-width: 769px) and (max-width: 1024px)'),
      desktop: window.matchMedia('(min-width: 1025px)')
    };

    const updateAnimation = () => {
      let config = animations.default || {};

      if (mediaQueries.mobile.matches && animations.mobile) {
        config = { ...config, ...animations.mobile };
      } else if (mediaQueries.tablet.matches && animations.tablet) {
        config = { ...config, ...animations.tablet };
      } else if (mediaQueries.desktop.matches && animations.desktop) {
        config = { ...config, ...animations.desktop };
      }

      this.registerElement(element, config);
    };

    // Обновляем при изменении размера экрана
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateAnimation);
    });

    updateAnimation();
  }

  // Мониторинг производительности анимаций
  measureAnimationPerformance(name, animationFunction) {
    const startTime = performance.now();
    let frameCount = 0;

    const measureFrame = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - startTime >= 1000) {
        const fps = frameCount;
        console.log(\`Animation "\${name}" FPS: \${fps}\`);

        if (fps < 30) {
          console.warn(\`Poor performance detected for "\${name}"\`);
        }

        return;
      }

      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
    return animationFunction();
  }

  // Cleanup
  destroy() {
    this.observer.disconnect();
    this.animatingElements.clear();
  }
}

// Утилиты для оптимизации анимаций
class AnimationOptimizer {
  static async detectGPUSupport() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  }

  static throttleAnimations(callback, delay = 16) {
    let timeoutId;
    let lastExecTime = 0;

    return function(...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        callback.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          callback.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  static batchDOMWrites(operations) {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        operations.forEach(op => op());
        resolve();
      });
    });
  }

  static createEfficientTransition(element, properties, duration = 300) {
    const hasGPUSupport = this.detectGPUSupport();

    if (!hasGPUSupport) {
      // Fallback для устройств без GPU
      element.style.transition = \`opacity \${duration}ms ease\`;
      return;
    }

    // Оптимизированная анимация с GPU
    element.style.willChange = 'transform, opacity';
    element.style.transition = \`
      transform \${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity \${duration}ms ease-out
    \`;

    setTimeout(() => {
      element.style.willChange = 'auto';
    }, duration);
  }
}

// Использование
const animationController = new SmoothAnimationController();

// Регистрация элементов
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animationController.registerElement(el, {
    duration: 600,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: 'translateY(30px) scale(0.95)',
    opacity: 0
  });
});

// Отзывчивая анимация
animationController.createResponsiveAnimation(
  document.querySelector('.responsive-element'),
  {
    default: { duration: 300, transform: 'translateY(20px)' },
    mobile: { duration: 200, transform: 'translateY(10px)' },
    desktop: { duration: 400, transform: 'translateY(30px) scale(0.98)' }
  }
);
`

const snippet7 = `
/* ПРОДВИНУТЫЕ техники анимаций */

/* Композитные анимации с переменными */
.variable-driven-animation {
  /* CSS переменные для динамического контроля */
  --mouse-x: 0;
  --mouse-y: 0;
  --scroll-progress: 0;
  --element-visible: 0;

  transform:
    translateX(calc(var(--mouse-x) * 0.1px))
    translateY(calc(var(--mouse-y) * 0.1px))
    translateZ(calc(var(--scroll-progress) * 50px))
    scale(calc(1 + var(--element-visible) * 0.1));

  opacity: calc(0.8 + var(--element-visible) * 0.2);
  filter: blur(calc((1 - var(--element-visible)) * 5px));

  transition:
    transform 0.1s ease-out,
    filter 0.3s ease;
}

/* Анимации на основе состояния */
.state-based-animation {
  /* Базовое состояние */
  transform: scale(1) rotate(0deg);
  opacity: 1;
  filter: brightness(1) contrast(1);

  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease,
    filter 0.4s ease;
}

.state-based-animation[data-state="loading"] {
  transform: scale(0.95) rotate(180deg);
  opacity: 0.7;
  filter: brightness(0.8) contrast(1.2);
  animation: loading-pulse 1.5s ease-in-out infinite;
}

.state-based-animation[data-state="success"] {
  transform: scale(1.05) rotate(5deg);
  filter: brightness(1.2) contrast(1.1);
  animation: success-glow 0.6s ease-out;
}

.state-based-animation[data-state="error"] {
  transform: scale(1.02) rotate(-2deg);
  filter: brightness(1.1) contrast(1.3) hue-rotate(15deg);
  animation: error-shake 0.5s ease-in-out;
}

/* Сложные keyframe анимации */
@keyframes complex-entrance {
  0% {
    transform:
      translateY(100px)
      scale(0.8)
      rotate(-10deg);
    opacity: 0;
    filter: blur(10px);
    clip-path: circle(0% at 50% 50%);
  }
  20% {
    opacity: 0.3;
    filter: blur(5px);
  }
  40% {
    transform:
      translateY(20px)
      scale(1.1)
      rotate(2deg);
    opacity: 0.7;
    filter: blur(2px);
    clip-path: circle(30% at 50% 50%);
  }
  60% {
    transform:
      translateY(-10px)
      scale(0.95)
      rotate(-1deg);
    opacity: 0.9;
    filter: blur(1px);
    clip-path: circle(60% at 50% 50%);
  }
  80% {
    transform:
      translateY(5px)
      scale(1.02)
      rotate(0.5deg);
    filter: blur(0.5px);
    clip-path: circle(80% at 50% 50%);
  }
  100% {
    transform:
      translateY(0)
      scale(1)
      rotate(0deg);
    opacity: 1;
    filter: blur(0);
    clip-path: circle(100% at 50% 50%);
  }
}

/* Анимации с физическими эффектами */
.physics-animation {
  /* Имитация физики через CSS */
  --gravity: 9.8;
  --bounce-damping: 0.7;
  --friction: 0.95;

  animation: physics-bounce 2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

@keyframes physics-bounce {
  0% { transform: translateY(-200px); }
  20% { transform: translateY(0px); }
  30% { transform: translateY(-50px); }
  40% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  60% { transform: translateY(0px); }
  70% { transform: translateY(-8px); }
  80% { transform: translateY(0px); }
  90% { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
}

/* Морфинг анимации */
.morphing-shapes {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.morphing-shapes:hover {
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}

/* Цепочки связанных анима
