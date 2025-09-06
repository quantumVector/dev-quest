import type { Question } from '@/types/question.ts'

export const jsIteratorsQuestions: Question[] = [
  // Тема 1: Основы итераторов
  {
    id: 1,
    question: "Что такое итератор в JavaScript?",
    options: [
      "Функция, которая перебирает массив",
      "Объект, который реализует протокол итератора с методом next()",
      "Специальный тип данных для циклов",
      "Встроенная функция для обхода коллекций"
    ],
    correctAnswer: 1,
    explanation: "Итератор — это объект, который реализует протокол итератора, определяя метод next(), возвращающий объект с полями value и done.",
    topic: "Основы итераторов"
  },
  {
    id: 2,
    question: "Какую структуру должен возвращать метод next() итератора?",
    options: [
      "{ value: any }",
      "{ done: boolean }",
      "{ value: any, done: boolean }",
      "{ next: function, value: any }"
    ],
    correctAnswer: 2,
    explanation: "Метод next() должен возвращать объект с двумя свойствами: value (текущее значение) и done (булево значение, указывающее, завершена ли итерация).",
    topic: "Основы итераторов"
  },
  {
    id: 3,
    question: "Что такое итерируемый объект (iterable)?",
    options: [
      "Любой объект с методом next()",
      "Объект, реализующий метод Symbol.iterator",
      "Объект, который можно перебрать циклом while",
      "Объект с числовыми индексами"
    ],
    correctAnswer: 1,
    explanation: "Итерируемый объект — это объект, который реализует протокол итерируемого объекта, определяя метод Symbol.iterator, возвращающий итератор.",
    topic: "Основы итераторов"
  },
  {
    id: 4,
    question: "Какие встроенные объекты JavaScript являются итерируемыми?",
    options: [
      "Array, String, Map, Set",
      "Object, Function, Date",
      "Number, Boolean, Symbol",
      "Promise, RegExp, Error"
    ],
    correctAnswer: 0,
    explanation: "Array, String, Map, Set, NodeList и другие коллекции являются итерируемыми объектами по умолчанию.",
    topic: "Основы итераторов"
  },
  {
    id: 5,
    question: "Что выведет этот код?\n\nconst arr = [1, 2, 3];\nconst iterator = arr[Symbol.iterator]();\nconsole.log(iterator.next().value);\nconsole.log(iterator.next().value);",
    options: [
      "1, 2",
      "undefined, undefined",
      "[1, 2, 3], [1, 2, 3]",
      "1, 1"
    ],
    correctAnswer: 0,
    explanation: "При каждом вызове next() итератор возвращает следующий элемент массива. Первый вызов вернет 1, второй — 2.",
    topic: "Основы итераторов"
  },
  {
    id: 6,
    question: "Как создать собственный итерируемый объект?",
    options: [
      "Добавить метод forEach",
      "Добавить метод Symbol.iterator, возвращающий итератор",
      "Наследовать от Array",
      "Использовать for...in цикл"
    ],
    correctAnswer: 1,
    explanation: "Чтобы сделать объект итерируемым, нужно добавить метод Symbol.iterator, который возвращает объект итератора с методом next().",
    topic: "Основы итераторов"
  },

  // Тема 2: Генераторы
  {
    id: 7,
    question: "Что такое генератор в JavaScript?",
    options: [
      "Функция, которая создает массивы",
      "Специальная функция, которая может приостанавливать и возобновлять выполнение",
      "Функция для создания объектов",
      "Метод для генерации случайных чисел"
    ],
    correctAnswer: 1,
    explanation: "Генератор — это специальная функция, которая может приостанавливать свое выполнение с помощью yield и возобновлять его позже, возвращая итератор.",
    topic: "Генераторы"
  },
  {
    id: 8,
    question: "Как объявляется функция-генератор?",
    options: [
      "function generator() {}",
      "function* generator() {}",
      "generator function() {}",
      "function generator*() {}"
    ],
    correctAnswer: 1,
    explanation: "Функция-генератор объявляется с помощью синтаксиса function* с звездочкой после ключевого слова function.",
    topic: "Генераторы"
  },
  {
    id: 9,
    question: "Что возвращает вызов функции-генератора?",
    options: [
      "Первое значение yield",
      "Объект генератора (iterator)",
      "undefined",
      "Все значения yield в массиве"
    ],
    correctAnswer: 1,
    explanation: "Вызов функции-генератора не выполняет ее тело, а возвращает объект генератора, который является итератором.",
    topic: "Генераторы"
  },
  {
    id: 10,
    question: "Что выведет этот код?\n\nfunction* gen() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\nconst g = gen();\nconsole.log(g.next().value);\nconsole.log(g.next().value);\nconsole.log(g.next().value);",
    options: [
      "1, 2, 3",
      "1, 2, undefined",
      "undefined, undefined, undefined",
      "1, 1, 1"
    ],
    correctAnswer: 0,
    explanation: "Первые два next() вернут значения yield (1 и 2), третий next() вернет значение return (3).",
    topic: "Генераторы"
  },
  {
    id: 11,
    question: "В чем разница между yield и return в генераторе?",
    options: [
      "Никакой разницы нет",
      "yield приостанавливает выполнение, return завершает генератор",
      "return приостанавливает, yield завершает",
      "yield работает только в циклах"
    ],
    correctAnswer: 1,
    explanation: "yield приостанавливает выполнение генератора и возвращает значение, позволяя продолжить выполнение позже. return завершает генератор навсегда.",
    topic: "Генераторы"
  },
  {
    id: 12,
    question: "Что делает yield* в генераторе?",
    options: [
      "Умножает значение yield",
      "Делегирует выполнение другому генератору или итерируемому объекту",
      "Создает бесконечный цикл yield",
      "Возвращает массив значений"
    ],
    correctAnswer: 1,
    explanation: "yield* делегирует выполнение другому генератору или итерируемому объекту, передавая все его значения по очереди.",
    topic: "Генераторы"
  },
  {
    id: 13,
    question: "Можно ли передать значение в генератор через next()?",
    options: [
      "Нет, next() не принимает параметры",
      "Да, значение станет результатом выражения yield",
      "Да, но только числовые значения",
      "Да, но только при первом вызове"
    ],
    correctAnswer: 1,
    explanation: "Метод next(value) может принимать значение, которое станет результатом выражения yield внутри генератора.",
    topic: "Генераторы"
  },
  {
    id: 14,
    question: "Что выведет этот код?\n\nfunction* gen() {\n  const x = yield 1;\n  yield x + 2;\n}\n\nconst g = gen();\nconsole.log(g.next().value);\nconsole.log(g.next(10).value);",
    options: [
      "1, 12",
      "1, 2",
      "1, undefined",
      "undefined, 12"
    ],
    correctAnswer: 0,
    explanation: "Первый next() вернет 1. Второй next(10) передаст 10 как значение x, поэтому yield x + 2 вернет 12.",
    topic: "Генераторы"
  },

  // Тема 3: Асинхронные итераторы
  {
    id: 15,
    question: "Что такое асинхронный итератор?",
    options: [
      "Итератор, который работает с Promise",
      "Итератор, метод next() которого возвращает Promise",
      "Итератор для работы с файлами",
      "Итератор, который выполняется в Web Worker"
    ],
    correctAnswer: 1,
    explanation: "Асинхронный итератор — это итератор, метод next() которого возвращает Promise, разрешающийся объектом {value, done}.",
    topic: "Асинхронные итераторы"
  },
  {
    id: 16,
    question: "Какой символ используется для создания асинхронно итерируемого объекта?",
    options: [
      "Symbol.iterator",
      "Symbol.asyncIterator",
      "Symbol.async",
      "Symbol.promise"
    ],
    correctAnswer: 1,
    explanation: "Для создания асинхронно итерируемого объекта используется метод Symbol.asyncIterator.",
    topic: "Асинхронные итераторы"
  },
  {
    id: 17,
    question: "Какой цикл используется для перебора асинхронно итерируемых объектов?",
    options: [
      "for...in",
      "for...of",
      "for await...of",
      "for async...of"
    ],
    correctAnswer: 2,
    explanation: "Для перебора асинхронно итерируемых объектов используется цикл for await...of.",
    topic: "Асинхронные итераторы"
  },
  {
    id: 18,
    question: "Как объявляется асинхронная функция-генератор?",
    options: [
      "async function* generator() {}",
      "function async* generator() {}",
      "function* async generator() {}",
      "async* function generator() {}"
    ],
    correctAnswer: 0,
    explanation: "Асинхронная функция-генератор объявляется с помощью async function* syntax.",
    topic: "Асинхронные генераторы"
  },
  {
    id: 19,
    question: "Что возвращает асинхронная функция-генератор?",
    options: [
      "Promise<Iterator>",
      "AsyncIterator",
      "AsyncGenerator",
      "Promise<Generator>"
    ],
    correctAnswer: 2,
    explanation: "Асинхронная функция-генератор возвращает объект AsyncGenerator, который реализует асинхронный итератор.",
    topic: "Асинхронные генераторы"
  },
  {
    id: 20,
    question: "Можно ли использовать await внутри обычного генератора?",
    options: [
      "Да, await работает в любом генераторе",
      "Нет, await можно использовать только в асинхронных генераторах",
      "Да, но только после yield",
      "Нет, await не работает с генераторами"
    ],
    correctAnswer: 1,
    explanation: "await можно использовать только внутри асинхронных функций, включая асинхронные генераторы (async function*).",
    topic: "Асинхронные генераторы"
  },
  {
    id: 21,
    question: "Что выведет этот код?\n\nasync function* asyncGen() {\n  yield Promise.resolve(1);\n  yield 2;\n}\n\nconst gen = asyncGen();\ngen.next().then(result => console.log(result.value));",
    options: [
      "Promise<1>",
      "1",
      "Promise object",
      "undefined"
    ],
    correctAnswer: 0,
    explanation: "Асинхронный генератор yield'ит Promise.resolve(1), поэтому result.value будет промисом, а не значением 1.",
    topic: "Асинхронные генераторы"
  },
  {
    id: 22,
    question: "Как правильно обрабатывать ошибки в асинхронных генераторах?",
    options: [
      "Только с помощью try-catch внутри генератора",
      "Только с помощью .catch() на результате next()",
      "Можно использовать как try-catch, так и .catch()",
      "Ошибки в асинхронных генераторах не обрабатываются"
    ],
    correctAnswer: 2,
    explanation: "Ошибки в асинхронных генераторах можно обрабатывать как с помощью try-catch внутри генератора, так и с помощью .catch() на промисе, возвращаемом next().",
    topic: "Асинхронные генераторы"
  },
  {
    id: 23,
    question: "В каком случае стоит использовать асинхронные итераторы?",
    options: [
      "Для работы с большими массивами",
      "Для обработки потоков данных, поступающих асинхронно",
      "Для ускорения синхронных операций",
      "Для работы с DOM элементами"
    ],
    correctAnswer: 1,
    explanation: "Асинхронные итераторы особенно полезны для обработки потоков данных, которые поступают асинхронно (например, чтение файлов, сетевые запросы, события).",
    topic: "Применение асинхронных итераторов"
  },
  {
    id: 24,
    question: "Что происходит при вызове return() на генераторе?",
    options: [
      "Генератор продолжает выполнение",
      "Генератор завершается и выполняется finally блок",
      "Генератор перезапускается сначала",
      "Ничего не происходит"
    ],
    correctAnswer: 1,
    explanation: "Вызов return() на генераторе принудительно завершает его выполнение и запускает блок finally, если он есть.",
    topic: "Управление генераторами"
  },
  {
    id: 25,
    question: "Что делает метод throw() генератора?",
    options: [
      "Создает новую ошибку",
      "Бросает исключение в месте последнего yield",
      "Останавливает выполнение генератора",
      "Логирует ошибку в консоль"
    ],
    correctAnswer: 1,
    explanation: "Метод throw() генератора бросает исключение в том месте, где генератор был приостановлен (в месте последнего yield).",
    topic: "Управление генераторами"
  },
  {
    id: 26,
    question: "Как реализовать бесконечный генератор чисел?",
    options: [
      "function* numbers() { let i = 0; while(true) yield i++; }",
      "function* numbers() { for(let i = 0; i < Infinity; i++) yield i; }",
      "function* numbers() { return [0, 1, 2, 3, ...]; }",
      "Все варианты правильные"
    ],
    correctAnswer: 0,
    explanation: "Бесконечный генератор можно реализовать с помощью цикла while(true) и yield внутри него. Это безопасно, так как генератор выполняется лениво.",
    topic: "Паттерны использования генераторов"
  }
]
