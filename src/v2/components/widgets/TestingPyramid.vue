<script setup lang="ts">
import type { PyramidLevel } from '../../types/article'
defineProps<{ levels: PyramidLevel[] }>()
</script>

<template>
  <figure class="article-surface article-pyramid" aria-label="Распределение тестов по уровням">
    <ol>
      <li
        v-for="(level, index) in levels"
        :key="level.id"
        :style="{ width: `${45 + (index / Math.max(levels.length - 1, 1)) * 55}%` }"
      >
        <span>{{ level.label }}</span
        ><strong>{{ level.percent }}%</strong>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.article-pyramid {
  margin: 0;
}
.article-pyramid ol {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
  list-style: none;
}
.article-pyramid li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  border-radius: 8px;
  background: rgba(var(--v-theme-primary), 0.1);
  text-align: center;
  font-size: 0.85rem;
}
.article-pyramid li:nth-child(even) {
  background: rgba(var(--v-theme-primary), 0.17);
}
.article-pyramid strong {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-primary));
}
</style>
