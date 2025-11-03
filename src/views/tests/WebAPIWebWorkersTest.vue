<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webWorkersQuestions } from '@/data/web-workers-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webWorkersQuestions"
    title="Тест: Web Workers"
    description="Проверьте свои знания о Web Workers API - многопоточности в JavaScript"
    :show-topic-breakdown="true"
  />
</template>
