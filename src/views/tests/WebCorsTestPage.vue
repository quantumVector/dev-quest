<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webCorsQuestions } from '@/data/web-cors-questions'
</script>

<template>
  <UniversalTestPage
    :questions="webCorsQuestions"
    title="Тест по CORS"
    description="40 вопросов по темам: Основы CORS, HTTP заголовки, Простые и сложные запросы, Preflight запросы, CORS и credentials, Практические сценарии"
    :show-topic-breakdown="true"
  />
</template>
