<script setup lang="ts">
import type { TagsBlock } from '../../types/article'
defineProps<{ block: TagsBlock }>()
</script>

<template>
  <div class="article-tags">
    <v-chip v-for="(label, index) in block.items" :key="index" size="small" variant="tonal">
      {{ label }}
    </v-chip>
  </div>
</template>

<style scoped>
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
