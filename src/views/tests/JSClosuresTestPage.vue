<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsClosuresQuestions } from '@/data/js-closures-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsClosuresQuestions"
    title="Тест по JavaScript: Замыкания"
    description="20 вопросов по темам: Основы замыканий, Лексическое окружение, Момент создания лексического окружения функции"
    :show-topic-breakdown="true"
  />
</template>
