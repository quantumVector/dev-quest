<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { reactRefForwardRefQuestions } from '@/data/react-ref-forwardref-questions'
</script>

<template>
  <UniversalTestPage
    :questions="reactRefForwardRefQuestions"
    title="Тест по React: Ref и ForwardRef"
    description="40 вопросов по темам: Основы useRef, Работа с DOM через useRef, forwardRef, useImperativeHandle, Паттерны использования, Продвинутые сценарии, Лучшие практики"
    :show-topic-breakdown="true"
  />
</template>
