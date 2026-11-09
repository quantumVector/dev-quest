<script setup lang="ts">
import type { HeadingBlock } from '../../types/article'
defineProps<{ block: HeadingBlock }>()
</script>

<template>
  <component :is="`h${block.level}`">{{ block.text }}</component>
</template>
