<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { blobFileQuestions } from '@/data/web-api-blob-file-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="blobFileQuestions"
    title="Тест: Blob и File"
    description="Проверьте свои знания по работе с бинарными данными в JavaScript"
    :show-topic-breakdown="true"
  />
</template>
