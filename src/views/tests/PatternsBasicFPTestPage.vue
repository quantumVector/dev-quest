<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsBasicFPQuestions } from '@/data/patterns-basic-fp-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="patternsBasicFPQuestions"
    title="Тест по паттернам: Basic FP"
    description="25 вопросов по темам: Чистые функции, Функции высшего порядка, Каррирование"
    :show-topic-breakdown="true"
  />
</template>
