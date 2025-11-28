<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const basicUseRefSnippet = `
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Доступ к DOM-элементу
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// useRef создает объект { current: null }
// React автоматически присваивает DOM-элемент в ref.current
`

const mutableValueSnippet = `
import { useRef, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    // Сохраняем ID интервала без ререндера
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stopTimer = () => {
    // Используем сохраненный ID
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Ключевое отличие: изменение ref.current НЕ вызывает ререндер!
`

const previousValueSnippet = `
import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    // Обновляем ref после рендера
    ref.current = value;
  }, [value]);

  // Возвращаем предыдущее значение (до обновления)
  return ref.current;
}

function Counter({ count }) {
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <p>Changed by: {count - (prevCount || 0)}</p>
    </div>
  );
}

// ref сохраняет значение между рендерами
// но обновляется ПОСЛЕ рендера в useEffect
`

const instanceVariablesSnippet = `
import { useRef, useState } from 'react';

function VideoPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Экземплярные переменные — данные, которые не должны вызывать ререндер
  const playbackRateRef = useRef(1.0);
  const lastPositionRef = useRef(0);

  const handlePlay = () => {
    const video = videoRef.current;
    video.playbackRate = playbackRateRef.current;
    video.currentTime = lastPositionRef.current;
    video.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    const video = videoRef.current;
    lastPositionRef.current = video.currentTime;
    video.pause();
    setIsPlaying(false);
  };

  const changeSpeed = (rate) => {
    playbackRateRef.current = rate;
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  return (
    <div>
      <video ref={videoRef} src={src} />
      <button onClick={isPlaying ? handlePause : handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => changeSpeed(1.5)}>1.5x</button>
      <button onClick={() => changeSpeed(2.0)}>2.0x</button>
    </div>
  );
}

// playbackRateRef и lastPositionRef — это как поля класса
// Их изменение не вызывает ререндер, но значения сохраняются
`

const forwardRefBasicSnippet = `
import { forwardRef, useRef } from 'react';

// ❌ Без forwardRef - не работает
function Input({ placeholder }) {
  return <input placeholder={placeholder} />;
}

// ✅ С forwardRef - работает
const InputWithRef = forwardRef((props, ref) => {
  return <input ref={ref} placeholder={props.placeholder} />;
});

// Использование
function Form() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <InputWithRef ref={inputRef} placeholder="Enter text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// forwardRef позволяет пробросить ref через компонент
// Без него React игнорирует prop "ref"
`

const forwardRefComplexSnippet = `
import { forwardRef, useRef, useImperativeHandle } from 'react';

// Сложный компонент с внутренней логикой
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  // Определяем, какие методы доступны через ref
  useImperativeHandle(ref, () => ({
    // Публичный API компонента
    focus: () => {
      inputRef.current.focus();
    },
    scrollIntoView: () => {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
    },
    getValue: () => value,
    setValue: (newValue) => setValue(newValue),
    clear: () => setValue('')
  }));

  return (
    <div className="fancy-input">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  );
});

// Использование
function App() {
  const fancyInputRef = useRef(null);

  const handleFocus = () => {
    fancyInputRef.current.focus();
  };

  const handleClear = () => {
    fancyInputRef.current.clear();
  };

  const handleGetValue = () => {
    console.log(fancyInputRef.current.getValue());
  };

  return (
    <div>
      <FancyInput ref={fancyInputRef} placeholder="Type here" />
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}

// useImperativeHandle позволяет контролировать,
// что именно доступно через ref (инкапсуляция)
`

const controlledRefSnippet = `
import { useState } from 'react';

// Управляемый компонент (Controlled Component)
function ControlledInput() {
  const [value, setValue] = useState('');

  // React контролирует значение через state
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// "Управляемый ref" - значение синхронизировано с state
function ControlledRefExample() {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);

    // Ref также обновляется, но через state
    console.log('Current input:', inputRef.current.value);
  };

  return (
    <input
      ref={inputRef}
      value={text}
      onChange={handleChange}
    />
  );
}

// Преимущества:
// - Полный контроль над значением
// - Валидация в реальном времени
// - Легко интегрируется с формами
`

