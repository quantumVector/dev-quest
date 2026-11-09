<script setup lang="ts">
import type { ResourcesBlock } from '../../types/article'
defineProps<{ block: ResourcesBlock }>()
</script>

<template>
  <ul class="article-resources">
    <li v-for="item in block.items" :key="item.id">
      <a
        :href="item.url"
        :target="/^https?:/.test(item.url) ? '_blank' : undefined"
        rel="noopener noreferrer"
      >
        {{ item.label
        }}<v-icon v-if="/^https?:/.test(item.url)" icon="mdi-open-in-new" size="14" class="ml-1" />
      </a>
      <p v-if="item.description">{{ item.description }}</p>
    </li>
  </ul>
</template>

<style scoped>
.article-resources {
  padding: 0;
  list-style: none;
  display: grid;
  gap: 16px;
}
.article-resources a {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  text-underline-offset: 3px;
}
.article-resources p {
  margin-top: 4px;
  color: var(--article-muted);
  font-size: 0.9rem;
}
</style>
