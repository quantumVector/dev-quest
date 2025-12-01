import type { Question } from '@/types/question.ts'

export const cookieQuestions: Question[] = [
  // Тема 1: Что такое cookie и для чего используются
  {
    id: 1,
    question: "Что такое cookie (куки)?",
    options: [
      "Файлы JavaScript, хранящиеся в браузере",
      "Небольшие текстовые данные, которые сервер отправляет браузеру и которые браузер сохраняет",
      "База данных на стороне клиента",
      "Протокол передачи данных между сервером и клиентом"
    ],
    correctAnswer: 1,
    explanation: "Cookie — это небольшие фрагменты текстовых данных, которые сервер отправляет браузеру в HTTP-заголовке Set-Cookie, и которые браузер сохраняет и отправляет обратно серверу с каждым последующим запросом.",
    topic: "Основы Cookie"
  },
  {
    id: 2,
    question: "Для чего в первую очередь используются cookie?",
    options: [
      "Для хранения больших объемов данных",
      "Для управления сеансами, персонализации и отслеживания пользователей",
      "Для выполнения JavaScript кода",
      "Для ускорения загрузки страниц"
    ],
    correctAnswer: 1,
    explanation: "Cookie в основном используются для трех целей: управление сеансами (аутентификация, корзина покупок), персонализация (пользовательские настройки, темы) и отслеживание (анализ поведения пользователей).",
    topic: "Основы Cookie"
  },
  {
    id: 3,
    question: "Какой максимальный размер одного cookie?",
    options: [
      "1 KB",
      "4 KB",
      "10 KB",
      "Неограничен"
    ],
    correctAnswer: 1,
    explanation: "Максимальный размер одного cookie обычно составляет 4 KB (4096 байт). Это ограничение включает имя, значение и все атрибуты cookie.",
    topic: "Основы Cookie"
  },
  {
    id: 4,
    question: "Сколько cookie может хранить браузер для одного домена?",
    options: [
      "Не более 10",
      "Не более 20",
      "Обычно 50-180, в зависимости от браузера",
      "Неограниченное количество"
    ],
    correctAnswer: 2,
    explanation: "Браузеры обычно ограничивают количество cookie для одного домена (обычно 50-180 в зависимости от браузера). При превышении лимита старые cookie удаляются.",
    topic: "Основы Cookie"
  },
  {
    id: 5,
    question: "В каком виде cookie отправляются на сервер?",
    options: [
      "В теле HTTP-запроса в JSON формате",
      "В HTTP-заголовке Cookie в виде строки ключ=значение",
      "В URL параметрах",
      "В отдельном TCP пакете"
    ],
    correctAnswer: 1,
    explanation: "Cookie отправляются на сервер в HTTP-заголовке Cookie в виде строки формата 'имя1=значение1; имя2=значение2'. Браузер автоматически включает все подходящие cookie в каждый запрос.",
    topic: "Основы Cookie"
  },

  // Тема 2: Какие данные можно хранить в cookie
  {
    id: 6,
    question: "Какие данные МОЖНО безопасно хранить в cookie?",
    options: [
      "Пароли пользователей",
      "Номера кредитных карт",
      "Session ID, настройки интерфейса, токены аутентификации",
      "Персональные данные в открытом виде"
    ],
    correctAnswer: 2,
    explanation: "В cookie можно хранить session ID, пользовательские настройки (язык, тема), токены аутентификации (желательно с HttpOnly флагом). Данные должны быть минимальными и не критичными.",
    topic: "Хранение данных"
  },
  {
    id: 7,
    question: "Почему НЕ стоит хранить пароли в cookie?",
    options: [
      "Cookie слишком маленькие для паролей",
      "Cookie передаются с каждым запросом и могут быть перехвачены",
      "Браузеры запрещают хранить пароли в cookie",
      "Пароли автоматически удаляются из cookie"
    ],
    correctAnswer: 1,
    explanation: "Cookie передаются с каждым HTTP-запросом и могут быть перехвачены при атаках типа Man-in-the-Middle (особенно без HTTPS). Даже с HTTPS, cookie доступны через JavaScript (если нет HttpOnly), что делает их уязвимыми для XSS атак.",
    topic: "Хранение данных"
  },
  {
    id: 8,
    question: "Что такое session ID и почему его безопасно хранить в cookie?",
    options: [
      "Это пароль пользователя в зашифрованном виде",
      "Это случайный уникальный идентификатор сессии, который сам по себе не содержит конфиденциальных данных",
      "Это зашифрованные данные пользователя",
      "Это постоянный идентификатор пользователя"
    ],
    correctAnswer: 1,
    explanation: "Session ID — это случайный, непредсказуемый идентификатор, который связывает браузер с данными сессии на сервере. Сам ID не содержит конфиденциальной информации, а реальные данные хранятся на сервере.",
    topic: "Хранение данных"
  },
  {
    id: 9,
    question: "Какие данные НЕ следует хранить в cookie?",
    options: [
      "Настройки темы интерфейса",
      "Выбранный язык интерфейса",
      "Номера банковских карт и социальные номера",
      "Session ID для авторизации"
    ],
    correctAnswer: 2,
    explanation: "В cookie НИКОГДА не следует хранить: пароли, номера кредитных карт, социальные номера, медицинские данные, любую конфиденциальную персональную информацию в открытом виде.",
    topic: "Хранение данных"
  },
  {
    id: 10,
    question: "Почему нежелательно хранить большие объемы данных в cookie?",
    options: [
      "Браузер может удалить cookie",
      "Cookie передаются с каждым HTTP-запросом, увеличивая трафик",
      "Cookie автоматически шифруются, что замедляет работу",
      "Сервер не сможет прочитать большие cookie"
    ],
    correctAnswer: 1,
    explanation: "Cookie отправляются с каждым HTTP-запросом к домену, включая запросы изображений, стилей и скриптов. Большие cookie увеличивают размер каждого запроса, замедляя загрузку страницы и увеличивая трафик.",
    topic: "Хранение данных"
  },

  // Тема 3: Создание и установка cookie
  {
    id: 11,
    question: "Как сервер устанавливает cookie?",
    options: [
      "Через JavaScript код на странице",
      "Через HTTP-заголовок Set-Cookie в ответе",
      "Через localStorage API",
      "Через URL параметры"
    ],
    correctAnswer: 1,
    explanation: "Сервер устанавливает cookie, отправляя HTTP-заголовок Set-Cookie в ответе. Например: 'Set-Cookie: sessionId=abc123; Path=/; HttpOnly'.",
    topic: "Создание cookie"
  },
  {
    id: 12,
    question: "Как создать cookie на стороне клиента с помощью JavaScript?",
    options: [
      "localStorage.setItem('name', 'value')",
      "document.cookie = 'name=value'",
      "window.setCookie('name', 'value')",
      "cookies.set('name', 'value')"
    ],
    correctAnswer: 1,
    explanation: "На клиенте cookie создается через присваивание строки свойству document.cookie: 'document.cookie = \"name=value; path=/; max-age=3600\"'. Каждое присваивание добавляет или обновляет одно cookie.",
    topic: "Создание cookie"
  },
  {
    id: 13,
    question: "Что выполнит этот код?\n\ndocument.cookie = 'user=John';\ndocument.cookie = 'session=xyz';",
    options: [
      "Установит только второй cookie, перезаписав первый",
      "Установит оба cookie независимо друг от друга",
      "Вызовет ошибку",
      "Объединит оба cookie в один"
    ],
    correctAnswer: 1,
    explanation: "Присваивание document.cookie не перезаписывает все cookie, а добавляет или обновляет конкретное cookie. После выполнения кода будут установлены оба cookie: user=John и session=xyz.",
    topic: "Создание cookie"
  },
  {
    id: 14,
    question: "Как прочитать все cookie на стороне клиента?",
    options: [
      "document.getCookie()",
      "document.cookie (возвращает строку со всеми cookie)",
      "window.cookies.getAll()",
      "localStorage.getItem('cookies')"
    ],
    correctAnswer: 1,
    explanation: "document.cookie возвращает строку со всеми доступными cookie в формате 'name1=value1; name2=value2'. Для удобной работы обычно пишут функции парсинга этой строки.",
    topic: "Создание cookie"
  },
  {
    id: 15,
    question: "Можно ли установить cookie с помощью JavaScript, если у cookie установлен флаг HttpOnly?",
    options: [
      "Да, всегда можно",
      "Нет, HttpOnly cookie доступны только серверу",
      "Да, но только для чтения",
      "Да, но только через специальное API"
    ],
    correctAnswer: 1,
    explanation: "HttpOnly флаг делает cookie недоступным для JavaScript. Такие cookie можно установить и прочитать только на сервере. Это защищает от XSS атак, так как злоумышленник не сможет украсть cookie через JavaScript.",
    topic: "Создание cookie"
  },
  {
    id: 16,
    question: "Как удалить cookie на стороне клиента?",
    options: [
      "document.cookie = 'name=; max-age=-1'",
      "document.deleteCookie('name')",
      "delete document.cookie.name",
      "document.cookie.remove('name')"
    ],
    correctAnswer: 0,
    explanation: "Для удаления cookie нужно установить его с прошедшей датой истечения или отрицательным max-age: 'document.cookie = \"name=; max-age=-1; path=/\"'. Важно указать те же path и domain, что были при создании.",
    topic: "Создание cookie"
  },

  // Тема 4: Атрибуты и параметры cookie
  {
    id: 17,
    question: "Что делает атрибут Path в cookie?",
    options: [
      "Указывает путь на сервере, где хранится cookie",
      "Определяет URL путь, для которого cookie будет отправляться",
      "Шифрует путь к cookie",
      "Указывает физический путь в файловой системе"
    ],
    correctAnswer: 1,
    explanation: "Атрибут Path определяет, для каких URL путей браузер будет отправлять cookie. Например, 'Path=/' означает, что cookie будет отправляться для всех путей домена, а 'Path=/admin' — только для /admin и его подпутей.",
    topic: "Атрибуты cookie"
  },
  {
    id: 18,
    question: "Что делает атрибут Domain в cookie?",
    options: [
      "Указывает IP адрес сервера",
      "Определяет домен (и субдомены), для которых cookie доступен",
      "Шифрует доменное имя",
      "Указывает протокол соединения"
    ],
    correctAnswer: 1,
    explanation: "Атрибут Domain определяет, какие домены могут получать cookie. Если указан 'Domain=example.com', то cookie будет доступен и для субдоменов (sub.example.com). Если не указан, cookie доступен только для текущего домена (без субдоменов).",
    topic: "Атрибуты cookie"
  },
  {
    id: 19,
    question: "Чем отличаются атрибуты Expires и Max-Age?",
    options: [
      "Никакой разницы, это синонимы",
      "Expires указывает конкретную дату, Max-Age — время жизни в секундах",
      "Expires для серверных cookie, Max-Age для клиентских",
      "Expires устарел и не используется"
    ],
    correctAnswer: 1,
    explanation: "Expires указывает конкретную дату истечения cookie (например, 'Expires=Wed, 21 Oct 2025 07:28:00 GMT'), а Max-Age указывает время жизни в секундах относительно текущего момента (например, 'Max-Age=3600' для 1 часа). Max-Age имеет приоритет, если указаны оба.",
    topic: "Атрибуты cookie"
  },
  {
    id: 20,
    question: "Что произойдет, если не указать Expires или Max-Age?",
    options: [
      "Cookie будет храниться вечно",
      "Cookie станет session cookie и удалится при закрытии браузера",
      "Браузер установит время жизни по умолчанию (24 часа)",
      "Cookie не будет создан"
    ],
    correctAnswer: 1,
    explanation: "Без Expires или Max-Age cookie становится session cookie (временное cookie сеанса) и удаляется при закрытии браузера. Persistent cookie (постоянное) создаются с указанием времени жизни.",
    topic: "Атрибуты cookie"
  },
  {
    id: 21,
    question: "Что делает атрибут Secure?",
    options: [
      "Шифрует содержимое cookie",
      "Cookie будет передаваться только по HTTPS",
      "Делает cookie доступным только для сервера",
      "Защищает cookie от удаления"
    ],
    correctAnswer: 1,
    explanation: "Атрибут Secure указывает, что cookie должен передаваться только по защищенному HTTPS соединению. Без этого флага cookie может быть перехвачен при Man-in-the-Middle атаках на HTTP.",
    topic: "Атрибуты cookie"
  },
  {
    id: 22,
    question: "Что делает атрибут HttpOnly?",
    options: [
      "Cookie доступен только по HTTP, но не по HTTPS",
      "Cookie недоступен для JavaScript (document.cookie)",
      "Cookie отправляется только при HTTP запросах",
      "Cookie можно создать только на сервере"
    ],
    correctAnswer: 1,
    explanation: "HttpOnly делает cookie недоступным для JavaScript через document.cookie. Это защищает от XSS атак, так как злоумышленник не сможет украсть cookie через внедренный JavaScript код.",
    topic: "Атрибуты cookie"
  },
  {
    id: 23,
    question: "Какую комбинацию атрибутов следует использовать для защищенного session cookie?",
    options: [
      "Secure; HttpOnly; SameSite=Strict",
      "Только HttpOnly",
      "Только Secure",
      "Path=/; Domain=example.com"
    ],
    correctAnswer: 0,
    explanation: "Для максимальной безопасности session cookie следует использовать комбинацию: Secure (только HTTPS), HttpOnly (недоступен для JavaScript), SameSite=Strict или Lax (защита от CSRF).",
    topic: "Атрибуты cookie"
  },
  {
    id: 24,
    question: "Что произойдет с cookie при указании Path=/admin для URL http://example.com/users?",
    options: [
      "Cookie будет отправлен",
      "Cookie НЕ будет отправлен, так как путь не совпадает",
      "Cookie будет отправлен, но только первый раз",
      "Произойдет ошибка"
    ],
    correctAnswer: 1,
    explanation: "Cookie с Path=/admin будет отправляться только для URL, начинающихся с /admin (например, /admin, /admin/users). Для /users этот cookie отправлен не будет.",
    topic: "Атрибуты cookie"
  },

  // Тема 5: SameSite атрибут
  {
    id: 25,
    question: "Что такое атрибут SameSite?",
    options: [
      "Определяет, может ли cookie использоваться на субдоменах",
      "Контролирует, отправляется ли cookie при cross-site запросах",
      "Указывает, что cookie доступен только на том же сайте",
      "Шифрует cookie для безопасности"
    ],
    correctAnswer: 1,
    explanation: "SameSite контролирует, когда браузер отправляет cookie в cross-site контексте (при запросах с других сайтов). Это основной механизм защиты от CSRF (Cross-Site Request Forgery) атак.",
    topic: "SameSite"
  },
  {
    id: 26,
    question: "Какие значения может принимать атрибут SameSite?",
    options: [
      "true, false",
      "Strict, Lax, None",
      "Secure, Insecure, Auto",
      "Always, Never, Auto"
    ],
    correctAnswer: 1,
    explanation: "SameSite может принимать три значения: Strict (самый строгий, cookie никогда не отправляется cross-site), Lax (отправляется при top-level навигации), None (всегда отправляется, требует Secure).",
    topic: "SameSite"
  },
  {
    id: 27,
    question: "Что делает SameSite=Strict?",
    options: [
      "Cookie отправляется всегда",
      "Cookie НИКОГДА не отправляется при cross-site запросах",
      "Cookie отправляется только по HTTPS",
      "Cookie доступен только через JavaScript"
    ],
    correctAnswer: 1,
    explanation: "SameSite=Strict означает, что cookie не будет отправлен ни при каких cross-site запросах, даже при переходе по ссылке с другого сайта. Это максимальная защита, но может создавать неудобства для пользователей.",
    topic: "SameSite"
  },
  {
    id: 28,
    question: "Что делает SameSite=Lax?",
    options: [
      "Cookie не отправляется никогда",
      "Cookie отправляется при top-level навигации (GET), но не при iframe, fetch, XHR",
      "Cookie отправляется всегда",
      "Cookie отправляется случайным образом"
    ],
    correctAnswer: 1,
    explanation: "SameSite=Lax (значение по умолчанию в современных браузерах) отправляет cookie при переходе по ссылке (top-level навигации) с другого сайта, но блокирует при POST запросах, iframe, fetch, XHR. Это баланс между безопасностью и удобством.",
    topic: "SameSite"
  },
  {
    id: 29,
    question: "Что делает SameSite=None и какое требование к нему?",
    options: [
      "Cookie никогда не отправляется, требований нет",
      "Cookie отправляется всегда, ТРЕБУЕТ атрибута Secure",
      "Cookie отправляется только same-site, требует HttpOnly",
      "Отключает cookie полностью"
    ],
    correctAnswer: 1,
    explanation: "SameSite=None означает, что cookie будет отправляться во всех контекстах, включая cross-site. Но для этого ОБЯЗАТЕЛЬНО требуется атрибут Secure (только HTTPS), иначе cookie будет отклонен браузером.",
    topic: "SameSite"
  },
  {
    id: 30,
    question: "От какой атаки в первую очередь защищает SameSite?",
    options: [
      "XSS (Cross-Site Scripting)",
      "CSRF (Cross-Site Request Forgery)",
      "SQL Injection",
      "DDoS атаки"
    ],
    correctAnswer: 1,
    explanation: "SameSite в первую очередь защищает от CSRF атак, где злоумышленник пытается выполнить действия от имени пользователя, используя его cookie при запросах с вредоносного сайта.",
    topic: "SameSite"
  },
  {
    id: 31,
    question: "Какое значение SameSite используется по умолчанию в современных браузерах, если не указано явно?",
    options: [
      "Strict",
      "Lax",
      "None",
      "Не устанавливается"
    ],
    correctAnswer: 1,
    explanation: "Современные браузеры (Chrome 80+, Firefox 69+, Safari) по умолчанию используют SameSite=Lax, если атрибут не указан явно. Это улучшает безопасность без явной настройки разработчиком.",
    topic: "SameSite"
  },
  {
    id: 32,
    question: "Что произойдет при попытке установить cookie с SameSite=None без Secure?\n\nSet-Cookie: session=abc; SameSite=None",
    options: [
      "Cookie будет установлен нормально",
      "Cookie будет отклонен современными браузерами",
      "Cookie будет установлен только для HTTP",
      "Будет установлен SameSite=Lax вместо None"
    ],
    correctAnswer: 1,
    explanation: "Современные браузеры отклонят cookie с SameSite=None без атрибута Secure. Это требование безопасности, так как None разрешает cross-site использование cookie, что безопасно только по HTTPS.",
    topic: "SameSite"
  },
  {
    id: 33,
    question: "Вы встраиваете iframe со стороннего домена, который использует cookie для аутентификации. Какой SameSite нужен для работы?",
    options: [
      "SameSite=Strict",
      "SameSite=Lax",
      "SameSite=None; Secure",
      "SameSite можно не указывать"
    ],
    correctAnswer: 2,
    explanation: "Для работы cookie в iframe со стороннего домена (cross-site context) необходим SameSite=None; Secure. Lax и Strict блокируют cookie в iframe с других доменов.",
    topic: "SameSite"
  },
  {
    id: 34,
    question: "Пользователь переходит по ссылке с google.com на ваш сайт example.com. Будет ли отправлен cookie с SameSite=Lax?",
    options: [
      "Нет, это cross-site запрос",
      "Да, это top-level навигация (переход по ссылке)",
      "Только если указан Secure",
      "Зависит от браузера"
    ],
    correctAnswer: 1,
    explanation: "SameSite=Lax позволяет отправлять cookie при top-level навигации (переход по ссылке, GET запрос), даже если это cross-site переход. Это обеспечивает баланс между безопасностью и UX.",
    topic: "SameSite"
  },
  {
    id: 35,
    question: "Что произойдет, если со стороннего сайта отправить POST форму на ваш сайт с cookie SameSite=Lax?",
    options: [
      "Cookie будет отправлен",
      "Cookie НЕ будет отправлен",
      "Cookie будет отправлен, но только первый раз",
      "Произойдет ошибка"
    ],
    correctAnswer: 1,
    explanation: "SameSite=Lax блокирует отправку cookie при POST запросах с других сайтов. Это защищает от CSRF атак при изменении данных (POST, PUT, DELETE), но разрешает при чтении (GET навигация).",
    topic: "SameSite"
  },

  // Тема 6: Практические сценарии и безопасность
  {
    id: 36,
    question: "Какие атрибуты должен иметь session cookie для аутентификации?",
    options: [
      "Path=/; Domain=.example.com",
      "HttpOnly; Secure; SameSite=Strict",
      "Max-Age=31536000",
      "Только Secure"
    ],
    correctAnswer: 1,
    explanation: "Session cookie для аутентификации должен иметь: HttpOnly (защита от XSS), Secure (только HTTPS), SameSite=Strict или Lax (защита от CSRF). Это минимальный набор для безопасной аутентификации.",
    topic: "Безопасность"
  },
  {
    id: 37,
    question: "Почему важно использовать HTTPS вместе с Secure cookie?",
    options: [
      "Для ускорения передачи cookie",
      "Для шифрования cookie и всего трафика, включая cookie",
      "Для совместимости со старыми браузерами",
      "Для уменьшения размера cookie"
    ],
    correctAnswer: 1,
    explanation: "HTTPS шифрует весь трафик, включая cookie, защищая их от перехвата при Man-in-the-Middle атаках. Атрибут Secure гарантирует, что cookie будут отправляться только по защищенному HTTPS соединению.",
    topic: "Безопасность"
  },
  {
    id: 38,
    question: "Что такое Cookie Prefixes (__Secure- и __Host-)?",
    options: [
      "Способ организации cookie в группы",
      "Специальные префиксы имени cookie с дополнительными требованиями безопасности",
      "Новый формат cookie",
      "Способ шифрования cookie"
    ],
    correctAnswer: 1,
    explanation: "Cookie Prefixes (__Secure- и __Host-) — это специальные префиксы имени cookie, которые добавляют требования: __Secure- требует Secure флаг, __Host- требует Secure, запрещает Domain и требует Path=/.",
    topic: "Безопасность"
  },
  {
    id: 39,
    question: "Чем отличается __Host- префикс от __Secure-?",
    options: [
      "Никакой разницы",
      "__Host- более строгий: требует Path=/, запрещает Domain, требует Secure",
      "__Host- работает только на localhost",
      "__Host- устарел"
    ],
    correctAnswer: 1,
    explanation: "__Host- более строгий чем __Secure-. Он требует: атрибут Secure, Path=/ (строго корень), НЕ должен иметь атрибут Domain. Это гарантирует, что cookie привязан к конкретному хосту и не может быть использован субдоменами.",
    topic: "Безопасность"
  },
  {
    id: 40,
    question: "Можно ли установить cookie для другого домена?",
    options: [
      "Да, всегда",
      "Нет, браузер блокирует установку cookie для другого домена (Same-Origin Policy)",
      "Да, но только для субдоменов",
      "Да, если указать специальный атрибут"
    ],
    correctAnswer: 1,
    explanation: "Браузер не позволит установить cookie для другого домена из соображений безопасности (Same-Origin Policy). Можно установить cookie для текущего домена и его субдоменов (через атрибут Domain), но не для произвольного стороннего домена.",
    topic: "Безопасность"
  },
  {
    id: 41,
    question: "Что такое Third-Party Cookies?",
    options: [
      "Cookie от третьих лиц, установленные не основным сайтом",
      "Cookie с трех доменов",
      "Три cookie для одного домена",
      "Устаревший тип cookie"
    ],
    correctAnswer: 0,
    explanation: "Third-Party Cookies — это cookie, установленные не основным посещаемым сайтом, а встроенными ресурсами с других доменов (реклама, аналитика, социальные виджеты). Современные браузеры начинают блокировать их по умолчанию.",
    topic: "Безопасность"
  },
  {
    id: 42,
    question: "Почему современные браузеры блокируют Third-Party Cookies?",
    options: [
      "Для экономии памяти",
      "Для защиты приватности пользователей от трекинга",
      "Для ускорения загрузки страниц",
      "Потому что они устарели"
    ],
    correctAnswer: 1,
    explanation: "Third-Party Cookies позволяют компаниям отслеживать пользователей между разными сайтами для таргетированной рекламы. Современные браузеры (Safari, Firefox, Chrome) блокируют или ограничивают их для защиты приватности.",
    topic: "Безопасность"
  },
  {
    id: 43,
    question: "Как защититься от Session Hijacking через cookie?",
    options: [
      "Использовать короткие пароли",
      "HttpOnly, Secure, SameSite, регулярная ротация session ID",
      "Хранить пароль в cookie",
      "Не использовать cookie вообще"
    ],
    correctAnswer: 1,
    explanation: "Защита от Session Hijacking: HttpOnly (защита от XSS), Secure (только HTTPS), SameSite (защита от CSRF), регулярная ротация session ID, короткое время жизни сессии, привязка к IP/User-Agent (опционально).",
    topic: "Безопасность"
  },
  {
    id: 44,
    question: "Что произойдет, если установить очень большое значение Max-Age для session cookie?",
    options: [
      "Cookie будет жить вечно, увеличивая риск компрометации",
      "Браузер автоматически ограничит время жизни",
      "Cookie не будет создан",
      "Произойдет переполнение"
    ],
    correctAnswer: 0,
    explanation: "Очень большое Max-Age создает риск: если cookie будет украден, злоумышленник будет иметь доступ в течение всего времени жизни. Для session cookie рекомендуется разумное время жизни (несколько часов/дней) и механизм продления при активности.",
    topic: "Безопасность"
  },
  {
    id: 45,
    question: "Можно ли использовать cookie в Service Worker?",
    options: [
      "Да, через document.cookie",
      "Нет, document.cookie недоступен, но cookie автоматически отправляются с fetch",
      "Да, через специальное API",
      "Service Worker не может работать с cookie"
    ],
    correctAnswer: 1,
    explanation: "В Service Worker нет доступа к document.cookie (нет DOM), но cookie автоматически включаются в fetch запросы (если credentials: 'include' или 'same-origin'). Для работы с cookie можно использовать Cookie Store API (экспериментальное).",
    topic: "Расширенное использование"
  },

  // Дополнительные практические вопросы
  {
    id: 46,
    question: "Как правильно установить cookie, доступный для всех субдоменов example.com?",
    options: [
      "Domain=.example.com",
      "Domain=*.example.com",
      "Domain=example.com; Subdomains=true",
      "Path=/; Subdomains=all"
    ],
    correctAnswer: 0,
    explanation: "Чтобы cookie был доступен для всех субдоменов, нужно установить Domain=.example.com (с точкой в начале). Тогда cookie будет доступен для example.com, sub.example.com, api.example.com и т.д.",
    topic: "Атрибуты cookie"
  },
  {
    id: 47,
    question: "Что вернет document.cookie, если установлен cookie с HttpOnly?",
    options: [
      "Все cookie, включая HttpOnly",
      "Все cookie, КРОМЕ HttpOnly",
      "Только HttpOnly cookie",
      "Ошибку"
    ],
    correctAnswer: 1,
    explanation: "document.cookie вернет строку со всеми cookie, доступными для JavaScript, но БЕЗ cookie с флагом HttpOnly. HttpOnly cookie видны только серверу и защищены от доступа через JavaScript.",
    topic: "Создание cookie"
  },
  {
    id: 48,
    question: "Можно ли изменить атрибуты существующего cookie без изменения его значения?",
    options: [
      "Да, через специальное API",
      "Нет, нужно переустановить cookie с новыми атрибутами",
      "Да, через document.cookie.updateAttributes()",
      "Атрибуты cookie нельзя изменить после создания"
    ],
    correctAnswer: 1,
    explanation: "Нельзя изменить только атрибуты cookie. Нужно заново установить cookie с тем же именем, но новыми атрибутами (это перезапишет старый cookie). Браузер идентифицирует cookie по имени, пути и домену.",
    topic: "Создание cookie"
  },
  {
    id: 49,
    question: "Что произойдет при установке cookie с путем /admin для URL /admin/users/123?",
    options: [
      "Cookie не будет установлен",
      "Cookie будет установлен и доступен для /admin и всех подпутей",
      "Cookie будет доступен только для /admin",
      "Произойдет ошибка"
    ],
    correctAnswer: 1,
    explanation: "Path=/admin означает, что cookie доступен для /admin и всех его подпутей (/admin/users, /admin/users/123, /admin/settings и т.д.). Это позволяет ограничить scope cookie определенной частью сайта.",
    topic: "Атрибуты cookie"
  },
  {
    id: 50,
    question: "Какой заголовок браузер отправит серверу, если есть два cookie: user=John и session=xyz?",
    options: [
      "Set-Cookie: user=John; session=xyz",
      "Cookie: user=John; session=xyz",
      "Cookies: [user=John, session=xyz]",
      "Authorization: Cookie user=John; session=xyz"
    ],
    correctAnswer: 1,
    explanation: "Браузер отправляет все подходящие cookie в одном HTTP-заголовке Cookie в формате: 'Cookie: name1=value1; name2=value2'. Точка с запятой разделяет разные cookie.",
    topic: "Основы Cookie"
  }
]
