<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { mutationObserverQuestions } from '@/data/web-api-mutation-observer-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="mutationObserverQuestions"
    title="Тест: MutationObserver API"
    description="Проверьте свои знания по работе с MutationObserver"
    :show-topic-breakdown="true"
  />
</template>
