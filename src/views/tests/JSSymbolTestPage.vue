<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jsSymbolQuestions } from '@/data/js-symbol-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jsSymbolQuestions"
    title="Тест по JavaScript: Symbol"
    description="26 вопросов по темам: Основы Symbol, уникальность символов, примеры использования, глобальный реестр символов, системные символы"
    :show-topic-breakdown="true"
  />
</template>
