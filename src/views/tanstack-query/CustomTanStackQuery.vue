<script setup lang="ts">
import { onMounted, ref } from "vue"
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

// --- 1. Контекст кэша ---
const snippetContext = `
// CacheContext.jsx
import { createContext, useContext, useRef, useState, useCallback } from 'react';

// Структура записи в кэше:
// {
//   data: any,           — полученные данные
//   status: 'loading' | 'success' | 'error',
//   error: Error | null,
//   updatedAt: number,   — timestamp последнего обновления
// }

const CacheContext = createContext(null);

export function CacheProvider({ children }) {
  // useRef: кэш не вызывает ре-рендер провайдера при обновлении
  const cache = useRef({});

  // subscribers: Map<cacheKey, Set<() => void>>
  // Каждый useCustomQuery подписывается, чтобы получать уведомления
  const subscribers = useRef({});

  const getEntry = useCallback((key) => {
    return cache.current[key] ?? null;
  }, []);

  const setEntry = useCallback((key, entry) => {
    cache.current[key] = entry;

    // Уведомляем всех подписчиков этого ключа
    subscribers.current[key]?.forEach(notify => notify());
  }, []);

  const subscribe = useCallback((key, callback) => {
    if (!subscribers.current[key]) {
      subscribers.current[key] = new Set();
    }
    subscribers.current[key].add(callback);

    // Возвращаем функцию отписки
    return () => {
      subscribers.current[key].delete(callback);
    };
  }, []);

  return (
    <CacheContext.Provider value={{ getEntry, setEntry, subscribe }}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const ctx = useContext(CacheContext);
  if (!ctx) throw new Error('useCache must be used inside CacheProvider');
  return ctx;
}
`

// --- 2. Хук useCustomQuery ---
const snippetHook = `
// useCustomQuery.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCache } from './CacheContext';

const DEFAULT_STALE_TIME = 0; // 0 = данные сразу считаются устаревшими

export function useCustomQuery({ queryKey, queryFn, staleTime = DEFAULT_STALE_TIME }) {
  // Стабильный строковый ключ: ['users', 1] → 'users|1'
  const cacheKey = queryKey.join('|');

  const { getEntry, setEntry, subscribe } = useCache();

  // Локальный стейт — просто для того, чтобы форсировать ре-рендер
  // при изменении кэша. Само состояние живёт в CacheContext.
  const [, forceUpdate] = useState(0);

  // Ref нужен, чтобы функция fetch не пересоздавалась при каждом рендере
  // но при этом всегда имела актуальный cacheKey
  const cacheKeyRef = useRef(cacheKey);
  cacheKeyRef.current = cacheKey;

  const fetchData = useCallback(async () => {
    const key = cacheKeyRef.current;
    const existing = getEntry(key);

    // Пропускаем запрос, если данные свежие (в пределах staleTime)
    const isStale = !existing?.updatedAt
      || Date.now() - existing.updatedAt > staleTime;

    if (existing?.status === 'success' && !isStale) {
      return; // Отдаём кэш как есть
    }

    // Не дублируем запрос, если он уже выполняется
    if (existing?.status === 'loading') {
      return;
    }

    setEntry(key, { ...existing, status: 'loading', error: null });

    try {
      const data = await queryFn();
      setEntry(key, {
        data,
        status: 'success',
        error: null,
        updatedAt: Date.now(),
      });
    } catch (error) {
      setEntry(key, {
        data: existing?.data ?? null,
        status: 'error',
        error,
        updatedAt: existing?.updatedAt ?? null,
      });
    }
  }, [cacheKey, queryFn, staleTime, getEntry, setEntry]);

  useEffect(() => {
    // Подписываемся на обновления кэша для этого ключа
    const unsubscribe = subscribe(cacheKey, () => {
      forceUpdate(n => n + 1);
    });

    // Запускаем запрос при монтировании / смене ключа
    fetchData();

    return unsubscribe;
  }, [cacheKey, fetchData, subscribe]);

  const entry = getEntry(cacheKey);

  return {
    data:      entry?.data    ?? null,
    isLoading: entry?.status === 'loading',
    isError:   entry?.status === 'error',
    error:     entry?.error   ?? null,
    refetch:   fetchData,
  };
}
`

