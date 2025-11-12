<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { typeScriptMappedTypesQuestions } from '@/data/typescript-mapped-types-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="typeScriptMappedTypesQuestions"
    title="Тест по TypeScript: Mapped Types"
    description="40 вопросов по темам: Основы Mapped Types, Модификаторы, Key Remapping, Template Literal Types, Условные типы, Практические примеры, Распространенные паттерны, Ограничения и лучшие практики"
    :show-topic-breakdown="true"
  />
</template>
