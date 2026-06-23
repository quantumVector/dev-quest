<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { jotaiPracticeQuestions } from '@/data/jotai-practice-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="jotaiPracticeQuestions"
    title="Тест: Jotai на практике"
    description="25 вопросов по atom, useAtom, derived atoms, writable atoms, atomWithStorage, async atoms, Suspense и выбору инструмента"
    :show-topic-breakdown="true"
  />
</template>
