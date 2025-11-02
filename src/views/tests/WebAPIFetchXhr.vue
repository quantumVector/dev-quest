<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { fetchXhrQuestions } from '@/data/web-api-fetch-xhr-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="fetchXhrQuestions"
    title="Тест: Fetch API vs XMLHttpRequest"
    description="Проверьте свои знания по работе с HTTP-запросами в JavaScript"
    :show-topic-breakdown="true"
  />
</template>
