import type { LiveCodingTask } from '@/types/live-coding'

export const tasks13to16: LiveCodingTask[] = [
  {
    id: 13,
    slug: 'get-nested-value',
    title: "get(obj, 'a.b.c')",
    summary: 'Получите значение по строковому пути к вложенному свойству, как в lodash.',
    difficulty: 'medium',
    tags: ['Объекты'],
    description:
      'Напишите get(object, path, defaultValue), которая читает вложенное значение по пути с точками. Если путь отсутствует или найденное значение равно undefined, верните defaultValue. Это учебный вариант get с ограниченным синтаксисом пути.',
    requirements: [
      'path — строка вида a.b.c. Индексы массивов задаются так же: users.0.name. Квадратные скобки и экранирование точек не поддерживаются.',
      'Читайте только собственные свойства объектов и массивов. Унаследованные свойства не считаются частью пути; примитивы не преобразуются в объекты.',
      'null на промежуточном шаге прерывает поиск. В конце пути null, false, 0 и пустая строка являются найденными значениями и не заменяются на defaultValue.',
      'Пустой путь возвращает сам вход, кроме undefined: для него возвращается defaultValue. Путь с пустым сегментом, например a..b, возвращает defaultValue.',
      'Если defaultValue не передан, он равен undefined. Не изменяйте вход. Предполагаются обычные свойства со значениями, без getters и Proxy.',
    ],
    examples: [
      {
        code: "const data = { user: { name: 'Ada' }, users: [{ id: 7 }] };\nget(data, 'user.name'); // 'Ada'\nget(data, 'users.0.id'); // 7\nget(data, 'user.age', 18); // 18",
      },
      {
        code: "get({ a: null }, 'a', 'fallback'); // null\nget({ a: null }, 'a.b', 'fallback'); // 'fallback'\nget({ a: undefined }, 'a', 'fallback'); // 'fallback'",
      },
      {
        code: "get({ a: 0 }, 'a', 10); // 0\nget({ a: false }, 'a', true); // false\nget({}, 'toString', 'missing'); // 'missing'",
      },
      {
        code: "const source = { a: 1 };\nget(source, '') === source; // true\nget(source, 'a..b', 'missing'); // 'missing'",
      },
    ],
    starterCode: 'function get(object, path, defaultValue) {\n  // Ваше решение\n}',
    hints: [
      "Разбейте непустой путь через split('.') и храните текущее значение, начиная с object.",
      'Перед чтением следующего поля проверьте, что текущее значение — ненулевой объект с собственным ключом. Object.hasOwn() работает и для объектов без прототипа.',
      'В конце проверяйте именно равенство undefined, а не falsy-значение и не null: || и ?? здесь изменят контракт.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Последовательный обход собственного пути',
          code: `function get(object, path, defaultValue) {
  const keys = path === '' ? [] : path.split('.');
  let current = object;

  for (const key of keys) {
    if (
      key === '' ||
      current === null ||
      typeof current !== 'object' ||
      !Object.hasOwn(current, key)
    ) {
      return defaultValue;
    }

    current = current[key];
  }

  return current === undefined ? defaultValue : current;
}`,
          explanation: [
            'Пустой путь создаёт пустой список ключей: цикл не выполняется, и результатом становится сам вход.',
            'На каждом шаге проверяем возможность чтения и наличие собственного ключа. Числовые индексы массива доступны как строковые свойства.',
            'Унаследованные свойства не читаются, но собственный ключ __proto__ обрабатывается как обычное поле.',
            'Только undefined заменяется значением по умолчанию. Поэтому 0, false, пустая строка и конечный null сохраняются.',
          ],
          timeComplexity: 'O(L), где L — длина пути, если доступ к свойству считать O(1).',
          spaceComplexity: 'O(L) для массива сегментов пути.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: произвольный строковый путь не гарантирует тип найденного значения. Используйте unknown вместо обещания результата через произвольный generic.',
        'После получения результата вызывающий код должен проверить тип, например через typeof, перед использованием его методов.',
      ],
      variants: [
        {
          title: 'Динамический путь с результатом unknown',
          code: `function get(object: unknown, path: string, defaultValue?: unknown): unknown {
  const keys = path === '' ? [] : path.split('.');
  let current: unknown = object;

  for (const key of keys) {
    if (
      key === '' ||
      current === null ||
      typeof current !== 'object' ||
      !Object.hasOwn(current, key)
    ) {
      return defaultValue;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return current === undefined ? defaultValue : current;
}`,
          explanation: [
            'unknown требует проверки null и typeof до доступа к свойству.',
            'После проверки собственного ключа приведение к Record<string, unknown> позволяет прочитать поле, но не утверждает ничего о типе его значения.',
            'Даже при числовом defaultValue найденное значение может быть строкой или объектом, поэтому общий результат остаётся unknown.',
          ],
          timeComplexity: 'O(L).',
          spaceComplexity: 'O(L).',
        },
      ],
    },
  },
  {
    id: 14,
    slug: 'deep-equal',
    title: 'deepEqual(a, b)',
    summary: 'Реализуйте глубокое сравнение объектов и вложенных значений.',
    difficulty: 'medium',
    tags: ['Объекты', 'Рекурсия'],
    description:
      'Напишите deepEqual(a, b), которая сравнивает примитивы, обычные объекты и массивы по содержимому, а не только по ссылке. Сначала определите правила равенства, затем реализуйте рекурсивный обход.',
    requirements: [
      'Для примитивов используйте правила Object.is(): NaN равен NaN, а 0 и -0 различаются. Одинаковая ссылка всегда означает равенство.',
      'Обычные объекты имеют прототип Object.prototype или null. При сравнении разных объектов их прототипы должны совпадать.',
      'Сравнивайте набор собственных перечисляемых строковых ключей и их значения. Порядок ключей не важен; символы и неперечисляемые свойства игнорируются. Getters, setters и Proxy не входят в задачу.',
      'Массив не равен объекту. Для обычных Array без подклассов сравнивайте длину и собственные перечисляемые свойства, включая дополнительные поля. Пропуск отличается от явного undefined.',
      'Date, Map, Set, функции и экземпляры классов сравниваются только по ссылке; сравнение их содержимого не требуется.',
      'Циклических ссылок нет, глубина умеренная. Повторное использование одной ссылки в разных ветках не влияет на равенство содержимого. Не изменяйте вход.',
    ],
    examples: [
      {
        code: 'deepEqual({ a: 1, b: [2, { c: 3 }] }, { b: [2, { c: 3 }], a: 1 }); // true\ndeepEqual({ a: 1 }, { a: 2 }); // false',
      },
      {
        code: 'deepEqual(NaN, NaN); // true\ndeepEqual(0, -0); // false\ndeepEqual(null, {}); // false',
      },
      {
        code: 'deepEqual({}, { a: undefined }); // false\ndeepEqual(new Array(1), [undefined]); // false\ndeepEqual([], {}); // false',
      },
      {
        code: 'deepEqual(Object.create(null), {}); // false\ndeepEqual(new Date(0), new Date(0)); // false',
        explanation:
          'Разные прототипы обычных объектов и специальные объекты обрабатываются по явно заданным правилам.',
      },
    ],
    starterCode: 'function deepEqual(a, b) {\n  // Ваше решение\n}',
    hints: [
      'Начните с Object.is(), затем отсеките null и несовместимые типы. Помните, что typeof null возвращает object.',
      'Отдельно проверьте массивы и их длины. Для обычных объектов проверьте прототипы.',
      'Сравните количество ключей, наличие каждого перечисляемого собственного ключа во втором объекте и значения рекурсивно. Одного сравнения a[key] и b[key] недостаточно: отсутствующее поле и поле undefined различаются.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Рекурсивное сравнение ключей и значений',
          code: `function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  } else {
    const prototype = Object.getPrototypeOf(a);
    if (
      prototype !== Object.getPrototypeOf(b) ||
      (prototype !== Object.prototype && prototype !== null)
    ) return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (
      !Object.prototype.propertyIsEnumerable.call(b, key) ||
      !deepEqual(a[key], b[key])
    ) return false;
  }

  return true;
}`,
          explanation: [
            'Object.is() быстро обрабатывает одинаковые ссылки и задаёт выбранную семантику примитивов, включая NaN и знаковый ноль.',
            'Массивы проверяются отдельно: длина учитывает и пропуски, а Object.keys() перечисляет только существующие элементы и дополнительные перечисляемые поля.',
            'Среди разных немассивных объектов допускаем только обычные объекты с одинаковым прототипом. Это исключает ошибочное равенство любых двух пустых Map или Date.',
            'Количество ключей и propertyIsEnumerable() проверяют совпадение наборов собственных перечисляемых свойств. Отсутствующее или неперечисляемое поле не подменяет перечисляемое поле со значением undefined. Порядок ключей не влияет на ответ.',
          ],
          timeComplexity:
            'O(n) при доступе к свойствам за O(1), где n — число посещённых свойств с учётом повторного обхода общих вложенных объектов.',
          spaceComplexity:
            'O(n) в худшем случае для массивов ключей и рекурсивного стека. Глубина ограничена стеком вызовов среды.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: принимайте два unknown и возвращайте boolean. Перед чтением свойств последовательно сужайте типы.',
        'Функция проверки равенства не должна обещать, что один объект имеет статический тип другого: здесь результат — обычный boolean, а не type predicate.',
      ],
      variants: [
        {
          title: 'Проверки типов перед рекурсивным сравнением',
          code: `function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  } else {
    const prototype = Object.getPrototypeOf(a);
    if (
      prototype !== Object.getPrototypeOf(b) ||
      (prototype !== Object.prototype && prototype !== null)
    ) return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;

  for (const key of keysA) {
    if (
      !Object.prototype.propertyIsEnumerable.call(right, key) ||
      !deepEqual(left[key], right[key])
    ) return false;
  }

  return true;
}`,
          explanation: [
            'После проверок null, typeof и Array.isArray() можно безопасно читать длину массива и перечислять ключи объектов.',
            'Приведение к Record<string, unknown> используется только для динамического чтения полей. Их значения остаются unknown и снова проходят все проверки в рекурсивном вызове.',
          ],
          timeComplexity: 'O(n) по числу посещённых свойств при доступе к ним за O(1).',
          spaceComplexity: 'O(n) в худшем случае, включая рекурсивный стек и массивы ключей.',
        },
      ],
    },
  },
  {
    id: 15,
    slug: 'deep-clone',
    title: 'deepClone()',
    summary: 'Скопируйте объекты и массивы, затем разберите Date, Map и циклические ссылки.',
    difficulty: 'medium',
    tags: ['Объекты', 'Рекурсия'],
    description:
      'Реализуйте deepClone(value) в два этапа. Сначала скопируйте обычные объекты и массивы без циклов. Затем расширьте решение: добавьте Date, Map, циклические ссылки и сохранение общих ссылок внутри копии.',
    requirements: [
      'Примитивы и функции возвращайте как есть. Поддержите обычные объекты с Object.prototype или null и обычные массивы без подклассов.',
      'Создавайте новые объекты и массивы на всех поддерживаемых уровнях, сохраняя длину массивов и пропуски. Не меняйте исходные значения.',
      'Копируйте собственные перечисляемые строковые и символьные свойства со значениями. Getters, setters, Proxy и восстановление дескрипторов не входят в задачу; неперечисляемые свойства пропускаются, кроме длины массива.',
      'Сохраняйте прототип обычного объекта. Ключ __proto__ должен копироваться как собственное поле, не меняя прототип результата.',
      'Базовый этап: во входе нет циклов, Date и Map. Расширенный этап: Date копируется по времени, а у Map глубоко копируются и ключи, и значения.',
      'В расширенном этапе циклы должны вести на копии, а несколько ссылок на один исходный объект — на одну и ту же копию. Поддержите также перечисляемые дополнительные поля Date и Map.',
      'Для остальных видов объектов, например Set, RegExp и экземпляров классов, выбрасывайте TypeError. JSON-сериализацию, structuredClone() и библиотеки использовать нельзя.',
    ],
    examples: [
      {
        code: `const source = { users: [{ name: 'Ada' }] };
const copy = deepClone(source);
copy.users[0].name = 'Grace';
source.users[0].name; // 'Ada'
copy.users === source.users; // false`,
      },
      {
        code: `const date = new Date('2026-01-01T00:00:00Z');
const copy = deepClone(date);
copy === date; // false
copy.getTime() === date.getTime(); // true`,
        explanation:
          'Date, Map и следующие примеры с общими ссылками относятся к расширенному этапу.',
      },
      {
        code: `const key = { id: 1 };
const source = { key, map: new Map([[key, { count: 2 }]]) };
const copy = deepClone(source);
copy.map.has(copy.key); // true
copy.map.has(key); // false`,
      },
      {
        code: `const source = { name: 'Ada' };
source.self = source;
const copy = deepClone(source);
copy !== source; // true
copy.self === copy; // true`,
      },
    ],
    starterCode:
      'function deepClone(value) {\n  // Сначала обычные объекты и массивы\n  // Затем Date, Map, общие ссылки и циклы\n}',
    hints: [
      'Верните примитив без изменений. Для массива или объекта создайте пустой контейнер и рекурсивно скопируйте его собственные перечисляемые свойства.',
      'Reflect.ownKeys() включает символьные ключи. Object.defineProperty() позволяет безопасно создать собственное поле __proto__.',
      'Для расширения понадобится WeakMap: исходный объект → его копия. Запишите пустую копию в WeakMap до обхода вложенных значений.',
      'У Date и Map есть внутренние данные: одного обхода свойств недостаточно. Для Map клонируйте и ключи, и значения с тем же кешем ссылок.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Этап 1: обычные объекты и массивы без циклов',
          code: `function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;

  const prototype = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) {
    throw new TypeError('Unsupported object type');
  }

  const copy = Array.isArray(value)
    ? new Array(value.length)
    : Object.create(prototype);

  for (const key of Reflect.ownKeys(value)) {
    if (!Object.prototype.propertyIsEnumerable.call(value, key)) continue;

    Object.defineProperty(copy, key, {
      value: deepClone(value[key]),
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }

  return copy;
}`,
          explanation: [
            'Каждый поддерживаемый контейнер создаётся заново. new Array(length) сохраняет длину и пропуски, потому что копируются только существующие перечисляемые свойства.',
            'Reflect.ownKeys() перечисляет и строки, и символы. Проверка propertyIsEnumerable() отбрасывает неперечисляемые поля.',
            'Object.create(prototype) сохраняет Object.prototype или null, а defineProperty() создаёт безопасное собственное поле даже для __proto__.',
            'Без кеша общая вложенная ссылка клонируется отдельно при каждом посещении. Циклический ввод для этого этапа запрещён.',
          ],
          timeComplexity:
            'O(n) по числу посещённых свойств и скопированных контейнеров, включая повторные обходы общих ссылок.',
          spaceComplexity:
            'O(n) для копий и рекурсивного стека; глубина ограничена стеком вызовов среды.',
        },
        {
          title: 'Этап 2: Date, Map, циклы и общие ссылки',
          code: `function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);

  let copy;
  if (Array.isArray(value)) {
    copy = new Array(value.length);
  } else if (value instanceof Date) {
    copy = new Date(value.getTime());
  } else if (value instanceof Map) {
    copy = new Map();
  } else {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError('Unsupported object type');
    }
    copy = Object.create(prototype);
  }

  seen.set(value, copy);

  if (value instanceof Map) {
    for (const [key, item] of value) {
      copy.set(deepClone(key, seen), deepClone(item, seen));
    }
  }

  for (const key of Reflect.ownKeys(value)) {
    if (!Object.prototype.propertyIsEnumerable.call(value, key)) continue;

    Object.defineProperty(copy, key, {
      value: deepClone(value[key], seen),
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }

  return copy;
}`,
          explanation: [
            'Сначала выделяем пустую копию нужного вида, затем сразу записываем её в seen. Если при обходе встретится исходный объект повторно, вернётся эта же копия.',
            'Именно регистрация до рекурсии сохраняет циклы и общие ссылки. Например, source.self становится copy.self === copy.',
            'Date получает ту же временную отметку, включая NaN для Invalid Date. Map заполняется копиями ключей и значений с общим WeakMap.',
            'После внутренних данных копируются перечисляемые свойства, включая дополнительные поля Date и Map. Неподдерживаемые объекты не превращаются молча в пустые словари.',
            'Рекурсивный обход рассчитан на умеренную глубину. Для очень глубоких данных можно отдельно заменить рекурсию явным стеком.',
          ],
          timeComplexity:
            'O(v + e) в среднем: v — число разных объектов, e — число просмотренных свойств и элементов Map.',
          spaceComplexity: 'O(v + e) для копий, WeakMap и рекурсивного стека.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'TS-вариант сразу включает расширенный этап. Практика типов: сохраните внешний тип T, а внутри обходите unknown с проверками во время выполнения.',
        'Единственное итоговое приведение к T опирается на контракт копирования. Оно не проверяет поддерживаемые типы и не делает доступными Set или экземпляры произвольных классов.',
      ],
      variants: [
        {
          title: 'Generic-обёртка и обход unknown с WeakMap',
          code: `function deepClone<T>(value: T): T {
  const seen = new WeakMap<object, object>();

  function clone(current: unknown): unknown {
    if (current === null || typeof current !== 'object') return current;
    if (seen.has(current)) return seen.get(current);

    let copy: object;
    if (Array.isArray(current)) {
      copy = new Array(current.length);
    } else if (current instanceof Date) {
      copy = new Date(current.getTime());
    } else if (current instanceof Map) {
      copy = new Map<unknown, unknown>();
    } else {
      const prototype = Object.getPrototypeOf(current);
      if (prototype !== Object.prototype && prototype !== null) {
        throw new TypeError('Unsupported object type');
      }
      copy = Object.create(prototype);
    }

    seen.set(current, copy);

    if (current instanceof Map && copy instanceof Map) {
      for (const [key, item] of current) {
        copy.set(clone(key), clone(item));
      }
    }

    for (const key of Reflect.ownKeys(current)) {
      if (!Object.prototype.propertyIsEnumerable.call(current, key)) continue;

      Object.defineProperty(copy, key, {
        value: clone((current as Record<PropertyKey, unknown>)[key]),
        enumerable: true,
        writable: true,
        configurable: true,
      });
    }

    return copy;
  }

  return clone(value) as T;
}`,
          explanation: [
            'Внешний generic сохраняет форму данных: у копии Date остаются методы Date, а у объекта — его типизированные поля.',
            'Внутри unknown сужается через typeof, Array.isArray() и instanceof. Динамические значения свойств и элементы Map снова проходят тот же обход.',
            'WeakMap<object, object> хранит соответствие исходного контейнера и копии. Кеш находится внутри одного вызова deepClone(), поэтому независимые вызовы создают независимые копии.',
          ],
          timeComplexity: 'O(v + e) в среднем.',
          spaceComplexity: 'O(v + e), включая результат, кеш ссылок и рекурсивный стек.',
        },
      ],
    },
  },
  {
    id: 16,
    slug: 'array-map',
    title: 'Собственный Array.prototype.map',
    summary: 'Реализуйте преобразование элементов массива через callback без встроенного map().',
    difficulty: 'medium',
    tags: ['Массивы', 'Функции'],
    description:
      'Реализуйте основные правила Array.prototype.map в функции myMap(array, callback, thisArg). Для удобства проверки массив передаётся первым аргументом. Встроенный map() и библиотеки использовать нельзя.',
    requirements: [
      'Поддержите обычные массивы, в том числе разреженные. Array-like объекты, подклассы Array и Symbol.species обрабатывать не требуется.',
      'Верните новый массив той же исходной длины. Для каждого существующего индекса вызовите callback(value, index, array); третьим аргументом передайте исходный массив.',
      'Пропуски не вызывают callback и остаются пропусками в результате. Явный undefined является элементом и передаётся callback. Унаследованный индекс считается существующим.',
      'Зафиксируйте длину до обхода. Элементы, добавленные за её пределами, не посещаются; удалённый до посещения индекс пропускается; изменённое до посещения значение читается заново.',
      'Передайте thisArg как this обычной callback-функции. Если callback — стрелочная функция, её лексический this не меняется.',
      'Если вход не массив или callback не функция, выбрасывайте TypeError, даже для пустого массива. Ошибки callback не перехватывайте.',
      'Сама myMap не меняет входной массив; callback может менять его, как при работе встроенного map().',
    ],
    examples: [
      { code: 'myMap([1, 2, 3], (value, index) => value * 2 + index); // [2, 5, 8]' },
      {
        code: `const source = [1, , undefined];
const result = myMap(source, value => String(value));
result.length; // 3
result[0]; // '1'
1 in result; // false
result[2]; // 'undefined'`,
      },
      {
        code: `myMap([1, 2], function (value) {
  return value * this.factor;
}, { factor: 3 }); // [3, 6]`,
      },
      {
        code: `const source = [1, 2, 3];
myMap(source, (value, index, array) => {
  if (index === 0) {
    array.push(4);
    delete array[1];
  }
  return value * 10;
}); // [10, <пропуск>, 30]`,
        explanation:
          'Новый индекс 3 не посещается, удалённый индекс 1 остаётся пропуском в результате.',
      },
    ],
    starterCode: 'function myMap(array, callback, thisArg) {\n  // Ваше решение\n}',
    hints: [
      'Сохраните начальную длину и заранее создайте new Array(length). push() не подойдёт: он сдвинет индексы при пропусках.',
      'Проверяйте index in array непосредственно перед вызовом callback. Так учитываются и пропуски, и удаление элементов, и унаследованные индексы.',
      'Вызов callback.call(thisArg, value, index, array) передаст контекст и все три аргумента.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Фиксированная длина и проверка существующих индексов',
          code: `function myMap(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError('Expected an array');
  if (typeof callback !== 'function') throw new TypeError('Expected a callback');

  const length = array.length;
  const result = new Array(length);

  for (let index = 0; index < length; index++) {
    if (index in array) {
      result[index] = callback.call(thisArg, array[index], index, array);
    }
  }

  return result;
}`,
          explanation: [
            'Проверки выполняются до обхода, поэтому неправильный callback вызывает ошибку и при пустом входе.',
            'Длина фиксируется один раз. new Array(length) создаёт результат с пропусками, которые заполняются только для посещённых индексов.',
            'Проверка in выполняется на каждом шаге и учитывает прототип. Чтение array[index] происходит непосредственно перед callback, поэтому видны предыдущие изменения массива.',
            'call() передаёт контекст обычной функции. Значение this у стрелочной функции определяется местом её создания.',
          ],
          timeComplexity: 'O(n) по исходной длине массива без учёта работы callback.',
          spaceComplexity: 'O(n) в худшем случае для результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: T — тип входного элемента, U — тип результата callback, Context — тип thisArg.',
        'Параметр this в типе callback описывает контекст, но не добавляет обычный аргумент. Вход оставляем T[], поскольку callback имеет право его изменять.',
      ],
      variants: [
        {
          title: 'Generic-преобразование T в U с контекстом',
          code: `function myMap<T, U, Context = undefined>(
  array: T[],
  callback: (this: Context, value: T, index: number, array: T[]) => U,
  thisArg?: Context,
): U[] {
  if (!Array.isArray(array)) throw new TypeError('Expected an array');
  if (typeof callback !== 'function') throw new TypeError('Expected a callback');

  const length = array.length;
  const result: U[] = new Array(length);

  for (let index = 0; index < length; index++) {
    if (index in array) {
      result[index] = callback.call(thisArg as Context, array[index] as T, index, array);
    }
  }

  return result;
}`,
          explanation: [
            'Тип результата выводится из callback: например, преобразование числа в строку даёт string[].',
            'После проверки in чтение элемента приводится к T. Это отличает отсутствующую ячейку от допустимого значения undefined, если оно входит в T.',
            'Необязательный thisArg означает, что вызывающий код должен передавать контекст, если callback использует его поля. Как и у встроенного map(), одна только сигнатура не гарантирует, что такой аргумент передан.',
          ],
          timeComplexity: 'O(n) без учёта callback.',
          spaceComplexity: 'O(n) в худшем случае.',
        },
      ],
    },
  },
]
