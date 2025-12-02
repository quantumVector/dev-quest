<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webOAuthQuestions } from '@/data/web-oauth-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webOAuthQuestions"
    title="Тест по Web: OAuth"
    description="50 вопросов по темам: Основы OAuth, компоненты архитектуры, OAuth flows, токены, безопасность, UX, библиотеки и практические сценарии"
    :show-topic-breakdown="true"
  />
</template>