// --- 3. Дедупликация ---
const snippetDedup = `
// Проблема: два компонента монтируются одновременно
// и оба вызывают useCustomQuery с одним ключом.
// Без защиты — два параллельных HTTP-запроса.

// Решение: глобальный Map "в полёте"
// Ключ → Promise (один и тот же для всех подписчиков)

// QueryClient.js — минимальная реализация
export class QueryClient {
  constructor() {
    this._cache    = {};          // { key: CacheEntry }
    this._promises = {};          // { key: Promise }   — дедупликация
    this._subs     = {};          // { key: Set<fn> }    — подписчики
  }

  async fetchQuery(key, queryFn, staleTime = 0) {
    const existing = this._cache[key];
    const isStale  = !existing?.updatedAt
      || Date.now() - existing.updatedAt > staleTime;

    if (existing?.status === 'success' && !isStale) {
      return existing.data;  // Свежий кэш — возвращаем сразу
    }

    // Если запрос уже идёт — возвращаем тот же Promise
    if (this._promises[key]) {
      return this._promises[key];
    }

    this._notify(key, { ...existing, status: 'loading' });

    this._promises[key] = queryFn()
      .then(data => {
        this._cache[key] = { data, status: 'success', error: null, updatedAt: Date.now() };
        this._notify(key, this._cache[key]);
        return data;
      })
      .catch(error => {
        this._cache[key] = { ...existing, status: 'error', error };
        this._notify(key, this._cache[key]);
        throw error;
      })
      .finally(() => {
        delete this._promises[key]; // Запрос завершён — чистим
      });

    return this._promises[key];
  }

  _notify(key, entry) {
    this._cache[key] = entry;
    this._subs[key]?.forEach(fn => fn(entry));
  }

  subscribe(key, fn) {
    if (!this._subs[key]) this._subs[key] = new Set();
    this._subs[key].add(fn);
    return () => this._subs[key].delete(fn);
  }

  getEntry(key) {
    return this._cache[key] ?? null;
  }
}
`

// --- 4. staleTime и ревалидация ---
const snippetStaleTime = `
// Две стратегии ревалидации:

// Стратегия 1: при фокусе окна (как в TanStack Query по умолчанию)
useEffect(() => {
  const handleFocus = () => {
    const entry = getEntry(cacheKey);
    const isStale = !entry?.updatedAt
      || Date.now() - entry.updatedAt > staleTime;

    if (isStale) {
      fetchData();
    }
  };

  window.addEventListener('focus', handleFocus);
  return () => window.removeEventListener('focus', handleFocus);
}, [cacheKey, staleTime]);

// Стратегия 2: фоновый интервал (аналог refetchInterval)
useEffect(() => {
  if (!refetchInterval) return;

  const id = setInterval(() => {
    fetchData();
  }, refetchInterval);

  return () => clearInterval(id);
}, [refetchInterval, fetchData]);

// Как staleTime влияет на поведение:
//
// staleTime: 0        — каждый mount триггерит запрос (данные сразу устарели)
// staleTime: 5000     — 5 секунд данные считаются свежими
// staleTime: Infinity — кэш никогда не устаревает (только ручной refetch)
//
// Разница с gcTime (cacheTime в старых версиях):
// staleTime — когда данные считаются устаревшими (нужен новый запрос)
// gcTime    — когда данные удаляются из кэша (нет подписчиков + таймер)
`

