<script setup lang="ts">
import {onMounted, ref} from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-javascript.js'

const snippet1 = `
// =====================================
// ТИПИЗАЦИЯ - ГЛАВНЫЙ ПЛЮС
// =====================================

// ❌ JavaScript - ошибки только в runtime
function calculatePrice(price, discount) {
  return price - discount;
}

calculatePrice(100, "50%"); // NaN - ошибка найдена только при выполнении
calculatePrice(100); // NaN - забыли передать discount

// ✅ TypeScript - ошибки на этапе компиляции
function calculatePrice(price: number, discount: number): number {
  return price - discount;
}

// calculatePrice(100, "50%"); // ❌ Ошибка компиляции: тип string не подходит
// calculatePrice(100); // ❌ Ошибка компиляции: не хватает аргумента

// Типы помогают избежать типичных ошибок
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Опциональное поле
}

function sendEmail(user: User) {
  // IDE знает все поля user и предлагает автодополнение
  console.log(\`Отправка письма на \${user.email}\`);
  // console.log(user.phone); // ❌ Ошибка: поля phone не существует
}

// Union types - несколько возможных типов
type Status = "pending" | "approved" | "rejected";

function updateStatus(orderId: number, status: Status) {
  // status может быть только одним из трех значений
  console.log(\`Заказ #\${orderId} теперь \${status}\`);
}

updateStatus(123, "approved"); // ✅ OK
// updateStatus(123, "cancelled"); // ❌ Ошибка: "cancelled" не входит в тип Status

// Generics - типобезопасные универсальные функции
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

const numbers = [1, 2, 3];
const firstNumber = getFirstElement(numbers); // тип: number | undefined

const users = [{ name: "Анна" }, { name: "Иван" }];
const firstUser = getFirstElement(users); // тип: {name: string} | undefined
`

const snippet2 = `
// =====================================
// АВТОДОПОЛНЕНИЕ И INTELLISENSE
// =====================================

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags: string[];
  metadata?: Record<string, any>;
}

// TypeScript знает все поля объекта
function formatProduct(product: Product) {
  // При написании product. IDE покажет все доступные поля
  return \`\${product.name} - \${product.price}₽\`;

  // Автодополнение работает и для вложенных структур
  if (product.metadata) {
    // IDE понимает, что metadata существует
    console.log(product.metadata);
  }
}

// Автодополнение для методов
const products: Product[] = [];

// IDE подсказывает все методы массива
products.filter(p => p.inStock)
  .map(p => p.name)
  .sort()
  .join(", ");

// Типизация помогает при работе с библиотеками
import { useState, useEffect } from 'react';

function UserProfile() {
  // TypeScript выводит тип автоматически
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // IDE показывает параметры и типы возврата
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  // Безопасный доступ к полям
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

// TypeScript помогает с рефакторингом
interface OldUser {
  userName: string;
}

interface NewUser {
  fullName: string; // Переименовали поле
}

// Все места использования userName будут подсвечены как ошибки
function greetUser(user: NewUser) {
  // console.log(user.userName); // ❌ Ошибка - поле не существует
  console.log(user.fullName); // ✅ OK
}
`

const snippet3 = `
// =====================================
// РЕФАКТОРИНГ И ПОДДЕРЖКА КОДА
// =====================================

// Интерфейсы как контракты
interface PaymentProcessor {
  processPayment(amount: number, currency: string): Promise<boolean>;
  refund(transactionId: string): Promise<boolean>;
}

// Любой класс, реализующий интерфейс, должен иметь все методы
class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number, currency: string): Promise<boolean> {
    // Реализация
    return true;
  }

  async refund(transactionId: string): Promise<boolean> {
    // Реализация
    return true;
  }

  // Если забыть метод, TypeScript выдаст ошибку
}

// Type guards для безопасного сужения типов
type Shape = Circle | Rectangle;

interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

function getArea(shape: Shape): number {
  // Type guard через проверку дискриминанта
  if (shape.kind === "circle") {
    // TypeScript знает, что здесь shape - это Circle
    return Math.PI * shape.radius ** 2;
  } else {
    // TypeScript знает, что здесь shape - это Rectangle
    return shape.width * shape.height;
  }
}

// Utility types для трансформации типов
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

// Partial - все поля опциональны
type TodoUpdate = Partial<Todo>;

function updateTodo(id: number, updates: TodoUpdate) {
  // updates может содержать любые поля из Todo или не содержать вообще
}

// Pick - выбираем только нужные поля
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - исключаем ненужные поля
type TodoFormData = Omit<Todo, "createdAt">;

// Readonly - делаем поля неизменяемыми
type ImmutableTodo = Readonly<Todo>;

const todo: ImmutableTodo = {
  title: "Задача",
  description: "Описание",
  completed: false,
  createdAt: new Date()
};

// todo.completed = true; // ❌ Ошибка: поле readonly

// Record для создания объектов-словарей
type UserRoles = "admin" | "user" | "guest";
type Permissions = Record<UserRoles, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};
`

