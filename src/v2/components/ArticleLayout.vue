<script setup lang="ts">
defineProps<{ wide?: boolean }>()
</script>

<template>
  <div class="article-v2" :class="{ 'article-v2--wide': wide }">
    <slot />
  </div>
</template>

<style scoped>
.article-v2 {
  --article-border: rgba(var(--v-theme-on-surface), 0.14);
  --article-muted: rgba(var(--v-theme-on-surface), 0.68);
  --article-radius: 12px;
  width: 100%;
  max-width: 920px;
  min-width: 0;
  margin: 0 auto;
  padding: 16px 0 64px;
  overflow-wrap: anywhere;
  line-height: 1.75;
}
.article-v2--wide {
  max-width: 1120px;
}
.article-v2 :deep(.article-header) {
  margin-bottom: 36px;
}
.article-v2 :deep(h1) {
  margin: 12px 0 16px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.25;
  font-weight: 750;
  letter-spacing: -0.025em;
}
.article-v2 :deep(h2) {
  font-size: clamp(1.35rem, 3vw, 1.7rem);
  line-height: 1.35;
  font-weight: 700;
}
.article-v2 :deep(h3) {
  font-size: 1.075rem;
  line-height: 1.5;
  font-weight: 700;
}
.article-v2 :deep(h4) {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 700;
}
.article-v2 :deep(.article-description) {
  color: var(--article-muted);
  max-width: 75ch;
}
.article-v2 :deep(.article-eyebrow) {
  color: rgb(var(--v-theme-primary));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.article-v2 :deep(.article-surface) {
  padding: clamp(16px, 3vw, 24px);
  border: 1px solid var(--article-border);
  border-radius: var(--article-radius);
}
.article-v2 :deep(a:focus-visible),
.article-v2 :deep(button:focus-visible) {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 4px;
}
</style>
