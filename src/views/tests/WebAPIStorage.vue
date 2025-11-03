<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webStorageQuestions } from '@/data/web-api-storage-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webStorageQuestions"
    title="Тест: Web Storage API"
    description="40 вопросов по темам: основы Web Storage, методы и свойства, события storage, безопасность, сравнение с другими технологиями, практическое применение, оптимизация"
    :show-topic-breakdown="true"
  />
</template>
