<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-jsx.js'

const basicEventsSnippet = `
// Основы обработки событий в React

// 1. Объявление обработчика события
function Button() {
  // Функция-обработчик
  function handleClick() {
    console.log('Кнопка нажата!');
  }

  // Передача функции как пропса
  return <button onClick={handleClick}>Нажми меня</button>;
}

// 2. Inline обработчик (не рекомендуется для сложной логики)
function InlineButton() {
  return (
    <button onClick={() => console.log('Клик!')}>
      Inline обработчик
    </button>
  );
}

// 3. Обработчик с параметрами
function ButtonWithParams() {
  function handleClick(id, event) {
    console.log('ID:', id);
    console.log('Event:', event);
  }

  // Способ 1: Arrow function
  return (
    <button onClick={(e) => handleClick(42, e)}>
      С параметрами (arrow)
    </button>
  );
}

// Способ 2: bind
function ButtonWithBind() {
  function handleClick(id, event) {
    console.log('ID:', id, 'Event:', event);
  }

  return (
    <button onClick={handleClick.bind(null, 42)}>
      С параметрами (bind)
    </button>
  );
}

// 4. Множественные обработчики
function MultipleHandlers() {
  function handleMouseEnter() {
    console.log('Мышь вошла');
  }

  function handleMouseLeave() {
    console.log('Мышь вышла');
  }

  function handleClick() {
    console.log('Клик');
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Множественные события
    </button>
  );
}

// 5. Предотвращение действия по умолчанию
function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // Отменяем отправку формы
    console.log('Форма отправлена через JavaScript');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Отправить</button>
    </form>
  );
}

// 6. Остановка всплытия
function NestedButtons() {
  function handleParentClick() {
    console.log('Клик на родителе');
  }

  function handleChildClick(event) {
    event.stopPropagation(); // Останавливаем всплытие
    console.log('Клик на потомке');
  }

  return (
    <div onClick={handleParentClick}>
      Родитель
      <button onClick={handleChildClick}>
        Потомок (не всплывает)
      </button>
    </div>
  );
}
`

const syntheticEventSnippet = `
// SyntheticEvent - обертка React над нативными событиями

function EventExample() {
  function handleClick(event) {
    // event - это SyntheticEvent, а не нативное событие!
    console.log('Type:', event.type);              // "click"
    console.log('Target:', event.target);          // DOM элемент
    console.log('CurrentTarget:', event.currentTarget);
    console.log('TimeStamp:', event.timeStamp);

    // Доступ к нативному событию
    const nativeEvent = event.nativeEvent;
    console.log('Native event:', nativeEvent);

    // Методы SyntheticEvent
    event.preventDefault();    // Отменить действие по умолчанию
    event.stopPropagation();  // Остановить всплытие
    event.persist();          // Сохранить событие (для React < 17)
  }

  return <button onClick={handleClick}>Клик</button>;
}

// Структура SyntheticEvent
const syntheticEventStructure = {
  // Свойства
  bubbles: true,
  cancelable: true,
  currentTarget: null,        // Элемент с обработчиком
  defaultPrevented: false,
  eventPhase: 3,
  isTrusted: true,
  target: null,               // Элемент, вызвавший событие
  timeStamp: 0,
  type: 'click',

  // Методы
  preventDefault: function() {},
  stopPropagation: function() {},
  persist: function() {},     // Только React < 17

  // Доступ к нативному событию
  nativeEvent: null
};

// Типы событий и их интерфейсы (TypeScript)
interface SyntheticEventTypes {
  // Базовый SyntheticEvent
  onClick: React.MouseEvent<HTMLButtonElement>
  onChange: React.ChangeEvent<HTMLInputElement>
  onSubmit: React.FormEvent<HTMLFormElement>
  onKeyDown: React.KeyboardEvent<HTMLInputElement>
  onFocus: React.FocusEvent<HTMLInputElement>
  onBlur: React.FocusEvent<HTMLInputElement>
  onScroll: React.UIEvent<HTMLDivElement>
  onWheel: React.WheelEvent<HTMLDivElement>
  onDrag: React.DragEvent<HTMLDivElement>
  onDrop: React.DragEvent<HTMLDivElement>
  onTouchStart: React.TouchEvent<HTMLDivElement>
  onTouchMove: React.TouchEvent<HTMLDivElement>
  onAnimationStart: React.AnimationEvent<HTMLDivElement>
  onTransitionEnd: React.TransitionEvent<HTMLDivElement>
}

// Пример с типизацией
function TypedButton() {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // event автоматически типизирован
    console.log(event.clientX, event.clientY);
    event.preventDefault();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log('Enter нажат!');
    }
  }

  return (
    <>
      <button onClick={handleClick}>Клик</button>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
    </>
  );
}
`

