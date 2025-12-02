<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webXssCsrfQuestions } from '@/data/web-xss-csrf-questions'
</script>

<template>
  <UniversalTestPage
    :questions="webXssCsrfQuestions"
    title="Тест по XSS и CSRF"
    description="28 вопросов по темам: Основы XSS и CSRF, Предотвращение XSS, Защита от CSRF, Безопасные заголовки, Инструменты обнаружения"
    :show-topic-breakdown="true"
  />
</template>
