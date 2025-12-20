<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { solidPrinciplesQuestions } from '@/data/solid-principles-questions'
</script>

<template>
  <UniversalTestPage
    :questions="solidPrinciplesQuestions"
    title="Тест по паттернам: SOLID принципы"
    description="40 вопросов по темам: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion"
    :show-topic-breakdown="true"
  />
</template>
