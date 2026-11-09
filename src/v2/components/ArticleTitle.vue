<script setup lang="ts">
import { renderInlineProse } from '../utils/markdown'
defineProps<{ title: string; markdown?: string }>()
</script>

<template>
  <h1 v-if="markdown" class="article-title" v-html="renderInlineProse(markdown)"></h1>
  <h1 v-else class="article-title">{{ title }}</h1>
</template>

<style scoped>
.article-title :deep(code) {
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(var(--v-theme-on-surface), 0.07);
  font-size: 0.88em;
}
</style>
