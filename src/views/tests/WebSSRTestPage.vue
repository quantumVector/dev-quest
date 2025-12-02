<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { ssrQuestions } from '@/data/ssr-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="ssrQuestions"
    title="Тест по Web: Server-Side Rendering (SSR)"
    description="50 вопросов по темам: Основы SSR, Преимущества, Производительность, Проблемы и вызовы, Взаимодействие с клиентским JavaScript, Продвинутые концепции, Практические сценарии, Оптимизация и мониторинг"
    :show-topic-breakdown="true"
  />
</template>
