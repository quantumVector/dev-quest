<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { reactInterviewQuestions } from '@/data/interview/react-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="reactInterviewQuestions"
    title="React - Интервью"
    description="Вопросы и ответы по React для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
