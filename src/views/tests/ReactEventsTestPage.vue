<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactEventsQuestions } from '@/data/react-events-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactEventsQuestions"
    title="Тест по React: Обработка событий"
    description="40 вопросов по темам: Основы обработки событий, SyntheticEvent vs Native Events, Методы обработки, Event Delegation, Типы событий, Работа с формами, Производительность, Практические сценарии"
    :show-topic-breakdown="true"
  />
</template>
