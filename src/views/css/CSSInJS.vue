<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// Styled Components - React
import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: \${props => props.primary ? '#0056b3' : '#545b62'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
\`;

// Использование
<Button primary onClick={handleClick}>
  Основная кнопка
</Button>
`

const snippet2 = `
// Emotion - объектный синтаксис
import { css } from '@emotion/react';

const buttonStyles = (theme, variant) => css({
  background: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
  color: 'white',
  padding: '12px 24px',
  border: 'none',
  borderRadius: theme.borderRadius,
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  '&:hover': {
    background: variant === 'primary' ? theme.colors.primaryDark : theme.colors.secondaryDark,
    transform: 'translateY(-1px)',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  }
});

// Использование
<button css={buttonStyles(theme, 'primary')}>
  Кнопка
</button>
`

const snippet3 = `
// JSS - JavaScript объекты
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    background: ({ variant, theme }) =>
      variant === 'primary' ? theme.primary : theme.secondary,
    color: 'white',
    padding: [12, 24],
    border: 'none',
    borderRadius: 4,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    '&:hover': {
      background: ({ variant, theme }) =>
        variant === 'primary' ? theme.primaryDark : theme.secondaryDark,
      transform: 'translateY(-1px)',
    }
  }
});

function Button({ variant, children, ...props }) {
  const classes = useStyles({ variant, theme });
  return <button className={classes.button} {...props}>{children}</button>;
}
`

const snippet4 = `
// Stitches - утилитарный подход
import { styled } from '@stitches/react';

const Button = styled('button', {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

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
      }
    },
    size: {
      small: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '16px 32px', fontSize: '18px' }
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium'
  }
});

// Использование
<Button variant="primary" size="large">Кнопка</Button>
`

const snippet5 = `
// Динамическая тематизация
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  light: {
    bg: '#ffffff',
    text: '#000000',
    primary: '#007bff'
  },
  dark: {
    bg: '#1a1a1a',
    text: '#ffffff',
    primary: '#4dabf7'
  }
};

const Container = styled.div\`
  background: \${props => props.theme.bg};
  color: \${props => props.theme.text};
  min-height: 100vh;
  transition: all 0.3s ease;
\`;

const Button = styled.button\`
  background: \${props => props.theme.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
\`;

// Использование
<ThemeProvider theme={darkMode ? theme.dark : theme.light}>
  <Container>
    <Button>Тематическая кнопка</Button>
  </Container>
</ThemeProvider>
`

const snippet6 = `
// Server-Side Rendering с Styled Components
import { ServerStyleSheet } from 'styled-components';

// На сервере
const sheet = new ServerStyleSheet();
try {
  const html = renderToString(
    sheet.collectStyles(<App />)
  );
  const styleTags = sheet.getStyleTags();

  // Вставляем стили в HTML
  const fullHtml = \`
    <!DOCTYPE html>
    <html>
      <head>
        \${styleTags}
      </head>
      <body>
        <div id="root">\${html}</div>
      </body>
    </html>
  \`;
} finally {
  sheet.seal();
}
`

const snippet7 = `
// Производительность - мемоизация стилей
import { useMemo } from 'react';
import { css } from '@emotion/react';

const ExpensiveComponent = ({ data, theme }) => {
  // Мемоизируем стили, чтобы избежать пересчета
  const styles = useMemo(() => ({
    container: css({
      background: theme.background,
      padding: '20px',
      borderRadius: '8px',
      // Сложные вычисления стилей
      boxShadow: \`0 \${theme.elevation * 2}px \${theme.elevation * 4}px rgba(0,0,0,0.1)\`
    }),

    item: css({
      padding: '10px',
      margin: '5px 0',
      background: theme.surface,
      // Условные стили
      ...(data.isActive && {
        borderLeft: \`4px solid \${theme.primary}\`,
        background: theme.primaryLight
      })
    })
  }), [theme, data.isActive]);

  return (
    <div css={styles.container}>
      {data.items.map(item => (
        <div key={item.id} css={styles.item}>
          {item.content}
        </div>
      ))}
    </div>
  );
};
`

const snippet8 = `
// Миграция с обычного CSS на CSS-in-JS
// Было:
/* styles.css */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card-header {
  margin-bottom: 15px;
  font-weight: bold;
}

.card-primary {
  border-color: #007bff;
}

// Стало:
import styled from 'styled-components';

const Card = styled.div\`
  padding: 20px;
  border: 1px solid \${props => props.variant === 'primary' ? '#007bff' : '#ddd'};
  border-radius: 8px;
\`;

const CardHeader = styled.div\`
  margin-bottom: 15px;
  font-weight: bold;
\`;

// Или с Emotion
const cardStyles = (variant) => css\`
  padding: 20px;
  border: 1px solid \${variant === 'primary' ? '#007bff' : '#ddd'};
  border-radius: 8px;
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

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.javascript, 'javascript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.javascript, 'javascript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.javascript, 'javascript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
  highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
  highlightedSnippet8.value = Prism.highlight(snippet8, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Где лучше использовать подход CSS-in-JS. Плюсы и минусы CSS-in-JS
            </h1>

            <p class="font-weight-regular mb-6">
              <b>CSS-in-JS</b> — это подход к написанию стилей, при котором CSS описывается
              непосредственно в JavaScript коде. Стили создаются динамически во время выполнения
              или компилируются в статические CSS файлы.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основные библиотеки CSS-in-JS</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Библиотека</th>
                <th class="text-left font-weight-bold">Подход</th>
                <th class="text-left font-weight-bold">Размер</th>
                <th class="text-left font-weight-bold">Особенности</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Styled Components</b></td>
                <td class="pt-2 pb-2">Template literals</td>
                <td class="pt-2 pb-2">~40kb</td>
                <td class="pt-2 pb-2">Популярная, большое сообщество</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Emotion</b></td>
                <td class="pt-2 pb-2">Объекты + strings</td>
                <td class="pt-2 pb-2">~20kb</td>
                <td class="pt-2 pb-2">Быстрая, гибкая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>JSS</b></td>
                <td class="pt-2 pb-2">JavaScript объекты</td>
                <td class="pt-2 pb-2">~25kb</td>
                <td class="pt-2 pb-2">Плагинная архитектура</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Stitches</b></td>
                <td class="pt-2 pb-2">Утилитарный</td>
                <td class="pt-2 pb-2">~10kb</td>
                <td class="pt-2 pb-2">Zero-runtime опция</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Vanilla Extract</b></td>
                <td class="pt-2 pb-2">Build-time</td>
                <td class="pt-2 pb-2">0kb runtime</td>
                <td class="pt-2 pb-2">TypeScript-first</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Примеры использования</h2>

            <h3 class="text-h6 font-weight-bold mb-3">Styled Components</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Emotion</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">JSS</h3>
            <pre class="mb-6 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">Stitches</h3>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Где лучше использовать CSS-in-JS</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-success">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">✅ Идеально подходит</h3>
                  <ul class="pl-4">
                    <li><b>React приложения</b> с компонентной архитектурой</li>
                    <li><b>Дизайн-системы</b> с множеством вариантов компонентов</li>
                    <li><b>Приложения с темами</b> (светлая/темная тема)</li>
                    <li><b>Библиотеки компонентов</b> для переиспользования</li>
                    <li><b>Динамические стили</b> на основе пропсов/состояния</li>
                    <li><b>A/B тестирование</b> и персонализация</li>
                    <li><b>Микрофронтенды</b> для изоляции стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-error">
                  <h3 class="text-h6 font-weight-bold mb-2 text-error">❌ Не рекомендуется</h3>
                  <ul class="pl-4">
                    <li><b>Статические сайты</b> без интерактивности</li>
                    <li><b>Email шаблоны</b> (ограниченная поддержка)</li>
                    <li><b>Критичная производительность</b> на слабых устройствах</li>
                    <li><b>SEO-критичные страницы</b> без SSR</li>
                    <li><b>Небольшие проекты</b> с простой стилизацией</li>
                    <li><b>Команды без опыта React/JS</b></li>
                    <li><b>Проекты с жесткими CSP</b> (Content Security Policy)</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Плюсы CSS-in-JS</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎯 Локальность</h3>
                  <ul class="pl-4">
                    <li>Автоматическая изоляция стилей</li>
                    <li>Нет конфликтов имен классов</li>
                    <li>Dead code elimination</li>
                    <li>Удаление неиспользуемых стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Динамичность</h3>
                  <ul class="pl-4">
                    <li>Стили на основе пропсов</li>
                    <li>Динамическая тематизация</li>
                    <li>Условные стили</li>
                    <li>Вычисляемые значения</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔧 DX (Developer Experience)</h3>
                  <ul class="pl-4">
                    <li>TypeScript поддержка</li>
                    <li>Автокомплит и валидация</li>
                    <li>Отладка в DevTools</li>
                    <li>Единый язык для логики и стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎨 Тематизация</h3>
                  <ul class="pl-4">
                    <li>Централизованные темы</li>
                    <li>Легкое переключение</li>
                    <li>Контекстные значения</li>
                    <li>Runtime обновления</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📦 Компонентность</h3>
                  <ul class="pl-4">
                    <li>Стили как часть компонента</li>
                    <li>Переиспользование</li>
                    <li>Инкапсуляция</li>
                    <li>Композиция стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 SSR</h3>
                  <ul class="pl-4">
                    <li>Критические стили inline</li>
                    <li>Нет FOUC</li>
                    <li>Гидратация стилей</li>
                    <li>Оптимизация загрузки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Минусы CSS-in-JS</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🐌 Производительность</h3>
                  <ul class="pl-4">
                    <li>Runtime overhead</li>
                    <li>Дополнительные вычисления</li>
                    <li>Увеличение размера бандла</li>
                    <li>Возможные re-renders</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">📈 Сложность</h3>
                  <ul class="pl-4">
                    <li>Кривая обучения</li>
                    <li>Дополнительные абстракции</li>
                    <li>Отладка сложнее</li>
                    <li>Vendor lock-in</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔒 Ограничения</h3>
                  <ul class="pl-4">
                    <li>Привязка к JavaScript</li>
                    <li>CSP ограничения</li>
                    <li>Нет кэширования браузером</li>
                    <li>Хуже для статических стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🎨 CSS ограничения</h3>
                  <ul class="pl-4">
                    <li>Не все CSS фичи поддерживаются</li>
                    <li>Ограниченные селекторы</li>
                    <li>Сложности с media queries</li>
                    <li>Нет препроцессоров "из коробки"</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">👥 Командные</h3>
                  <ul class="pl-4">
                    <li>Барьер для CSS-разработчиков</li>
                    <li>Сложность для дизайнеров</li>
                    <li>Разделение ответственности</li>
                    <li>Миграция существующих стилей</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🔧 Инструменты</h3>
                  <ul class="pl-4">
                    <li>Ограниченная поддержка IDE</li>
                    <li>Сложности с линтингом</li>
                    <li>Отсутствие стандартизации</li>
                    <li>Фрагментация экосистемы</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Динамическая тематизация</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Server-Side Rendering</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet7"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Миграция на CSS-in-JS</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet8"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное преимущество CSS-in-JS перед обычным CSS?</p>
                <p class="font-weight-regular ma-0">
                  Динамичность и изоляция. Стили могут изменяться на основе состояния компонента,
                  автоматически изолируются и удаляются вместе с компонентом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие проблемы с производительностью есть у CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Runtime вычисления стилей, увеличение размера JS бандла, возможные re-renders при изменении стилей.
                  Решается мемоизацией, статической экстракцией и оптимизацией.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Чем отличается Styled Components от Emotion?</p>
                <p class="font-weight-regular ma-0">
                  Styled Components использует template literals, Emotion поддерживает объектный синтаксис.
                  Emotion легче и быстрее, Styled Components популярнее и имеет больше фич.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает SSR с CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Стили собираются на сервере, вставляются в HTML как критические,
                  затем гидратируются на клиенте. Предотвращает FOUC и улучшает производительность.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда не стоит использовать CSS-in-JS?</p>
                <p class="font-weight-regular ma-0">
                  Для статических сайтов, при критичной производительности на слабых устройствах,
                  в командах без опыта JavaScript, для простых проектов без динамических стилей.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое "CSS-in-JS runtime" и "zero-runtime" подходы?</p>
                <p class="font-weight-regular ma-0">
                  Runtime генерирует стили во время выполнения. Zero-runtime (Vanilla Extract, Linaria)
                  извлекает стили на этапе сборки, оставляя только статический CSS.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">CSS-in-JS</th>
                <th class="text-left font-weight-bold">CSS Modules</th>
                <th class="text-left font-weight-bold">Обычный CSS</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Изоляция</b></td>
                <td class="pt-2 pb-2 text-success">Автоматическая</td>
                <td class="pt-2 pb-2 text-success">Автоматическая</td>
                <td class="pt-2 pb-2 text-error">Ручная</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Динамичность</b></td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-warning">Ограниченная</td>
                <td class="pt-2 pb-2 text-error">Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Производительность</b></td>
                <td class="pt-2 pb-2 text-warning">Runtime overhead</td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-success">Лучшая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Размер бандла</b></td>
                <td class="pt-2 pb-2 text-error">Больше</td>
                <td class="pt-2 pb-2 text-warning">Средний</td>
                <td class="pt-2 pb-2 text-success">Меньше</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Кэширование</b></td>
                <td class="pt-2 pb-2 text-error">Нет</td>
                <td class="pt-2 pb-2 text-success">Да</td>
                <td class="pt-2 pb-2 text-success">Да</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>TypeScript</b></td>
                <td class="pt-2 pb-2 text-success">Отличная</td>
                <td class="pt-2 pb-2 text-warning">Ограниченная</td>
                <td class="pt-2 pb-2 text-error">Нет</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Удобство разработки</b></td>
                <td class="pt-2 pb-2 text-success">Высокое</td>
                <td class="pt-2 pb-2 text-success">Хорошее</td>
                <td class="pt-2 pb-2 text-warning">Среднее</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации по выбору</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-success">
                  <h3 class="text-h6 font-weight-bold mb-2 text-success">✅ Выбирайте CSS-in-JS, если:</h3>
                  <ul class="pl-4">
                    <li>Разрабатываете React/Vue приложение</li>
                    <li>Нужны динамические стили</li>
                    <li>Команда владеет JavaScript</li>
                    <li>Создаете дизайн-систему</li>
                    <li>Требуется строгая типизация стилей</li>
                    <li>Используете серверный рендеринг</li>
                    <li>Нужна изоляция компонентов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 border-warning">
                  <h3 class="text-h6 font-weight-bold mb-2 text-warning">🤔 Альтернативы стоит рассмотреть, если:</h3>
                  <ul class="pl-4">
                    <li>Критична производительность</li>
                    <li>Работаете со статическими стилями</li>
                    <li>Команда предпочитает обычный CSS</li>
                    <li>Проект небольшой и простой</li>
                    <li>Нужна совместимость со старыми браузерами</li>
                    <li>Есть ограничения CSP</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Современные решения и тренды</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Zero-Runtime</h3>
                  <p class="mb-2"><b>Vanilla Extract</b> - статическая экстракция</p>
                  <p class="mb-2"><b>Linaria</b> - CSS из JS на build-time</p>
                  <p class="ma-0"><b>Compiled</b> - компиляция styled-components</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Hybrid подходы</h3>
                  <p class="mb-2"><b>Stitches</b> - утилитарный CSS-in-JS</p>
                  <p class="mb-2"><b>Twin.macro</b> - Tailwind в CSS-in-JS</p>
                  <p class="ma-0"><b>Goober</b> - легкая альтернатива</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Новые стандарты</h3>
                  <p class="mb-2"><b>CSS Houdini</b> - кастомные свойства</p>
                  <p class="mb-2"><b>Container Queries</b> - адаптивность</p>
                  <p class="ma-0"><b>CSS Layers</b> - управление каскадом</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Оптимизация производительности CSS-in-JS</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">🚀 Техники оптимизации</h3>
                  <ul class="pl-4">
                    <li><b>Мемоизация стилей</b> - useMemo, React.memo</li>
                    <li><b>Статическая экстракция</b> - babel плагины</li>
                    <li><b>Code splitting</b> - динамические импорты</li>
                    <li><b>CSS переменные</b> - вместо пересчета стилей</li>
                    <li><b>Server-side рендеринг</b> - критические стили</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">⚡ Измерение производительности</h3>
                  <ul class="pl-4">
                    <li><b>Bundle analyzer</b> - размер CSS-in-JS</li>
                    <li><b>React DevTools</b> - профилирование</li>
                    <li><b>Lighthouse</b> - время загрузки стилей</li>
                    <li><b>Chrome DevTools</b> - paint/layout метрики</li>
                    <li><b>Web Vitals</b> - CLS от динамических стилей</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Практические советы для команд</h2>
            <v-alert type="info" class="mb-6">
              <p class="mb-2"><strong>Для новых проектов:</strong></p>
              <p class="ma-0">
                Начните с CSS Modules или Tailwind. Переходите на CSS-in-JS только при необходимости
                динамических стилей или сложной тематизации.
              </p>
            </v-alert>

            <v-alert type="warning" class="mb-6">
              <p class="mb-2"><strong>Для миграции:</strong></p>
              <p class="ma-0">
                Мигрируйте постепенно, компонент за компонентом. Используйте инструменты автоматизации
                и не забывайте о тестировании визуальной регрессии.
              </p>
            </v-alert>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <p class="font-weight-regular mb-6">
              CSS-in-JS — мощный инструмент для современной веб-разработки, особенно в экосистеме React.
              Он отлично решает задачи изоляции стилей, динамической тематизации и создания переиспользуемых
              компонентов. Однако важно взвешивать преимущества против накладных расходов на производительность
              и сложность. Для статических сайтов и простых проектов традиционные подходы могут быть предпочтительнее.
            </p>

            <div class="d-flex justify-space-between flex-wrap">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://styled-components.com/"
                target="_blank"
                class="mb-2">
                Styled Components
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://emotion.sh/"
                target="_blank"
                class="mb-2">
                Emotion Docs
              </v-btn>
              <v-btn
                color="success"
                size="small"
                variant="elevated"
                href="https://vanilla-extract.style/"
                target="_blank"
                class="mb-2">
                Vanilla Extract
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
