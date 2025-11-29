<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactMemoCallbackQuestions } from '@/data/react-memo-callback-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactMemoCallbackQuestions"
    title="Тест по React: useMemo и useCallback"
    description="40 вопросов по темам: Основы useMemo, Основы useCallback, Когда использовать, Массив зависимостей, Антипаттерны, useMemo vs React.memo, Производительность, Практические примеры"
    :show-topic-breakdown="true"
  />
</template>
