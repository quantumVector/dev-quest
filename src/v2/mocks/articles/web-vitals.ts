import type { Article } from '../../types/article'
import { articleSummaries } from '../catalog'
import example1 from '../snippets/web/web-vitals-introsnippet.txt?raw'
import example2 from '../snippets/web/web-vitals-lcpsnippet.txt?raw'
import example3 from '../snippets/web/web-vitals-inpsnippet.txt?raw'
import example4 from '../snippets/web/web-vitals-clssnippet.txt?raw'
import example5 from '../snippets/web/web-vitals-measurementsnippet.txt?raw'
import example6 from '../snippets/web/web-vitals-toolssnippet.txt?raw'
import example7 from '../snippets/web/web-vitals-optimizationsnippet.txt?raw'
import example8 from '../snippets/web/web-vitals-seosnippet.txt?raw'

// Content copied verbatim from src/views/web/WebVitals.vue.
export default {
  ...articleSummaries.webWebVitals,
  schemaVersion: 1,
  intro: [
    {
      id: 'text-1',
      type: 'prose',
      markdown:
        '**Web Vitals** — это набор метрик от Google для измерения реального пользовательского опыта на веб\\-сайтах. Три основные метрики (Core Web Vitals) являются факторами ранжирования в Google Search с 2021 года. Понимание и оптимизация этих метрик критически важны для современной веб\\-разработки.',
    },
  ],
  sections: [
    {
      id: 'section-1',
      title: 'Введение в Web Vitals',
      blocks: [
        {
          id: 'code-2',
          type: 'code',
          language: 'javascript',
          code: example1,
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Core Web Vitals: основные метрики',
      blocks: [
        {
          id: 'cards-3',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-4',
              blocks: [
                {
                  id: 'heading-5',
                  type: 'heading',
                  level: 3,
                  text: 'LCP',
                },
                {
                  id: 'text-6',
                  type: 'prose',
                  markdown: '**Largest Contentful Paint**',
                },
                {
                  id: 'text-7',
                  type: 'prose',
                  markdown: 'Время загрузки самого большого контентного элемента',
                },
                {
                  id: 'text-8',
                  type: 'prose',
                  markdown: '✅ Отлично: &lt; 2.5с',
                },
                {
                  id: 'text-9',
                  type: 'prose',
                  markdown: '⚠️ Улучшить: 2.5\\-4с',
                },
                {
                  id: 'text-10',
                  type: 'prose',
                  markdown: '❌ Плохо: &gt; 4с',
                },
              ],
            },
            {
              id: 'card-11',
              blocks: [
                {
                  id: 'heading-12',
                  type: 'heading',
                  level: 3,
                  text: 'INP',
                },
                {
                  id: 'text-13',
                  type: 'prose',
                  markdown: '**Interaction to Next Paint**',
                },
                {
                  id: 'text-14',
                  type: 'prose',
                  markdown: 'Отзывчивость на взаимодействия пользователя',
                },
                {
                  id: 'text-15',
                  type: 'prose',
                  markdown: '✅ Отлично: &lt; 200мс',
                },
                {
                  id: 'text-16',
                  type: 'prose',
                  markdown: '⚠️ Улучшить: 200\\-500мс',
                },
                {
                  id: 'text-17',
                  type: 'prose',
                  markdown: '❌ Плохо: &gt; 500мс',
                },
              ],
            },
            {
              id: 'card-18',
              blocks: [
                {
                  id: 'heading-19',
                  type: 'heading',
                  level: 3,
                  text: 'CLS',
                },
                {
                  id: 'text-20',
                  type: 'prose',
                  markdown: '**Cumulative Layout Shift**',
                },
                {
                  id: 'text-21',
                  type: 'prose',
                  markdown: 'Визуальная стабильность страницы',
                },
                {
                  id: 'text-22',
                  type: 'prose',
                  markdown: '✅ Отлично: &lt; 0.1',
                },
                {
                  id: 'text-23',
                  type: 'prose',
                  markdown: '⚠️ Улучшить: 0.1\\-0.25',
                },
                {
                  id: 'text-24',
                  type: 'prose',
                  markdown: '❌ Плохо: &gt; 0.25',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-3',
      title: 'LCP - Largest Contentful Paint',
      blocks: [
        {
          id: 'text-25',
          type: 'prose',
          markdown:
            'LCP измеряет производительность загрузки, фиксируя время отрисовки самого большого элемента контента в viewport. Это наиболее важная метрика воспринимаемой скорости загрузки.',
        },
        {
          id: 'code-26',
          type: 'code',
          language: 'javascript',
          code: example2,
        },
      ],
    },
    {
      id: 'section-4',
      title: 'INP - Interaction to Next Paint',
      blocks: [
        {
          id: 'text-27',
          type: 'prose',
          markdown:
            'INP заменил FID в 2024 году как основную метрику интерактивности. Измеряет задержку между взаимодействием пользователя и визуальным откликом для ВСЕХ взаимодействий на странице.',
        },
        {
          id: 'code-28',
          type: 'code',
          language: 'javascript',
          code: example3,
        },
      ],
    },
    {
      id: 'section-5',
      title: 'CLS - Cumulative Layout Shift',
      blocks: [
        {
          id: 'text-29',
          type: 'prose',
          markdown:
            'CLS измеряет визуальную стабильность — сколько неожиданных сдвигов макета происходит во время загрузки страницы. Важен для предотвращения случайных кликов.',
        },
        {
          id: 'code-30',
          type: 'code',
          language: 'javascript',
          code: example4,
        },
      ],
    },
    {
      id: 'section-6',
      title: 'Дополнительные метрики',
      blocks: [
        {
          id: 'table-31',
          type: 'table',
          columns: [
            {
              id: 'column-1',
              label: 'Метрика',
            },
            {
              id: 'column-2',
              label: 'Что измеряет',
            },
            {
              id: 'column-3',
              label: 'Хорошее значение',
            },
            {
              id: 'column-4',
              label: 'Важность',
            },
          ],
          rows: [
            {
              id: 'row-1',
              cells: [
                [
                  {
                    id: 'text-32',
                    type: 'prose',
                    markdown: '**FCP**',
                  },
                ],
                [
                  {
                    id: 'text-33',
                    type: 'prose',
                    markdown: 'First Contentful Paint \\- первый элемент контента',
                  },
                ],
                [
                  {
                    id: 'text-34',
                    type: 'prose',
                    markdown: '&lt; 1.8с',
                  },
                ],
                [
                  {
                    id: 'text-35',
                    type: 'prose',
                    markdown: 'Высокая',
                  },
                ],
              ],
            },
            {
              id: 'row-2',
              cells: [
                [
                  {
                    id: 'text-36',
                    type: 'prose',
                    markdown: '**TTFB**',
                  },
                ],
                [
                  {
                    id: 'text-37',
                    type: 'prose',
                    markdown: 'Time to First Byte \\- время ответа сервера',
                  },
                ],
                [
                  {
                    id: 'text-38',
                    type: 'prose',
                    markdown: '&lt; 800мс',
                  },
                ],
                [
                  {
                    id: 'text-39',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
              ],
            },
            {
              id: 'row-3',
              cells: [
                [
                  {
                    id: 'text-40',
                    type: 'prose',
                    markdown: '**TBT**',
                  },
                ],
                [
                  {
                    id: 'text-41',
                    type: 'prose',
                    markdown: 'Total Blocking Time \\- время блокировки главного потока',
                  },
                ],
                [
                  {
                    id: 'text-42',
                    type: 'prose',
                    markdown: '&lt; 200мс',
                  },
                ],
                [
                  {
                    id: 'text-43',
                    type: 'prose',
                    markdown: 'Средняя',
                  },
                ],
              ],
            },
            {
              id: 'row-4',
              cells: [
                [
                  {
                    id: 'text-44',
                    type: 'prose',
                    markdown: '**SI**',
                  },
                ],
                [
                  {
                    id: 'text-45',
                    type: 'prose',
                    markdown: 'Speed Index \\- скорость визуального заполнения',
                  },
                ],
                [
                  {
                    id: 'text-46',
                    type: 'prose',
                    markdown: '&lt; 3.4с',
                  },
                ],
                [
                  {
                    id: 'text-47',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
              ],
            },
            {
              id: 'row-5',
              cells: [
                [
                  {
                    id: 'text-48',
                    type: 'prose',
                    markdown: '**TTI**',
                  },
                ],
                [
                  {
                    id: 'text-49',
                    type: 'prose',
                    markdown: 'Time to Interactive \\- время до интерактивности',
                  },
                ],
                [
                  {
                    id: 'text-50',
                    type: 'prose',
                    markdown: '&lt; 3.8с',
                  },
                ],
                [
                  {
                    id: 'text-51',
                    type: 'prose',
                    markdown: 'Низкая',
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-7',
      title: 'Измерение Web Vitals',
      blocks: [
        {
          id: 'text-52',
          type: 'prose',
          markdown:
            'Существует два типа данных: **Field Data** (реальные пользователи) и **Lab Data** (синтетические тесты). Для объективной оценки нужны оба типа.',
        },
        {
          id: 'code-53',
          type: 'code',
          language: 'javascript',
          code: example5,
        },
      ],
    },
    {
      id: 'section-8',
      title: 'Инструменты для мониторинга',
      blocks: [
        {
          id: 'cards-54',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-55',
              title: 'Field Data (RUM)',
              blocks: [
                {
                  id: 'text-56',
                  type: 'prose',
                  markdown: 'Реальные пользователи:',
                },
                {
                  id: 'text-57',
                  type: 'prose',
                  markdown:
                    '- Chrome UX Report\n- Google Analytics 4\n- web\\-vitals библиотека\n- Vercel Analytics\n- Sentry Performance',
                },
              ],
            },
            {
              id: 'card-58',
              title: 'Lab Data',
              blocks: [
                {
                  id: 'text-59',
                  type: 'prose',
                  markdown: 'Синтетические тесты:',
                },
                {
                  id: 'text-60',
                  type: 'prose',
                  markdown:
                    '- Chrome DevTools Lighthouse\n- PageSpeed Insights\n- WebPageTest\n- Lighthouse CI\n- Calibre',
                },
              ],
            },
            {
              id: 'card-61',
              title: 'Мониторинг',
              blocks: [
                {
                  id: 'text-62',
                  type: 'prose',
                  markdown: 'Continuous monitoring:',
                },
                {
                  id: 'text-63',
                  type: 'prose',
                  markdown:
                    '- Google Search Console\n- CrUX Dashboard\n- SpeedCurve\n- Datadog RUM\n- New Relic Browser',
                },
              ],
            },
          ],
        },
        {
          id: 'code-64',
          type: 'code',
          language: 'javascript',
          code: example6,
        },
      ],
    },
    {
      id: 'section-9',
      title: 'Стратегия оптимизации',
      blocks: [
        {
          id: 'code-65',
          type: 'code',
          language: 'javascript',
          code: example7,
        },
      ],
    },
    {
      id: 'section-10',
      title: 'Web Vitals и SEO',
      blocks: [
        {
          id: 'callout-66',
          type: 'callout',
          tone: 'info',
          blocks: [
            {
              id: 'text-67',
              type: 'prose',
              markdown:
                '**Важно для SEO:** С июня 2021 Core Web Vitals являются прямым фактором ранжирования в Google Search. Страницы с хорошими показателями получают преимущество.',
            },
          ],
        },
        {
          id: 'code-68',
          type: 'code',
          language: 'javascript',
          code: example8,
        },
      ],
    },
    {
      id: 'section-11',
      title: 'Частые вопросы на собеседовании',
      blocks: [
        {
          id: 'text-69',
          type: 'prose',
          markdown:
            '1. **Что такое Core Web Vitals и почему они важны?**\n   \n   Core Web Vitals — три ключевые метрики от Google: LCP (загрузка), INP (интерактивность), CLS (стабильность). Они важны, потому что измеряют реальный UX и с 2021 года являются фактором ранжирования в Google Search.\n2. **В чем разница между FID и INP?**\n   \n   FID измерял только ПЕРВОЕ взаимодействие пользователя. INP (с марта 2024) измеряет ВСЕ взаимодействия на странице и берет 98\\-й перцентиль, давая более полную картину отзывчивости интерфейса.\n3. **Как измерить Web Vitals в production?**\n   \n   Используйте библиотеку web\\-vitals от Google или RUM\\-сервисы (Google Analytics 4, Sentry, Datadog). Данные отправляются через sendBeacon API. Важно собирать данные от реальных пользователей (Field Data), а не только лабораторные тесты.\n4. **Как оптимизировать LCP?**\n   \n   Основные методы: оптимизация изображений (WebP/AVIF, srcset, sizes), preload критичных ресурсов, оптимизация TTFB, избегание render\\-blocking CSS/JS, использование CDN, приоритизация загрузки (fetchpriority="high").\n5. **Как предотвратить Layout Shift (CLS)?**\n   \n   Всегда указывайте размеры изображений и видео, резервируйте пространство для динамического контента (min\\-height), избегайте вставки контента над существующим, используйте font\\-display: swap для шрифтов, применяйте скелетоны для загрузки.\n6. **Как Web Vitals влияют на ранжирование в Google?**\n   \n   Core Web Vitals — прямой фактор ранжирования с 2021 года, часть Page Experience. Используются данные из Chrome UX Report (75\\-й перцентиль за 28 дней). Хорошие метрики дают преимущество между страницами с похожим контентом. Плохие метрики могут снизить позиции.\n7. **В чем разница между Field Data и Lab Data?**\n   \n   Field Data — реальные данные от пользователей (Chrome UX Report, RUM). Lab Data — синтетические тесты в контролируемых условиях (Lighthouse). Field Data точнее отражает UX, Lab Data лучше для отладки и воспроизводимости.\n8. **Как настроить мониторинг Web Vitals в CI/CD?**\n   \n   Используйте Lighthouse CI с конфигурацией пороговых значений. Интегрируйте в GitHub Actions или GitLab CI. Блокируйте deploy при критических регрессиях. Храните исторические данные для трендов. Пример: .lighthouserc.js с assertions.',
        },
      ],
    },
    {
      id: 'section-12',
      title: 'Лучшие практики',
      blocks: [
        {
          id: 'cards-70',
          type: 'cards',
          columns: 3,
          items: [
            {
              id: 'card-71',
              blocks: [
                {
                  id: 'heading-72',
                  type: 'heading',
                  level: 3,
                  text: '✅ Обязательно',
                },
                {
                  id: 'text-73',
                  type: 'prose',
                  markdown:
                    '- Измеряйте реальных пользователей (RUM)\n- Оптимизируйте LCP первым\n- Резервируйте место для контента\n- Используйте современные форматы\n- Настройте мониторинг и алерты\n- Тестируйте на реальных устройствах',
                },
              ],
            },
            {
              id: 'card-74',
              blocks: [
                {
                  id: 'heading-75',
                  type: 'heading',
                  level: 3,
                  text: '❌ Избегать',
                },
                {
                  id: 'text-76',
                  type: 'prose',
                  markdown:
                    '- Игнорировать Field Data\n- Оптимизировать только для Lighthouse\n- Динамические баннеры без резервирования\n- Большие изображения без оптимизации\n- Тяжелые синхронные операции\n- Изменение размеров после загрузки',
                },
              ],
            },
            {
              id: 'card-77',
              blocks: [
                {
                  id: 'heading-78',
                  type: 'heading',
                  level: 3,
                  text: '💡 Рекомендуется',
                },
                {
                  id: 'text-79',
                  type: 'prose',
                  markdown:
                    '- Performance budget в CI/CD\n- A/B тестирование оптимизаций\n- Регулярный аудит конкурентов\n- Документирование оптимизаций\n- Обучение команды метрикам\n- Интеграция с аналитикой',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-13',
      title: 'Чек-лист оптимизации',
      blocks: [
        {
          id: 'cards-80',
          type: 'cards',
          columns: 2,
          items: [
            {
              id: 'card-81',
              title: 'Для LCP',
              blocks: [
                {
                  id: 'text-82',
                  type: 'prose',
                  markdown:
                    '- ☐ Оптимизированы изображения (WebP/AVIF)\n- ☐ Настроен srcset и sizes\n- ☐ Используется preload для критичных ресурсов\n- ☐ Минимизирован TTFB (&lt; 800ms)\n- ☐ Убраны render\\-blocking ресурсы\n- ☐ Используется CDN\n- ☐ Включено сжатие (Brotli/Gzip)\n- ☐ Настроено кэширование',
                },
              ],
            },
            {
              id: 'card-83',
              title: 'Для INP',
              blocks: [
                {
                  id: 'text-84',
                  type: 'prose',
                  markdown:
                    '- ☐ Разбиты длинные задачи\n- ☐ Используется дебаунс/троттлинг\n- ☐ Применен code splitting\n- ☐ Тяжелые операции в Web Workers\n- ☐ Оптимизированы обработчики событий\n- ☐ Используется виртуализация списков\n- ☐ Применена мемоизация в React\n- ☐ Минимизирован JavaScript',
                },
              ],
            },
            {
              id: 'card-85',
              title: 'Для CLS',
              blocks: [
                {
                  id: 'text-86',
                  type: 'prose',
                  markdown:
                    '- ☐ Указаны размеры всех изображений\n- ☐ Зарезервировано место для рекламы\n- ☐ Используется font\\-display: swap\n- ☐ Предзагружены критичные шрифты\n- ☐ Скелетоны для динамического контента\n- ☐ Баннеры используют position: fixed\n- ☐ Анимации через transform\n- ☐ Минимизированы динамические вставки',
                },
              ],
            },
            {
              id: 'card-87',
              title: 'Мониторинг',
              blocks: [
                {
                  id: 'text-88',
                  type: 'prose',
                  markdown:
                    '- ☐ Настроен Google Search Console\n- ☐ Интегрирована web\\-vitals библиотека\n- ☐ Включен RUM мониторинг\n- ☐ Настроены алерты на регрессии\n- ☐ Lighthouse CI в pipeline\n- ☐ Регулярный аудит (еженедельно)\n- ☐ Отслеживание трендов\n- ☐ Анализ конкурентов',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section-14',
      title: 'Итог',
      blocks: [
        {
          id: 'text-89',
          type: 'prose',
          markdown:
            '**Web Vitals** — критически важные метрики для современного веба. Core Web Vitals (LCP, INP, CLS) измеряют реальный пользовательский опыт и напрямую влияют на ранжирование в Google. Оптимизация требует комплексного подхода: измерение реальных пользователей, технические улучшения, мониторинг и постоянное тестирование. Хорошие показатели улучшают не только SEO, но и конверсию, время на сайте и лояльность пользователей.',
        },
        {
          id: 'resources-90',
          type: 'resources',
          items: [
            {
              id: 'link-91',
              label: 'web.dev/vitals',
              url: 'https://web.dev/vitals/',
            },
          ],
        },
        {
          id: 'resources-92',
          type: 'resources',
          items: [
            {
              id: 'link-93',
              label: 'web-vitals библиотека',
              url: 'https://github.com/GoogleChrome/web-vitals',
            },
          ],
        },
        {
          id: 'resources-94',
          type: 'resources',
          items: [
            {
              id: 'link-95',
              label: 'PageSpeed Insights',
              url: 'https://pagespeed.web.dev/',
            },
          ],
        },
      ],
    },
  ],
} satisfies Article