const syntheticVsNativeSnippet = `
// SyntheticEvent vs Native Event - ключевые различия

// ========================================
// 1. Кроссбраузерность
// ========================================

// Native Event - различия между браузерами
const nativeButton = document.querySelector('button');
nativeButton.addEventListener('click', (event) => {
  // В IE: event.srcElement
  // В современных: event.target
  const target = event.target || event.srcElement;

  // В IE: event.cancelBubble = true
  // В современных: event.stopPropagation()
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
});

// SyntheticEvent - единый API для всех браузеров
function ReactButton() {
  function handleClick(event) {
    // Всегда одинаково во всех браузерах!
    const target = event.target;           // ✅ Всегда работает
    event.stopPropagation();               // ✅ Всегда работает
    event.preventDefault();                // ✅ Всегда работает
  }

  return <button onClick={handleClick}>Клик</button>;
}

// ========================================
// 2. Пулинг событий (Event Pooling)
// ========================================

// React < 17: События переиспользуются (pooling)
function OldReactEventPooling() {
  function handleClick(event) {
    console.log(event.type); // "click"

    // Асинхронное использование - НЕ РАБОТАЕТ в React < 17!
    setTimeout(() => {
      console.log(event.type); // null! Событие очищено
    }, 100);

    // Решение: persist() (только React < 17)
    event.persist();
    setTimeout(() => {
      console.log(event.type); // "click" - теперь работает
    }, 100);
  }

  return <button onClick={handleClick}>Клик</button>;
}

// React 17+: Пулинг убран, события не переиспользуются
function NewReactEventPooling() {
  function handleClick(event) {
    console.log(event.type); // "click"

    // Асинхронное использование - РАБОТАЕТ в React 17+!
    setTimeout(() => {
      console.log(event.type); // "click" - работает!
    }, 100);

    // persist() больше не нужен и ничего не делает
  }

  return <button onClick={handleClick}>Клик</button>;
}

// ========================================
// 3. Делегирование событий
// ========================================

// Native Events - обработчики на каждом элементе
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', handleClick); // N обработчиков
});

// React - один обработчик на корневом элементе
// React < 17: на document
// React 17+: на корневом контейнере ReactDOM.render()
function ReactEventDelegation() {
  // React автоматически делегирует события!
  // Все onClick обрабатываются одним слушателем на корне
  return (
    <div>
      <button onClick={handleClick}>Кнопка 1</button>
      <button onClick={handleClick}>Кнопка 2</button>
      <button onClick={handleClick}>Кнопка 3</button>
      {/* Только 1 настоящий addEventListener на корне! */}
    </div>
  );

  function handleClick(e) {
    console.log('Clicked:', e.target);
  }
}

// ========================================
// 4. Фазы события
// ========================================

// Native Event - стандартные фазы DOM
/*
  1. Capturing phase (погружение)
  2. Target phase (целевой элемент)
  3. Bubbling phase (всплытие)
*/

document.addEventListener('click', handler, true);  // Capturing
document.addEventListener('click', handler, false); // Bubbling

// React - по умолчанию только bubbling фаза
function BubblingExample() {
  return (
    <div onClick={() => console.log('Div')}>
      <button onClick={() => console.log('Button')}>
        Клик
      </button>
    </div>
  );
  // Порядок: "Button" -> "Div" (всплытие)
}

// React - capturing фаза с суффиксом Capture
function CapturingExample() {
  return (
    <div onClickCapture={() => console.log('Div (capture)')}>
      <button onClickCapture={() => console.log('Button (capture)')}>
        Клик
      </button>
    </div>
  );
  // Порядок: "Div (capture)" -> "Button (capture)" (погружение)
}

// Комбинация capturing и bubbling
function CombinedPhases() {
  return (
    <div
      onClickCapture={() => console.log('1. Div capture')}
      onClick={() => console.log('4. Div bubble')}
    >
      <button
        onClickCapture={() => console.log('2. Button capture')}
        onClick={() => console.log('3. Button bubble')}
      >
        Клик
      </button>
    </div>
  );
  // Порядок: 1 -> 2 -> 3 -> 4
}

// ========================================
// 5. Доступ к нативному событию
// ========================================

function AccessNativeEvent() {
  function handleClick(syntheticEvent) {
    // SyntheticEvent - обертка React
    console.log('Synthetic:', syntheticEvent);
    console.log('Type:', syntheticEvent.type);

    // Доступ к нативному событию
    const nativeEvent = syntheticEvent.nativeEvent;
    console.log('Native:', nativeEvent);

    // Нативное событие имеет дополнительные свойства
    console.log('Native pageX:', nativeEvent.pageX);
    console.log('Native path:', nativeEvent.path);

    // Некоторые свойства есть только в нативном событии
    if (nativeEvent.which) {
      console.log('Кнопка мыши:', nativeEvent.which);
    }
  }

  return <button onClick={handleClick}>Клик</button>;
}
`

