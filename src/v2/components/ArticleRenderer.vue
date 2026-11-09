<script setup lang="ts">
import type { ArticleBlock } from '../types/article'
import ArticleProse from './blocks/ArticleProse.vue'
import ArticleList from './blocks/ArticleList.vue'
import ArticleInlineCode from './blocks/ArticleInlineCode.vue'
import ArticleHeading from './blocks/ArticleHeading.vue'
import ArticleTags from './blocks/ArticleTags.vue'
import ArticleCodeBlock from './blocks/ArticleCodeBlock.vue'
import ArticleTable from './blocks/ArticleTable.vue'
import ArticleCallout from './blocks/ArticleCallout.vue'
import ArticleCardGroup from './blocks/ArticleCardGroup.vue'
import ArticleAccordion from './blocks/ArticleAccordion.vue'
import ArticleTabs from './blocks/ArticleTabs.vue'
import ArticleSteps from './blocks/ArticleSteps.vue'
import ArticleProgress from './blocks/ArticleProgress.vue'
import ArticleTimeline from './blocks/ArticleTimeline.vue'
import ArticleResources from './blocks/ArticleResources.vue'
import ArticleWidget from './widgets/ArticleWidget.vue'

defineProps<{ blocks: ArticleBlock[] }>()
</script>

<template>
  <div class="article-blocks">
    <div
      v-for="block in blocks"
      :key="block.id"
      class="article-block"
      :data-block-type="block.type"
    >
      <ArticleProse v-if="block.type === 'prose'" :markdown="block.markdown" />
      <ArticleList v-else-if="block.type === 'list'" :block="block" />
      <ArticleInlineCode v-else-if="block.type === 'inline-code'" :block="block" />
      <br v-else-if="block.type === 'line-break'" />
      <ArticleHeading v-else-if="block.type === 'heading'" :block="block" />
      <ArticleTags v-else-if="block.type === 'tags'" :block="block" />
      <ArticleCodeBlock v-else-if="block.type === 'code'" :block="block" />
      <ArticleTable v-else-if="block.type === 'table'" :block="block" />
      <ArticleCallout v-else-if="block.type === 'callout'" :block="block" />
      <ArticleCardGroup v-else-if="block.type === 'cards'" :block="block" />
      <ArticleAccordion v-else-if="block.type === 'accordion'" :block="block" />
      <ArticleTabs v-else-if="block.type === 'tabs'" :block="block" />
      <ArticleSteps v-else-if="block.type === 'steps'" :block="block" />
      <ArticleProgress v-else-if="block.type === 'progress'" :block="block" />
      <ArticleTimeline v-else-if="block.type === 'timeline'" :block="block" />
      <ArticleResources v-else-if="block.type === 'resources'" :block="block" />
      <ArticleWidget v-else-if="block.type === 'widget'" :block="block" />
    </div>
  </div>
</template>

<style scoped>
.article-blocks {
  display: grid;
  gap: 24px;
  min-width: 0;
}
.article-block {
  min-width: 0;
}
</style>