// --- 5. Полный пример приложения ---
const snippetApp = `
// ===== Полная сборка для выполнения заданий =====

// 1. CacheContext.jsx (задание 1)
import { createContext, useContext, useRef, useState, useCallback } from 'react';

const CacheContext = createContext(null);

export function CacheProvider({ children }) {
  const cache       = useRef({});
  const subscribers = useRef({});

  const getEntry = useCallback((key) => cache.current[key] ?? null, []);

  const setEntry = useCallback((key, entry) => {
    cache.current[key] = entry;
    subscribers.current[key]?.forEach(fn => fn());
  }, []);

  const subscribe = useCallback((key, fn) => {
    if (!subscribers.current[key]) subscribers.current[key] = new Set();
    subscribers.current[key].add(fn);
    return () => subscribers.current[key].delete(fn);
  }, []);

  return (
    <CacheContext.Provider value={{ getEntry, setEntry, subscribe }}>
      {children}
    </CacheContext.Provider>
  );
}

export const useCache = () => useContext(CacheContext);

// 2. useCustomQuery.js (задания 2, 3, 6)
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCache } from './CacheContext';

export function useCustomQuery({ queryKey, queryFn, staleTime = 0 }) {
  const cacheKey    = Array.isArray(queryKey) ? queryKey.join('|') : queryKey;
  const { getEntry, setEntry, subscribe } = useCache();
  const [, forceUpdate] = useState(0);
  const keyRef = useRef(cacheKey);
  keyRef.current = cacheKey;

  const fetchData = useCallback(async () => {
    const key      = keyRef.current;
    const existing = getEntry(key);
    const isStale  = !existing?.updatedAt
      || Date.now() - existing.updatedAt > staleTime;

    if (existing?.status === 'success' && !isStale) return;
    if (existing?.status === 'loading') return;

    setEntry(key, { ...existing, status: 'loading', error: null });

    try {
      const data = await queryFn();
      setEntry(key, { data, status: 'success', error: null, updatedAt: Date.now() });
    } catch (error) {
      setEntry(key, { data: existing?.data ?? null, status: 'error', error, updatedAt: existing?.updatedAt ?? null });
    }
  }, [cacheKey, queryFn, staleTime, getEntry, setEntry]);

  useEffect(() => {
    const unsub = subscribe(cacheKey, () => forceUpdate(n => n + 1));
    fetchData();
    return unsub;
  }, [cacheKey, fetchData, subscribe]);

  // Ревалидация по фокусу окна (задание 6)
  useEffect(() => {
    const onFocus = () => {
      const entry   = getEntry(cacheKey);
      const isStale = !entry?.updatedAt || Date.now() - entry.updatedAt > staleTime;
      if (isStale) fetchData();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [cacheKey, staleTime, fetchData, getEntry]);

  const entry = getEntry(cacheKey);
  return {
    data:      entry?.data    ?? null,
    isLoading: entry?.status === 'loading',
    isError:   entry?.status === 'error',
    error:     entry?.error   ?? null,
    refetch:   fetchData,
  };
}

// 3. App.jsx — два компонента, один кэш (задания 4, 5)
import { CacheProvider } from './CacheContext';
import { useCustomQuery } from './useCustomQuery';

const fetchUsers = () =>
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(r => r.json());

// Компонент А — список пользователей
function UserList() {
  const { data, isLoading, isError } = useCustomQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 30_000, // 30 секунд
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError)   return <p>Ошибка загрузки</p>;

  return (
    <ul>
      {data?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// Компонент Б — счётчик пользователей
// Использует тот же ключ ['users'] → получает данные из кэша
function UserCount() {
  const { data, isLoading } = useCustomQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 30_000,
  });

  if (isLoading) return <p>...</p>;

  return <p>Всего пользователей: {data?.length ?? 0}</p>;
}

// CacheProvider оборачивает всё приложение
export default function App() {
  return (
    <CacheProvider>
      <h1>My App</h1>
      <UserCount />
      <UserList />
    </CacheProvider>
  );
}
`

const snippets = {
  context:   ref(''),
  hook:      ref(''),
  dedup:     ref(''),
  staleTime: ref(''),
  app:       ref(''),
}

