<script setup lang="ts">
import { computed } from 'vue'
import { renderProse } from '../../utils/markdown'

const props = defineProps<{ markdown: string }>()
const rendered = computed(() => renderProse(props.markdown))
</script>

<template>
  <div class="article-prose" v-html="rendered"></div>
</template>

<style scoped>
.article-prose {
  min-width: 0;
}
.article-prose :deep(p),
.article-prose :deep(ul),
.article-prose :deep(ol),
.article-prose :deep(blockquote) {
  margin: 0 0 12px;
}
.article-prose :deep(kbd) {
  padding: 2px 6px;
  border: 1px solid var(--article-border);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: rgba(var(--v-theme-on-surface), 0.04);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.85em;
  white-space: nowrap;
}
.article-prose :deep(> :last-child),
.article-prose :deep(li > :last-child) {
  margin-bottom: 0;
}
.article-prose :deep(ul),
.article-prose :deep(ol) {
  padding-left: 24px;
}
.article-prose :deep(li + li) {
  margin-top: 5px;
}
.article-prose :deep(a) {
  color: rgb(var(--v-theme-primary));
  text-underline-offset: 3px;
}
.article-prose :deep(code) {
  padding: 2px 5px;
  border-radius: 4px;
  color: rgb(var(--v-theme-on-surface));
  background: rgba(var(--v-theme-on-surface), 0.07);
  font-size: 0.88em;
  overflow-wrap: anywhere;
}
.article-prose :deep(blockquote) {
  padding: 8px 16px;
  border-left: 3px solid rgb(var(--v-theme-primary));
  color: var(--article-muted);
}
</style>
