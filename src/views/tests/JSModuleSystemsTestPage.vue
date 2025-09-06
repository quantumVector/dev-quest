<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsModuleSystemsQuestions } from '@/data/js-module-systems-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsModuleSystemsQuestions"
    title="Тест по JavaScript: Системы Модулей"
    description="24 вопроса по темам: Системы модулей в JS, различия между CommonJS, AMD, UMD и ES Modules"
    :show-topic-breakdown="true"
  />
</template>
