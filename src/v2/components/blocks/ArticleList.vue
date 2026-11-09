<script setup lang="ts">
import type { ListBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
defineProps<{ block: ListBlock }>()
</script>

<template>
  <component :is="block.ordered ? 'ol' : 'ul'" class="article-content-list">
    <li v-for="item in block.items" :key="item.id">
      <ArticleRenderer :blocks="item.blocks" />
    </li>
  </component>
</template>

<style scoped>
.article-content-list {
  padding-left: 24px;
}
.article-content-list > li + li {
  margin-top: 16px;
}
</style>
