<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { WidgetBlock } from '../../types/article'
const props = defineProps<{ block: WidgetBlock }>()

const widgetProps = computed(() =>
  props.block.name === 'testing-pyramid'
    ? { levels: props.block.props.levels }
    : { compact: props.block.props?.compact ?? true },
)

// API data can select only a component registered here; it never contains executable code.
const widgets = {
  'css-specificity': defineAsyncComponent(
    () => import('@/components/apps/CssSpecificityTrainer.vue'),
  ),
  'css-units': defineAsyncComponent(() => import('@/components/apps/CssUnitsPlayground.vue')),
  'testing-pyramid': defineAsyncComponent(() => import('./TestingPyramid.vue')),
}
</script>

<template>
  <component :is="widgets[block.name]" v-bind="widgetProps" :data-article-widget="block.name" />
</template>
