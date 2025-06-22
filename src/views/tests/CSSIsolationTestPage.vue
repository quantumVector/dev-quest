<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cssIsolationQuestions } from '@/data/css-isolation-questions'
</script>

<template>
  <UniversalTestPage
    :questions="cssIsolationQuestions"
    title="Тест по CSS: Изоляция стилей"
    description="4 вопроса по теме изоляции стилей в CSS"
    :show-topic-breakdown="false"
  />
</template>
