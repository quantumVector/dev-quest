import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/docker/docker-dockerfile-dockerfilesnippet.txt?raw'
import example2 from '../snippets/docker/docker-dockerfile-contextexamplesnippet.txt?raw'
import example3 from '../snippets/docker/docker-dockerfile-dockerignoresnippet.txt?raw'
import example4 from '../snippets/docker/docker-dockerfile-buildcommandsnippet.txt?raw'

// Content copied verbatim from src/views/docker/DockerfileBuildContext.vue.
export default {
  ...articleSummaries.dockerDockerfileBuildContext,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        "**Dockerfile** — это текстовый файл с инструкциями для автоматической сборки Docker образа. **Контекст сборки** — это набор файлов, которые Docker отправляет daemon'у для использования во время сборки. **.dockerignore** — это файл для исключения ненужных файлов из контекста сборки.",
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Dockerfile — рецепт образа',
      blocks: [
        {
          id: 'cards-2',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-3',
              title: 'Что это?',
              blocks: [
                {
                  id: 'text-4',
                  type: 'prose',
                  markdown:
                    '- **Текстовый файл** с инструкциями\n- **Рецепт** для создания образа\n- **Декларативное описание** окружения\n- **Автоматизация** процесса сборки\n- **Версионируется** вместе с кодом',
                },
              ],
            },
            {
              id: 'card-5',
              title: 'Основные инструкции',
              blocks: [
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown:
                    '- `FROM` — базовый образ\n- `WORKDIR` — рабочая директория\n- `COPY` — копирование файлов\n- `RUN` — выполнение команд\n- `EXPOSE` — открытие портов\n- `CMD` — команда по умолчанию',
                },
              ],
            },
          ],
        },
        {
          id: 'code-7',
          type: 'code',
          language: 'docker',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Контекст сборки — что видит Docker',
      blocks: [
        {
          id: 'callout-8',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-9',
              type: 'prose',
              markdown:
                '**Важно:** Контекст сборки — это все файлы и папки, которые Docker daemon может использовать во время сборки образа. Он определяется путем, указанным в команде `docker build`.',
            },
          ],
        },
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
                  text: 'Содержимое',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown: "Все файлы из указанной папки отправляются Docker daemon'у",
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
                  text: 'Передача',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: "Контекст передается по сети Docker daemon'у перед сборкой",
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
                  text: 'Видимость',
                },
                {
                  id: 'text-19',
                  type: 'prose',
                  markdown: 'Только файлы из контекста доступны инструкциям COPY/ADD',
                },
              ],
            },
          ],
        },
        {
          id: 'code-20',
          type: 'code',
          language: 'bash',
          code: example2,
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Проблемы без .dockerignore',
      blocks: [
        {
          id: 'cards-21',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-22',
              blocks: [
                {
                  id: 'heading-23',
                  type: 'heading',
                  level: 3,
                  text: 'Проблемы',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown:
                    '- **Большой размер контекста** — node\\_modules, .git\n- **Медленная сборка** — передача ненужных файлов\n- **Утечки данных** — секреты, конфиги попадают в образ\n- **Кеш инвалидация** — изменения в ненужных файлах',
                },
              ],
            },
            {
              id: 'card-25',
              blocks: [
                {
                  id: 'heading-26',
                  type: 'heading',
                  level: 3,
                  text: 'С .dockerignore',
                },
                {
                  id: 'text-27',
                  type: 'prose',
                  markdown:
                    '- **Быстрая сборка** — меньший контекст\n- **Безопасность** — исключение секретов\n- **Лучшее кеширование** — стабильность слоев\n- **Чистота образа** — только нужные файлы',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-4',
      title: '.dockerignore — фильтр контекста',
      blocks: [
        {
          id: 'code-28',
          type: 'code',
          language: 'bash',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'Команды сборки и контекст',
      blocks: [
        {
          id: 'code-29',
          type: 'code',
          language: 'bash',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Правила работы с контекстом',
      blocks: [
        {
          id: 'cards-30',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-31',
              title: 'COPY vs ADD',
              blocks: [
                {
                  id: 'text-32',
                  type: 'prose',
                  markdown:
                    '- `COPY src/ ./src/` — копирует из контекста\n- `COPY ../outside .` — ❌ ОШИБКА! Выходит за контекст\n- `ADD` — может распаковывать архивы\n- Предпочитайте `COPY` для простоты',
                },
              ],
            },
            {
              id: 'card-33',
              title: 'Оптимизация контекста',
              blocks: [
                {
                  id: 'text-34',
                  type: 'prose',
                  markdown:
                    '- Используйте `.dockerignore`\n- Минимизируйте размер контекста\n- Копируйте только нужные файлы\n- Используйте multi\\-stage builds',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-35',
          type: 'prose',
          markdown:
            "1. **Что происходит при выполнении `docker build .`?**\n   \n   Docker создает tar\\-архив всех файлов из текущей папки (исключая .dockerignore), отправляет его daemon'у, который распаковывает и использует как контекст для инструкций COPY/ADD.\n2. **Можно ли копировать файлы извне контекста?**\n   \n   Нет! Инструкции COPY и ADD работают только с файлами внутри контекста сборки. `COPY ../file .` вызовет ошибку. Решение — изменить контекст или использовать multi\\-stage builds.\n3. **Как уменьшить размер контекста?**\n   \n   Использовать .dockerignore для исключения node\\_modules/, .git/, тестов, документации и других ненужных файлов. Также можно изменить расположение Dockerfile.\n4. **В чем разница между .dockerignore и .gitignore?**\n   \n   .dockerignore исключает файлы из контекста сборки Docker, .gitignore — из Git репозитория. Часто пересекаются, но имеют разные цели: Docker — оптимизация сборки, Git — версионирование.\n5. **Что такое слои и как они связаны с контекстом?**\n   \n   Каждая инструкция Dockerfile создает слой. Файлы из контекста копируются в слои через COPY/ADD. Изменение файлов в контексте инвалидирует кеш слоев, поэтому важно оптимизировать порядок инструкций.\n6. **Как проверить, что попадает в контекст?**\n   \n   Можно использовать `docker build --dry-run` (если поддерживается), проверить размер через `du -sh .` или создать временный tar: `tar -czf context.tar.gz .`",
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-36',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-37',
              blocks: [
                {
                  id: 'heading-38',
                  type: 'heading',
                  level: 3,
                  text: '✅ Делать',
                },
                {
                  id: 'text-39',
                  type: 'prose',
                  markdown:
                    '- Всегда создавать .dockerignore\n- Исключать node\\_modules/, .git/\n- Копировать только нужные файлы\n- Использовать COPY вместо ADD\n- Оптимизировать порядок инструкций\n- Проверять размер контекста',
                },
              ],
            },
            {
              id: 'card-40',
              blocks: [
                {
                  id: 'heading-41',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-42',
                  type: 'prose',
                  markdown:
                    '- Копирование всего проекта COPY . .\n- Включение секретов в контекст\n- Большие контексты (&gt;100MB)\n- Попытки выйти за контекст\n- Игнорирование .dockerignore\n- Копирование бинарных файлов',
                },
              ],
            },
            {
              id: 'card-43',
              blocks: [
                {
                  id: 'heading-44',
                  type: 'heading',
                  level: 3,
                  text: '💡 Советы',
                },
                {
                  id: 'text-45',
                  type: 'prose',
                  markdown:
                    '- Структурируйте Dockerfile слоями\n- Используйте multi\\-stage builds\n- Кешируйте зависимости отдельно\n- Копируйте package.json первым\n- Мониторьте размер образов\n- Автоматизируйте сборку',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Итог',
      blocks: [
        {
          id: 'text-46',
          type: 'prose',
          markdown:
            '**Dockerfile** — это инструкция по сборке образа. **Контекст сборки** — это набор файлов, доступных для копирования в образ через COPY/ADD. **.dockerignore** исключает ненужные файлы из контекста, ускоряя сборку и повышая безопасность. Правильная настройка этих компонентов — ключ к эффективной работе с Docker.',
        },
        {
          id: 'resources-47',
          type: 'resources',
          items: [
            {
              id: 'link-48',
              label: 'Dockerfile Reference',
              url: 'https://docs.docker.com/engine/reference/builder/',
            },
          ],
        },
        {
          id: 'resources-49',
          type: 'resources',
          items: [
            {
              id: 'link-50',
              label: '.dockerignore Guide',
              url: 'https://docs.docker.com/engine/reference/builder/#dockerignore-file',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
