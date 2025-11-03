<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webAPIRequestAnimationFrameQuestions } from '@/data/web-api-raf-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webAPIRequestAnimationFrameQuestions"
    title="Тест: RequestAnimationFrame"
    description="Проверьте свои знания по requestAnimationFrame API"
    :show-topic-breakdown="true"
  />
</template>
