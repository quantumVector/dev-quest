<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { typescriptTypesQuestions } from '@/data/typescript-types-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="typescriptTypesQuestions"
    title="Тест по TypeScript: Типы данных"
    description="40 вопросов по темам: Примитивные типы, Объектные типы, Массивы и кортежи, Union и Intersection, Literal типы, Enum, Type assertions, Type guards"
    :show-topic-breakdown="true"
  />
</template>
