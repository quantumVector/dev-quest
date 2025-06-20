<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-bash.js'

const snippet1 = `
/* CSS Modules - конфигурация */

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
                exportLocalsConvention: 'camelCase'
              }
            }
          }
        ]
      }
    ]
  }
};

// vite.config.js
export default {
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
};

// package.json
{
  "dependencies": {
    "css-loader": "^6.8.1",
    "postcss-modules": "^6.0.0"
  }
}

// Использование
import styles from './Button.module.css';

const Button = () => (
  <button className={styles.primaryButton}>
    Кнопка
  </button>
);
`

const snippet2 = `
/* Styled Components - полный функционал CSS-in-JS */

// Установка
npm install styled-components
npm install --save-dev @types/styled-components

// Базовое использование
import styled, {
  css,
  ThemeProvider,
  createGlobalStyle,
  keyframes
} from 'styled-components';

// Стилизованный компонент
const Button = styled.button\`
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: \${props => props.primary ? '#0056b3' : '#545b62'};
  }

  \${props => props.disabled && css\`
    opacity: 0.6;
    cursor: not-allowed;
  \`}
\`;

// Расширение стилей
const PrimaryButton = styled(Button)\`
  background: #28a745;

  &:hover {
    background: #218838;
  }
\`;

// Анимации
const fadeIn = keyframes\`
  from { opacity: 0; }
  to { opacity: 1; }
\`;

const Modal = styled.div\`
  animation: \${fadeIn} 0.3s ease-in;
\`;

// Темизация
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d'
  },
  breakpoints: {
    mobile: '768px'
  }
};

const ThemedButton = styled.button\`
  background: \${props => props.theme.colors.primary};

  @media (max-width: \${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
\`;

// Глобальные стили
const GlobalStyle = createGlobalStyle\`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
\`;

// Использование с темой
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Button primary>Первичная кнопка</Button>
      <PrimaryButton>Успех</PrimaryButton>
      <ThemedButton>Тематическая кнопка</ThemedButton>
    </ThemeProvider>
  );
}
`

const snippet3 = `
/* Emotion - альтернатива Styled Components */

// Установка
npm install @emotion/react @emotion/styled
npm install @emotion/css

// CSS prop подход
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyle = css\`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
\`;

function Button() {
  return <button css={buttonStyle}>Кнопка</button>;
}

// Styled подход
import styled from '@emotion/styled';

const StyledButton = styled.button\`
  background: \${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
\`;

// Object styles
const buttonStyles = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  '&:hover': {
    opacity: 0.8
  }
};

function ObjectButton() {
  return <button css={buttonStyles}>Объектная кнопка</button>;
}

// Композиция стилей
const baseButton = css\`
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
\`;

const primaryButton = css\`
  \${baseButton};
  background: #007bff;
  color: white;
\`;

const secondaryButton = css\`
  \${baseButton};
  background: #6c757d;
  color: white;
\`;
`

const snippet4 = `
/* JSS - CSS-in-JS библиотека */

// Установка
npm install jss react-jss

import { createUseStyles } from 'react-jss';

// Создание стилей
const useStyles = createUseStyles({
  button: {
    background: props => props.primary ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  },
  // Медиа-запросы
  '@media (max-width: 768px)': {
    button: {
      width: '100%'
    }
  },
  // Псевдоэлементы
  buttonWithIcon: {
    '&::before': {
      content: '"\\f007"',
      fontFamily: 'FontAwesome',
      marginRight: '8px'
    }
  }
});

// Использование
function Button({ primary, children }) {
  const classes = useStyles({ primary });

  return (
    <button className={classes.button}>
      {children}
    </button>
  );
}

// Глобальные стили с JSS
import { createGlobalStyle } from 'react-jss';

const globalStyles = {
  '@global': {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif'
    },
    '*': {
      boxSizing: 'border-box'
    }
  }
};

const GlobalStyles = createGlobalStyle(globalStyles);
`

