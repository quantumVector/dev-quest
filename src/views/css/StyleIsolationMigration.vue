<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Типичная структура legacy проекта */
/* global.css */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.header .title {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* components.css */
.navigation .button {
  background: #007bff;
}

.sidebar .card {
  margin-bottom: 15px;
}

.content-area .title {
  color: #333;
}
`

const snippet2 = `
/* Этап 1: Анализ существующих стилей */

// Скрипт для анализа CSS
const analyzeCSS = () => {
  const stylesheets = Array.from(document.styleSheets);
  const usedSelectors = new Set();
  const conflicts = [];

  // Анализ всех правил
  stylesheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach(rule => {
        if (rule.selectorText) {
          const selector = rule.selectorText;

          // Поиск конфликтов
          if (usedSelectors.has(selector)) {
            conflicts.push(selector);
          }
          usedSelectors.add(selector);
        }
      });
    } catch (e) {
      console.warn('Cannot access stylesheet:', sheet.href);
    }
  });

  return {
    totalSelectors: usedSelectors.size,
    conflicts: conflicts,
    specificity: calculateSpecificity(usedSelectors)
  };
};

// Анализ специфичности
const calculateSpecificity = (selectors) => {
  const specificityMap = new Map();

  selectors.forEach(selector => {
    const specificity = getSpecificity(selector);
    const key = specificity.join(',');
    specificityMap.set(key, (specificityMap.get(key) || 0) + 1);
  });

  return specificityMap;
};
`

const snippet3 = `
/* Этап 2: Создание изолированного компонента */

// Новый компонент с CSS Modules
/* Button.module.css */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: var(--button-bg, #6c757d);
  color: var(--button-color, white);
  font-size: var(--button-font-size, 1rem);
}

.primary {
  --button-bg: #007bff;
}

.secondary {
  --button-bg: #6c757d;
}

.success {
  --button-bg: #28a745;
}

.danger {
  --button-bg: #dc3545;
}

// Button.jsx
import styles from './Button.module.css';
import clsx from 'clsx';

