<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'

const singletonSnippet = `
// SINGLETON - один экземпляр на всё приложение

// Классический подход
class ConfigManager {
  private static instance: ConfigManager;
  private config: Record<string, any> = {};

  private constructor() {
    // Приватный конструктор - нельзя создать через new
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): any {
    return this.config[key];
  }

  public set(key: string, value: any): void {
    this.config[key] = value;
  }
}

// Использование
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log(config1 === config2); // true - один и тот же экземпляр!

// ES6 модули - естественный Singleton
// apiClient.ts
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(endpoint: string) {
    return fetch(\`\${this.baseURL}\${endpoint}\`);
  }
}

export const apiClient = new ApiClient('https://api.example.com');

// В других файлах
import { apiClient } from './apiClient';
// Всегда один и тот же экземпляр!
`

const factorySnippet = `
// FACTORY - создание объектов через фабрику

// Пример: создание различных типов уведомлений
interface Notification {
  send(message: string): void;
  type: string;
}

class EmailNotification implements Notification {
  type = 'email';

  send(message: string): void {
    console.log(\`📧 Email: \${message}\`);
  }
}

class PushNotification implements Notification {
  type = 'push';

  send(message: string): void {
    console.log(\`🔔 Push: \${message}\`);
  }
}

class SMSNotification implements Notification {
  type = 'sms';

  send(message: string): void {
    console.log(\`📱 SMS: \${message}\`);
  }
}

// Фабрика
class NotificationFactory {
  static create(type: string): Notification {
    switch (type) {
      case 'email':
        return new EmailNotification();
      case 'push':
        return new PushNotification();
      case 'sms':
        return new SMSNotification();
      default:
        throw new Error(\`Unknown notification type: \${type}\`);
    }
  }
}

// Использование
const notification = NotificationFactory.create('push');
notification.send('New message!'); // 🔔 Push: New message!

// React компонент с фабрикой
function NotificationContainer({ type, message }: Props) {
  const notification = NotificationFactory.create(type);

  return (
    <div className={\`notification notification--\${type}\`}>
      {message}
    </div>
  );
}
`

const builderSnippet = `
// BUILDER - пошаговое создание сложных объектов

// Пример: построение HTTP запроса
class HttpRequest {
  private url: string = '';
  private method: string = 'GET';
  private headers: Record<string, string> = {};
  private body?: any;
  private timeout: number = 5000;

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(body: any): this {
    this.body = body;
    return this;
  }

  setTimeout(timeout: number): this {
    this.timeout = timeout;
    return this;
  }

  async build(): Promise<Response> {
    const options: RequestInit = {
      method: this.method,
      headers: this.headers,
    };

    if (this.body) {
      options.body = JSON.stringify(this.body);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

// Использование - цепочка вызовов
const response = await new HttpRequest()
  .setUrl('https://api.example.com/users')
  .setMethod('POST')
  .addHeader('Content-Type', 'application/json')
  .addHeader('Authorization', 'Bearer token123')
  .setBody({ name: 'John', email: 'john@example.com' })
  .setTimeout(10000)
  .build();

// React: построение формы
class FormBuilder {
  private fields: FormField[] = [];
  private validations: Validation[] = [];

  addField(name: string, type: string, label: string): this {
    this.fields.push({ name, type, label });
    return this;
  }

  addValidation(fieldName: string, rule: ValidationRule): this {
    this.validations.push({ fieldName, rule });
    return this;
  }

  build() {
    return {
      fields: this.fields,
      validations: this.validations,
    };
  }
}

const userForm = new FormBuilder()
  .addField('username', 'text', 'Username')
  .addValidation('username', { required: true, minLength: 3 })
  .addField('email', 'email', 'Email')
  .addValidation('email', { required: true, pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ })
  .addField('password', 'password', 'Password')
  .addValidation('password', { required: true, minLength: 8 })
  .build();
`

