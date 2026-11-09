<script setup lang="ts">
import type { TimelineBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
defineProps<{ block: TimelineBlock }>()
</script>

<template>
  <ol class="article-timeline">
    <li v-for="item in block.items" :key="item.id">
      <h3 v-if="item.title" class="mb-2">{{ item.title }}</h3>
      <ArticleRenderer :blocks="item.blocks" />
    </li>
  </ol>
</template>

<style scoped>
.article-timeline {
  margin: 0 0 0 6px;
  padding: 0;
  list-style: none;
}
.article-timeline > li {
  position: relative;
  padding: 0 0 28px 28px;
  border-left: 2px solid var(--article-border);
}
.article-timeline > li:last-child {
  padding-bottom: 0;
}
.article-timeline > li::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
}
</style>