const eventDelegationSnippet = `
// Делегирование событий в React

// ========================================
// Как работает делегирование в React
// ========================================

// React < 17: События делегируются на document
/*
  <div id="root">
    <button onClick={handler}>Click</button>
  </div>

  React добавляет ОДИН addEventListener на document:
  document.addEventListener('click', reactClickHandler, false);

  Когда кликаешь на button:
  1. Native событие всплывает до document
  2. React перехватывает его
  3. React создает SyntheticEvent
  4. React вызывает твой handler с SyntheticEvent
*/

// React 17+: События делегируются на корневой контейнер
/*
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);

  React добавляет addEventListener на #root, а не на document
  Это решает проблемы с интеграцией нескольких React-приложений
*/

// ========================================
// Преимущества делегирования
// ========================================

// 1. Производительность - меньше слушателей
function PerformanceExample() {
  const items = Array.from({ length: 1000 }, (_, i) => i);

  // ❌ Плохо (Vanilla JS) - 1000 слушателей
  // items.forEach(i => {
  //   element.addEventListener('click', handler);
  // });

  // ✅ Хорошо (React) - 1 слушатель на корне
  return (
    <ul>
      {items.map(i => (
        <li key={i} onClick={() => console.log(i)}>
          Item {i}
        </li>
      ))}
    </ul>
  );
}

// 2. Динамическое добавление элементов - автоматически работает
function DynamicElements() {
  const [items, setItems] = useState([1, 2, 3]);

  function addItem() {
    setItems([...items, items.length + 1]);
  }

  // Новые элементы автоматически получают обработчики
  // благодаря делегированию!
  return (
    <div>
      <button onClick={addItem}>Добавить</button>
      <ul>
        {items.map(i => (
          <li key={i} onClick={() => console.log(i)}>
            Item {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ========================================
// Проблемы делегирования и решения
// ========================================

// Проблема 1: Интеграция с нативными событиями
function NativeIntegration() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    // Нативный обработчик
    function nativeHandler(e) {
      console.log('Native handler');
      e.stopPropagation(); // Останавливаем всплытие
    }

    button.addEventListener('click', nativeHandler);

    return () => {
      button.removeEventListener('click', nativeHandler);
    };
  }, []);

  function reactHandler(e) {
    // Этот обработчик ВСЁ РАВНО вызовется!
    // Потому что stopPropagation() в нативном обработчике
    // не останавливает всплытие до корня React
    console.log('React handler');
  }

  return <button ref={buttonRef} onClick={reactHandler}>Клик</button>;
}

// Решение: stopPropagation в React обработчике
function NativeIntegrationFixed() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    function nativeHandler(e) {
      console.log('Native handler');
    }

    button.addEventListener('click', nativeHandler);

    return () => {
      button.removeEventListener('click', nativeHandler);
    };
  }, []);

  function reactHandler(e) {
    e.stopPropagation(); // Останавливаем в React
    console.log('React handler');
  }

  return <button ref={buttonRef} onClick={reactHandler}>Клик</button>;
}

// Проблема 2: Множественные React приложения (решено в React 17)
// React < 17: оба приложения слушают document
/*
  ReactDOM.render(<App1 />, div1); // addEventListener на document
  ReactDOM.render(<App2 />, div2); // addEventListener на document

  Если в App1 делаем stopPropagation() - может сломать App2!
*/

// React 17+: каждое приложение слушает свой корень
/*
  const root1 = ReactDOM.createRoot(div1);
  root1.render(<App1 />); // addEventListener на div1

  const root2 = ReactDOM.createRoot(div2);
  root2.render(<App2 />); // addEventListener на div2

  stopPropagation() в App1 не влияет на App2 ✅
*/
`

