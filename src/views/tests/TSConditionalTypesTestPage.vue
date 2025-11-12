<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tsConditionalTypesQuestions } from '@/data/ts-conditional-types-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tsConditionalTypesQuestions"
    title="Тест по TypeScript: Conditional Types"
    description="40 вопросов по темам: Основы Conditional Types, Distributive Conditional Types, встроенные типы, infer, практическое применение и комбинирование типов"
    :show-topic-breakdown="true"
  />
</template>
