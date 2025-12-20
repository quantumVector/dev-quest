<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsBehavioralQuestions } from '@/data/patterns-behavioral-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="patternsBehavioralQuestions"
    title="Тест: Поведенческие паттерны"
    description="50 вопросов по темам: Strategy, Observer, Command, Iterator, Mediator, Chain of Responsibility, Template Method, State, Memento, Visitor"
    :show-topic-breakdown="true"
  />
</template>
