<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { jotaiPracticeInterviewQuestions } from '@/data/interview/jotai-practice-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="jotaiPracticeInterviewQuestions"
    title="Jotai - Интервью"
    description="Вопросы по atom, derived state, writable atoms, persisted state и async-состоянию"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
