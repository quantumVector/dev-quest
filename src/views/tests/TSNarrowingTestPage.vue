<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tsNarrowingQuestions } from '@/data/ts-narrowing-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tsNarrowingQuestions"
    title="Тест по TypeScript: Сужение типов"
    description="15 вопросов по темам: Основы сужения типов, typeof guards, Truthiness narrowing, Equality narrowing, in operator, instanceof, Type predicates, Discriminated unions"
    :show-topic-breakdown="true"
  />
</template>
