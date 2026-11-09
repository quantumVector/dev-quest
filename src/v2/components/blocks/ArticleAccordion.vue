<script setup lang="ts">
import type { AccordionBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
import { renderInlineProse } from '../../utils/markdown'
defineProps<{ block: AccordionBlock }>()
</script>

<template>
  <v-expansion-panels :multiple="block.multiple" variant="accordion" class="article-accordion">
    <v-expansion-panel v-for="item in block.items" :key="item.id" :value="item.id">
      <v-expansion-panel-title
        ><span v-html="renderInlineProse(item.title)"></span
      ></v-expansion-panel-title>
      <v-expansion-panel-text><ArticleRenderer :blocks="item.blocks" /></v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.article-accordion {
  border: 1px solid var(--article-border);
  border-radius: var(--article-radius);
  overflow: hidden;
}
.article-accordion :deep(.v-expansion-panel) {
  box-shadow: none;
}
.article-accordion :deep(.v-expansion-panel-title) {
  font-weight: 600;
  line-height: 1.6;
}
.article-accordion :deep(.v-expansion-panel-text__wrapper) {
  padding-top: 12px;
}
</style>
