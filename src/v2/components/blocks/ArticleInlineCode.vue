<script setup lang="ts">
import type { InlineCodeBlock } from '../../types/article'
defineProps<{ block: InlineCodeBlock }>()
</script>

<template>
  <code class="article-inline-code"
    ><template v-for="(line, index) in block.lines" :key="index"
      >{{ line }}<br v-if="index < block.lines.length - 1" /></template
  ></code>
</template>

<style scoped>
.article-inline-code {
  display: block;
  padding: 12px;
  overflow-x: auto;
  border-radius: 6px;
  background: var(--article-border);
}
</style>
