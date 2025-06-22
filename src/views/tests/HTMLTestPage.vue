<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { questions } from '@/data/html-test-questions'
</script>

<template>
  <UniversalTestPage
    :questions="questions"
    title="Тест по HTML"
    description="24 вопроса по темам: Основы HTML, Семантическая вёрстка, Веб-доступность, Адаптивные изображения"
    :show-topic-breakdown="true"
  />
</template>
