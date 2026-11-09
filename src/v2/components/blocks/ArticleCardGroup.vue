<script setup lang="ts">
import type { CardsBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
defineProps<{ block: CardsBlock }>()
</script>

<template>
  <div
    class="article-cards"
    :class="{
      'article-cards--three': block.columns === 3,
      'article-cards--four': block.columns === 4,
      'article-cards--single': block.columns === 1,
    }"
  >
    <div v-for="item in block.items" :key="item.id" class="article-surface">
      <component v-if="item.title" :is="`h${item.headingLevel ?? 3}`" class="mb-3">{{
        item.title
      }}</component>
      <ArticleRenderer :blocks="item.blocks" />
    </div>
  </div>
</template>

<style scoped>
.article-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.article-cards--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.article-cards--four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.article-cards--single {
  grid-template-columns: minmax(0, 1fr);
}
.article-cards :deep(.article-blocks) {
  gap: 16px;
}
@media (max-width: 700px) {
  .article-cards,
  .article-cards--three,
  .article-cards--four {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
