<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { testingIntroQuestions } from '@/data/testing-intro-questions'
</script>

<template>
  <UniversalTestPage
    :questions="testingIntroQuestions"
    title="Тест по Тестированию: Введение"
    description="40 вопросов по темам: Основы тестирования, Важность тестирования, Уровни тестирования, Методы тестирования, Подходы к тестированию, Специализированные тесты, Автоматизация vs Ручное, Дополнительные концепции"
    :show-topic-breakdown="true"
  />
</template>
