<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import type { TabsBlock } from '../../types/article'
import ArticleRenderer from '../ArticleRenderer.vue'
const props = defineProps<{ block: TabsBlock }>()
const selected = ref(props.block.items[0].id)
const tabId = useId()
watch(
  () => props.block.items,
  (items) => {
    selected.value = items[0].id
  },
)
</script>

<template>
  <div class="article-tab-group">
    <v-tabs v-model="selected" color="primary" show-arrows aria-label="Варианты объяснения">
      <v-tab
        v-for="item in block.items"
        :id="`${tabId}-${item.id}`"
        :aria-controls="`${tabId}-panel-${item.id}`"
        :key="item.id"
        :value="item.id"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <v-window v-model="selected" class="article-tab-content">
      <v-window-item
        :id="`${tabId}-panel-${item.id}`"
        v-for="item in block.items"
        :key="item.id"
        :value="item.id"
        role="tabpanel"
        :aria-labelledby="`${tabId}-${item.id}`"
      >
        <ArticleRenderer :blocks="item.blocks" />
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
.article-tab-group {
  border: 1px solid var(--article-border);
  border-radius: var(--article-radius);
  overflow: hidden;
}
.article-tab-content {
  padding: 24px;
  border-top: 1px solid var(--article-border);
}
</style>
