<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { tsClassesDecoratorsQuestions } from '@/data/ts-classes-decorators-test-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="tsClassesDecoratorsQuestions"
    title="Тест по TypeScript: Классы и Декораторы"
    description="40 вопросов по темам: Основы классов, Модификаторы доступа, Статические члены и абстрактные классы, Основы декораторов, Декораторы классов, Декораторы методов и свойств, Фабрики декораторов, Метаданные, Практическое применение, Ограничения"
    :show-topic-breakdown="true"
  />
</template>
