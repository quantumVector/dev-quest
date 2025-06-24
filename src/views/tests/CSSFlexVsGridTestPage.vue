<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cssFlexGridQuestions } from '@/data/css-flex-grid-questions'
</script>

<template>
  <UniversalTestPage
    :questions="cssFlexGridQuestions"
    title="Тест по CSS: Flex vs Grid"
    description="4 вопроса по теме выбора между Flexbox и CSS Grid"
    :show-topic-breakdown="false"
  />
</template>