const snippet5 = `
/* PostCSS плагины для изоляции стилей */

// postcss.config.js
module.exports = {
  plugins: [
    // PostCSS Modules
    require('postcss-modules')({
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }),

    // PostCSS Nested для вложенности
    require('postcss-nested'),

    // PostCSS Custom Properties
    require('postcss-custom-properties'),

    // PostCSS Import для @import
    require('postcss-import'),

    // Autoprefixer
    require('autoprefixer')
  ]
};

// Пример CSS с PostCSS Nested
.component {
  padding: 20px;
  border: 1px solid #ddd;

  .title {
    font-size: 24px;
    color: #333;

    &:hover {
      color: #007bff;
    }
  }

  .button {
    background: #007bff;
    color: white;

    &:disabled {
      opacity: 0.6;
    }
  }
}

// PostCSS Custom Properties
:root {
  --primary-color: #007bff;
  --border-radius: 4px;
}

.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
}

// package.json скрипты
{
  "scripts": {
    "build:css": "postcss src/styles.css -o dist/styles.css",
    "watch:css": "postcss src/styles.css -o dist/styles.css --watch"
  }
}
`

const snippet6 = `
/* Linaria - Zero-runtime CSS-in-JS */

// Установка
npm install @linaria/core @linaria/react
npm install --save-dev @linaria/webpack-loader

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          '@linaria/webpack-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@linaria']
            }
          }
        ]
      }
    ]
  }
};

// Использование Linaria
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

// CSS класс
const button = css\`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
\`;

function Button() {
  return <button className={button}>Кнопка</button>;
}

// Styled компонент
const StyledButton = styled.button\`
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  padding: 10px 20px;

  &:hover {
    opacity: 0.8;
  }
\`;

// Динамические стили с CSS переменными
const dynamicButton = css\`
  background: var(--button-bg);
  color: var(--button-color);
  border: none;
  padding: 10px 20px;
\`;

function DynamicButton({ bgColor, textColor }) {
  return (
    <button
      className={dynamicButton}
      style={{
        '--button-bg': bgColor,
        '--button-color': textColor
      }}
    >
      Динамическая кнопка
    </button>
  );
}
`

const snippet7 = `
/* Stitches - Modern CSS-in-JS */

// Установка
npm install @stitches/react

import { styled, css, globalCss, createTheme } from '@stitches/react';

// Конфигурация
export const { styled, css } = createStitches({
  theme: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d'
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px'
    },
    radii: {
      1: '4px',
      2: '8px'
    }
  },
  media: {
    bp1: '(min-width: 768px)',
    bp2: '(min-width: 1024px)'
  },
  utils: {
    // Сокращения для часто используемых свойств
    p: (value) => ({
      padding: value
    }),
    m: (value) => ({
      margin: value
    }),
    size: (value) => ({
      width: value,
      height: value
    })
  }
});

// Styled компонент с вариантами
const Button = styled('button', {
  border: 'none',
  borderRadius: '$1',
  cursor: 'pointer',
  p: '$2 $3',

  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
        color: 'white'
      },
      secondary: {
        backgroundColor: '$secondary',
        color: 'white'
      }
    },
    size: {
      small: {
        fontSize: '14px',
        p: '$1 $2'
      },
      large: {
        fontSize: '18px',
        p: '$3 $4'
      }
    }
  },

  defaultVariants: {
    color: 'primary',
    size: 'medium'
  },

  '@bp1': {
    fontSize: '16px'
  }
});

// CSS класс
const cardClass = css({
  backgroundColor: 'white',
  borderRadius: '$2',
  p: '$3',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

// Темная тема
const darkTheme = createTheme({
  colors: {
    primary: '#0d6efd',
    secondary: '#495057'
  }
});

// Глобальные стили
const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box'
  },
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif'
  }
});

// Использование
function App() {
  globalStyles();

  return (
    <div className={darkTheme}>
      <div className={cardClass()}>
        <Button color="primary" size="large">
          Большая кнопка
        </Button>
        <Button color="secondary">
          Обычная кнопка
        </Button>
      </div>
    </div>
  );
}
`

