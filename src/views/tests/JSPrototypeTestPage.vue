<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsPrototypeQuestions } from '@/data/js-prototype-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsPrototypeQuestions"
    title="Тест по JavaScript: Prototype"
    description="24 вопроса по темам: Основы prototype, разница между __proto__ и prototype, проблемы использования прототипов у глобальных объектов"
    :show-topic-breakdown="true"
  />
</template>
