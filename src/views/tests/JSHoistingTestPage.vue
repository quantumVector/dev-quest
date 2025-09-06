<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsHoistingQuestions } from '@/data/js-hoisting-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsHoistingQuestions"
    title="Тест по JavaScript: Hoisting (Всплытие)"
    description="20 вопросов по темам: Основы Hoisting, различия в поведении var, let и const при всплытии"
    :show-topic-breakdown="true"
  />
</template>
