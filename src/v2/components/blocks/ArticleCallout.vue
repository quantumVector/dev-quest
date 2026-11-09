<script setup lang="ts">
import type { CalloutBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
defineProps<{ block: CalloutBlock }>()
</script>

<template>
  <v-alert :type="block.tone" variant="tonal" class="article-callout" role="note">
    <div v-if="block.label" class="article-callout-label mb-2">{{ block.label }}</div>
    <h3 v-if="block.title" class="mb-2">{{ block.title }}</h3>
    <ArticleRenderer :blocks="block.blocks" />
  </v-alert>
</template>

<style scoped>
.article-callout {
  border-radius: var(--article-radius);
}
.article-callout-label {
  font-weight: 700;
}
.article-callout :deep(.article-blocks) {
  gap: 12px;
}
</style>
