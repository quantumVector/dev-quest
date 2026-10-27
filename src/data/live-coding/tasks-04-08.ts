import type { LiveCodingTask } from '@/types/live-coding'

export const tasks04to08: LiveCodingTask[] = [
  {
    id: 4,
    slug: 'reverse-string',
    title: 'Развернуть строку',
    summary: 'Верните символы строки в обратном порядке без использования reverse().',
    difficulty: 'easy',
    tags: ['Строки'],
    description:
      'Напишите функцию reverseString(text), которая возвращает новую строку с символами в обратном порядке. Не используйте готовые методы reverse() и toReversed().',
    requirements: [
      'Вход — строка. Сохраните все символы, включая пробелы, регистр и знаки препинания.',
      'Для пустой строки верните пустую строку, для одного символа — этот же символ.',
      'Символом считается одна кодовая точка Unicode: одиночный emoji нельзя разбивать на части.',
      'Составные emoji и буквы с комбинируемыми знаками объединять в один символ не требуется. Нормализацию строки выполнять не нужно.',
    ],
    examples: [
      { code: "reverseString('hello'); // 'olleh'" },
      { code: "reverseString('Привет!'); // '!тевирП'" },
      { code: "reverseString('a🙂b'); // 'b🙂a'" },
      { code: "reverseString(' a '); // ' a '\nreverseString(''); // ''" },
    ],
    starterCode: 'function reverseString(text) {\n  // Ваше решение\n}',
    hints: [
      "Преобразуйте строку в массив кодовых точек. Array.from(text) сохраняет одиночные emoji, а split('') может разбить их на части.",
      'Начните с последнего элемента массива и двигайтесь к первому, собирая новый массив.',
      "Соедините результат через join(''). Это позволяет обойтись без многократного добавления символа в начало строки.",
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Обход массива символов с конца',
          code: `function reverseString(text) {
  const characters = Array.from(text);
  const reversed = [];

  for (let index = characters.length - 1; index >= 0; index--) {
    reversed.push(characters[index]);
  }

  return reversed.join('');
}`,
          explanation: [
            'Array.from() использует итератор строки и выделяет кодовые точки Unicode. Например, 🙂 остаётся одним элементом массива.',
            'Обратный цикл переносит символы в новый массив. Ни reverse(), ни toReversed() не используются.',
            'Для пустой строки начальный индекс равен -1, поэтому цикл не выполняется, а join() возвращает пустую строку.',
          ],
          timeComplexity: 'O(n): создание массива, обратный проход и соединение результата.',
          spaceComplexity: 'O(n) для массивов символов и строки результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: задайте вход и результат как string, а массив результата — как string[].',
        'При noUncheckedIndexedAccess чтение массива по индексу может иметь тип string | undefined. Здесь индекс гарантированно находится в границах массива, созданного через Array.from().',
      ],
      variants: [
        {
          title: 'Строка на входе и выходе',
          code: `function reverseString(text: string): string {
  const characters = Array.from(text);
  const reversed: string[] = [];

  for (let index = characters.length - 1; index >= 0; index--) {
    reversed.push(characters[index]!);
  }

  return reversed.join('');
}`,
          explanation: [
            'TypeScript выводит string[] для characters. Явный тип reversed не позволяет добавить туда число или другое значение.',
            'Оператор ! сообщает компилятору, что элемента undefined здесь нет. Это обосновано границами цикла и тем, что Array.from() создаёт массив без пропусков; сам ! ничего не проверяет во время выполнения.',
          ],
          timeComplexity: 'O(n).',
          spaceComplexity: 'O(n).',
        },
      ],
    },
  },
  {
    id: 5,
    slug: 'palindrome',
    title: 'Проверить палиндром',
    summary: 'Проверьте, читается ли строка одинаково в обе стороны, игнорируя пробелы и регистр.',
    difficulty: 'easy',
    tags: ['Строки'],
    description:
      'Напишите функцию isPalindrome(text), которая возвращает true, если строка одинаково читается слева направо и справа налево после удаления пробельных символов и приведения к нижнему регистру. Иначе верните false.',
    requirements: [
      'Игнорируйте пробельные символы: обычные пробелы, табуляцию и переводы строк. Для регистра используйте toLowerCase().',
      'Сохраняйте цифры, знаки препинания и emoji: удалять их не нужно.',
      'Пустая строка, строка только из пробелов и строка из одного символа считаются палиндромами.',
      'Сравнивайте кодовые точки Unicode. Составные emoji и комбинируемые знаки отдельно объединять не нужно.',
    ],
    examples: [
      { code: "isPalindrome('А роза упала на лапу Азора'); // true" },
      { code: "isPalindrome('Race car'); // true\nisPalindrome('hello'); // false" },
      {
        code: "isPalindrome('ab,a'); // false",
        explanation: 'Запятая остаётся частью строки, поэтому «ab,a» не является палиндромом.',
      },
      {
        code: "isPalindrome('🙂a🙂'); // true\nisPalindrome('   '); // true\nisPalindrome(''); // true",
      },
    ],
    starterCode: 'function isPalindrome(text) {\n  // Ваше решение\n}',
    hints: [
      'Сначала удалите пробельные символы и приведите строку к нижнему регистру. Не удаляйте всю пунктуацию.',
      'Поставьте два указателя: на первый и последний символ. Сравнивайте пары и сдвигайте указатели к середине.',
      'Первое несовпадение позволяет сразу вернуть false. Если указатели встретились или пересеклись, проверка завершена.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Два указателя после подготовки строки',
          code: String.raw`function isPalindrome(text) {
  const characters = Array.from(text.replace(/\s/gu, '').toLowerCase());
  let left = 0;
  let right = characters.length - 1;

  while (left < right) {
    if (characters[left] !== characters[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}`,
          explanation: [
            'Регулярное выражение удаляет пробельные символы, а toLowerCase() убирает различия в регистре. Знаки препинания сохраняются.',
            'Array.from() позволяет сравнивать кодовые точки, включая одиночные emoji, вместо отдельных UTF-16 кодовых единиц.',
            'Пары символов сравниваются от краёв к середине. При первом несовпадении возвращаем false, иначе — true.',
            'Для пустого массива или одного символа цикл не начинается. Дополнительная проверка для этих случаев не нужна.',
          ],
          timeComplexity: 'O(n) с учётом подготовки строки и сравнения символов.',
          spaceComplexity:
            'O(n) для подготовленной строки и массива; самим указателям нужна O(1) память.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: функция должна возвращать boolean во всех ветках, а не строку или числовой флаг.',
        'Типы массива символов и числовых указателей TypeScript выводит из их начальных значений.',
      ],
      variants: [
        {
          title: 'Проверка с возвращаемым типом boolean',
          code: String.raw`function isPalindrome(text: string): boolean {
  const characters = Array.from(text.replace(/\s/gu, '').toLowerCase());
  let left = 0;
  let right = characters.length - 1;

  while (left < right) {
    if (characters[left] !== characters[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}`,
          explanation: [
            'Сигнатура string → boolean описывает контракт проверки. Передать число вместо строки будет ошибкой типов.',
            'Указатели читают только существующие элементы массива. Результат зависит от значений символов, а не от их регистра или пробелов исходной строки.',
          ],
          timeComplexity: 'O(n).',
          spaceComplexity: 'O(n), включая подготовку строки.',
        },
      ],
    },
  },
  {
    id: 6,
    slug: 'array-intersection',
    title: 'Найти пересечение двух массивов',
    summary: 'Найдите значения, которые присутствуют в обоих массивах.',
    difficulty: 'easy',
    tags: ['Массивы'],
    description:
      'Напишите функцию intersection(first, second), которая возвращает новый массив уникальных значений, встречающихся в обоих входных массивах. Порядок результата должен соответствовать первому массиву.',
    requirements: [
      'Входные массивы содержат числа и строки. Не изменяйте их.',
      'Каждое общее значение должно появиться в результате только один раз, в порядке первого появления в first.',
      'Число 1 и строка «1» различаются. NaN считается равным NaN, а 0 и -0 — одинаковыми значениями.',
      'Если один из массивов пуст или общих значений нет, верните пустой массив. Set использовать можно.',
    ],
    examples: [
      { code: 'intersection([3, 1, 2, 2], [2, 3]); // [3, 2]' },
      { code: 'intersection([1, 1, 2], [1, 1]); // [1]' },
      { code: "intersection([1, '1', NaN, NaN], ['1', NaN]); // ['1', NaN]" },
      { code: 'intersection([], [1, 2]); // []\nintersection([1], [2]); // []' },
    ],
    starterCode: 'function intersection(first, second) {\n  // Ваше решение\n}',
    hints: [
      'Сохраните значения второго массива в структуре для быстрого поиска.',
      'Обходите первый массив слева направо, чтобы сохранить нужный порядок.',
      'После добавления значения в результат удалите его из набора доступных совпадений. Так повторы не попадут в ответ.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Set со значениями второго массива',
          code: `function intersection(first, second) {
  const remaining = new Set(second);
  const result = [];

  for (const item of first) {
    if (remaining.delete(item)) {
      result.push(item);
    }
  }

  return result;
}`,
          explanation: [
            'Set хранит значения второго массива без повторов. Входные массивы остаются неизменными.',
            'delete() возвращает true, только если значение присутствовало в Set. Этот результат одновременно проверяет совпадение и исключает его повторное добавление.',
            'Мы обходим first по порядку и добавляем сам элемент первого массива. Поэтому сохраняется порядок его первых вхождений.',
            'Сравнение в Set корректно обрабатывает NaN, различает числа и строки и объединяет 0 с -0.',
          ],
          timeComplexity:
            'O(n + m) в среднем при использовании хеш-таблицы, где n и m — длины массивов.',
          spaceComplexity: 'O(m + k): Set и результат из k общих значений.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: используйте общий generic T для обоих массивов и результата, а входные массивы объявите readonly.',
        'Для смеси строк и чисел можно явно передать T как number | string. Для объектов такой алгоритм сравнивает ссылки, а не содержимое.',
      ],
      variants: [
        {
          title: 'Пересечение с сохранением типа элементов',
          code: `function intersection<T>(
  first: readonly T[],
  second: readonly T[],
): T[] {
  const remaining = new Set<T>(second);
  const result: T[] = [];

  for (const item of first) {
    if (remaining.delete(item)) {
      result.push(item);
    }
  }

  return result;
}`,
          explanation: [
            'T связывает типы входных элементов, Set и массива результата. Тип данных не теряется при вызове функции.',
            'readonly запрещает изменять входные массивы на уровне типов. Удаление выполняется только из новой коллекции remaining.',
          ],
          timeComplexity: 'O(n + m) в среднем.',
          spaceComplexity: 'O(m + k).',
        },
      ],
    },
  },
  {
    id: 7,
    slug: 'chunk',
    title: 'chunk(array, size)',
    summary: 'Разбейте массив на группы заданного размера.',
    difficulty: 'easy',
    tags: ['Массивы'],
    description:
      'Напишите функцию chunk(array, size), которая разбивает массив на последовательные группы размером size. Последняя группа может быть короче, если элементов не хватает.',
    requirements: [
      'Сохраняйте порядок элементов и не изменяйте исходный массив.',
      'size должен быть положительным целым числом. Для 0, отрицательного числа, дроби, NaN или Infinity выбрасывайте RangeError.',
      'Проверяйте size даже для пустого массива. При корректном размере пустой массив даёт пустой результат.',
      'Если size больше длины массива, верните одну группу со всеми элементами.',
      'Создавайте новые массивы групп. Глубокое копирование объектов внутри массива не требуется.',
    ],
    examples: [
      { code: 'chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]' },
      { code: "chunk(['a', 'b'], 1); // [['a'], ['b']]" },
      { code: 'chunk([1, 2], 5); // [[1, 2]]\nchunk([], 3); // []' },
      {
        code: 'chunk([1, 2], 0); // RangeError\nchunk([], 1.5); // RangeError',
        explanation: 'Каждый из этих вызовов отдельно должен выбросить ошибку.',
      },
    ],
    starterCode: 'function chunk(array, size) {\n  // Ваше решение\n}',
    hints: [
      'Сначала проверьте размер группы через Number.isInteger() и сравнение с нулём.',
      'Сдвигайте начальный индекс на size за каждый шаг цикла.',
      'slice(start, end) возвращает новый массив и не меняет исходный. Конец последнего среза может выходить за длину массива.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Срезы с шагом size',
          code: `function chunk(array, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive integer');
  }

  const chunks = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}`,
          explanation: [
            'Проверка отклоняет некорректный размер до начала цикла. Она также предотвращает бесконечный цикл при size, равном нулю или отрицательному числу.',
            'Каждый шаг берёт следующий непересекающийся срез. slice() автоматически ограничивает конец среза длиной массива.',
            'При пустом массиве цикл не выполняется. При размере больше длины входа создаётся ровно одна группа.',
            'slice() делает поверхностную копию: сами массивы групп новые, но объекты внутри сохраняют исходные ссылки.',
          ],
          timeComplexity: 'O(n): каждый элемент копируется в одну группу.',
          spaceComplexity: 'O(n) для массивов результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: вход readonly T[] превращается в T[][] — массив групп с тем же типом элементов.',
        'Тип number допускает NaN, Infinity и дробные значения. Проверка размера нужна и в TypeScript.',
      ],
      variants: [
        {
          title: 'Generic-функция с результатом T[][]',
          code: `function chunk<T>(array: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError('size must be a positive integer');
  }

  const chunks: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}`,
          explanation: [
            'T[][] означает массив массивов T. Каждый slice() возвращает T[], который добавляется в chunks.',
            'readonly защищает вход от изменения на уровне типов, а проверка size обеспечивает корректное поведение во время выполнения.',
          ],
          timeComplexity: 'O(n).',
          spaceComplexity: 'O(n).',
        },
      ],
    },
  },
  {
    id: 8,
    slug: 'group-by',
    title: 'groupBy()',
    summary: 'Сгруппируйте массив объектов по значению выбранного поля.',
    difficulty: 'easy',
    tags: ['Массивы', 'Объекты'],
    description:
      'Напишите функцию groupBy(array, key), которая принимает массив объектов и имя поля. Верните объект-словарь: ключи — значения выбранного поля, а значения — массивы объектов соответствующей группы.',
    requirements: [
      'Каждый входной объект содержит поле key со значением типа string или number. Обрабатывать отсутствующие поля и другие типы в этой задаче не требуется.',
      'Ключи результата — строки. Число 1 и строка «1» должны попасть в одну группу с ключом «1».',
      'Сохраняйте порядок объектов внутри каждой группы. Порядок ключей словаря не важен.',
      'Не меняйте входной массив и его объекты. В группах должны сохраняться ссылки на исходные объекты.',
      'Поддержите пустой массив и специальные значения поля: пустую строку, «__proto__» и «constructor». Допускается словарь без прототипа.',
      'Не используйте встроенный Object.groupBy() или библиотечный groupBy().',
    ],
    examples: [
      {
        code: `const users = [
  { id: 1, role: 'admin' },
  { id: 2, role: 'user' },
  { id: 3, role: 'admin' },
];

groupBy(users, 'role');
// {
//   admin: [{ id: 1, role: 'admin' }, { id: 3, role: 'admin' }],
//   user: [{ id: 2, role: 'user' }],
// }`,
      },
      {
        code: "groupBy([{ value: 1 }, { value: '1' }], 'value');\n// { '1': [{ value: 1 }, { value: '1' }] }",
      },
      {
        code: "groupBy([{ type: '__proto__' }], 'type');\n// Собственное свойство: { ['__proto__']: [{ type: '__proto__' }] }",
      },
      { code: "groupBy([], 'role'); // Пустой словарь" },
    ],
    starterCode: 'function groupBy(array, key) {\n  // Ваше решение\n}',
    hints: [
      'Получите значение поля через item[key] и преобразуйте его в строковый ключ.',
      'Если группа для ключа уже существует, добавьте объект в неё. Иначе создайте новый массив с этим объектом.',
      'У обычного объекта есть унаследованные свойства. Подумайте, какой словарь позволит безопасно группировать по значению __proto__.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Словарь групп за один проход',
          code: `function groupBy(array, key) {
  const groups = Object.create(null);

  for (const item of array) {
    const groupKey = String(item[key]);
    const group = groups[groupKey];

    if (group) {
      group.push(item);
    } else {
      groups[groupKey] = [item];
    }
  }

  return groups;
}`,
          explanation: [
            'Object.create(null) создаёт словарь без прототипа: __proto__ и constructor становятся обычными ключами.',
            'String(item[key]) явно задаёт правило группировки чисел и строк. Например, 1 и «1» используют одинаковый ключ.',
            'При первом появлении ключа создаём массив, затем дополняем его через push(). Так сохраняется исходный порядок объектов в группе.',
            'Мы добавляем исходные объекты по ссылке, не изменяя их. Пустой ввод даёт пустой словарь без дополнительных условий.',
          ],
          timeComplexity:
            'O(n) в среднем, если преобразование ключа и доступ к свойству считать O(1).',
          spaceComplexity: 'O(n + k): ссылки на n объектов и k групп.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: свяжите имя поля K с объектами T через ограничение Record<K, string | number>. Несуществующее поле или поле другого типа должно давать ошибку компиляции.',
        'Результат Partial<Record<string, T[]>> учитывает, что произвольной группы в словаре может не быть. При чтении нужно обрабатывать undefined.',
      ],
      variants: [
        {
          title: 'Проверка поля и сохранение типа объектов',
          code: `function groupBy<K extends PropertyKey, T extends Record<K, string | number>>(
  array: readonly T[],
  key: K,
): Partial<Record<string, T[]>> {
  const groups: Partial<Record<string, T[]>> = Object.create(null);

  for (const item of array) {
    const groupKey = String(item[key]);
    const group = groups[groupKey];

    if (group) {
      group.push(item);
    } else {
      groups[groupKey] = [item];
    }
  }

  return groups;
}`,
          explanation: [
            'K задаёт имя поля, а T обязан содержать это поле со строковым или числовым значением. Дополнительные поля объекта сохраняются в типе T.',
            'Локальная переменная group имеет тип T[] | undefined. Проверка if (group) сужает его до T[], поэтому push() вызывается только для существующей группы.',
            'Partial не обещает наличие всех строковых ключей. Например, перед чтением groups.admin вызывающий код должен проверить, существует ли эта группа.',
          ],
          timeComplexity: 'O(n) в среднем при доступе к ключу за O(1).',
          spaceComplexity: 'O(n + k).',
        },
      ],
    },
  },
]
