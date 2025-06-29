<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Runtime CSS-in-JS (Styled Components)
import styled from 'styled-components';

const Button = styled.button\`
  padding: 12px 24px;
  background: \${props => props.theme.primary};
  color: \${props => props.variant === 'outline' ? props.theme.primary : 'white'};
  border: \${props => props.variant === 'outline' ? \`1px solid \${props.theme.primary}\` : 'none'};

  /* Динамические вычисления во время выполнения */
  transform: scale(\${props => props.isPressed ? 0.95 : 1.0});
  box-shadow: \${props => {
    if (props.elevation === 'high') return '0 8px 24px rgba(0,0,0,0.15)';
    if (props.elevation === 'medium') return '0 4px 12px rgba(0,0,0,0.1)';
    return 'none';
  }};

  /* Условная логика */
  \${props => props.fullWidth && \`
    width: 100%;
    display: block;
  \`}

  /* Сложные вычисления на основе пропсов */
  font-size: \${props => {
    const baseSize = 16;
    const sizeMultiplier = props.size === 'large' ? 1.25 : props.size === 'small' ? 0.875 : 1;
    return \`\${baseSize * sizeMultiplier}px\`;
  }};
\`;

// Использование с произвольными данными
<Button
  variant="outline"
  elevation="high"
  size="large"
  isPressed={isButtonPressed}
  theme={dynamicTheme}
  fullWidth={isMobile}
>
  Click me
</Button>
`

const snippet2 = `
// Pre-compile CSS-in-JS (Vanilla Extract)
// button.css.ts
import { style, styleVariants, recipe } from '@vanilla-extract/css';
import { vars } from './theme.css';

// Статические стили, вычисляемые на этапе сборки
export const baseButton = style({
  padding: '12px 24px',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  border: 'none',

  ':hover': {
    transform: 'translateY(-1px)'
  },

  ':active': {
    transform: 'translateY(0)'
  }
});

// Предопределенные варианты
export const buttonVariants = styleVariants({
  solid: {
    background: vars.colors.primary,
    color: 'white'
  },
  outline: {
    background: 'transparent',
    color: vars.colors.primary,
    border: \`1px solid \${vars.colors.primary}\`
  },
  ghost: {
    background: 'transparent',
    color: vars.colors.primary
  }
});

export const buttonSizes = styleVariants({
  small: {
    padding: '8px 16px',
    fontSize: '14px'
  },
  medium: {
    padding: '12px 24px',
    fontSize: '16px'
  },
  large: {
    padding: '16px 32px',
    fontSize: '18px'
  }
});

// Система рецептов для композиции
export const buttonRecipe = recipe({
  base: baseButton,

  variants: {
    variant: buttonVariants,
    size: buttonSizes,
    fullWidth: {
      true: { width: '100%' }
    }
  },

  defaultVariants: {
    variant: 'solid',
    size: 'medium'
  }
});

// React компонент
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({ variant, size, fullWidth, children, ...props }: ButtonProps) {
  return (
    <button
      className={buttonRecipe({ variant, size, fullWidth })}
      {...props}
    >
      {children}
    </button>
  );
}
`

const snippet3 = `
// Сравнение подходов к динамическим стилям

// 1. Runtime - Полная динамичность
const RuntimeButton = styled.button\`
  /* Любые вычисления на основе пропсов */
  background: \${props => {
    if (props.status === 'loading') return '#ccc';
    if (props.status === 'error') return '#ff4444';
    if (props.status === 'success') return '#44ff44';
    return props.theme.colors[props.variant] || '#007bff';
  }};

  /* Динамические значения из API/состояния */
  width: \${props => props.dynamicWidth || 'auto'};
  height: \${props => props.customHeight}px;

  /* Условная логика любой сложности */
  \${props => props.isAnimating && css\`
    animation: \${keyframes\`
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    \`} 0.3s ease-in-out;
  \`}
\`;

// 2. Pre-compile - Ограниченная динамичность
// Нужно предопределить все возможные варианты
export const buttonStates = styleVariants({
  default: { background: vars.colors.primary },
  loading: { background: vars.colors.gray },
  error: { background: vars.colors.error },
  success: { background: vars.colors.success }
});

// Для runtime значений используем CSS переменные
export const dynamicButton = style({
  width: 'var(--button-width, auto)',
  height: 'var(--button-height, auto)',
  background: 'var(--button-bg, var(--color-primary))'
});

// В компоненте
function PrecompileButton({ status, width, height }) {
  const style = {
    '--button-width': width,
    '--button-height': height + 'px',
    '--button-bg': getStatusColor(status)
  };

  return (
    <button
      className={clsx(dynamicButton, buttonStates[status])}
      style={style}
    >
      Button
    </button>
  );
}
`

