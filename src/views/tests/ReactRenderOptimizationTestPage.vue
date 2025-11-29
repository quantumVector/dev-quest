<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactRenderOptimizationQuestions } from '@/data/react-render-optimization-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactRenderOptimizationQuestions"
    title="Тест по React: Оптимизация рендеринга"
    description="50 вопросов по темам: React.memo, Композиция компонентов, State Management, Разделение компонентов, Виртуализация, Debouncing/Throttling, Context оптимизация, Keys, Lazy loading, Профилирование, Продвинутые техники, Антипаттерны"
    :show-topic-breakdown="true"
  />
</template>