const eventHandlingPatternsSnippet = `
// Паттерны обработки событий в React

// ========================================
// 1. Класс-компоненты: биндинг this
// ========================================

// Проблема: потеря контекста this
class BadButton extends React.Component {
  handleClick() {
    console.log(this); // undefined! (в strict mode)
  }

  render() {
    return <button onClick={this.handleClick}>Клик</button>;
  }
}

// Решение 1: Биндинг в конструкторе (рекомендуется)
class GoodButton1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this); // ✅ Экземпляр компонента
  }

  render() {
    return <button onClick={this.handleClick}>Клик</button>;
  }
}

// Решение 2: Arrow function в render (создает новую функцию каждый раз)
class GoodButton2 extends React.Component {
  handleClick() {
    console.log(this); // ✅ Экземпляр компонента
  }

  render() {
    // ⚠️ Новая функция при каждом рендере - может влиять на производительность
    return <button onClick={() => this.handleClick()}>Клик</button>;
  }
}

// Решение 3: Class field (public class field) - ЛУЧШИЙ вариант
class GoodButton3 extends React.Component {
  // Arrow function автоматически привязывает this
  handleClick = () => {
    console.log(this); // ✅ Экземпляр компонента
  }

  render() {
    return <button onClick={this.handleClick}>Клик</button>;
  }
}

// ========================================
// 2. Функциональные компоненты: useCallback
// ========================================

// Без useCallback - новая функция каждый рендер
function ButtonWithoutCallback({ onSave }) {
  const [count, setCount] = useState(0);

  // ⚠️ Новая функция при каждом рендере
  function handleClick() {
    console.log('Count:', count);
    setCount(count + 1);
  }

  // Child перерендеривается каждый раз, даже если onSave не изменился
  return (
    <div>
      <button onClick={handleClick}>Клик ({count})</button>
      <ExpensiveChild onSave={handleClick} />
    </div>
  );
}

// С useCallback - мемоизированная функция
function ButtonWithCallback({ onSave }) {
  const [count, setCount] = useState(0);

  // ✅ Функция создается только при изменении зависимостей
  const handleClick = useCallback(() => {
    console.log('Count:', count);
    setCount(count + 1);
  }, [count]); // Пересоздается только когда count изменяется

  // Child перерендеривается только при изменении handleClick
  return (
    <div>
      <button onClick={handleClick}>Клик ({count})</button>
      <ExpensiveChild onSave={handleClick} />
    </div>
  );
}

// Оптимизированный вариант с функциональным обновлением
function OptimizedButton({ onSave }) {
  const [count, setCount] = useState(0);

  // ✅ Функция создается один раз и никогда не пересоздается!
  const handleClick = useCallback(() => {
    setCount(c => c + 1); // Функциональное обновление
  }, []); // Пустой массив зависимостей

  return (
    <div>
      <button onClick={handleClick}>Клик ({count})</button>
      <ExpensiveChild onSave={handleClick} />
    </div>
  );
}

// ========================================
// 3. Обработка форм
// ========================================

// Контролируемые компоненты
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Универсальный обработчик для всех полей
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form data:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

// Неконтролируемые компоненты с useRef
function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} name="username" />
      <input ref={emailRef} name="email" type="email" />
      <input ref={passwordRef} name="password" type="password" />
      <button type="submit">Отправить</button>
    </form>
  );
}

// ========================================
// 4. Дебаунсинг и троттлинг
// ========================================

// Debounce - выполнение после паузы
function SearchWithDebounce() {
  const [query, setQuery] = useState('');

  // Дебаунс с useCallback и useEffect
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log('Поиск:', value);
      // API запрос
    }, 500),
    []
  );

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  return <input value={query} onChange={handleChange} />;
}

// Throttle - ограничение частоты вызовов
function ScrollWithThrottle() {
  const throttledScroll = useCallback(
    throttle((event) => {
      console.log('Scroll Y:', window.scrollY);
    }, 200),
    []
  );

  return (
    <div onScroll={throttledScroll} style={{ height: '200vh' }}>
      Прокрутите вниз
    </div>
  );
}

// Хелперы debounce и throttle
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// 5. Композиция обработчиков
// ========================================

// Множественные обработчики для одного события
function MultipleHandlers() {
  function handleClick(event) {
    console.log('Handler 1');
  }

  function handleClickAnalytics(event) {
    console.log('Analytics tracked');
  }

  function handleClickValidation(event) {
    console.log('Validation passed');
  }

  // Композиция обработчиков
  function composedHandler(event) {
    handleClick(event);
    handleClickAnalytics(event);
    handleClickValidation(event);
  }

  return <button onClick={composedHandler}>Клик</button>;
}

// HOC для добавления обработчиков
function withAnalytics(Component) {
  return function WrappedComponent(props) {
    function handleClick(event) {
      console.log('Analytics: click tracked');
      if (props.onClick) {
        props.onClick(event);
      }
    }

    return <Component {...props} onClick={handleClick} />;
  };
}

const ButtonWithAnalytics = withAnalytics(Button);
`