const snippet4 = `
// Производительность: Runtime vs Pre-compile

// Runtime - Вычисления при каждом рендере
function RuntimeExample() {
  const ExpensiveComponent = styled.div\`
    /* Вычисляется при каждом рендере компонента */
    background: \${props => {
      // Сложные вычисления
      const baseColor = hexToRgb(props.theme.primary);
      const alpha = props.opacity / 100;
      return \`rgba(\${baseColor.r}, \${baseColor.g}, \${baseColor.b}, \${alpha})\`;
    }};

    /* Генерация уникального класса при изменении пропсов */
    box-shadow: \${props => generateShadow(props.elevation, props.color)};

    /* CSS генерируется и инжектируется в runtime */
    transform: rotate(\${props => props.rotation}deg);
  \`;

  return <ExpensiveComponent opacity={opacity} elevation={5} rotation={45} />;
}

// Pre-compile - Стили известны на этапе сборки
// styles.css.ts
export const backgroundVariants = styleVariants({
  // Все варианты предопределены
  primary10: { background: 'rgba(0, 123, 255, 0.1)' },
  primary25: { background: 'rgba(0, 123, 255, 0.25)' },
  primary50: { background: 'rgba(0, 123, 255, 0.5)' },
  primary75: { background: 'rgba(0, 123, 255, 0.75)' },
  primary100: { background: 'rgba(0, 123, 255, 1)' }
});

export const shadowVariants = styleVariants({
  elevation1: { boxShadow: '0 1px 3px rgba(0,0,0,0.12)' },
  elevation2: { boxShadow: '0 3px 6px rgba(0,0,0,0.16)' },
  elevation3: { boxShadow: '0 10px 20px rgba(0,0,0,0.19)' }
});

function PrecompileExample() {
  // Только выбор предопределенного класса
  const backgroundClass = backgroundVariants[\`primary\${opacity}\`];
  const shadowClass = shadowVariants[\`elevation\${elevation}\`];

  return (
    <div className={clsx(backgroundClass, shadowClass)}>
      Content
    </div>
  );
}
`