const prototypeSnippet = `
// PROTOTYPE - клонирование объектов

// Пример: клонирование компонентов дашборда
interface Widget {
  clone(): Widget;
  render(): string;
}

class ChartWidget implements Widget {
  constructor(
    public title: string,
    public type: string,
    public data: number[],
    public config: Record<string, any>
  ) {}

  clone(): ChartWidget {
    // Глубокое клонирование
    return new ChartWidget(
      this.title,
      this.type,
      [...this.data],
      { ...this.config }
    );
  }

  render(): string {
    return \`Chart: \${this.title} (\${this.type})\`;
  }
}

// Прототипы виджетов
const widgetPrototypes = {
  lineChart: new ChartWidget(
    'Line Chart',
    'line',
    [],
    { legend: true, grid: true }
  ),
  barChart: new ChartWidget(
    'Bar Chart',
    'bar',
    [],
    { legend: false, grid: true }
  ),
};

// Создание новых виджетов клонированием
const salesChart = widgetPrototypes.lineChart.clone();
salesChart.title = 'Sales Overview';
salesChart.data = [100, 200, 150, 300];

const revenueChart = widgetPrototypes.barChart.clone();
revenueChart.title = 'Monthly Revenue';
revenueChart.data = [1000, 2000, 1500];

// React: клонирование элементов
import React from 'react';

function Tooltip({ children, content }: Props) {
  // Клонируем дочерний элемент с добавлением пропсов
  return React.cloneElement(children, {
    'data-tooltip': content,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  });
}

// Использование
<Tooltip content="Click to save">
  <button>Save</button>
</Tooltip>

// structuredClone для глубокого копирования
const original = {
  id: 1,
  user: { name: 'John', settings: { theme: 'dark' } },
  tags: ['admin', 'user'],
};

const deepCopy = structuredClone(original);
deepCopy.user.settings.theme = 'light';
console.log(original.user.settings.theme); // 'dark' - оригинал не изменился
`

const abstractFactorySnippet = `
// ABSTRACT FACTORY - семейства связанных объектов

// Пример: создание UI компонентов для разных тем
interface Button {
  render(): string;
  onClick(): void;
}

interface Input {
  render(): string;
  getValue(): string;
}

interface Modal {
  render(): string;
  show(): void;
  hide(): void;
}

// Абстрактная фабрика
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createModal(): Modal;
}

// Светлая тема
class LightButton implements Button {
  render(): string {
    return '<button class="btn-light">Light Button</button>';
  }
  onClick(): void {
    console.log('Light button clicked');
  }
}

class LightInput implements Input {
  private value: string = '';

  render(): string {
    return '<input class="input-light" />';
  }
  getValue(): string {
    return this.value;
  }
}

class LightModal implements Modal {
  render(): string {
    return '<div class="modal-light">Light Modal</div>';
  }
  show(): void {
    console.log('Showing light modal');
  }
  hide(): void {
    console.log('Hiding light modal');
  }
}

class LightThemeFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }
  createInput(): Input {
    return new LightInput();
  }
  createModal(): Modal {
    return new LightModal();
  }
}

// Темная тема
class DarkButton implements Button {
  render(): string {
    return '<button class="btn-dark">Dark Button</button>';
  }
  onClick(): void {
    console.log('Dark button clicked');
  }
}

class DarkInput implements Input {
  private value: string = '';

  render(): string {
    return '<input class="input-dark" />';
  }
  getValue(): string {
    return this.value;
  }
}

class DarkModal implements Modal {
  render(): string {
    return '<div class="modal-dark">Dark Modal</div>';
  }
  show(): void {
    console.log('Showing dark modal');
  }
  hide(): void {
    console.log('Hiding dark modal');
  }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }
  createInput(): Input {
    return new DarkInput();
  }
  createModal(): Modal {
    return new DarkModal();
  }
}

// Использование
function createUI(factory: UIFactory) {
  const button = factory.createButton();
  const input = factory.createInput();
  const modal = factory.createModal();

  return { button, input, modal };
}

// Переключение тем
const theme = 'dark';
const factory = theme === 'dark'
  ? new DarkThemeFactory()
  : new LightThemeFactory();

const ui = createUI(factory);
console.log(ui.button.render()); // Кнопка в стиле темной темы
`

