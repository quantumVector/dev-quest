import type { Question } from '@/types/question.ts'

export const jsDOMEventsQuestions: Question[] = [
  // Тема 1: Фазы жизненного цикла события DOM (capturing, target, bubbling)
  {
    id: 1,
    question: "Какие фазы жизненного цикла имеет событие DOM?",
    options: [
      "Только bubbling",
      "Capturing, target, bubbling",
      "Target, bubbling",
      "Capturing, bubbling"
    ],
    correctAnswer: 1,
    explanation: "Событие DOM проходит через три фазы: capturing (погружение) - от document к целевому элементу, target (цель) - на целевом элементе, bubbling (всплытие) - от целевого элемента обратно к document.",
    topic: "Фазы событий DOM"
  },
  {
    id: 2,
    question: "В каком порядке происходят фазы события DOM?",
    options: [
      "bubbling → target → capturing",
      "target → capturing → bubbling",
      "capturing → target → bubbling",
      "bubbling → capturing → target"
    ],
    correctAnswer: 2,
    explanation: "Фазы события происходят в следующем порядке: 1) capturing (погружение) - от корня DOM к целевому элементу, 2) target (цель) - на целевом элементе, 3) bubbling (всплытие) - от целевого элемента обратно к корню.",
    topic: "Фазы событий DOM"
  },
  {
    id: 3,
    question: "Что происходит в фазе capturing?",
    options: [
      "Событие движется от целевого элемента к родительским",
      "Событие движется от корня DOM дерева к целевому элементу",
      "Событие обрабатывается только на целевом элементе",
      "Событие останавливается"
    ],
    correctAnswer: 1,
    explanation: "В фазе capturing событие движется от корня DOM дерева (document) вниз к целевому элементу, проходя через все родительские элементы.",
    topic: "Фазы событий DOM"
  },
  {
    id: 4,
    question: "Что происходит в фазе bubbling?",
    options: [
      "Событие движется от корня к целевому элементу",
      "Событие обрабатывается только на целевом элементе",
      "Событие движется от целевого элемента к родительским элементам",
      "Событие удаляется из DOM"
    ],
    correctAnswer: 2,
    explanation: "В фазе bubbling событие движется от целевого элемента вверх по DOM дереву к родительским элементам, включая document.",
    topic: "Фазы событий DOM"
  },
  {
    id: 5,
    question: "Какой параметр addEventListener определяет фазу, в которой будет обрабатываться событие?",
    options: [
      "Первый параметр (тип события)",
      "Второй параметр (функция-обработчик)",
      "Третий параметр (useCapture или options)",
      "Четвертый параметр"
    ],
    correctAnswer: 2,
    explanation: "Третий параметр addEventListener может быть булевым значением useCapture (true для capturing, false для bubbling) или объектом options с свойством capture.",
    topic: "Фазы событий DOM"
  },
  {
    id: 6,
    question: "По умолчанию addEventListener обрабатывает события в какой фазе?",
    options: [
      "Capturing",
      "Target",
      "Bubbling",
      "Во всех фазах одновременно"
    ],
    correctAnswer: 2,
    explanation: "По умолчанию addEventListener обрабатывает события в фазе bubbling. Чтобы обрабатывать в фазе capturing, нужно передать true в третьем параметре.",
    topic: "Фазы событий DOM"
  },
  {
    id: 7,
    question: "Что выведет этот код?\n\n<div id='parent'>\n  <button id='child'>Click</button>\n</div>\n\nparent.addEventListener('click', () => console.log('Parent'));\nchild.addEventListener('click', () => console.log('Child'));",
    options: [
      "Child",
      "Parent",
      "Child, Parent",
      "Parent, Child"
    ],
    correctAnswer: 2,
    explanation: "Сначала сработает обработчик на целевом элементе (Child), затем событие всплывет к родительскому элементу (Parent). Оба обработчика добавлены для фазы bubbling.",
    topic: "Фазы событий DOM"
  },
  {
    id: 8,
    question: "Как добавить обработчик события для фазы capturing?",
    options: [
      "element.addEventListener('click', handler, true)",
      "element.addEventListener('click', handler, false)",
      "element.addEventListener('click', handler, {bubbles: false})",
      "element.addCaptureListener('click', handler)"
    ],
    correctAnswer: 0,
    explanation: "Чтобы добавить обработчик для фазы capturing, нужно передать true в третьем параметре addEventListener или использовать {capture: true} в объекте options.",
    topic: "Фазы событий DOM"
  },

  // Тема 2: target vs currentTarget
  {
    id: 9,
    question: "В чем разница между event.target и event.currentTarget?",
    options: [
      "Никакой разницы нет",
      "target - элемент, на котором произошло событие; currentTarget - элемент, на котором установлен обработчик",
      "target - элемент, на котором установлен обработчик; currentTarget - элемент, на котором произошло событие",
      "target используется только в capturing, currentTarget - только в bubbling"
    ],
    correctAnswer: 1,
    explanation: "event.target - это элемент, на котором реально произошло событие (например, кнопка, по которой кликнули). event.currentTarget - это элемент, на котором установлен текущий обработчик события.",
    topic: "target vs currentTarget"
  },
  {
    id: 10,
    question: "Что выведет этот код при клике на кнопку?\n\n<div id='container'>\n  <button id='btn'>Click</button>\n</div>\n\ncontainer.addEventListener('click', (e) => {\n  console.log('target:', e.target.id);\n  console.log('currentTarget:', e.currentTarget.id);\n});",
    options: [
      "target: container, currentTarget: btn",
      "target: btn, currentTarget: container",
      "target: container, currentTarget: container",
      "target: btn, currentTarget: btn"
    ],
    correctAnswer: 1,
    explanation: "target будет 'btn' (элемент, на котором произошел клик), currentTarget будет 'container' (элемент, на котором установлен обработчик).",
    topic: "target vs currentTarget"
  },
  {
    id: 11,
    question: "Когда event.target и event.currentTarget могут быть одинаковыми?",
    options: [
      "Никогда",
      "Всегда",
      "Когда событие происходит непосредственно на элементе с обработчиком",
      "Только в фазе capturing"
    ],
    correctAnswer: 2,
    explanation: "event.target и event.currentTarget одинаковы, когда событие происходит непосредственно на элементе, на котором установлен обработчик, а не на его дочерних элементах.",
    topic: "target vs currentTarget"
  },
  {
    id: 12,
    question: "Как узнать, что событие произошло именно на элементе с обработчиком, а не всплыло от дочернего?",
    options: [
      "Проверить event.bubbles",
      "Сравнить event.target === event.currentTarget",
      "Проверить event.phase",
      "Использовать event.stopPropagation()"
    ],
    correctAnswer: 1,
    explanation: "Если event.target === event.currentTarget, это означает, что событие произошло непосредственно на элементе с обработчиком, а не всплыло от дочернего элемента.",
    topic: "target vs currentTarget"
  },
  {
    id: 13,
    question: "Что произойдет с event.currentTarget в разных фазах события?",
    options: [
      "Всегда остается одним и тем же",
      "Изменяется в каждой фазе, указывая на текущий элемент в цепочке",
      "Всегда равен event.target",
      "Равен null в фазе capturing"
    ],
    correctAnswer: 1,
    explanation: "event.currentTarget изменяется в каждой фазе события, указывая на элемент, на котором в данный момент обрабатывается событие. event.target всегда остается неизменным.",
    topic: "target vs currentTarget"
  },
  {
    id: 14,
    question: "Что выведет этот код?\n\n<div id='outer'>\n  <div id='inner'>Text</div>\n</div>\n\nouter.addEventListener('click', (e) => console.log('outer:', e.target.id));\ninner.addEventListener('click', (e) => console.log('inner:', e.target.id));\n\n// Клик по тексту в inner",
    options: [
      "inner: inner, outer: outer",
      "inner: inner, outer: inner",
      "inner: outer, outer: inner",
      "outer: outer, inner: inner"
    ],
    correctAnswer: 1,
    explanation: "В обоих обработчиках event.target будет указывать на элемент 'inner', так как именно на нем произошло событие. event.target не изменяется при всплытии.",
    topic: "target vs currentTarget"
  },
  {
    id: 15,
    question: "Как получить элемент, на котором реально кликнул пользователь, в обработчике на родительском элементе?",
    options: [
      "Использовать event.currentTarget",
      "Использовать event.target",
      "Использовать this",
      "Использовать event.srcElement"
    ],
    correctAnswer: 1,
    explanation: "event.target всегда указывает на элемент, на котором реально произошло событие, даже если обработчик установлен на родительском элементе.",
    topic: "target vs currentTarget"
  },
  {
    id: 16,
    question: "В каком случае this в обработчике события равен event.currentTarget?",
    options: [
      "Никогда",
      "Всегда при использовании обычных функций",
      "Всегда при использовании стрелочных функций",
      "Только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "При использовании обычных функций (не стрелочных) в качестве обработчиков событий, this автоматически устанавливается равным event.currentTarget.",
    topic: "target vs currentTarget"
  },

  // Тема 3: Как отловить событие на погружении
  {
    id: 17,
    question: "Как установить обработчик события для фазы capturing (погружение)?",
    options: [
      "element.addEventListener('click', handler, {phase: 'capturing'})",
      "element.addEventListener('click', handler, true)",
      "element.addCaptureListener('click', handler)",
      "element.addEventListener('click', handler, {bubbles: false})"
    ],
    correctAnswer: 1,
    explanation: "Чтобы обработать событие в фазе capturing, нужно передать true в качестве третьего параметра addEventListener или использовать {capture: true}.",
    topic: "Capturing события"
  },
  {
    id: 18,
    question: "Что выведет этот код при клике на button?\n\n<div id='parent'>\n  <button id='child'>Click</button>\n</div>\n\nparent.addEventListener('click', () => console.log('Parent capturing'), true);\nchild.addEventListener('click', () => console.log('Child'));\nparent.addEventListener('click', () => console.log('Parent bubbling'));",
    options: [
      "Parent capturing, Child, Parent bubbling",
      "Child, Parent capturing, Parent bubbling",
      "Parent bubbling, Child, Parent capturing",
      "Child, Parent bubbling, Parent capturing"
    ],
    correctAnswer: 0,
    explanation: "Порядок выполнения: 1) Parent capturing (фаза погружения), 2) Child (фаза target), 3) Parent bubbling (фаза всплытия).",
    topic: "Capturing события"
  },
  {
    id: 19,
    question: "Когда полезно использовать фазу capturing?",
    options: [
      "Никогда, она устарела",
      "Для перехвата событий до их обработки дочерними элементами",
      "Только для оптимизации производительности",
      "Только для мобильных устройств"
    ],
    correctAnswer: 1,
    explanation: "Фаза capturing полезна для перехвата и предварительной обработки событий до того, как они достигнут целевых элементов. Например, для валидации, логирования или условной отмены событий.",
    topic: "Capturing события"
  },
  {
    id: 20,
    question: "Можно ли остановить событие в фазе capturing, чтобы оно не дошло до target?",
    options: [
      "Нет, события нельзя остановить",
      "Да, с помощью event.stopPropagation()",
      "Да, с помощью event.preventDefault()",
      "Да, с помощью return false"
    ],
    correctAnswer: 1,
    explanation: "event.stopPropagation() останавливает дальнейшее распространение события. Если вызвать его в фазе capturing, событие не дойдет до target и не будет всплывать.",
    topic: "Capturing события"
  },
  {
    id: 21,
    question: "Что означает третий параметр {capture: true, once: true} в addEventListener?",
    options: [
      "Обработчик сработает один раз в фазе capturing",
      "Обработчик сработает один раз в фазе bubbling",
      "Обработчик будет работать только с capture событиями",
      "Синтаксическая ошибка"
    ],
    correctAnswer: 0,
    explanation: "capture: true означает обработку в фазе capturing, once: true означает, что обработчик выполнится только один раз и затем автоматически удалится.",
    topic: "Capturing события"
  },
  {
    id: 22,
    question: "Что выведет этот код?\n\ndocument.addEventListener('click', () => console.log('Document'), true);\ndocument.body.addEventListener('click', () => console.log('Body'), true);\ndocument.getElementById('btn').addEventListener('click', () => console.log('Button'));\n\n// Клик по кнопке",
    options: [
      "Button, Body, Document",
      "Document, Body, Button",
      "Body, Document, Button",
      "Button, Document, Body"
    ],
    correctAnswer: 1,
    explanation: "В фазе capturing события обрабатываются от корня к цели: Document (capturing) → Body (capturing) → Button (target/bubbling).",
    topic: "Capturing события"
  },
  {
    id: 23,
    question: "Как удалить обработчик события, установленный для фазы capturing?",
    options: [
      "element.removeEventListener('click', handler)",
      "element.removeEventListener('click', handler, true)",
      "element.removeCaptureListener('click', handler)",
      "Автоматически при первом срабатывании"
    ],
    correctAnswer: 1,
    explanation: "При удалении обработчика нужно указать те же параметры, что и при добавлении. Если обработчик был добавлен с capture: true, то и удалять нужно с тем же параметром.",
    topic: "Capturing события"
  },
  {
    id: 24,
    question: "В каком порядке выполнятся обработчики?\n\nelement.addEventListener('click', handler1, true);  // capturing\nelement.addEventListener('click', handler2, false); // bubbling\nelement.addEventListener('click', handler3, true);  // capturing\nelement.addEventListener('click', handler4, false); // bubbling",
    options: [
      "handler1, handler3, handler2, handler4",
      "handler1, handler2, handler3, handler4",
      "handler2, handler4, handler1, handler3",
      "В порядке добавления независимо от фазы"
    ],
    correctAnswer: 0,
    explanation: "Сначала выполняются все capturing обработчики в порядке добавления (handler1, handler3), затем все bubbling обработчики в порядке добавления (handler2, handler4).",
    topic: "Capturing события"
  }
]