const snippet5 = `
// Bundle Size и Performance сравнение

// Runtime Bundle Analysis
/*
Styled Components в production bundle:
├── styled-components core: ~12.6kb gzipped
├── emotion/styled: ~7.9kb gzipped
├── theme provider: ~2kb
├── runtime CSS generation: ~3kb
└── babel plugin overhead: ~1kb
Total: ~26.5kb + CSS генерация в runtime
*/

// Pre-compile Bundle Analysis
/*
Vanilla Extract в production bundle:
├── runtime utilities: ~2.1kb gzipped
├── CSS файл: статический, загружается отдельно
├── нет theme provider: 0kb
├── нет runtime генерации: 0kb
└── TypeScript overhead: только dev-time
Total: ~2.1kb + статический CSS файл
*/

// Performance Metrics Comparison
const performanceComparison = {
  runtime: {
    firstContentfulPaint: '1.2s',
    timeToInteractive: '2.1s',
    bundleSize: '26.5kb',
    runtimeOverhead: '~15ms per render',
    memoryUsage: 'Higher (style objects in memory)',
    cssGeneration: 'On every prop change'
  },

  preCompile: {
    firstContentfulPaint: '0.8s',
    timeToInteractive: '1.4s',
    bundleSize: '2.1kb + CSS file',
    runtimeOverhead: '~1ms per render',
    memoryUsage: 'Lower (static classes)',
    cssGeneration: 'Build time only'
  }
};

// Real-world Performance Impact
function PerformanceExample() {
  // Runtime: каждое изменение состояния пересчитывает стили
  const [color, setColor] = useState('#ff0000');
  const [size, setSize] = useState(16);

  // Runtime - пересчет при каждом изменении
  const StyledDiv = styled.div\`
    background: \${props => lighten(0.1, props.color)};
    font-size: \${props => props.size}px;
    border: 2px solid \${props => darken(0.2, props.color)};
  \`;

  // Pre-compile - только смена CSS класса
  const staticClasses = {
    red: 'bg-red-light border-red-dark',
    blue: 'bg-blue-light border-blue-dark',
    green: 'bg-green-light border-green-dark'
  };

  return (
    <div>
      {/* Runtime: стили пересчитываются */}
      <StyledDiv color={color} size={size}>Runtime</StyledDiv>

      {/* Pre-compile: только смена класса */}
      <div
        className={staticClasses[colorVariant]}
        style={{ fontSize: size + 'px' }}
      >
        Pre-compile
      </div>
    </div>
  );
}
`

const snippet6 = `
// Migration Strategies: Runtime → Pre-compile

// 1. Gradual Migration Approach
// Этап 1: Создать статические варианты для часто используемых компонентов
// старый styled-components файл
const OldButton = styled.button\`
  padding: \${props => props.size === 'large' ? '16px 32px' : '12px 24px'};
  background: \${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
\`;

// новый vanilla-extract файл (сосуществует)
export const newButtonStyles = styleVariants({
  primaryLarge: { padding: '16px 32px', background: '#007bff' },
  primaryMedium: { padding: '12px 24px', background: '#007bff' },
  secondaryLarge: { padding: '16px 32px', background: '#6c757d' },
  secondaryMedium: { padding: '12px 24px', background: '#6c757d' }
});

// Этап 2: Wrapper для совместимости
function MigrationButton({ variant, size, children, ...props }) {
  // Используем новые стили где возможно
  const newStyleKey = \`\${variant}\${size.charAt(0).toUpperCase() + size.slice(1)}\`;

  if (newButtonStyles[newStyleKey]) {
    return (
      <button className={newButtonStyles[newStyleKey]} {...props}>
        {children}
      </button>
    );
  }

  // Fallback на старые styled-components
  return (
    <OldButton variant={variant} size={size} {...props}>
      {children}
    </OldButton>
  );
}

// 2. Автоматическая конвертация простых случаев
// Инструмент для анализа styled-components
function analyzeStyledComponent(componentCode) {
  const analysis = {
    hasComplexLogic: /\$\{props\s*=>\s*\{[\s\S]*\}\}/.test(componentCode),
    hasDynamicValues: /\$\{props\./.test(componentCode),
    hasSimpleVariants: /props\.(variant|size|color)/.test(componentCode),
    canBeConverted: false
  };

  // Можно конвертировать если только простые варианты
  analysis.canBeConverted = analysis.hasSimpleVariants &&
                           !analysis.hasComplexLogic &&
                           !analysis.hasDynamicValues;

  return analysis;
}

// 3. Hybrid подход для переходного периода
// Компонент, поддерживающий оба подхода
function HybridButton({
  variant,
  size,
  customColor,  // runtime значение
  children,
  ...props
}) {
  // Статические стили для предопределенных вариантов
  const staticClass = getStaticButtonClass(variant, size);

  // Runtime стили только для кастомных значений
  const dynamicStyles = customColor ? {
    '--custom-color': customColor,
    '--custom-hover': lighten(0.1, customColor)
  } : {};

  return (
    <button
      className={clsx(staticClass, customColor && 'custom-color-button')}
      style={dynamicStyles}
      {...props}
    >
      {children}
    </button>
  );
}
`

