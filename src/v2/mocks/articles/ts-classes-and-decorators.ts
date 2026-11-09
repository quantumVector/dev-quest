import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/typescript/ts-classes-and-decorators-classbasicssnippet.txt?raw'
import example2 from '../snippets/typescript/ts-classes-and-decorators-shorthandsyntaxsnippet.txt?raw'
import example3 from '../snippets/typescript/ts-classes-and-decorators-inheritancesnippet.txt?raw'
import example4 from '../snippets/typescript/ts-classes-and-decorators-interfaceswithclassessnippet.txt?raw'
import example5 from '../snippets/typescript/ts-classes-and-decorators-decoratorbasicssnippet.txt?raw'
import example6 from '../snippets/typescript/ts-classes-and-decorators-methoddecoratorssnippet.txt?raw'
import example7 from '../snippets/typescript/ts-classes-and-decorators-propertyaccessordecoratorssnippet.txt?raw'
import example8 from '../snippets/typescript/ts-classes-and-decorators-parameterdecoratorssnippet.txt?raw'
import example9 from '../snippets/typescript/ts-classes-and-decorators-realworldexamplessnippet.txt?raw'
import example10 from '../snippets/typescript/ts-classes-and-decorators-deprecationauthsnippet.txt?raw'
import example11 from '../snippets/typescript/ts-classes-and-decorators-metadatareflectionsnippet.txt?raw'
import example12 from '../snippets/typescript/ts-classes-and-decorators-decoratorcompositionsnippet.txt?raw'
import example13 from '../snippets/typescript/ts-classes-and-decorators-decoratorpatternssnippet.txt?raw'