const snippet4 = `
// =====================================
// ПРОБЛЕМЫ И МИНУСЫ TYPESCRIPT
// =====================================

// 1. СЛОЖНОСТЬ ДЛЯ НОВИЧКОВ
// Кривая обучения может быть крутой

// Простой JavaScript
function sum(a, b) {
  return a + b;
}

// TypeScript требует понимания типов
function sum<T extends number>(a: T, b: T): T {
  return (a + b) as T; // Type assertion нужен для приведения
}

// Сложные типы могут быть трудны для понимания
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 2. ДОПОЛНИТЕЛЬНОЕ ВРЕМЯ НА РАЗРАБОТКУ
// Нужно писать типы и интерфейсы

interface User {
  id: number;
  name: string;
  email: string;
  profile: {
    age: number;
    avatar: string;
    bio?: string;
  };
  settings: {
    notifications: boolean;
    theme: "light" | "dark";
  };
}

// В JavaScript это было бы просто:
// const user = { id: 1, name: "John", ... }

// 3. КОНФЛИКТЫ С БИБЛИОТЕКАМИ БЕЗ ТИПОВ
// Не все библиотеки имеют типы

// Нужно устанавливать @types отдельно
// npm install --save-dev @types/lodash
import _ from 'lodash';

// Или объявлять типы вручную
declare module 'some-legacy-library' {
  export function doSomething(param: string): void;
}

// 4. ЛОЖНОЕ ЧУВСТВО БЕЗОПАСНОСТИ
// TypeScript проверяет типы только на этапе компиляции

interface ApiResponse {
  data: User[];
  total: number;
}

async function fetchUsers(): Promise<ApiResponse> {
  const response = await fetch('/api/users');
  // TypeScript не проверяет реальную структуру ответа!
  return response.json(); // Может вернуть что угодно в runtime
}

// Нужна дополнительная валидация в runtime
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

async function fetchUsersSafe(): Promise<User[]> {
  const response = await fetch('/api/users');
  const data = await response.json();

  // Реальная проверка в runtime
  return z.array(UserSchema).parse(data);
}

// 5. ANY TYPE - ЛАЗЕЙКА В ТИПОБЕЗОПАСНОСТИ
// any отключает проверку типов

function dangerousFunction(data: any) {
  // Можно делать что угодно, TypeScript не проверяет
  return data.somethingThatDoesNotExist();
}

// Лучше использовать unknown
function saferFunction(data: unknown) {
  // Нужна явная проверка типа
  if (typeof data === "object" && data !== null && "name" in data) {
    console.log((data as { name: string }).name);
  }
}

// 6. КОНФИГУРАЦИЯ МОЖЕТ БЫТЬ СЛОЖНОЙ
// tsconfig.json с множеством опций

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    // ... и еще десятки опций
  }
}

// 7. УВЕЛИЧЕНИЕ РАЗМЕРА ПРОЕКТА
// Файлы .d.ts, node_modules/@types добавляют вес

// JavaScript проект:
// src/ - 10MB

// TypeScript проект:
// src/ - 10MB
// node_modules/@types/ - 50MB+
// dist/ (скомпилированный JS) - 10MB

// 8. ПРОБЛЕМЫ С TYPE ASSERTION
// Иногда приходится "обманывать" TypeScript

const element = document.getElementById("myElement") as HTMLInputElement;
// Если element окажется не input, будет ошибка в runtime

// Небезопасное приведение
const userInput = JSON.parse(localStorage.getItem("user")!) as User;
// Что если в localStorage что-то другое?

// 9. СЛОЖНОСТЬ С ДИНАМИЧЕСКИМ КОДОМ
// TypeScript плохо работает с очень динамическим кодом

function createObject(fields: string[]) {
  const obj: Record<string, any> = {}; // Приходится использовать any
  fields.forEach(field => {
    obj[field] = null;
  });
  return obj;
}

// 10. BREAKING CHANGES В НОВЫХ ВЕРСИЯХ
// Обновление TypeScript может сломать код

// TypeScript 4.x код
function oldCode(x: string | undefined) {
  // Работало нормально
}

// TypeScript 5.x может добавить новые строгие проверки
// Тот же код может начать выдавать ошибки
`

