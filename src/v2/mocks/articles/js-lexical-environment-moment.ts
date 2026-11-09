import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/javascript/js-lexical-environment-moment-snippet1.txt?raw'
import example2 from '../snippets/javascript/js-lexical-environment-moment-snippet2.txt?raw'
import example3 from '../snippets/javascript/js-lexical-environment-moment-snippet3.txt?raw'
import example4 from '../snippets/javascript/js-lexical-environment-moment-snippet4.txt?raw'
import example5 from '../snippets/javascript/js-lexical-environment-moment-snippet5.txt?raw'

// Content copied verbatim from src/views/js/LexicalEnvironmentMoment.vue.
export default {
  ...articleSummaries.jsLexicalEnvironmentMoment,
  schemaVersion: 1,
  intro: [],
  sections: [
    {
      id: 'section-1',
      title: '🎯 Краткий ответ для собеседования:',
      blocks: [
        {
          id: 'text-1',
          type: 'prose',
          markdown:
            '**Лексическое окружение создается в момент ВЫПОЛНЕНИЯ функции, НЕ в момент её определения!**',
        },
        {
          id: 'text-2',
          type: 'prose',
          markdown: '**При определении функции:**',
        },
        {
          id: 'text-3',
          type: 'prose',
          markdown:
            '- Создается только объект функции\n- Запоминается место определения (для Outer Reference)\n- Лексическое окружение НЕ создается',
        },
        {
          id: 'text-4',
          type: 'prose',
          markdown: '**При вызове функции:**',
        },
        {
          id: 'text-5',
          type: 'prose',
          markdown:
            '- Создается новое лексическое окружение\n- Инициализируются переменные и параметры\n- Устанавливается ссылка на внешнее окружение',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Демонстрация момента создания',
      blocks: [
        {
          id: 'code-6',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Фазы создания лексического окружения',
      blocks: [
        {
          id: 'code-7',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'Практический пример: определение vs выполнение',
      blocks: [
        {
          id: 'code-8',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Важные нюансы и подводные камни',
      blocks: [
        {
          id: 'code-9',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Жизненный цикл лексического окружения',
      blocks: [
        {
          id: 'code-10',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Визуальное представление процесса',
      blocks: [
        {
          id: 'timeline-11',
          type: 'timeline',
          items: [
            {
              id: 'event-12',
              blocks: [
                {
                  id: 'heading-13',
                  type: 'heading',
                  level: 3,
                  text: '1. Определение функции',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown:
                    '- Создается объект Function\n- Запоминается лексическая область определения\n- Функция готова к вызову\n- **Лексическое окружение НЕ создается!**',
                },
              ],
            },
            {
              id: 'event-15',
              blocks: [
                {
                  id: 'heading-16',
                  type: 'heading',
                  level: 3,
                  text: '2. Вызов функции',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown:
                    '- **Создается лексическое окружение**\n- Инициализируется Environment Record\n- Устанавливается Outer Reference\n- Происходит hoisting переменных',
                },
              ],
            },
            {
              id: 'event-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: '3. Выполнение кода',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown:
                    '- Присваиваются значения переменным\n- Переменные let/const выходят из TDZ\n- Выполняется логика функции\n- Возможно создание замыканий',
                },
              ],
            },
            {
              id: 'event-21',
              blocks: [
                {
                  id: 'heading-22',
                  type: 'heading',
                  level: 3,
                  text: '4. Завершение / Сборка мусора',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown:
                    '- Функция завершает выполнение\n- Лексическое окружение помечается для удаления\n- Исключение: замыкания сохраняют ссылки\n- Сборщик мусора удаляет неиспользуемые окружения',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Ключевые моменты',
      blocks: [
        {
          id: 'cards-24',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-25',
              blocks: [
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 3,
                  text: 'Правильное понимание',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- Лексическое окружение = момент ВЫПОЛНЕНИЯ\n- Каждый вызов = новое окружение\n- Замыкания сохраняют ссылки на окружения\n- Рекурсия создает множество окружений\n- Outer Reference определяется при создании функции',
                },
              ],
            },
            {
              id: 'card-28',
              blocks: [
                {
                  id: 'heading-29',
                  type: 'heading',
                  level: 3,
                  text: 'Частые заблуждения',
                },
                {
                  id: 'text-30',
                  type: 'prose',
                  markdown:
                    '- ❌ Окружение создается при определении\n- ❌ Одно окружение для всех вызовов\n- ❌ Переменные сразу инициализированы\n- ❌ Замыкания не влияют на время жизни\n- ❌ this определяется при создании функции',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Вопросы на собеседовании',
      blocks: [
        {
          id: 'accordion-31',
          type: 'accordion',
          items: [
            {
              id: 'question-32',
              title: '1. В какой момент создается лексическое окружение?',
              blocks: [
                {
                  id: 'text-33',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Лексическое окружение создается в момент **выполнения** функции, а не в момент её определения.',
                },
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown: '**Детально:**',
                },
                {
                  id: 'text-35',
                  type: 'prose',
                  markdown:
                    '- **При определении:** создается только объект функции, запоминается место определения\n- **При вызове:** создается новое лексическое окружение с Environment Record и Outer Reference\n- **Каждый вызов:** создает отдельное лексическое окружение',
                },
              ],
            },
            {
              id: 'question-36',
              title: '2. Что происходит при определении функции?',
              blocks: [
                {
                  id: 'text-37',
                  type: 'prose',
                  markdown: '**Ответ:** При определении функции:',
                },
                {
                  id: 'text-38',
                  type: 'prose',
                  markdown:
                    '- Создается объект Function\n- Запоминается лексическая область, где функция определена (для будущего Outer Reference)\n- Функция становится доступной для вызова\n- **Лексическое окружение НЕ создается**',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '**Важно:** Место определения функции определяет, на какое внешнее окружение будет ссылаться её Outer Reference при создании.',
                },
              ],
            },
            {
              id: 'question-40',
              title: '3. Создается ли новое окружение при каждом вызове?',
              blocks: [
                {
                  id: 'text-41',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Да, при каждом вызове функции создается **новое лексическое окружение**.',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown: '**Это означает:**',
                },
                {
                  id: 'text-43',
                  type: 'prose',
                  markdown:
                    '- Каждый вызов имеет свои локальные переменные\n- Рекурсивные вызовы создают стек окружений\n- Замыкания могут сохранять ссылки на разные окружения\n- Параметры функции изолированы между вызовами',
                },
              ],
            },
            {
              id: 'question-44',
              title: '4. Как замыкания связаны с моментом создания окружения?',
              blocks: [
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Замыкания формируются в момент определения внутренней функции, но лексическое окружение создается при выполнении.',
                },
                {
                  id: 'text-46',
                  type: 'prose',
                  markdown: '**Детально:**',
                },
                {
                  id: 'text-47',
                  type: 'prose',
                  markdown:
                    '- **При определении внутренней функции:** запоминается ссылка на текущее окружение\n- **При вызове внешней функции:** создается окружение, которое может быть "захвачено"\n- **При вызове внутренней функции:** создается её собственное окружение + доступ к "захваченному"\n- **Замыкание продлевает жизнь окружения:** не даёт сборщику мусора его удалить',
                },
              ],
            },
            {
              id: 'question-48',
              title: '5. Что происходит с окружением после завершения функции?',
              blocks: [
                {
                  id: 'text-49',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Лексическое окружение помечается для удаления сборщиком мусора, если на него нет активных ссылок.',
                },
                {
                  id: 'text-50',
                  type: 'prose',
                  markdown: '**Исключения:**',
                },
                {
                  id: 'text-51',
                  type: 'prose',
                  markdown:
                    '- **Замыкания:** сохраняют ссылку на окружение\n- **Глобальные переменные:** ссылаются на окружение\n- **Event listeners:** могут сохранять ссылки\n- **Активные вызовы:** окружения в стеке выполнения',
                },
                {
                  id: 'text-52',
                  type: 'prose',
                  markdown:
                    '**Проблема:** Циклические ссылки могут предотвратить сборку мусора и привести к утечкам памяти.',
                },
              ],
            },
            {
              id: 'question-53',
              title: '6. В чем разница между hoisting и созданием окружения?',
              blocks: [
                {
                  id: 'text-54',
                  type: 'prose',
                  markdown:
                    '**Ответ:** Hoisting происходит в фазе создания лексического окружения, но это разные концепции:',
                },
                {
                  id: 'text-55',
                  type: 'prose',
                  markdown: '**Создание окружения (Creation Phase):**',
                },
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown:
                    '- Создается Environment Record\n- Устанавливается Outer Reference\n- Происходит hoisting переменных и функций\n- `var` инициализируются как `undefined`\n- `let/const` помещаются в TDZ',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown: '**Выполнение кода (Execution Phase):**',
                },
                {
                  id: 'text-58',
                  type: 'prose',
                  markdown:
                    '- Присваиваются фактические значения\n- `let/const` выходят из TDZ при инициализации',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Практические советы',
      blocks: [
        {
          id: 'cards-59',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-60',
              blocks: [
                {
                  id: 'heading-61',
                  type: 'heading',
                  level: 3,
                  text: 'Отладка',
                },
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown:
                    '- Используйте debugger для изучения scope chain\n- Помните: каждый breakpoint показывает текущее окружение\n- Инспектируйте замыкания в DevTools',
                },
              ],
            },
            {
              id: 'card-63',
              blocks: [
                {
                  id: 'heading-64',
                  type: 'heading',
                  level: 3,
                  text: 'Производительность',
                },
                {
                  id: 'text-65',
                  type: 'prose',
                  markdown:
                    '- Избегайте создания функций в циклах\n- Очищайте ссылки на замыкания\n- Используйте WeakMap для слабых ссылок',
                },
              ],
            },
            {
              id: 'card-66',
              blocks: [
                {
                  id: 'heading-67',
                  type: 'heading',
                  level: 3,
                  text: 'Лучшие практики',
                },
                {
                  id: 'text-68',
                  type: 'prose',
                  markdown:
                    '- Понимайте время жизни переменных\n- Используйте const/let вместо var\n- Документируйте сложные замыкания',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-11',
      title: '💡 Резюме для собеседования',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '**Главное правило:** Лексическое окружение создается в момент ВЫПОЛНЕНИЯ функции, НЕ определения.',
        },
        {
          id: 'text-70',
          type: 'prose',
          markdown:
            '**Этапы:** Определение функции → Вызов функции (создание окружения) → Выполнение кода → Завершение/сборка мусора',
        },
        {
          id: 'text-71',
          type: 'prose',
          markdown:
            '**Ключевые моменты:** Каждый вызов = новое окружение, замыкания продлевают жизнь окружения, Outer Reference определяется местом определения функции',
        },
        {
          id: 'text-72',
          type: 'prose',
          markdown:
            '**Практическое применение:** Понимание этого принципа критично для работы с замыканиями, модулями, callbacks и избежания утечек памяти.',
        },
      ],
    },
  ],
} satisfies Article
