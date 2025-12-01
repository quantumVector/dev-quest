<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webHttpQuestions } from '@/data/web-http-questions'
</script>

<template>
  <UniversalTestPage
    :questions="webHttpQuestions"
    title="Тест по Web: HTTP протокол"
    description="52 вопроса по темам: Основы HTTP, HTTP методы, HTTP заголовки, Статус-коды, HTTPS и безопасность, Перенаправления, Кеширование"
    :show-topic-breakdown="true"
  />
</template>
