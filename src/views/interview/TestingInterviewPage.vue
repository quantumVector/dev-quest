<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { testingInterviewQuestions } from '@/data/interview/testing-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="testingInterviewQuestions"
    title="Testing - Интервью"
    description="Вопросы и ответы по тестированию ПО для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
