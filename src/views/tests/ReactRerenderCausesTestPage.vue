<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactRerenderCausesQuestions } from '@/data/react-rerender-causes-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactRerenderCausesQuestions"
    title="Тест по React: Причины ререндеров"
    description="50 вопросов по темам: Основные причины ререндера, Изменение State, Изменение Props, Ререндер родителя, Выявление лишних ререндеров, Оптимизация, Антипаттерны, Продвинутые сценарии"
    :show-topic-breakdown="true"
  />
</template>