const uncontrolledRefSnippet = `
import { useRef } from 'react';

// Неконтролируемый компонент (Uncontrolled Component)
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Значение читается из DOM при необходимости
    console.log('Submitted:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="Initial" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Неконтролируемый компонент с ref - DOM сам управляет значением
function FileUpload() {
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      console.log('Uploading:', file.name);
      // Загрузка файла...
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// Преимущества:
// - Меньше кода
// - Лучше для файлов, медиа
// - Проще для больших форм
// - Ближе к нативному HTML
`

const comparisonSnippet = `
import { useState, useRef } from 'react';

// Сравнение подходов

// 1. Управляемый (Controlled)
function ControlledForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Данные уже в state
    console.log({ username, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// 2. Неконтролируемый (Uncontrolled)
function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Читаем из DOM при submit
    console.log({
      username: usernameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} defaultValue="" placeholder="Username" />
      <input ref={emailRef} defaultValue="" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// 3. Гибридный подход
function HybridForm() {
  const [username, setUsername] = useState('');
  const fileInputRef = useRef(null); // Файлы — всегда неконтролируемые

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username, // из state
      file: fileInputRef.current.files[0] // из ref
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input type="file" ref={fileInputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
`

const callbackRefSnippet = `
import { useState, useCallback } from 'react';

// Callback Ref - альтернатива useRef
function MeasureElement() {
  const [height, setHeight] = useState(0);

  // Callback вызывается при монтировании/размонтировании
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <h1 ref={measuredRef}>Hello, world</h1>
      <p>Height: {height}px</p>
    </div>
  );
}

// Динамический callback ref
function DynamicRef() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const itemRefs = useRef(new Map());

  const scrollToItem = (index) => {
    const node = itemRefs.current.get(index);
    node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(node) => {
            if (node) {
              itemRefs.current.set(index, node);
            } else {
              itemRefs.current.delete(index);
            }
          }}
        >
          {item}
        </div>
      ))}
      <button onClick={() => scrollToItem(1)}>Scroll to Item 2</button>
    </div>
  );
}

// Callback ref позволяет реагировать на изменения DOM
// useRef не вызывает колбэк при изменении
`

const refArraySnippet = `
import { useRef } from 'react';

// Массив refs для динамических списков
function TodoList({ todos }) {
  const todoRefs = useRef([]);

  const focusTodo = (index) => {
    todoRefs.current[index]?.focus();
  };

  return (
    <div>
      {todos.map((todo, index) => (
        <input
          key={todo.id}
          ref={(el) => todoRefs.current[index] = el}
          defaultValue={todo.text}
        />
      ))}
      <button onClick={() => focusTodo(0)}>Focus First</button>
    </div>
  );
}

// Лучше: Map для динамических списков
function BetterTodoList({ todos }) {
  const todoRefs = useRef(new Map());

  const focusTodo = (id) => {
    todoRefs.current.get(id)?.focus();
  };

  return (
    <div>
      {todos.map((todo) => (
        <input
          key={todo.id}
          ref={(node) => {
            if (node) {
              todoRefs.current.set(todo.id, node);
            } else {
              todoRefs.current.delete(todo.id);
            }
          }}
          defaultValue={todo.text}
        />
      ))}
      <button onClick={() => focusTodo(todos[0]?.id)}>Focus First</button>
    </div>
  );
}
`

const antiPatternsSnippet = `
import { useRef, useEffect, useState } from 'react';

// ❌ АНТИПАТТЕРНЫ

// 1. Изменение ref в рендере
function BadComponent1() {
  const countRef = useRef(0);

  // ❌ НЕ ДЕЛАТЬ: изменение ref в рендере
  countRef.current += 1;

  return <div>Render count: {countRef.current}</div>;
}

// ✅ Правильно: изменение в useEffect
function GoodComponent1() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  });

  return <div>Render count: {countRef.current}</div>;
}

// 2. Использование ref как замена state
function BadComponent2() {
  const valueRef = useRef(0);

  // ❌ НЕ ДЕЛАТЬ: ref не вызывает ререндер
  const increment = () => {
    valueRef.current += 1;
    // UI не обновится!
  };

  return (
    <div>
      <p>Value: {valueRef.current}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// ✅ Правильно: используйте state для UI
function GoodComponent2() {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(v => v + 1);
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// 3. Доступ к ref.current в рендере
function BadComponent3() {
  const inputRef = useRef(null);

  // ❌ НЕ ДЕЛАТЬ: ref.current может быть null
  const value = inputRef.current?.value || '';

  return <input ref={inputRef} />;
}

// ✅ Правильно: доступ в обработчиках/useEffect
function GoodComponent3() {
  const inputRef = useRef(null);

  const handleClick = () => {
    const value = inputRef.current?.value || '';
    console.log(value);
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Get Value</button>
    </div>
  );
}
`

