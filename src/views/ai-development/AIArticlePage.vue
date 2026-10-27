<script setup lang="ts">
import { computed } from 'vue'
import TokenSamplingDemo from '@/components/ai-development/TokenSamplingDemo.vue'
import {
  aiArticlePath,
  aiDevelopmentArticles,
  aiDevelopmentHome,
  aiDevelopmentSectionTitle,
  aiDevelopmentSubsections,
} from '@/data/ai-development-articles'

const props = defineProps<{ slug: string }>()
const article = computed(() => aiDevelopmentArticles.find((item) => item.slug === props.slug))
const subsection = computed(() =>
  aiDevelopmentSubsections.find((item) => item.articles.some((entry) => entry.slug === props.slug)),
)
const subsectionArticles = computed(() => subsection.value?.articles ?? [])
const index = computed(() => subsectionArticles.value.findIndex((item) => item.slug === props.slug))
const previous = computed(() => subsectionArticles.value[index.value - 1])
const next = computed(() => subsectionArticles.value[index.value + 1])
const readingMinutes = computed(() => {
  if (!article.value) return 0
  const { title, description, intro, sections, takeaway, example, exercise } = article.value
  const text = [
    title,
    description,
    ...intro,
    ...sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.flow?.map((step) => `${step.title} ${step.description}`) ?? []),
      ...(section.table?.rows.flat() ?? []),
      section.code?.code ?? '',
    ]),
    takeaway,
    example.explanation,
    example.prompt,
    ...exercise.steps,
    exercise.review,
  ].join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 180))
})
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" lg="9" xl="8" class="article-column">
      <v-btn
        :to="aiDevelopmentHome"
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="mb-6 section-link"
      >
        {{ aiDevelopmentSectionTitle }}
      </v-btn>

      <article v-if="article" :key="article.slug" class="ai-article">
        <header class="article-header">
          <p v-if="subsection" class="text-body-2 text-primary mb-2">{{ subsection.title }}</p>
          <p class="text-body-2 text-medium-emphasis mb-3">
            Статья {{ index + 1 }} из {{ subsectionArticles.length }}
            <span aria-hidden="true"> · </span>Около {{ readingMinutes }} мин чтения
          </p>
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-description text-medium-emphasis">{{ article.description }}</p>
        </header>

        <div class="article-intro">
          <p v-for="paragraph in article.intro" :key="paragraph">{{ paragraph }}</p>
        </div>

        <section
          v-for="(section, sectionIndex) in article.sections"
          :key="section.title"
          :aria-labelledby="`${article.slug}-section-${sectionIndex}`"
          class="article-section"
        >
          <h2 :id="`${article.slug}-section-${sectionIndex}`" class="section-title">
            {{ section.title }}
          </h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>

          <figure v-if="section.code" class="code-example mt-5">
            <figcaption class="text-body-2 text-medium-emphasis mb-2">
              {{ section.code.label }}
            </figcaption>
            <pre class="article-code"><code>{{ section.code.code }}</code></pre>
          </figure>

          <ol
            v-if="section.flow"
            class="generation-flow mt-5"
            aria-label="Последовательность шагов"
          >
            <li v-for="(step, stepIndex) in section.flow" :key="step.title" class="generation-step">
              <span class="step-number" aria-hidden="true">{{ stepIndex + 1 }}</span>
              <div>
                <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </li>
          </ol>
          <ul v-if="section.bullets" class="article-list">
            <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <v-table v-if="section.table" class="article-table mt-5">
            <caption v-if="section.table.caption" class="text-body-2 text-medium-emphasis">
              {{
                section.table.caption
              }}
            </caption>
            <thead>
              <tr>
                <th v-for="heading in section.table.headers" :key="heading" scope="col">
                  {{ heading }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in section.table.rows" :key="row[0]">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </tbody>
          </v-table>
          <TokenSamplingDemo v-if="section.demo === 'token-sampling'" />
        </section>

        <section class="article-section practical-example">
          <h2 class="section-title">{{ article.example.title }}</h2>
          <p>{{ article.example.explanation }}</p>
          <p class="text-subtitle-2 mt-4 mb-2">Запрос к ассистенту</p>
          <pre class="prompt-example">{{ article.example.prompt }}</pre>
        </section>

        <section class="article-section">
          <h2 class="section-title">{{ article.exercise.title }}</h2>
          <ol class="article-list mb-5">
            <li v-for="step in article.exercise.steps" :key="step">{{ step }}</li>
          </ol>
          <details class="exercise-review pa-4">
            <summary class="font-weight-medium">Разбор эксперимента</summary>
            <p class="mt-3">{{ article.exercise.review }}</p>
          </details>
        </section>

        <aside class="article-takeaway" aria-label="Главная мысль статьи">
          <h2 class="text-h6 font-weight-bold mb-2">Что взять с собой</h2>
          <p>{{ article.takeaway }}</p>
        </aside>

        <details class="article-sources">
          <summary class="font-weight-medium">Источники и дополнительные материалы</summary>
          <p class="text-body-2 text-medium-emphasis mt-4 mb-3">
            {{
              article.sourceNote ??
              'По материалам курса Claude Academy «AI capabilities and limitations». Ситуации из разработки, примеры запросов и упражнения подготовлены для этих статей.'
            }}
          </p>
          <ul class="article-list text-body-2">
            <li v-for="source in article.sources" :key="source.url">
              <a
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${source.title} (откроется в новой вкладке)`"
              >
                {{ source.title }} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </details>

        <nav v-if="previous || next" aria-label="Навигация по статьям" class="article-navigation">
          <v-card
            v-if="previous"
            :to="aiArticlePath(previous.slug)"
            variant="outlined"
            class="pa-4"
          >
            <p class="text-caption text-medium-emphasis mb-2">← Предыдущая статья</p>
            <p class="font-weight-medium">{{ previous.title }}</p>
          </v-card>
          <v-card v-if="next" :to="aiArticlePath(next.slug)" variant="outlined" class="pa-4">
            <p class="text-caption text-medium-emphasis mb-2">Следующая статья →</p>
            <p class="font-weight-medium">{{ next.title }}</p>
          </v-card>
        </nav>
        <v-btn v-if="!next" :to="aiDevelopmentHome" variant="tonal" class="mt-6">
          Все подразделы AI
        </v-btn>
      </article>

      <v-alert v-else type="warning" variant="tonal">Статья не найдена.</v-alert>
    </v-col>
  </v-row>
</template>

<style scoped>
.article-column {
  max-width: 820px;
}

.ai-article {
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.ai-article p + p {
  margin-top: 16px;
}

.article-header {
  margin-bottom: 32px;
}

.article-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.2;
  font-weight: 750;
  margin-bottom: 20px;
  text-wrap: balance;
}

.article-description,
.article-intro {
  font-size: 1.125rem;
}

.article-intro {
  padding-bottom: 32px;
  margin-bottom: 36px;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.article-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  line-height: 1.35;
  font-weight: 700;
  margin-bottom: 16px;
}

.section-link {
  max-width: 100%;
  height: auto;
  min-height: 36px;
  padding-block: 8px;
}

.section-link :deep(.v-btn__content) {
  white-space: normal;
  text-align: left;
}

.article-list {
  padding-left: 1.5rem;
}

.article-list li + li {
  margin-top: 12px;
}

.generation-flow {
  list-style: none;
  padding: 0;
}

.generation-step {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 16px;
  padding-block: 16px;
}

.generation-step + .generation-step {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.step-number {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
}

.article-table {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

.article-table :deep(td),
.article-table :deep(th) {
  padding-block: 12px;
  min-width: 150px;
  white-space: normal;
}

.article-table caption {
  text-align: left;
  padding: 16px;
  caption-side: bottom;
}

.article-code,
.prompt-example {
  border-radius: 8px;
  padding: 16px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-size: 0.875rem;
  line-height: 1.7;
}

.article-code {
  background: #18202e;
  color: #e5edf7;
}

.practical-example {
  padding: clamp(16px, 4vw, 28px);
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 12px;
}

.prompt-example {
  background: rgba(var(--v-theme-on-surface), 0.05);
}

.exercise-review {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

summary {
  cursor: pointer;
}

summary:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}

.article-takeaway {
  padding: 24px;
  margin-block: 40px;
  border-left: 3px solid rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
  border-radius: 0 8px 8px 0;
}

.article-sources {
  margin-bottom: 40px;
}

.article-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 16px;
}

a {
  color: rgb(var(--v-theme-primary));
  text-underline-offset: 3px;
}
</style>