const snippet5 = `
// =====================================
// КОГДА ИСПОЛЬЗОВАТЬ TYPESCRIPT
// =====================================

// ✅ ИСПОЛЬЗУЙТЕ TYPESCRIPT КОГДА:

// 1. Большой проект с множеством разработчиков
interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
}

// TypeScript помогает команде понимать структуру данных

// 2. Долгосрочный проект, требующий поддержки
// Типы служат документацией
function processPayment(
  userId: number,
  amount: number,
  paymentMethod: PaymentMethod,
  options?: PaymentOptions
): Promise<PaymentResult> {
  // Через год другой разработчик сразу поймет, что нужно передавать
}

// 3. Работа с внешними API
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: "User" | "Organization";
}

async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(\`https://api.github.com/users/\${username}\`);
  return response.json();
}

// 4. Библиотеки и SDK
// TypeScript обязателен для создания переиспользуемых библиотек

export class PaymentSDK {
  constructor(private apiKey: string) {}

  async createPayment(options: PaymentOptions): Promise<Payment> {
    // Пользователи SDK получат полную типизацию
  }
}

// 5. React/Vue/Angular приложения
// Типизация компонентов улучшает DX

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ variant, size = "medium", disabled, onClick, children }: ButtonProps) {
  // IDE подсказывает все пропсы
}

// ❌ НЕ ИСПОЛЬЗУЙТЕ TYPESCRIPT КОГДА:

// 1. Быстрые прототипы и MVP
// Для скриптов и экспериментов JavaScript быстрее

// 2. Небольшие проекты (< 1000 строк)
// Overhead TypeScript не оправдан

// 3. Команда не знает TypeScript
// Обучение может занять время

// 4. Много динамического кода
// TypeScript будет мешать

const config = JSON.parse(fs.readFileSync('config.json'));
// Лучше оставить JavaScript для таких случаев

// 5. Легаси код без типов
// Миграция может быть болезненной

// =====================================
// КОМПРОМИССНЫЕ РЕШЕНИЯ
// =====================================

// JSDoc для постепенной миграции
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

// TypeScript с allowJs и checkJs
// В tsconfig.json:
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true, // Проверяет JS файлы через JSDoc
    "noEmit": true // Только проверка, без компиляции
  }
}

// Использование any для сложных случаев
function complexDynamicLogic(data: any) {
  // Иногда any - это OK для очень динамичного кода
  return data.whatever.you.need;
}

// Постепенная типизация
// @ts-ignore или @ts-expect-error для временных случаев
// @ts-ignore
const legacyCode = requireLegacyModule();

// Strict mode опционально
{
  "compilerOptions": {
    "strict": false, // Можно начать без строгого режима
    "strictNullChecks": true, // Включать по частям
  }
}
`

