<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactJSXQuestions } from '@/data/react-jsx-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactJSXQuestions"
    title="Тест по React: JSX"
    description="40 вопросов по темам: Основы JSX, Синтаксис JSX, Атрибуты JSX, Children в JSX, Выражения в JSX, Фрагменты, Безопасность JSX, Производительность JSX"
    :show-topic-breakdown="true"
  />
</template>