const realWorldExamplesSnippet = `
// РЕАЛЬНЫЕ ПРИМЕРЫ ВО ФРОНТЕНДЕ

// 1. Singleton: Store (Redux, Zustand)
import { create } from 'zustand';

// Создаем один store на всё приложение
export const useStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
}));

// В любом компоненте - один и тот же store
function Header() {
  const theme = useStore((state) => state.theme);
  return <header className={theme}>...</header>;
}

// 2. Factory: React.createElement
// React использует фабрику для создания элементов
const element = React.createElement(
  'button',
  { className: 'btn-primary', onClick: handleClick },
  'Click me'
);

// JSX - синтаксический сахар над фабрикой
const element = <button className="btn-primary" onClick={handleClick}>
  Click me
</button>;

// 3. Builder: Axios запросы
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

const response = await api
  .get('/users')
  .then((res) => res.data)
  .catch((err) => console.error(err));

// 4. Prototype: Object.create() и React.cloneElement
// Клонирование React элементов с модификацией
function EnhancedComponent({ children }) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: \`\${child.props.className} enhanced\`,
      onClick: handleEnhancedClick,
    });
  });
}

// 5. Abstract Factory: UI библиотеки (MUI, Ant Design)
import { ThemeProvider, createTheme } from '@mui/material';

// Фабрика создает семейство компонентов в едином стиле
const lightTheme = createTheme({
  palette: { mode: 'light' },
});

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

function App() {
  const [mode, setMode] = useState('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      {/* Все компоненты автоматически в стиле темы */}
      <Button>Click</Button>
      <TextField />
      <Card>...</Card>
    </ThemeProvider>
  );
}

// 6. Factory Method: Роутинг (React Router)
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Фабричный метод создает роутер с конфигурацией
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

// 7. Builder: Query строители (React Query, TanStack Query)
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['users', page, filters],
  queryFn: fetchUsers,
  staleTime: 5000,
  refetchOnWindowFocus: false,
  retry: 3,
});
`

const antiPatternsSnippet = `
// АНТИПАТТЕРНЫ И РАСПРОСТРАНЕННЫЕ ОШИБКИ

// ❌ Плохо: Множество Singleton через глобальные переменные
window.userService = new UserService();
window.apiClient = new ApiClient();
window.logger = new Logger();

// ✅ Хорошо: ES модули или DI контейнер
// services.ts
export const userService = new UserService();
export const apiClient = new ApiClient();
export const logger = new Logger();

// ❌ Плохо: Фабрика с большим switch/if-else
class ComponentFactory {
  create(type: string) {
    if (type === 'button') return new Button();
    else if (type === 'input') return new Input();
    else if (type === 'modal') return new Modal();
    else if (type === 'dropdown') return new Dropdown();
    // ... еще 50 условий
  }
}

// ✅ Хорошо: Map с регистрацией
class ComponentFactory {
  private creators = new Map();

  register(type: string, creator: () => Component) {
    this.creators.set(type, creator);
  }

  create(type: string) {
    const creator = this.creators.get(type);
    if (!creator) throw new Error(\`Unknown type: \${type}\`);
    return creator();
  }
}

// ❌ Плохо: Builder без валидации
class RequestBuilder {
  build() {
    return new Request(this.url, this.method);
    // Что если url не установлен?
  }
}

// ✅ Хорошо: Валидация перед build
class RequestBuilder {
  build() {
    if (!this.url) throw new Error('URL is required');
    if (!this.method) this.method = 'GET';
    return new Request(this.url, this.method);
  }
}

// ❌ Плохо: Поверхностное клонирование вложенных объектов
const clone = { ...original };
clone.user.name = 'Jane'; // Изменит original.user.name!

// ✅ Хорошо: Глубокое клонирование
const clone = structuredClone(original);
// или
const clone = JSON.parse(JSON.stringify(original)); // не работает с функциями
// или
import { cloneDeep } from 'lodash';
const clone = cloneDeep(original);

// ❌ Плохо: Abstract Factory с жесткой привязкой
class UIFactory {
  createButton() {
    return new MaterialButton(); // Захардкожено!
  }
}

// ✅ Хорошо: Конфигурируемая фабрика
class UIFactory {
  constructor(private theme: Theme) {}

  createButton() {
    return this.theme.buttonClass
      ? new this.theme.buttonClass()
      : new DefaultButton();
  }
}
`

const highlightedSingleton = ref('')
const highlightedFactory = ref('')
const highlightedBuilder = ref('')
const highlightedPrototype = ref('')
const highlightedAbstractFactory = ref('')
const highlightedRealWorld = ref('')
const highlightedAntiPatterns = ref('')

