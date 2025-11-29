<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactIntroQuestions } from '@/data/react-intro-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactIntroQuestions"
    title="Тест по React: Основы и преимущества"
    description="40 вопросов по темам: Что такое React, Преимущества React, Сравнение с другими подходами, Практическое применение, Современные возможности, Сообщество и развитие, Производительность"
    :show-topic-breakdown="true"
  />
</template>