const advancedPatternsSnippet = `
import { useRef, useEffect, useCallback, useState } from 'react';

// Продвинутые паттерны с ref

// 1. Debounced ref
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 2. Intersection Observer с ref
function useIntersectionObserver(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const current = targetRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
}

// 3. Resize Observer с ref
function useResizeObserver() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    const current = targetRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return [targetRef, size];
}

// 4. Мемоизация функции с актуальными значениями
function useEventCallback(fn) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args) => {
    const fn = ref.current;
    return fn(...args);
  }, []);
}

// Использование
function ChatRoom({ roomId, serverUrl }) {
  const [message, setMessage] = useState('');

  const sendMessage = useEventCallback(() => {
    // Всегда актуальные значения без добавления в deps
    fetch(\`\${serverUrl}/rooms/\${roomId}/messages\`, {
      method: 'POST',
      body: JSON.stringify({ text: message })
    });
  });

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
`

const highlightedBasicUseRef = ref('')
const highlightedMutableValue = ref('')
const highlightedPreviousValue = ref('')
const highlightedInstanceVariables = ref('')
const highlightedForwardRefBasic = ref('')
const highlightedForwardRefComplex = ref('')
const highlightedControlledRef = ref('')
const highlightedUncontrolledRef = ref('')
const highlightedComparison = ref('')
const highlightedCallbackRef = ref('')
const highlightedRefArray = ref('')
const highlightedAntiPatterns = ref('')
const highlightedAdvancedPatterns = ref('')