const performanceSnippet = `
// Производительность обработки событий

// ========================================
// 1. Избегайте создания функций в render
// ========================================

// ❌ ПЛОХО - новая функция при каждом рендере
function BadList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => console.log(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ ХОРОШО - мемоизированная функция
function GoodList({ items }) {
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ ЕЩЕ ЛУЧШЕ - вынести Item в отдельный компонент
const ListItem = React.memo(({ item, onClick }) => {
  return (
    <li onClick={() => onClick(item.id)}>
      {item.name}
    </li>
  );
});

function BestList({ items }) {
  const handleClick = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </ul>
  );
}

// ========================================
// 2. Пассивные слушатели для скролла/тача
// ========================================

// Пассивные слушатели улучшают производительность скролла
function PassiveEventListeners() {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;

    function handleScroll(event) {
      // НЕ вызываем preventDefault() в пассивном слушателе!
      console.log('Scroll');
    }

    function handleTouchMove(event) {
      console.log('Touch move');
    }

    // Добавляем пассивные слушатели напрямую
    div.addEventListener('scroll', handleScroll, { passive: true });
    div.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      div.removeEventListener('scroll', handleScroll);
      div.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <div ref={divRef} style={{ height: '200vh' }}>Scroll me</div>;
}

// ========================================
// 3. Делегирование для больших списков
// ========================================

// ❌ ПЛОХО - обработчик на каждом элементе
function BadLargeList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => console.log(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ ХОРОШО - один обработчик на родителе
function GoodLargeList({ items }) {
  function handleClick(event) {
    const id = event.target.dataset.id;
    if (id) {
      console.log(id);
    }
  }

  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ========================================
// 4. Отмена обработчиков при размонтировании
// ========================================

function CleanupExample() {
  useEffect(() => {
    function handleResize() {
      console.log('Window resized');
    }

    function handleScroll() {
      console.log('Window scrolled');
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // ✅ ВАЖНО: очистка при размонтировании!
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div>Component</div>;
}

// ========================================
// 5. Измерение производительности
// ========================================

function PerformanceMeasurement() {
  function handleClick(event) {
    performance.mark('click-start');

    // Ваш код обработки события
    for (let i = 0; i < 1000000; i++) {
      // Имитация работы
    }

    performance.mark('click-end');
    performance.measure('click-duration', 'click-start', 'click-end');

    const measure = performance.getEntriesByName('click-duration')[0];
    console.log('Click handler took:', measure.duration, 'ms');

    // Очистка
    performance.clearMarks();
    performance.clearMeasures();
  }

  return <button onClick={handleClick}>Измерить</button>;
}

// ========================================
// 6. React Profiler для событий
// ========================================

function ProfiledComponent() {
  function onRenderCallback(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) {
    console.log(\`\${id} (\${phase}) took \${actualDuration}ms\`);
  }

  return (
    <Profiler id="EventComponent" onRender={onRenderCallback}>
      <ExpensiveEventHandler />
    </Profiler>
  );
}
`

const highlightedBasicEvents = ref('')
const highlightedSyntheticEvent = ref('')
const highlightedSyntheticVsNative = ref('')
const highlightedEventDelegation = ref('')
const highlightedEventHandlingPatterns = ref('')
const highlightedPerformance = ref('')

