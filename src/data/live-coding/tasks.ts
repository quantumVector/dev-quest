import type { LiveCodingTask } from '@/types/live-coding'
import { tasks04to08 } from '@/data/live-coding/tasks-04-08'
import { tasks09to12 } from '@/data/live-coding/tasks-09-12'
import { tasks13to16 } from '@/data/live-coding/tasks-13-16'

export const liveCodingTasks: LiveCodingTask[] = [
  {
    id: 1,
    slug: 'remove-duplicates',
    title: 'Удалить дубликаты из массива',
    summary: 'Сохраните уникальные элементы и их порядок. Сначала через Set, затем без него.',
    difficulty: 'easy',
    tags: ['Массивы', 'Set'],
    description:
      'Напишите функцию unique(array), которая принимает массив чисел и строк и возвращает новый массив без повторяющихся значений. Решите задачу двумя способами: с использованием Set и без Set.',
    requirements: [
      'Сохраняйте порядок первого появления каждого значения.',
      'Не изменяйте исходный массив. Для пустого массива верните новый пустой массив.',
      'Число 1 и строка «1» — разные значения. Повторяющийся NaN должен остаться только один раз; 0 и -0 считаются одинаковыми.',
      'Во втором решении не используйте Set и Map: попробуйте обойтись массивом результата.',
    ],
    examples: [
      { code: 'unique([1, 2, 2, 3, 1]); // [1, 2, 3]' },
      { code: "unique(['a', 'b', 'a', 'c']); // ['a', 'b', 'c']" },
      { code: "unique([1, '1', 1, NaN, NaN]); // [1, '1', NaN]" },
      { code: 'unique([]); // []' },
    ],
    starterCode: 'function unique(array) {\n  // Ваше решение\n}',
    hints: [
      'Какая встроенная коллекция хранит только уникальные значения и помнит порядок их добавления?',
      'Для варианта без Set заведите массив результата. Прежде чем добавить очередное значение, проверьте, встречалось ли оно раньше.',
      'Сравните поведение includes() и indexOf() при поиске NaN.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Через Set',
          code: `function unique(array) {
  return [...new Set(array)];
}`,
          explanation: [
            'Set удаляет повторяющиеся значения и сохраняет порядок первого добавления.',
            'Оператор spread создаёт новый массив из коллекции. Исходный массив не меняется.',
            'Set различает числа и строки, считает NaN равным NaN, а 0 и -0 — одним значением.',
          ],
          timeComplexity: 'O(n) в среднем при использовании хеш-таблицы для Set.',
          spaceComplexity: 'O(k), где k — количество уникальных значений.',
        },
        {
          title: 'Без Set и Map',
          code: `function unique(array) {
  const result = [];

  for (const item of array) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}`,
          explanation: [
            'Проходим входной массив слева направо и добавляем значение только при первом появлении.',
            'includes() корректно находит NaN. Проверка через indexOf() не выполнила бы это условие задачи.',
            'Поиск в массиве результата линейный: при большом количестве уникальных элементов этот способ медленнее Set.',
          ],
          timeComplexity: 'O(n²) в худшем случае, когда все значения уникальны.',
          spaceComplexity: 'O(k) для массива результата.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: сохраните тип элементов через generic T и запретите изменение входного массива с помощью readonly.',
        'Сигнатура работает и с другими типами. Объекты при этом сравниваются по ссылке, а не по содержимому.',
      ],
      variants: [
        {
          title: 'Через Set с generic-параметром',
          code: `function unique<T>(array: readonly T[]): T[] {
  return [...new Set<T>(array)];
}

const numbers = unique([1, 2, 2]); // number[]
const strings = unique(['a', 'a', 'b']); // string[]
const mixed = unique<number | string>([1, '1', 1]);`,
          explanation: [
            'T связывает тип элементов входного и выходного массивов: тип результата не теряется.',
            'readonly T[] позволяет передавать как обычные, так и доступные только для чтения массивы.',
          ],
          timeComplexity: 'O(n) в среднем при использовании хеш-таблицы для Set.',
          spaceComplexity: 'O(k) для уникальных значений и результата.',
        },
        {
          title: 'Без Set и Map с сохранением типа',
          code: `function unique<T>(array: readonly T[]): T[] {
  const result: T[] = [];

  for (const item of array) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}`,
          explanation: [
            'Массив результата явно имеет тип T[], поэтому в него нельзя случайно добавить значение другого типа.',
            'Алгоритм и поведение на NaN остаются такими же, как в JavaScript-решении.',
          ],
          timeComplexity: 'O(n²) в худшем случае.',
          spaceComplexity: 'O(k) для массива результата.',
        },
      ],
    },
  },
  {
    id: 2,
    slug: 'count-frequency',
    title: 'Посчитать частоту элементов',
    summary: 'Превратите массив строк в объект с количеством появлений каждого элемента.',
    difficulty: 'easy',
    tags: ['Массивы', 'Объекты'],
    description:
      'Напишите функцию countFrequency(array), которая принимает массив строк и возвращает объект-словарь. Ключом должна стать строка из массива, а значением — количество её появлений.',
    requirements: [
      'Входные элементы — строки. Регистр учитывается: «a» и «A» — разные ключи.',
      'Не изменяйте входной массив. Для пустого массива верните пустой словарь.',
      'Поддержите любые строковые ключи, включая пустую строку, «__proto__» и «constructor».',
      'Возвращайте объект со счётчиками; порядок его ключей не важен. Допускается объект без прототипа.',
    ],
    examples: [
      { code: "countFrequency(['a', 'b', 'a']); // { a: 2, b: 1 }" },
      { code: "countFrequency(['a', 'A', '']); // { a: 1, A: 1, '': 1 }" },
      {
        code: "countFrequency(['__proto__', 'constructor', '__proto__']);\n// Собственные свойства: { ['__proto__']: 2, constructor: 1 }",
      },
      { code: 'countFrequency([]); // Пустой словарь' },
    ],
    starterCode: 'function countFrequency(array) {\n  // Ваше решение\n}',
    hints: [
      'Заведите словарь и увеличивайте счётчик для каждого встреченного элемента. Если счётчика ещё нет, начинайте с нуля.',
      'У обычного объекта уже есть унаследованные свойства. Подумайте, что произойдёт с ключами constructor и __proto__.',
      'Объект без прототипа позволяет использовать эти строки как обычные ключи.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Один проход и словарь счётчиков',
          code: `function countFrequency(array) {
  const counts = Object.create(null);

  for (const item of array) {
    counts[item] = (counts[item] ?? 0) + 1;
  }

  return counts;
}`,
          explanation: [
            'Object.create(null) создаёт объект без прототипа. Ключи constructor и __proto__ не конфликтуют с унаследованными свойствами.',
            'Если ключ ещё не встречался, counts[item] равен undefined. Оператор ?? подставляет 0, после чего увеличиваем значение на единицу.',
            'На каждый элемент приходится одно обновление счётчика. Входной массив остаётся прежним.',
            'Результат — объект без методов прототипа, например hasOwnProperty(). Для проверки ключа можно использовать Object.hasOwn(counts, key).',
          ],
          timeComplexity: 'O(n) в среднем, если доступ к свойству считать O(1).',
          spaceComplexity: 'O(k), где k — количество различных строк.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: опишите вход как readonly string[], а словарь счётчиков — как Record<string, number>.',
        'Record описывает тип значений, но не создаёт ключи во время выполнения. Отсутствующий счётчик всё равно нужно обработать.',
      ],
      variants: [
        {
          title: 'Типизированный словарь частот',
          code: `function countFrequency(
  array: readonly string[],
): Record<string, number> {
  const counts: Record<string, number> = Object.create(null);

  for (const item of array) {
    counts[item] = (counts[item] ?? 0) + 1;
  }

  return counts;
}`,
          explanation: [
            'readonly string[] задаёт допустимый ввод и защищает его от изменений внутри функции на уровне типов.',
            'Record<string, number> описывает строковые ключи с числовыми счётчиками. ?? 0 обрабатывает ещё не встречавшиеся значения.',
          ],
          timeComplexity: 'O(n) в среднем, если доступ к свойству считать O(1).',
          spaceComplexity: 'O(k) для словаря счётчиков.',
        },
      ],
    },
  },
  {
    id: 3,
    slug: 'first-unique-character',
    title: 'Найти первый неповторяющийся символ',
    summary: 'Найдите первый символ, который встречается в строке ровно один раз.',
    difficulty: 'easy',
    tags: ['Строки', 'Map'],
    description:
      'Напишите функцию firstUniqueChar(text), которая возвращает первый слева символ, встречающийся в строке ровно один раз. Если такого символа нет, верните null.',
    requirements: [
      'Возвращайте сам символ, а не его индекс.',
      'Учитывайте регистр, пробелы и знаки препинания. Строку не нужно нормализовать.',
      'Для пустой строки и строки, где все символы повторяются, возвращайте null.',
      'Считайте символом одну кодовую точку Unicode. Одиночные emoji должны работать; составные emoji и комбинируемые символы объединять не требуется.',
    ],
    examples: [
      { code: "firstUniqueChar('swiss'); // 'w'" },
      { code: "firstUniqueChar('aAb'); // 'a'", explanation: 'Регистр учитывается.' },
      { code: "firstUniqueChar('🙂🙃🙂'); // '🙃'" },
      { code: "firstUniqueChar('aabb'); // null\nfirstUniqueChar(''); // null" },
    ],
    starterCode: 'function firstUniqueChar(text) {\n  // Ваше решение\n}',
    hints: [
      'В первом проходе посчитайте, сколько раз встречается каждый символ.',
      'Во втором проходе идите по исходной строке слева направо и ищите символ со счётчиком 1.',
      'Для обхода кодовых точек используйте for...of: индексация text[i] может разбить emoji на две части.',
    ],
    solution: {
      language: 'javascript',
      variants: [
        {
          title: 'Два прохода с Map',
          code: `function firstUniqueChar(text) {
  const counts = new Map();

  for (const char of text) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of text) {
    if (counts.get(char) === 1) {
      return char;
    }
  }

  return null;
}`,
          explanation: [
            'Первый проход заполняет Map: ключ — символ, значение — его частота.',
            'Второй проход сохраняет порядок исходной строки. Первый символ со счётчиком 1 и есть ответ.',
            'Оба прохода используют for...of, поэтому одиночный emoji обрабатывается как одна кодовая точка.',
            'Если второй проход не нашёл ответ, возвращаем null. Пустая строка обрабатывается тем же способом.',
          ],
          timeComplexity: 'O(n) в среднем: два последовательных прохода по строке.',
          spaceComplexity: 'O(k), где k — количество различных кодовых точек.',
        },
      ],
    },
    typescriptSolution: {
      language: 'typescript',
      notes: [
        'Практика типов: задайте Map<string, number> и возвращаемый тип string | null.',
        'С включённым strictNullChecks вызывающему коду нужно проверить null, прежде чем использовать результат как строку.',
      ],
      variants: [
        {
          title: 'Явный тип результата и Map',
          code: `function firstUniqueChar(text: string): string | null {
  const counts = new Map<string, number>();

  for (const char of text) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of text) {
    if (counts.get(char) === 1) {
      return char;
    }
  }

  return null;
}`,
          explanation: [
            'Map<string, number> допускает только строковые ключи и числовые счётчики. get() может вернуть undefined, поэтому сохраняем ?? 0.',
            'Тип string | null явно сообщает об отсутствии ответа. Успешный результат остаётся строкой, в том числе для emoji.',
          ],
          timeComplexity: 'O(n) в среднем.',
          spaceComplexity: 'O(k) для частот различных кодовых точек.',
        },
      ],
    },
  },
  ...tasks04to08,
  ...tasks09to12,
  ...tasks13to16,
]
