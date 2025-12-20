<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { patternsMvcMvpMvvmQuestions } from '@/data/patterns-mvc-mvp-mvvm-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="patternsMvcMvpMvvmQuestions"
    title="Тест по Patterns: MVC, MVP, MVVM"
    description="24 вопроса по темам: Основы MVC/MVP/MVVM, выбор архитектуры, взаимодействие компонентов, практическое применение, платформы и фреймворки"
    :show-topic-breakdown="true"
  />
</template>