const snippet6 = `
// =====================================
// РЕАЛЬНЫЕ ПРИМЕРЫ ИЗ ПРАКТИКИ
// =====================================

// ПРИМЕР 1: TypeScript спасает от ошибки

// До TypeScript - баг в продакшене
function calculateDiscount(price, discountPercent) {
  return price - (price * discountPercent / 100);
}

// Вызов с ошибкой
calculateDiscount("100", "10"); // "100NaN" - баг!

// С TypeScript - ошибка на этапе разработки
function calculateDiscount(price: number, discountPercent: number): number {
  return price - (price * discountPercent / 100);
}

// calculateDiscount("100", "10"); // ❌ Ошибка компиляции

// ПРИМЕР 2: Рефакторинг API

// Старая версия API
interface OldApiResponse {
  status: string;
  userData: {
    userName: string;
    userEmail: string;
  };
}

// Новая версия API
interface NewApiResponse {
  success: boolean; // Изменили тип
  user: { // Изменили структуру
    name: string; // Изменили имена полей
    email: string;
  };
}

// TypeScript найдет ВСЕ места, где используется старый формат
function displayUser(response: NewApiResponse) {
  // console.log(response.userData.userName); // ❌ Ошибки во всех местах
  console.log(response.user.name); // ✅ Нужно исправить
}

// ПРИМЕР 3: Безопасная работа с null/undefined

// JavaScript - ошибка в runtime
function getUserEmail(user) {
  return user.profile.email; // TypeError если profile undefined
}

// TypeScript - ошибка на этапе разработки
interface User {
  id: number;
  name: string;
  profile?: { // Опциональное поле
    email: string;
    avatar: string;
  };
}

function getUserEmail(user: User): string | undefined {
  return user.profile?.email; // ✅ Optional chaining
}

// ПРИМЕР 4: Типизация сложных структур данных

// Redux store с TypeScript
interface RootState {
  auth: {
    user: User | null;
    token: string | null;
    loading: boolean;
  };
  products: {
    items: Product[];
    filters: FilterState;
    pagination: PaginationState;
  };
  cart: {
    items: CartItem[];
    total: number;
  };
}

// Типизированные селекторы
const selectUser = (state: RootState) => state.auth.user;
const selectCartTotal = (state: RootState) => state.cart.total;

// TypeScript подсказывает структуру state везде

// ПРИМЕР 5: Проблема с библиотекой без типов

// Библиотека без типов
import oldLibrary from 'old-library';

// Приходится объявлять типы вручную
declare module 'old-library' {
  export interface Config {
    apiKey: string;
    timeout?: number;
  }

  export function initialize(config: Config): void;
  export function fetchData(endpoint: string): Promise<any>;
}

// Теперь можно использовать с типами
oldLibrary.initialize({
  apiKey: "key",
  timeout: 5000
});

// ПРИМЕР 6: Type narrowing спасает

type NetworkState =
  | { state: "loading" }
  | { state: "success"; data: string }
  | { state: "error"; error: Error };

function renderState(networkState: NetworkState) {
  // TypeScript сужает тип внутри каждого блока
  switch (networkState.state) {
    case "loading":
      return "Loading...";

    case "success":
      // TypeScript знает, что здесь есть поле data
      return networkState.data;

    case "error":
      // TypeScript знает, что здесь есть поле error
      return networkState.error.message;
  }
}

// ПРИМЕР 7: Дженерики для переиспользуемых компонентов

// Типобезопасная функция для работы с API
async function fetchData<T>(
  endpoint: string,
  validator: (data: unknown) => data is T
): Promise<T> {
  const response = await fetch(endpoint);
  const data = await response.json();

  if (!validator(data)) {
    throw new Error("Invalid data format");
  }

  return data;
}

// Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    "email" in data
  );
}

// Использование
const user = await fetchData<User>("/api/user", isUser);
// user имеет тип User, не any

// ПРИМЕР 8: Проблема с type assertion

// Опасное приведение типов
const input = document.getElementById("email") as HTMLInputElement;
const value = input.value; // Если это не input, будет ошибка!

// Безопасный способ
const element = document.getElementById("email");
if (element instanceof HTMLInputElement) {
  const value = element.value; // ✅ Безопасно
}

// ПРИМЕР 9: Conditional types для продвинутых случаев

type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"

// Практическое применение
type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;

async function fetchUser() {
  return { id: 1, name: "John" };
}

type UserType = AsyncReturnType<typeof fetchUser>; // { id: number; name: string }

// ПРИМЕР 10: Настоящая проблема - legacy код

// Старый JavaScript код
function processOrder(order) {
  if (order.items && order.items.length > 0) {
    const total = order.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    if (order.discount) {
      total = total * (1 - order.discount / 100);
    }

    return total;
  }
  return 0;
}

// Миграция на TypeScript требует времени
interface OrderItem {
  id: number;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  discount?: number;
}

function processOrder(order: Order): number {
  // Нужно переписать всю логику с учетом типов
  // Это может занять значительное время
}
`

