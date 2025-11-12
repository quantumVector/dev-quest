<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { typescriptInterfacesTypesQuestions } from '@/data/ts-interfaces-types-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="typescriptInterfacesTypesQuestions"
    title="Тест по TypeScript: Interfaces/Types"
    description="40 вопросов по темам: Основы Interfaces и Types, Наследование и расширение, Индексные сигнатуры, Опциональные свойства, Различия в использовании, Продвинутые паттерны, Generic constraints, Практические примеры"
    :show-topic-breakdown="true"
  />
</template>
