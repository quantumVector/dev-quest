<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { bffQuestions } from '@/data/bff-questions'
</script>

<template>
  <UniversalTestPage
    :questions="bffQuestions"
    title="Тест по Web: Backend For Frontend (BFF)"
    description="50 вопросов по темам: Основы BFF, BFF vs традиционный подход, Преимущества BFF, Over-fetching и Under-fetching, Проблемы BFF, Взаимодействие и технологии, Практические сценарии"
    :show-topic-breakdown="true"
  />
</template>