const snippet7 = `
// Decision Framework: Когда выбирать Runtime vs Pre-compile

// Критерии для Runtime CSS-in-JS
const runtimeCriteria = {
  // ✅ Выбирать Runtime когда:
  goodFor: [
    'Высокая динамичность стилей',
    'Сложная логика на основе пропсов',
    'Интеграция с внешними API для стилей',
    'Прототипирование и быстрая разработка',
    'Много уникальных вариантов стилей',
    'Анимации на основе данных состояния'
  ],

  // ❌ Избегать Runtime когда:
  avoidWhen: [
    'Критична производительность загрузки',
    'Ограниченный bandwidth пользователей',
    'SEO критично важен',
    'Большая команда с разными уровнями',
    'Простые, предсказуемые стили',
    'Статический контент'
  ]
};

// Критерии для Pre-compile CSS-in-JS
const precompileCriteria = {
  // ✅ Выбирать Pre-compile когда:
  goodFor: [
    'Максимальная производительность runtime',
    'Предсказуемые стили и дизайн система',
    'SEO оптимизация критична',
    'Статический сайт или лендинг',
    'Ограниченный набор UI компонентов',
    'TypeScript строгая типизация'
  ],

  // ❌ Избегать Pre-compile когда:
  avoidWhen: [
    'Нужна высокая динамичность',
    'Много runtime вычислений стилей',
    'Интеграция с внешними данными для стилей',
    'Быстрое прототипирование',
    'Команда не готова к build-time решениям',
    'Много legacy кода с runtime стилями'
  ]
};

// Scoring система для принятия решения
function evaluateApproach(projectRequirements) {
  const criteria = {
    performance: { weight: 0.3, runtime: 6, precompile: 9 },
    flexibility: { weight: 0.25, runtime: 9, precompile: 5 },
    maintenance: { weight: 0.2, runtime: 7, precompile: 8 },
    learning_curve: { weight: 0.15, runtime: 8, precompile: 6 },
    team_size: { weight: 0.1, runtime: 7, precompile: 9 }
  };

  let runtimeScore = 0;
  let precompileScore = 0;

  for (const [key, values] of Object.entries(criteria)) {
    runtimeScore += values.runtime * values.weight;
    precompileScore += values.precompile * values.weight;
  }

  return {
    runtime: runtimeScore.toFixed(2),
    precompile: precompileScore.toFixed(2),
    recommendation: runtimeScore > precompileScore ? 'runtime' : 'precompile'
  };
}

// Практические примеры применения
const useCases = {
  ecommerce: {
    description: 'Интернет-магазин с динамическим контентом',
    requirements: ['SEO важен', 'Производительность критична', 'Много товаров'],
    recommendation: 'Hybrid: Pre-compile для основных стилей, Runtime для динамики',
    implementation: 'Stitches или Vanilla Extract + CSS переменные'
  },

  dashboard: {
    description: 'Админ панель с множеством виджетов',
    requirements: ['Много динамических стилей', 'Кастомизация', 'Быстрая разработка'],
    recommendation: 'Runtime',
    implementation: 'Emotion или Styled Components'
  },

  landingPage: {
    description: 'Маркетинговая страница',
    requirements: ['SEO критичен', 'Быстрая загрузка', 'Статичный контент'],
    recommendation: 'Pre-compile',
    implementation: 'Vanilla Extract или Linaria'
  },

  designSystem: {
    description: 'Библиотека UI компонентов',
    requirements: ['Типизация', 'Предсказуемость', 'Переиспользование'],
    recommendation: 'Pre-compile с вариантами',
    implementation: 'Stitches или Vanilla Extract'
  }
};
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')
const highlightedSnippet7 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              CSS-in-JS: Runtime vs Pre-compile - Что выбрать и от чего отталкиваться
            </h1>

            <p class="font-weight-regular mb-6">
              Один из ключевых вопросов при выборе CSS-in-JS решения - использовать runtime генерацию стилей
              или compile-time экстракцию. Каждый подход имеет свои преимущества и недостатки,
              понимание которых критично для принятия правильного архитектурного решения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Фундаментальные различия</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-l-lg border-primary">
                  <h3 class="text-h6 font-weight-bold mb-3 text-primary">🔄 Runtime CSS-in-JS</h3>
                  <p class="mb-3"><b>Как работает:</b> CSS генерируется в браузере во время выполнения JavaScript</p>

                  <p class="mb-2"><b>Библиотеки:</b></p>
                  <ul class="pl-4 mb-3">
                    <li>Styled Components</li>
                    <li>Emotion</li>
                    <li>JSS</li>
                    <li>Goober</li>
                  </ul>

                  <p class="mb-2"><b>Процесс:</b></p>
                  <ol class="pl-4">
                    <li>Компонент рендерится</li>
                    <li>Стили вычисляются на основе пропсов</li>
                    <li>CSS генерируется и инжектируется</li>
                    <li>Уникальные классы создаются динамически</li>
                  </ol>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-l-lg border-success">
                  <h3 class="text-h6 font-weight-bold mb-3 text-success">⚡ Pre-compile CSS-in-JS</h3>
                  <p class="mb-3"><b>Как работает:</b> CSS извлекается в статические файлы на этапе сборки</p>

                  <p class="mb-2"><b>Библиотеки:</b></p>
                  <ul class="pl-4 mb-3">
                    <li>Vanilla Extract</li>
                    <li>Linaria</li>
                    <li>Compiled (Facebook)</li>
                    <li>Stitches (частично)</li>
                  </ul>

                  <p class="mb-2"><b>Процесс:</b></p>
                  <ol class="pl-4">
                    <li>Стили анализируются при сборке</li>
                    <li>CSS извлекается в статические файлы</li>
                    <li>Генерируются типизированные классы</li>
                    <li>Runtime только выбирает классы</li>
                  </ol>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Runtime CSS-in-JS: Максимальная гибкость</h2>
            <p class="font-weight-regular mb-4">
              Runtime решения предоставляют полную свободу в создании динамических стилей,
              но за счет производительности и размера bundle.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Pre-compile CSS-in-JS: Максимальная производительность</h2>
            <p class="font-weight-regular mb-4">
              Pre-compile решения обеспечивают отличную производительность и типизацию,
              но требуют предопределения всех возможных вариантов стилей.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов к динамичности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Анализ производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Bundle Size и производительность</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Детальное сравнение характеристик</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Характеристика</th>
                <th class="text-left font-weight-bold">Runtime</th>
                <th class="text-left font-weight-bold">Pre-compile</th>
                <th class="text-left font-weight-bold">Комментарий</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-3 pb-3"><b>Bundle Size</b></td>
                <td class="pt-3 pb-3 text-error">12-30kb</td>
                <td class="pt-3 pb-3 text-success">2-5kb</td>
                <td class="pt-3 pb-3">Pre-compile значительно меньше</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Runtime Overhead</b></td>
                <td class="pt-3 pb-3 text-error">5-15ms/render</td>
                <td class="pt-3 pb-3 text-success">~1ms/render</td>
                <td class="pt-3 pb-3">Runtime требует вычислений</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>CSS File Size</b></td>
                <td class="pt-3 pb-3 text-warning">Растет с bundle</td>
                <td class="pt-3 pb-3 text-success">Статический</td>
                <td class="pt-3 pb-3">Pre-compile кэшируется лучше</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>TypeScript Support</b></td>
                <td class="pt-3 pb-3 text-warning">Ограниченная</td>
                <td class="pt-3 pb-3 text-success">Отличная</td>
                <td class="pt-3 pb-3">Pre-compile полная типизация</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>Dynamic Styles</b></td>
                <td class="pt-3 pb-3 text-success">Безграничные</td>
                <td class="pt-3 pb-3 text-error">Ограниченные</td>
                <td class="pt-3 pb-3">Runtime для сложной логики</td>
              </tr>
              <tr>
                <td class="pt-3 pb-3"><b>SSR Performance</b></td>
                <td class="pt-3 pb-3 text-warning">Средняя</td>
                <td class="pt-3 pb-3
