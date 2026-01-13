<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { creationalPatternsQuestions } from '@/data/creational-patterns-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="creationalPatternsQuestions"
    title="Тест: Порождающие паттерны"
    description="40 вопросов по темам: Singleton, Factory, Builder, Prototype и их применение во frontend разработке"
    :show-topic-breakdown="true"
  />
</template>
