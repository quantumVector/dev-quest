<script setup lang="ts">
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { articlesApi, ArticlesApiError } from '../api/articles'
import { useAsyncResource } from '../composables/useAsyncResource'
import ArticleLayout from '../components/ArticleLayout.vue'
import ArticleLoadState from '../components/ArticleLoadState.vue'
import ArticleSection from '../components/ArticleSection.vue'
import ArticleRenderer from '../components/ArticleRenderer.vue'
import ArticleTitle from '../components/ArticleTitle.vue'

const props = defineProps<{ id: string }>()
const route = useRoute()
const {
  data: article,
  loading,
  error,
  retry,
} = useAsyncResource((signal) => articlesApi.getArticle(props.id, signal))

watch([article, loading], async ([value, pending]) => {
  if (!value || pending || !route.hash) return
  await nextTick()
  // Direct links arrive before the async article has rendered its anchors.
  const section = value.sections.find((item) => `#${item.id}` === route.hash)
  if (section) document.getElementById(section.id)?.scrollIntoView()
})
</script>

<template>
  <ArticleLayout>
    <v-btn :to="{ name: 'home-v2' }" variant="text" prepend-icon="mdi-arrow-left" class="mb-6"
      >Главная v2</v-btn
    >
    <ArticleLoadState
      :loading="loading"
      :error="error"
      :not-found="error instanceof ArticlesApiError && error.status === 404"
      @retry="retry"
    />
    <article v-if="article && !loading && !error" :key="article.id">
      <header class="article-header">
        <div class="article-eyebrow">МАТЕРИАЛЫ V2</div>
        <ArticleTitle :title="article.title" :markdown="article.titleMarkdown" />
        <p v-if="article.intro === undefined" class="article-description">
          {{ article.description }}
        </p>
        <div class="d-flex flex-wrap ga-2 mt-4">
          <v-chip v-for="tag in article.tags" :key="tag" size="small" variant="tonal">{{
            tag
          }}</v-chip>
        </div>
        <v-btn
          v-if="article.legacyPath"
          :to="article.legacyPath"
          variant="text"
          size="small"
          prepend-icon="mdi-open-in-new"
          class="mt-4"
          >Открыть текущую версию</v-btn
        >
      </header>
      <ArticleRenderer v-if="article.intro" :blocks="article.intro" class="article-intro" />
      <nav class="article-surface article-contents" aria-label="Содержание статьи">
        <h2>В этой статье</h2>
        <ol>
          <li v-for="section in article.sections" :key="section.id">
            <RouterLink
              :to="{ name: 'article-v2', params: { id: article.id }, hash: `#${section.id}` }"
              >{{ section.title }}</RouterLink
            >
          </li>
        </ol>
      </nav>
      <ArticleSection
        v-for="section in article.sections"
        :id="section.id"
        :key="section.id"
        :title="section.title"
      >
        <ArticleRenderer :blocks="section.blocks" />
      </ArticleSection>
      <footer class="article-footer">
        <v-btn
          :to="{ name: 'home-v2' }"
          variant="tonal"
          color="primary"
          prepend-icon="mdi-arrow-left"
          >Все статьи v2</v-btn
        >
      </footer>
    </article>
  </ArticleLayout>
</template>

<style scoped>
.article-contents h2 {
  font-size: 1rem;
}
.article-intro {
  margin-bottom: 36px;
}
.article-contents ol {
  display: grid;
  gap: 6px;
  margin-top: 12px;
  padding-left: 24px;
}
.article-contents a {
  color: rgb(var(--v-theme-primary));
  text-underline-offset: 3px;
}
.article-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--article-border);
}
</style>
