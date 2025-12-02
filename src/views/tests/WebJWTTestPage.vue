<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { webJWTQuestions } from '@/data/web-jwt-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="webJWTQuestions"
    title="Тест по Web: JWT (JSON Web Token)"
    description="40 вопросов по темам: Основы JWT, Структура JWT, Механизм работы, JWT vs Сессии, Безопасность JWT, Алгоритмы подписи, Лучшие практики"
    :show-topic-breakdown="true"
  />
</template>
