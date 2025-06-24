<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cssRelativeUnitsQuestions } from '@/data/css-relative-units-questions'
</script>

<template>
  <UniversalTestPage
    :questions="cssRelativeUnitsQuestions"
    title="Тест по CSS: Относительные единицы измерения"
    description="4 вопроса по теме относительных единиц измерения в CSS"
    :show-topic-breakdown="false"
  />
</template>
