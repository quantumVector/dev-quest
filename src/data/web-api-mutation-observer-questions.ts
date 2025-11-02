import type { Question } from '@/types/question.ts'

export const mutationObserverQuestions: Question[] = [
  // Тема 1: Основы MutationObserver
  {
    id: 1,
    question: "Что такое MutationObserver?",
    options: [
      "API для изменения DOM-элементов",
      "API для наблюдения за изменениями в DOM-дереве",
      "Инструмент для оптимизации DOM",
      "Метод для создания новых элементов"
    ],
    correctAnswer: 1,
    explanation: "MutationObserver — это API, который позволяет отслеживать изменения в DOM-дереве и получать уведомления, когда структура или атрибуты элементов изменяются.",
    topic: "Основы MutationObserver"
  },
  {
    id: 2,
    question: "Как создать экземпляр MutationObserver?",
    options: [
      "MutationObserver.create(callback)",
      "new MutationObserver(callback)",
      "createMutationObserver(callback)",
      "MutationObserver.observe(element)"
    ],
    correctAnswer: 1,
    explanation: "MutationObserver создается через конструктор: new MutationObserver(callback), где callback — функция, вызываемая при обнаружении изменений в DOM.",
    topic: "Основы MutationObserver"
  },
  {
    id: 3,
    question: "Какие параметры принимает callback функция MutationObserver?",
    options: [
      "Только mutations",
      "mutations и observer",
      "element и changes",
      "oldValue и newValue"
    ],
    correctAnswer: 1,
    explanation: "Callback принимает два параметра: mutations (массив MutationRecord объектов) и observer (сам экземпляр MutationObserver).",
    topic: "Основы MutationObserver"
  },
  {
    id: 4,
    question: "Как начать наблюдение за элементом с помощью MutationObserver?",
    options: [
      "observer.watch(element, options)",
      "observer.observe(element, options)",
      "observer.start(element, options)",
      "observer.track(element, options)"
    ],
    correctAnswer: 1,
    explanation: "Для начала наблюдения используется метод observe(element, options), где options — объект с настройками типов изменений для отслеживания.",
    topic: "Основы MutationObserver"
  },
  {
    id: 5,
    question: "Как прекратить наблюдение с помощью MutationObserver?",
    options: [
      "observer.stop()",
      "observer.disconnect()",
      "observer.destroy()",
      "observer.close()"
    ],
    correctAnswer: 1,
    explanation: "Метод disconnect() прекращает наблюдение за всеми отслеживаемыми элементами и полностью отключает observer.",
    topic: "Основы MutationObserver"
  },
  {
    id: 6,
    question: "Что возвращает метод takeRecords()?",
    options: [
      "Текущее состояние DOM",
      "Массив необработанных MutationRecord, очищая очередь",
      "Количество изменений",
      "Список наблюдаемых элементов"
    ],
    correctAnswer: 1,
    explanation: "takeRecords() возвращает массив всех необработанных записей мутаций и очищает очередь, что полезно перед disconnect() для обработки последних изменений.",
    topic: "Основы MutationObserver"
  },

  // Тема 2: Опции наблюдения
  {
    id: 7,
    question: "Какая опция должна быть обязательно включена при вызове observe()?",
    options: [
      "Любая из: childList, attributes или characterData",
      "Только childList",
      "Все опции обязательны",
      "Опции не обязательны"
    ],
    correctAnswer: 0,
    explanation: "При вызове observe() должна быть включена хотя бы одна из трех опций: childList, attributes или characterData, иначе будет выброшена ошибка.",
    topic: "Опции наблюдения"
  },
  {
    id: 8,
    question: "Что означает опция childList: true?",
    options: [
      "Отслеживать изменения дочерних элементов (добавление/удаление)",
      "Отслеживать изменения атрибутов дочерних элементов",
      "Отслеживать изменения текста в дочерних элементах",
      "Отслеживать все изменения"
    ],
    correctAnswer: 0,
    explanation: "childList: true включает отслеживание добавления и удаления дочерних узлов целевого элемента.",
    topic: "Опции наблюдения"
  },
  {
    id: 9,
    question: "Что означает опция attributes: true?",
    options: [
      "Отслеживать создание новых атрибутов",
      "Отслеживать изменения атрибутов целевого элемента",
      "Отслеживать удаление атрибутов",
      "Все вышеперечисленное"
    ],
    correctAnswer: 3,
    explanation: "attributes: true включает отслеживание всех изменений атрибутов: добавление, изменение и удаление атрибутов целевого элемента.",
    topic: "Опции наблюдения"
  },
  {
    id: 10,
    question: "Что означает опция characterData: true?",
    options: [
      "Отслеживать изменения символов в атрибутах",
      "Отслеживать изменения текстового содержимого узлов",
      "Отслеживать изменения стилей",
      "Отслеживать изменения кодировки"
    ],
    correctAnswer: 1,
    explanation: "characterData: true включает отслеживание изменений текстового содержимого узлов (Text nodes и Comment nodes).",
    topic: "Опции наблюдения"
  },
  {
    id: 11,
    question: "Что означает опция subtree: true?",
    options: [
      "Наблюдать только за прямыми потомками",
      "Наблюдать за целевым элементом и всеми его потомками",
      "Наблюдать только за потомками, исключая целевой элемент",
      "Создать отдельный observer для каждого потомка"
    ],
    correctAnswer: 1,
    explanation: "subtree: true расширяет наблюдение на все поддерево целевого элемента, включая всех его потомков на любом уровне вложенности.",
    topic: "Опции наблюдения"
  },
  {
    id: 12,
    question: "Для чего используется опция attributeOldValue: true?",
    options: [
      "Для хранения истории всех изменений атрибутов",
      "Для сохранения предыдущего значения атрибута в MutationRecord",
      "Для отмены изменений атрибутов",
      "Для предотвращения изменения атрибутов"
    ],
    correctAnswer: 1,
    explanation: "attributeOldValue: true сохраняет предыдущее значение изменившегося атрибута в свойстве oldValue объекта MutationRecord.",
    topic: "Опции наблюдения"
  },
  {
    id: 13,
    question: "Что означает опция characterDataOldValue: true?",
    options: [
      "Сохраняет предыдущее текстовое содержимое узла",
      "Сохраняет предыдущую кодировку текста",
      "Блокирует изменение текста",
      "Создает резервную копию текста"
    ],
    correctAnswer: 0,
    explanation: "characterDataOldValue: true сохраняет предыдущее значение текстового содержимого узла в свойстве oldValue объекта MutationRecord.",
    topic: "Опции наблюдения"
  },
  {
    id: 14,
    question: "Что означает опция attributeFilter?",
    options: [
      "Массив имен атрибутов для отслеживания (остальные игнорируются)",
      "Функция для фильтрации атрибутов",
      "Регулярное выражение для поиска атрибутов",
      "Список атрибутов для исключения из наблюдения"
    ],
    correctAnswer: 0,
    explanation: "attributeFilter — это массив имен атрибутов, за которыми нужно следить. Изменения других атрибутов не будут отслеживаться.",
    topic: "Опции наблюдения"
  },

  // Тема 3: MutationRecord
  {
    id: 15,
    question: "Что содержит свойство 'type' в MutationRecord?",
    options: [
      "Тип элемента",
      "Тип изменения: 'childList', 'attributes' или 'characterData'",
      "Тип данных",
      "Тип события"
    ],
    correctAnswer: 1,
    explanation: "Свойство type указывает тип произошедшего изменения: 'childList' (изменение дочерних элементов), 'attributes' (изменение атрибутов) или 'characterData' (изменение текста).",
    topic: "MutationRecord"
  },
  {
    id: 16,
    question: "Что содержит свойство 'target' в MutationRecord?",
    options: [
      "Родительский элемент",
      "Элемент, в котором произошло изменение",
      "Новый добавленный элемент",
      "Все затронутые элементы"
    ],
    correctAnswer: 1,
    explanation: "target содержит ссылку на DOM-узел, в котором непосредственно произошло изменение (владелец изменившегося атрибута, родитель добавленных/удаленных узлов, или сам текстовый узел).",
    topic: "MutationRecord"
  },
  {
    id: 17,
    question: "Что содержат свойства addedNodes и removedNodes?",
    options: [
      "Строки с именами узлов",
      "NodeList с добавленными/удаленными узлами",
      "Количество добавленных/удаленных узлов",
      "Типы добавленных/удаленных узлов"
    ],
    correctAnswer: 1,
    explanation: "addedNodes и removedNodes содержат NodeList с узлами, которые были добавлены или удалены. Эти свойства заполняются только для изменений типа 'childList'.",
    topic: "MutationRecord"
  },
  {
    id: 18,
    question: "Что содержит свойство 'attributeName' в MutationRecord?",
    options: [
      "Имя любого изменившегося атрибута",
      "Имя изменившегося атрибута (только для type: 'attributes')",
      "Новое значение атрибута",
      "Список всех атрибутов элемента"
    ],
    correctAnswer: 1,
    explanation: "attributeName содержит имя изменившегося атрибута, заполняется только для мутаций типа 'attributes', для других типов будет null.",
    topic: "MutationRecord"
  },
  {
    id: 19,
    question: "Когда свойство 'oldValue' будет содержать значение?",
    options: [
      "Всегда",
      "Только если включены опции attributeOldValue или characterDataOldValue",
      "Только для атрибутов",
      "Только для текстового содержимого"
    ],
    correctAnswer: 1,
    explanation: "oldValue будет содержать предыдущее значение только если были включены соответствующие опции: attributeOldValue (для атрибутов) или characterDataOldValue (для текста).",
    topic: "MutationRecord"
  },
  {
    id: 20,
    question: "Что содержат свойства previousSibling и nextSibling?",
    options: [
      "Предыдущий и следующий элементы на том же уровне",
      "Предыдущий и следующий соседи добавленных/удаленных узлов",
      "Родительский и дочерний элементы",
      "Первый и последний дочерние элементы"
    ],
    correctAnswer: 1,
    explanation: "previousSibling и nextSibling содержат предыдущего и следующего соседа добавленных или удаленных узлов. Эти свойства заполняются только для изменений типа 'childList'.",
    topic: "MutationRecord"
  },

  // Тема 4: Практическое применение
  {
    id: 21,
    question: "Как отследить добавление нового элемента в список?",
    options: [
      "Использовать только attributes: true",
      "Использовать childList: true на родительском элементе списка",
      "Использовать subtree: true на элементе списка",
      "Использовать characterData: true"
    ],
    correctAnswer: 1,
    explanation: "Для отслеживания добавления новых элементов нужно наблюдать за родительским контейнером с опцией childList: true.",
    topic: "Практическое применение"
  },
  {
    id: 22,
    question: "Как отследить изменение класса элемента?",
    options: [
      "Использовать childList: true",
      "Использовать attributes: true или attributeFilter: ['class']",
      "Использовать characterData: true",
      "Использовать classList observer"
    ],
    correctAnswer: 1,
    explanation: "Изменение класса — это изменение атрибута 'class', поэтому нужно использовать attributes: true или attributeFilter: ['class'] для более точного отслеживания.",
    topic: "Практическое применение"
  },
  {
    id: 23,
    question: "Как отследить изменение текстового содержимого элемента?",
    options: [
      "Использовать childList: true и subtree: true",
      "Использовать characterData: true и subtree: true",
      "Использовать attributes: true",
      "Использовать textContent observer"
    ],
    correctAnswer: 1,
    explanation: "Для отслеживания изменений текста нужно использовать characterData: true. Если текст находится в дочерних узлах, также потребуется subtree: true.",
    topic: "Практическое применение"
  },
  {
    id: 24,
    question: "Когда полезно использовать takeRecords()?",
    options: [
      "Для очистки памяти",
      "Перед disconnect() для обработки последних необработанных изменений",
      "Для ускорения работы observer",
      "Для фильтрации изменений"
    ],
    correctAnswer: 1,
    explanation: "takeRecords() полезен перед disconnect(), чтобы получить и обработать все накопленные, но еще не переданные в callback изменения.",
    topic: "Практическое применение"
  },
  {
    id: 25,
    question: "Может ли MutationObserver вызвать бесконечный цикл?",
    options: [
      "Нет, это невозможно",
      "Да, если в callback изменять наблюдаемый элемент",
      "Только в старых браузерах",
      "Только при использовании subtree: true"
    ],
    correctAnswer: 1,
    explanation: "Если callback изменяет наблюдаемый элемент, это вызовет новую мутацию, что может привести к бесконечному циклу. Нужно быть осторожным или использовать disconnect() перед изменениями.",
    topic: "Практическое применение"
  },
  {
    id: 26,
    question: "Как избежать бесконечного цикла в MutationObserver?",
    options: [
      "Использовать setTimeout",
      "Временно отключать observer (disconnect) перед изменениями, затем включать снова",
      "Использовать debounce",
      "Изменять только атрибуты, не указанные в attributeFilter"
    ],
    correctAnswer: 1,
    explanation: "Перед изменением наблюдаемого элемента в callback нужно вызвать disconnect(), сделать изменения, затем снова вызвать observe().",
    topic: "Практическое применение"
  },

  // Тема 5: Производительность
  {
    id: 27,
    question: "Влияет ли MutationObserver на производительность?",
    options: [
      "Да, сильно замедляет страницу",
      "Минимально влияет при правильном использовании",
      "Нет, совершенно не влияет",
      "Только при наблюдении за body"
    ],
    correctAnswer: 1,
    explanation: "MutationObserver работает асинхронно и оптимизирован браузером. При правильной настройке опций влияние на производительность минимально.",
    topic: "Производительность"
  },
  {
    id: 28,
    question: "Почему не стоит наблюдать за document.body с subtree: true без необходимости?",
    options: [
      "Это запрещено браузером",
      "Будет отслеживаться каждое изменение на всей странице, что может быть очень дорого",
      "Работает только в Chrome",
      "Это безопасно и всегда рекомендуется"
    ],
    correctAnswer: 1,
    explanation: "Наблюдение за body с subtree: true означает отслеживание всех изменений на всей странице, что может значительно снизить производительность. Лучше наблюдать за конкретными контейнерами.",
    topic: "Производительность"
  },
  {
    id: 29,
    question: "Когда следует вызывать disconnect()?",
    options: [
      "Сразу после первой мутации",
      "При размонтировании компонента или когда наблюдение больше не нужно",
      "Никогда не нужно вызывать",
      "После каждого изменения"
    ],
    correctAnswer: 1,
    explanation: "disconnect() следует вызывать при размонтировании компонента или когда наблюдение больше не требуется, чтобы избежать утечек памяти и ненужной работы.",
    topic: "Производительность"
  },
  {
    id: 30,
    question: "Что эффективнее: один observer для многих элементов или отдельные observers?",
    options: [
      "Отдельные observers для каждого элемента",
      "Один observer с subtree: true обычно эффективнее",
      "Нет разницы",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "Обычно эффективнее использовать один observer на общем родителе с subtree: true, чем создавать множество отдельных observers, так как это снижает overhead.",
    topic: "Производительность"
  },

  // Тема 6: Сравнение с другими подходами
  {
    id: 31,
    question: "В чем преимущество MutationObserver перед setInterval для отслеживания изменений DOM?",
    options: [
      "MutationObserver быстрее",
      "MutationObserver реагирует сразу на изменения, а не проверяет периодически",
      "MutationObserver проще в использовании",
      "Нет преимуществ"
    ],
    correctAnswer: 1,
    explanation: "MutationObserver срабатывает сразу при изменениях, в то время как setInterval постоянно проверяет DOM, тратя ресурсы впустую. MutationObserver эффективнее и точнее.",
    topic: "Сравнение с другими подходами"
  },
  {
    id: 32,
    question: "Чем MutationObserver отличается от событий DOM?",
    options: [
      "Ничем, это то же самое",
      "MutationObserver отслеживает структурные изменения DOM, события — пользовательские действия",
      "События быстрее",
      "MutationObserver работает только с атрибутами"
    ],
    correctAnswer: 1,
    explanation: "События DOM реагируют на действия пользователя (клики, ввод), а MutationObserver отслеживает программные изменения структуры DOM (добавление/удаление элементов, изменение атрибутов).",
    topic: "Сравнение с другими подходами"
  },
  {
    id: 33,
    question: "Можно ли использовать MutationObserver вместо событий input или change?",
    options: [
      "Да, всегда лучше использовать MutationObserver",
      "Нет, для пользовательского ввода лучше использовать события",
      "Только для textarea",
      "Только для checkbox"
    ],
    correctAnswer: 1,
    explanation: "Для отслеживания пользовательского ввода лучше использовать события input/change. MutationObserver предназначен для отслеживания программных изменений DOM, а не пользовательских действий.",
    topic: "Сравнение с другими подходами"
  },

  // Тема 7: Специальные случаи
  {
    id: 34,
    question: "Будет ли MutationObserver отслеживать изменения CSS-свойств через style?",
    options: [
      "Да, всегда",
      "Да, style — это атрибут, нужно использовать attributes: true",
      "Нет, нельзя отследить стили",
      "Только инлайн-стили"
    ],
    correctAnswer: 1,
    explanation: "style — это атрибут элемента, поэтому его изменения можно отследить с помощью attributes: true или attributeFilter: ['style'].",
    topic: "Специальные случаи"
  },
  {
    id: 35,
    question: "Можно ли отследить изменение innerHTML элемента?",
    options: [
      "Нет, innerHTML не отслеживается",
      "Да, через childList: true (увидим добавление/удаление узлов)",
      "Только с помощью специальной опции",
      "Только для строк"
    ],
    correctAnswer: 1,
    explanation: "Изменение innerHTML приводит к удалению старых и добавлению новых дочерних узлов, что будет отслежено через childList: true.",
    topic: "Специальные случаи"
  },
  {
    id: 36,
    question: "Отслеживает ли MutationObserver изменения в Shadow DOM?",
    options: [
      "Нет, Shadow DOM полностью изолирован",
      "Да, если observer создан внутри Shadow DOM",
      "Только в открытом Shadow DOM",
      "Всегда отслеживает"
    ],
    correctAnswer: 1,
    explanation: "MutationObserver, созданный снаружи Shadow DOM, не видит изменений внутри него. Нужно создать observer внутри Shadow Root для отслеживания изменений в Shadow DOM.",
    topic: "Специальные случаи"
  },
  {
    id: 37,
    question: "Что произойдет при изменении элемента через клонирование (cloneNode)?",
    options: [
      "Будет отслежено создание клона",
      "Клонирование не отслеживается, но вставка клона будет отслежена как добавление узла",
      "Ничего не произойдет",
      "Ошибка"
    ],
    correctAnswer: 1,
    explanation: "Само клонирование происходит в памяти и не отслеживается, но когда клон вставляется в DOM (appendChild, insertBefore), это будет отслежено как добавление узла.",
    topic: "Специальные случаи"
  },

  // Тема 8: Совместимость и полифиллы
  {
    id: 38,
    question: "Поддерживается ли MutationObserver в IE11?",
    options: [
      "Да, полностью поддерживается",
      "Нет, требуется полифилл",
      "Частично поддерживается",
      "Поддерживается с префиксом"
    ],
    correctAnswer: 0,
    explanation: "MutationObserver поддерживается в IE11 и всех современных браузерах. Для более старых версий IE (10 и ниже) требуется полифилл.",
    topic: "Совместимость"
  },
  {
    id: 39,
    question: "Как проверить поддержку MutationObserver в браузере?",
    options: [
      "if (MutationObserver) { }",
      "if ('MutationObserver' in window) { }",
      "if (window.MutationObserver !== undefined) { }",
      "Все варианты верны"
    ],
    correctAnswer: 3,
    explanation: "Все три способа корректны для проверки поддержки MutationObserver. Обычно используют 'MutationObserver' in window.",
    topic: "Совместимость"
  },
  {
    id: 40,
    question: "Что такое MutationEvents и почему их не стоит использовать?",
    options: [
      "Современная альтернатива MutationObserver",
      "Устаревший синхронный API для отслеживания DOM, который был заменен MutationObserver",
      "События для отслеживания мутаций генов",
      "Более быстрая версия MutationObserver"
    ],
    correctAnswer: 1,
    explanation: "MutationEvents — устаревший API (DOMNodeInserted, DOMAttrModified и др.), который работал синхронно и сильно влиял на производительность. Был заменен асинхронным MutationObserver и не должен использоваться.",
    topic: "Совместимость"
  }
]
