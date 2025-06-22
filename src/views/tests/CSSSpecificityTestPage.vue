<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cssSpecificityQuestions } from '@/data/css-specificity-questions'
</script>

<template>
  <UniversalTestPage
    :questions="cssSpecificityQuestions"
    title="Тест по CSS: Специфичность селекторов"
    description="20 вопросов по теме специфичности CSS-селекторов"
    :show-topic-breakdown="false"
  />
</template>
