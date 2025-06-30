<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { htmlInterviewQuestions } from '@/data/interview/html-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="htmlInterviewQuestions"
    title="HTML - Интервью"
    description="Вопросы и ответы по HTML для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
