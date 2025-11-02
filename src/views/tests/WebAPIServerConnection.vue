<script setup lang="ts">
import UniversalTestPage from '@/components/UniversalTestPage.vue'
import { serverConnectionQuestions } from '@/data/web-api-server-connection-questions.ts'
</script>

<template>
  <UniversalTestPage
    :questions="serverConnectionQuestions"
    title="Тест: Поддержание соединения с сервером"
    description="Проверьте свои знания по WebSockets, Server-Sent Events и Long Polling"
    :show-topic-breakdown="true"
  />
</template>
