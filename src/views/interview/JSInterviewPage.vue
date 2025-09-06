<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { jsInterviewQuestions } from '@/data/interview/js-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="jsInterviewQuestions"
    title="JavaScript Functions - Интервью"
    description="Вопросы и ответы по функциям JavaScript для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
