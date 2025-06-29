<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { questions } from '@/data/css-transformations-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="questions"
    title="Тест: Трансформации в CSS"
    description="Проверьте свои знания о CSS трансформациях, их типах, свойствах и особенностях применения"
    :show-topic-breakdown="false"
  />
</template>
