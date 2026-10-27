import type { LiveCodingTask } from '@/types/live-coding'

export const tasks09to12: LiveCodingTask[] = [
  {
    id: 9,
    slug: 'sort-by-multiple-fields',
    title: 'Отсортировать массив объектов',
    summary: 'Реализуйте сортировку по нескольким полям с учётом их приоритета.',
    difficulty: 'easy',
    tags: ['Массивы', 'Сортировка'],
    description:
      'Напишите sortBy(array, rules), которая возвращает новый массив объектов, отсортированный по нескольким полям. Каждое правило содержит key — имя поля и direction — направление asc или desc. Правила применяются по очереди: следующее поле сравнивается только при равенстве предыдущего.',
    requirements: [
      'Не изменяйте входной массив, правила и сами объекты. В результате сохраняются ссылки на исходные объекты.',
      'Каждое выбранное поле существует у всех объектов. Его значения — либо только конечные числа, либо только строки; смешанные типы, NaN и отсутствующие значения обрабатывать не нужно.',
      'asc означает возрастание, desc — убывание. Строки сравнивайте операторами < и > с учётом регистра, без локализованного алфавитного порядка.',
      'Если все выбранные поля равны, сохраняйте исходный порядок объектов: сортировка должна быть стабильной.',
      'Пустой список правил возвращает новую копию массива в исходном порядке. Пустой массив остаётся пустым.',
      'Встроенный sort() использовать можно. Предполагается современная среда со стабильной реализацией Array.prototype.sort().',
    ],
    examples: [
      {
        code: `const users = [
  { id: 'a', age: 30, name: 'Bob' },
  { id: 'b', age: 25, name: 'Ada' },
  { id: 'c', age: 25, name: 'Zoe' },
  { id: 'd', age: 25, name: 'Ada' },
];

sortBy(users, [
  { key: 'age', direction: 'asc' },
  { key: 'name', direction: 'desc' },
]).map(user => user.id); // ['c', 'b', 'd', 'a']`,
        explanation:
          'Сначала сравниваем возраст, затем имя по убыванию. Объекты b и d сохраняют взаимный порядок.',
      },
      {
        code: `sortBy([{ score: 2 }, { score: 10 }, { score: 1 }], [
  { key: 'score', direction: 'desc' },
]); // [{ score: 10 }, { score: 2 }, { score: 1 }]`,
      },
      {
        code: 'sortBy([{ id: 2 }, { id: 1 }], []); // [{ id: 2 }, { id: 1 }]\nsortBy([], []); // []',
      },
    ],
    starterCode: 'function sortBy(array, rules) {\n  // Ваше решение\n}',
    hints: [
      'sort() меняет массив, поэтому сначала создайте его поверхностную копию.',
      'Внутри компаратора перебирайте правила по приоритету и возвращайте результат при первом различии.',
      'Для desc поменяйте знак сравнения. Если различий нет, верните 0, чтобы стабильная сортировка сохранила порядок.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Компаратор с последовательными правилами',
          code: `function sortBy(array, rules) {
  return [...array].sort((a, b) => {
    for (const { key, direction } of rules) {
      const left = a[key];
      const right = b[key];

      if (left === right) continue;

      const order = left < right ? -1 : 1;
      return direction === 'desc' ? -order : order;
    }

    return 0;
  });
}`,
          explanation: [
            'Spread создаёт новый массив, поэтому sort() не меняет порядок элементов исходного массива. Объекты при этом не клонируются.',
            'Первое различающееся поле определяет порядок пары объектов. При равенстве переходим к следующему правилу.',
            'Для убывания инвертируем знак. Компаратор возвращает отрицательное число, положительное число или 0, а не boolean.',
            'Возврат 0 для равных объектов сохраняет их взаимный порядок благодаря стабильности встроенной сортировки. Без правил все сравнения дают 0.',
          ],
          timeComplexity:
            'Обычно O(r × n log n) при сравнении значений за O(1), где r — число правил. Алгоритм sort() зависит от движка.',
          spaceComplexity:
            'O(n) для копии массива; дополнительная память sort() зависит от движка.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: разрешите в правилах только поля T со строковыми или числовыми значениями, а направление задайте union-типом asc | desc.',
        'Mapped type SortableKey<T> отбрасывает неподходящие поля. Возвращаемый T[] сохраняет все поля исходных объектов.',
      ],
      variants: [
        {
          title: 'Типизированные ключи и направления сортировки',
          code: `type SortableKey<T> = {
  [K in keyof T]-?: T[K] extends string | number ? K : never;
}[keyof T];

type SortRule<T> = {
  key: SortableKey<T>;
  direction: 'asc' | 'desc';
};

function sortBy<T>(array: readonly T[], rules: readonly SortRule<T>[]): T[] {
  return [...array].sort((a, b) => {
    for (const { key, direction } of rules) {
      const left = a[key];
      const right = b[key];

      if (left === right) continue;

      const order = left < right ? -1 : 1;
      return direction === 'desc' ? -order : order;
    }

    return 0;
  });
}`,
          explanation: [
            'SortableKey<T> оставляет только допустимые ключи: опечатка в имени поля или выбор boolean-поля приведут к ошибке типов.',
            'readonly запрещает менять входные массивы на уровне типов. Сам алгоритм сортирует только созданную копию.',
            'Тип number не исключает NaN и Infinity, а union string | number не гарантирует единый тип во всём столбце. Эти ограничения остаются частью контракта входных данных.',
          ],
          timeComplexity: 'Обычно O(r × n log n) при сравнении значений за O(1).',
          spaceComplexity: 'O(n) для копии, плюс рабочая память sort().',
        },
      ],
    },
  },
  {
    id: 10,
    slug: 'array-to-tree',
    title: 'Преобразовать плоский массив в дерево',
    summary: 'Постройте дерево из объектов со связями id / parentId.',
    difficulty: 'easy',
    tags: ['Массивы', 'Деревья'],
    description:
      'Напишите buildTree(items), которая превращает плоский массив записей с id и parentId в массив корневых узлов. В каждом узле должно появиться поле children с массивом дочерних узлов.',
    requirements: [
      'id — уникальная строка или конечное число, parentId — идентификатор родителя или null. Число 1 и строка «1» — разные идентификаторы; 0 — допустимый id.',
      'Родитель может находиться после ребёнка во входном массиве. Циклов, ссылок на себя и повторяющихся id во входе нет.',
      'Узел с parentId: null становится корневым. Если родитель отсутствует в массиве, его ребёнок тоже становится корневым, сохраняя своё исходное parentId.',
      'Сохраняйте порядок корней и порядок детей одного родителя по их появлению во входном массиве.',
      'Не изменяйте входные записи: создайте новые объекты узлов, сохранив их поля, и новые массивы children. У листьев children должен быть пустым.',
      'В исходных записях нет поля children. Глубоко копировать другие вложенные значения не нужно. Для пустого входа верните [].',
    ],
    examples: [
      {
        code: `buildTree([
  { id: 2, parentId: 1, name: 'Child' },
  { id: 1, parentId: null, name: 'Root' },
  { id: 3, parentId: 1, name: 'Sibling' },
]);
// [{
//   id: 1, parentId: null, name: 'Root',
//   children: [
//     { id: 2, parentId: 1, name: 'Child', children: [] },
//     { id: 3, parentId: 1, name: 'Sibling', children: [] },
//   ],
// }]`,
      },
      {
        code: `buildTree([{ id: 7, parentId: 99 }]);
// [{ id: 7, parentId: 99, children: [] }]`,
        explanation: 'Родителя 99 нет во входе, поэтому узел 7 становится корнем.',
      },
      {
        code: `buildTree([{ id: 0, parentId: null }, { id: 1, parentId: 0 }]);
// [{ id: 0, parentId: null, children: [{ id: 1, parentId: 0, children: [] }] }]
buildTree([]); // []`,
      },
    ],
    starterCode: 'function buildTree(items) {\n  // Ваше решение\n}',
    hints: [
      'За первый проход создайте копии всех узлов и сохраните их в Map по id. Пока оставьте children пустым.',
      'Во втором проходе найдите для каждого узла родителя и добавьте узел в его children либо в список корней.',
      'Map сохраняет порядок добавления. Проверяйте parentId именно на null: проверка через !parentId неправильно обработает родителя с id: 0.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Два прохода с индексом узлов в Map',
          code: `function buildTree(items) {
  const nodes = new Map();

  for (const item of items) {
    nodes.set(item.id, { ...item, children: [] });
  }

  const roots = [];

  for (const node of nodes.values()) {
    const parent = node.parentId === null ? undefined : nodes.get(node.parentId);

    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}`,
          explanation: [
            'Первый проход создаёт независимые объекты узлов с пустыми children. Все родители уже находятся в Map к моменту связывания.',
            'Во втором проходе добавляем узел к родителю или в roots. Отсутствующий родитель обрабатывается по тому же правилу, что и null.',
            'Map различает числовые и строковые id. Обход values() сохраняет порядок входных записей, а push() — порядок корней и детей.',
            'Исходные объекты не меняются: все изменения children происходят в новых узлах. Проверка циклов не нужна по условиям задачи.',
          ],
          timeComplexity:
            'O(n) в среднем при доступе к Map за O(1), если число полей одной записи ограничено.',
          spaceComplexity:
            'O(n) для Map, копий узлов и массивов связей при ограниченном числе полей записи.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: опишите рекурсивный TreeNode<T>, добавляющий children к исходному типу записи.',
        'Generic T сохраняет дополнительные поля, например name. Map и массив корней должны использовать один и тот же тип узла.',
      ],
      variants: [
        {
          title: 'Рекурсивный тип дерева с исходными полями',
          code: `type FlatNode = {
  id: string | number;
  parentId: string | number | null;
};

type TreeNode<T extends FlatNode> = T & {
  children: TreeNode<T>[];
};

function buildTree<T extends FlatNode>(items: readonly T[]): TreeNode<T>[] {
  const nodes = new Map<FlatNode['id'], TreeNode<T>>();

  for (const item of items) {
    nodes.set(item.id, { ...item, children: [] });
  }

  const roots: TreeNode<T>[] = [];

  for (const node of nodes.values()) {
    const parent = node.parentId === null ? undefined : nodes.get(node.parentId);

    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}`,
          explanation: [
            'Ограничение T extends FlatNode требует поля id и parentId, а TreeNode<T> рекурсивно описывает дочерние узлы.',
            'Map.get() может вернуть undefined. Условие if (parent) сужает тип до существующего узла перед обращением к children.',
            'TypeScript проверяет форму записей, но не уникальность id и отсутствие циклов. Эти гарантии задаёт условие задачи.',
          ],
          timeComplexity: 'O(n) в среднем при ограниченном числе полей записи.',
          spaceComplexity: 'O(n) при ограниченном числе полей записи.',
        },
      ],
    },
  },
  {
    id: 11,
    slug: 'flatten-array',
    title: 'Flatten массива',
    summary: 'Разверните массив любой вложенности без использования Array.flat().',
    difficulty: 'medium',
    tags: ['Массивы', 'Рекурсия'],
    description:
      'Напишите flatten(array), которая собирает все значения вложенных массивов в один новый массив в порядке слева направо. Уровень вложенности заранее неизвестен; встроенные flat() и flatMap() использовать нельзя.',
    requirements: [
      'Разворачивайте только массивы. Объекты, null, undefined, строки и другие значения переносите в результат как есть.',
      'Сохраняйте порядок значений и ссылки на объекты. Не меняйте ни один из исходных массивов.',
      'Пустые вложенные массивы не добавляют элементов. Пустой вход возвращает [].',
      'Входные массивы не содержат пропусков и циклических ссылок. Одну и ту же вложенную коллекцию можно встретить в нескольких местах: её значения нужны в каждом из них.',
      'Учтите очень глубокую вложенность: используйте явный стек, чтобы не зависеть от ограничения стека вызовов рекурсивной функции.',
    ],
    examples: [
      { code: 'flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]' },
      { code: 'flatten([[], [[], []], 1]); // [1]\nflatten([]); // []' },
      {
        code: "flatten([null, [undefined, false, ['text']]]);\n// [null, undefined, false, 'text']",
      },
      {
        code: `const object = { id: 1 };
const shared = [2, 3];
const result = flatten([[object], shared, shared]);
// [{ id: 1 }, 2, 3, 2, 3]
result[0] === object; // true`,
      },
    ],
    starterCode: 'function flatten(array) {\n  // Ваше решение\n}',
    hints: [
      'Array.isArray() отличает массив от других значений, включая null и обычные объекты.',
      'В стеке можно хранить итераторы массивов. Родительский итератор запоминает позицию, пока обрабатывается вложенный массив.',
      'Берите следующий элемент верхнего итератора. Для массива добавляйте его итератор в стек, для обычного значения — добавляйте значение в результат; завершённый итератор удаляйте.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Обход в глубину со стеком итераторов',
          code: `function flatten(array) {
  const result = [];
  const stack = [array[Symbol.iterator]()];

  while (stack.length > 0) {
    const iterator = stack[stack.length - 1];
    const step = iterator.next();

    if (step.done) {
      stack.pop();
    } else if (Array.isArray(step.value)) {
      stack.push(step.value[Symbol.iterator]());
    } else {
      result.push(step.value);
    }
  }

  return result;
}`,
          explanation: [
            'В начале стек содержит итератор внешнего массива. Верхний итератор всегда соответствует массиву, который мы сейчас обходим.',
            'При встрече вложенного массива добавляем его итератор. После его завершения возвращаемся к родительскому итератору, который уже помнит следующую позицию.',
            'Такой обход сохраняет порядок слева направо. Обычные значения, включая undefined, добавляются только в ветке step.done === false.',
            'Стек заменяет рекурсивные вызовы и не копирует все элементы через spread. Это позволяет обрабатывать глубокую вложенность без переполнения стека вызовов.',
          ],
          timeComplexity:
            'O(n), где n учитывает все просмотренные элементы и вложенные массивы, в том числе пустые.',
          spaceComplexity:
            'O(d + m): d итераторов для глубины вложенности и m элементов результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: используйте readonly unknown[] для произвольного входа, unknown[] для результата и Iterator<unknown> для элементов стека.',
        'unknown заставляет проверить тип значения перед использованием. Поскольку вход может быть неоднородным, результат не обещает массив только чисел или строк.',
      ],
      variants: [
        {
          title: 'Безопасная работа с неизвестными значениями',
          code: `function flatten(array: readonly unknown[]): unknown[] {
  const result: unknown[] = [];
  const stack: Iterator<unknown>[] = [array[Symbol.iterator]()];

  while (stack.length > 0) {
    const iterator = stack[stack.length - 1]!;
    const step = iterator.next();

    if (step.done) {
      stack.pop();
    } else if (Array.isArray(step.value)) {
      stack.push(step.value[Symbol.iterator]());
    } else {
      result.push(step.value);
    }
  }

  return result;
}`,
          explanation: [
            'Iterator<unknown> позволяет одинаково хранить позиции обхода внешнего и вложенных массивов. Array.isArray() проверяет, когда нужно спуститься глубже.',
            'Утверждение ! у верхушки стека обосновано условием stack.length > 0: мы читаем существующий элемент массива без пропусков.',
            'Для работы с результатом вызывающий код должен сузить unknown, например через typeof value === «number» перед арифметикой.',
          ],
          timeComplexity: 'O(n) по общему числу просмотренных элементов и массивов.',
          spaceComplexity: 'O(d + m).',
        },
      ],
    },
  },
  {
    id: 12,
    slug: 'flatten-object',
    title: 'Flatten объекта',
    summary: "Преобразуйте вложенный объект в плоский: { a: { b: 1 } } → { 'a.b': 1 }.",
    difficulty: 'medium',
    tags: ['Объекты', 'Рекурсия'],
    description:
      'Напишите flattenObject(object), которая превращает вложенный объект в плоский словарь. Путь к каждому значению становится строковым ключом, а имена полей в пути разделяются точками.',
    requirements: [
      'Внешний объект — обычный объект с прототипом Object.prototype или null. Разворачивайте только такие же вложенные объекты.',
      'Массивы, Date, Map и другие специальные объекты остаются значениями целиком, как и null, undefined и примитивы.',
      'Сохраняйте вложенные пустые объекты как значения: { a: {} } превращается в словарь с ключом a и пустым объектом. Пустой внешний объект даёт пустой словарь.',
      'Обрабатывайте только собственные перечисляемые строковые свойства. Ключи непустые и не содержат точек; символы и неперечисляемые свойства пропускаются.',
      'Циклических ссылок нет. Не изменяйте вход и не копируйте глубоко оставленные значения: массивы и другие объекты должны сохранять ссылки.',
      'Результат должен безопасно поддерживать ключи __proto__ и constructor. Порядок ключей не важен; допускается словарь без прототипа.',
    ],
    examples: [
      {
        code: "flattenObject({ a: { b: 1, c: 2 }, active: false });\n// { 'a.b': 1, 'a.c': 2, active: false }",
      },
      {
        code: `flattenObject({ user: { name: 'Ada' }, tags: ['js'], meta: {}, deleted: null });
// { 'user.name': 'Ada', tags: ['js'], meta: {}, deleted: null }`,
      },
      {
        code: `const date = new Date('2026-01-01T00:00:00Z');
const result = flattenObject({ event: { at: date } });
result['event.at'] === date; // true`,
      },
      {
        code: "flattenObject({ ['__proto__']: 1, constructor: 2 });\n// Собственные свойства: { ['__proto__']: 1, constructor: 2 }\nflattenObject({}); // Пустой словарь",
      },
    ],
    starterCode: 'function flattenObject(object) {\n  // Ваше решение\n}',
    hints: [
      'Не любой typeof value === «object» нужно разворачивать: отдельно исключите null и проверьте прототип объекта.',
      'Храните в стеке пары из объекта и уже накопленного пути. Для каждого свойства добавляйте к пути его имя через точку.',
      'Разворачивайте непустые обычные объекты, а остальные значения записывайте в результат. Словарь без прототипа защитит специальные ключи.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Стек объектов и накопленных путей',
          code: `function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function flattenObject(object) {
  const result = Object.create(null);
  const stack = [{ value: object, prefix: '' }];

  while (stack.length > 0) {
    const current = stack.pop();

    for (const [key, value] of Object.entries(current.value)) {
      const path = current.prefix ? current.prefix + '.' + key : key;

      if (isPlainObject(value) && Object.keys(value).length > 0) {
        stack.push({ value, prefix: path });
      } else {
        result[path] = value;
      }
    }
  }

  return result;
}`,
          explanation: [
            'isPlainObject() проверяет прототип. Массивы, Date и Map не проходят эту проверку, поэтому остаются значениями и сохраняют ссылки.',
            'Каждый элемент стека хранит объект и путь к нему. На первом уровне используем имя ключа, на следующих — соединяем префикс и ключ через точку.',
            'Непустые обычные объекты отправляются в стек. Пустые объекты записываются как значения, чтобы информация о них не потерялась.',
            'Object.entries() читает только собственные перечисляемые строковые свойства. Object.create(null) делает запись ключа __proto__ обычной операцией со словарём.',
            'Алгоритм не использует рекурсивные вызовы. Порядок появления ключей может измениться, что разрешено условием.',
          ],
          timeComplexity:
            'O(n + p), где n — число посещённых свойств, а p — суммарная длина всех создаваемых путей.',
          spaceComplexity: 'O(n + p) в худшем случае, включая стек, пути и словарь результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: напишите type guard isPlainObject(value), сужающий unknown до Record<string, unknown>.',
        'Результат остаётся словарём неизвестных значений. Полученные значения нужно проверять перед вызовом их методов или арифметикой.',
      ],
      variants: [
        {
          title: 'Type guard для обычных объектов',
          code: `function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function flattenObject(object: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = Object.create(null);
  const stack: { value: Record<string, unknown>; prefix: string }[] = [
    { value: object, prefix: '' },
  ];

  while (stack.length > 0) {
    const current = stack.pop()!;

    for (const [key, value] of Object.entries(current.value)) {
      const path = current.prefix ? current.prefix + '.' + key : key;

      if (isPlainObject(value) && Object.keys(value).length > 0) {
        stack.push({ value, prefix: path });
      } else {
        result[path] = value;
      }
    }
  }

  return result;
}`,
          explanation: [
            'После isPlainObject(value) TypeScript разрешает работать с value как со словарём и добавлять его в типизированный стек.',
            'pop() в общем случае может вернуть undefined. Здесь непустота стека проверена условием цикла, что обосновывает утверждение !.',
            'Record<string, unknown> описывает форму данных, но не прототип и допустимые имена ключей. Ограничения на корневой объект, точки в ключах и циклы остаются частью контракта.',
          ],
          timeComplexity: 'O(n + p), включая создание строк путей.',
          spaceComplexity: 'O(n + p) в худшем случае.',
        },
      ],
    },
  },
]
