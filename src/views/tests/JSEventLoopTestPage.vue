<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsEventLoopQuestions } from '@/data/js-event-loop-test-questions'
</script>

<template>
  <UniversalTestPage
    :questions="jsEventLoopQuestions"
    title="Тест по JavaScript: Event Loop"
    description="24 вопроса по темам: Как работает Event Loop, место requestAnimationFrame в Event Loop"
    :show-topic-breakdown="true"
  />
</template>
