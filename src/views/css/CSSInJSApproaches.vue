<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Styled Components - Template Literals
import styled, { css } from 'styled-components';

// Базовый компонент
const Button = styled.button\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  /* Динамические стили через пропсы */
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: \${props => props.primary ? 'white' : '#333'};

  /* Условные стили */
  \${props => props.disabled && css\`
    opacity: 0.6;
    cursor: not-allowed;
  \`}

  /* Псевдо-селекторы */
  &:hover {
    background: \${props => props.primary ? '#0056b3' : '#545b62'};
    transform: translateY(-1px);
  }

  /* Медиа-запросы */
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
\`;

// Наследование и переопределение
const PrimaryButton = styled(Button)\`
  background: #28a745;

  &:hover {
    background: #218838;
  }
\`;

// Использование
<Button primary disabled>Primary Button</Button>
<PrimaryButton>Success Button</PrimaryButton>
`

const snippet2 = `
// Emotion - Объектный синтаксис
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

// Объектный синтаксис
const buttonStyles = (theme, variant, disabled) => css({
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  background: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
  color: 'white',
  opacity: disabled ? 0.6 : 1,
  transition: 'all 0.2s ease',

  '&:hover': !disabled && {
    background: variant === 'primary' ? theme.colors.primaryDark : theme.colors.secondaryDark,
    transform: 'translateY(-1px)'
  },

  '@media (max-width: 768px)': {
    padding: '8px 16px',
    fontSize: '14px'
  }
});

// String синтаксис (как в styled-components)
const buttonStringStyles = css\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
\`;

// Композиция стилей
const baseButton = css\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
\`;

const primaryButton = css\`
  \${baseButton}
  background: #007bff;
  color: white;
\`;

// Использование
function Button({ variant, disabled, children }) {
  return (
    <button css={buttonStyles(theme, variant, disabled)}>
      {children}
    </button>
  );
}
`

const snippet3 = `
// JSS - JavaScript Objects
import { createUseStyles } from 'react-jss';

// Функциональный подход с данными
const useButtonStyles = createUseStyles({
  button: {
    padding: ({ size }) => {
      switch (size) {
        case 'small': return [8, 16];
        case 'large': return [16, 32];
        default: return [12, 24];
      }
    },
    border: 'none',
    borderRadius: 4,
    fontSize: ({ size }) => size === 'small' ? 14 : size === 'large' ? 18 : 16,
    cursor: ({ disabled }) => disabled ? 'not-allowed' : 'pointer',
    background: ({ variant, theme }) =>
      variant === 'primary' ? theme.primary : theme.secondary,
    color: 'white',
    opacity: ({ disabled }) => disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',

    '&:hover': {
      background: ({ variant, theme, disabled }) => {
        if (disabled) return 'inherit';
        return variant === 'primary' ? theme.primaryDark : theme.secondaryDark;
      },
      transform: ({ disabled }) => disabled ? 'none' : 'translateY(-1px)'
    },

    '@media (max-width: 768px)': {
      padding: [8, 16],
      fontSize: 14
    }
  },

  // Модификаторы
  primary: {
    background: ({ theme }) => theme.primary
  },

  secondary: {
    background: ({ theme }) => theme.secondary
  },

  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
});

// Использование
function Button({ variant, size, disabled, children }) {
  const classes = useButtonStyles({ variant, size, disabled, theme });
  const className = \`\${classes.button} \${classes[variant]} \${disabled ? classes.disabled : ''}\`;

  return (
    <button className={className}>
      {children}
    </button>
  );
}
`

const snippet4 = `
// Stitches - Variants System
import { styled } from '@stitches/react';

// Определение компонента с вариантами
const Button = styled('button', {
  // Базовые стили
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: '$system',

  // Система вариантов
  variants: {
    variant: {
      primary: {
        background: '$primary',
        color: 'white',
        '&:hover': { background: '$primaryDark' }
      },
      secondary: {
        background: '$secondary',
        color: 'white',
        '&:hover': { background: '$secondaryDark' }
      },
      ghost: {
        background: 'transparent',
        color: '$primary',
        border: '1px solid $primary',
        '&:hover': { background: '$primaryLight' }
      }
    },

    size: {
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
    },

    disabled: {
      true: {
        opacity: 0.6,
        cursor: 'not-allowed',
        '&:hover': {
          background: 'inherit',
          transform: 'none'
        }
      }
    },

    fullWidth: {
      true: {
        width: '100%'
      }
    }
  },

  // Составные варианты
  compoundVariants: [
    {
      variant: 'primary',
      size: 'large',
      css: {
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
      }
    },
    {
      variant: 'ghost',
      disabled: true,
      css: {
        borderColor: '$gray300',
        color: '$gray400'
      }
    }
  ],

  // Значения по умолчанию
  defaultVariants: {
    variant: 'primary',
    size: 'medium'
  }
});

// Использование
<Button variant="primary" size="large" fullWidth>
  Large Primary Button
</Button>
<Button variant="ghost" disabled>
  Disabled Ghost Button
</Button>
`

const snippet5 = `
// Vanilla Extract - Zero Runtime
// button.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from './theme.css';

// Базовые стили
export const baseButton = style({
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: vars.fonts.system,

  ':hover': {
    transform: 'translateY(-1px)'
  },

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '8px 16px',
      fontSize: '14px'
    }
  }
});

// Варианты стилей
export const buttonVariants = styleVariants({
  primary: {
    background: vars.colors.primary,
    color: 'white',

    ':hover': {
      background: vars.colors.primaryDark
    }
  },

  secondary: {
    background: vars.colors.secondary,
    color: 'white',

    ':hover': {
      background: vars.colors.secondaryDark
    }
  },

  ghost: {
    background: 'transparent',
    color: vars.colors.primary,
    border: \`1px solid \${vars.colors.primary}\`,

    ':hover': {
      background: vars.colors.primaryLight
    }
  }
});

export const buttonSizes = styleVariants({
  small: {
    padding: '8px 16px',
    fontSize: '14px'
  },

  large: {
    padding: '16px 32px',
    fontSize: '18px'
  }
});

export const disabledButton = style({
  opacity: 0.6,
  cursor: 'not-allowed',

  ':hover': {
    background: 'inherit',
    transform: 'none'
  }
});

// React компонент
import { baseButton, buttonVariants, buttonSizes, disabledButton } from './button.css';

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const className = [
    baseButton,
    buttonVariants[variant],
    size !== 'medium' && buttonSizes[size],
    disabled && disabledButton
  ].filter(Boolean).join(' ');

  return (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
`

const snippet6 = `
// Linaria - CSS Extraction
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

// CSS блоки
const primaryButton = css\`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
\`;

const secondaryButton = css\`
  background: #6c757d;
  color: white;

  &:hover {
    background: #545b62;
  }
\`;

// Styled компоненты
const StyledButton = styled.button\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Интерполяция не поддерживается, только статические значения */
  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
\`;

// Использование с условной логикой
function Button({ variant, children, ...props }) {
  const variantClass = variant === 'primary' ? primaryButton : secondaryButton;

  return (
    <StyledButton className={variantClass} {...props}>
      {children}
    </StyledButton>
  );
}
`

const snippet7 = `
// Goober - Lightweight Alternative
import { styled } from 'goober';

// Простой styled компонент
const Button = styled('button')\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: \${props => props.primary ? '#0056b3' : '#545b62'};
    transform: translateY(-1px);
  }

  \${props => props.disabled && \`
    opacity: 0.6;
    cursor: not-allowed;
  \`}
\`;

// CSS функция (аналог emotion)
import { css } from 'goober';

const buttonStyles = css\`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
\`;

// Использование
<Button primary>Primary Button</Button>
<button className={buttonStyles}>CSS Button</button>
`

const snippet8 = `
// Fela - Functional CSS
import { useFela } from 'react-fela';

// Функциональные правила
const buttonRule = ({ variant, size, disabled, theme }) => ({
  padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px',
  border: 'none',
  borderRadius: '4px',
  fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  background: variant === 'primary' ? theme.primary : theme.secondary,
  color: 'white',
  opacity: disabled ? 0.6 : 1,
  transition: 'all 0.2s ease',

  ':hover': !disabled && {
    background: variant === 'primary' ? theme.primaryDark : theme.secondaryDark,
    transform: 'translateY(-1px)'
  },

  '@media (max-width: 768px)': {
    padding: '8px 16px',
    fontSize: '14px'
  }
});

// Модификаторы как отдельные правила
const disabledRule = () => ({
  opacity: 0.6,
  cursor: 'not-allowed'
});

const hoverRule = ({ variant, theme }) => ({
  ':hover': {
    background: variant === 'primary' ? theme.primaryDark : theme.secondaryDark
  }
});

// React компонент
function Button({ variant = 'primary', size = 'medium', disabled = false, children }) {
  const { css, theme } = useFela();

  const buttonClassName = css(
    buttonRule,
    { variant, size, disabled, theme }
  );

  return (
    <button className={buttonClassName} disabled={disabled}>
      {children}
    </button>
  );
}
`

const snippet9 = `
// Comparison: Dynamic Styling Approaches

// 1. Styled Components - Interpolation Functions
const StyledButton = styled.button\`
  background: \${({ variant, theme }) => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.danger;
      default: return theme.colors.default;
    }
  }};

  padding: \${({ size }) => {
    const sizes = { small: '8px 16px', medium: '12px 24px', large: '16px 32px' };
    return sizes[size] || sizes.medium;
  }};
\`;

// 2. Emotion - Object Style with Functions
const getDynamicStyles = (props) => ({
  background: props.variant === 'primary' ? props.theme.primary : props.theme.secondary,
  padding: props.size === 'small' ? '8px 16px' : '12px 24px',
  color: props.inverted ? props.theme.background : props.theme.text,

  // Сложная логика
  ...(props.gradient && {
    background: \`linear-gradient(45deg, \${props.theme.primary}, \${props.theme.secondary})\`
  }),

  // Условные псевдо-селекторы
  '&:hover': props.disabled ? {} : {
    background: lighten(0.1, props.theme.primary),
    transform: 'scale(1.02)'
  }
});

// 3. JSS - Function-based Rules
const useStyles = createUseStyles({
  button: {
    background: ({ variant, theme }) => theme[variant] || theme.default,
    padding: ({ size }) => {
      const padding = { small: [8, 16], medium: [12, 24], large: [16, 32] };
      return padding[size] || padding.medium;
    },

    // Вычисляемые значения
    fontSize: ({ size, theme }) => theme.fontSizes[size] * theme.scale,
    borderRadius: ({ rounded, theme }) => rounded ? theme.borderRadius * 2 : theme.borderRadius,

    // Сложные селекторы
    '&:not(:disabled):hover': {
      transform: ({ animated }) => animated ? 'translateY(-2px)' : 'none'
    }
  }
});

// 4. Stitches - CSS-in-TS with Variants
const Button = styled('button', {
  // Computed styles через CSS функции
  $$shadowColor: 'rgba(0, 0, 0, 0.1)',
  $$hoverTransform: 'translateY(-1px)',

  variants: {
    intent: {
      primary: { $$shadowColor: 'rgba(0, 123, 255, 0.3)' },
      secondary: { $$shadowColor: 'rgba(108, 117, 125, 0.3)' }
    },

    animated: {
      true: {
        '&:hover': { transform: '$$hoverTransform' }
      }
    }
  }
});
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

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
  highlightedSnippet9.value = Prism.highlight(snippet9, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Различия подходов к созданию и изменению стилей в разных CSS-in-JS библиотеках
            </h1>

            <p class="font-weight-regular mb-6">
              Каждая CSS-in-JS библиотека предлагает свой уникальный подход к созданию и управлению стилями.
              Понимание этих различий поможет выбрать подходящий инструмент для конкретных задач.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение основных подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Библиотека</th>
                <th class="text-left font-weight-bold">Синтаксис</th>
                <th class="text-left font-weight-bold">Динамичность</th>
                <th class="text-left font-weight-bold">TypeScript</th>
                <th class="text-left font-weight-bold">Runtime</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2 text-success">Высокая</td>
                <td class="pt-2 pb-2 text-warning">Средняя</td>
                <td class="pt-2 pb-2 text-error">Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Emotion</b></td>
                <td class="pt-2 pb-2">Objects + strings</td>
                <td class="pt-2 pb-2 text-success">Высокая</td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-error">Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>JSS</b></td>
                <td class="pt-2 pb-2">JavaScript objects</td>
                <td class="pt-2 pb-2 text-success">Высокая</td>
                <td class="pt-2 pb-2 text-success">Хорошая</td>
                <td class="pt-2 pb-2 text-error">Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Stitches</b></td>
                <td class="pt-2 pb-2">Variants system</td>
                <td class="pt-2 pb-2 text-warning">Средняя</td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-warning">Минимальный</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vanilla Extract</b></td>
                <td class="pt-2 pb-2">TypeScript objects</td>
                <td class="pt-2 pb-2 text-error">Низкая</td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-success">Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Linaria</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2 text-error">Низкая</td>
                <td class="pt-2 pb-2 text-warning">Средняя</td>
                <td class="pt-2 pb-2 text-success">Нет</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. Styled Components - Template Literals</h2>
            <p class="font-weight-regular mb-4">
              Использует tagged template literals для создания styled компонентов.
              Поддерживает полную интерполяцию JavaScript внутри CSS.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Emotion - Гибридный подход</h2>
            <p class="font-weight-regular mb-4">
              Поддерживает как объектный синтаксис, так и template literals.
              Отличная TypeScript поддержка и производительность.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. JSS - Функциональный подход</h2>
            <p class="font-weight-regular mb-4">
              Использует JavaScript объекты с функциональным подходом к созданию стилей.
              Отлично подходит для сложной логики стилизации.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Stitches - Система вариантов</h2>
            <p class="font-weight-regular mb-4">
              Использует систему вариантов для создания переиспользуемых компонентов.
              Отличная TypeScript поддержка и возможность zero-runtime компиляции.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Vanilla Extract - Zero Runtime</h2>
            <p class="font-weight-regular mb-4">
              Статическая экстракция CSS на этапе сборки. TypeScript-first подход
              с полной типизацией стилей.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Linaria - CSS экстракция</h2>
            <p class="font-weight-regular mb-4">
              Извлекает CSS в статические файлы на этапе сборки.
              Ограниченная динамичность, но отличная производительность.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Goober - Легковесная альтернатива</h2>
            <p class="font-weight-regular mb-4">
              Легковесная библиотека (~1KB) с синтаксисом, похожим на Styled Components.
              Идеальна для небольших проектов.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Fela - Функциональный CSS</h2>
            <p class="font-weight-regular mb-4">
              Полностью функциональный подход к CSS. Каждое правило - это функция,
              что обеспечивает максимальную гибкость.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Различия в создании динамических стилей</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Ключевые различия подходов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎯 Синтаксис</h3>
                  <ul class="pl-4">
                    <li><b>Template literals:</b> Styled Components, Goober</li>
                    <li><b>Object syntax:</b> Emotion, JSS, Fela</li>
                    <li><b>Variant system:</b> Stitches</li>
                    <li><b>TypeScript objects:</b> Vanilla Extract
