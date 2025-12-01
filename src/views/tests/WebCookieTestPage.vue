<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { cookieQuestions } from '@/data/cookie-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="cookieQuestions"
    title="Тест по Cookie"
    description="50 вопросов по темам: основы cookie, хранение данных, создание и установка, атрибуты и параметры, SameSite и безопасность"
    :show-topic-breakdown="true"
  />
</template>