const snippet8 = `
/* Vanilla Extract - Type-safe CSS-in-TypeScript */

// Установка
npm install @vanilla-extract/css
npm install --save-dev @vanilla-extract/webpack-plugin

// styles.css.ts
import { style, styleVariants, globalStyle } from '@vanilla-extract/css';

// Глобальные стили
globalStyle('*', {
  boxSizing: 'border-box'
});

globalStyle('body', {
  margin: 0,
  fontFamily: 'Arial, sans-serif'
});

// Базовый стиль
const baseButton = style({
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  padding: '10px 20px',
  fontSize: 16,
  transition: 'background 0.2s',

  ':hover': {
    opacity: 0.8
  },

  ':disabled': {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
});

// Варианты стилей
export const buttonVariants = styleVariants({
  primary: [baseButton, {
    backgroundColor: '#007bff',
    color: 'white'
  }],
  secondary: [baseButton, {
    backgroundColor: '#6c757d',
    color: 'white'
  }],
  outline: [baseButton, {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff'
  }]
});

// Размеры
export const buttonSizes = styleVariants({
  small: {
    padding: '5px 10px',
    fontSize: 14
  },
  medium: {
    padding: '10px 20px',
    fontSize: 16
  },
  large: {
    padding: '15px 30px',
    fontSize: 18
  }
});

// Композиция стилей
export const cardStyle = style({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 20,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

  '@media': {
    'screen and (max-width: 768px)': {
      padding: 16
    }
  }
});

// Button.tsx
import { buttonVariants, buttonSizes } from './styles.css';

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  children: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  disabled
}: ButtonProps) {
  return (
    <button
      className={\`\${buttonVariants[variant]} \${buttonSizes[size]}\`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
`

const snippet9 = `
/* Build инструменты для CSS изоляции */

// Rollup с CSS Modules
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]'
      },
      extract: true,
      minimize: true
    })
  ]
};

// Parcel - автоматическая поддержка CSS Modules
// package.json
{
  "scripts": {
    "build": "parcel build src/index.html",
    "dev": "parcel src/index.html"
  }
}
// Файлы *.module.css автоматически обрабатываются как CSS Modules

// esbuild с CSS Modules
const esbuild = require('esbuild');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    cssModulesPlugin({
      localsConvention: 'camelCaseOnly'
    })
  ]
});

// SWC с CSS Modules (Rust-based bundler)
// .swcrc
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    }
  },
  "module": {
    "type": "es6"
  },
  "experimental": {
    "plugins": [
      ["@swc/plugin-css-modules", {
        "generateScopedName": "[name]__[local]___[hash:base64:5]"
      }]
    ]
  }
}
`

