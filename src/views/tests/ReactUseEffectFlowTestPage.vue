<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactUseEffectFlowQuestions } from '@/data/react-useeffect-flow-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactUseEffectFlowQuestions"
    title="Тест по React: useEffect Flow"
    description="40 вопросов по темам: Основы useEffect, Порядок выполнения, Cleanup функция, useEffect vs методы жизненного цикла, Множественные effects, Массив зависимостей, Асинхронность, Частые ошибки"
    :show-topic-breakdown="true"
  />
</template>