const highlightedSnippet1 = ref('')
const highlightedSnippet2 = ref('')
const highlightedSnippet3 = ref('')
const highlightedSnippet4 = ref('')
const highlightedSnippet5 = ref('')
const highlightedSnippet6 = ref('')

onMounted(() => {
  highlightedSnippet1.value = Prism.highlight(snippet1, Prism.languages.typescript, 'typescript')
  highlightedSnippet2.value = Prism.highlight(snippet2, Prism.languages.typescript, 'typescript')
  highlightedSnippet3.value = Prism.highlight(snippet3, Prism.languages.typescript, 'typescript')
  highlightedSnippet4.value = Prism.highlight(snippet4, Prism.languages.typescript, 'typescript')
  highlightedSnippet5.value = Prism.highlight(snippet5, Prism.languages.typescript, 'typescript')
  highlightedSnippet6.value = Prism.highlight(snippet6, Prism.languages.typescript, 'typescript')
})

</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">
            <h1 class="text-h4 font-weight-bold mb-6">
              Плюсы и минусы TypeScript
            </h1>

            <p class="font-weight-regular mb-6">
              <b>TypeScript</b> — это надмножество JavaScript, добавляющее статическую типизацию.
              Он компилируется в чистый JavaScript и может использоваться везде, где работает JavaScript.
              TypeScript создан Microsoft и активно развивается с 2012 года.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Краткое сравнение</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">JavaScript</th>
                <th class="text-left font-weight-bold">TypeScript</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Типизация</b></td>
                <td class="pt-2 pb-2">Динамическая</td>
                <td class="pt-2 pb-2">Статическая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Ошибки</b></td>
                <td class="pt-2 pb-2">Runtime</td>
                <td class="pt-2 pb-2">Compile-time</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>IDE поддержка</b></td>
                <td class="pt-2 pb-2">Базовая</td>
                <td class="pt-2 pb-2">Отличная</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Кривая обучения</b></td>
                <td class="pt-2 pb-2">Пологая</td>
                <td class="pt-2 pb-2">Крутая</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Размер проекта</b></td>
                <td class="pt-2 pb-2">Меньше</td>
                <td class="pt-2 pb-2">Больше</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Скорость разработки</b></td>
                <td class="pt-2 pb-2">Быстрее вначале</td>
                <td class="pt-2 pb-2">Быстрее в долгосрочной перспективе</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">ПЛЮСЫ TypeScript</h2>

            <h3 class="text-h6 font-weight-bold mb-3">1. Статическая типизация</h3>
            <p class="font-weight-regular mb-4">
              Главное преимущество TypeScript — статическая типизация, которая позволяет находить ошибки
              на этапе разработки, а не в runtime.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet1"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">2. Превосходное автодополнение</h3>
            <p class="font-weight-regular mb-4">
              TypeScript значительно улучшает опыт разработки благодаря IntelliSense и автодополнению.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet2"></code></pre>

            <h3 class="text-h6 font-weight-bold mb-3">3. Легкий рефакторинг и поддержка</h3>
            <p class="font-weight-regular mb-4">
              TypeScript делает рефакторинг безопасным и помогает поддерживать большие кодовые базы.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet3"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные плюсы TypeScript</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Преимущества</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li class="mb-2"><b>Раннее обнаружение ошибок</b> — до runtime</li>
                    <li class="mb-2"><b>Отличное автодополнение</b> в IDE</li>
                    <li class="mb-2"><b>Безопасный рефакторинг</b> больших проектов</li>
                    <li class="mb-2"><b>Документация кода</b> через типы</li>
                    <li class="mb-2"><b>Лучшая архитектура</b> благодаря интерфейсам</li>
                    <li class="mb-2"><b>Поддержка новых фич</b> JS заранее</li>
                    <li class="mb-2"><b>Улучшенная командная работа</b></li>
                    <li class="mb-2"><b>Масштабируемость</b> проектов</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-info">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-star</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Для разработчиков</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li class="mb-2">Повышает уверенность при изменениях</li>
                    <li class="mb-2">Снижает количество багов в production</li>
                    <li class="mb-2">Упрощает онбординг новых людей</li>
                    <li class="mb-2">Улучшает читаемость кода</li>
                    <li class="mb-2">Помогает при code review</li>
                    <li class="mb-2">Интеграция с популярными фреймворками</li>
                    <li class="mb-2">Активное коммьюнити и экосистема</li>
                    <li class="mb-2">Регулярные обновления</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">МИНУСЫ TypeScript</h2>

            <h3 class="text-h6 font-weight-bold mb-3">4. Проблемы и сложности</h3>
            <p class="font-weight-regular mb-4">
              Несмотря на все преимущества, TypeScript имеет свои недостатки и может создавать проблемы.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet4"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основные минусы TypeScript</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-error">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Недостатки</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li class="mb-2"><b>Сложность для новичков</b> — крутая кривая обучения</li>
                    <li class="mb-2"><b>Дополнительное время</b> на написание типов</li>
                    <li class="mb-2"><b>Увеличение размера</b> проекта</li>
                    <li class="mb-2"><b>Проблемы с библиотеками</b> без типов</li>
                    <li class="mb-2"><b>Ложная безопасность</b> — типы не проверяются в runtime</li>
                    <li class="mb-2"><b>Сложная конфигурация</b> tsconfig.json</li>
                    <li class="mb-2"><b>Overhead для простых скриптов</b></li>
                    <li class="mb-2"><b>Breaking changes</b> между версиями</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">Подводные камни</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li class="mb-2">any убивает типобезопасность</li>
                    <li class="mb-2">Type assertion может быть опасен</li>
                    <li class="mb-2">Нужна runtime валидация для API</li>
                    <li class="mb-2">Сложность с очень динамическим кодом</li>
                    <li class="mb-2">Миграция легаси проектов болезненна</li>
                    <li class="mb-2">Иногда типы слишком строгие</li>
                    <li class="mb-2">Дополнительный этап сборки</li>
                    <li class="mb-2">Не заменяет тестирование</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h3 class="text-h6 font-weight-bold mb-3">5. Когда использовать TypeScript</h3>
            <p class="font-weight-regular mb-4">
              Понимание, когда TypeScript действительно полезен, помогает принять правильное решение для проекта.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet5"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Матрица принятия решений</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Критерий</th>
                <th class="text-left font-weight-bold">JavaScript</th>
                <th class="text-left font-weight-bold">TypeScript</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Размер проекта</b></td>
                <td class="pt-2 pb-2 text-success">Маленький (< 1000 строк)</td>
                <td class="pt-2 pb-2 text-success">Большой (> 10000 строк)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Команда</b></td>
                <td class="pt-2 pb-2 text-success">Один разработчик</td>
                <td class="pt-2 pb-2 text-success">Несколько разработчиков</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Срок жизни</b></td>
                <td class="pt-2 pb-2 text-success">Прототип / MVP</td>
                <td class="pt-2 pb-2 text-success">Долгосрочный проект</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Сложность</b></td>
                <td class="pt-2 pb-2 text-success">Простая логика</td>
                <td class="pt-2 pb-2 text-success">Сложная бизнес-логика</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Скорость старта</b></td>
                <td class="pt-2 pb-2 text-success">Нужна быстрота</td>
                <td class="pt-2 pb-2 text-warning">Можно потратить время</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Библиотека/SDK</b></td>
                <td class="pt-2 pb-2 text-error">Не подходит</td>
                <td class="pt-2 pb-2 text-success">Обязательно</td>
              </tr>
              </tbody>
            </v-table>

            <h3 class="text-h6 font-weight-bold mb-3">6. Реальные примеры</h3>
            <p class="font-weight-regular mb-4">
              Практические кейсы использования TypeScript и типичные проблемы.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSnippet6"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему TypeScript стал популярным?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript решает проблемы масштабируемости JavaScript: раннее обнаружение ошибок,
                  лучшее автодополнение, безопасный рефакторинг. Поддерживается крупными компаниями (Microsoft, Google),
                  интегрирован в популярные фреймворки (Angular, Vue 3, React).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем главное отличие TypeScript от JavaScript?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript добавляет статическую типизацию к JavaScript. Ошибки типов находятся
                  на этапе компиляции, а не runtime. TypeScript — это надмножество JavaScript,
                  весь валидный JS код — валидный TS код.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие недостатки есть у TypeScript?</p>
                <p class="font-weight-regular ma-0">
                  Крутая кривая обучения, дополнительное время на написание типов,
                  увеличение размера проекта, сложная конфигурация, ложное чувство безопасности
                  (типы не проверяются в runtime), проблемы с библиотеками без типов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Нужен ли TypeScript для небольших проектов?</p>
                <p class="font-weight-regular ma-0">
                  Для проектов < 1000 строк overhead TypeScript может не оправдаться.
                  JavaScript быстрее для прототипов и MVP. Но для библиотек и SDK TypeScript
                  рекомендуется даже для небольших проектов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое any и почему это плохо?</p>
                <p class="font-weight-regular ma-0">
                  any отключает проверку типов для переменной — убирает все преимущества TypeScript.
                  Лучше использовать unknown с явной проверкой типов, или конкретные типы/интерфейсы.
                  any — последнее средство, а не решение по умолчанию.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как TypeScript помогает при рефакторинге?</p>
                <p class="font-weight-regular ma-0">
                  При изменении интерфейса или типа, TypeScript показывает ВСЕ места использования,
                  которые нужно обновить. Переименование полей, изменение структуры данных —
                  безопасны с TypeScript, так как компилятор найдет все несоответствия.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Заменяет ли TypeScript тестирование?</p>
                <p class="font-weight-regular ma-0">
                  Нет! TypeScript проверяет только типы на этапе компиляции. Он не проверяет
                  бизнес-логику, корректность алгоритмов, edge cases. Unit-тесты, интеграционные
                  тесты остаются обязательными. TypeScript дополняет, а не заменяет тестирование.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое строгий режим (strict mode)?</p>
                <p class="font-weight-regular ma-0">
                  strict: true включает все строгие проверки: strictNullChecks, strictFunctionTypes,
                  noImplicitAny и др. Делает TypeScript более безопасным, но требует больше усилий.
                  Рекомендуется для новых проектов, может быть сложен для миграции.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работать с внешними API в TypeScript?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript не проверяет runtime данные! Нужна дополнительная валидация через
                  библиотеки как zod, yup, io-ts. Определяем интерфейсы для ожидаемых данных,
                  валидируем реальный ответ, только потом приводим к типу.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Стоит ли мигрировать существующий проект на TypeScript?</p>
                <p class="font-weight-regular ma-0">
                  Зависит от размера и сложности. Для больших проектов с активной разработкой —
                  стоит, но миграция постепенная. Можно начать с allowJs, checkJs, использовать
                  JSDoc комментарии. Для стабильных проектов без активного развития — может не стоить.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое generics и зачем они нужны?</p>
                <p class="font-weight-regular ma-0">
                  Generics — параметризация типов, позволяющая создавать переиспользуемый
                  типобезопасный код. Например, Array&lt;T&gt; работает с любым типом, но сохраняет
                  типобезопасность. Используется для функций, классов, интерфейсов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между interface и type?</p>
                <p class="font-weight-regular ma-0">
                  Interface можно расширять (extends), объединять (declaration merging).
                  Type более гибкий — union, intersection, mapped types, conditional types.
                  Для объектов лучше interface, для сложных типов — type. Оба работают схожим образом.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как TypeScript влияет на производительность?</p>
                <p class="font-weight-regular ma-0">
                  TypeScript не влияет на runtime производительность — компилируется в обычный JavaScript.
                  Влияет на время сборки (компиляция) и размер проекта (типы, конфигурация).
                  Может замедлить IDE при очень сложных типах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое type assertion и когда его использовать?</p>
                <p class="font-weight-regular ma-0">
                  Type assertion (as Type) — способ сказать компилятору "я знаю тип лучше тебя".
                  Используется осторожно, только когда точно знаешь тип. Небезопасен — не проверяется
                  в runtime. Лучше использовать type guards для безопасного сужения типов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какие альтернативы TypeScript существуют?</p>
                <p class="font-weight-regular ma-0">
                  Flow (Facebook), JSDoc комментарии с IDE поддержкой, ReScript (бывший ReasonML),
                  PureScript, Elm. TypeScript — самый популярный благодаря экосистеме,
                  поддержке Microsoft, интеграции с фреймворками.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Нужно ли знать JavaScript перед изучением TypeScript?</p>
                <p class="font-weight-regular ma-0">
                  Да, обязательно! TypeScript — надмножество JavaScript. Нужно понимать JS основы:
                  замыкания, this, прототипы, async/await, ES6+ синтаксис. TypeScript добавляет
                  типы поверх JS, но не заменяет знание языка.
                </p>
              </li>
            </ol>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение популярности</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="primary" class="mb-2">mdi-trending-up</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Рост популярности</h3>
                  <p class="text-body-2">
                    TypeScript используют: Microsoft, Google, Airbnb, Slack, Shopify, Stripe
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="success" class="mb-2">mdi-github</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Open Source</h3>
                  <p class="text-body-2">
                    90M+ еженедельных загрузок npm, топ-5 языков на GitHub
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-briefcase</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">Рынок труда</h3>
                  <p class="text-body-2">
                    TypeScript — один из самых востребованных навыков в веб-разработке
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Рекомендации</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">✅ Используйте TypeScript</h3>
                  <ul class="pl-4">
                    <li>Большие проекты (> 10k строк)</li>
                    <li>Команда из нескольких разработчиков</li>
                    <li>Долгосрочная поддержка кода</li>
                    <li>Библиотеки и SDK</li>
                    <li>Сложная бизнес-логика</li>
                    <li>React/Vue/Angular приложения</li>
                    <li>Корпоративные проекты</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">❌ JavaScript достаточно</h3>
                  <ul class="pl-4">
                    <li>Быстрые прототипы</li>
                    <li>Скрипты и утилиты (< 1k строк)</li>
                    <li>MVP с жесткими дедлайнами</li>
                    <li>Команда без опыта TypeScript</li>
                    <li>Очень динамичный код</li>
                    <li>Простые веб-сайты</li>
                    <li>Легаси проекты без активной разработки</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Заключение</h2>
            <v-alert type="info" variant="tonal" class="mb-6">
              <p class="mb-2"><b>Итоговый вердикт:</b></p>
              <p class="mb-2">
                <b>TypeScript</b> — мощный инструмент для больших проектов и команд, значительно улучшающий
                опыт разработки, безопасность кода и масштабируемость. Однако он требует времени на обучение,
                добавляет сложность и не подходит для всех сценариев.
              </p>
              <p class="ma-0">
                Выбор между TypeScript и JavaScript зависит от конкретного проекта: его размера, сложности,
                команды и долгосрочных целей. Для современной веб-разработки знание TypeScript становится
                практически обязательным навыком.
              </p>
            </v-alert>

            <div class="d-flex justify-end">
              <v-btn
                color='primary'
                size="small"
                variant="elevated"
                href="https://www.typescriptlang.org/docs/"
                target="_blank"
                class="mr-2">
                TypeScript Docs
              </v-btn>
              <v-btn
                color='second'
                size="small"
                variant="elevated"
                href="https://github.com/microsoft/TypeScript"
                target="_blank">
                GitHub
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