onMounted(() => {
  highlightedBasicUseRef.value = Prism.highlight(basicUseRefSnippet, Prism.languages.jsx, 'jsx')
  highlightedMutableValue.value = Prism.highlight(mutableValueSnippet, Prism.languages.jsx, 'jsx')
  highlightedPreviousValue.value = Prism.highlight(previousValueSnippet, Prism.languages.jsx, 'jsx')
  highlightedInstanceVariables.value = Prism.highlight(instanceVariablesSnippet, Prism.languages.jsx, 'jsx')
  highlightedForwardRefBasic.value = Prism.highlight(forwardRefBasicSnippet, Prism.languages.jsx, 'jsx')
  highlightedForwardRefComplex.value = Prism.highlight(forwardRefComplexSnippet, Prism.languages.jsx, 'jsx')
  highlightedControlledRef.value = Prism.highlight(controlledRefSnippet, Prism.languages.jsx, 'jsx')
  highlightedUncontrolledRef.value = Prism.highlight(uncontrolledRefSnippet, Prism.languages.jsx, 'jsx')
  highlightedComparison.value = Prism.highlight(comparisonSnippet, Prism.languages.jsx, 'jsx')
  highlightedCallbackRef.value = Prism.highlight(callbackRefSnippet, Prism.languages.jsx, 'jsx')
  highlightedRefArray.value = Prism.highlight(refArraySnippet, Prism.languages.jsx, 'jsx')
  highlightedAntiPatterns.value = Prism.highlight(antiPatternsSnippet, Prism.languages.jsx, 'jsx')
  highlightedAdvancedPatterns.value = Prism.highlight(advancedPatternsSnippet, Prism.languages.jsx, 'jsx')
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              Ref и ForwardRef в React
            </h1>

            <p class="font-weight-regular mb-6">
              <b>useRef</b> — это хук React для создания изменяемых значений, которые сохраняются между рендерами
              и не вызывают ререндер при изменении. <b>forwardRef</b> позволяет пробрасывать refs через компоненты.
              Понимание управляемых и неконтролируемых компонентов критично для работы с формами и DOM.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">useRef: базовое использование с DOM</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicUseRef"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Основной сценарий: изменяемые значения без ререндера</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>Ключевое отличие useRef от useState:</strong> изменение <code>ref.current</code> НЕ вызывает ререндер компонента!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedMutableValue"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сценарий 2: Сохранение предыдущего значения</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPreviousValue"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сценарий 3: Экземплярные переменные (Instance Variables)</h2>
            <p class="font-weight-regular mb-4">
              Ref идеален для данных, которые должны сохраняться между рендерами, но не влияют на UI:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedInstanceVariables"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Когда использовать useRef?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">✅ Используйте useRef</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Доступ к DOM-элементам</li>
                    <li>Хранение таймеров/интервалов</li>
                    <li>Сохранение предыдущих значений</li>
                    <li>Мутабельные данные без ререндера</li>
                    <li>Кэширование дорогих вычислений</li>
                    <li>Ссылки на внешние библиотеки</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="error" class="mr-2">mdi-close-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">❌ НЕ используйте useRef</h3>
                  </div>
                  <ul class="pl-4">
                    <li>Для данных, влияющих на UI (используйте useState)</li>
                    <li>Для изменения ref в рендере</li>
                    <li>Как замену props/state</li>
                    <li>Для синхронных вычислений в рендере</li>
                    <li>Вместо useCallback/useMemo</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">forwardRef: Проброс refs через компоненты</h2>
            <v-alert color="warning" class="mb-4">
              <v-icon class="mr-2">mdi-alert</v-icon>
              <strong>Проблема:</strong> React игнорирует prop <code>ref</code> в обычных компонентах. forwardRef решает эту проблему.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedForwardRefBasic"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">forwardRef с useImperativeHandle</h2>
            <p class="font-weight-regular mb-4">
              <b>useImperativeHandle</b> позволяет контролировать, какой API доступен через ref (инкапсуляция):
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedForwardRefComplex"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Преимущества forwardRef</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Преимущество</th>
                <th class="text-left font-weight-bold">Описание</th>
                <th class="text-left font-weight-bold">Пример использования</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td class="pt-2 pb-2"><b>Переиспользуемость</b></td>
                <td class="pt-2 pb-2">Компоненты с ref можно использовать везде</td>
                <td class="pt-2 pb-2">UI библиотеки, дизайн-системы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Инкапсуляция</b></td>
                <td class="pt-2 pb-2">Контроль над публичным API через useImperativeHandle</td>
                <td class="pt-2 pb-2">Сложные компоненты с внутренней логикой</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Композиция</b></td>
                <td class="pt-2 pb-2">Легко комбинировать компоненты с refs</td>
                <td class="pt-2 pb-2">Формы, модальные окна, тултипы</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Императивный API</b></td>
                <td class="pt-2 pb-2">Возможность вызова методов компонента</td>
                <td class="pt-2 pb-2">focus(), scrollIntoView(), play()</td>
              </tr>
              <tr>
                <td class="pt-2 pb-2"><b>Интеграция</b></td>
                <td class="pt-2 pb-2">Работа со сторонними библиотеками</td>
                <td class="pt-2 pb-2">D3.js, Chart.js, видеоплееры</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Управляемые (Controlled) refs</h2>
            <p class="font-weight-regular mb-4">
              В управляемых компонентах <b>React контролирует значение через state</b>. Каждое изменение вызывает ререндер:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedControlledRef"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Неконтролируемые (Uncontrolled) refs</h2>
            <p class="font-weight-regular mb-4">
              В неконтролируемых компонентах <b>DOM сам управляет значением</b>. React читает его при необходимости:
            </p>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedUncontrolledRef"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнение подходов</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedComparison"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Controlled vs Uncontrolled: Когда что использовать?</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Controlled (Управляемые)</h3>
                  <p class="text-white mb-2"><b>Используйте когда нужно:</b></p>
                  <ul class="text-white pl-4">
                    <li>Валидация в реальном времени</li>
                    <li>Динамическое изменение значений</li>
                    <li>Условный рендеринг на основе значений</li>
                    <li>Синхронизация нескольких полей</li>
                    <li>Форматирование ввода</li>
                    <li>Отключение кнопки submit</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-info">
                  <h3 class="text-h6 font-weight-bold text-white mb-2">✅ Uncontrolled (Неконтролируемые)</h3>
                  <p class="text-white mb-2"><b>Используйте когда нужно:</b></p>
                  <ul class="text-white pl-4">
                    <li>Простые формы без валидации</li>
                    <li>Загрузка файлов (всегда uncontrolled)</li>
                    <li>Интеграция с не-React кодом</li>
                    <li>Большие формы (производительность)</li>
                    <li>Редко изменяемые значения</li>
                    <li>Минимум JavaScript кода</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Callback Ref — альтернатива useRef</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedCallbackRef"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Массивы refs для динамических списков</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedRefArray"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">❌ Антипаттерны с useRef</h2>
            <v-alert color="error" class="mb-4">
              <v-icon class="mr-2">mdi-alert-octagon</v-icon>
              <strong>Важно:</strong> Избегайте этих распространенных ошибок при работе с refs!
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAntiPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Продвинутые паттерны с ref</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedAdvancedPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Какой основной сценарий использования useRef, кроме DOM?</p>
                <p class="font-weight-regular ma-0">
                  Хранение изменяемых значений, которые не должны вызывать ререндер: таймеры, предыдущие значения,
                  экземплярные переменные, кэш, ссылки на внешние библиотеки. Ref — это как поле класса в классовых компонентах.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем преимущества forwardRef?</p>
                <p class="font-weight-regular ma-0">
                  forwardRef позволяет пробросить ref через компонент, делая его переиспользуемым.
                  С useImperativeHandle можно контролировать публичный API, создавая инкапсулированные компоненты
                  с императивным интерфейсом (focus, scrollTo, play и т.д.).
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое управляемый и неконтролируемый ref?</p>
                <p class="font-weight-regular ma-0">
                  <b>Управляемый (controlled):</b> React контролирует значение через state, каждое изменение проходит через onChange.
                  <b>Неконтролируемый (uncontrolled):</b> DOM управляет значением, React читает его через ref при необходимости.
                  Выбор зависит от сложности формы и требований к валидации.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда нельзя использовать ref?</p>
                <p class="font-weight-regular ma-0">
                  Нельзя изменять ref.current в рендере (только в useEffect/обработчиках).
                  Нельзя использовать ref вместо state для данных, влияющих на UI.
                  Нельзя полагаться на ref.current в рендере — он может быть null.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между useRef и callback ref?</p>
                <p class="font-weight-regular ma-0">
                  useRef возвращает объект {current: value}, который не вызывает колбэк при изменении.
                  Callback ref — это функция, которая вызывается при монтировании/размонтировании элемента,
                  что позволяет реагировать на изменения DOM.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работать с массивом refs?</p>
                <p class="font-weight-regular ma-0">
                  Для динамических списков используйте Map вместо массива: ref={(node) => map.set(id, node)}.
                  Это обеспечивает правильное добавление/удаление элементов при изменении списка.
                  Не забывайте очищать Map при размонтировании.
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
                    <li>Изменять ref только в useEffect/обработчиках</li>
                    <li>Использовать state для данных UI</li>
                    <li>Проверять ref.current на null</li>
                    <li>forwardRef для переиспользуемых компонентов</li>
                    <li>useImperativeHandle для инкапсуляции</li>
                    <li>Callback ref для реакции на DOM</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Изменение ref в рендере</li>
                    <li>ref вместо state для UI</li>
                    <li>Доступ к ref.current в рендере</li>
                    <li>Прямая манипуляция DOM без нужды</li>
                    <li>Забывать о null в ref.current</li>
                    <li>Сложные вычисления в callback ref</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>TypeScript для типизации refs</li>
                    <li>Map для динамических списков</li>
                    <li>Controlled для сложных форм</li>
                    <li>Uncontrolled для файлов</li>
                    <li>Комбинируйте подходы</li>
                    <li>Документируйте императивный API</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>useRef</b> — мощный инструмент для работы с изменяемыми значениями без ререндера, доступа к DOM
              и хранения экземплярных переменных. <b>forwardRef</b> позволяет создавать переиспользуемые компоненты
              с контролируемым API через useImperativeHandle. <b>Управляемые компоненты</b> дают полный контроль через state,
              <b>неконтролируемые</b> — простоту через ref. Понимание этих концепций критично для профессиональной разработки на React.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/useRef"
                target="_blank"
                class="mr-2">
                React Docs: useRef
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://react.dev/reference/react/forwardRef"
                target="_blank">
                React Docs: forwardRef
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
