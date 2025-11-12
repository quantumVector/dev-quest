<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tsTypeCastingQuestions } from '@/data/ts-type-casting-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tsTypeCastingQuestions"
    title="Тест по TypeScript: Приведение типов (Type Casting)"
    description="50 вопросов по темам: основы приведения типов, синтаксис as и <>, двойное приведение, const assertions, non-null assertion, type guards vs assertions, satisfies оператор"
    :show-topic-breakdown="true"
  />
</template>
