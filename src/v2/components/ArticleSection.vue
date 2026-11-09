<script setup lang="ts">
import { useId } from 'vue'
defineProps<{ id: string; title: string }>()
const headingId = useId()
</script>

<template>
  <section :id="id" class="article-section" :aria-labelledby="headingId">
    <h2 :id="headingId" class="article-section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.article-section {
  margin-top: 44px;
  scroll-margin-top: 24px;
}
.article-section-title {
  margin-bottom: 20px;
}
</style>
