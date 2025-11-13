<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { tsInterviewQuestions } from '@/data/interview/ts-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="tsInterviewQuestions"
    title="TypeScript - Интервью"
    description="Вопросы и ответы по TypeScript для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
