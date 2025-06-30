export interface InterviewQuestion {
  id: number
  question: string
  answer: string
  difficulty?: 'junior' | 'middle' | 'senior'
  tags?: string[]
}

export const htmlInterviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Что такое HTML и для чего он используется?",
    answer: `
      <p><strong>HTML (HyperText Markup Language)</strong> — это язык разметки, который используется для создания структуры и представления содержимого веб-страниц.</p>

      <h3>Основные функции HTML:</h3>
      <ul>
        <li><strong>Структурирование контента</strong> — определяет иерархию элементов на странице</li>
        <li><strong>Семантическое описание</strong> — придает смысл различным частям документа</li>
        <li><strong>Связывание ресурсов</strong> — позволяет подключать CSS, JavaScript, изображения</li>
        <li><strong>Создание гиперссылок</strong> — обеспечивает навигацию между документами</li>
      </ul>

      <h3>Ключевые особенности:</h3>
      <ul>
        <li>HTML не является языком программирования — это язык разметки</li>
        <li>Использует систему тегов для описания элементов</li>
        <li>Поддерживается всеми современными браузерами</li>
        <li>Служит основой для веб-страниц, поверх которой работают CSS и JavaScript</li>
      </ul>

      <h3>Пример базовой структуры:</h3>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Заголовок страницы&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Главный заголовок&lt;/h1&gt;
    &lt;p&gt;Параграф с текстом.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    `,
    difficulty: 'junior',
    tags: ['основы', 'структура']
  },
  {
    id: 2,
    question: "Объясните разницу между семантическими и несемантическими HTML-тегами. Приведите примеры.",
    answer: `
      <h3>Семантические теги</h3>
      <p>Семантические теги <strong>описывают смысл и назначение</strong> содержимого, а не только его внешний вид. Они помогают поисковым системам, скрин-ридерам и другим инструментам понять структуру и содержание страницы.</p>

      <h4>Примеры семантических тегов:</h4>
      <ul>
        <li><code>&lt;header&gt;</code> — заголовочная часть секции или страницы</li>
        <li><code>&lt;nav&gt;</code> — навигационные ссылки</li>
        <li><code>&lt;main&gt;</code> — основное содержимое страницы</li>
        <li><code>&lt;article&gt;</code> — независимая статья или публикация</li>
        <li><code>&lt;section&gt;</code> — логическая секция документа</li>
        <li><code>&lt;aside&gt;</code> — дополнительная информация (сайдбар)</li>
        <li><code>&lt;footer&gt;</code> — нижняя часть секции или страницы</li>
        <li><code>&lt;figure&gt;</code> — иллюстрация с подписью</li>
        <li><code>&lt;time&gt;</code> — дата и время</li>
      </ul>

      <h3>Несемантические теги</h3>
      <p>Несемантические теги <strong>не несут смысловой нагрузки</strong> и используются только для группировки или стилизации элементов.</p>

      <h4>Примеры несемантических тегов:</h4>
      <ul>
        <li><code>&lt;div&gt;</code> — блочный контейнер общего назначения</li>
        <li><code>&lt;span&gt;</code> — строчный контейнер общего назначения</li>
      </ul>

      <h3>Преимущества семантической разметки:</h3>
      <ul>
        <li><strong>SEO</strong> — поисковые системы лучше понимают содержимое</li>
        <li><strong>Доступность</strong> — скрин-ридеры могут правильно навигировать</li>
        <li><strong>Читаемость кода</strong> — разработчикам легче понять структуру</li>
        <li><strong>Сопровождаемость</strong> — код становится более понятным и логичным</li>
      </ul>

      <h3>Пример сравнения:</h3>
      <pre><code><!-- Несемантическая разметка -->
&lt;div class="header"&gt;
    &lt;div class="navigation"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="content"&gt;
    &lt;div class="article"&gt;...&lt;/div&gt;
&lt;/div&gt;

<!-- Семантическая разметка -->
&lt;header&gt;
    &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
    &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;</code></pre>
    `,
    difficulty: 'middle',
    tags: ['семантика', 'доступность', 'SEO']
  }
]
