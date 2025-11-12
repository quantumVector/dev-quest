<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { typeScriptProsConsQuestions } from '@/data/typescript-pros-cons-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="typeScriptProsConsQuestions"
    title="Тест по TypeScript: Плюсы и минусы"
    description="40 вопросов по темам: преимущества TypeScript, недостатки, применение, сравнение с альтернативами, миграция, производительность, экосистема, лучшие практики"
    :show-topic-breakdown="true"
  />
</template>
