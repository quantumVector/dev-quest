<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsDryKissYagniQuestions } from '@/data/patterns-dry-kiss-yagni-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="patternsDryKissYagniQuestions"
    title="Тест по DRY, KISS, YAGNI"
    description="36 вопросов по темам: Основы принципов, практическое применение DRY, KISS и YAGNI, их взаимосвязь и практические сценарии"
    :show-topic-breakdown="true"
  />
</template>
