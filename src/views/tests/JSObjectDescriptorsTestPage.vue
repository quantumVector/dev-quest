<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsDescriptorsQuestions } from '@/data/js-descriptors-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsDescriptorsQuestions"
    title="Тест по JavaScript: Дескрипторы свойств объектов"
    description="26 вопросов по темам: Флаги свойств объектов, поведение флагов, получение дескрипторов, изменение дескрипторов"
    :show-topic-breakdown="true"
  />
</template>