onMounted(() => {
  highlightedBasicEvents.value = Prism.highlight(
    basicEventsSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedSyntheticEvent.value = Prism.highlight(
    syntheticEventSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedSyntheticVsNative.value = Prism.highlight(
    syntheticVsNativeSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedEventDelegation.value = Prism.highlight(
    eventDelegationSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedEventHandlingPatterns.value = Prism.highlight(
    eventHandlingPatternsSnippet,
    Prism.languages.jsx,
    'jsx'
  )
  highlightedPerformance.value = Prism.highlight(
    performanceSnippet,
    Prism.languages.jsx,
    'jsx'
  )
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col lg="10">
            <h1 class="text-h4 font-weight-bold mb-6">
              События (Events) в React: SyntheticEvent vs Native Events
            </h1>

            <p class="font-weight-regular mb-6">
              <b>React использует собственную систему событий</b>, построенную поверх нативных DOM событий.
              Вместо прямой работы с нативными событиями, React предоставляет <b>SyntheticEvent</b> —
              кроссбраузерную обертку, которая нормализует API событий и использует делегирование для
              оптимизации производительности.
            </p>

            <h2 class="text-h5 font-weight-bold mb-3">Основы обработки событий в React</h2>
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="primary" class="mr-2">mdi-cursor-default-click</v-icon>
                    <h3 class="text-h6 font-weight-bold">Синтаксис</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>camelCase</strong> — onClick, onChange, onSubmit</li>
                    <li><strong>Функции</strong>, а не строки</li>
                    <li><strong>preventDefault()</strong> — явно</li>
                    <li><strong>stopPropagation()</strong> — явно</li>
                    <li><strong>Параметры</strong> — через arrow function</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="success" class="mr-2">mdi-star-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold">Особенности</h3>
                  </div>
                  <ul class="pl-4">
                    <li><strong>SyntheticEvent</strong> — не нативные события</li>
                    <li><strong>Делегирование</strong> — на корневом элементе</li>
                    <li><strong>Пулинг</strong> — в React < 17</li>
                    <li><strong>Кроссбраузерность</strong> — единый API</li>
                    <li><strong>Производительность</strong> — оптимизация</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedBasicEvents"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Что такое SyntheticEvent?</h2>
            <v-alert color="info" class="mb-4">
              <v-icon class="mr-2">mdi-information</v-icon>
              <strong>SyntheticEvent</strong> — это кроссбраузерная обертка React вокруг нативного события.
              Она имеет тот же интерфейс, что и нативное событие (stopPropagation(), preventDefault()),
              но работает одинаково во всех браузерах.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSyntheticEvent"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">SyntheticEvent vs Native Event — ключевые различия</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedSyntheticVsNative"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Сравнительная таблица</h2>
            <v-table density="comfortable" class="mb-8">
              <thead>
              <tr>
                <th class="text-left font-weight-bold">Аспект</th>
                <th class="text-left font-weight-bold">SyntheticEvent (React)</th>
                <th class="text-left font-weight-bold">Native Event (DOM)</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Кроссбраузерность</b></td>
                <td class="text-success">✅ Единый API для всех браузеров</td>
                <td class="text-error">❌ Различия между браузерами</td>
              </tr>
              <tr>
                <td><b>Производительность</b></td>
                <td class="text-success">✅ Делегирование, меньше слушателей</td>
                <td class="text-warning">⚠️ Слушатель на каждом элементе</td>
              </tr>
              <tr>
                <td><b>Пулинг событий</b></td>
                <td>React < 17: Да, React 17+: Нет</td>
                <td class="text-success">✅ Нет пулинга</td>
              </tr>
              <tr>
                <td><b>Асинхронное использование</b></td>
                <td>React < 17: persist(), React 17+: ✅</td>
                <td class="text-success">✅ Всегда работает</td>
              </tr>
              <tr>
                <td><b>Место делегирования</b></td>
                <td>React < 17: document, React 17+: root</td>
                <td>На самом элементе</td>
              </tr>
              <tr>
                <td><b>Доступ к нативному</b></td>
                <td>event.nativeEvent</td>
                <td>Само событие</td>
              </tr>
              <tr>
                <td><b>Capturing фаза</b></td>
                <td>onClickCapture</td>
                <td>addEventListener(..., true)</td>
              </tr>
              <tr>
                <td><b>Bubbling фаза</b></td>
                <td>onClick (по умолчанию)</td>
                <td>addEventListener(..., false)</td>
              </tr>
              </tbody>
            </v-table>

            <h2 class="text-h5 font-weight-bold mb-3">Делегирование событий в React</h2>
            <v-alert color="success" class="mb-4">
              <v-icon class="mr-2">mdi-rocket-launch</v-icon>
              <strong>Производительность:</strong> React использует делегирование событий — вместо
              добавления слушателей на каждый элемент, React добавляет ОДИН слушатель на корневой
              элемент и обрабатывает все события там.
            </v-alert>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventDelegation"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Изменения в React 17</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-warning">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-alert</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">React < 17</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Пулинг событий</strong> — нужен persist()</li>
                    <li><strong>Делегирование на document</strong></li>
                    <li><strong>Проблемы</strong> с множественными React apps</li>
                    <li><strong>Асинхронное использование</strong> — сложности</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4 h-100 bg-success">
                  <div class="d-flex align-center mb-3">
                    <v-icon size="large" color="white" class="mr-2">mdi-check-circle</v-icon>
                    <h3 class="text-h6 font-weight-bold text-white">React 17+</h3>
                  </div>
                  <ul class="text-white pl-4">
                    <li><strong>Без пулинга</strong> — проще использовать</li>
                    <li><strong>Делегирование на root</strong> контейнер</li>
                    <li><strong>Множественные apps</strong> работают корректно</li>
                    <li><strong>Асинхронное использование</strong> — без проблем</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Паттерны обработки событий</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedEventHandlingPatterns"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Производительность обработки событий</h2>
            <pre class="mb-8 pa-6 rounded-lg custom-code"><code v-html="highlightedPerformance"></code></pre>

            <h2 class="text-h5 font-weight-bold mb-3">Типы событий в React</h2>
            <v-row class="mb-8">
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Мышь и указатель</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onClick</li>
                    <li>onDoubleClick</li>
                    <li>onMouseDown/Up</li>
                    <li>onMouseEnter/Leave</li>
                    <li>onMouseMove</li>
                    <li>onContextMenu</li>
                    <li>onPointerDown/Up/Move</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Клавиатура и фокус</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onKeyDown/Up/Press</li>
                    <li>onFocus</li>
                    <li>onBlur</li>
                    <li>onFocusIn/Out</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Формы</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onChange</li>
                    <li>onInput</li>
                    <li>onSubmit</li>
                    <li>onReset</li>
                    <li>onInvalid</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Сенсорные экраны</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onTouchStart</li>
                    <li>onTouchMove</li>
                    <li>onTouchEnd</li>
                    <li>onTouchCancel</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">UI события</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onScroll</li>
                    <li>onWheel</li>
                    <li>onResize</li>
                    <li>onLoad</li>
                    <li>onError</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100">
                  <h3 class="text-h6 font-weight-bold mb-2">Drag & Drop</h3>
                  <ul class="pl-4 text-body-2">
                    <li>onDrag</li>
                    <li>onDragStart/End</li>
                    <li>onDragEnter/Leave</li>
                    <li>onDragOver</li>
                    <li>onDrop</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Частые вопросы на собеседовании</h2>
            <ol class="ol-list mb-8">
              <li class="mb-4">
                <p class="font-weight-bold mb-1">В чем разница между SyntheticEvent и нативным событием?</p>
                <p class="font-weight-regular ma-0">
                  <b>SyntheticEvent</b> — это кроссбраузерная обертка React вокруг нативного события.
                  Она нормализует API, обеспечивая одинаковое поведение во всех браузерах, использует
                  делегирование для производительности и в React < 17 использовала пулинг событий.
                  <b>Нативное событие</b> доступно через <code>event.nativeEvent</code>.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает делегирование событий в React?</p>
                <p class="font-weight-regular ma-0">
                  React не добавляет слушатели событий на каждый элемент. Вместо этого React добавляет
                  ОДИН слушатель на корневой элемент (document в React < 17, root контейнер в React 17+)
                  и обрабатывает все события там, используя фазу всплытия. Это значительно улучшает
                  производительность при большом количестве элементов.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что такое event pooling и почему его убрали?</p>
                <p class="font-weight-regular ma-0">
                  В React < 17 объекты SyntheticEvent переиспользовались (pooling) для производительности.
                  После вызова обработчика, все свойства события обнулялись. Это ломало асинхронное
                  использование событий (setTimeout, промисы). Решение — <code>event.persist()</code>.
                  В React 17+ пулинг убрали — события работают асинхронно без проблем.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Почему обработчики событий пишутся в camelCase?</p>
                <p class="font-weight-regular ma-0">
                  Это соглашение React для согласованности с JavaScript. В HTML события в lowercase
                  (onclick), но в React это JavaScript свойства, поэтому используется camelCase
                  (onClick, onChange, onSubmit). Это делает код более предсказуемым и согласованным.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как передать параметры в обработчик события?</p>
                <p class="font-weight-regular ma-0">
                  Два основных способа: <b>1)</b> Arrow function: <code>onClick={(e) => handler(id, e)}</code>
                  — создает новую функцию при каждом рендере. <b>2)</b> Bind: <code>onClick={handler.bind(null, id)}</code>
                  — тоже создает новую функцию. Для оптимизации используйте useCallback с функциональным
                  обновлением состояния.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Что изменилось в делегировании событий в React 17?</p>
                <p class="font-weight-regular ma-0">
                  В React < 17 события делегировались на <code>document</code>, что создавало проблемы
                  при использовании нескольких React приложений на одной странице. В React 17+ события
                  делегируются на корневой DOM контейнер (<code>ReactDOM.createRoot()</code>), что решает
                  проблему изоляции между приложениями.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Как работает onClickCapture?</p>
                <p class="font-weight-regular ma-0">
                  <code>onClickCapture</code> — это capturing фаза события (погружение от корня к цели).
                  Обычный <code>onClick</code> работает в bubbling фазе (всплытие от цели к корню).
                  Суффикс <code>Capture</code> можно добавить к любому событию. Порядок вызова:
                  Capture обработчики → Target обработчики → Bubble обработчики.
                </p>
              </li>
              <li class="mb-4">
                <p class="font-weight-bold mb-1">Когда использовать useCallback для обработчиков?</p>
                <p class="font-weight-regular ma-0">
                  useCallback нужен когда: <b>1)</b> Передаете обработчик в React.memo компонент —
                  без useCallback компонент будет перерендериваться. <b>2)</b> Обработчик в зависимостях
                  useEffect/useMemo. <b>3)</b> Оптимизация производительности в больших списках.
                  Для простых случаев useCallback может быть избыточным.
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
                    <li>Использовать camelCase для событий</li>
                    <li>Выносить обработчики из JSX</li>
                    <li>Использовать useCallback для оптимизации</li>
                    <li>Явно вызывать preventDefault()</li>
                    <li>Очищать слушатели в useEffect</li>
                    <li>Делегировать события для списков</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="error" class="mb-2">mdi-close-circle</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">❌ Избегать</h3>
                  <ul class="text-left pl-4">
                    <li>Inline функции в map() без необходимости</li>
                    <li>Забывать про event.persist() (React < 17)</li>
                    <li>Множество слушателей на window/document</li>
                    <li>Смешивание React и нативных событий</li>
                    <li>Забывать очищать слушатели</li>
                    <li>Использовать string вместо функций</li>
                  </ul>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="pa-4 h-100 text-center">
                  <v-icon size="large" color="info" class="mb-2">mdi-lightbulb</v-icon>
                  <h3 class="text-h6 font-weight-bold mb-2">💡 Советы</h3>
                  <ul class="text-left pl-4">
                    <li>Изучите типы событий в TypeScript</li>
                    <li>Используйте React DevTools для отладки</li>
                    <li>Профилируйте обработчики событий</li>
                    <li>Понимайте разницу версий React</li>
                    <li>Используйте пассивные слушатели</li>
                    <li>Тестируйте асинхронные обработчики</li>
                  </ul>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mb-3">Итог</h2>
            <p class="font-weight-regular mb-6">
              <b>React использует SyntheticEvent</b> — кроссбраузерную обертку вокруг нативных событий,
              которая обеспечивает единый API и оптимизирует производительность через делегирование.
              <b>Ключевые отличия от нативных событий:</b> кроссбраузерность, делегирование на корневом
              элементе, пулинг в React < 17 (убран в 17+), изменение места делегирования с document на
              root контейнер в React 17+. Понимание этих концепций критически важно для эффективной
              работы с событиями в React и успешного прохождения собеседования.
            </p>

            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                size="small"
                variant="elevated"
                href="https://react.dev/learn/responding-to-events"
                target="_blank"
                class="mr-2">
                React Docs: Events
              </v-btn>
              <v-btn
                color="secondary"
                size="small"
                variant="elevated"
                href="https://legacy.reactjs.org/docs/events.html"
                target="_blank">
                SyntheticEvent Reference
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
