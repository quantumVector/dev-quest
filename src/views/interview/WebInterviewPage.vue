<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { webInterviewQuestions } from '@/data/interview/web-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="webInterviewQuestions"
    title="Web - Интервью"
    description="Вопросы и ответы по Web для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
