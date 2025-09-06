<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsRegExpQuestions } from '@/data/js-regexp-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsRegExpQuestions"
    title="Тест по JavaScript: RegExp"
    description="30 вопросов по темам: Основы RegExp, флаги регулярных выражений, метасимволы, квантификаторы, группы и захват"
    :show-topic-breakdown="true"
  />
</template>