const snippet10 = `
/* Настройка TypeScript для CSS-in-JS */

// types/styled-components.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}

// types/css-modules.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// theme.ts
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
};

// Типизированный styled компонент
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>\`
  background: \${({ theme, variant = 'primary' }) => theme.colors[variant]};
  padding: \${({ theme, size = 'medium' }) => {
    const sizes = {
      small: theme.spacing.sm,
      medium: theme.spacing.md,
      large: theme.spacing.lg
    };
    return sizes[size];
  }};
  width: \${({ fullWidth }) => fullWidth ? '100%' : 'auto'};

  @media (max-width: \${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
\`;
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
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
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
              Инструменты и библиотеки для изоляции стилей CSS
            </h1>

            <p class="font-weight-regular mb-6">
              Современная экосистема предлагает множество инструментов для решения проблемы изоляции CSS стилей.
              От простых PostCSS плагинов до мощных CSS-in-JS решений — каждый инструмент имеет свои преимущества
              и области применения. Рассмотрим основные категории и популярные решения.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Категории инструментов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Категория</th>
                <th class="text-left font-weight-bold">Принцип</th>
                <th class="text-left font-weight-bold">Популярные инструменты</th>
                <th class="text-left font-weight-bold">Время выполнения</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Modules</b></td>
                <td class="pt-2 pb-2">Трансформация имен классов</td>
                <td class="pt-2 pb-2">css-loader, PostCSS Modules</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>CSS-in-JS</b></td>
                <td class="pt-2 pb-2">Генерация стилей в JavaScript</td>
                <td class="pt-2 pb-2">Styled Components, Emotion, JSS</td>
                <td class="pt-2 pb-2">Runtime</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Zero-runtime CSS-in-JS</b></td>
                <td class="pt-2 pb-2">Компиляция в статический CSS</td>
                <td class="pt-2 pb-2">Linaria, Vanilla Extract</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Utility-first</b></td>
                <td class="pt-2 pb-2">Атомарные классы</td>
                <td class="pt-2 pb-2">Tailwind CSS, UnoCSS</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>PostCSS плагины</b></td>
                <td class="pt-2 pb-2">Трансформация CSS</td>
                <td class="pt-2 pb-2">PostCSS Modules, Nested</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Framework-specific</b></td>
                <td class="pt-2 pb-2">Встроенная изоляция</td>
                <td class="pt-2 pb-2">Vue scoped, Angular, Svelte</td>
                <td class="pt-2 pb-2">Build-time</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">1. CSS Modules</h2>
            <p class="font-weight-regular mb-4">
              Автоматическая генерация уникальных имен классов с поддержкой различных сборщиков:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Styled Components</h2>
            <p class="font-weight-regular mb-4">
              Самая популярная CSS-in-JS библиотека с полным набором функций:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Emotion</h2>
            <p class="font-weight-regular mb-4">
              Быстрая и гибкая альтернатива Styled Components:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. JSS</h2>
            <p class="font-weight-regular mb-4">
              Мощная библиотека для генерации CSS из JavaScript объектов:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. PostCSS плагины</h2>
            <p class="font-weight-regular mb-4">
              Набор плагинов для трансформации CSS на этапе сборки:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">6. Linaria - Zero-runtime CSS-in-JS</h2>
            <p class="font-weight-regular mb-4">
              CSS-in-JS без влияния на runtime производительность:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">7. Stitches</h2>
            <p class="font-weight-regular mb-4">
              Современная CSS-in-JS библиотека с фокусом на производительности:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">8. Vanilla Extract</h2>
            <p class="font-weight-regular mb-4">
              Type-safe CSS-in-TypeScript с нулевым runtime:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">9. Build инструменты</h2>
            <p class="font-weight-regular mb-4">
              Интеграция CSS изоляции с современными сборщиками:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet9"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">10. TypeScript интеграция</h2>
            <p class="font-weight-regular mb-4">
              Настройка типизации для CSS-in-JS и CSS Modules:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet10"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение инструментов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Инструмент</th>
                <th class="text-left font-weight-bold">Bundle Size</th>
                <th class="text-left font-weight-bold">Performance</th>
                <th class="text-left font-weight-bold">DX</th>
                <th class="text-left font-weight-bold">TypeScript</th>
                <th class="text-left font-weight-bold">SSR</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>CSS Modules</b></td>
                <td class="pt-2 pb-2">0kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">12.8kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Emotion</b></td>
                <td class="pt-2 pb-2">7.9kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Linaria</b></td>
                <td class="pt-2 pb-2">0kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vanilla Extract</b></td>
                <td class="pt-2 pb-2">0kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Stitches</b></td>
                <td class="pt-2 pb-2">5.7kb</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐⭐</td>
                <td class="pt-2 pb-2">⭐⭐⭐⭐</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Критерии выбора</h2>
            <v-row class="mb-6">
              <v-col md="6">
                <v-card class="pa-4 h-100">
                  <v-card-title class="text-h6 pb-2">Build-time решения</v-card-title>
                  <v-card-text>
                    <p class="mb-2"><strong>Плюсы:</strong></p>
                    <ul class="mb-3">
                      <li>Нулевое влияние на runtime</li>
                      <li>Меньший размер bundle</li>
                      <li>Лучшая производительность</li>
                      <li>Совместимость с любыми фреймворками</li>
                    </ul>
                    <p class="mb-2"><strong>Минусы:</strong></p>
                    <ul>
                      <li>Сложность настройки</li>
                      <li>Ограниченная динамика</li>
                      <li>Зависимость от сборщика</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col md="6">
                <v-card class="pa-4 h-100">
                  <v-card-title class="text-h6 pb-2">Runtime решения</v-card-title>
                  <v-card-text>
                    <p class="mb-2"><strong>Плюсы:</strong></p>
                    <ul class="mb-3">
                      <li>Простота использования</li>
                      <li>Полная динамика стилей</li>
                      <li>Богатый API</li>
                      <li>Быстрый старт</li>
                    </ul>
                    <p class="mb-2"><strong>Минусы:</strong></p>
                    <ul>
                      <li>Влияние на производительность</li>
                      <li>Увеличение размера bundle</li>
                      <li>Сложность SSR</li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации по выбору</h2>
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
            >
              <template v-slot:title>
                Для новых проектов
              </template>
              <ul class="mt-2">
                <li><strong>Vanilla Extract</strong> - максимальная type-safety и производительность</li>
                <li><strong>Stitches</strong> - баланс между DX и производительностью</li>
                <li><strong>CSS Modules</strong> - простота и надежность</li>
              </ul>
            </v-alert>

            <v-alert
              type="success"
              variant="tonal"
              class="mb-4"
            >
              <template v-slot:title>
                Для существующих проектов
              </template>
              <ul class="mt-2">
                <li><strong>Emotion</strong> - миграция с Styled Components</li>
                <li><strong>PostCSS Modules</strong> - добавление к существующей PostCSS конфигурации</li>
                <li><strong>Linaria</strong> - переход с runtime CSS-in-JS</li>
              </ul>
            </v-alert>

            <v-alert
              type="warning"
              variant="tonal"
              class="mb-6"
            >
              <template v-slot:title>
                Enterprise проекты
              </template>
              <ul class="mt-2">
                <li><strong>CSS Modules</strong> - проверенное временем решение</li>
                <li><strong>Styled Components</strong> - большая экосистема и сообщество</li>
                <li><strong>Vanilla Extract</strong> - для TypeScript-first команд</li>
              </ul>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-4">
              Выбор инструмента для изоляции стилей зависит от требований проекта, команды и архитектуры приложения.
              Build-time решения предпочтительны для производительности, runtime решения - для гибкости разработки.
              Современные zero-runtime CSS-in-JS библиотеки объединяют преимущества обоих подходов.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.custom-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre;
}

.custom-code code {
  background: none !important;
  color: inherit !important;
  font-size: inherit !important;
  padding: 0 !important;
}

:deep(.token.comment) {
  color: #6272a4;
}

:deep(.token.string) {
  color: #f1fa8c;
}

:deep(.token.keyword) {
  color: #ff79c6;
}

:deep(.token.function) {
  color: #50fa7b;
}

:deep(.token.number) {
  color: #bd93f9;
}

:deep(.token.operator) {
  color: #ff79c6;
}

:deep(.token.punctuation) {
  color: #f8f8f2;
}

:deep(.token.property) {
  color: #66d9ef;
}

:deep(.token.tag) {
  color: #ff79c6;
}

:deep(.token.attr-name) {
  color: #50fa7b;
}

:deep(.token.attr-value) {
  color: #f1fa8c;
}
</style>