onMounted(() => {
  const lang = Prism.languages.javascript
  snippets.context.value   = Prism.highlight(snippetContext,   lang, 'javascript')
  snippets.hook.value      = Prism.highlight(snippetHook,      lang, 'javascript')
  snippets.dedup.value     = Prism.highlight(snippetDedup,     lang, 'javascript')
  snippets.staleTime.value = Prism.highlight(snippetStaleTime, lang, 'javascript')
  snippets.app.value       = Prism.highlight(snippetApp,       lang, 'javascript')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="8">

            <h1 class="text-h4 font-weight-bold mb-4">Реализуем свой React Query</h1>
            <p class="mb-8">
              Прежде чем изучать TanStack Query, полезно собрать его уменьшенную копию вручную.
              Это закрепляет три фундаментальные темы React: пользовательские хуки, React Context API
              и управление асинхронным состоянием. Статья построена так, чтобы после её прочтения
              вы могли выполнить все шесть практических заданий.
            </p>

            <!-- ─── Архитектура ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">Из чего состоит React Query</h2>
            <p class="mb-4">
              На высоком уровне любая query-библиотека — это три вещи, работающие вместе:
              <b>глобальное хранилище кэша</b>, <b>хук для подписки на запрос</b>
              и <b>механизм оповещения</b> компонентов об изменениях.
            </p>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Слой</th>
                <th class="text-left font-weight-bold">Инструмент React</th>
                <th class="text-left font-weight-bold">Что делает</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Хранилище кэша</b></td>
                <td class="pt-2 pb-2">Context + useRef</td>
                <td class="pt-2 pb-2">Хранит данные всех запросов глобально</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Подписка</b></td>
                <td class="pt-2 pb-2">useEffect + Set</td>
                <td class="pt-2 pb-2">Компонент регистрируется как наблюдатель кэша</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Публичный API</b></td>
                <td class="pt-2 pb-2">Кастомный хук</td>
                <td class="pt-2 pb-2">data / isLoading / isError / refetch</td>
              </tr>
              </tbody>
            </v-table>

            <!-- ─── Context ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">1. CacheContext — глобальное хранилище</h2>
            <p class="mb-3">
              Центральная идея: кэш должен быть <b>глобальным</b> и <b>единым</b>. Если два компонента
              запрашивают данные по одному ключу, они должны работать с одним и тем же объектом в памяти,
              а не хранить каждый свою копию.
            </p>
            <p class="mb-3">
              React Context — стандартный способ сделать любое значение доступным во всём дереве
              без prop drilling. Мы кладём в него не данные напрямую, а <b>методы управления кэшем</b>:
              <code>getEntry</code>, <code>setEntry</code> и <code>subscribe</code>.
            </p>
            <p class="mb-3">
              Почему <code>useRef</code>, а не <code>useState</code> для хранения самого кэша?
              Потому что изменение кэша не должно вызывать ре-рендер <b>провайдера</b> — только
              тех компонентов, которые подписались на конкретный ключ. Это важно для производительности.
            </p>

            <v-card class="pa-4 mb-4" color="blue-grey-lighten-5">
              <p class="mb-0">
                <b>Паттерн Observer:</b> каждый вызов <code>useCustomQuery</code> — это подписчик.
                При изменении записи в кэше <code>setEntry</code> обходит Set подписчиков
                и вызывает каждую notify-функцию, которая форсирует ре-рендер именно того компонента,
                которому нужны новые данные.
              </p>
            </v-card>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.context.value"></code></pre>

            <!-- ─── queryKey ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">2. queryKey — идентификатор запроса</h2>
            <p class="mb-3">
              <b>queryKey</b> — это массив, который однозначно описывает запрос. Ключ сериализуется
              в строку и становится ключом в объекте кэша. Массив используется намеренно:
              он позволяет строить иерархические ключи и инвалидировать целые группы.
            </p>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">queryKey</th>
                <th class="text-left font-weight-bold">Строковый ключ</th>
                <th class="text-left font-weight-bold">Когда используется</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><code>['users']</code></td>
                <td class="pt-2 pb-2"><code>'users'</code></td>
                <td class="pt-2 pb-2">Список всех пользователей</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>['users', 42]</code></td>
                <td class="pt-2 pb-2"><code>'users|42'</code></td>
                <td class="pt-2 pb-2">Конкретный пользователь</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><code>['users', 42, 'posts']</code></td>
                <td class="pt-2 pb-2"><code>'users|42|posts'</code></td>
                <td class="pt-2 pb-2">Посты конкретного пользователя</td>
              </tr>
              </tbody>
            </v-table>

            <!-- ─── Hook ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">3. useCustomQuery — хук для компонентов</h2>
            <p class="mb-3">
              Хук — единственная точка контакта компонента с кэшем. Компонент ничего не знает
              о Context внутри хука — он просто получает <code>{ data, isLoading, isError, refetch }</code>.
            </p>
            <p class="mb-3">
              Внутри хука происходит три вещи при монтировании: подписка на изменения кэша,
              запуск <code>fetchData</code> и возврат текущего состояния из кэша.
              При размонтировании — отписка, чтобы не было утечек памяти.
            </p>
            <p class="mb-3">
              Локальный <code>useState</code> (<code>forceUpdate</code>) здесь используется
              исключительно как <b>триггер ре-рендера</b>. Само состояние хранится в кэше,
              а не в компоненте — именно поэтому два компонента с одним ключом всегда синхронны.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.hook.value"></code></pre>

            <!-- ─── Дедупликация ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">4. Дедупликация запросов</h2>
            <p class="mb-3">
              Представьте: два компонента монтируются одновременно с одним <code>queryKey</code>.
              Без дополнительной защиты оба вызовут <code>queryFn</code> и уйдут на сервер.
              Это избыточно и в нашей реализации уже частично решено: проверка
              <code>status === 'loading'</code> в <code>fetchData</code> останавливает дублирующий вызов.
            </p>
            <p class="mb-3">
              Более надёжный способ — хранить сам Promise в отдельном Map. Тогда второй вызов
              получает ссылку на уже существующий Promise и просто ждёт его завершения.
              Ниже показана минимальная реализация <code>QueryClient</code> с этим паттерном —
              именно так устроен настоящий TanStack Query.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.dedup.value"></code></pre>

            <!-- ─── staleTime ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">5. staleTime и ревалидация</h2>
            <p class="mb-3">
              Кэш полезен только когда данные актуальны. <code>staleTime</code> отвечает на вопрос:
              <i>«через сколько миллисекунд данные считать устаревшими?»</i>.
            </p>
            <p class="mb-3">
              Ревалидация — это автоматический повторный запрос при наступлении условия.
              Самое простое условие — возврат фокуса на вкладку. Пользователь ушёл
              на другую вкладку, вернулся — данные могли устареть, пора обновить.
            </p>
            <v-card class="pa-4 mb-4" color="blue-grey-lighten-5">
              <b>Важно различать два таймера:</b> <code>staleTime</code> определяет,
              когда данные <i>устарели</i> (но остаются в кэше и показываются пользователю
              пока идёт фоновый запрос). <code>gcTime</code> (в TanStack Query) — через сколько
              после последней отписки данные <i>удаляются</i> из кэша полностью.
              В нашей реализации gcTime мы не делаем — для понимания принципов достаточно staleTime.
            </v-card>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.staleTime.value"></code></pre>

            <!-- ─── Полный пример ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">6. Полная сборка</h2>
            <p class="mb-3">
              Ниже — весь код, который нужен для выполнения заданий: контекст, хук и
              два компонента с одним <code>queryKey</code>. HTTP-запрос уходит один раз —
              <code>UserCount</code> монтируется первым и запускает fetch,
              <code>UserList</code> монтируется следом и находит <code>status: 'loading'</code>
              в кэше, поэтому ждёт уже идущего запроса. После завершения оба компонента
              получают уведомление через подписку и ре-рендерятся.
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="snippets.app.value"></code></pre>

            <!-- ─── Принципы ─── -->
            <h2 class="text-h5 font-weight-bold mb-3">Как это соотносится с TanStack Query</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Концепция</th>
                <th class="text-left font-weight-bold">Наша реализация</th>
                <th class="text-left font-weight-bold">TanStack Query</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2">Хранилище кэша</td>
                <td class="pt-2 pb-2">useRef в CacheProvider</td>
                <td class="pt-2 pb-2">QueryClient</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Передача клиента</td>
                <td class="pt-2 pb-2">CacheContext.Provider</td>
                <td class="pt-2 pb-2">QueryClientProvider</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Хук для компонентов</td>
                <td class="pt-2 pb-2">useCustomQuery</td>
                <td class="pt-2 pb-2">useQuery</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Ключ запроса</td>
                <td class="pt-2 pb-2">queryKey.join('|')</td>
                <td class="pt-2 pb-2">Стабильная сериализация (JSON)</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Оповещение</td>
                <td class="pt-2 pb-2">Set + forceUpdate</td>
                <td class="pt-2 pb-2">useSyncExternalStore</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Дедупликация</td>
                <td class="pt-2 pb-2">Проверка status loading</td>
                <td class="pt-2 pb-2">Promise Map в QueryCache</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2">Устаревание данных</td>
                <td class="pt-2 pb-2">staleTime + updatedAt</td>
                <td class="pt-2 pb-2">staleTime + dataUpdatedAt</td>
              </tr>
              </tbody>
            </v-table>

            <!-- ─── Итог ─── -->
            <v-card class="pa-6 mb-6" color="blue-grey-lighten-5">
              <h2 class="text-h6 font-weight-bold mb-3">Итог</h2>
              <p class="mb-0">
                Самодельный React Query — это Context с useRef для хранилища, паттерн Observer
                для оповещения подписчиков и кастомный хук как публичный API.
                Ключевые принципы: данные живут в одном месте (кэш), компоненты лишь подписываются,
                дедупликация происходит через проверку статуса, а staleTime управляет тем,
                когда считать данные устаревшими. Именно эти механизмы составляют ядро TanStack Query —
                библиотека добавляет к ним надёжную сериализацию ключей, garbage collection,
                optimistic updates и десятки других опций.
              </p>
            </v-card>

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
:deep(.token.comment)    { color: #6272a4; }
:deep(.token.string)     { color: #f1fa8c; }
:deep(.token.keyword)    { color: #ff79c6; }
:deep(.token.function)   { color: #50fa7b; }
:deep(.token.number)     { color: #bd93f9; }
:deep(.token.operator)   { color: #ff79c6; }
:deep(.token.punctuation){ color: #f8f8f2; }
:deep(.token.property)   { color: #66d9ef; }
:deep(.token.tag)        { color: #ff79c6; }
:deep(.token.attr-name)  { color: #50fa7b; }
:deep(.token.attr-value) { color: #f1fa8c; }
</style>
