<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsFluxQuestions } from '@/data/patterns-flux-questions'
</script>

<template>
  <UniversalTestPage
    :questions="patternsFluxQuestions"
    title="Тест по Patterns: Flux Architecture"
    description="30 вопросов по темам: Основы Flux, Однонаправленный поток данных, Передача данных в Flux"
    :show-topic-breakdown="true"
  />
</template>
