<script setup lang="ts">
import UniversalInterviewPage from '@/components/UniversalInterviewPage.vue'
import { webAPIInterviewQuestions } from '@/data/interview/web-api-interview'
</script>

<template>
  <UniversalInterviewPage
    :questions="webAPIInterviewQuestions"
    title="Web API - Интервью"
    description="Вопросы и ответы по Blob и File API для подготовки к техническому интервью"
    :show-difficulty="true"
    :show-tags="true"
  />
</template>
