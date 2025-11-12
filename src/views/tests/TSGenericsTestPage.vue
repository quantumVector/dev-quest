<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { typescriptGenericsQuestions } from '@/data/typescript-generics-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="typescriptGenericsQuestions"
    title="Тест по TypeScript: Generics"
    description="40 вопросов по темам: Основы Generics, Generics в конструкциях, Ограничения (constraints), Преимущества, Практическое применение, Продвинутые концепции, Лучшие практики, Типичные ошибки, Сравнение подходов, Реальные примеры"
    :show-topic-breakdown="true"
  />
</template>