onMounted(() => {
  highlightedSingleton.value = Prism.highlight(singletonSnippet, Prism.languages.javascript, 'javascript')
  highlightedFactory.value = Prism.highlight(factorySnippet, Prism.languages.javascript, 'javascript')
  highlightedBuilder.value = Prism.highlight(builderSnippet, Prism.languages.javascript, 'javascript')
  highlightedPrototype.value = Prism.highlight(prototypeSnippet, Prism.languages.javascript, 'javascript')
  highlightedAbstractFactory.value = Prism.highlight(abstractFactorySnippet, Prism.languages.javascript, 'javascript')
  highlightedRealWorld.value = Prism.highlight(realWorldExamplesSnippet, Prism.languages.javascript, 'javascript')
  highlightedAntiPatterns.value = Prism.highlight(antiPatternsSnippet, Prism.languages.javascript, 'javascript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Порождающие паттерны проектирования
            </h1>

            <p class="font-weight-regular mb-6">
              <b>Порождающие (Creational) паттерны</b> — это паттерны проектирования, которые решают проблемы
              создания объектов. Они отвечают на вопрос "Как создавать объекты?" и предоставляют гибкие механизмы
              создания объектов, скрывая логику создания и делая систему независимой от способа создания объектов.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Обзор порождающих паттернов</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-crown</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Singleton</h3>
                  <p class="text-body-2">Единственный экземпляр класса с глобальной точкой доступа</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-factory</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Factory</h3>
                  <p class="text-body-2">Создание объектов без указания их конкретных классов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-hammer-wrench</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Builder</h3>
                  <p class="text-body-2">Пошаговое конструирование сложных объектов</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="warning" class="mb-2">mdi-content-copy</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Prototype</h3>
                  <p class="text-body-2">Создание объектов клонированием существующих</p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-office-building</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Abstract Factory</h3>
                  <p class="text-body-2">Создание семейств связанных объектов</p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">1. Singleton — единственный экземпляр</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Когда использовать:</strong> Когда нужен ровно один экземпляр класса (глобальный state, кэш, логгер, connection pool)
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSingleton"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">2. Factory — фабрика объектов</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-check-circle</v-icon>
              <strong>Когда использовать:</strong> Когда тип создаваемого объекта определяется во время выполнения (UI компоненты, notifications, валидаторы)
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedFactory"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">3. Builder — построитель</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-hammer-wrench</v-icon>
              <strong>Когда использовать:</strong> Для пошагового создания сложных объектов с множеством опциональных параметров (HTTP запросы, формы, SQL queries)
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBuilder"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">4. Prototype — прототип</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-content-copy</v-icon>
              <strong>Когда использовать:</strong> Когда нужно создавать копии объектов без привязки к их классам (клонирование React элементов, дублирование конфигураций)
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPrototype"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">5. Abstract Factory — абстрактная фабрика</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-office-building</v-icon>
              <strong>Когда использовать:</strong> Для создания семейств связанных объектов (темы UI, платформозависимые компоненты, разные наборы виджетов)
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAbstractFactory"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Реальные примеры во фронтенде</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRealWorld"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение паттернов</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Паттерн</th>
                <th class="text-left font-weight-bold">Проблема</th>
                <th class="text-left font-weight-bold">Решение</th>
                <th class="text-left font-weight-bold">Примеры во фронтенде</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Singleton</b></td>
                <td>Нужен один экземпляр</td>
                <td>Приватный конструктор, статический метод</td>
                <td>Redux store, Router, Config</td>
              </tr>
              <tr>
                <td><b>Factory</b></td>
                <td>Тип объекта определяется во runtime</td>
                <td>Метод создания вместо конструктора</td>
                <td>React.createElement, notifications</td>
              </tr>
              <tr>
                <td><b>Builder</b></td>
                <td>Много опциональных параметров</td>
                <td>Цепочка методов для настройки</td>
                <td>HTTP requests, Query builders</td>
              </tr>
              <tr>
                <td><b>Prototype</b></td>
                <td>Создание копий сложных объектов</td>
                <td>Метод clone() или structuredClone</td>
                <td>React.cloneElement, templates</td>
              </tr>
              <tr>
                <td><b>Abstract Factory</b></td>
                <td>Создание семейств объектов</td>
                <td>Интерфейс для создания группы</td>
                <td>UI themes, MUI ThemeProvider</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Антипаттерны и ошибки</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAntiPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между Factory и Abstract Factory?</p>
                <p class="font-weight-regular ma-0">
                  <b>Factory</b> создает один тип объектов (например, разные виды уведомлений).
                  <b>Abstract Factory</b> создает семейства связанных объектов (например, кнопки, инпуты и модалки в едином стиле темы).
                  Factory — один продукт, Abstract Factory — набор продуктов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему Singleton считается антипаттерном?</p>
                <p class="font-weight-regular ma-0">
                  Singleton создает глобальное состояние, что усложняет тестирование (нельзя изолировать),
                  нарушает Single Responsibility Principle (класс отвечает и за логику, и за управление экземпляром),
                  и скрывает зависимости. В React лучше использовать Context или DI контейнеры.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда Builder лучше, чем просто объект конфигурации?</p>
                <p class="font-weight-regular ma-0">
                  Builder полезен когда: (1) много опциональных параметров с дефолтными значениями,
                  (2) нужна валидация на этапе построения, (3) пошаговое создание с побочными эффектами,
                  (4) читаемость важнее — цепочка методов самодокументируется.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между поверхностным и глубоким клонированием?</p>
                <p class="font-weight-regular ma-0">
                  <b>Поверхностное</b> (<code>{...obj}</code>) копирует только первый уровень — вложенные объекты остаются ссылками.
                  <b>Глубокое</b> (<code>structuredClone()</code>) рекурсивно копирует всю структуру.
                  React.cloneElement делает поверхностное клонирование пропсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие порождающие паттерны используются в React?</p>
                <p class="font-weight-regular ma-0">
                  <b>Factory:</b> React.createElement, <b>Prototype:</b> React.cloneElement,
                  <b>Builder:</b> хуки с опциями (useQuery), <b>Singleton:</b> Context + Provider,
                  <b>Abstract Factory:</b> ThemeProvider создает семейства компонентов в едином стиле.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как тестировать Singleton?</p>
                <p class="font-weight-regular ma-0">
                  Проблема: глобальное состояние переживает тесты. Решения: (1) метод reset() для очистки,
                  (2) DI контейнер вместо Singleton, (3) мокать getInstance(), (4) использовать модули ES6,
                  которые можно переимпортировать в тестах.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Лучшие практики</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-check-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Делать</h3>
                  <ul class="text-left pl-4">
                    <li>Использовать ES модули для Singleton</li>
                    <li>Регистрировать фабрики в Map/Record</li>
                    <li>Валидировать в Builder перед build()</li>
                    <li>Глубокое клонирование для вложенных структур</li>
                    <li>DI контейнеры вместо глобальных Singleton</li>
                    <li>TypeScript для типобезопасности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Singleton для всего подряд</li>
                    <li>Огромные switch в Factory</li>
                    <li>Builder без валидации</li>
                    <li>Поверхностное clone вложенных объектов</li>
                    <li>Жесткая привязка в Abstract Factory</li>
                    <li>Игнорирование тестируемости</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Комбинируйте паттерны (Builder + Factory)</li>
                    <li>Документируйте, какой паттерн используется</li>
                    <li>Рефакторьте к паттернам постепенно</li>
                    <li>Тестируйте каждый паттерн изолированно</li>
                    <li>Изучайте реализации в библиотеках</li>
                    <li>Помните: паттерны — инструмент, а не цель</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Когда какой паттерн использовать</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Выбор паттерна по задаче</h3>
                  <ul class="pl-4">
                    <li><b>Нужен один экземпляр?</b> → Singleton (или ES модуль)</li>
                    <li><b>Тип известен во runtime?</b> → Factory</li>
                    <li><b>Много опций настройки?</b> → Builder</li>
                    <li><b>Нужно клонировать?</b> → Prototype</li>
                    <li><b>Семейство объектов?</b> → Abstract Factory</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Признаки неправильного выбора</h3>
                  <ul class="pl-4">
                    <li>Множество Singleton → используйте DI</li>
                    <li>Огромный Factory → разбейте на несколько</li>
                    <li>Builder для 2-3 параметров → перебор</li>
                    <li>Clone вместо new → возможно, лишнее</li>
                    <li>Abstract Factory для одного типа → Factory достаточно</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>Порождающие паттерны</b> решают проблемы создания объектов, делая код более гибким и поддерживаемым.
              Во фронтенде они встречаются повсеместно: Redux store (Singleton), React.createElement (Factory),
              Axios builder (Builder), React.cloneElement (Prototype), MUI ThemeProvider (Abstract Factory).
              Понимание этих паттернов помогает не только на собеседованиях, но и в ежедневной разработке —
              вы будете лучше понимать архитектуру библиотек и писать более качественный код.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://refactoring.guru/design-patterns/creational-patterns"
                target="_blank"
                class="mr-2">
                Refactoring Guru
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://www.patterns.dev/posts/classic-design-patterns"
                target="_blank">
                Patterns.dev
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
