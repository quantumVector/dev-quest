<script setup lang="ts">
import type { TableBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
defineProps<{ block: TableBlock }>()
</script>

<template>
  <div class="article-table" tabindex="0" role="region" :aria-label="block.caption || 'Таблица'">
    <table>
      <caption v-if="block.caption">
        {{
          block.caption
        }}
      </caption>
      <thead v-if="block.columns.some((column) => column.label !== undefined)">
        <tr>
          <th v-for="column in block.columns" :key="column.id" scope="col">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in block.rows" :key="row.id">
          <td v-for="(cell, index) in row.cells" :key="block.columns[index].id">
            <ArticleRenderer :blocks="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.article-table {
  overflow-x: auto;
  border: 1px solid var(--article-border);
  border-radius: var(--article-radius);
}
.article-table:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
caption {
  padding: 12px 18px;
  text-align: left;
  color: var(--article-muted);
  font-size: 0.85rem;
}
th,
td {
  min-width: 160px;
  padding: 16px 18px;
  vertical-align: top;
}
th {
  background: rgba(var(--v-theme-on-surface), 0.04);
  font-size: 0.9rem;
}
td {
  border-top: 1px solid var(--article-border);
}
td :deep(.article-blocks) {
  gap: 12px;
}
</style>
