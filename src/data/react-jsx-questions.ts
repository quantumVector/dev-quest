import type { Question } from '@/types/question.ts'

export const reactJSXQuestions: Question[] = [
  // Тема 1: Основы JSX
  {
    id: 1,
    question: "Что такое JSX?",
    options: [
      "Язык программирования",
      "Синтаксическое расширение JavaScript для описания UI",
      "CSS препроцессор",
      "Библиотека для работы с DOM"
    ],
    correctAnswer: 1,
    explanation: "JSX (JavaScript XML) — это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобный код внутри JavaScript. JSX не является отдельным языком программирования.",
    topic: "Основы JSX"
  },
  {
    id: 2,
    question: "Обязательно ли использовать JSX в React?",
    options: [
      "Да, без JSX React не работает",
      "Нет, можно использовать React.createElement()",
      "Да, только в production",
      "Нет, можно использовать только строки"
    ],
    correctAnswer: 1,
    explanation: "JSX не обязателен для React. Можно использовать React.createElement() напрямую, но JSX делает код более читаемым и удобным. JSX компилируется в вызовы React.createElement().",
    topic: "Основы JSX"
  },
  {
    id: 3,
    question: "Во что компилируется JSX?",
    options: [
      "В HTML",
      "В JSON",
      "В вызовы React.createElement()",
      "В строки"
    ],
    correctAnswer: 2,
    explanation: "JSX компилируется в вызовы React.createElement(). Например, <div>Hello</div> превращается в React.createElement('div', null, 'Hello'). В React 17+ используется автоматический JSX transform.",
    topic: "Основы JSX"
  },
  {
    id: 4,
    question: "Какой инструмент обычно используется для компиляции JSX?",
    options: [
      "Webpack",
      "Babel",
      "TypeScript",
      "ESLint"
    ],
    correctAnswer: 1,
    explanation: "Babel — это основной инструмент для компиляции JSX в JavaScript. Также TypeScript может компилировать JSX, если используется .tsx расширение.",
    topic: "Основы JSX"
  },
  {
    id: 5,
    question: "Что выведет этот код?\n\nconst element = <h1>Hello</h1>;\nconsole.log(typeof element);",
    options: [
      "'string'",
      "'object'",
      "'function'",
      "'undefined'"
    ],
    correctAnswer: 1,
    explanation: "JSX элементы — это обычные JavaScript объекты. React.createElement() возвращает объект, который описывает элемент. Поэтому typeof возвращает 'object'.",
    topic: "Основы JSX"
  },

  // Тема 2: Синтаксис JSX
  {
    id: 6,
    question: "Как вставить JavaScript выражение в JSX?",
    options: [
      "С помощью ${expression}",
      "С помощью {expression}",
      "С помощью [[expression]]",
      "С помощью {{expression}}"
    ],
    correctAnswer: 1,
    explanation: "JavaScript выражения вставляются в JSX с помощью фигурных скобок {}. Например: <div>{name}</div>. Внутри скобок можно использовать любые JavaScript выражения.",
    topic: "Синтаксис JSX"
  },
  {
    id: 7,
    question: "Можно ли использовать if-else внутри JSX выражений?",
    options: [
      "Да, без ограничений",
      "Нет, нужно использовать тернарный оператор или логические операторы",
      "Да, но только if",
      "Нет, JSX не поддерживает условия"
    ],
    correctAnswer: 1,
    explanation: "Внутри {} можно использовать только выражения, а if-else это statement. Используйте тернарный оператор: {condition ? <A /> : <B />} или логические операторы: {condition && <Component />}.",
    topic: "Синтаксис JSX"
  },
  {
    id: 8,
    question: "Что выведет этот JSX?\n\n<div>{5 + 5}</div>",
    options: [
      "<div>5 + 5</div>",
      "<div>10</div>",
      "Ошибка компиляции",
      "<div>55</div>"
    ],
    correctAnswer: 1,
    explanation: "JavaScript выражения в фигурных скобках вычисляются. 5 + 5 = 10, поэтому результат будет <div>10</div>.",
    topic: "Синтаксис JSX"
  },
  {
    id: 9,
    question: "Как правильно записать комментарий в JSX?",
    options: [
      "// комментарий",
      "<!-- комментарий -->",
      "{/* комментарий */}",
      "/* комментарий */"
    ],
    correctAnswer: 2,
    explanation: "Комментарии в JSX пишутся как JavaScript выражения: {/* комментарий */}. HTML комментарии <!-- --> не работают в JSX.",
    topic: "Синтаксис JSX"
  },
  {
    id: 10,
    question: "Можно ли возвращать несколько элементов без обёртки?",
    options: [
      "Нет, нужна обёртка или фрагмент",
      "Да, всегда",
      "Да, но только в функциональных компонентах",
      "Нет, только с использованием массива"
    ],
    correctAnswer: 0,
    explanation: "JSX должен возвращать один корневой элемент. Для нескольких элементов используйте <div>, <></> (Fragment) или массив с ключами.",
    topic: "Синтаксис JSX"
  },

  // Тема 3: Атрибуты в JSX
  {
    id: 11,
    question: "Какой атрибут используется вместо 'class' в JSX?",
    options: [
      "class",
      "className",
      "cssClass",
      "classList"
    ],
    correctAnswer: 1,
    explanation: "В JSX используется 'className' вместо 'class', потому что 'class' — зарезервированное слово в JavaScript. То же самое с 'htmlFor' вместо 'for'.",
    topic: "Атрибуты JSX"
  },
  {
    id: 12,
    question: "Как записать инлайн стили в JSX?",
    options: [
      "style='color: red'",
      "style={{color: 'red'}}",
      "style='{{color: red}}'",
      "css={{color: 'red'}}"
    ],
    correctAnswer: 1,
    explanation: "Инлайн стили в JSX — это объект JavaScript: style={{color: 'red'}}. Двойные фигурные скобки: внешние для JSX выражения, внутренние для объекта. CSS свойства в camelCase.",
    topic: "Атрибуты JSX"
  },
  {
    id: 13,
    question: "Как правильно записать CSS свойство 'background-color' в JSX стилях?",
    options: [
      "background-color",
      "backgroundColor",
      "backgroundcolor",
      "BackgroundColor"
    ],
    correctAnswer: 1,
    explanation: "В JSX CSS свойства записываются в camelCase: backgroundColor вместо background-color. Это стандарт для всех составных CSS свойств в JavaScript.",
    topic: "Атрибуты JSX"
  },
  {
    id: 14,
    question: "Что произойдёт с этим кодом?\n\n<div data-custom='value' />",
    options: [
      "Ошибка: неизвестный атрибут",
      "Атрибут будет проигнорирован",
      "Атрибут будет добавлен в DOM",
      "Ошибка компиляции"
    ],
    correctAnswer: 2,
    explanation: "data-* атрибуты разрешены в JSX и будут добавлены в DOM как есть. Также разрешены aria-* атрибуты. Неизвестные атрибуты в React 16+ тоже добавляются в DOM.",
    topic: "Атрибуты JSX"
  },
  {
    id: 15,
    question: "Можно ли использовать spread оператор для передачи props?",
    options: [
      "Нет, это синтаксическая ошибка",
      "Да, <Component {...props} />",
      "Да, но только для HTML элементов",
      "Нет, нужно передавать каждый prop отдельно"
    ],
    correctAnswer: 1,
    explanation: "Spread оператор работает в JSX: <Component {...props} />. Это удобный способ передать все свойства объекта как props компоненту.",
    topic: "Атрибуты JSX"
  },

  // Тема 4: Дети элементов (Children)
  {
    id: 16,
    question: "Что такое children в React?",
    options: [
      "Массив дочерних компонентов",
      "Содержимое между открывающим и закрывающим тегом компонента",
      "Свойство для передачи данных",
      "Вложенные функции"
    ],
    correctAnswer: 1,
    explanation: "children — это специальный prop, который содержит всё, что находится между открывающим и закрывающим тегом компонента: <Component>children</Component>.",
    topic: "Children в JSX"
  },
  {
    id: 17,
    question: "Что выведет этот код?\n\nfunction Wrapper({children}) {\n  return <div>{children}</div>;\n}\n\n<Wrapper>\n  <p>Hello</p>\n  <p>World</p>\n</Wrapper>",
    options: [
      "Только первый <p>",
      "Только второй <p>",
      "Оба <p> элемента",
      "Ошибка: слишком много children"
    ],
    correctAnswer: 2,
    explanation: "children может быть массивом элементов. Оба <p> элемента будут отрендерены внутри <div>. React автоматически обрабатывает массивы children.",
    topic: "Children в JSX"
  },
  {
    id: 18,
    question: "Как передать функцию как children?",
    options: [
      "Нельзя передать функцию как children",
      "<Component>{() => <div>Hello</div>}</Component>",
      "<Component function={() => <div>Hello</div>} />",
      "<Component><function /></Component>"
    ],
    correctAnswer: 1,
    explanation: "Паттерн 'render props' или 'function as child': <Component>{(data) => <div>{data}</div>}</Component>. Компонент вызывает эту функцию и передаёт ей данные.",
    topic: "Children в JSX"
  },
  {
    id: 19,
    question: "Что такое self-closing тег в JSX?",
    options: [
      "Тег, который закрывается автоматически",
      "Тег без children, записанный как <Component />",
      "Тег, который нельзя использовать",
      "Тег только для HTML элементов"
    ],
    correctAnswer: 1,
    explanation: "Self-closing тег <Component /> используется, когда элемент не имеет children. Эквивалентно <Component></Component>. Обязателен слэш перед >.",
    topic: "Children в JSX"
  },
  {
    id: 20,
    question: "Что произойдёт с этим кодом?\n\n<div>\n  {false}\n  {null}\n  {undefined}\n  {true}\n</div>",
    options: [
      "Ошибка рендеринга",
      "Все значения будут отрендерены как текст",
      "Ничего не отрендерится (пустой div)",
      "Будет пустая строка"
    ],
    correctAnswer: 2,
    explanation: "false, null, undefined и true игнорируются в JSX и не рендерятся. Это полезно для условного рендеринга: {condition && <Component />}.",
    topic: "Children в JSX"
  },

  // Тема 5: Выражения и операторы
  {
    id: 21,
    question: "Что выведет этот код?\n\n<div>{'Hello ' + 'World'}</div>",
    options: [
      "<div>Hello World</div>",
      "<div>'Hello ' + 'World'</div>",
      "Ошибка компиляции",
      "<div>HelloWorld</div>"
    ],
    correctAnswer: 0,
    explanation: "Выражения в {} вычисляются. Конкатенация строк работает как обычно в JavaScript, результат: <div>Hello World</div>.",
    topic: "Выражения в JSX"
  },
  {
    id: 22,
    question: "Как правильно использовать условный рендеринг в JSX?",
    options: [
      "{if (condition) <Component />}",
      "{condition ? <Component /> : null}",
      "if (condition) { <Component /> }",
      "<if condition><Component /></if>"
    ],
    correctAnswer: 1,
    explanation: "Используйте тернарный оператор: {condition ? <A /> : <B />} или логический &&: {condition && <Component />}. If-statement не является выражением.",
    topic: "Выражения в JSX"
  },
  {
    id: 23,
    question: "Что выведет этот код?\n\n<div>{0}</div>",
    options: [
      "Пустой div",
      "<div>0</div>",
      "Ошибка",
      "<div>false</div>"
    ],
    correctAnswer: 1,
    explanation: "В отличие от false, null, undefined и true, число 0 рендерится. Это важно помнить при условном рендеринге: {array.length && <Component />} может показать 0.",
    topic: "Выражения в JSX"
  },
  {
    id: 24,
    question: "Как отрендерить список элементов в JSX?",
    options: [
      "<for each={item in items}><Item /></for>",
      "{items.map(item => <Item key={item.id} />)}",
      "{items.forEach(item => <Item />)}",
      "<loop items={items}><Item /></loop>"
    ],
    correctAnswer: 1,
    explanation: "Используйте .map() для рендеринга списков: {items.map(item => <Item key={item.id} data={item} />)}. forEach не возвращает значение, поэтому не подходит.",
    topic: "Выражения в JSX"
  },
  {
    id: 25,
    question: "Что произойдёт с этим кодом?\n\n<div>{[<p key='1'>A</p>, <p key='2'>B</p>]}</div>",
    options: [
      "Ошибка: массив в JSX",
      "Отрендерятся оба <p>",
      "Отрендерится только первый",
      "Массив преобразуется в строку"
    ],
    correctAnswer: 1,
    explanation: "React может рендерить массивы элементов. Оба <p> будут отрендерены. Важно добавить key для каждого элемента массива.",
    topic: "Выражения в JSX"
  },

  // Тема 6: Фрагменты
  {
    id: 26,
    question: "Для чего используются фрагменты в React?",
    options: [
      "Для группировки элементов без создания лишнего DOM узла",
      "Для разделения компонента на части",
      "Для оптимизации производительности",
      "Для создания портала"
    ],
    correctAnswer: 0,
    explanation: "Фрагменты (<></> или <React.Fragment>) позволяют группировать элементы без добавления дополнительного узла в DOM. Полезно, когда обёртка div нежелательна.",
    topic: "Фрагменты"
  },
  {
    id: 27,
    question: "В чём разница между <></> и <React.Fragment>?",
    options: [
      "Никакой разницы",
      "<React.Fragment> позволяет передать key и другие props",
      "<></> работает быстрее",
      "<React.Fragment> устаревший синтаксис"
    ],
    correctAnswer: 1,
    explanation: "Короткий синтаксис <></> удобен, но не позволяет передавать props. <React.Fragment key={id}> можно использовать с key при рендеринге списков.",
    topic: "Фрагменты"
  },
  {
    id: 28,
    question: "Когда нужно использовать Fragment вместо div?",
    options: [
      "Всегда, Fragment быстрее",
      "Когда нужно вернуть несколько элементов без обёртки",
      "Только в функциональных компонентах",
      "Никогда, div предпочтительнее"
    ],
    correctAnswer: 1,
    explanation: "Fragment полезен в таблицах (<tr> не может содержать <div>), флекс/грид контейнерах, или когда лишний DOM узел нарушает стилизацию или семантику.",
    topic: "Фрагменты"
  },
  {
    id: 29,
    question: "Можно ли использовать фрагмент с key?",
    options: [
      "Нет, фрагменты не поддерживают props",
      "Да, но только <React.Fragment key={id}>",
      "Да, <> key={id} </>",
      "Нет, key работает только с элементами"
    ],
    correctAnswer: 1,
    explanation: "Короткий синтаксис <></> не поддерживает props. Для key используйте полный синтаксис: <React.Fragment key={item.id}>...</React.Fragment>.",
    topic: "Фрагменты"
  },
  {
    id: 30,
    question: "Что выведет этот код в DOM?\n\nreturn (\n  <>\n    <h1>Title</h1>\n    <p>Text</p>\n  </>\n)",
    options: [
      "<div><h1>Title</h1><p>Text</p></div>",
      "<h1>Title</h1><p>Text</p>",
      "<fragment><h1>Title</h1><p>Text</p></fragment>",
      "Ошибка компиляции"
    ],
    correctAnswer: 1,
    explanation: "Fragment не создаёт DOM узел. В DOM будут только <h1> и <p> без какой-либо обёртки. Это и есть основное назначение фрагментов.",
    topic: "Фрагменты"
  },

  // Тема 7: JSX и безопасность
  {
    id: 31,
    question: "Защищает ли React от XSS атак при выводе пользовательского ввода?",
    options: [
      "Нет, нужна дополнительная санитизация",
      "Да, React экранирует значения в JSX по умолчанию",
      "Да, но только в production",
      "Нет, React не занимается безопасностью"
    ],
    correctAnswer: 1,
    explanation: "React автоматически экранирует значения перед рендерингом. <div>{userInput}</div> безопасно, даже если userInput содержит <script>. Но dangerouslySetInnerHTML обходит эту защиту.",
    topic: "Безопасность JSX"
  },
  {
    id: 32,
    question: "Что делает dangerouslySetInnerHTML?",
    options: [
      "Удаляет опасный контент",
      "Вставляет HTML без экранирования",
      "Проверяет HTML на безопасность",
      "Отключает React"
    ],
    correctAnswer: 1,
    explanation: "dangerouslySetInnerHTML={{__html: htmlString}} вставляет HTML напрямую, обходя защиту React. Используйте только с доверенным контентом или после санитизации библиотекой типа DOMPurify.",
    topic: "Безопасность JSX"
  },
  {
    id: 33,
    question: "Безопасен ли этот код?\n\nconst html = '<img src=x onerror=alert(1)>';\n<div>{html}</div>",
    options: [
      "Нет, выполнится XSS",
      "Да, React экранирует строку",
      "Зависит от браузера",
      "Да, но только в production"
    ],
    correctAnswer: 1,
    explanation: "React экранирует строки в {}. HTML будет отображён как текст: &lt;img src=x onerror=alert(1)&gt;. Script не выполнится.",
    topic: "Безопасность JSX"
  },
  {
    id: 34,
    question: "Когда стоит использовать dangerouslySetInnerHTML?",
    options: [
      "Для любого HTML контента",
      "Только для доверенного или санитизированного HTML",
      "Никогда не использовать",
      "Только для встроенных стилей"
    ],
    correctAnswer: 1,
    explanation: "dangerouslySetInnerHTML оправдан для доверенного контента (из своей CMS) или после санитизации (DOMPurify). Для пользовательского ввода используйте обычный JSX.",
    topic: "Безопасность JSX"
  },
  {
    id: 35,
    question: "Что произойдёт с этим кодом?\n\nconst url = 'javascript:alert(1)';\n<a href={url}>Click</a>",
    options: [
      "Alert выполнится при клике",
      "React заблокирует javascript: URL",
      "Ошибка компиляции",
      "Ссылка не будет работать"
    ],
    correctAnswer: 1,
    explanation: "React блокирует потенциально опасные URL схемы (javascript:, data:) в href для защиты от XSS. Используйте только безопасные протоколы: http(s):, mailto:, tel:.",
    topic: "Безопасность JSX"
  },

  // Тема 8: Производительность JSX
  {
    id: 36,
    question: "Создаётся ли новый объект при каждом рендере?\n\n<Component style={{color: 'red'}} />",
    options: [
      "Нет, React кеширует объект",
      "Да, создаётся новый объект",
      "Зависит от React версии",
      "Только в development"
    ],
    correctAnswer: 1,
    explanation: "Литерал объекта {} создаёт новый объект при каждом рендере. Это может вызвать лишние ререндеры дочернего компонента. Оптимизация: вынести в константу или useMemo.",
    topic: "Производительность JSX"
  },
  {
    id: 37,
    question: "Что лучше для производительности?\n\nА: <Component onClick={() => handleClick(id)} />\nБ: const handler = useCallback(() => handleClick(id), [id]);\n    <Component onClick={handler} />",
    options: [
      "А всегда лучше",
      "Б предотвращает создание новой функции при каждом рендере",
      "Одинаково",
      "А лучше в production, Б в development"
    ],
    correctAnswer: 1,
    explanation: "Стрелочная функция в JSX создаёт новую функцию при каждом рендере. useCallback мемоизирует функцию. Важно для оптимизированных дочерних компонентов (React.memo).",
    topic: "Производительность JSX"
  },
  {
    id: 38,
    question: "Почему важно выносить константы из JSX?\n\nconst ITEMS = [1, 2, 3]; // вне компонента\nvs\nconst items = [1, 2, 3]; // внутри компонента",
    options: [
      "Нет разницы",
      "Внутри компонента массив пересоздаётся при каждом рендере",
      "Вне компонента код читаемее",
      "Важно только для объектов"
    ],
    correctAnswer: 1,
    explanation: "Константы внутри компонента пересоздаются при каждом рендере. Статические данные лучше выносить наружу или использовать useMemo для динамических.",
    topic: "Производительность JSX"
  },
  {
    id: 39,
    question: "Что эффективнее для условного рендеринга?\n\nА: {condition && <Component />}\nБ: {condition ? <Component /> : null}",
    options: [
      "А эффективнее",
      "Б эффективнее",
      "Одинаково эффективны",
      "Зависит от значения condition"
    ],
    correctAnswer: 2,
    explanation: "Оба варианта одинаково эффективны. Выбор зависит от читаемости. Но помните о проблеме с 0: {count && <Component />} может показать 0 вместо ничего.",
    topic: "Производительность JSX"
  },
  {
    id: 40,
    question: "Влияет ли количество JSX элементов на размер бандла?",
    options: [
      "Да, больше JSX = больше бандл",
      "Нет, JSX компилируется и оптимизируется",
      "Только в development",
      "Да, но минимально"
    ],
    correctAnswer: 3,
    explanation: "JSX компилируется в React.createElement() или jsx() вызовы. Много элементов = много вызовов = немного больший бандл. Но оптимизация и gzip сжатие минимизируют эффект.",
    topic: "Производительность JSX"
  }
]
