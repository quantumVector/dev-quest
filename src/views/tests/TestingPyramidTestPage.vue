<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { testingPyramidQuestions } from '@/data/testing-pyramid-questions'
</script>

<template>
  <UniversalTestPage
    :questions="testingPyramidQuestions"
    title="Тест по Тестированию: Пирамида тестирования"
    description="50 вопросов по темам: Основы пирамиды, Уровни пирамиды, Характеристики уровней, Распределение и баланс, Практика и инструменты, CI/CD, Адаптации, Антипаттерны, Best Practices"
    :show-topic-breakdown="true"
  />
</template>
