<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsFunctionsQuestions } from '@/data/js-functions-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsFunctionsQuestions"
    title="Тест по JavaScript: Функции"
    description="20 вопросов по темам: Основы функций, Типы функций, Различия между Function Declaration, Function Expression и Arrow Function"
    :show-topic-breakdown="true"
  />
</template>
