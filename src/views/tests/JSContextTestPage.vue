<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsContextQuestions } from '@/data/js-context-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsContextQuestions"
    title="Тест по JavaScript: Контекст выполнения"
    description="24 вопроса по темам: Основы контекста, ключевое слово this, привязка контекста (call, bind, apply), частичное применение"
    :show-topic-breakdown="true"
  />
</template>
