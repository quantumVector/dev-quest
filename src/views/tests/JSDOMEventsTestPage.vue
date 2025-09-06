<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsDOMEventsQuestions } from '@/data/js-dom-events-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsDOMEventsQuestions"
    title="Тест по JavaScript: События DOM"
    description="24 вопроса по темам: Фазы жизненного цикла события DOM, различия между target и currentTarget, обработка событий в фазе capturing"
    :show-topic-breakdown="true"
  />
</template>
