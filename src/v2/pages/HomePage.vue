<script setup lang="ts">
import { computed } from 'vue'
import { articlesApi } from '../api/articles'
import { useAsyncResource } from '../composables/useAsyncResource'
import ArticleLayout from '../components/ArticleLayout.vue'
import ArticleLoadState from '../components/ArticleLoadState.vue'

const {
  data: catalog,
  loading,
  error,
  retry,
} = useAsyncResource((signal) => articlesApi.getCatalog(signal))
const groups = computed(() =>
  (catalog.value?.categories ?? [])
    .map((item) => ({
      ...item,
      articles: (catalog.value?.articles ?? [])
        .filter((article) => article.categoryId === item.id)
        .map((article) => ({
          ...article,
          listTitle: article.title.replace(/^\d+(?:\.\d+)*[.)]\s+/, ''),
        })),
    }))
    .filter((item) => item.articles.length > 0),
)
</script>

<template>
  <ArticleLayout>
    <header class="catalog-header">
      <h1>Главная v2</h1>
      <span v-if="catalog" class="catalog-total">Статей: {{ catalog.articles.length }}</span>
    </header>

    <ArticleLoadState :loading="loading" :error="error" @retry="retry" />
    <template v-if="catalog && !loading && !error">
      <p v-if="groups.length === 0" class="catalog-total">Пока нет статей.</p>
      <v-expansion-panels v-else multiple variant="accordion" class="catalog-groups">
        <v-expansion-panel v-for="group in groups" :key="group.id" :value="group.id">
          <v-expansion-panel-title>
            <span class="catalog-group-title">{{ group.title }}</span>
            <span class="catalog-count">{{ group.articles.length }}</span>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <ol class="catalog-links">
              <li v-for="article in group.articles" :key="article.id">
                <RouterLink
                  :to="{ name: 'article-v2', params: { id: article.id } }"
                  class="catalog-link"
                >
                  {{ article.listTitle }}
                </RouterLink>
              </li>
            </ol>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </ArticleLayout>
</template>

<style scoped>
.catalog-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.catalog-header h1 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.4;
}
.catalog-total,
.catalog-count {
  color: var(--article-muted);
  font-size: 0.85rem;
}
.catalog-groups {
  border: 1px solid var(--article-border);
  border-radius: var(--article-radius);
  overflow: hidden;
}
.catalog-groups :deep(.v-expansion-panel) {
  box-shadow: none;
}
.catalog-groups :deep(.v-expansion-panel-title) {
  min-height: 52px;
}
.catalog-groups :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 12px 12px;
}
.catalog-group-title {
  font-weight: 600;
}
.catalog-count {
  margin-left: 12px;
}
.catalog-links {
  margin: 0;
  padding: 0 0 0 28px;
  list-style: decimal;
}
.catalog-links li::marker {
  font-size: 0.95rem;
}
.catalog-links li + li {
  border-top: 1px solid var(--article-border);
}
.catalog-link {
  display: block;
  padding: 9px 12px;
  border-radius: 4px;
  color: inherit;
  font-size: 0.95rem;
  line-height: 1.5;
  text-decoration: none;
}
.catalog-link:hover {
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
}
</style>
