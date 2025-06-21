<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
/* Проблемы без изоляции в компонентах */

/* Component A */
.button {
  background: #007bff;
  padding: 10px 20px;
  border-radius: 4px;
}

/* Component B - случайно переопределяет стили A */
.button {
  background: #dc3545; /* Красный вместо синего! */
  font-size: 18px;
}

/* Global styles - влияют на все компоненты */
button {
  margin: 5px; /* Неожиданные отступы во всех кнопках */
}

/* Результат: непредсказуемые стили, сложная отладка */
`

const snippet2 = `
/* Принципы компонентной архитектуры CSS */

/* 1. Инкапсуляция - стили принадлежат компоненту */
.user-card {
  /* Стили только для этого компонента */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.user-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.user-card__name {
  font-weight: 600;
  margin: 8px 0 4px 0;
}

/* 2. Композиция - компоненты составляются из других */
.user-list {
  display: grid;
  gap: 16px;
  /* .user-card вкладывается без конфликтов */
}

/* 3. Переиспользование - один компонент, разные контексты */
.user-card--compact {
  padding: 8px;
}

.user-card--horizontal {
  display: flex;
  align-items: center;
}
`

const snippet3 = `
/* Web Components - нативная изоляция */

class UserProfile extends HTMLElement {
  constructor() {
    super();

    // Создаем Shadow DOM для полной изоляции
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      <style>
        /* Стили изолированы внутри Shadow DOM */
        :host {
          display: block;
          font-family: system-ui, sans-serif;
        }

        :host([theme="dark"]) {
          --bg-color: #1a1a1a;
          --text-color: #ffffff;
        }

        :host([size="large"]) .avatar {
          width: 80px;
          height: 80px;
        }

        .profile {
          background: var(--bg-color, #ffffff);
          color: var(--text-color, #333333);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--accent-color, #007bff);
        }

        .name {
          font-size: 1.5em;
          font-weight: 600;
          margin: 12px 0 4px 0;
        }

        .role {
          color: var(--text-secondary, #666);
          font-size: 0.9em;
        }

        .actions {
          margin-top: 16px;
          display: flex;
          gap: 8px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: all 0.2s ease;
        }

        .primary {
          background: var(--accent-color, #007bff);
          color: white;
        }

        .primary:hover {
          background: var(--accent-hover, #0056b3);
        }

        .secondary {
          background: transparent;
          color: var(--accent-color, #007bff);
          border: 1px solid var(--accent-color, #007bff);
        }
      </style>

      <div class="profile">
        <img class="avatar" src="" alt="User avatar">
        <div class="name"></div>
        <div class="role"></div>
        <div class="actions">
          <button class="primary">Connect</button>
          <button class="secondary">Message</button>
        </div>
      </div>
    \`;
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['name', 'role', 'avatar', 'theme', 'size'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const avatar = this.shadowRoot.querySelector('.avatar');
    const name = this.shadowRoot.querySelector('.name');
    const role = this.shadowRoot.querySelector('.role');

    avatar.src = this.getAttribute('avatar') || '/default-avatar.png';
    name.textContent = this.getAttribute('name') || 'Anonymous User';
    role.textContent = this.getAttribute('role') || 'User';
  }
}

customElements.define('user-profile', UserProfile);

/* Использование:
<user-profile
  name="John Doe"
  role="Frontend Developer"
  avatar="/john.jpg"
  theme="dark"
  size="large">
</user-profile>
*/
`

const snippet4 = `
/* React компонент с CSS Modules */

/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.primary {
  background: #3b82f6;
  color: white;
}

.primary:hover {
  background: #2563eb;
}

.secondary {
  background: #e5e7eb;
  color: #374151;
}

.secondary:hover {
  background: #d1d5db;
}

.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.icon {
  margin-right: 0.5rem;
  width: 1em;
  height: 1em;
}
`

const snippet5 = `
// Button.jsx - React компонент
import React from 'react';
import styles from './Button.module.css';
import { Loader } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    size !== 'medium' && styles[size],
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader className={styles.icon} />
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;

/* Использование:
<Button variant="primary" size="large" icon={<Save />}>
  Save Changes
</Button>

<Button variant="secondary" loading={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
*/
`

const snippet6 = `
/* Vue компонент с Scoped Styles */
<template>
  <div class="card" :class="cardClasses">
    <header v-if="title || $slots.header" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
      </slot>
    </header>

    <div class="card-body">
      <slot></slot>
    </div>

    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
  },
  elevated: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  }
});

const cardClasses = computed(() => ({
  [\`card--\${props.variant}\`]: props.variant !== 'default',
  'card--elevated': props.elevated,
  'card--borderless': !props.bordered
}));
<\/script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.card--bordered {
  border: 1px solid #e5e7eb;
}

.card--elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card--elevated:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card--primary {
  border-color: #3b82f6;
}

.card--success {
  border-color: #10b981;
}

.card--warning {
  border-color: #f59e0b;
}

.card--danger {
  border-color: #ef4444;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* CSS переменные для кастомизации */
.card {
  --card-bg: white;
  --card-border: #e5e7eb;
  --card-radius: 8px;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  background: var(--card-bg);
  border-color: var(--card-border);
  border-radius: var(--card-radius);
}

.card--elevated {
  box-shadow: var(--card-shadow);
}
</style>
`

const snippet7 = `
/* Angular компонент с ViewEncapsulation */

// user-card.component.ts
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
selector: 'app-user-card',
template: \`
<div class="user-card" [ngClass]="cardClasses">
<div class="user-card__avatar">
  <img [src]="user.avatar" [alt]="user.name + ' avatar'">
  <div class="user-card__status" [ngClass]="'status--' + user.status"></div>
</div>

<div class="user-card__content">
  <h3 class="user-card__name">{{ user.name }}</h3>
  <p class="user-card__role">{{ user.role }}</p>
  <p class="user-card__department">{{ user.department }}</p>
</div>

<div class="user-card__actions">
  <button class="btn btn--primary" (click)="onConnect()">
    Connect
  </button>
  <button class="btn btn--secondary" (click)="onMessage()">
    Message
  </button>
</div>
</div>
\`,
styleUrls: ['./user-card.component.scss'],
encapsulation: ViewEncapsulation.Emulated // Изоляция стилей
})
export class UserCardComponent {
@Input() user: User;
@Input() compact: boolean = false;
@Input() interactive: boolean = true;

get cardClasses() {
return {
'user-card--compact': this.compact,
'user-card--interactive': this.interactive
};
}

onConnect() {
// Логика подключения
}

onMessage() {
// Логика отправки сообщения
}
}
`

const snippet8 = `
/* user-card.component.scss - Angular стили */
:host {
display: block;

&.theme-dark {
--card-bg: #1f2937;
--text-primary: #f9fafb;
--text-secondary: #d1d5db;
}
}

.user-card {
background: var(--card-bg, white);
border: 1px solid var(--border-color, #e5e7eb);
border-radius: 12px;
padding: 24px;
transition: all 0.2s ease;

&--compact {
padding: 16px;

.user-card__avatar img {
width: 40px;
height: 40px;
}
}

&--interactive {
cursor: pointer;

&:hover {
box-shadow: 0 8px 25px rgba(0,0,0,0.1);
transform: translateY(-2px);
}
}
}

.user-card__avatar {
position: relative;
margin-bottom: 16px;

img {
width: 60px;
height: 60px;
border-radius: 50%;
object-fit: cover;
}
}

.user-card__status {
position: absolute;
bottom: 4px;
right: 4px;
width: 16px;
height: 16px;
border-radius: 50%;
border: 2px solid var(--card-bg, white);

&.status--online { background: #10b981; }
&.status--away { background: #f59e0b; }
&.status--busy { background: #ef4444; }
&.status--offline { background: #6b7280; }
}

.user-card__content {
margin-bottom: 20px;
}

.user-card__name {
margin: 0 0 8px 0;
font-size: 1.25rem;
font-weight: 600;
color: var(--text-primary, #111827);
}

.user-card__role {
margin: 0 0 4px 0;
font-weight: 500;
color: var(--accent-color, #3b82f6);
}

.user-card__department {
margin: 0;
font-size: 0.875rem;
color: var(--text-secondary, #6b7280);
}

.user-card__actions {
display: flex;
gap: 12px;
}

.btn {
padding: 8px 16px;
border: none;
border-radius: 6px;
font-size: 0.875rem;
font-weight: 500;
cursor: pointer;
transition: all 0.2s ease;

&--primary {
background: var(--accent-color, #3b82f6);
color: white;

&:hover {
background: var(--accent-hover, #2563eb);
}
}

&--secondary {
background: transparent;
color: var(--accent-color, #3b82f6);
border: 1px solid var(--accent-color, #3b82f6);

&:hover {
background: var(--accent-color, #3b82f6);
color: white;
}
}
}
`

const snippet9 = `
/* Styled Components - CSS-in-JS изоляция */
import styled, { css, ThemeProvider } from 'styled-components';

// Тема для всего приложения
const theme = {
colors: {
primary: '#3b82f6',
primaryHover: '#2563eb',
secondary: '#6b7280',
success: '#10b981',
danger: '#ef4444',
warning: '#f59e0b',
background: '#ffffff',
surface: '#f9fafb',
text: '#111827',
textSecondary: '#6b7280'
},
spacing: {
xs: '0.25rem',
sm: '0.5rem',
md: '1rem',
lg: '1.5rem',
xl: '2rem'
},
borderRadius: {
sm: '4px',
md: '8px',
lg: '12px',
full: '9999px'
},
shadows: {
sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
}
};

// Базовые компоненты
const Card = styled.div\`
background: \${props => props.theme.colors.background};
border-radius: \${props => props.theme.borderRadius.lg};
padding: \${props => props.theme.spacing.xl};
box-shadow: \${props => props.theme.shadows.md};
transition: all 0.2s ease;

\${props => props.interactive && css\`
cursor: pointer;

&:hover {
box-shadow: \${props => props.theme.shadows.lg};
transform: translateY(-2px);
}
\`}

\${props => props.variant === 'outlined' && css\`
box-shadow: none;
border: 1px solid \${props => props.theme.colors.secondary}40;
\`}
\`;

const Avatar = styled.img\`
width: \${props => props.size === 'large' ? '80px' : props.size === 'small' ? '40px' : '60px'};
height: \${props => props.size === 'large' ? '80px' : props.size === 'small' ? '40px' : '60px'};
border-radius: \${props => props.theme.borderRadius.full};
object-fit: cover;
border: 3px solid \${props => props.theme.colors.primary};
\`;

const Button = styled.button\`
display: inline-flex;
align-items: center;
justify-content: center;
padding: \${props => props.size === 'large' ?
\`\${props.theme.spacing.md} \${props.theme.spacing.xl}\` :
\`\${props.theme.spacing.sm} \${props.theme.spacing.md}\`};
border: none;
border-radius: \${props => props.theme.borderRadius.md};
font-weight: 500;
cursor: pointer;
transition: all 0.2s ease;
text-decoration: none;

\${props => props.variant === 'primary' && css\`
background: \${props => props.theme.colors.primary};
color: white;

&:hover {
background: \${props => props.theme.colors.primaryHover};
}
\`}

\${props => props.variant === 'secondary' && css\`
background: transparent;
color: \${props => props.theme.colors.primary};
border: 1px solid \${props => props.theme.colors.primary};

&:hover {
background: \${props => props.theme.colors.primary};
color: white;
}
\`}

\${props => props.loading && css\`
opacity: 0.7;
cursor: not-allowed;
\`}
\`;

// Композитный компонент
const ProfileCard = ({ user, size = 'medium', interactive = false, onConnect, onMessage }) => (
<Card interactive={interactive}>
<Avatar
  src={user.avatar}
  alt={\`\${user.name} avatar\`}
  size={size}
/>
<h3>{user.name}</h3>
<p>{user.role}</p>
<div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
<Button variant="primary" onClick={onConnect}>
  Connect
</Button>
<Button variant="secondary" onClick={onMessage}>
  Message
</Button>
</div>
</Card>
);

// Использование с провайдером темы
const App = () => (
<ThemeProvider theme={theme}>
<ProfileCard
  user={{
  name: 'John Doe',
role: 'Frontend Developer',
avatar: '/john.jpg'
}}
interactive
onConnect={() => console.log('Connect clicked')}
onMessage={() => console.log('Message clicked')}
/>
</ThemeProvider>
);
`

const snippet10 = `
/* Современные подходы: CSS Container Queries + компоненты */

/* Компонент адаптируется к своему контейнеру, а не к viewport */
.product-card {
container-type: inline-size;
container-name: product-card;

background: white;
border-radius: 12px;
padding: 20px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.product-card__content {
display: grid;
gap: 16px;
}

.product-card__image {
width: 100%;
height: 200px;
object-fit: cover;
border-radius: 8px;
}

.product-card__title {
font-size: 1.25rem;
font-weight: 600;
margin: 0;
}

.product-card__price {
font-size: 1.5rem;
font-weight: 700;
color: #059669;
}

.product-card__description {
color: #6b7280;
line-height: 1.5;
}

.product-card__actions {
display: flex;
gap: 12px;
margin-top: auto;
}

/* Адаптация к размеру контейнера */
@container product-card (min-width: 400px) {
.product-card__content {
grid-template-columns: 200px 1fr;
grid-template-areas:
"image title"
"image price"
"image description"
"actions actions";
}

.product-card__image {
grid-area: image;
height: 160px;
}

.product-card__title { grid-area: title; }
.product-card__price { grid-area: price; }
.product-card__description { grid-area: description; }
.product-card__actions { grid-area: actions; }
}

@container product-card (min-width: 600px) {
.product-card {
padding: 32px;
}

.product-card__title {
font-size: 1.5rem;
}

.product-card__price {
font-size: 1.75rem;
}
}

/* CSS Cascade Layers для управления специфичностью */
@layer reset, components, utilities;

@layer components {
.product-card {
/* Компонентные стили с контролируемой специфичностью */
}
}

@layer utilities {
.hidden { display: none !important; }
.sr-only { /* screen reader only styles */ }
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
highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.javascript, 'javascript')
highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.css, 'css')
highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.javascript, 'javascript')
highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.javascript, 'javascript')
highlightedSnippet7.value = Prism.highlight(snippet7, Prism.languages.javascript, 'javascript')
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
              Как изоляция стилей в CSS связана с компонентной архитектурой / WebComponents?
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Изоляция стилей</b> и <b>компонентная архитектура</b> тесно связаны — изоляция является
              фундаментальным принципом, обеспечивающим инкапсуляцию, переиспользование и композицию компонентов.
              Без правильной изоляции компоненты влияют друг на друга непредсказуемым образом.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Проблемы без изоляции стилей</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Принципы компонентной архитектуры CSS</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Связь изоляции с компонентной архитектурой</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Принцип компонентов</th>
                <th class="text-left font-weight-bold">Роль изоляции CSS</th>
                <th class="text-left font-weight-bold">Методы реализации</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Инкапсуляция</b></td>
                <td class="pt-2 pb-2">Стили не влияют на другие компоненты</td>
                <td class="pt-2 pb-2">Shadow DOM, CSS Modules, Scoped</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Переиспользование</b></td>
                <td class="pt-2 pb-2">Компонент работает в любом контексте</td>
                <td class="pt-2 pb-2">CSS-in-JS, изолированные классы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Композиция</b></td>
                <td class="pt-2 pb-2">Компоненты комбинируются без конфликтов</td>
                <td class="pt-2 pb-2">BEM, CSS Custom Properties</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Предсказуемость</b></td>
                <td class="pt-2 pb-2">Стили ведут себя одинаково везде</td>
                <td class="pt