function Button({
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        className // Поддержка внешних классов для постепенной миграции
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
`

const snippet4 = `
/* Этап 3: Стратегия сосуществования */

// Конфигурация для постепенной миграции
/* webpack.config.js */
module.exports = {
  module: {
    rules: [
      // Глобальные стили как есть
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // CSS Modules для новых компонентов
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  }
};

// Мост между системами
/* bridge.css */
:root {
  /* CSS Custom Properties для общих значений */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;

  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --transition: all 0.2s ease;
}

/* Глобальные стили переводим на переменные */
.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
}
`

const snippet5 = `
/* Этап 4: Миграция существующих компонентов */

// Пример миграции Card компонента
/* БЫЛО: глобальные стили */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.card-title {
  font-size: 1.25rem;
  margin: 0;
  color: #333;
}

// СТАЛО: изолированный компонент
/* Card.module.css */
.card {
  padding: 20px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: var(--border-radius, 8px);
  background: var(--card-bg, white);
  box-shadow: var(--box-shadow, 0 2px 4px rgba(0,0,0,0.1));
}

.header {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-light, #eee);
}

.title {
  font-size: 1.25rem;
  margin: 0;
  color: var(--text-color, #333);
}

// Card.jsx
import styles from './Card.module.css';

function Card({ title, children, className }) {
  return (
    <div className={clsx(styles.card, className)}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
`

const snippet6 = `
/* Этап 5: Работа с конфликтами */

// Решение конфликтов имен
/* ConflictResolver.js */
class ConflictResolver {
  constructor() {
    this.globalStyles = new Map();
    this.moduleStyles = new Map();
    this.conflicts = [];
  }

  // Регистрация глобальных стилей
  registerGlobalStyle(selector, rules) {
    if (this.globalStyles.has(selector)) {
      this.conflicts.push({
        type: 'global-duplicate',
        selector,
        existing: this.globalStyles.get(selector),
        new: rules
      });
    }
    this.globalStyles.set(selector, rules);
  }

  // Создание безопасного модульного стиля
  createSafeModuleStyle(componentName, styles) {
    const safeStyles = {};

    Object.keys(styles).forEach(className => {
      const globalSelector = \`.\${className}\`;

      if (this.globalStyles.has(globalSelector)) {
        // Конфликт обнаружен
        const newClassName = \`\${componentName}_\${className}\`;
        safeStyles[newClassName] = styles[className];

        console.warn(\`Conflict resolved: \${className} -> \${newClassName}\`);
      } else {
        safeStyles[className] = styles[className];
      }
    });

    return safeStyles;
  }

  // Генерация отчета о конфликтах
  generateConflictReport() {
    return {
      totalConflicts: this.conflicts.length,
      conflicts: this.conflicts,
      recommendations: this.generateRecommendations()
    };
  }
}

// Использование
const resolver = new ConflictResolver();
const safeStyles = resolver.createSafeModuleStyle('Button', buttonStyles);
`

const snippet7 = `
/* Этап 6: Vue.js миграция с Scoped Styles */

<!-- БЫЛО: глобальные стили -->
<template>
  <div class="user-card">
    <div class="user-card-header">
      <img class="avatar" :src="user.avatar" :alt="user.name">
      <h3 class="user-name">{{ user.name }}</h3>
    </div>
    <div class="user-card-content">
      <p class="user-bio">{{ user.bio }}</p>
      <button class="follow-button">Follow</button>
    </div>
  </div>
</template>

<style>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.user-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>

<!-- СТАЛО: изолированные стили -->
<template>
  <div class="card">
    <div class="header">
      <img class="avatar" :src="user.avatar" :alt="user.name">
      <h3 class="name">{{ user.name }}</h3>
    </div>
    <div class="content">
      <p class="bio">{{ user.bio }}</p>
      <button class="follow-btn" :class="{ active: isFollowing }">
        {{ isFollowing ? 'Following' : 'Follow' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color, #ddd);
  border-radius: var(--border-radius, 8px);
  padding: var(--card-padding, 20px);
  background: var(--card-bg, white);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.name {
  margin: 0;
  color: var(--text-color, #333);
}

.bio {
  color: var(--text-secondary, #666);
  margin-bottom: 15px;
}

.follow-btn {
  padding: 8px 16px;
  border: none;
  border-radius: var(--border-radius, 4px);
  background: var(--primary-color, #007bff);
  color: white;
  cursor: pointer;
  transition: var(--transition, all 0.2s ease);
}

.follow-btn:hover {
  background: var(--primary-hover, #0056b3);
}

.follow-btn.active {
  background: var(--success-color, #28a745);
}
</style>
`

const snippet8 = `
/* Этап 7: Постепенная замена глобальных стилей */

// Инструмент для отслеживания использования стилей
/* UsageTracker.js */
class StyleUsageTracker {
  constructor() {
    this.usedSelectors = new Set();
    this.unusedSelectors = new Set();
    this.observer = null;
  }

  // Запуск отслеживания
  startTracking() {
    // Отслеживание изменений DOM
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          this.scanForStyles(mutation.addedNodes);
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Начальное сканирование
    this.scanForStyles([document.body]);
  }

  // Сканирование элементов на предмет используемых стилей
  scanForStyles(nodes) {
    nodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const classes = node.classList;
        classes.forEach(className => {
          this.usedSelectors.add(className);
        });

        // Рекурсивное сканирование
        this.scanForStyles(node.children);
      }
    });
  }

  // Генерация отчета о неиспользуемых стилях
  generateUnusedStylesReport() {
    const allSelectors = this.getAllCSSSelectors();
    const unused = [];

    allSelectors.forEach(selector => {
      const cleanSelector = selector.replace(/[.#:]/g, '');
      if (!this.usedSelectors.has(cleanSelector)) {
        unused.push(selector);
      }
    });

    return {
      totalSelectors: allSelectors.length,
      usedSelectors: this.usedSelectors.size,
      unusedSelectors: unused.length,
      unusedList: unused
    };
  }

  // Получение всех CSS селекторов
  getAllCSSSelectors() {
    const selectors = [];
    const stylesheets = Array.from(document.styleSheets);

    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.selectorText) {
            selectors.push(rule.selectorText);
          }
        });
      } catch (e) {
        console.warn('Cannot access stylesheet:', sheet.href);
      }
    });

    return selectors;
  }
}

// Использование
const tracker = new StyleUsageTracker();
tracker.startTracking();

// Через некоторое время
setTimeout(() => {
  const report = tracker.generateUnusedStylesReport();
  console.log('Unused styles report:', report);
}, 5000);
`

const snippet9 = `
/* Этап 8: Автоматизация миграции */

// Скрипт для автоматической миграции
/* migrate-to-modules.js */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

class CSSMigrator {
  constructor(options = {}) {
    this.options = {
      srcDir: options.srcDir || './src',
      outputDir: options.outputDir || './src/components',
      prefix: options.prefix || 'migrated',
      ...options
    };
  }

  // Анализ CSS файла
  async analyzeCSS(filePath) {
    const css = fs.readFileSync(filePath, 'utf8');
    const root = postcss.parse(css);

    const rules = [];

    root.walkRules(rule => {
      rules.push({
        selector: rule.selector,
        declarations: rule.toString(),
        source: rule.source
      });
    });

    return rules;
  }

  // Создание CSS Module
  createCSSModule(rules, componentName) {
    const moduleCSS = rules.map(rule => {
      // Преобразование селекторов в классы
      const selector = this.transformSelector(rule.selector);
      return \`\${selector} {\${rule.declarations.split('{')[1]\`;
    }).join('\n\n');

    return \`/* Generated CSS Module for \${componentName} */\n\${moduleCSS}\`;
  }

  // Преобразование селекторов
  transformSelector(selector) {
    // Упрощение селекторов для модулей
    return selector
      .replace(/^\./, '.') // Сохранить ведущую точку
      .replace(/\s+/g, '_') // Пробелы в подчеркивания
      .replace(/[^a-zA-Z0-9_.-]/g, '') // Убрать спецсимволы
      .toLowerCase();
  }

  // Генерация React компонента
  generateReactComponent(componentName, moduleCSS) {
    return \`import React from 'react';
import styles from './${componentName}.module.css';

function ${componentName}({ children, className, ...props }) {
  return (
    <div className={\`\${styles.container} \${className || ''}\`} {...props}>
      {children}
    </div>
  );
}

export default ${componentName};
\`;
  }

  // Выполнение миграции
  async migrate() {
    const cssFiles = this.findCSSFiles(this.options.srcDir);

    for (const file of cssFiles) {
      const rules = await this.analyzeCSS(file);
      const componentName = path.basename(file, '.css');

      const moduleCSS = this.createCSSModule(rules, componentName);
      const reactComponent = this.generateReactComponent(componentName, moduleCSS);

      // Сохранение файлов
      const outputPath = path.join(this.options.outputDir, componentName);
      fs.mkdirSync(outputPath, { recursive: true });

      fs.writeFileSync(
        path.join(outputPath, \`\${componentName}.module.css\`),
        moduleCSS
      );

      fs.writeFileSync(
        path.join(outputPath, \`\${componentName}.jsx\`),
        reactComponent
      );

      console.log(\`Migrated \${file} -> \${outputPath}\`);
    }
  }

  // Поиск CSS файлов
  findCSSFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.findCSSFiles(fullPath));
      } else if (item.endsWith('.css') && !item.endsWith('.module.css')) {
        files.push(fullPath);
      }
    });

    return files;
  }
}

// Использование
const migrator = new CSSMigrator({
  srcDir: './src',
  outputDir: './src/components'
});

migrator.migrate().then(() => {
  console.log('Migration completed!');
});
`

const snippet10 = `
/* Этап 9: Финальная очистка и оптимизация */

// Удаление неиспользуемых глобальных стилей
/* cleanup.js */
const PurgeCSS = require('purgecss').default;

const purgeCSSConfig = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.vue',
    './public/index.html'
  ],
  css: ['./src/styles/global.css'],
  defaultExtractor: content => {
    // Извлечение классов из содержимого
    const classes = content.match(/[A-Za-z0-9-_:/]+/g) || [];
    return classes;
  },
  safelist: [
    // Классы, которые нужно сохранить
    'btn',
    'card',
    'container',
    /^tooltip-/,
    /^modal-/
  ]
};

// Выполнение очистки
const purgeCSS = new PurgeCSS();
purgeCSS.purge(purgeCSSConfig).then(results => {
  results.forEach(result => {
    console.log('Purged CSS:', result.file);
    console.log('Remaining CSS size:', result.css.length);
  });
});

// Конфигурация для build процесса
/* webpack.config.js - финальная конфигурация */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  module: {
    rules: [
      // Только CSS Modules
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]'
              }
            }
          },
          'postcss-loader'
        ]
      },
      // Оставшиеся глобальные стили (минимум)
      {
        test: /^(?!.*\.module\.css$).*\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true
            }
          ]
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};

// Метрики успешной миграции
const migrationMetrics = {
  before: {
    globalCSSSize: '150KB',
    numberOfConflicts: 45,
    buildTime: '12s',
    bundleSize: '2.1MB'
  },
  after: {
    globalCSSSize: '25KB',
    numberOfConflicts: 0,
    buildTime: '8s',
    bundleSize: '1.8MB'
  },
  improvement: {
    CSSReduction: '83%',
    conflictReduction: '100%',
    buildSpeedup: '33%',
    bundleReduction: '14%'
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
const highlightedSnippet8 = ref('')
const highlightedSnippet9 = ref('')
const highlightedSnippet10 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.css, 'css')
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
              Как можно применить изоляцию стилей в проекте, который уже использует глобальные стили?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Миграция с глобальных стилей на изоляцию</b> — это постепенный процесс, требующий тщательного
              планирования и поэтапного внедрения. Правильный подход позволяет избежать поломок и обеспечить
              плавный переход к современной архитектуре стилей.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">План миграции</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Этап</th>
                <th class="text-left font-weight-bold">Задачи</th>
                <th class="text-left font-weight-bold">Инструменты</th>
                <th class="text-left font-weight-bold">Риски</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Анализ</b></td>
                <td class="pt-2 pb-2">Аудит CSS, поиск конфликтов</td>
                <td class="pt-2 pb-2">CSS анализаторы, DevTools</td>
                <td class="pt-2 pb-2">Низкий</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Настройка</b></td>
                <td class="pt-2 pb-2">Конфигурация сборки</td>
                <td class="pt-2 pb-2">Webpack, Vite, PostCSS</td>
                <td class="pt-2 pb-2">Средний</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Пилот</b></td>
                <td class="pt-2 pb-2">Миграция одного компонента</td>
                <td class="pt-2 pb-2">CSS Modules, Scoped</td>
                <td class="pt-2 pb-2">Низкий</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Масштабирование</b></td>
                <td class="pt-2 pb-2">Поэтапная миграция</td>
                <td class="pt-2 pb-2">Автоматизация, скрипты</td>
                <td class="pt-2 pb-2">Высокий</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Очистка</b></td>
                <td class="pt-2 pb-2">Удаление legacy кода</td>
                <td class="pt-2 pb-2">PurgeCSS, анализаторы</td>
                <td class="pt-2 pb-2">Средний</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Этап 1: Анализ существующего кода</h2>
            <p class="font-weight-regular mb-4">
              Первый шаг — понимание текущего состояния CSS кодовой базы:
            </p>
            <pre class="mb-4 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Этап 2: Создание изолированных компонентов</h2>
            <p class="font-weight-regular mb-4">
              Начинаем с создания новых компонентов с изоляцией:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Этап 3: Стратегия сосуществования</h2>
            <p class="font-weight-regular mb-4">
              Настройка системы сборки для одновременной работы с глобальными и изолированными стилями:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Этап 4: Миграция существующих компонентов</h2>
            <p class="font-weight-regular mb-4">
              Пошаговая замена глобальных стилей на изолированные:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v
