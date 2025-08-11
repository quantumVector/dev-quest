<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { cssInterviewQuestions } from '@/data/interview/css-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="cssInterviewQuestions"
    title="CSS - Интервью"
    description="Вопросы и ответы по CSS для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
