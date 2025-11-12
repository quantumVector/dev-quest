<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tsInferTypesQuestions } from '@/data/ts-infer-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tsInferTypesQuestions"
    title="Тест по TypeScript: Infer Types"
    description="50 вопросов по темам: Основы Infer Types, Применение Infer Types, Практические примеры, Продвинутые паттерны с infer"
    :show-topic-breakdown="true"
  />
</template>
