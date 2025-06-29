<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cssInJsQuestions } from '@/data/css-in-js-questions'
</script>

<template>
  <UniversalTestPage
    :questions="cssInJsQuestions"
    title="Тест по CSS-in-JS"
    description="4 вопроса по теме CSS-in-JS: подходы, библиотеки и особенности использования"
    :show-topic-breakdown="false"
  />
</template>
