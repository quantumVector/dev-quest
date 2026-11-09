<script setup lang="ts">
import { ref, watch } from 'vue'
import type { StepsBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
const props = defineProps<{ block: StepsBlock }>()
const selected = ref(0)
watch(
  () => props.block.items,
  () => {
    selected.value = 0
  },
)
</script>

<template>
  <ol
    v-if="block.mode === 'sequence'"
    class="article-step-list article-step-sequence"
    aria-label="Последовательность этапов"
  >
    <li v-for="(item, index) in block.items" :key="item.id">
      <span class="article-step-number" aria-hidden="true">{{ index + 1 }}</span>
      <span>{{ item.title }}</span>
      <ArticleRenderer v-if="item.blocks.length" :blocks="item.blocks" />
    </li>
  </ol>
  <div v-else class="article-surface">
    <ol
      class="article-step-list"
      :data-restart-label="block.restartLabel"
      aria-label="Шаги объяснения"
    >
      <li v-for="(item, index) in block.items" :key="item.id">
        <button
          type="button"
          :aria-current="selected === index ? 'step' : undefined"
          @click="selected = index"
        >
          <span class="article-step-number">{{ index + 1 }}</span
          >{{ item.title }}
        </button>
      </li>
    </ol>
    <div class="article-step-content" aria-live="polite">
      <p class="article-step-count">Шаг {{ selected + 1 }} из {{ block.items.length }}</p>
      <div v-for="(item, index) in block.items" v-show="selected === index" :key="item.id">
        <h3 v-if="block.showTitle !== false" class="mb-3">{{ item.title }}</h3>
        <ArticleRenderer :blocks="item.blocks" />
      </div>
    </div>
    <div class="article-step-controls">
      <v-btn variant="text" :disabled="selected === 0" @click="selected -= 1">Назад</v-btn>
      <v-btn
        v-if="selected === block.items.length - 1 && block.restartLabel"
        variant="tonal"
        color="primary"
        @click="selected = 0"
        >{{ block.restartLabel }}</v-btn
      >
      <v-btn
        v-else
        variant="tonal"
        color="primary"
        :disabled="selected === block.items.length - 1"
        @click="selected += 1"
        >Далее</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
.article-step-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}
.article-step-list button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  text-align: left;
}
.article-step-sequence > li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--article-border);
  border-radius: 8px;
  font-size: 0.85rem;
}
.article-step-list button[aria-current] {
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.09);
}
.article-step-number {
  font-weight: 700;
}
.article-step-content {
  padding: 24px 0;
}
.article-step-count {
  margin-bottom: 8px;
  color: var(--article-muted);
  font-size: 0.85rem;
}
.article-step-controls {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
</style>