// Content copied verbatim from src/views/ts/ClassesAndDecorators.vue.
export default {
  ...articleSummaries.tsClassesAndDecorators,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Классы** в TypeScript — это синтаксический сахар над прототипным наследованием JavaScript с добавлением строгой типизации и модификаторов доступа. **Декораторы** — это специальные функции, которые позволяют аннотировать и модифицировать классы, методы, свойства и параметры на этапе объявления. Это мощный инструмент метапрограммирования.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Классы в TypeScript — основы',
      blocks: [
        {
          id: 'callout-2',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-3',
              type: 'prose',
              markdown:
                '**Важно:** TypeScript добавляет к классам JavaScript модификаторы доступа (public, private, protected), readonly, абстрактные классы и интерфейсы.',
            },
          ],
        },
        {
          id: 'code-4',
          type: 'code',
          language: 'typescript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Сокращенный синтаксис конструктора',
      blocks: [
        {
          id: 'callout-5',
          type: 'callout',
          tone: 'success',
          blocks: [
            {
              id: 'text-6',
              type: 'prose',
              markdown:
                '**Удобно:** TypeScript позволяет объявлять и инициализировать свойства прямо в параметрах конструктора!',
            },
          ],
        },
        {
          id: 'code-7',
          type: 'code',
          language: 'typescript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Наследование и абстрактные классы',
      blocks: [
        {
          id: 'code-8',
          type: 'code',
          language: 'typescript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Интерфейсы и классы',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'typescript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Модификаторы доступа',
      blocks: [
        {
          id: 'cards-10',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: 'public',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown:
                    '- **По умолчанию**\n- Доступно везде\n- Можно вызывать извне класса\n- Наследуется дочерними классами',
                },
              ],
            },
            {
              id: 'card-14',
              blocks: [
                {
                  id: 'heading-15',
                  type: 'heading',
                  level: 3,
                  text: 'protected',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown:
                    '- **Защищенное**\n- Доступно внутри класса\n- Доступно в наследниках\n- Недоступно извне',
                },
              ],
            },
            {
              id: 'card-17',
              blocks: [
                {
                  id: 'heading-18',
                  type: 'heading',
                  level: 3,
                  text: 'private',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown:
                    '- **Приватное**\n- Только внутри класса\n- Недоступно в наследниках\n- Проверяется на compile\\-time',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Декораторы — введение',
      blocks: [
        {
          id: 'callout-20',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-21',
              type: 'prose',
              markdown:
                '**Экспериментально:** Декораторы — экспериментальная функция TypeScript. Требуется включить `experimentalDecorators: true` в tsconfig.json',
            },
          ],
        },
        {
          id: 'code-22',
          type: 'code',
          language: 'typescript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Типы декораторов',
      blocks: [
        {
          id: 'table-23',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Тип декоратора',
            },
            {
              id: 'column-2',
              label: 'Применяется к',
            },
            {
              id: 'column-3',
              label: 'Параметры',
            },
            {
              id: 'column-4',
              label: 'Возвращает',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-24',
                    type: 'prose',
                    markdown: '**Class Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-25',
                    type: 'prose',
                    markdown: 'Класс',
                  },
                ],
                [
                  {
                    id: 'text-26',
                    type: 'prose',
                    markdown: '`constructor: Function`',
                  },
                ],
                [
                  {
                    id: 'text-27',
                    type: 'prose',
                    markdown: 'Function | void',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-28',
                    type: 'prose',
                    markdown: '**Method Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-29',
                    type: 'prose',
                    markdown: 'Метод',
                  },
                ],
                [
                  {
                    id: 'text-30',
                    type: 'prose',
                    markdown: '`target, propertyKey, descriptor`',
                  },
                ],
                [
                  {
                    id: 'text-31',
                    type: 'prose',
                    markdown: 'PropertyDescriptor | void',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**Property Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'Свойство',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '`target, propertyKey`',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'void',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**Accessor Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Getter/Setter',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '`target, propertyKey, descriptor`',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'PropertyDescriptor | void',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**Parameter Decorator**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Параметр метода',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '`target, propertyKey, parameterIndex`',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'void',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Декораторы методов',
      blocks: [
        {
          id: 'code-44',
          type: 'code',
          language: 'typescript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Декораторы свойств и аксессоров',
      blocks: [
        {
          id: 'code-45',
          type: 'code',
          language: 'typescript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Декораторы параметров',
      blocks: [
        {
          id: 'code-46',
          type: 'code',
          language: 'typescript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Реальные примеры декораторов',
      blocks: [
        {
          id: 'code-47',
          type: 'code',
          language: 'typescript',
          code: example9,
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Практические декораторы',
      blocks: [
        {
          id: 'code-48',
          type: 'code',
          language: 'typescript',
          code: example10,
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Метаданные и Reflection API',
      blocks: [
        {
          id: 'callout-49',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-50',
              type: 'prose',
              markdown:
                '**Продвинуто:** С библиотекой `reflect-metadata` можно работать с метаданными типов во время выполнения',
            },
          ],
        },
        {
          id: 'code-51',
          type: 'code',
          language: 'typescript',
          code: example11,
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Композиция и порядок выполнения декораторов',
      blocks: [
        {
          id: 'code-52',
          type: 'code',
          language: 'typescript',
          code: example12,
        },
      ],
    },
    {
      id: 'section-15',
      title: 'Продвинутые паттерны декораторов',
      blocks: [
        {
          id: 'code-53',
          type: 'code',
          language: 'typescript',
          code: example13,
        },
      ],
    },
    {
      id: 'section-16',
      title: 'Сравнение: Классы vs Функции',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-55',
              blocks: [
                {
                  id: 'heading-56',
                  type: 'heading',
                  level: 3,
                  text: 'Классы',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- **✅** Строгая типизация\n- **✅** Наследование и полиморфизм\n- **✅** Инкапсуляция (private, protected)\n- **✅** Декораторы и метаданные\n- **✅** IDE поддержка и автодополнение\n- **❌** Больше бойлерплейта\n- **❌** Сложнее композиция',
                },
              ],
            },
            {
              id: 'card-58',
              blocks: [
                {
                  id: 'heading-59',
                  type: 'heading',
                  level: 3,
                  text: 'Функции',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- **✅** Проще и лаконичнее\n- **✅** Легче композиция\n- **✅** Функциональный стиль\n- **✅** Меньше памяти\n- **❌** Нет инкапсуляции\n- **❌** Нет декораторов\n- **❌** Сложнее структурировать большой код',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-17',
      title: 'Использование в популярных фреймворках',
      blocks: [
        {
          id: 'cards-61',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-62',
              title: 'Angular',
              blocks: [
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- `@Component()`\n- `@Injectable()`\n- `@Input()`, `@Output()`\n- `@ViewChild()`\n- `@HostListener()`\n- Dependency Injection через декораторы',
                },
              ],
            },
            {
              id: 'card-64',
              title: 'NestJS',
              blocks: [
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- `@Controller()`\n- `@Get()`, `@Post()`\n- `@Body()`, `@Param()`\n- `@UseGuards()`\n- `@UsePipes()`\n- Архитектура на основе декораторов',
                },
              ],
            },
            {
              id: 'card-66',
              title: 'TypeORM / MobX',
              blocks: [
                {
                  id: 'text-67',
                  type: 'prose',
                  markdown:
                    '- `@Entity()`, `@Column()`\n- `@PrimaryKey()`\n- `@observable`\n- `@computed`\n- `@action`\n- Реактивность и ORM через декораторы',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-18',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-68',
          type: 'prose',
          markdown:
            "1. **В чем разница между private в TypeScript и # в JavaScript?**\n   \n   `private` в TypeScript — это проверка на этапе компиляции, в runtime это обычное свойство. `#privateProp` в JavaScript — это настоящие приватные поля, недоступные даже через `obj['#privateProp']`. TypeScript также поддерживает # синтаксис.\n2. **Что такое абстрактные классы и когда их использовать?**\n   \n   Абстрактные классы (`abstract class`) — это базовые классы, которые нельзя инстанцировать напрямую. Они содержат абстрактные методы, которые должны быть реализованы в дочерних классах. Используются для определения общего интерфейса с частичной реализацией.\n3. **Как работают декораторы под капотом?**\n   \n   Декораторы — это функции, которые вызываются во время объявления класса/метода/свойства. TypeScript компилирует их в вызовы функций с передачей целевого объекта, имени свойства и дескриптора. Они выполняются один раз при загрузке модуля, а не при каждом создании экземпляра.\n4. **В каком порядке применяются множественные декораторы?**\n   \n   Фабрики декораторов (функции, возвращающие декоратор) выполняются **сверху вниз**. Сами декораторы применяются **снизу вверх**. Для `@first() @second() method()`: сначала вызовутся фабрики first() и second(), затем применятся декораторы second, потом first.\n5. **Можно ли использовать декораторы с обычным JavaScript?**\n   \n   Да, но это требует транспиляции через Babel с плагином `@babel/plugin-proposal-decorators`. В стандарте ECMAScript декораторы находятся на стадии Stage 3 (почти готово к включению), но синтаксис отличается от TypeScript.\n6. **Что такое Reflect Metadata и зачем это нужно?**\n   \n   `reflect-metadata` — полифилл для работы с метаданными типов во время выполнения. Позволяет получить информацию о типах параметров, возвращаемых значениях, создавать собственные метаданные. Используется в Angular, NestJS, TypeORM для dependency injection и валидации.",
        },
      ],
    },
    {
      id: 'section-19',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-69',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-70',
              blocks: [
                {
                  id: 'heading-71',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-72',
                  type: 'prose',
                  markdown:
                    '- Использовать модификаторы доступа осознанно\n- Декораторы для кросс\\-cutting concerns\n- Композиция декораторов для переиспользования\n- Типизировать параметры декораторов\n- Документировать поведение декораторов\n- Предпочитать readonly для неизменяемых свойств',
                },
              ],
            },
            {
              id: 'card-73',
              blocks: [
                {
                  id: 'heading-74',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-75',
                  type: 'prose',
                  markdown:
                    '- Использовать private везде по умолчанию\n- Декораторы с побочными эффектами\n- Слишком много уровней наследования\n- Модификация прототипов в декораторах\n- Декораторы без понимания порядка выполнения\n- Игнорирование производительности декораторов',
                },
              ],
            },
            {
              id: 'card-76',
              blocks: [
                {
                  id: 'heading-77',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-78',
                  type: 'prose',
                  markdown:
                    '- Используйте # для истинной приватности\n- Предпочитайте композицию наследованию\n- Кэшируйте результаты тяжелых операций\n- Тестируйте декораторы изолированно\n- Используйте TypeScript strict mode\n- Изучайте исходники фреймворков',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-20',
      title: 'Производительность и оптимизация',
      blocks: [
        {
          id: 'callout-79',
          type: 'callout',
          tone: 'warning',
          blocks: [
            {
              id: 'text-80',
              type: 'prose',
              markdown:
                '**Важно:** Декораторы выполняются один раз при определении класса, но созданные ими обертки вызываются каждый раз. Это может влиять на производительность в горячих участках кода.',
            },
          ],
        },
        {
          id: 'cards-81',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-82',
              title: 'Оптимизации классов',
              blocks: [
                {
                  id: 'text-83',
                  type: 'prose',
                  markdown:
                    '- Используйте slots для V8 оптимизаций\n- Избегайте динамического добавления свойств\n- Минимизируйте размер класса\n- Используйте Object.freeze() для неизменяемых данных\n- Предпочитайте примитивы объектам',
                },
              ],
            },
            {
              id: 'card-84',
              title: 'Оптимизации декораторов',
              blocks: [
                {
                  id: 'text-85',
                  type: 'prose',
                  markdown:
                    '- Кэшируйте результаты в замыканиях\n- Избегайте тяжелых операций в декораторах\n- Используйте WeakMap для хранения метаданных\n- Минимизируйте количество декораторов\n- Профилируйте код с декораторами',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-21',
      title: 'Итог',
      blocks: [
        {
          id: 'text-86',
          type: 'prose',
          markdown:
            '**Классы в TypeScript** предоставляют объектно\\-ориентированный подход с строгой типизацией, модификаторами доступа и удобным синтаксисом. **Декораторы** — мощный инструмент метапрограммирования для аннотации и модификации классов, методов и свойств. Они позволяют выносить кросс\\-cutting concerns (логирование, валидацию, кэширование) в переиспользуемые функции, делая код чище и поддерживаемее. Понимание порядка выполнения, работы с метаданными и паттернов использования декораторов критично для работы с современными TypeScript фреймворками.',
        },
        {
          id: 'resources-87',
          type: 'resources',
          items: [
            {
              id: 'link-88',
              label: 'TypeScript Handbook: Classes',
              url: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
            },
          ],
        },
        {
          id: 'resources-89',
          type: 'resources',
          items: [
            {
              id: 'link-90',
              label: 'TypeScript Handbook: Decorators',
              url: 'https://www.typescriptlang.org/docs/handbook/decorators.html',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
