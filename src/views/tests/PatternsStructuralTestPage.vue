<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsStructuralQuestions } from '@/data/patterns-structural-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="patternsStructuralQuestions"
    title="Тест по Паттернам: Структурные Паттерны"
    description="50 вопросов по темам: Adapter, Decorator, Proxy, Facade, Composite, Bridge, Flyweight с примерами во фронтенде"
    :show-topic-breakdown="true"
  />
</template>
