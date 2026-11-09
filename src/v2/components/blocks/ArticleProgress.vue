<script setup lang="ts">
import type { ProgressBlock } from '../../types/article'
import { renderInlineProse } from '../../utils/markdown'
defineProps<{ block: ProgressBlock }>()
</script>

<template>
  <v-progress-linear
    :model-value="block.value"
    :color="block.tone || 'info'"
    :aria-label="`Значение: ${block.value}%`"
    height="28"
    rounded
    class="article-progress"
  >
    <span class="article-progress-label" v-html="renderInlineProse(block.label)"></span>
  </v-progress-linear>
</template>

<style scoped>
.article-progress {
  font-size: 0.85rem;
}
.article-progress-label {
  padding: 0 8px;
  border-radius: 4px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}
</style>
